(() => {
var exports = {};
exports.id = 4271;
exports.ids = [4271];
exports.modules = {

/***/ 8251:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ File)
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
    name: "file",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
                key: "1oefj6"
            }
        ],
        [
            "path",
            {
                d: "M14 2v5a1 1 0 0 0 1 1h5",
                key: "wfsgrz"
            }
        ]
    ]
};
__iconData.node;
const File = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=file.mjs.map


/***/ }),

/***/ 9071:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AdminPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(305735);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_permissions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(292501);
/* harmony import */ var _components_medq_admin_AdminTab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(757338);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_permissions__WEBPACK_IMPORTED_MODULE_1__]);
_lib_permissions__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



/**
 * /admin — server-guarded admin console page.
 *
 * Lives inside the (app) route group so it renders within the shared
 * AppShellLayout (sidebar + header). requireRole(["admin"]) enforces the
 * role gate server-side before any admin UI is streamed to the client.
 */ async function AdminPage() {
    const session = await (0,_lib_permissions__WEBPACK_IMPORTED_MODULE_1__/* .requireRole */ .c)([
        "admin"
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_admin_AdminTab__WEBPACK_IMPORTED_MODULE_2__["default"], {});
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 10246:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ TabResponsiveContainer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_ResponsiveContainer_recharts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(671836);
/* harmony import */ var _TabVisibilityContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(972876);
/* __next_internal_client_entry_do_not_use__ TabResponsiveContainer auto */ 



function TabResponsiveContainer(props) {
    const isTabVisible = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_TabVisibilityContext__WEBPACK_IMPORTED_MODULE_2__/* .TabVisibilityContext */ .z);
    return isTabVisible ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ResponsiveContainer_recharts__WEBPACK_IMPORTED_MODULE_3__/* .ResponsiveContainer */ .u, {
        ...props
    }) : null;
}


/***/ }),

/***/ 22622:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ useIsomorphicLayoutEffect)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var _is_browser_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(494122);
/* __next_internal_client_entry_do_not_use__ useIsomorphicLayoutEffect auto */ 

const useIsomorphicLayoutEffect = _is_browser_mjs__WEBPACK_IMPORTED_MODULE_1__/* .isBrowser */ .B ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;
 //# sourceMappingURL=use-isomorphic-effect.mjs.map


/***/ }),

/***/ 27993:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ RefreshCw)
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
    name: "refresh-cw",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
                key: "v9h5vc"
            }
        ],
        [
            "path",
            {
                d: "M21 3v5h-5",
                key: "1q7to0"
            }
        ],
        [
            "path",
            {
                d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
                key: "3uifl3"
            }
        ],
        [
            "path",
            {
                d: "M8 16H3v5",
                key: "1cv678"
            }
        ]
    ]
};
__iconData.node;
const RefreshCw = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=refresh-cw.mjs.map


/***/ }),

/***/ 41139:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DL: () => (/* binding */ REPORT_REASON_COLORS),
/* harmony export */   IM: () => (/* binding */ getInitials),
/* harmony export */   Lp: () => (/* binding */ ADMIN_COLORS),
/* harmony export */   UK: () => (/* binding */ formatUsd),
/* harmony export */   Yq: () => (/* binding */ formatDate),
/* harmony export */   ZV: () => (/* binding */ formatNumber),
/* harmony export */   om: () => (/* binding */ formatRelative),
/* harmony export */   zC: () => (/* binding */ REPORT_STATUS_COLORS)
/* harmony export */ });
/* unused harmony exports ROLE_COLORS, TIER_COLORS, USER_STATUS_COLORS, formatDateTime */
// Shared constants & helpers for admin sub-tabs.
// Kept in one place so the sub-tab files can stay focused on layout/logic.
const ADMIN_COLORS = {
    bg: '#0c0e14',
    card: '#151821',
    cardBorder: 'rgba(255,255,255,0.06)',
    green: '#00e5a0',
    cyan: '#22d3ee',
    purple: '#8b5cf6',
    amber: '#f59e0b',
    blue: '#4fc3f7',
    red: '#ff5757',
    text: '#e8ecf4',
    muted: '#5a6478',
    dimmed: '#3a4055'
};
const ROLE_COLORS = {
    admin: ADMIN_COLORS.red,
    educator: ADMIN_COLORS.blue,
    student: ADMIN_COLORS.green
};
const TIER_COLORS = {
    free: ADMIN_COLORS.muted,
    premium: ADMIN_COLORS.purple,
    pro: ADMIN_COLORS.amber
};
const USER_STATUS_COLORS = {
    active: ADMIN_COLORS.green,
    suspended: ADMIN_COLORS.amber,
    banned: ADMIN_COLORS.red
};
const REPORT_REASON_COLORS = {
    incorrect: ADMIN_COLORS.red,
    outdated: ADMIN_COLORS.amber,
    offensive: ADMIN_COLORS.purple,
    duplicate: ADMIN_COLORS.cyan,
    other: ADMIN_COLORS.muted
};
const REPORT_STATUS_COLORS = {
    pending: ADMIN_COLORS.amber,
    reviewed: ADMIN_COLORS.blue,
    resolved: ADMIN_COLORS.green
};
function getInitials(name, email) {
    if (name) {
        const parts = name.trim().split(/\s+/);
        return parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : name.slice(0, 2).toUpperCase();
    }
    if (email) return email.slice(0, 2).toUpperCase();
    return '??';
}
function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}
function formatDateTime(dateStr) {
    if (!dateStr) return '—';
    const d = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
function formatNumber(n) {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return n.toString();
}
function formatUsd(n) {
    if (n >= 1000000) return `$${(n / 1000000).toFixed(2)}M`;
    if (n >= 1000) return `$${(n / 1000).toFixed(2)}k`;
    return `$${n.toFixed(2)}`;
}
function formatRelative(dateStr) {
    if (!dateStr) return '—';
    const d = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
    if (isNaN(d.getTime())) return '—';
    const diff = Date.now() - d.getTime();
    const sec = Math.floor(diff / 1000);
    if (sec < 60) return `${sec}s ago`;
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const day = Math.floor(hr / 24);
    if (day < 7) return `${day}d ago`;
    return formatDate(d);
}


/***/ }),

/***/ 55591:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 58004:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AdminTab)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(495210);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(317441);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(269357);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(892138);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(903072);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(487005);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(881321);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(289824);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(359923);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(932823);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(569473);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(857762);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(782078);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(239041);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(332706);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(334460);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(880592);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(685461);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(612747);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(408157);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(954171);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(673097);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(77361);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(601264);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(415509);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(405430);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(686056);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(229813);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(334644);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(691995);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(8251);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(535781);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(135195);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(404586);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(122442);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(539737);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(24950);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(346633);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(885596);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(537663);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(541290);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(27993);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(659970);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(508445);
/* harmony import */ var _barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(490165);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(890707);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(925297);
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(288877);
/* harmony import */ var _components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(913656);
/* harmony import */ var _components_ui_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(165873);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(490314);
/* harmony import */ var _compliance_ComplianceDashboard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(208209);
/* harmony import */ var _AnalyticsTab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(133131);
/* harmony import */ var _ModerationTab__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(597165);
/* harmony import */ var _RevenueTab__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(847539);
/* harmony import */ var _components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(538393);
/* harmony import */ var _components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(756642);
/* __next_internal_client_entry_do_not_use__ default auto */ 










// ── New admin sub-tabs (analytics, moderation, revenue) ──



// Lazy-load the OBJ Model Viewer for preview dialogs (avoids heavy Three.js in initial bundle)
const OBJModelViewer = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_7__["default"])(async ()=>{
     true && /*require.resolve*/(null /* weak dependency, without id */);
}, {
    loadableGenerated: {
        modules: [
            "components/medq/admin/AdminTab.tsx -> " + "@/components/medq/OBJModelViewer"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex items-center justify-center h-64 rounded-lg",
            style: {
                background: 'var(--medq-app-bg, #0c0e14)'
            },
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                        className: "w-6 h-6 animate-spin mx-auto mb-2",
                        style: {
                            color: COLORS.cyan
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[10px]",
                        style: {
                            color: COLORS.muted
                        },
                        children: "Loading 3D Viewer..."
                    })
                ]
            })
        })
});


/* ────────────────────────────── Color Constants ────────────────────────────── */ const COLORS = {
    bg: 'var(--medq-app-bg, #0c0e14)',
    card: 'var(--medq-card-bg, #151821)',
    cardBorder: 'var(--medq-card-border, rgba(255,255,255,0.06))',
    green: 'var(--medq-accent-green, #00e5a0)',
    cyan: 'var(--medq-accent-cyan, #22d3ee)',
    purple: 'var(--medq-accent-purple, #8b5cf6)',
    amber: 'var(--medq-accent-amber, #f59e0b)',
    blue: '#4fc3f7',
    red: 'var(--medq-accent-danger, #ff5757)',
    text: 'var(--medq-text, #e8ecf4)',
    muted: 'var(--medq-muted, #5a6478)',
    dimmed: 'var(--medq-dimmed, #3a4055)'
};
const ROLE_COLORS = {
    admin: COLORS.red,
    educator: COLORS.blue,
    student: COLORS.green
};
const TIER_COLORS = {
    free: COLORS.muted,
    premium: COLORS.purple,
    pro: COLORS.amber
};
const STATUS_COLORS = {
    active: COLORS.green,
    paused: COLORS.amber,
    archived: COLORS.muted
};
// User moderation status colors (ban/suspend system)
const USER_STATUS_COLORS = {
    active: COLORS.green,
    suspended: COLORS.amber,
    banned: COLORS.red
};
const ADTYPE_COLORS = {
    banner: COLORS.blue,
    interstitial: COLORS.purple,
    rewarded: COLORS.amber,
    native: COLORS.cyan
};
/* ────────────────────────────── Helpers ────────────────────────────── */ function getInitials(name, email) {
    if (name) {
        const parts = name.trim().split(/\s+/);
        return parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : name.slice(0, 2).toUpperCase();
    }
    if (email) return email.slice(0, 2).toUpperCase();
    return '??';
}
function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}
function formatNumber(n) {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return n.toString();
}
function getTypeIcon(type) {
    switch(type){
        case 'color':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                className: "w-3.5 h-3.5"
            });
        case 'image':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                className: "w-3.5 h-3.5"
            });
        case 'json':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                className: "w-3.5 h-3.5"
            });
        default:
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                className: "w-3.5 h-3.5"
            });
    }
}
function getTypeColor(type) {
    switch(type){
        case 'color':
            return COLORS.purple;
        case 'image':
            return COLORS.cyan;
        case 'json':
            return COLORS.amber;
        default:
            return COLORS.green;
    }
}
/* ────────────────────────────── Trend Indicator ────────────────────────────── */ function TrendIndicator({ value }) {
    if (value > 0) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
            className: "inline-flex items-center gap-0.5 text-[10px] font-medium",
            style: {
                color: COLORS.green
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                    className: "w-3 h-3"
                }),
                "+",
                value,
                "%"
            ]
        });
    }
    if (value < 0) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
            className: "inline-flex items-center gap-0.5 text-[10px] font-medium",
            style: {
                color: COLORS.red
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                    className: "w-3 h-3"
                }),
                value,
                "%"
            ]
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
        className: "inline-flex items-center gap-0.5 text-[10px] font-medium",
        style: {
            color: COLORS.muted
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                className: "w-3 h-3"
            }),
            "0%"
        ]
    });
}
/* ────────────────────────────── Stat Card ────────────────────────────── */ function StatCard({ label, value, icon, color, bgColor, trend, index }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.4,
            delay: index * 0.08,
            ease: 'easeOut'
        },
        className: "rounded-2xl p-4 border transition-all hover:border-white/[0.1]",
        style: {
            background: COLORS.card,
            borderColor: COLORS.cardBorder
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between mb-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-9 h-9 rounded-lg flex items-center justify-center",
                        style: {
                            background: bgColor,
                            color
                        },
                        children: icon
                    }),
                    trend !== undefined && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TrendIndicator, {
                        value: trend
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-2xl font-bold tracking-tight",
                style: {
                    color: COLORS.text
                },
                children: typeof value === 'number' ? formatNumber(value) : value
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-[10px] mt-0.5 font-medium",
                style: {
                    color: COLORS.muted
                },
                children: label
            })
        ]
    });
}
/* ────────────────────────────── Loading Skeletons ────────────────────────────── */ function StatsSkeleton() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3",
        children: Array.from({
            length: 5
        }).map((_, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "rounded-2xl p-4 border",
                style: {
                    background: COLORS.card,
                    borderColor: COLORS.cardBorder
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__/* .Skeleton */ .E, {
                        className: "h-9 w-9 rounded-lg mb-3",
                        style: {
                            background: 'rgba(255,255,255,0.06)'
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__/* .Skeleton */ .E, {
                        className: "h-7 w-16 mb-1",
                        style: {
                            background: 'rgba(255,255,255,0.06)'
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__/* .Skeleton */ .E, {
                        className: "h-3 w-20",
                        style: {
                            background: 'rgba(255,255,255,0.04)'
                        }
                    })
                ]
            }, i))
    });
}
function TableSkeleton() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "rounded-2xl border p-6",
        style: {
            background: COLORS.card,
            borderColor: COLORS.cardBorder
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex items-center gap-3 mb-4",
                children: Array.from({
                    length: 3
                }).map((_, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__/* .Skeleton */ .E, {
                        className: "h-9 w-32 rounded-lg",
                        style: {
                            background: 'rgba(255,255,255,0.06)'
                        }
                    }, i))
            }),
            Array.from({
                length: 8
            }).map((_, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__/* .Skeleton */ .E, {
                    className: "h-12 w-full mb-2 rounded-lg",
                    style: {
                        background: 'rgba(255,255,255,0.03)'
                    }
                }, i))
        ]
    });
}
/* ══════════════════════════════════════════════════════════════════════════════
   SETTINGS TAB
   ══════════════════════════════════════════════════════════════════════════════ */ function SettingsTab() {
    const [settings, setSettings] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [editSetting, setEditSetting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [editValue, setEditValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [editLabel, setEditLabel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [editType, setEditType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('text');
    const [saving, setSaving] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showCreate, setShowCreate] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [newKey, setNewKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [newValue, setNewValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [newLabel, setNewLabel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [newType, setNewType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('text');
    const [deleteKey, setDeleteKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const fetchSettings = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        try {
            const res = await fetch('/api/admin/settings');
            if (res.ok) {
                const data = await res.json();
                setSettings(data.settings || []);
            }
        } catch (err) {
            console.error('Failed to fetch settings:', err);
        } finally{
            setLoading(false);
        }
    }, []);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetchSettings();
    }, [
        fetchSettings
    ]);
    const handleEdit = (setting)=>{
        setEditSetting(setting);
        setEditValue(setting.value);
        setEditLabel(setting.label);
        setEditType(setting.type);
    };
    const handleSaveEdit = async ()=>{
        if (!editSetting) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/admin/settings/${encodeURIComponent(editSetting.key)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    value: editValue,
                    label: editLabel,
                    type: editType
                })
            });
            if (!res.ok) throw new Error('Failed to update setting');
            // If favicon_url was changed, update the document favicon
            if (editSetting.key === 'favicon_url' && editValue) {
                const link = document.querySelector('link[rel="icon"]');
                if (link) {
                    link.setAttribute('href', editValue);
                } else {
                    const newLink = document.createElement('link');
                    newLink.rel = 'icon';
                    newLink.href = editValue;
                    document.head.appendChild(newLink);
                }
            }
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Setting "${editSetting.key}" updated`);
            setEditSetting(null);
            fetchSettings();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to update setting');
            console.error(err);
        } finally{
            setSaving(false);
        }
    };
    const handleCreate = async ()=>{
        if (!newKey.trim()) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Key is required');
            return;
        }
        setSaving(true);
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    key: newKey,
                    value: newValue,
                    type: newType,
                    label: newLabel
                })
            });
            if (!res.ok) throw new Error('Failed to create setting');
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Setting "${newKey}" created`);
            setShowCreate(false);
            setNewKey('');
            setNewValue('');
            setNewLabel('');
            setNewType('text');
            fetchSettings();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to create setting');
            console.error(err);
        } finally{
            setSaving(false);
        }
    };
    const handleDelete = async ()=>{
        if (!deleteKey) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/admin/settings/${encodeURIComponent(deleteKey)}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Failed to delete setting');
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Setting "${deleteKey}" deleted`);
            setDeleteKey(null);
            fetchSettings();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to delete setting');
            console.error(err);
        } finally{
            setSaving(false);
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
            children: Array.from({
                length: 6
            }).map((_, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "rounded-2xl p-5 border",
                    style: {
                        background: COLORS.card,
                        borderColor: COLORS.cardBorder
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__/* .Skeleton */ .E, {
                            className: "h-5 w-24 mb-3",
                            style: {
                                background: 'rgba(255,255,255,0.06)'
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__/* .Skeleton */ .E, {
                            className: "h-4 w-full mb-2",
                            style: {
                                background: 'rgba(255,255,255,0.04)'
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__/* .Skeleton */ .E, {
                            className: "h-8 w-20",
                            style: {
                                background: 'rgba(255,255,255,0.04)'
                            }
                        })
                    ]
                }, i))
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                className: "text-sm font-semibold",
                                style: {
                                    color: COLORS.text
                                },
                                children: "Application Settings"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px]",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Configure app behavior without code changes"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                        onClick: ()=>setShowCreate(true),
                        className: "text-xs font-medium h-8",
                        style: {
                            background: COLORS.green,
                            color: '#0c0e14'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5 mr-1.5"
                            }),
                            "New Setting"
                        ]
                    })
                ]
            }),
            settings.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "rounded-2xl border p-12 text-center",
                style: {
                    background: COLORS.card,
                    borderColor: COLORS.cardBorder
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                        className: "w-8 h-8 mx-auto mb-2",
                        style: {
                            color: COLORS.dimmed
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-xs mb-1",
                        style: {
                            color: COLORS.dimmed
                        },
                        children: "No settings configured yet"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[10px]",
                        style: {
                            color: COLORS.muted
                        },
                        children: 'Click "New Setting" or seed defaults to get started'
                    })
                ]
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                children: settings.map((setting, i)=>{
                    const typeColor = getTypeColor(setting.type);
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            y: 12
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.3,
                            delay: i * 0.04
                        },
                        className: "rounded-2xl p-5 border transition-all hover:border-white/[0.1]",
                        style: {
                            background: COLORS.card,
                            borderColor: COLORS.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center justify-between mb-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "w-7 h-7 rounded-md flex items-center justify-center",
                                                style: {
                                                    background: `${typeColor}15`,
                                                    color: typeColor
                                                },
                                                children: getTypeIcon(setting.type)
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-xs font-semibold",
                                                        style: {
                                                            color: COLORS.text
                                                        },
                                                        children: setting.label || setting.key
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-[9px] font-mono",
                                                        style: {
                                                            color: COLORS.dimmed
                                                        },
                                                        children: setting.key
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider",
                                        style: {
                                            background: `${typeColor}15`,
                                            color: typeColor,
                                            border: `1px solid ${typeColor}30`
                                        },
                                        children: setting.type
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "mb-3",
                                children: setting.type === 'color' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "w-8 h-8 rounded-lg border",
                                            style: {
                                                background: setting.value || '#000',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                            }
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-xs font-mono",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: setting.value || '(empty)'
                                        })
                                    ]
                                }) : setting.type === 'image' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        setting.value ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                            src: setting.value,
                                            alt: setting.label || setting.key,
                                            className: "w-full h-20 object-cover rounded-lg mb-1",
                                            style: {
                                                background: 'rgba(255,255,255,0.03)'
                                            },
                                            onError: (e)=>{
                                                e.target.style.display = 'none';
                                            }
                                        }) : null,
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[10px] truncate",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: setting.value || '(no image)'
                                        })
                                    ]
                                }) : setting.type === 'json' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("pre", {
                                    className: "text-[10px] p-2 rounded-lg max-h-20 overflow-auto",
                                    style: {
                                        background: 'rgba(255,255,255,0.03)',
                                        color: COLORS.muted
                                    },
                                    children: setting.value ? setting.value.slice(0, 120) + (setting.value.length > 120 ? '...' : '') : '(empty)'
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-xs truncate",
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: setting.value || '(empty)'
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-[8px]",
                                        style: {
                                            color: COLORS.dimmed
                                        },
                                        children: [
                                            "Updated ",
                                            formatDate(setting.updatedAt)
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                onClick: ()=>handleEdit(setting),
                                                className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                title: "Edit Setting",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                                    className: "w-3 h-3",
                                                    style: {
                                                        color: COLORS.purple
                                                    }
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                onClick: ()=>setDeleteKey(setting.key),
                                                className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                title: "Delete Setting",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                                    className: "w-3 h-3",
                                                    style: {
                                                        color: COLORS.red
                                                    }
                                                })
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }, setting.id);
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: !!editSetting,
                onOpenChange: (open)=>{
                    if (!open) setEditSetting(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-md",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: "Edit Setting"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogDescription */ .rr, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: [
                                        'Update value for "',
                                        editSetting?.label || editSetting?.key,
                                        '"'
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4 py-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Label"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                            value: editLabel,
                                            onChange: (e)=>setEditLabel(e.target.value),
                                            className: "text-xs",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Type"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                            value: editType,
                                            onValueChange: setEditType,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                    className: "w-full text-xs",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.05)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                        color: COLORS.text
                                                    },
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                    style: {
                                                        background: 'var(--medq-app-bg, #1a1e2b)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "text",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Text"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "color",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Color"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "image",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Image URL"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "json",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "JSON"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Value"
                                        }),
                                        editType === 'color' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                    type: "color",
                                                    value: editValue || '#000000',
                                                    onChange: (e)=>setEditValue(e.target.value),
                                                    className: "w-10 h-10 rounded-lg border cursor-pointer",
                                                    style: {
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                        background: 'transparent'
                                                    }
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                                    value: editValue,
                                                    onChange: (e)=>setEditValue(e.target.value),
                                                    className: "text-xs font-mono flex-1",
                                                    placeholder: "#00e5a0",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.05)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                        color: COLORS.text
                                                    }
                                                })
                                            ]
                                        }) : editType === 'json' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                            value: editValue,
                                            onChange: (e)=>setEditValue(e.target.value),
                                            rows: 5,
                                            className: "w-full text-xs font-mono p-3 rounded-lg outline-none border resize-y",
                                            placeholder: "{}",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                            value: editValue,
                                            onChange: (e)=>setEditValue(e.target.value),
                                            className: "text-xs",
                                            placeholder: editType === 'image' ? 'https://example.com/image.png' : 'Enter value...',
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        }),
                                        editType === 'image' && editValue && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                            src: editValue,
                                            alt: "Preview",
                                            className: "w-full h-24 object-cover rounded-lg mt-2",
                                            style: {
                                                background: 'rgba(255,255,255,0.03)'
                                            },
                                            onError: (e)=>{
                                                e.target.style.display = 'none';
                                            }
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            className: "gap-2 sm:gap-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: ()=>setEditSetting(null),
                                    className: "text-xs",
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    onClick: handleSaveEdit,
                                    disabled: saving,
                                    className: "text-xs font-medium",
                                    style: {
                                        background: COLORS.green,
                                        color: '#0c0e14'
                                    },
                                    children: saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5 animate-spin"
                                            }),
                                            "Saving..."
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5"
                                            }),
                                            "Save"
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: showCreate,
                onOpenChange: setShowCreate,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-md",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: "New Setting"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogDescription */ .rr, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Add a new configurable setting"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4 py-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Key"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                            value: newKey,
                                            onChange: (e)=>setNewKey(e.target.value),
                                            className: "text-xs font-mono",
                                            placeholder: "e.g. favicon_url",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Label"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                            value: newLabel,
                                            onChange: (e)=>setNewLabel(e.target.value),
                                            className: "text-xs",
                                            placeholder: "e.g. Favicon URL",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Type"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                            value: newType,
                                            onValueChange: setNewType,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                    className: "w-full text-xs",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.05)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                        color: COLORS.text
                                                    },
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                    style: {
                                                        background: 'var(--medq-app-bg, #1a1e2b)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "text",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Text"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "color",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Color"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "image",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Image URL"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "json",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "JSON"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Value"
                                        }),
                                        newType === 'color' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                    type: "color",
                                                    value: newValue || '#000000',
                                                    onChange: (e)=>setNewValue(e.target.value),
                                                    className: "w-10 h-10 rounded-lg border cursor-pointer",
                                                    style: {
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                        background: 'transparent'
                                                    }
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                                    value: newValue,
                                                    onChange: (e)=>setNewValue(e.target.value),
                                                    className: "text-xs font-mono flex-1",
                                                    placeholder: "#00e5a0",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.05)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                        color: COLORS.text
                                                    }
                                                })
                                            ]
                                        }) : newType === 'json' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                            value: newValue,
                                            onChange: (e)=>setNewValue(e.target.value),
                                            rows: 4,
                                            className: "w-full text-xs font-mono p-3 rounded-lg outline-none border resize-y",
                                            placeholder: "{}",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                            value: newValue,
                                            onChange: (e)=>setNewValue(e.target.value),
                                            className: "text-xs",
                                            placeholder: newType === 'image' ? 'https://example.com/image.png' : 'Enter value...',
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            className: "gap-2 sm:gap-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: ()=>setShowCreate(false),
                                    className: "text-xs",
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    onClick: handleCreate,
                                    disabled: saving,
                                    className: "text-xs font-medium",
                                    style: {
                                        background: COLORS.green,
                                        color: '#0c0e14'
                                    },
                                    children: saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5 animate-spin"
                                            }),
                                            "Creating..."
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5"
                                            }),
                                            "Create"
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialog */ .Lt, {
                open: !!deleteKey,
                onOpenChange: (open)=>{
                    if (!open) setDeleteKey(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogContent */ .EO, {
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogHeader */ .wd, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogTitle */ .r7, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                                className: "w-5 h-5",
                                                style: {
                                                    color: COLORS.red
                                                }
                                            }),
                                            "Delete Setting"
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogDescription */ .$v, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: [
                                        "Are you sure you want to delete the setting ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                            style: {
                                                color: COLORS.text
                                            },
                                            children: deleteKey
                                        }),
                                        "? This may affect app behavior if this setting is used elsewhere."
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogFooter */ .ck, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogCancel */ .Zr, {
                                    style: {
                                        color: COLORS.muted,
                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogAction */ .Rx, {
                                    onClick: handleDelete,
                                    disabled: saving,
                                    style: {
                                        background: COLORS.red,
                                        color: '#fff'
                                    },
                                    children: saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5 animate-spin"
                                    }) : 'Delete'
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}
/* ══════════════════════════════════════════════════════════════════════════════
   ADS TAB
   ══════════════════════════════════════════════════════════════════════════════ */ const EMPTY_CAMPAIGN = {
    name: '',
    advertiser: '',
    adType: 'banner',
    placement: 'dashboard_top',
    status: 'active',
    cpm: 0,
    cpc: 0,
    targetUrl: '',
    imageUrl: '',
    title: '',
    subtitle: '',
    ctaText: '',
    priority: 0,
    startDate: new Date().toISOString().slice(0, 10),
    endDate: ''
};
function AdsTab() {
    const [campaigns, setCampaigns] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [showCreate, setShowCreate] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [editCampaign, setEditCampaign] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [saving, setSaving] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [deleteCampaign, setDeleteCampaign] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // Form state for create/edit
    const [form, setForm] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(EMPTY_CAMPAIGN);
    const fetchCampaigns = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        try {
            const res = await fetch('/api/ads/campaigns?all=true');
            if (res.ok) {
                const data = await res.json();
                setCampaigns(data.campaigns || []);
            }
        } catch (err) {
            console.error('Failed to fetch campaigns:', err);
        } finally{
            setLoading(false);
        }
    }, []);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetchCampaigns();
    }, [
        fetchCampaigns
    ]);
    const openCreate = ()=>{
        setForm(EMPTY_CAMPAIGN);
        setShowCreate(true);
    };
    const openEdit = (c)=>{
        setForm({
            name: c.name,
            advertiser: c.advertiser,
            adType: c.adType,
            placement: c.placement,
            status: c.status,
            cpm: c.cpm,
            cpc: c.cpc,
            targetUrl: c.targetUrl,
            imageUrl: c.imageUrl,
            title: c.title,
            subtitle: c.subtitle,
            ctaText: c.ctaText,
            priority: c.priority,
            startDate: new Date(c.startDate).toISOString().slice(0, 10),
            endDate: c.endDate ? new Date(c.endDate).toISOString().slice(0, 10) : ''
        });
        setEditCampaign(c);
    };
    const handleCreate = async ()=>{
        if (!form.name.trim()) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Campaign name is required');
            return;
        }
        setSaving(true);
        try {
            const res = await fetch('/api/ads/campaigns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            if (!res.ok) throw new Error('Failed to create campaign');
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Campaign "${form.name}" created`);
            setShowCreate(false);
            fetchCampaigns();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to create campaign');
            console.error(err);
        } finally{
            setSaving(false);
        }
    };
    const handleUpdate = async ()=>{
        if (!editCampaign) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/ads/campaigns/${editCampaign.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            if (!res.ok) throw new Error('Failed to update campaign');
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Campaign "${form.name}" updated`);
            setEditCampaign(null);
            fetchCampaigns();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to update campaign');
            console.error(err);
        } finally{
            setSaving(false);
        }
    };
    const handleToggleStatus = async (c)=>{
        const nextStatus = c.status === 'active' ? 'paused' : c.status === 'paused' ? 'active' : 'active';
        try {
            const res = await fetch(`/api/ads/campaigns/${c.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: nextStatus
                })
            });
            if (!res.ok) throw new Error('Failed to toggle status');
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Campaign "${c.name}" is now ${nextStatus}`);
            fetchCampaigns();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to update status');
            console.error(err);
        }
    };
    const handleArchive = async (c)=>{
        try {
            const res = await fetch(`/api/ads/campaigns/${c.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: 'archived'
                })
            });
            if (!res.ok) throw new Error('Failed to archive campaign');
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Campaign "${c.name}" archived`);
            fetchCampaigns();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to archive campaign');
            console.error(err);
        }
    };
    const handleDelete = async ()=>{
        if (!deleteCampaign) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/ads/campaigns/${deleteCampaign.id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Failed to delete campaign');
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Campaign "${deleteCampaign.name}" deleted`);
            setDeleteCampaign(null);
            fetchCampaigns();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to delete campaign');
            console.error(err);
        } finally{
            setSaving(false);
        }
    };
    // Aggregate stats
    const totalImpressions = campaigns.reduce((s, c)=>s + c.impressions, 0);
    const totalClicks = campaigns.reduce((s, c)=>s + c.clicks, 0);
    const totalRevenue = campaigns.reduce((s, c)=>s + c.revenue, 0);
    const activeCampaigns = campaigns.filter((c)=>c.status === 'active').length;
    if (loading) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TableSkeleton, {});
    }
    const campaignFormFields = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4 py-2 max-h-[60vh] overflow-y-auto pr-1",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-2 gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2 col-span-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Campaign Name *"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                value: form.name,
                                onChange: (e)=>setForm({
                                        ...form,
                                        name: e.target.value
                                    }),
                                className: "text-xs",
                                placeholder: "e.g. PharmaCo Banner",
                                style: {
                                    background: 'rgba(255,255,255,0.05)',
                                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                    color: COLORS.text
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Advertiser"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                value: form.advertiser,
                                onChange: (e)=>setForm({
                                        ...form,
                                        advertiser: e.target.value
                                    }),
                                className: "text-xs",
                                placeholder: "Company name",
                                style: {
                                    background: 'rgba(255,255,255,0.05)',
                                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                    color: COLORS.text
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Status"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                value: form.status,
                                onValueChange: (v)=>setForm({
                                        ...form,
                                        status: v
                                    }),
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                        className: "w-full text-xs",
                                        style: {
                                            background: 'rgba(255,255,255,0.05)',
                                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                            color: COLORS.text
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                        style: {
                                            background: 'var(--medq-app-bg, #1a1e2b)',
                                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "active",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "Active"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "paused",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "Paused"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "archived",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "Archived"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Ad Type"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                value: form.adType,
                                onValueChange: (v)=>setForm({
                                        ...form,
                                        adType: v
                                    }),
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                        className: "w-full text-xs",
                                        style: {
                                            background: 'rgba(255,255,255,0.05)',
                                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                            color: COLORS.text
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                        style: {
                                            background: 'var(--medq-app-bg, #1a1e2b)',
                                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "banner",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "Banner"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "interstitial",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "Interstitial"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "rewarded",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "Rewarded"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "native",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "Native"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Placement"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                value: form.placement,
                                onValueChange: (v)=>setForm({
                                        ...form,
                                        placement: v
                                    }),
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                        className: "w-full text-xs",
                                        style: {
                                            background: 'rgba(255,255,255,0.05)',
                                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                            color: COLORS.text
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                        style: {
                                            background: 'var(--medq-app-bg, #1a1e2b)',
                                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "dashboard_top",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "Dashboard Top"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "tab_bottom",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "Tab Bottom"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "quiz_result",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "Quiz Result"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "tab_switch",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "Tab Switch"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "CPM ($)"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                type: "number",
                                value: form.cpm,
                                onChange: (e)=>setForm({
                                        ...form,
                                        cpm: parseFloat(e.target.value) || 0
                                    }),
                                className: "text-xs",
                                step: "0.01",
                                style: {
                                    background: 'rgba(255,255,255,0.05)',
                                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                    color: COLORS.text
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "CPC ($)"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                type: "number",
                                value: form.cpc,
                                onChange: (e)=>setForm({
                                        ...form,
                                        cpc: parseFloat(e.target.value) || 0
                                    }),
                                className: "text-xs",
                                step: "0.01",
                                style: {
                                    background: 'rgba(255,255,255,0.05)',
                                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                    color: COLORS.text
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Priority"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                type: "number",
                                value: form.priority,
                                onChange: (e)=>setForm({
                                        ...form,
                                        priority: parseInt(e.target.value) || 0
                                    }),
                                className: "text-xs",
                                style: {
                                    background: 'rgba(255,255,255,0.05)',
                                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                    color: COLORS.text
                                }
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        className: "text-xs font-medium",
                        style: {
                            color: COLORS.muted
                        },
                        children: "Target URL"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                        value: form.targetUrl,
                        onChange: (e)=>setForm({
                                ...form,
                                targetUrl: e.target.value
                            }),
                        className: "text-xs",
                        placeholder: "https://...",
                        style: {
                            background: 'rgba(255,255,255,0.05)',
                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                            color: COLORS.text
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        className: "text-xs font-medium",
                        style: {
                            color: COLORS.muted
                        },
                        children: "Image URL"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                        value: form.imageUrl,
                        onChange: (e)=>setForm({
                                ...form,
                                imageUrl: e.target.value
                            }),
                        className: "text-xs",
                        placeholder: "https://...",
                        style: {
                            background: 'rgba(255,255,255,0.05)',
                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                            color: COLORS.text
                        }
                    }),
                    form.imageUrl && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                        src: form.imageUrl,
                        alt: "Preview",
                        className: "w-full h-20 object-cover rounded-lg",
                        style: {
                            background: 'rgba(255,255,255,0.03)'
                        },
                        onError: (e)=>{
                            e.target.style.display = 'none';
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-2 gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Title"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                value: form.title,
                                onChange: (e)=>setForm({
                                        ...form,
                                        title: e.target.value
                                    }),
                                className: "text-xs",
                                placeholder: "Ad headline",
                                style: {
                                    background: 'rgba(255,255,255,0.05)',
                                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                    color: COLORS.text
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Subtitle"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                value: form.subtitle,
                                onChange: (e)=>setForm({
                                        ...form,
                                        subtitle: e.target.value
                                    }),
                                className: "text-xs",
                                placeholder: "Ad description",
                                style: {
                                    background: 'rgba(255,255,255,0.05)',
                                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                    color: COLORS.text
                                }
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                        className: "text-xs font-medium",
                        style: {
                            color: COLORS.muted
                        },
                        children: "CTA Text"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                        value: form.ctaText,
                        onChange: (e)=>setForm({
                                ...form,
                                ctaText: e.target.value
                            }),
                        className: "text-xs",
                        placeholder: "e.g. Learn More",
                        style: {
                            background: 'rgba(255,255,255,0.05)',
                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                            color: COLORS.text
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-2 gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Start Date"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                type: "date",
                                value: form.startDate,
                                onChange: (e)=>setForm({
                                        ...form,
                                        startDate: e.target.value
                                    }),
                                className: "text-xs",
                                style: {
                                    background: 'rgba(255,255,255,0.05)',
                                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                    color: COLORS.text
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "text-xs font-medium",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "End Date"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                type: "date",
                                value: form.endDate,
                                onChange: (e)=>setForm({
                                        ...form,
                                        endDate: e.target.value
                                    }),
                                className: "text-xs",
                                style: {
                                    background: 'rgba(255,255,255,0.05)',
                                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                    color: COLORS.text
                                }
                            })
                        ]
                    })
                ]
            })
        ]
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                className: "text-sm font-semibold",
                                style: {
                                    color: COLORS.text
                                },
                                children: "Ad Campaigns"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px]",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Manage ad campaigns and track performance"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                        onClick: openCreate,
                        className: "text-xs font-medium h-8",
                        style: {
                            background: COLORS.green,
                            color: '#0c0e14'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5 mr-1.5"
                            }),
                            "New Campaign"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-xl p-3 border",
                        style: {
                            background: COLORS.card,
                            borderColor: COLORS.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2 mb-1",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5",
                                        style: {
                                            color: COLORS.blue
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[9px] font-medium",
                                        style: {
                                            color: COLORS.muted
                                        },
                                        children: "Impressions"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-lg font-bold",
                                style: {
                                    color: COLORS.text
                                },
                                children: formatNumber(totalImpressions)
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-xl p-3 border",
                        style: {
                            background: COLORS.card,
                            borderColor: COLORS.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2 mb-1",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5",
                                        style: {
                                            color: COLORS.purple
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[9px] font-medium",
                                        style: {
                                            color: COLORS.muted
                                        },
                                        children: "Clicks"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-lg font-bold",
                                style: {
                                    color: COLORS.text
                                },
                                children: formatNumber(totalClicks)
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-xl p-3 border",
                        style: {
                            background: COLORS.card,
                            borderColor: COLORS.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2 mb-1",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5",
                                        style: {
                                            color: COLORS.green
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[9px] font-medium",
                                        style: {
                                            color: COLORS.muted
                                        },
                                        children: "Revenue"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-lg font-bold",
                                style: {
                                    color: COLORS.text
                                },
                                children: [
                                    "$",
                                    totalRevenue.toFixed(2)
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-xl p-3 border",
                        style: {
                            background: COLORS.card,
                            borderColor: COLORS.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2 mb-1",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5",
                                        style: {
                                            color: COLORS.amber
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[9px] font-medium",
                                        style: {
                                            color: COLORS.muted
                                        },
                                        children: "Active"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-lg font-bold",
                                style: {
                                    color: COLORS.text
                                },
                                children: activeCampaigns
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "rounded-2xl border overflow-hidden",
                style: {
                    background: COLORS.card,
                    borderColor: COLORS.cardBorder
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "overflow-x-auto",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
                        className: "w-full text-sm",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("thead", {
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                    className: "border-b",
                                    style: {
                                        borderColor: COLORS.cardBorder
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                            className: "text-left px-4 py-3 text-xs font-semibold",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Campaign"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                            className: "text-left px-4 py-3 text-xs font-semibold",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Type"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                            className: "text-left px-4 py-3 text-xs font-semibold",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Placement"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                            className: "text-left px-4 py-3 text-xs font-semibold",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Status"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                            className: "text-right px-4 py-3 text-xs font-semibold",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Impr."
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                            className: "text-right px-4 py-3 text-xs font-semibold",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Clicks"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                            className: "text-right px-4 py-3 text-xs font-semibold",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Revenue"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                            className: "text-right px-4 py-3 text-xs font-semibold",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Actions"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tbody", {
                                children: campaigns.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tr", {
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                        colSpan: 8,
                                        className: "px-4 py-12 text-center",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                                className: "w-8 h-8 mx-auto mb-2",
                                                style: {
                                                    color: COLORS.dimmed
                                                }
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-xs",
                                                style: {
                                                    color: COLORS.dimmed
                                                },
                                                children: "No ad campaigns yet"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[10px] mt-1",
                                                style: {
                                                    color: COLORS.muted
                                                },
                                                children: 'Click "New Campaign" to create one'
                                            })
                                        ]
                                    })
                                }) : campaigns.map((c)=>{
                                    const statusColor = STATUS_COLORS[c.status] || COLORS.muted;
                                    const adTypeColor = ADTYPE_COLORS[c.adType] || COLORS.muted;
                                    const ctr = c.impressions > 0 ? (c.clicks / c.impressions * 100).toFixed(2) : '0.00';
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                        className: "border-b transition-colors hover:bg-white/[0.02]",
                                        style: {
                                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.04))'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                className: "px-4 py-3",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-xs font-medium",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: c.name || 'Unnamed'
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-[9px]",
                                                            style: {
                                                                color: COLORS.dimmed
                                                            },
                                                            children: c.advertiser || 'No advertiser'
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                className: "px-4 py-3",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider",
                                                    style: {
                                                        background: `${adTypeColor}15`,
                                                        color: adTypeColor,
                                                        border: `1px solid ${adTypeColor}30`
                                                    },
                                                    children: c.adType
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                className: "px-4 py-3",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[10px]",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: c.placement.replace(/_/g, ' ')
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                className: "px-4 py-3",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider",
                                                    style: {
                                                        background: `${statusColor}15`,
                                                        color: statusColor,
                                                        border: `1px solid ${statusColor}30`
                                                    },
                                                    children: [
                                                        c.status === 'active' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                                            className: "w-2.5 h-2.5"
                                                        }),
                                                        c.status === 'paused' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                                                            className: "w-2.5 h-2.5"
                                                        }),
                                                        c.status === 'archived' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_35__/* ["default"] */ .A, {
                                                            className: "w-2.5 h-2.5"
                                                        }),
                                                        c.status
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                className: "px-4 py-3 text-right",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-xs font-medium",
                                                    style: {
                                                        color: COLORS.text
                                                    },
                                                    children: formatNumber(c.impressions)
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                                className: "px-4 py-3 text-right",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-xs font-medium",
                                                        style: {
                                                            color: COLORS.text
                                                        },
                                                        children: formatNumber(c.clicks)
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "text-[8px] ml-1",
                                                        style: {
                                                            color: COLORS.muted
                                                        },
                                                        children: [
                                                            "(",
                                                            ctr,
                                                            "%)"
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                className: "px-4 py-3 text-right",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "text-xs font-medium",
                                                    style: {
                                                        color: COLORS.green
                                                    },
                                                    children: [
                                                        "$",
                                                        c.revenue.toFixed(2)
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                className: "px-4 py-3",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center justify-end gap-1",
                                                    children: [
                                                        c.status !== 'archived' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                            onClick: ()=>handleToggleStatus(c),
                                                            className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                            title: c.status === 'active' ? 'Pause' : 'Activate',
                                                            children: c.status === 'active' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_36__/* ["default"] */ .A, {
                                                                className: "w-3.5 h-3.5",
                                                                style: {
                                                                    color: COLORS.green
                                                                }
                                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_37__/* ["default"] */ .A, {
                                                                className: "w-3.5 h-3.5",
                                                                style: {
                                                                    color: COLORS.amber
                                                                }
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                            onClick: ()=>openEdit(c),
                                                            className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                            title: "Edit Campaign",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                                                className: "w-3.5 h-3.5",
                                                                style: {
                                                                    color: COLORS.purple
                                                                }
                                                            })
                                                        }),
                                                        c.status !== 'archived' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                            onClick: ()=>handleArchive(c),
                                                            className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                            title: "Archive",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_35__/* ["default"] */ .A, {
                                                                className: "w-3.5 h-3.5",
                                                                style: {
                                                                    color: COLORS.muted
                                                                }
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                            onClick: ()=>setDeleteCampaign(c),
                                                            className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                            title: "Delete",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                                                className: "w-3.5 h-3.5",
                                                                style: {
                                                                    color: COLORS.red
                                                                }
                                                            })
                                                        })
                                                    ]
                                                })
                                            })
                                        ]
                                    }, c.id);
                                })
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: showCreate,
                onOpenChange: setShowCreate,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-lg",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: "New Ad Campaign"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogDescription */ .rr, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Create a new advertising campaign"
                                })
                            ]
                        }),
                        campaignFormFields,
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            className: "gap-2 sm:gap-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: ()=>setShowCreate(false),
                                    className: "text-xs",
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    onClick: handleCreate,
                                    disabled: saving,
                                    className: "text-xs font-medium",
                                    style: {
                                        background: COLORS.green,
                                        color: '#0c0e14'
                                    },
                                    children: [
                                        saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 mr-1.5 animate-spin"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 mr-1.5"
                                        }),
                                        "Create Campaign"
                                    ]
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: !!editCampaign,
                onOpenChange: (open)=>{
                    if (!open) setEditCampaign(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-lg",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: "Edit Campaign"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogDescription */ .rr, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: [
                                        'Update "',
                                        editCampaign?.name,
                                        '"'
                                    ]
                                })
                            ]
                        }),
                        campaignFormFields,
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            className: "gap-2 sm:gap-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: ()=>setEditCampaign(null),
                                    className: "text-xs",
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    onClick: handleUpdate,
                                    disabled: saving,
                                    className: "text-xs font-medium",
                                    style: {
                                        background: COLORS.green,
                                        color: '#0c0e14'
                                    },
                                    children: [
                                        saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 mr-1.5 animate-spin"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 mr-1.5"
                                        }),
                                        "Save Changes"
                                    ]
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialog */ .Lt, {
                open: !!deleteCampaign,
                onOpenChange: (open)=>{
                    if (!open) setDeleteCampaign(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogContent */ .EO, {
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogHeader */ .wd, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogTitle */ .r7, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                                className: "w-5 h-5",
                                                style: {
                                                    color: COLORS.red
                                                }
                                            }),
                                            "Delete Campaign"
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogDescription */ .$v, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: [
                                        "Are you sure you want to delete ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                            style: {
                                                color: COLORS.text
                                            },
                                            children: deleteCampaign?.name
                                        }),
                                        "? This will also remove all impression and click data."
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogFooter */ .ck, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogCancel */ .Zr, {
                                    style: {
                                        color: COLORS.muted,
                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogAction */ .Rx, {
                                    onClick: handleDelete,
                                    disabled: saving,
                                    style: {
                                        background: COLORS.red,
                                        color: '#fff'
                                    },
                                    children: saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5 animate-spin"
                                    }) : 'Delete'
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}
const BUILTIN_CATEGORIES = [
    {
        value: 'skeletal',
        label: 'Skeletal',
        emoji: '🦴',
        color: '#f5f0e0'
    },
    {
        value: 'muscular',
        label: 'Muscular',
        emoji: '💪',
        color: '#c0392b'
    },
    {
        value: 'cardiovascular',
        label: 'Cardiovascular',
        emoji: '🩸',
        color: '#e74c3c'
    },
    {
        value: 'nervous',
        label: 'Nervous',
        emoji: '🧠',
        color: '#f1c40f'
    },
    {
        value: 'digestive',
        label: 'Digestive',
        emoji: '🫁',
        color: '#d4956a'
    },
    {
        value: 'respiratory',
        label: 'Respiratory',
        emoji: '🌬️',
        color: '#f0a0a0'
    },
    {
        value: 'urinary',
        label: 'Urinary',
        emoji: '💧',
        color: '#b05050'
    },
    {
        value: 'reproductive',
        label: 'Reproductive',
        emoji: '🧬',
        color: '#ec4899'
    },
    {
        value: 'endocrine',
        label: 'Endocrine',
        emoji: '🦋',
        color: '#a855f7'
    },
    {
        value: 'lymphatic',
        label: 'Lymphatic',
        emoji: '🛡️',
        color: '#06b6d4'
    },
    {
        value: 'integumentary',
        label: 'Integumentary',
        emoji: '🧍',
        color: '#e8b89d'
    }
];
const MODEL_CATEGORIES = [
    {
        value: 'custom',
        label: 'Custom',
        color: COLORS.cyan
    },
    {
        value: 'skeletal',
        label: 'Skeletal',
        color: '#f5f0e0'
    },
    {
        value: 'muscular',
        label: 'Muscular',
        color: '#c0392b'
    },
    {
        value: 'cardiovascular',
        label: 'Cardiovascular',
        color: '#e74c3c'
    },
    {
        value: 'nervous',
        label: 'Nervous',
        color: '#f1c40f'
    },
    {
        value: 'digestive',
        label: 'Digestive',
        color: '#d4956a'
    },
    {
        value: 'respiratory',
        label: 'Respiratory',
        color: '#f0a0a0'
    },
    {
        value: 'urinary',
        label: 'Urinary',
        color: '#b05050'
    }
];
function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function ModelsTab() {
    // ── Tab toggle: built-in vs custom ──
    const [modelTab, setModelTab] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('builtin');
    // ── Custom models state ──
    const [models, setModels] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [saving, setSaving] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showUpload, setShowUpload] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [editModel, setEditModel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [deleteModel, setDeleteModel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [searchQuery, setSearchQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [categoryFilter, setCategoryFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    // ── Built-in models state ──
    const [builtInModels, setBuiltInModels] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [builtInLoading, setBuiltInLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [builtInSearch, setBuiltInSearch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [builtInCategoryFilter, setBuiltInCategoryFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    const [builtInTotal, setBuiltInTotal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [builtInOffset, setBuiltInOffset] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [builtInLimit] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(60);
    const [previewModel, setPreviewModel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [editingBuiltIn, setEditingBuiltIn] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [editBuiltInName, setEditBuiltInName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [editBuiltInCategory, setEditBuiltInCategory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [editBuiltInTags, setEditBuiltInTags] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [editBuiltInSaving, setEditBuiltInSaving] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Upload form state
    const [uploadName, setUploadName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [uploadDescription, setUploadDescription] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [uploadCategory, setUploadCategory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('custom');
    const [uploadColor, setUploadColor] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('#c0c0c0');
    const [uploadTags, setUploadTags] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [uploadFile, setUploadFile] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // Edit form state
    const [editName, setEditName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [editDescription, setEditDescription] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [editCategory, setEditCategory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('custom');
    const [editColor, setEditColor] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('#c0c0c0');
    const [editTags, setEditTags] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [editIsPublic, setEditIsPublic] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    // ── Fetch built-in models (debounced search) ──
    const builtInSearchTimeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const fetchBuiltInModels = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setBuiltInLoading(true);
        try {
            const params = new URLSearchParams({
                action: 'catalog',
                limit: builtInLimit.toString(),
                offset: builtInOffset.toString()
            });
            if (builtInCategoryFilter !== 'all') params.set('category', builtInCategoryFilter);
            if (builtInSearch.trim()) params.set('search', builtInSearch.trim());
            const res = await fetch(`/api/anatomy-3d?${params}`);
            if (res.ok) {
                const data = await res.json();
                setBuiltInModels(data.models || []);
                setBuiltInTotal(data.pagination?.total || 0);
            }
        } catch (err) {
            console.error('Failed to fetch built-in models:', err);
        } finally{
            setBuiltInLoading(false);
        }
    }, [
        builtInLimit,
        builtInOffset,
        builtInCategoryFilter,
        builtInSearch
    ]);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (modelTab === 'builtin') {
            fetchBuiltInModels();
        }
    }, [
        modelTab,
        fetchBuiltInModels
    ]);
    const fetchModels = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        try {
            const res = await fetch('/api/admin/models');
            if (res.ok) {
                const data = await res.json();
                setModels(data.models || []);
            }
        } catch (err) {
            console.error('Failed to fetch models:', err);
        } finally{
            setLoading(false);
        }
    }, []);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (modelTab === 'custom') {
            fetchModels();
        }
    }, [
        fetchModels,
        modelTab
    ]);
    const handleUpload = async ()=>{
        if (!uploadFile) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Please select a file to upload');
            return;
        }
        if (!uploadName.trim()) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Model name is required');
            return;
        }
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append('name', uploadName);
            formData.append('description', uploadDescription);
            formData.append('category', uploadCategory);
            formData.append('color', uploadColor);
            formData.append('tags', JSON.stringify(uploadTags.split(',').map((t)=>t.trim()).filter(Boolean)));
            formData.append('file', uploadFile);
            const res = await fetch('/api/admin/models', {
                method: 'POST',
                body: formData
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to upload model');
            }
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Model "${uploadName}" uploaded`);
            setShowUpload(false);
            resetUploadForm();
            fetchModels();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(err instanceof Error ? err.message : 'Failed to upload model');
            console.error(err);
        } finally{
            setSaving(false);
        }
    };
    const resetUploadForm = ()=>{
        setUploadName('');
        setUploadDescription('');
        setUploadCategory('custom');
        setUploadColor('#c0c0c0');
        setUploadTags('');
        setUploadFile(null);
    };
    const openEdit = (model)=>{
        setEditModel(model);
        setEditName(model.name);
        setEditDescription(model.description);
        setEditCategory(model.category);
        setEditColor(model.color);
        try {
            const parsed = JSON.parse(model.tags);
            setEditTags(Array.isArray(parsed) ? parsed.join(', ') : '');
        } catch  {
            setEditTags('');
        }
        setEditIsPublic(model.isPublic);
    };
    const handleUpdate = async ()=>{
        if (!editModel) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/admin/models/${editModel.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: editName,
                    description: editDescription,
                    category: editCategory,
                    color: editColor,
                    tags: JSON.stringify(editTags.split(',').map((t)=>t.trim()).filter(Boolean)),
                    isPublic: editIsPublic
                })
            });
            if (!res.ok) throw new Error('Failed to update model');
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Model "${editName}" updated`);
            setEditModel(null);
            fetchModels();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to update model');
            console.error(err);
        } finally{
            setSaving(false);
        }
    };
    const handleDelete = async ()=>{
        if (!deleteModel) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/admin/models/${deleteModel.id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Failed to delete model');
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Model "${deleteModel.name}" deleted`);
            setDeleteModel(null);
            fetchModels();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to delete model');
            console.error(err);
        } finally{
            setSaving(false);
        }
    };
    // Filter models
    const filteredModels = models.filter((m)=>{
        const matchesSearch = !searchQuery.trim() || m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.description.toLowerCase().includes(searchQuery.toLowerCase()) || m.fileName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || m.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });
    // Stats
    const totalModels = models.length;
    const totalSize = models.reduce((s, m)=>s + m.fileSize, 0);
    const publicModels = models.filter((m)=>m.isPublic).length;
    const categoryCounts = {};
    models.forEach((m)=>{
        categoryCounts[m.category] = (categoryCounts[m.category] || 0) + 1;
    });
    // Built-in pagination
    const builtInTotalPages = Math.ceil(builtInTotal / builtInLimit);
    if (modelTab === 'custom' && loading) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TableSkeleton, {});
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                className: "text-sm font-semibold",
                                style: {
                                    color: COLORS.text
                                },
                                children: "3D Model Manager"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px]",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Browse built-in and manage custom 3D anatomy models"
                            })
                        ]
                    }),
                    modelTab === 'custom' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                        onClick: ()=>{
                            resetUploadForm();
                            setShowUpload(true);
                        },
                        className: "text-xs font-medium h-8",
                        style: {
                            background: COLORS.green,
                            color: '#0c0e14'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_38__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5 mr-1.5"
                            }),
                            "Upload Model"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-1 p-1 rounded-xl",
                style: {
                    background: COLORS.card,
                    border: `1px solid ${COLORS.cardBorder}`
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>setModelTab('builtin'),
                        className: "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all",
                        style: {
                            background: modelTab === 'builtin' ? `${COLORS.cyan}15` : 'transparent',
                            border: `1px solid ${modelTab === 'builtin' ? `${COLORS.cyan}30` : 'transparent'}`,
                            color: modelTab === 'builtin' ? COLORS.cyan : COLORS.muted
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Built-in Models",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[9px] px-1.5 py-0.5 rounded-full",
                                style: {
                                    background: `${COLORS.cyan}15`,
                                    color: COLORS.cyan
                                },
                                children: builtInTotal > 0 ? formatNumber(builtInTotal) : '2,234'
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>setModelTab('custom'),
                        className: "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all",
                        style: {
                            background: modelTab === 'custom' ? `${COLORS.purple}15` : 'transparent',
                            border: `1px solid ${modelTab === 'custom' ? `${COLORS.purple}30` : 'transparent'}`,
                            color: modelTab === 'custom' ? COLORS.purple : COLORS.muted
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_38__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Custom Models",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[9px] px-1.5 py-0.5 rounded-full",
                                style: {
                                    background: `${COLORS.purple}15`,
                                    color: COLORS.purple
                                },
                                children: totalModels
                            })
                        ]
                    })
                ]
            }),
            modelTab === 'builtin' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col sm:flex-row items-start sm:items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "relative flex-1 w-full sm:max-w-xs",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_40__/* ["default"] */ .A, {
                                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                                        style: {
                                            color: COLORS.muted
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                        type: "text",
                                        placeholder: "Search built-in models...",
                                        value: builtInSearch,
                                        onChange: (e)=>{
                                            setBuiltInSearch(e.target.value);
                                            setBuiltInOffset(0);
                                            // Debounce search
                                            if (builtInSearchTimeoutRef.current) clearTimeout(builtInSearchTimeoutRef.current);
                                            builtInSearchTimeoutRef.current = setTimeout(()=>{
                                                fetchBuiltInModels();
                                            }, 400);
                                        },
                                        className: "w-full h-9 pl-9 pr-3 rounded-lg text-xs outline-none transition-all border",
                                        style: {
                                            background: 'rgba(255,255,255,0.03)',
                                            borderColor: COLORS.cardBorder,
                                            color: COLORS.text
                                        }
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                value: builtInCategoryFilter,
                                onValueChange: (v)=>{
                                    setBuiltInCategoryFilter(v);
                                    setBuiltInOffset(0);
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                        className: "w-full sm:w-[180px] text-xs",
                                        style: {
                                            background: 'rgba(255,255,255,0.03)',
                                            borderColor: COLORS.cardBorder,
                                            color: COLORS.text
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {
                                            placeholder: "Category"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                        style: {
                                            background: 'var(--medq-app-bg, #1a1e2b)',
                                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "all",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "All Categories"
                                            }),
                                            BUILTIN_CATEGORIES.map((cat)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                    value: cat.value,
                                                    style: {
                                                        color: COLORS.text
                                                    },
                                                    children: [
                                                        cat.emoji,
                                                        " ",
                                                        cat.label
                                                    ]
                                                }, cat.value))
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-[10px] ml-auto",
                                style: {
                                    color: COLORS.muted
                                },
                                children: [
                                    builtInTotal,
                                    " model",
                                    builtInTotal !== 1 ? 's' : '',
                                    " found"
                                ]
                            })
                        ]
                    }),
                    builtInLoading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                        children: Array.from({
                            length: 6
                        }).map((_, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "rounded-2xl p-5 border",
                                style: {
                                    background: COLORS.card,
                                    borderColor: COLORS.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__/* .Skeleton */ .E, {
                                        className: "h-5 w-24 mb-3",
                                        style: {
                                            background: 'rgba(255,255,255,0.06)'
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__/* .Skeleton */ .E, {
                                        className: "h-4 w-full mb-2",
                                        style: {
                                            background: 'rgba(255,255,255,0.04)'
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_5__/* .Skeleton */ .E, {
                                        className: "h-4 w-16",
                                        style: {
                                            background: 'rgba(255,255,255,0.04)'
                                        }
                                    })
                                ]
                            }, i))
                    }) : builtInModels.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-2xl border p-12 text-center",
                        style: {
                            background: COLORS.card,
                            borderColor: COLORS.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                                className: "w-8 h-8 mx-auto mb-2",
                                style: {
                                    color: COLORS.dimmed
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-xs mb-1",
                                style: {
                                    color: COLORS.dimmed
                                },
                                children: "No built-in models found"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px]",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Try adjusting your search or category filter"
                            })
                        ]
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto",
                                style: {
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: `${COLORS.dimmed} transparent`
                                },
                                children: builtInModels.map((model, i)=>{
                                    const catMeta = BUILTIN_CATEGORIES.find((c)=>c.value === model.category);
                                    const catColor = catMeta?.color || COLORS.cyan;
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                                        initial: {
                                            opacity: 0,
                                            y: 12
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            duration: 0.3,
                                            delay: i * 0.02
                                        },
                                        className: "rounded-2xl p-4 border transition-all hover:border-white/[0.1]",
                                        style: {
                                            background: COLORS.card,
                                            borderColor: COLORS.cardBorder
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center justify-between mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex items-center gap-2 min-w-0 flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0",
                                                                style: {
                                                                    background: `${catColor}15`,
                                                                    color: catColor
                                                                },
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                                                                    className: "w-3 h-3"
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "min-w-0",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                    className: "text-[11px] font-semibold truncate",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: model.name
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "inline-flex items-center px-1.5 py-0.5 rounded text-[7px] font-bold uppercase tracking-wider flex-shrink-0",
                                                        style: {
                                                            background: `${catColor}15`,
                                                            color: catColor,
                                                            border: `1px solid ${catColor}30`
                                                        },
                                                        children: "OBJ"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "mb-2 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "text-[9px]",
                                                        style: {
                                                            color: COLORS.dimmed
                                                        },
                                                        children: [
                                                            catMeta?.emoji,
                                                            " ",
                                                            catMeta?.label || model.category
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-[9px] font-mono",
                                                        style: {
                                                            color: COLORS.dimmed
                                                        },
                                                        children: model.id
                                                    }),
                                                    model.mirrored && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-[7px] px-1 py-0.5 rounded",
                                                        style: {
                                                            background: `${COLORS.amber}15`,
                                                            color: COLORS.amber,
                                                            border: `1px solid ${COLORS.amber}20`
                                                        },
                                                        children: "Mirror"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center justify-end gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                        onClick: ()=>setPreviewModel(model),
                                                        className: "flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-semibold transition-all hover:brightness-110",
                                                        style: {
                                                            background: `${COLORS.cyan}10`,
                                                            border: `1px solid ${COLORS.cyan}20`,
                                                            color: COLORS.cyan
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                                                className: "w-2.5 h-2.5"
                                                            }),
                                                            "3D View"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                        onClick: ()=>{
                                                            setEditingBuiltIn(model);
                                                            setEditBuiltInName(model.name);
                                                            setEditBuiltInCategory(model.category);
                                                            setEditBuiltInTags('');
                                                        },
                                                        className: "flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-semibold transition-all hover:brightness-110",
                                                        style: {
                                                            background: `${COLORS.amber}10`,
                                                            border: `1px solid ${COLORS.amber}20`,
                                                            color: COLORS.amber
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                                                className: "w-2.5 h-2.5"
                                                            }),
                                                            "Edit"
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }, model.id);
                                })
                            }),
                            builtInTotalPages > 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center justify-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setBuiltInOffset(Math.max(0, builtInOffset - builtInLimit)),
                                        disabled: builtInOffset === 0,
                                        className: "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-30",
                                        style: {
                                            background: COLORS.card,
                                            border: `1px solid ${COLORS.cardBorder}`,
                                            color: COLORS.text
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_41__/* ["default"] */ .A, {
                                                className: "w-3 h-3"
                                            }),
                                            "Prev"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-[10px] px-2",
                                        style: {
                                            color: COLORS.muted
                                        },
                                        children: [
                                            "Page ",
                                            Math.floor(builtInOffset / builtInLimit) + 1,
                                            " of ",
                                            builtInTotalPages
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setBuiltInOffset(builtInOffset + builtInLimit),
                                        disabled: builtInOffset + builtInLimit >= builtInTotal,
                                        className: "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-30",
                                        style: {
                                            background: COLORS.card,
                                            border: `1px solid ${COLORS.cardBorder}`,
                                            color: COLORS.text
                                        },
                                        children: [
                                            "Next",
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_42__/* ["default"] */ .A, {
                                                className: "w-3 h-3"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            modelTab === 'custom' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                        children: [
                            {
                                label: 'Total Models',
                                value: totalModels,
                                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                }),
                                color: COLORS.cyan,
                                bgColor: `${COLORS.cyan}15`
                            },
                            {
                                label: 'Total Size',
                                value: formatFileSize(totalSize),
                                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_43__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                }),
                                color: COLORS.purple,
                                bgColor: `${COLORS.purple}15`
                            },
                            {
                                label: 'Public',
                                value: publicModels,
                                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                }),
                                color: COLORS.green,
                                bgColor: `${COLORS.green}15`
                            },
                            {
                                label: 'Categories',
                                value: Object.keys(categoryCounts).length,
                                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_44__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                }),
                                color: COLORS.amber,
                                bgColor: `${COLORS.amber}15`
                            }
                        ].map((stat, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StatCard, {
                                label: stat.label,
                                value: stat.value,
                                icon: stat.icon,
                                color: stat.color,
                                bgColor: stat.bgColor,
                                index: i
                            }, stat.label))
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col sm:flex-row items-start sm:items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "relative flex-1 w-full sm:max-w-xs",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_40__/* ["default"] */ .A, {
                                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                                        style: {
                                            color: COLORS.muted
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                        type: "text",
                                        placeholder: "Search models...",
                                        value: searchQuery,
                                        onChange: (e)=>setSearchQuery(e.target.value),
                                        className: "w-full h-9 pl-9 pr-3 rounded-lg text-xs outline-none transition-all border",
                                        style: {
                                            background: 'rgba(255,255,255,0.03)',
                                            borderColor: COLORS.cardBorder,
                                            color: COLORS.text
                                        }
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                value: categoryFilter,
                                onValueChange: setCategoryFilter,
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                        className: "w-full sm:w-[160px] text-xs",
                                        style: {
                                            background: 'rgba(255,255,255,0.03)',
                                            borderColor: COLORS.cardBorder,
                                            color: COLORS.text
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {
                                            placeholder: "Category"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                        style: {
                                            background: 'var(--medq-app-bg, #1a1e2b)',
                                            borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                value: "all",
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: "All Categories"
                                            }),
                                            MODEL_CATEGORIES.map((cat)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                    value: cat.value,
                                                    style: {
                                                        color: COLORS.text
                                                    },
                                                    children: cat.label
                                                }, cat.value))
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-[10px] ml-auto",
                                style: {
                                    color: COLORS.muted
                                },
                                children: [
                                    filteredModels.length,
                                    " model",
                                    filteredModels.length !== 1 ? 's' : ''
                                ]
                            })
                        ]
                    }),
                    filteredModels.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-2xl border p-12 text-center",
                        style: {
                            background: COLORS.card,
                            borderColor: COLORS.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                                className: "w-8 h-8 mx-auto mb-2",
                                style: {
                                    color: COLORS.dimmed
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-xs mb-1",
                                style: {
                                    color: COLORS.dimmed
                                },
                                children: models.length === 0 ? 'No models uploaded yet' : 'No models match your search'
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px]",
                                style: {
                                    color: COLORS.muted
                                },
                                children: models.length === 0 ? 'Click "Upload Model" to add your first 3D model' : 'Try adjusting your search or category filter'
                            })
                        ]
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                        children: filteredModels.map((model, i)=>{
                            const catMeta = MODEL_CATEGORIES.find((c)=>c.value === model.category);
                            const catColor = catMeta?.color || COLORS.cyan;
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                                initial: {
                                    opacity: 0,
                                    y: 12
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: 0.3,
                                    delay: i * 0.04
                                },
                                className: "rounded-2xl p-5 border transition-all hover:border-white/[0.1]",
                                style: {
                                    background: COLORS.card,
                                    borderColor: COLORS.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center justify-between mb-3",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "w-7 h-7 rounded-md flex items-center justify-center",
                                                        style: {
                                                            background: `${catColor}15`,
                                                            color: catColor
                                                        },
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                                                            className: "w-3.5 h-3.5"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-xs font-semibold",
                                                                style: {
                                                                    color: COLORS.text
                                                                },
                                                                children: model.name
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-[9px] font-mono",
                                                                style: {
                                                                    color: COLORS.dimmed
                                                                },
                                                                children: model.fileName
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider",
                                                        style: {
                                                            background: `${catColor}15`,
                                                            color: catColor,
                                                            border: `1px solid ${catColor}30`
                                                        },
                                                        children: model.fileType
                                                    }),
                                                    !model.isPublic && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider",
                                                        style: {
                                                            background: `${COLORS.amber}15`,
                                                            color: COLORS.amber,
                                                            border: `1px solid ${COLORS.amber}30`
                                                        },
                                                        children: "Private"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "mb-3 space-y-1",
                                        children: [
                                            model.description && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[10px] truncate",
                                                style: {
                                                    color: COLORS.muted
                                                },
                                                children: model.description
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-[9px]",
                                                        style: {
                                                            color: COLORS.dimmed
                                                        },
                                                        children: catMeta?.label || model.category
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-[9px]",
                                                        style: {
                                                            color: COLORS.dimmed
                                                        },
                                                        children: formatFileSize(model.fileSize)
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "flex items-center gap-1",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "w-3 h-3 rounded-full border",
                                                            style: {
                                                                background: model.color,
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                                            }
                                                        })
                                                    })
                                                ]
                                            }),
                                            (()=>{
                                                try {
                                                    const parsedTags = JSON.parse(model.tags);
                                                    if (Array.isArray(parsedTags) && parsedTags.length > 0) {
                                                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex items-center gap-1 flex-wrap mt-1",
                                                            children: [
                                                                parsedTags.slice(0, 3).map((tag)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                        className: "px-1.5 py-0.5 rounded text-[7px] font-medium",
                                                                        style: {
                                                                            background: `${COLORS.cyan}10`,
                                                                            color: COLORS.cyan,
                                                                            border: `1px solid ${COLORS.cyan}20`
                                                                        },
                                                                        children: tag
                                                                    }, tag)),
                                                                parsedTags.length > 3 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                    className: "text-[7px]",
                                                                    style: {
                                                                        color: COLORS.dimmed
                                                                    },
                                                                    children: [
                                                                        "+",
                                                                        parsedTags.length - 3
                                                                    ]
                                                                })
                                                            ]
                                                        });
                                                    }
                                                } catch  {}
                                                return null;
                                            })()
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[8px]",
                                                style: {
                                                    color: COLORS.dimmed
                                                },
                                                children: formatDate(model.createdAt)
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                        onClick: ()=>openEdit(model),
                                                        className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                        title: "Edit Model",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                                            className: "w-3 h-3",
                                                            style: {
                                                                color: COLORS.purple
                                                            }
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                        onClick: ()=>setDeleteModel(model),
                                                        className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                        title: "Delete Model",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                                            className: "w-3 h-3",
                                                            style: {
                                                                color: COLORS.red
                                                            }
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }, model.id);
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: !!previewModel,
                onOpenChange: (open)=>{
                    if (!open) setPreviewModel(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-3xl max-h-[90vh]",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                                style: {
                                                    color: COLORS.text
                                                },
                                                children: [
                                                    "Preview: ",
                                                    previewModel?.name
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogDescription */ .rr, {
                                                style: {
                                                    color: COLORS.muted
                                                },
                                                children: [
                                                    "Built-in BodyParts3D model — ",
                                                    previewModel?.category
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "inline-flex items-center px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider",
                                                style: {
                                                    background: `${BUILTIN_CATEGORIES.find((c)=>c.value === previewModel?.category)?.color || COLORS.cyan}15`,
                                                    color: BUILTIN_CATEGORIES.find((c)=>c.value === previewModel?.category)?.color || COLORS.cyan,
                                                    border: `1px solid ${BUILTIN_CATEGORIES.find((c)=>c.value === previewModel?.category)?.color || COLORS.cyan}30`
                                                },
                                                children: [
                                                    BUILTIN_CATEGORIES.find((c)=>c.value === previewModel?.category)?.emoji,
                                                    " ",
                                                    BUILTIN_CATEGORIES.find((c)=>c.value === previewModel?.category)?.label || previewModel?.category
                                                ]
                                            }),
                                            previewModel?.mirrored && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[9px] px-1.5 py-0.5 rounded",
                                                style: {
                                                    background: `${COLORS.amber}15`,
                                                    color: COLORS.amber,
                                                    border: `1px solid ${COLORS.amber}20`
                                                },
                                                children: "Mirrored"
                                            })
                                        ]
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                                previewModel && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-full h-[450px] rounded-lg overflow-hidden border",
                                    style: {
                                        borderColor: COLORS.cardBorder
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(OBJModelViewer, {
                                        modelId: previewModel.id,
                                        fjId: previewModel.fjId,
                                        category: previewModel.category,
                                        modelName: previewModel.name,
                                        showHeader: false
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-[9px] font-mono",
                                            style: {
                                                color: COLORS.dimmed
                                            },
                                            children: [
                                                "FJ ID: ",
                                                previewModel?.fjId
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-[9px]",
                                            style: {
                                                color: COLORS.dimmed
                                            },
                                            children: [
                                                "ID: ",
                                                previewModel?.id
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                variant: "ghost",
                                onClick: ()=>setPreviewModel(null),
                                className: "text-xs",
                                style: {
                                    color: COLORS.muted
                                },
                                children: "Close"
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: !!editingBuiltIn,
                onOpenChange: (open)=>{
                    if (!open) setEditingBuiltIn(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-lg",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: "Edit Built-in Model"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogDescription */ .rr, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: [
                                        "Update properties for ",
                                        editingBuiltIn?.name
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4 py-2",
                            children: [
                                editingBuiltIn && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-full h-40 rounded-lg overflow-hidden border",
                                    style: {
                                        borderColor: COLORS.cardBorder
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(OBJModelViewer, {
                                        modelId: editingBuiltIn.id,
                                        fjId: editingBuiltIn.fjId,
                                        category: editingBuiltIn.category,
                                        modelName: editingBuiltIn.name,
                                        showHeader: false
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Model Name"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                            value: editBuiltInName,
                                            onChange: (e)=>setEditBuiltInName(e.target.value),
                                            className: "text-sm",
                                            style: {
                                                background: COLORS.card,
                                                borderColor: COLORS.cardBorder,
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Category"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                            value: editBuiltInCategory,
                                            onValueChange: setEditBuiltInCategory,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                    style: {
                                                        background: COLORS.card,
                                                        borderColor: COLORS.cardBorder,
                                                        color: COLORS.text
                                                    },
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                    style: {
                                                        background: 'var(--medq-app-bg, #1a1e2b)',
                                                        borderColor: COLORS.cardBorder
                                                    },
                                                    children: BUILTIN_CATEGORIES.map((cat)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: cat.value,
                                                            children: [
                                                                cat.emoji,
                                                                " ",
                                                                cat.label
                                                            ]
                                                        }, cat.value))
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Tags (comma separated)"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                            value: editBuiltInTags,
                                            onChange: (e)=>setEditBuiltInTags(e.target.value),
                                            placeholder: "e.g., bone, upper limb, anatomy",
                                            className: "text-sm",
                                            style: {
                                                background: COLORS.card,
                                                borderColor: COLORS.cardBorder,
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-3 text-[9px]",
                                    style: {
                                        color: COLORS.dimmed
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            children: [
                                                "FJ ID: ",
                                                editingBuiltIn?.fjId
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            children: "•"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            children: [
                                                "Internal ID: ",
                                                editingBuiltIn?.id
                                            ]
                                        }),
                                        editingBuiltIn?.mirrored && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    children: "•"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    style: {
                                                        color: COLORS.amber
                                                    },
                                                    children: "Mirrored"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            className: "gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: ()=>setEditingBuiltIn(null),
                                    className: "text-xs",
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    onClick: async ()=>{
                                        if (!editingBuiltIn) return;
                                        setEditBuiltInSaving(true);
                                        try {
                                            const res = await fetch('/api/admin/models', {
                                                method: 'PATCH',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    id: editingBuiltIn.id,
                                                    fjId: editingBuiltIn.fjId,
                                                    name: editBuiltInName,
                                                    category: editBuiltInCategory,
                                                    tags: editBuiltInTags,
                                                    isBuiltIn: true
                                                })
                                            });
                                            if (res.ok) {
                                                sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success('Model updated successfully');
                                                // Update local state
                                                setBuiltInModels((prev)=>prev.map((m)=>m.id === editingBuiltIn.id ? {
                                                            ...m,
                                                            name: editBuiltInName,
                                                            category: editBuiltInCategory
                                                        } : m));
                                                setEditingBuiltIn(null);
                                            } else {
                                                sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to update model');
                                            }
                                        } catch  {
                                            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to update model');
                                        }
                                        setEditBuiltInSaving(false);
                                    },
                                    disabled: editBuiltInSaving,
                                    className: "text-xs",
                                    style: {
                                        background: COLORS.cyan,
                                        color: '#000'
                                    },
                                    children: [
                                        editBuiltInSaving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                            className: "w-3 h-3 animate-spin mr-1"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                            className: "w-3 h-3 mr-1"
                                        }),
                                        "Save Changes"
                                    ]
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: showUpload,
                onOpenChange: setShowUpload,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-md",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: "Upload 3D Model"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogDescription */ .rr, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Upload an OBJ, STL, or GLB file for the anatomy viewer"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4 py-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Model Name *"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                            value: uploadName,
                                            onChange: (e)=>setUploadName(e.target.value),
                                            className: "text-xs",
                                            placeholder: "e.g. Custom Femur Model",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Description"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                            value: uploadDescription,
                                            onChange: (e)=>setUploadDescription(e.target.value),
                                            rows: 3,
                                            className: "w-full text-xs p-3 rounded-lg outline-none border resize-y",
                                            placeholder: "Brief description of the model...",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "grid grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                    className: "text-xs font-medium",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: "Category"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                                    value: uploadCategory,
                                                    onValueChange: setUploadCategory,
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                            className: "w-full text-xs",
                                                            style: {
                                                                background: 'rgba(255,255,255,0.05)',
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                                color: COLORS.text
                                                            },
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                            style: {
                                                                background: 'var(--medq-app-bg, #1a1e2b)',
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                                            },
                                                            children: MODEL_CATEGORIES.map((cat)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: cat.value,
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: cat.label
                                                                }, cat.value))
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                    className: "text-xs font-medium",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: "Display Color"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                            type: "color",
                                                            value: uploadColor,
                                                            onChange: (e)=>setUploadColor(e.target.value),
                                                            className: "w-8 h-8 rounded-lg border cursor-pointer flex-shrink-0",
                                                            style: {
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                                background: 'transparent'
                                                            }
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                                            value: uploadColor,
                                                            onChange: (e)=>setUploadColor(e.target.value),
                                                            className: "text-xs font-mono flex-1",
                                                            placeholder: "#c0c0c0",
                                                            style: {
                                                                background: 'rgba(255,255,255,0.05)',
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                                color: COLORS.text
                                                            }
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Tags (comma separated)"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                            value: uploadTags,
                                            onChange: (e)=>setUploadTags(e.target.value),
                                            className: "text-xs",
                                            placeholder: "anatomy, femur, bone",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Model File *"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "border-2 border-dashed rounded-lg p-4 text-center transition-colors",
                                            style: {
                                                borderColor: uploadFile ? `${COLORS.green}40` : 'rgba(255,255,255,0.1)',
                                                background: uploadFile ? `${COLORS.green}05` : 'rgba(255,255,255,0.02)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                    type: "file",
                                                    accept: ".obj,.stl,.glb",
                                                    onChange: (e)=>setUploadFile(e.target.files?.[0] || null),
                                                    className: "hidden",
                                                    id: "model-file-input"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                    htmlFor: "model-file-input",
                                                    className: "cursor-pointer",
                                                    children: uploadFile ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_43__/* ["default"] */ .A, {
                                                                className: "w-6 h-6 mx-auto mb-1",
                                                                style: {
                                                                    color: COLORS.green
                                                                }
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-xs font-medium",
                                                                style: {
                                                                    color: COLORS.green
                                                                },
                                                                children: uploadFile.name
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-[9px]",
                                                                style: {
                                                                    color: COLORS.muted
                                                                },
                                                                children: formatFileSize(uploadFile.size)
                                                            })
                                                        ]
                                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_38__/* ["default"] */ .A, {
                                                                className: "w-6 h-6 mx-auto mb-1",
                                                                style: {
                                                                    color: COLORS.dimmed
                                                                }
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-xs",
                                                                style: {
                                                                    color: COLORS.dimmed
                                                                },
                                                                children: "Click to select file"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-[9px]",
                                                                style: {
                                                                    color: COLORS.muted
                                                                },
                                                                children: "OBJ, STL, or GLB"
                                                            })
                                                        ]
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            className: "gap-2 sm:gap-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: ()=>setShowUpload(false),
                                    className: "text-xs",
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    onClick: handleUpload,
                                    disabled: saving,
                                    className: "text-xs font-medium",
                                    style: {
                                        background: COLORS.green,
                                        color: '#0c0e14'
                                    },
                                    children: saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5 animate-spin"
                                            }),
                                            "Uploading..."
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_38__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5"
                                            }),
                                            "Upload"
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: !!editModel,
                onOpenChange: (open)=>{
                    if (!open) setEditModel(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-md",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: "Edit Model"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogDescription */ .rr, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: [
                                        'Update details for "',
                                        editModel?.name,
                                        '"'
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4 py-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Name"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                            value: editName,
                                            onChange: (e)=>setEditName(e.target.value),
                                            className: "text-xs",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Description"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                            value: editDescription,
                                            onChange: (e)=>setEditDescription(e.target.value),
                                            rows: 3,
                                            className: "w-full text-xs p-3 rounded-lg outline-none border resize-y",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "grid grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                    className: "text-xs font-medium",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: "Category"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                                    value: editCategory,
                                                    onValueChange: setEditCategory,
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                            className: "w-full text-xs",
                                                            style: {
                                                                background: 'rgba(255,255,255,0.05)',
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                                color: COLORS.text
                                                            },
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                            style: {
                                                                background: 'var(--medq-app-bg, #1a1e2b)',
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                                            },
                                                            children: MODEL_CATEGORIES.map((cat)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: cat.value,
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: cat.label
                                                                }, cat.value))
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                    className: "text-xs font-medium",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: "Color"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                            type: "color",
                                                            value: editColor,
                                                            onChange: (e)=>setEditColor(e.target.value),
                                                            className: "w-8 h-8 rounded-lg border cursor-pointer flex-shrink-0",
                                                            style: {
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                                background: 'transparent'
                                                            }
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                                            value: editColor,
                                                            onChange: (e)=>setEditColor(e.target.value),
                                                            className: "text-xs font-mono flex-1",
                                                            style: {
                                                                background: 'rgba(255,255,255,0.05)',
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                                color: COLORS.text
                                                            }
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Tags (comma separated)"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .p, {
                                            value: editTags,
                                            onChange: (e)=>setEditTags(e.target.value),
                                            className: "text-xs",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex items-center gap-2",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setEditIsPublic(!editIsPublic),
                                        className: "flex items-center gap-2",
                                        children: [
                                            editIsPublic ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_36__/* ["default"] */ .A, {
                                                className: "w-5 h-5",
                                                style: {
                                                    color: COLORS.green
                                                }
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_37__/* ["default"] */ .A, {
                                                className: "w-5 h-5",
                                                style: {
                                                    color: COLORS.muted
                                                }
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-xs",
                                                style: {
                                                    color: editIsPublic ? COLORS.green : COLORS.muted
                                                },
                                                children: editIsPublic ? 'Public' : 'Private'
                                            })
                                        ]
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            className: "gap-2 sm:gap-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: ()=>setEditModel(null),
                                    className: "text-xs",
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    onClick: handleUpdate,
                                    disabled: saving,
                                    className: "text-xs font-medium",
                                    style: {
                                        background: COLORS.green,
                                        color: '#0c0e14'
                                    },
                                    children: saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5 animate-spin"
                                            }),
                                            "Saving..."
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5"
                                            }),
                                            "Save"
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialog */ .Lt, {
                open: !!deleteModel,
                onOpenChange: (open)=>{
                    if (!open) setDeleteModel(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogContent */ .EO, {
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogHeader */ .wd, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogTitle */ .r7, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                                className: "w-5 h-5",
                                                style: {
                                                    color: COLORS.red
                                                }
                                            }),
                                            "Delete Model"
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogDescription */ .$v, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: [
                                        "Are you sure you want to delete ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                            style: {
                                                color: COLORS.text
                                            },
                                            children: deleteModel?.name
                                        }),
                                        "? The file will be permanently removed from the server."
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogFooter */ .ck, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogCancel */ .Zr, {
                                    style: {
                                        color: COLORS.muted,
                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogAction */ .Rx, {
                                    onClick: handleDelete,
                                    disabled: saving,
                                    style: {
                                        background: COLORS.red,
                                        color: '#fff'
                                    },
                                    children: saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5 animate-spin"
                                    }) : 'Delete'
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}
/* ══════════════════════════════════════════════════════════════════════════════
   MAIN ADMIN TAB COMPONENT
   ══════════════════════════════════════════════════════════════════════════════ */ function AdminTab() {
    /* ── Tab state ── */ const [activeTab, setActiveTab] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('users');
    /* ── User management state ── */ const [stats, setStats] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [usersData, setUsersData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [refreshing, setRefreshing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Filters & pagination
    const [search, setSearch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [roleFilter, setRoleFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    const [tierFilter, setTierFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    const [page, setPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const limit = 20;
    // Edit dialog
    const [editUser, setEditUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [editRole, setEditRole] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [editTier, setEditTier] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [saving, setSaving] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Delete confirmation
    const [deleteUser, setDeleteUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [deleting, setDeleting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // View profile dialog
    const [viewUser, setViewUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // ── Moderation state (suspend/ban/reset-password) ──
    const [moderateUser, setModerateUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [moderateAction, setModerateAction] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('suspend');
    const [moderateReason, setModerateReason] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [moderateDuration, setModerateDuration] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('24'); // hours
    const [moderating, setModerating] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // ── Reset password state ──
    const [resetUser, setResetUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [resetCustomPassword, setResetCustomPassword] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [resetUseCustom, setResetUseCustom] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [resetting, setResetting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [resetResult, setResetResult] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // ── Status filter ──
    const [statusFilter, setStatusFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    // Debounce search
    const searchTimeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [searchInput, setSearchInput] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    /* ── Data Fetching ── */ const fetchStats = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        try {
            const res = await fetch('/api/admin/stats');
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        } catch (err) {
            console.error('Failed to fetch admin stats:', err);
        }
    }, []);
    const fetchUsers = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (showRefresh = false)=>{
        if (showRefresh) setRefreshing(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                search,
                role: roleFilter === 'all' ? '' : roleFilter,
                tier: tierFilter === 'all' ? '' : tierFilter,
                status: statusFilter === 'all' ? '' : statusFilter
            });
            const res = await fetch(`/api/admin/users?${params}`);
            if (res.ok) {
                const data = await res.json();
                setUsersData(data);
            }
        } catch (err) {
            console.error('Failed to fetch users:', err);
        } finally{
            setLoading(false);
            setRefreshing(false);
        }
    }, [
        page,
        search,
        roleFilter,
        tierFilter,
        statusFilter
    ]);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetchStats();
    }, [
        fetchStats
    ]);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetchUsers();
    }, [
        fetchUsers
    ]);
    // Re-fetch stats on visibility
    const lastFetchRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handler = (e)=>{
            if (e.detail === 'admin' && Date.now() - lastFetchRef.current > 30000) {
                fetchStats();
                fetchUsers();
            }
        };
        window.addEventListener('medq-tab-visible', handler);
        return ()=>window.removeEventListener('medq-tab-visible', handler);
    }, [
        fetchStats,
        fetchUsers
    ]);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        lastFetchRef.current = Date.now();
    }, [
        fetchStats,
        fetchUsers
    ]);
    /* ── Handlers ── */ const handleSearchChange = (value)=>{
        setSearchInput(value);
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = setTimeout(()=>{
            setSearch(value);
            setPage(1);
        }, 300);
    };
    const handleRoleFilterChange = (value)=>{
        setRoleFilter(value);
        setPage(1);
    };
    const handleTierFilterChange = (value)=>{
        setTierFilter(value);
        setPage(1);
    };
    const handleRefresh = ()=>{
        setRefreshing(true);
        Promise.all([
            fetchStats(),
            fetchUsers(true)
        ]);
    };
    const handleEditUser = (user)=>{
        setEditUser(user);
        setEditRole(user.role);
        setEditTier(user.tier);
    };
    const handleSaveEdit = async ()=>{
        if (!editUser) return;
        setSaving(true);
        try {
            // Update role
            if (editRole !== editUser.role) {
                const res = await fetch(`/api/admin/users/${editUser.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        role: editRole
                    })
                });
                if (!res.ok) throw new Error('Failed to update role');
            }
            // Update tier
            if (editTier !== editUser.tier) {
                const res = await fetch(`/api/admin/users/${editUser.id}/subscription`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tier: editTier
                    })
                });
                if (!res.ok) throw new Error('Failed to update subscription');
            }
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success('User updated successfully');
            setEditUser(null);
            fetchUsers();
            fetchStats();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to update user');
            console.error(err);
        } finally{
            setSaving(false);
        }
    };
    const handleDeleteUser = async ()=>{
        if (!deleteUser) return;
        setDeleting(true);
        try {
            const res = await fetch(`/api/admin/users/${deleteUser.id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Failed to delete user');
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success('User deleted successfully');
            setDeleteUser(null);
            fetchUsers();
            fetchStats();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to delete user');
            console.error(err);
        } finally{
            setDeleting(false);
        }
    };
    /* ── Moderation handlers (suspend / ban / activate) ── */ const handleOpenModerate = (user, action)=>{
        setModerateUser(user);
        setModerateAction(action);
        setModerateReason('');
        setModerateDuration('24');
    };
    const handleConfirmModerate = async ()=>{
        if (!moderateUser) return;
        setModerating(true);
        try {
            const body = {
                status: moderateAction === 'activate' ? 'active' : moderateAction
            };
            if (moderateAction !== 'activate') {
                if (moderateReason.trim()) body.reason = moderateReason.trim();
                if (moderateAction === 'suspend') {
                    const hrs = parseInt(moderateDuration, 10);
                    if (!isNaN(hrs) && hrs > 0) body.durationHours = hrs;
                }
            }
            const res = await fetch(`/api/admin/users/${moderateUser.id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            if (!res.ok) {
                const err = await res.json().catch(()=>({}));
                throw new Error(err.error || 'Failed to update user status');
            }
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(moderateAction === 'activate' ? 'User reactivated' : moderateAction === 'ban' ? 'User banned' : 'User suspended');
            setModerateUser(null);
            fetchUsers();
            fetchStats();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(err.message || 'Failed to update user status');
        } finally{
            setModerating(false);
        }
    };
    /* ── Reset password handler ── */ const handleOpenReset = (user)=>{
        setResetUser(user);
        setResetCustomPassword('');
        setResetUseCustom(false);
        setResetResult(null);
    };
    const handleConfirmReset = async ()=>{
        if (!resetUser) return;
        setResetting(true);
        setResetResult(null);
        try {
            const body = {};
            if (resetUseCustom) {
                if (resetCustomPassword.length < 8) {
                    sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Password must be at least 8 characters');
                    setResetting(false);
                    return;
                }
                body.newPassword = resetCustomPassword;
            }
            const res = await fetch(`/api/admin/users/${resetUser.id}/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            if (!res.ok) {
                const err = await res.json().catch(()=>({}));
                throw new Error(err.error || 'Failed to reset password');
            }
            const data = await res.json();
            setResetResult(data.temporaryPassword);
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success('Password reset successfully');
            fetchUsers();
            fetchStats();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(err.message || 'Failed to reset password');
        } finally{
            setResetting(false);
        }
    };
    /* ── Stat Cards Config ── */ const statCards = stats ? [
        {
            label: 'Total Users',
            value: stats.totalUsers,
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_45__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: COLORS.green,
            bgColor: `${COLORS.green}15`,
            trend: stats.usersTrend
        },
        {
            label: 'Premium Users',
            value: stats.premiumUsers,
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_46__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: COLORS.purple,
            bgColor: `${COLORS.purple}15`
        },
        {
            label: 'Pro Users',
            value: stats.proUsers,
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_47__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: COLORS.amber,
            bgColor: `${COLORS.amber}15`
        },
        {
            label: 'Total Revenue',
            value: `${formatNumber(stats.totalRevenue)} cr`,
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_48__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: COLORS.blue,
            bgColor: `${COLORS.blue}15`,
            trend: stats.revenueTrend
        },
        {
            label: 'Active Today',
            value: stats.activeToday,
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_49__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: COLORS.red,
            bgColor: `${COLORS.red}15`,
            trend: stats.activeTrend
        },
        // ── Moderation cards (shown when there's something to action) ──
        ...stats.suspendedCount && stats.suspendedCount > 0 ? [
            {
                label: 'Suspended',
                value: stats.suspendedCount,
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_50__/* ["default"] */ .A, {
                    className: "w-5 h-5"
                }),
                color: COLORS.amber,
                bgColor: `${COLORS.amber}15`
            }
        ] : [],
        ...stats.bannedCount && stats.bannedCount > 0 ? [
            {
                label: 'Banned',
                value: stats.bannedCount,
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_51__/* ["default"] */ .A, {
                    className: "w-5 h-5"
                }),
                color: COLORS.red,
                bgColor: `${COLORS.red}15`
            }
        ] : [],
        ...stats.pendingReportsCount && stats.pendingReportsCount > 0 ? [
            {
                label: 'Pending Reports',
                value: stats.pendingReportsCount,
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_52__/* ["default"] */ .A, {
                    className: "w-5 h-5"
                }),
                color: COLORS.purple,
                bgColor: `${COLORS.purple}15`
            }
        ] : []
    ] : [];
    /* ── Loading State ── */ if (loading) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StatsSkeleton, {}),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TableSkeleton, {})
            ]
        });
    }
    const users = usersData?.users || [];
    const totalPages = usersData?.totalPages || 1;
    const totalUsers = usersData?.total || 0;
    const tabs = [
        {
            key: 'users',
            label: 'Users',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_45__/* ["default"] */ .A, {
                className: "w-4 h-4"
            })
        },
        {
            key: 'analytics',
            label: 'Analytics',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_53__/* ["default"] */ .A, {
                className: "w-4 h-4"
            })
        },
        {
            key: 'moderation',
            label: 'Moderation',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_52__/* ["default"] */ .A, {
                className: "w-4 h-4"
            }),
            badge: stats?.pendingReportsCount
        },
        {
            key: 'revenue',
            label: 'Revenue',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                className: "w-4 h-4"
            })
        },
        {
            key: 'settings',
            label: 'Settings',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                className: "w-4 h-4"
            })
        },
        {
            key: 'ads',
            label: 'Ads',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                className: "w-4 h-4"
            })
        },
        {
            key: 'models',
            label: '3D Models',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                className: "w-4 h-4"
            })
        },
        {
            key: 'compliance',
            label: 'Compliance',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_47__/* ["default"] */ .A, {
                className: "w-4 h-4"
            })
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-10 h-10 rounded-xl flex items-center justify-center",
                                style: {
                                    background: `${COLORS.red}15`
                                },
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_47__/* ["default"] */ .A, {
                                    className: "w-5 h-5",
                                    style: {
                                        color: COLORS.red
                                    }
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                        className: "text-lg font-bold",
                                        style: {
                                            color: COLORS.text
                                        },
                                        children: "Admin Dashboard"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xs",
                                        style: {
                                            color: COLORS.muted
                                        },
                                        children: "Manage users, settings, and ads"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: handleRefresh,
                        disabled: refreshing,
                        className: "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all border",
                        style: {
                            background: 'rgba(255,255,255,0.03)',
                            borderColor: COLORS.cardBorder,
                            color: COLORS.muted
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_54__/* ["default"] */ .A, {
                                className: `w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "hidden sm:inline",
                                children: "Refresh"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex items-center gap-1 p-1 rounded-xl overflow-x-auto",
                style: {
                    background: COLORS.card,
                    border: `1px solid ${COLORS.cardBorder}`
                },
                children: tabs.map((tab)=>{
                    const isActive = activeTab === tab.key;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>setActiveTab(tab.key),
                        className: "relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all flex-1 justify-center whitespace-nowrap",
                        style: {
                            color: isActive ? '#0c0e14' : COLORS.muted,
                            background: isActive ? COLORS.green : 'transparent'
                        },
                        children: [
                            tab.icon,
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                children: tab.label
                            }),
                            typeof tab.badge === 'number' && tab.badge > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "ml-0.5 inline-flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full text-[9px] font-bold",
                                style: {
                                    background: isActive ? 'rgba(0,0,0,0.2)' : `${COLORS.red}25`,
                                    color: isActive ? '#0c0e14' : COLORS.red
                                },
                                children: tab.badge > 99 ? '99+' : tab.badge
                            })
                        ]
                    }, tab.key);
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_55__/* .AnimatePresence */ .N, {
                mode: "wait",
                children: [
                    activeTab === 'users' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            x: -10
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        exit: {
                            opacity: 0,
                            x: 10
                        },
                        transition: {
                            duration: 0.2
                        },
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3",
                                children: statCards.map((stat, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StatCard, {
                                        label: stat.label,
                                        value: stat.value,
                                        icon: stat.icon,
                                        color: stat.color,
                                        bgColor: stat.bgColor,
                                        trend: stat.trend,
                                        index: i
                                    }, stat.label))
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                                initial: {
                                    opacity: 0,
                                    y: 16
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: 0.4,
                                    delay: 0.4
                                },
                                className: "rounded-2xl border",
                                style: {
                                    background: COLORS.card,
                                    borderColor: COLORS.cardBorder
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "p-4 border-b",
                                        style: {
                                            borderColor: COLORS.cardBorder
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex flex-col sm:flex-row items-start sm:items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "relative flex-1 w-full sm:max-w-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_40__/* ["default"] */ .A, {
                                                            className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                                                            style: {
                                                                color: COLORS.muted
                                                            }
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                            type: "text",
                                                            placeholder: "Search users...",
                                                            value: searchInput,
                                                            onChange: (e)=>handleSearchChange(e.target.value),
                                                            className: "w-full h-9 pl-9 pr-3 rounded-lg text-xs outline-none transition-all border",
                                                            style: {
                                                                background: 'rgba(255,255,255,0.03)',
                                                                borderColor: COLORS.cardBorder,
                                                                color: COLORS.text
                                                            }
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                                    value: roleFilter,
                                                    onValueChange: handleRoleFilterChange,
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                            className: "w-full sm:w-[140px] text-xs",
                                                            style: {
                                                                background: 'rgba(255,255,255,0.03)',
                                                                borderColor: COLORS.cardBorder,
                                                                color: COLORS.text
                                                            },
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {
                                                                placeholder: "Role"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                            style: {
                                                                background: 'var(--medq-app-bg, #1a1e2b)',
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "all",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "All Roles"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "student",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "Student"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "educator",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "Educator"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "admin",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "Admin"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                                    value: tierFilter,
                                                    onValueChange: handleTierFilterChange,
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                            className: "w-full sm:w-[140px] text-xs",
                                                            style: {
                                                                background: 'rgba(255,255,255,0.03)',
                                                                borderColor: COLORS.cardBorder,
                                                                color: COLORS.text
                                                            },
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {
                                                                placeholder: "Tier"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                            style: {
                                                                background: 'var(--medq-app-bg, #1a1e2b)',
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "all",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "All Tiers"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "free",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "Free"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "premium",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "Premium"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "pro",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "Pro"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                                    value: statusFilter,
                                                    onValueChange: (v)=>{
                                                        setStatusFilter(v);
                                                        setPage(1);
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                            className: "w-full sm:w-[140px] text-xs",
                                                            style: {
                                                                background: 'rgba(255,255,255,0.03)',
                                                                borderColor: COLORS.cardBorder,
                                                                color: COLORS.text
                                                            },
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {
                                                                placeholder: "Status"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                            style: {
                                                                background: 'var(--medq-app-bg, #1a1e2b)',
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "all",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "All Statuses"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "active",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "Active"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "suspended",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "Suspended"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                                    value: "banned",
                                                                    style: {
                                                                        color: COLORS.text
                                                                    },
                                                                    children: "Banned"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "text-[10px] ml-auto",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: [
                                                        totalUsers,
                                                        " user",
                                                        totalUsers !== 1 ? 's' : '',
                                                        " found"
                                                    ]
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "overflow-x-auto",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
                                            className: "w-full text-sm",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("thead", {
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                        className: "border-b",
                                                        style: {
                                                            borderColor: COLORS.cardBorder
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                                                className: "text-left px-4 py-3 text-xs font-semibold",
                                                                style: {
                                                                    color: COLORS.muted
                                                                },
                                                                children: "User"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                                                className: "text-left px-4 py-3 text-xs font-semibold",
                                                                style: {
                                                                    color: COLORS.muted
                                                                },
                                                                children: "Email"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                                                className: "text-left px-4 py-3 text-xs font-semibold",
                                                                style: {
                                                                    color: COLORS.muted
                                                                },
                                                                children: "Role"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                                                className: "text-left px-4 py-3 text-xs font-semibold",
                                                                style: {
                                                                    color: COLORS.muted
                                                                },
                                                                children: "Tier"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                                                className: "text-left px-4 py-3 text-xs font-semibold",
                                                                style: {
                                                                    color: COLORS.muted
                                                                },
                                                                children: "Status"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                                                className: "text-left px-4 py-3 text-xs font-semibold",
                                                                style: {
                                                                    color: COLORS.muted
                                                                },
                                                                children: "Credits"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                                                className: "text-left px-4 py-3 text-xs font-semibold",
                                                                style: {
                                                                    color: COLORS.muted
                                                                },
                                                                children: "Joined"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                                                                className: "text-right px-4 py-3 text-xs font-semibold",
                                                                style: {
                                                                    color: COLORS.muted
                                                                },
                                                                children: "Actions"
                                                            })
                                                        ]
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tbody", {
                                                    children: users.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tr", {
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                                            colSpan: 8,
                                                            className: "px-4 py-12 text-center",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_45__/* ["default"] */ .A, {
                                                                    className: "w-8 h-8 mx-auto mb-2",
                                                                    style: {
                                                                        color: COLORS.dimmed
                                                                    }
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                    className: "text-xs",
                                                                    style: {
                                                                        color: COLORS.dimmed
                                                                    },
                                                                    children: "No users found. Try adjusting your search or filters."
                                                                })
                                                            ]
                                                        })
                                                    }) : users.map((user)=>{
                                                        const initials = getInitials(user.name, user.email);
                                                        const roleColor = ROLE_COLORS[user.role] || COLORS.muted;
                                                        const tierColor = TIER_COLORS[user.tier] || COLORS.muted;
                                                        const userStatus = user.status || 'active';
                                                        const statusColor = USER_STATUS_COLORS[userStatus] || COLORS.muted;
                                                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                            className: "border-b transition-colors hover:bg-white/[0.02]",
                                                            style: {
                                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.04))'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                                    className: "px-4 py-3",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                        className: "flex items-center gap-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                                className: "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                                                                                style: {
                                                                                    background: `${roleColor}20`,
                                                                                    color: roleColor
                                                                                },
                                                                                children: initials
                                                                            }),
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                                className: "text-xs font-medium truncate max-w-[120px]",
                                                                                style: {
                                                                                    color: COLORS.text
                                                                                },
                                                                                children: user.name || 'Unnamed'
                                                                            })
                                                                        ]
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                                    className: "px-4 py-3",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                        className: "text-xs truncate max-w-[160px] block",
                                                                        style: {
                                                                            color: COLORS.muted
                                                                        },
                                                                        children: user.email || '—'
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                                    className: "px-4 py-3",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                        className: "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider",
                                                                        style: {
                                                                            background: `${roleColor}15`,
                                                                            color: roleColor,
                                                                            border: `1px solid ${roleColor}30`
                                                                        },
                                                                        children: user.role
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                                    className: "px-4 py-3",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                        className: "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider",
                                                                        style: {
                                                                            background: `${tierColor}15`,
                                                                            color: tierColor,
                                                                            border: `1px solid ${tierColor}30`
                                                                        },
                                                                        children: user.tier
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                                                    className: "px-4 py-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                            className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider",
                                                                            style: {
                                                                                background: `${statusColor}15`,
                                                                                color: statusColor,
                                                                                border: `1px solid ${statusColor}30`
                                                                            },
                                                                            title: user.suspendedReason || user.bannedReason || undefined,
                                                                            children: [
                                                                                userStatus === 'suspended' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_50__/* ["default"] */ .A, {
                                                                                    className: "w-2.5 h-2.5"
                                                                                }),
                                                                                userStatus === 'banned' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_51__/* ["default"] */ .A, {
                                                                                    className: "w-2.5 h-2.5"
                                                                                }),
                                                                                userStatus
                                                                            ]
                                                                        }),
                                                                        userStatus === 'suspended' && user.suspendedUntil && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                                            className: "text-[9px] mt-1",
                                                                            style: {
                                                                                color: COLORS.dimmed
                                                                            },
                                                                            children: [
                                                                                "until ",
                                                                                formatDate(user.suspendedUntil)
                                                                            ]
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                                    className: "px-4 py-3",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                        className: "text-xs font-medium",
                                                                        style: {
                                                                            color: COLORS.text
                                                                        },
                                                                        children: formatNumber(user.credits)
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                                    className: "px-4 py-3",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                        className: "text-xs",
                                                                        style: {
                                                                            color: COLORS.muted
                                                                        },
                                                                        children: formatDate(user.createdAt)
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                                                    className: "px-4 py-3",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                        className: "flex items-center justify-end gap-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                                onClick: ()=>setViewUser(user),
                                                                                className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                                                title: "View Profile",
                                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                                                                    className: "w-3.5 h-3.5",
                                                                                    style: {
                                                                                        color: COLORS.blue
                                                                                    }
                                                                                })
                                                                            }),
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                                onClick: ()=>handleEditUser(user),
                                                                                className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                                                title: "Edit User",
                                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_56__/* ["default"] */ .A, {
                                                                                    className: "w-3.5 h-3.5",
                                                                                    style: {
                                                                                        color: COLORS.purple
                                                                                    }
                                                                                })
                                                                            }),
                                                                            userStatus === 'active' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                                        onClick: ()=>handleOpenModerate(user, 'suspend'),
                                                                                        className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                                                        title: "Suspend User",
                                                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_50__/* ["default"] */ .A, {
                                                                                            className: "w-3.5 h-3.5",
                                                                                            style: {
                                                                                                color: COLORS.amber
                                                                                            }
                                                                                        })
                                                                                    }),
                                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                                        onClick: ()=>handleOpenModerate(user, 'ban'),
                                                                                        className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                                                        title: "Ban User",
                                                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_51__/* ["default"] */ .A, {
                                                                                            className: "w-3.5 h-3.5",
                                                                                            style: {
                                                                                                color: COLORS.red
                                                                                            }
                                                                                        })
                                                                                    })
                                                                                ]
                                                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                                onClick: ()=>handleOpenModerate(user, 'activate'),
                                                                                className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                                                title: "Reactivate User",
                                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_57__/* ["default"] */ .A, {
                                                                                    className: "w-3.5 h-3.5",
                                                                                    style: {
                                                                                        color: COLORS.green
                                                                                    }
                                                                                })
                                                                            }),
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                                onClick: ()=>handleOpenReset(user),
                                                                                className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                                                title: "Reset Password",
                                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_58__/* ["default"] */ .A, {
                                                                                    className: "w-3.5 h-3.5",
                                                                                    style: {
                                                                                        color: COLORS.cyan
                                                                                    }
                                                                                })
                                                                            }),
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                                onClick: ()=>setDeleteUser(user),
                                                                                className: "p-1.5 rounded-md transition-colors hover:bg-white/[0.06]",
                                                                                title: "Delete User",
                                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                                                                    className: "w-3.5 h-3.5",
                                                                                    style: {
                                                                                        color: COLORS.red
                                                                                    }
                                                                                })
                                                                            })
                                                                        ]
                                                                    })
                                                                })
                                                            ]
                                                        }, user.id);
                                                    })
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center justify-between px-4 py-3 border-t",
                                        style: {
                                            borderColor: COLORS.cardBorder
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "text-[10px]",
                                                style: {
                                                    color: COLORS.muted
                                                },
                                                children: [
                                                    "Page ",
                                                    page,
                                                    " of ",
                                                    totalPages
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                                        variant: "ghost",
                                                        size: "sm",
                                                        onClick: ()=>setPage(Math.max(1, page - 1)),
                                                        disabled: page <= 1,
                                                        className: "h-8 px-2 text-xs",
                                                        style: {
                                                            color: COLORS.muted
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_41__/* ["default"] */ .A, {
                                                                className: "w-4 h-4 mr-1"
                                                            }),
                                                            "Previous"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                                        variant: "ghost",
                                                        size: "sm",
                                                        onClick: ()=>setPage(Math.min(totalPages, page + 1)),
                                                        disabled: page >= totalPages,
                                                        className: "h-8 px-2 text-xs",
                                                        style: {
                                                            color: COLORS.muted
                                                        },
                                                        children: [
                                                            "Next",
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_42__/* ["default"] */ .A, {
                                                                className: "w-4 h-4 ml-1"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }, "users"),
                    activeTab === 'analytics' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            x: -10
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        exit: {
                            opacity: 0,
                            x: 10
                        },
                        transition: {
                            duration: 0.2
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AnalyticsTab__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {})
                    }, "analytics"),
                    activeTab === 'moderation' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            x: -10
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        exit: {
                            opacity: 0,
                            x: 10
                        },
                        transition: {
                            duration: 0.2
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ModerationTab__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {})
                    }, "moderation"),
                    activeTab === 'revenue' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            x: -10
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        exit: {
                            opacity: 0,
                            x: 10
                        },
                        transition: {
                            duration: 0.2
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_RevenueTab__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {})
                    }, "revenue"),
                    activeTab === 'models' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            x: -10
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        exit: {
                            opacity: 0,
                            x: 10
                        },
                        transition: {
                            duration: 0.2
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ModelsTab, {})
                    }, "models"),
                    activeTab === 'settings' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            x: -10
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        exit: {
                            opacity: 0,
                            x: 10
                        },
                        transition: {
                            duration: 0.2
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SettingsTab, {})
                    }, "settings"),
                    activeTab === 'ads' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            x: -10
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        exit: {
                            opacity: 0,
                            x: 10
                        },
                        transition: {
                            duration: 0.2
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AdsTab, {})
                    }, "ads"),
                    activeTab === 'compliance' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_22__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            x: -10
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        exit: {
                            opacity: 0,
                            x: 10
                        },
                        transition: {
                            duration: 0.2
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_compliance_ComplianceDashboard__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {})
                    }, "compliance")
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: !!editUser,
                onOpenChange: (open)=>{
                    if (!open) setEditUser(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-md",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: "Edit User"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogDescription */ .rr, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: [
                                        "Change role and subscription tier for ",
                                        editUser?.name || editUser?.email
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4 py-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Role"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                            value: editRole,
                                            onValueChange: setEditRole,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                    className: "w-full text-xs",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.05)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                        color: COLORS.text
                                                    },
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                    style: {
                                                        background: 'var(--medq-app-bg, #1a1e2b)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "student",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Student"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "educator",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Educator"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "admin",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Admin"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Subscription Tier"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                            value: editTier,
                                            onValueChange: setEditTier,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                    className: "w-full text-xs",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.05)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                        color: COLORS.text
                                                    },
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                    style: {
                                                        background: 'var(--medq-app-bg, #1a1e2b)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "free",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Free"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "premium",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Premium"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "pro",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Pro"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            className: "gap-2 sm:gap-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: ()=>setEditUser(null),
                                    className: "text-xs",
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    onClick: handleSaveEdit,
                                    disabled: saving,
                                    className: "text-xs font-medium",
                                    style: {
                                        background: COLORS.green,
                                        color: '#0c0e14'
                                    },
                                    children: saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5 animate-spin"
                                            }),
                                            "Saving..."
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5"
                                            }),
                                            "Save Changes"
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialog */ .Lt, {
                open: !!deleteUser,
                onOpenChange: (open)=>{
                    if (!open) setDeleteUser(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogContent */ .EO, {
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogHeader */ .wd, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogTitle */ .r7, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                                className: "w-5 h-5",
                                                style: {
                                                    color: COLORS.red
                                                }
                                            }),
                                            "Delete User"
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogDescription */ .$v, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: [
                                        "Are you sure you want to delete ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                            style: {
                                                color: COLORS.text
                                            },
                                            children: deleteUser?.name || deleteUser?.email
                                        }),
                                        "? This action cannot be undone. All user data including subscriptions, credits, and study history will be permanently removed."
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogFooter */ .ck, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogCancel */ .Zr, {
                                    style: {
                                        color: COLORS.muted,
                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_14__/* .AlertDialogAction */ .Rx, {
                                    onClick: handleDeleteUser,
                                    disabled: deleting,
                                    style: {
                                        background: COLORS.red,
                                        color: '#fff'
                                    },
                                    children: deleting ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5 animate-spin"
                                            }),
                                            "Deleting..."
                                        ]
                                    }) : 'Delete User'
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: !!viewUser,
                onOpenChange: (open)=>{
                    if (!open) setViewUser(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-md",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                style: {
                                    color: COLORS.text
                                },
                                children: "User Profile"
                            })
                        }),
                        viewUser && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4 py-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0",
                                            style: {
                                                background: `${ROLE_COLORS[viewUser.role] || COLORS.muted}20`,
                                                color: ROLE_COLORS[viewUser.role] || COLORS.muted
                                            },
                                            children: getInitials(viewUser.name, viewUser.email)
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-sm font-bold",
                                                    style: {
                                                        color: COLORS.text
                                                    },
                                                    children: viewUser.name || 'Unnamed User'
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-xs",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: viewUser.email || 'No email'
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "grid grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "rounded-lg p-3 border",
                                            style: {
                                                background: 'rgba(255,255,255,0.03)',
                                                borderColor: COLORS.cardBorder
                                            },
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[10px] font-medium mb-1",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: "Role"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider",
                                                    style: {
                                                        background: `${ROLE_COLORS[viewUser.role] || COLORS.muted}15`,
                                                        color: ROLE_COLORS[viewUser.role] || COLORS.muted,
                                                        border: `1px solid ${ROLE_COLORS[viewUser.role] || COLORS.muted}30`
                                                    },
                                                    children: viewUser.role
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "rounded-lg p-3 border",
                                            style: {
                                                background: 'rgba(255,255,255,0.03)',
                                                borderColor: COLORS.cardBorder
                                            },
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[10px] font-medium mb-1",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: "Tier"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider",
                                                    style: {
                                                        background: `${TIER_COLORS[viewUser.tier] || COLORS.muted}15`,
                                                        color: TIER_COLORS[viewUser.tier] || COLORS.muted,
                                                        border: `1px solid ${TIER_COLORS[viewUser.tier] || COLORS.muted}30`
                                                    },
                                                    children: viewUser.tier
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "rounded-lg p-3 border",
                                            style: {
                                                background: 'rgba(255,255,255,0.03)',
                                                borderColor: COLORS.cardBorder
                                            },
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[10px] font-medium mb-1",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: "Status"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider",
                                                    style: {
                                                        background: `${USER_STATUS_COLORS[viewUser.status || 'active'] || COLORS.muted}15`,
                                                        color: USER_STATUS_COLORS[viewUser.status || 'active'] || COLORS.muted,
                                                        border: `1px solid ${USER_STATUS_COLORS[viewUser.status || 'active'] || COLORS.muted}30`
                                                    },
                                                    children: viewUser.status || 'active'
                                                }),
                                                viewUser.status === 'suspended' && viewUser.suspendedUntil && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                    className: "text-[10px] mt-1",
                                                    style: {
                                                        color: COLORS.dimmed
                                                    },
                                                    children: [
                                                        "Until ",
                                                        formatDate(viewUser.suspendedUntil)
                                                    ]
                                                }),
                                                viewUser.status === 'suspended' && viewUser.suspendedReason && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                    className: "text-[10px] mt-1 italic",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: [
                                                        "“",
                                                        viewUser.suspendedReason,
                                                        "”"
                                                    ]
                                                }),
                                                viewUser.status === 'banned' && viewUser.bannedReason && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                    className: "text-[10px] mt-1 italic",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: [
                                                        "“",
                                                        viewUser.bannedReason,
                                                        "”"
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "rounded-lg p-3 border",
                                            style: {
                                                background: 'rgba(255,255,255,0.03)',
                                                borderColor: COLORS.cardBorder
                                            },
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[10px] font-medium mb-1",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: "Credits"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-sm font-bold",
                                                    style: {
                                                        color: COLORS.text
                                                    },
                                                    children: viewUser.credits
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "rounded-lg p-3 border",
                                            style: {
                                                background: 'rgba(255,255,255,0.03)',
                                                borderColor: COLORS.cardBorder
                                            },
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[10px] font-medium mb-1",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: "Joined"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-xs font-medium",
                                                    style: {
                                                        color: COLORS.text
                                                    },
                                                    children: formatDate(viewUser.createdAt)
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "rounded-lg p-3 border",
                                            style: {
                                                background: 'rgba(255,255,255,0.03)',
                                                borderColor: COLORS.cardBorder
                                            },
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[10px] font-medium mb-1",
                                                    style: {
                                                        color: COLORS.muted
                                                    },
                                                    children: "Last Active"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-xs font-medium",
                                                    style: {
                                                        color: COLORS.text
                                                    },
                                                    children: viewUser.lastActiveAt ? formatDate(viewUser.lastActiveAt) : '—'
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "rounded-lg p-3 border",
                                    style: {
                                        background: 'rgba(255,255,255,0.03)',
                                        borderColor: COLORS.cardBorder
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[10px] font-medium mb-1",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "User ID"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[10px] font-mono",
                                            style: {
                                                color: COLORS.dimmed
                                            },
                                            children: viewUser.id
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: ()=>setViewUser(null),
                                    className: "text-xs",
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Close"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    onClick: ()=>{
                                        if (viewUser) {
                                            handleEditUser(viewUser);
                                            setViewUser(null);
                                        }
                                    },
                                    className: "text-xs font-medium",
                                    style: {
                                        background: COLORS.purple,
                                        color: '#fff'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_56__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 mr-1.5"
                                        }),
                                        "Edit User"
                                    ]
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: !!moderateUser,
                onOpenChange: (open)=>{
                    if (!open) setModerateUser(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-md",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            moderateAction === 'suspend' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_50__/* ["default"] */ .A, {
                                                className: "w-4 h-4",
                                                style: {
                                                    color: COLORS.amber
                                                }
                                            }),
                                            moderateAction === 'ban' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_51__/* ["default"] */ .A, {
                                                className: "w-4 h-4",
                                                style: {
                                                    color: COLORS.red
                                                }
                                            }),
                                            moderateAction === 'activate' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_57__/* ["default"] */ .A, {
                                                className: "w-4 h-4",
                                                style: {
                                                    color: COLORS.green
                                                }
                                            }),
                                            moderateAction === 'suspend' && 'Suspend User',
                                            moderateAction === 'ban' && 'Ban User',
                                            moderateAction === 'activate' && 'Reactivate User'
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogDescription */ .rr, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: moderateAction === 'activate' ? `This will lift any suspension or ban on ${moderateUser?.name || moderateUser?.email}.` : moderateAction === 'ban' ? `Permanently ban ${moderateUser?.name || moderateUser?.email}. They will be unable to sign in.` : `Temporarily suspend ${moderateUser?.name || moderateUser?.email}. They will be unable to sign in until reinstated.`
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-4 py-2",
                            children: [
                                moderateAction === 'suspend' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: "Duration (hours)"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .Select */ .l6, {
                                            value: moderateDuration,
                                            onValueChange: setModerateDuration,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectTrigger */ .bq, {
                                                    className: "w-full text-xs",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.05)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                        color: COLORS.text
                                                    },
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectValue */ .yv, {})
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectContent */ .gC, {
                                                    style: {
                                                        background: 'var(--medq-app-bg, #1a1e2b)',
                                                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "1",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "1 hour"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "6",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "6 hours"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "24",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "24 hours"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "72",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "3 days"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "168",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "7 days"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "720",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "30 days"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_6__/* .SelectItem */ .eb, {
                                                            value: "indefinite",
                                                            style: {
                                                                color: COLORS.text
                                                            },
                                                            children: "Indefinite"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                moderateAction !== 'activate' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: COLORS.muted
                                            },
                                            children: [
                                                "Reason ",
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    style: {
                                                        color: COLORS.dimmed
                                                    },
                                                    children: "(optional)"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                            value: moderateReason,
                                            onChange: (e)=>setModerateReason(e.target.value),
                                            placeholder: "e.g. Spamming study group chats, abusive language, etc.",
                                            rows: 3,
                                            className: "w-full p-2 rounded-lg text-xs outline-none transition-all border resize-none",
                                            style: {
                                                background: 'rgba(255,255,255,0.05)',
                                                borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                color: COLORS.text
                                            }
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            className: "gap-2 sm:gap-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    variant: "ghost",
                                    onClick: ()=>setModerateUser(null),
                                    className: "text-xs",
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                    onClick: handleConfirmModerate,
                                    disabled: moderating,
                                    className: "text-xs font-medium",
                                    style: {
                                        background: moderateAction === 'activate' ? COLORS.green : moderateAction === 'ban' ? COLORS.red : COLORS.amber,
                                        color: moderateAction === 'activate' ? '#0c0e14' : '#fff'
                                    },
                                    children: moderating ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5 animate-spin"
                                            }),
                                            "Processing..."
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            moderateAction === 'suspend' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_50__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5"
                                            }),
                                            moderateAction === 'ban' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_51__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5"
                                            }),
                                            moderateAction === 'activate' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_57__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5"
                                            }),
                                            "Confirm ",
                                            moderateAction === 'activate' ? 'Reactivate' : moderateAction
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .Dialog */ .lG, {
                open: !!resetUser,
                onOpenChange: (open)=>{
                    if (!open) {
                        setResetUser(null);
                        setResetResult(null);
                    }
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogContent */ .Cf, {
                    className: "sm:max-w-md",
                    style: {
                        background: 'var(--medq-app-bg, #1a1e2b)',
                        borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                        color: COLORS.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogHeader */ .c7, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogTitle */ .L3, {
                                    style: {
                                        color: COLORS.text
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_58__/* ["default"] */ .A, {
                                                className: "w-4 h-4",
                                                style: {
                                                    color: COLORS.cyan
                                                }
                                            }),
                                            "Reset Password"
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogDescription */ .rr, {
                                    style: {
                                        color: COLORS.muted
                                    },
                                    children: [
                                        "Reset the password for ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                            style: {
                                                color: COLORS.text
                                            },
                                            children: resetUser?.name || resetUser?.email
                                        }),
                                        ". The user will need to use the new password to sign in."
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "space-y-4 py-2",
                            children: resetResult ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "rounded-lg p-3 border",
                                style: {
                                    background: `${COLORS.green}10`,
                                    borderColor: `${COLORS.green}40`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[10px] font-semibold uppercase tracking-wider mb-1",
                                        style: {
                                            color: COLORS.green
                                        },
                                        children: "Temporary Password"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-sm font-mono font-bold break-all",
                                        style: {
                                            color: COLORS.text
                                        },
                                        children: resetResult
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[10px] mt-2",
                                        style: {
                                            color: COLORS.muted
                                        },
                                        children: "Copy this password and share it securely with the user. It will not be shown again."
                                    })
                                ]
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                onClick: ()=>setResetUseCustom(false),
                                                className: "flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all border",
                                                style: {
                                                    background: !resetUseCustom ? `${COLORS.cyan}15` : 'transparent',
                                                    borderColor: !resetUseCustom ? `${COLORS.cyan}40` : COLORS.cardBorder,
                                                    color: !resetUseCustom ? COLORS.cyan : COLORS.muted
                                                },
                                                children: "Auto-generate"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                onClick: ()=>setResetUseCustom(true),
                                                className: "flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all border",
                                                style: {
                                                    background: resetUseCustom ? `${COLORS.cyan}15` : 'transparent',
                                                    borderColor: resetUseCustom ? `${COLORS.cyan}40` : COLORS.cardBorder,
                                                    color: resetUseCustom ? COLORS.cyan : COLORS.muted
                                                },
                                                children: "Custom password"
                                            })
                                        ]
                                    }),
                                    resetUseCustom && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                className: "text-xs font-medium",
                                                style: {
                                                    color: COLORS.muted
                                                },
                                                children: "New password (min 8 characters)"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                type: "text",
                                                value: resetCustomPassword,
                                                onChange: (e)=>setResetCustomPassword(e.target.value),
                                                placeholder: "Enter new password...",
                                                className: "w-full h-9 px-3 rounded-lg text-xs outline-none transition-all border",
                                                style: {
                                                    background: 'rgba(255,255,255,0.05)',
                                                    borderColor: 'var(--medq-card-border, rgba(255,255,255,0.1))',
                                                    color: COLORS.text
                                                }
                                            })
                                        ]
                                    }),
                                    !resetUseCustom && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[10px]",
                                        style: {
                                            color: COLORS.muted
                                        },
                                        children: "A random 12-character password will be generated and shown to you once the reset is complete."
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_13__/* .DialogFooter */ .Es, {
                            className: "gap-2 sm:gap-0",
                            children: resetResult ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                        variant: "ghost",
                                        onClick: ()=>{
                                            setResetUser(null);
                                            setResetResult(null);
                                        },
                                        className: "text-xs",
                                        style: {
                                            color: COLORS.muted
                                        },
                                        children: "Close"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                        onClick: ()=>{
                                            if (resetResult) {
                                                navigator.clipboard.writeText(resetResult).then(()=>{
                                                    sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success('Password copied to clipboard');
                                                }).catch(()=>{
                                                    sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to copy');
                                                });
                                            }
                                        },
                                        className: "text-xs font-medium",
                                        style: {
                                            background: COLORS.green,
                                            color: '#0c0e14'
                                        },
                                        children: "Copy Password"
                                    })
                                ]
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                        variant: "ghost",
                                        onClick: ()=>setResetUser(null),
                                        className: "text-xs",
                                        style: {
                                            color: COLORS.muted
                                        },
                                        children: "Cancel"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                        onClick: handleConfirmReset,
                                        disabled: resetting,
                                        className: "text-xs font-medium",
                                        style: {
                                            background: COLORS.cyan,
                                            color: '#0c0e14'
                                        },
                                        children: resetting ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5 mr-1.5 animate-spin"
                                                }),
                                                "Resetting..."
                                            ]
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_AlertTriangle_Archive_Ban_BarChart3_Box_Braces_ChevronLeft_ChevronRight_Clock_CreditCard_Crown_DollarSign_Eye_File_Filter_Flag_Image_KeyRound_Loader2_Megaphone_Minus_MousePointerClick_Palette_Pause_Pencil_Play_Plus_RefreshCw_Save_Search_Settings_Shield_ToggleLeft_ToggleRight_Trash2_TrendingDown_TrendingUp_Type_Unlock_Upload_UserCog_Users_lucide_react__WEBPACK_IMPORTED_MODULE_58__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5 mr-1.5"
                                                }),
                                                "Reset Password"
                                            ]
                                        })
                                    })
                                ]
                            })
                        })
                    ]
                })
            })
        ]
    });
}


/***/ }),

/***/ 73299:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y9: () => (/* binding */ handlers),
/* harmony export */   j2: () => (/* binding */ auth)
/* harmony export */ });
/* unused harmony exports signIn, signOut */
/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(647242);
/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(415235);
/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(886946);
/* harmony import */ var next_auth_providers_facebook__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(409029);
/* harmony import */ var _auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(393021);
/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(757078);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(520903);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(876266);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(834013);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_prisma__WEBPACK_IMPORTED_MODULE_1__, _lib_db__WEBPACK_IMPORTED_MODULE_2__]);
([_lib_prisma__WEBPACK_IMPORTED_MODULE_1__, _lib_db__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









// ─────────────────────────────────────────────────────────────────────────
// Auth.js v5 configuration
//
// Key v5 changes from v4:
//  - Uses `export const { handlers, auth, signIn, signOut } = NextAuth(...)`
//    instead of exporting `authOptions` + separate route handler
//  - `auth()` is a server-side function (replaces getServerSession)
//  - `signIn()` works in Server Actions (not just client-side)
//  - `handlers` replaces the `[...nextauth]/route.ts` catch-all handler
//  - Cookie name changes from `next-auth.session-token` to
//    `authjs.session-token` (default in v5)
// ─────────────────────────────────────────────────────────────────────────
const { handlers, auth, signIn, signOut } = (0,next_auth__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay)({
    adapter: (0,_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_5__/* .PrismaAdapter */ .y)(_lib_db__WEBPACK_IMPORTED_MODULE_2__.db),
    pages: {
        signIn: "/login"
    },
    providers: [
        next_auth_providers_google__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A,
        next_auth_providers_facebook__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A,
        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A)({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize (credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }
                const email = String(credentials.email);
                const password = String(credentials.password);
                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__/* .prisma */ .z.user.findUnique({
                    where: {
                        email
                    }
                });
                if (!user || !user.password) {
                    throw new Error("Invalid credentials");
                // return null;
                }
                // Check if email is verified
                if (!user.emailVerified) {
                    (0,_lib_logger__WEBPACK_IMPORTED_MODULE_3__/* .logAudit */ .At)("AUTH_FAILURE", {
                        email: credentials.email,
                        userId: user.id,
                        reason: "email_not_verified"
                    });
                    throw new Error("Please verify your email before signing in");
                }
                const passwordMatches = await (0,bcryptjs__WEBPACK_IMPORTED_MODULE_4__/* .compare */ .UD)(password, user.password);
                if (!passwordMatches) {
                    (0,_lib_logger__WEBPACK_IMPORTED_MODULE_3__/* .logAudit */ .At)("AUTH_FAILURE", {
                        email: credentials.email,
                        userId: user.id,
                        reason: "invalid_password"
                    });
                    throw new Error("Invalid credentials");
                }
                // ── Admin moderation enforcement ──
                if (user.status === "banned") {
                    throw new Error("banned:" + (user.bannedReason || "Your account has been banned."));
                }
                if (user.status === "suspended") {
                    if (user.suspendedUntil && user.suspendedUntil.getTime() < Date.now()) {
                        await _lib_db__WEBPACK_IMPORTED_MODULE_2__.db.user.update({
                            where: {
                                id: user.id
                            },
                            data: {
                                status: "active",
                                suspendedUntil: null,
                                suspendedReason: null
                            }
                        });
                    } else {
                        const until = user.suspendedUntil ? new Date(user.suspendedUntil).toISOString() : "indefinite";
                        throw new Error("suspended:Your account is suspended until " + until + ".");
                    }
                }
                (0,_lib_logger__WEBPACK_IMPORTED_MODULE_3__/* .logAudit */ .At)("AUTH_SUCCESS", {
                    userId: user.id,
                    email: user.email,
                    method: "credentials"
                });
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    role: user.role
                };
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        authorized ({ auth, request }) {
            const isLoggedIn = !!auth?.user;
            const pathname = request.nextUrl.pathname;
            const protectedRoutes = [
                "/dashboard",
                "/admin",
                "/manager"
            ];
            const isProtected = protectedRoutes.some((route)=>pathname.startsWith(route));
            if (isProtected && !isLoggedIn) {
                return false;
            }
            return true;
        },
        async jwt ({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session ({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 74075:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ 77361:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Archive)
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
    name: "archive",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "20",
                height: "5",
                x: "2",
                y: "3",
                rx: "1",
                key: "1wp1u1"
            }
        ],
        [
            "path",
            {
                d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",
                key: "1s80jp"
            }
        ],
        [
            "path",
            {
                d: "M10 12h4",
                key: "a56b0p"
            }
        ]
    ]
};
__iconData.node;
const Archive = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=archive.mjs.map


/***/ }),

/***/ 108128:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/runtime-reacts.external.js");

/***/ }),

/***/ 133131:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ AnalyticsTab)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(495210);
/* harmony import */ var _barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24950);
/* harmony import */ var _barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(135195);
/* harmony import */ var _barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(289824);
/* harmony import */ var _barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(27993);
/* harmony import */ var _barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(849543);
/* harmony import */ var _barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(654183);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(521621);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(628946);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(122393);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(854206);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(877942);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(975843);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(733503);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(316625);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(390916);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(617280);
/* harmony import */ var _TabResponsiveContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10246);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(890707);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(41139);
/* harmony import */ var _barrel_optimize_names_Cell_recharts__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(93237);
/* __next_internal_client_entry_do_not_use__ default auto */ 







/* ────────────────────── Component ────────────────────── */ function AnalyticsTab() {
    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [refreshing, setRefreshing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [windowDays, setWindowDays] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(30);
    const fetchData = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (showRefresh = false)=>{
        if (showRefresh) setRefreshing(true);
        else setLoading(true);
        try {
            const res = await fetch(`/api/admin/analytics?days=${windowDays}`);
            if (!res.ok) throw new Error('Failed to fetch analytics');
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.error(err);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Failed to load analytics');
        } finally{
            setLoading(false);
            setRefreshing(false);
        }
    }, [
        windowDays
    ]);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetchData();
    }, [
        fetchData
    ]);
    /* ── Loading state ── */ if (loading && !data) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                    children: [
                        0,
                        1,
                        2,
                        3
                    ].map((i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "h-28 rounded-2xl animate-pulse",
                            style: {
                                background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
                                border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`
                            }
                        }, i))
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "h-72 rounded-2xl animate-pulse",
                    style: {
                        background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
                        border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`
                    }
                })
            ]
        });
    }
    if (!data) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "text-center py-12",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-xs",
                style: {
                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                },
                children: "No analytics data available."
            })
        });
    }
    const summaryCards = [
        {
            label: 'DAU (24h)',
            value: (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatNumber */ .ZV)(data.summary.dau),
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green
        },
        {
            label: 'MAU (30d)',
            value: (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatNumber */ .ZV)(data.summary.mau),
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.blue
        },
        {
            label: 'Total Users',
            value: (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatNumber */ .ZV)(data.summary.totalUsers),
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.purple
        },
        {
            label: `New in ${windowDays}d`,
            value: (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatNumber */ .ZV)(data.summary.newUsersLastWindow),
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber
        }
    ];
    // Shorten date keys for x-axis labels
    const fmtDay = (s)=>{
        const d = new Date(s);
        return isNaN(d.getTime()) ? s : `${d.getMonth() + 1}/${d.getDate()}`;
    };
    // Tier breakdown chart data
    const tierData = [
        'free',
        'premium',
        'pro'
    ].map((t)=>({
            tier: t,
            users: data.tierBreakdown[t] ?? 0
        }));
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between flex-wrap gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                className: "text-sm font-bold",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                },
                                children: "Analytics Dashboard"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-[10px]",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                children: [
                                    "Generated ",
                                    (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatDate */ .Yq)(data.generatedAt),
                                    " \xb7 Window: ",
                                    data.windowDays,
                                    "d"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex items-center gap-1 p-1 rounded-lg border",
                                style: {
                                    background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
                                    borderColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder
                                },
                                children: [
                                    7,
                                    30,
                                    90
                                ].map((d)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setWindowDays(d),
                                        disabled: refreshing,
                                        className: "px-2.5 py-1 rounded-md text-[10px] font-medium transition-all",
                                        style: {
                                            background: windowDays === d ? _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green : 'transparent',
                                            color: windowDays === d ? '#0c0e14' : _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                        },
                                        children: [
                                            d,
                                            "d"
                                        ]
                                    }, d))
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: ()=>fetchData(true),
                                disabled: refreshing,
                                className: "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border",
                                style: {
                                    background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
                                    borderColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder,
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                        className: `w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "hidden sm:inline",
                                        children: "Refresh"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                children: summaryCards.map((card, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_9__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            y: 16
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.35,
                            delay: i * 0.06
                        },
                        className: "rounded-2xl p-4 border",
                        style: {
                            background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
                            borderColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex items-center justify-between mb-2",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-9 h-9 rounded-lg flex items-center justify-center",
                                    style: {
                                        background: `${card.color}15`
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        style: {
                                            color: card.color
                                        },
                                        children: card.icon
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-2xl font-bold",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                },
                                children: card.value
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px] mt-0.5",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                children: card.label
                            })
                        ]
                    }, card.label))
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ChartCard, {
                title: "Daily Active Users",
                subtitle: `DAU over the last ${data.windowDays} days`,
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                    className: "w-4 h-4",
                    style: {
                        color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green
                    }
                }),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TabResponsiveContainer__WEBPACK_IMPORTED_MODULE_2__/* .TabResponsiveContainer */ .L, {
                    width: "100%",
                    height: 260,
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_10__/* .AreaChart */ .Q, {
                        data: data.dauSeries,
                        margin: {
                            top: 10,
                            right: 10,
                            left: -10,
                            bottom: 0
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("defs", {
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("linearGradient", {
                                    id: "dauGradient",
                                    x1: "0",
                                    y1: "0",
                                    x2: "0",
                                    y2: "1",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
                                            offset: "0%",
                                            stopColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green,
                                            stopOpacity: 0.4
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
                                            offset: "100%",
                                            stopColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green,
                                            stopOpacity: 0
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_11__/* .CartesianGrid */ .d, {
                                strokeDasharray: "3 3",
                                stroke: "rgba(255,255,255,0.04)"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_12__/* .XAxis */ .W, {
                                dataKey: "date",
                                tickFormatter: fmtDay,
                                tick: {
                                    fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                    fontSize: 10
                                },
                                stroke: "rgba(255,255,255,0.06)"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_13__/* .YAxis */ .h, {
                                tick: {
                                    fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                    fontSize: 10
                                },
                                stroke: "rgba(255,255,255,0.06)",
                                allowDecimals: false
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .m, {
                                contentStyle: {
                                    background: '#1a1e2b',
                                    border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`,
                                    borderRadius: 8,
                                    fontSize: 11,
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                },
                                labelStyle: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                labelFormatter: (l)=>`Date: ${(0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatDate */ .Yq)(l)}`
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_15__/* .Area */ .Gk, {
                                type: "monotone",
                                dataKey: "users",
                                stroke: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green,
                                strokeWidth: 2,
                                fill: "url(#dauGradient)",
                                name: "DAU"
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ChartCard, {
                title: "New Signups",
                subtitle: `Signups per day over the last ${data.windowDays} days`,
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                    className: "w-4 h-4",
                    style: {
                        color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.blue
                    }
                }),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TabResponsiveContainer__WEBPACK_IMPORTED_MODULE_2__/* .TabResponsiveContainer */ .L, {
                    width: "100%",
                    height: 240,
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_16__/* .BarChart */ .E, {
                        data: data.newUsersSeries,
                        margin: {
                            top: 10,
                            right: 10,
                            left: -10,
                            bottom: 0
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_11__/* .CartesianGrid */ .d, {
                                strokeDasharray: "3 3",
                                stroke: "rgba(255,255,255,0.04)"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_12__/* .XAxis */ .W, {
                                dataKey: "date",
                                tickFormatter: fmtDay,
                                tick: {
                                    fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                    fontSize: 10
                                },
                                stroke: "rgba(255,255,255,0.06)"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_13__/* .YAxis */ .h, {
                                tick: {
                                    fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                    fontSize: 10
                                },
                                stroke: "rgba(255,255,255,0.06)",
                                allowDecimals: false
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .m, {
                                contentStyle: {
                                    background: '#1a1e2b',
                                    border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`,
                                    borderRadius: 8,
                                    fontSize: 11,
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                },
                                labelStyle: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                labelFormatter: (l)=>`Date: ${(0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatDate */ .Yq)(l)}`
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_17__/* .Bar */ .yP, {
                                dataKey: "signups",
                                fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.blue,
                                name: "Signups",
                                radius: [
                                    4,
                                    4,
                                    0,
                                    0
                                ]
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ChartCard, {
                        title: "7-Day Retention",
                        subtitle: `Cohort: ${data.summary.cohortSize} user${data.summary.cohortSize === 1 ? '' : 's'} who signed up 7 days ago`,
                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                            className: "w-4 h-4",
                            style: {
                                color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.purple
                            }
                        }),
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TabResponsiveContainer__WEBPACK_IMPORTED_MODULE_2__/* .TabResponsiveContainer */ .L, {
                            width: "100%",
                            height: 240,
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_19__/* .LineChart */ .b, {
                                data: data.retentionCurve,
                                margin: {
                                    top: 10,
                                    right: 10,
                                    left: -10,
                                    bottom: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_11__/* .CartesianGrid */ .d, {
                                        strokeDasharray: "3 3",
                                        stroke: "rgba(255,255,255,0.04)"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_12__/* .XAxis */ .W, {
                                        dataKey: "day",
                                        tick: {
                                            fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                            fontSize: 10
                                        },
                                        stroke: "rgba(255,255,255,0.06)"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_13__/* .YAxis */ .h, {
                                        tick: {
                                            fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                            fontSize: 10
                                        },
                                        stroke: "rgba(255,255,255,0.06)",
                                        tickFormatter: (v)=>`${v}%`,
                                        domain: [
                                            0,
                                            100
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .m, {
                                        contentStyle: {
                                            background: '#1a1e2b',
                                            border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`,
                                            borderRadius: 8,
                                            fontSize: 11,
                                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                        },
                                        labelStyle: {
                                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                        },
                                        formatter: (v, n)=>n === 'pct' ? [
                                                `${v}%`,
                                                'Retention'
                                            ] : [
                                                v,
                                                n
                                            ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_20__/* .Line */ .N1, {
                                        type: "monotone",
                                        dataKey: "pct",
                                        stroke: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.purple,
                                        strokeWidth: 2.5,
                                        dot: {
                                            r: 4,
                                            fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.purple
                                        }
                                    })
                                ]
                            })
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ChartCard, {
                        title: "Tier Breakdown",
                        subtitle: "Users by subscription tier (snapshot)",
                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                            className: "w-4 h-4",
                            style: {
                                color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber
                            }
                        }),
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TabResponsiveContainer__WEBPACK_IMPORTED_MODULE_2__/* .TabResponsiveContainer */ .L, {
                            width: "100%",
                            height: 240,
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_16__/* .BarChart */ .E, {
                                data: tierData,
                                margin: {
                                    top: 10,
                                    right: 10,
                                    left: -10,
                                    bottom: 0
                                },
                                layout: "vertical",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_11__/* .CartesianGrid */ .d, {
                                        strokeDasharray: "3 3",
                                        stroke: "rgba(255,255,255,0.04)"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_12__/* .XAxis */ .W, {
                                        type: "number",
                                        tick: {
                                            fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                            fontSize: 10
                                        },
                                        stroke: "rgba(255,255,255,0.06)",
                                        allowDecimals: false
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_13__/* .YAxis */ .h, {
                                        type: "category",
                                        dataKey: "tier",
                                        tick: {
                                            fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                            fontSize: 10
                                        },
                                        stroke: "rgba(255,255,255,0.06)",
                                        width: 60
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .m, {
                                        contentStyle: {
                                            background: '#1a1e2b',
                                            border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`,
                                            borderRadius: 8,
                                            fontSize: 11,
                                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                        },
                                        labelStyle: {
                                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_17__/* .Bar */ .yP, {
                                        dataKey: "users",
                                        name: "Users",
                                        radius: [
                                            0,
                                            4,
                                            4,
                                            0
                                        ],
                                        children: tierData.map((entry, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Cell_recharts__WEBPACK_IMPORTED_MODULE_22__/* .Cell */ .f, {
                                                fill: entry.tier === 'pro' ? _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber : entry.tier === 'premium' ? _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.purple : _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                            }, idx))
                                    })
                                ]
                            })
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ChartCard, {
                title: "Feature Usage",
                subtitle: `Aggregated feature usage by category over the last ${data.windowDays} days`,
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Activity_Calendar_Layers_RefreshCw_TrendingUp_Users_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                    className: "w-4 h-4",
                    style: {
                        color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cyan
                    }
                }),
                children: data.featureUsage.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "py-10 text-center",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-xs",
                        style: {
                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                        },
                        children: "No feature usage recorded in this window."
                    })
                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TabResponsiveContainer__WEBPACK_IMPORTED_MODULE_2__/* .TabResponsiveContainer */ .L, {
                    width: "100%",
                    height: Math.max(220, data.featureUsage.length * 36),
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_16__/* .BarChart */ .E, {
                        data: data.featureUsage,
                        layout: "vertical",
                        margin: {
                            top: 10,
                            right: 30,
                            left: 30,
                            bottom: 0
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_11__/* .CartesianGrid */ .d, {
                                strokeDasharray: "3 3",
                                stroke: "rgba(255,255,255,0.04)"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_12__/* .XAxis */ .W, {
                                type: "number",
                                tick: {
                                    fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                    fontSize: 10
                                },
                                stroke: "rgba(255,255,255,0.06)",
                                allowDecimals: false
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_13__/* .YAxis */ .h, {
                                type: "category",
                                dataKey: "category",
                                tick: {
                                    fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                    fontSize: 10
                                },
                                stroke: "rgba(255,255,255,0.06)",
                                width: 130
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .m, {
                                contentStyle: {
                                    background: '#1a1e2b',
                                    border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`,
                                    borderRadius: 8,
                                    fontSize: 11,
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                },
                                labelStyle: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Line_LineChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_17__/* .Bar */ .yP, {
                                dataKey: "count",
                                name: "Usage Count",
                                fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cyan,
                                radius: [
                                    0,
                                    4,
                                    4,
                                    0
                                ]
                            })
                        ]
                    })
                })
            })
        ]
    });
}
/* ────────────────────── Helpers ────────────────────── */ // Local import of Cell — kept inline to avoid bloating the top-level import list.

function ChartCard({ title, subtitle, icon, children }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_9__/* .motion */ .P.div, {
        initial: {
            opacity: 0,
            y: 16
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.35
        },
        className: "rounded-2xl border p-4",
        style: {
            background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
            borderColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2 mb-1",
                children: [
                    icon,
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
                        className: "text-xs font-bold",
                        style: {
                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                        },
                        children: title
                    })
                ]
            }),
            subtitle && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-[10px] mb-3",
                style: {
                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                },
                children: subtitle
            }),
            children
        ]
    });
}


/***/ }),

/***/ 134631:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 134795:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ useComposedRefs)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);


/**
 * Taken from https://github.com/radix-ui/primitives/blob/main/packages/react/compose-refs/src/compose-refs.tsx
 */
/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */
function setRef(ref, value) {
    if (typeof ref === "function") {
        return ref(value);
    }
    else if (ref !== null && ref !== undefined) {
        ref.current = value;
    }
}
/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */
function composeRefs(...refs) {
    return (node) => {
        let hasCleanup = false;
        const cleanups = refs.map((ref) => {
            const cleanup = setRef(ref, node);
            if (!hasCleanup && typeof cleanup === "function") {
                hasCleanup = true;
            }
            return cleanup;
        });
        // React <19 will log an error to the console if a callback ref returns a
        // value. We don't use ref cleanups internally so this will only happen if a
        // user's ref callback returns a value, which we only expect if they are
        // using the cleanup functionality added in React 19.
        if (hasCleanup) {
            return () => {
                for (let i = 0; i < cleanups.length; i++) {
                    const cleanup = cleanups[i];
                    if (typeof cleanup === "function") {
                        cleanup();
                    }
                    else {
                        setRef(refs[i], null);
                    }
                }
            };
        }
    };
}
/**
 * A custom hook that composes multiple refs
 * Accepts callback refs and RefObject(s)
 */
function useComposedRefs(...refs) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(composeRefs(...refs), refs);
}


//# sourceMappingURL=use-composed-ref.mjs.map


/***/ }),

/***/ 141791:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ selectArea)
/* harmony export */ });
/* unused harmony export selectGraphicalItemStackedData */
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(132362);
/* harmony import */ var _cartesian_Area__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(975843);
/* harmony import */ var _axisSelectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(742367);
/* harmony import */ var _context_chartLayoutContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(655644);
/* harmony import */ var _dataSelectors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(925644);
/* harmony import */ var _util_ChartUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(830841);
/* harmony import */ var _util_DataUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(901791);
/* harmony import */ var _util_stacks_getStackSeriesIdentifier__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(528222);
/* harmony import */ var _rootPropsSelectors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(280852);
/* harmony import */ var _graphicalItemSelectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27660);










var selectXAxisWithScale = (state, graphicalItemId, isPanorama)=>(0,_axisSelectors__WEBPACK_IMPORTED_MODULE_0__/* .selectAxisWithScale */ .Gx)(state, 'xAxis', (0,_graphicalItemSelectors__WEBPACK_IMPORTED_MODULE_1__/* .selectXAxisIdFromGraphicalItemId */ .W)(state, graphicalItemId), isPanorama);
var selectXAxisTicks = (state, graphicalItemId, isPanorama)=>(0,_axisSelectors__WEBPACK_IMPORTED_MODULE_0__/* .selectTicksOfGraphicalItem */ .CR)(state, 'xAxis', (0,_graphicalItemSelectors__WEBPACK_IMPORTED_MODULE_1__/* .selectXAxisIdFromGraphicalItemId */ .W)(state, graphicalItemId), isPanorama);
var selectYAxisWithScale = (state, graphicalItemId, isPanorama)=>(0,_axisSelectors__WEBPACK_IMPORTED_MODULE_0__/* .selectAxisWithScale */ .Gx)(state, 'yAxis', (0,_graphicalItemSelectors__WEBPACK_IMPORTED_MODULE_1__/* .selectYAxisIdFromGraphicalItemId */ .B)(state, graphicalItemId), isPanorama);
var selectYAxisTicks = (state, graphicalItemId, isPanorama)=>(0,_axisSelectors__WEBPACK_IMPORTED_MODULE_0__/* .selectTicksOfGraphicalItem */ .CR)(state, 'yAxis', (0,_graphicalItemSelectors__WEBPACK_IMPORTED_MODULE_1__/* .selectYAxisIdFromGraphicalItemId */ .B)(state, graphicalItemId), isPanorama);
var selectBandSize = (0,reselect__WEBPACK_IMPORTED_MODULE_2__/* .createSelector */ .Mz)([
    _context_chartLayoutContext__WEBPACK_IMPORTED_MODULE_3__/* .selectChartLayout */ .fz,
    selectXAxisWithScale,
    selectYAxisWithScale,
    selectXAxisTicks,
    selectYAxisTicks
], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks)=>{
    if ((0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_4__/* .isCategoricalAxis */ ._L)(layout, 'xAxis')) {
        return (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_4__/* .getBandSizeOfAxis */ .Hj)(xAxis, xAxisTicks, false);
    }
    return (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_4__/* .getBandSizeOfAxis */ .Hj)(yAxis, yAxisTicks, false);
});
var pickAreaId = (_state, id)=>id;
/*
 * There is a race condition problem because we read some data from props and some from the state.
 * The state is updated through a dispatch and is one render behind,
 * and so we have this weird one tick render where the displayedData in one selector have the old dataKey
 * but the new dataKey in another selector.
 *
 * A proper fix is to either move everything into the state, or read the dataKey always from props
 * - but this is a smaller change.
 */ var selectSynchronisedAreaSettings = (0,reselect__WEBPACK_IMPORTED_MODULE_2__/* .createSelector */ .Mz)([
    _axisSelectors__WEBPACK_IMPORTED_MODULE_0__/* .selectUnfilteredCartesianItems */ .ld,
    pickAreaId
], (graphicalItems, id)=>graphicalItems.filter((item)=>item.type === 'area').find((item)=>item.id === id));
var selectNumericalAxisType = (state)=>{
    var layout = (0,_context_chartLayoutContext__WEBPACK_IMPORTED_MODULE_3__/* .selectChartLayout */ .fz)(state);
    var isXAxisCategorical = (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_4__/* .isCategoricalAxis */ ._L)(layout, 'xAxis');
    return isXAxisCategorical ? 'yAxis' : 'xAxis';
};
var selectNumericalAxisIdFromGraphicalItemId = (state, graphicalItemId)=>{
    var axisType = selectNumericalAxisType(state);
    if (axisType === 'yAxis') {
        return (0,_graphicalItemSelectors__WEBPACK_IMPORTED_MODULE_1__/* .selectYAxisIdFromGraphicalItemId */ .B)(state, graphicalItemId);
    }
    return (0,_graphicalItemSelectors__WEBPACK_IMPORTED_MODULE_1__/* .selectXAxisIdFromGraphicalItemId */ .W)(state, graphicalItemId);
};
var selectNumericalAxisStackGroups = (state, graphicalItemId, isPanorama)=>(0,_axisSelectors__WEBPACK_IMPORTED_MODULE_0__/* .selectStackGroups */ .TC)(state, selectNumericalAxisType(state), selectNumericalAxisIdFromGraphicalItemId(state, graphicalItemId), isPanorama);
var selectGraphicalItemStackedData = (0,reselect__WEBPACK_IMPORTED_MODULE_2__/* .createSelector */ .Mz)([
    selectSynchronisedAreaSettings,
    selectNumericalAxisStackGroups
], (areaSettings, stackGroups)=>{
    var _stackGroups$stackId;
    if (areaSettings == null || stackGroups == null) {
        return undefined;
    }
    var stackId = areaSettings.stackId;
    var stackSeriesIdentifier = (0,_util_stacks_getStackSeriesIdentifier__WEBPACK_IMPORTED_MODULE_5__/* .getStackSeriesIdentifier */ .x)(areaSettings);
    if (stackId == null || stackSeriesIdentifier == null) {
        return undefined;
    }
    var groups = (_stackGroups$stackId = stackGroups[stackId]) === null || _stackGroups$stackId === void 0 ? void 0 : _stackGroups$stackId.stackedData;
    var found = groups === null || groups === void 0 ? void 0 : groups.find((v)=>v.key === stackSeriesIdentifier);
    if (found == null) {
        return undefined;
    }
    return found.map((item)=>[
            item[0],
            item[1]
        ]);
});
/*
 * All dataKeys of the stack group that this graphical item belongs to.
 * computeArea needs them to tell apart data points where only this series is null
 * (rendered as zero contribution to keep the stack consistent)
 * from data points where the whole stack is null
 * (a break point that connectNulls may connect across).
 */ var selectStackDataKeys = (0,reselect__WEBPACK_IMPORTED_MODULE_2__/* .createSelector */ .Mz)([
    selectSynchronisedAreaSettings,
    selectNumericalAxisStackGroups
], (areaSettings, stackGroups)=>{
    if (areaSettings == null || areaSettings.stackId == null || stackGroups == null) {
        return undefined;
    }
    var group = stackGroups[areaSettings.stackId];
    if (group == null) {
        return undefined;
    }
    return group.graphicalItems.map((item)=>item.dataKey).filter(_util_DataUtils__WEBPACK_IMPORTED_MODULE_6__/* .isNotNil */ .n9);
});
var selectArea = (0,reselect__WEBPACK_IMPORTED_MODULE_2__/* .createSelector */ .Mz)([
    _context_chartLayoutContext__WEBPACK_IMPORTED_MODULE_3__/* .selectChartLayout */ .fz,
    selectXAxisWithScale,
    selectYAxisWithScale,
    selectXAxisTicks,
    selectYAxisTicks,
    selectGraphicalItemStackedData,
    _dataSelectors__WEBPACK_IMPORTED_MODULE_7__/* .selectChartDataWithIndexesIfNotInPanoramaPosition3 */ .rN,
    selectBandSize,
    selectSynchronisedAreaSettings,
    _rootPropsSelectors__WEBPACK_IMPORTED_MODULE_8__/* .selectChartBaseValue */ .vm,
    selectStackDataKeys
], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks, stackedData, _ref, bandSize, areaSettings, chartBaseValue, stackDataKeys)=>{
    var chartData = _ref.chartData, dataStartIndex = _ref.dataStartIndex, dataEndIndex = _ref.dataEndIndex;
    if (areaSettings == null || layout !== 'horizontal' && layout !== 'vertical' || xAxis == null || yAxis == null || xAxisTicks == null || yAxisTicks == null || xAxisTicks.length === 0 || yAxisTicks.length === 0 || bandSize == null) {
        return undefined;
    }
    var data = areaSettings.data;
    var displayedData;
    if (data && data.length > 0) {
        displayedData = data;
    } else {
        displayedData = chartData === null || chartData === void 0 ? void 0 : chartData.slice(dataStartIndex, dataEndIndex + 1);
    }
    if (displayedData == null) {
        return undefined;
    }
    return (0,_cartesian_Area__WEBPACK_IMPORTED_MODULE_9__/* .computeArea */ .Vf)({
        layout,
        xAxis,
        yAxis,
        xAxisTicks,
        yAxisTicks,
        dataStartIndex,
        areaSettings,
        stackedData,
        displayedData,
        chartBaseValue,
        bandSize,
        stackDataKeys
    });
});


/***/ }),

/***/ 144865:
/***/ ((module) => {

"use strict";
module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");;

/***/ }),

/***/ 164939:
/***/ ((module) => {

"use strict";
module.exports = import("pg");;

/***/ }),

/***/ 167494:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Wallet)
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
    name: "wallet",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
                key: "18etb6"
            }
        ],
        [
            "path",
            {
                d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",
                key: "xoc0q4"
            }
        ]
    ]
};
__iconData.node;
const Wallet = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=wallet.mjs.map


/***/ }),

/***/ 173136:
/***/ ((module) => {

"use strict";
module.exports = require("node:url");

/***/ }),

/***/ 176760:
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ 197432:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Lock)
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
    name: "lock",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "18",
                height: "11",
                x: "3",
                y: "11",
                rx: "2",
                ry: "2",
                key: "1w4ew1"
            }
        ],
        [
            "path",
            {
                d: "M7 11V7a5 5 0 0 1 10 0v4",
                key: "fwvmzm"
            }
        ]
    ]
};
__iconData.node;
const Lock = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=lock.mjs.map


/***/ }),

/***/ 201494:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ PresenceChild)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var _context_PresenceContext_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(364337);
/* harmony import */ var _utils_use_constant_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(982423);
/* harmony import */ var _utils_use_isomorphic_effect_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22622);
/* harmony import */ var _PopChild_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(932594);
/* __next_internal_client_entry_do_not_use__ PresenceChild auto */ 






const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root })=>{
    const presenceChildren = (0,_utils_use_constant_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useConstant */ .M)(newChildrenMap);
    const id = (0,react__WEBPACK_IMPORTED_MODULE_1__.useId)();
    // Written in a layout effect (not render) so discarded concurrent
    // renders can't leave the refs pointing at uncommitted state.
    const isPresentRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(isPresent);
    const onExitCompleteRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(onExitComplete);
    (0,_utils_use_isomorphic_effect_mjs__WEBPACK_IMPORTED_MODULE_3__/* .useIsomorphicLayoutEffect */ .E)(()=>{
        isPresentRef.current = isPresent;
        onExitCompleteRef.current = onExitComplete;
    });
    let isReusedContext = true;
    let context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        isReusedContext = false;
        return {
            id,
            initial,
            isPresent,
            custom,
            onExitComplete: (childId)=>{
                presenceChildren.set(childId, true);
                for (const isComplete of presenceChildren.values()){
                    if (!isComplete) return; // can stop searching when any is incomplete
                }
                onExitComplete && onExitComplete();
            },
            register: (childId)=>{
                presenceChildren.set(childId, false);
                return ()=>{
                    presenceChildren.delete(childId);
                    !isPresentRef.current && !presenceChildren.size && onExitCompleteRef.current?.();
                };
            }
        };
    }, [
        isPresent,
        presenceChildren,
        onExitComplete
    ]);
    /**
     * If the presence of a child affects the layout of the components around it,
     * we want to make a new context value to ensure they get re-rendered
     * so they can detect that layout change.
     */ if (presenceAffectsLayout && isReusedContext) {
        context = {
            ...context
        };
    }
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        presenceChildren.forEach((_, key)=>presenceChildren.set(key, false));
    }, [
        isPresent
    ]);
    /**
     * If there's no `motion` components to fire exit animations, we want to remove this
     * component immediately.
     */ react__WEBPACK_IMPORTED_MODULE_1__.useEffect(()=>{
        !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
    }, [
        isPresent
    ]);
    children = (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PopChild_mjs__WEBPACK_IMPORTED_MODULE_4__/* .PopChild */ .C, {
        pop: mode === "popLayout",
        isPresent: isPresent,
        anchorX: anchorX,
        anchorY: anchorY,
        root: root,
        children: children
    });
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_context_PresenceContext_mjs__WEBPACK_IMPORTED_MODULE_5__/* .PresenceContext */ .t.Provider, {
        value: context,
        children: children
    });
};
function newChildrenMap() {
    return new Map();
}
 //# sourceMappingURL=PresenceChild.mjs.map


/***/ }),

/***/ 208209:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ComplianceDashboard)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(197432);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(880592);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(239041);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(915741);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(122442);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(199646);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(77014);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(269357);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(332706);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(229813);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(346633);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(334460);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(640245);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(746411);
/* __next_internal_client_entry_do_not_use__ default auto */ 



/* ═══════════════════════════════════════════════════════════════
   COLOR CONSTANTS (MedQ Dark Theme)
   ═══════════════════════════════════════════════════════════════ */ const C = {
    bg: 'var(--medq-app-bg, #0c0e14)',
    card: 'var(--medq-card-bg, rgba(255,255,255,0.03))',
    cardSolid: '#151821',
    cardBorder: 'var(--medq-card-border, rgba(255,255,255,0.06))',
    green: 'var(--medq-accent-green, #00e5a0)',
    amber: 'var(--medq-accent-amber, #f59e0b)',
    danger: 'var(--medq-accent-danger, #ff5757)',
    orange: 'var(--medq-accent-amber, #f97316)',
    text: 'var(--medq-text, #e8ecf4)',
    muted: '#8b95a8',
    dimmed: '#5a6478',
    cyan: 'var(--medq-accent-cyan, #22d3ee)',
    purple: 'var(--medq-accent-purple, #8b5cf6)'
};
const SEVERITY_CONFIG = {
    info: {
        color: C.cyan,
        bg: 'rgba(34,211,238,0.08)',
        border: 'rgba(34,211,238,0.2)'
    },
    warning: {
        color: C.amber,
        bg: 'rgba(245,158,11,0.08)',
        border: 'rgba(245,158,11,0.2)'
    },
    critical: {
        color: C.danger,
        bg: 'rgba(255,87,87,0.08)',
        border: 'rgba(255,87,87,0.2)'
    }
};
const ENCRYPTION_LEVELS = [
    {
        value: 'none',
        label: 'None',
        description: 'No encryption. Messages stored and transmitted in plaintext. Not recommended for healthcare.',
        color: C.danger
    },
    {
        value: 'transport',
        label: 'Transport (TLS)',
        description: 'Messages encrypted in transit via TLS. Server can read messages. Standard for most web apps.',
        color: C.amber
    },
    {
        value: 'e2e',
        label: 'End-to-End',
        description: 'Client-side encryption using Signal Protocol. Server cannot read messages. Recommended for HIPAA compliance.',
        color: C.green
    }
];
/* ═══════════════════════════════════════════════════════════════
   COMPLIANCE DASHBOARD
   ═══════════════════════════════════════════════════════════════ */ function ComplianceDashboard() {
    const store = (0,_store__WEBPACK_IMPORTED_MODULE_2__/* .useComplianceStore */ .Y)();
    const [activeSection, setActiveSection] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('settings');
    const [saving, setSaving] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [searchQuery, setSearchQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [severityFilter, setSeverityFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
    const [retentionRunning, setRetentionRunning] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Load settings on mount
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const loadSettings = async ()=>{
            _store__WEBPACK_IMPORTED_MODULE_2__/* .useComplianceStore */ .Y.getState().setLoading(true);
            try {
                const res = await fetch('/api/compliance');
                if (res.ok) {
                    const data = await res.json();
                    _store__WEBPACK_IMPORTED_MODULE_2__/* .useComplianceStore */ .Y.getState().setSettings(data.settings);
                }
            } catch (e) {
                console.error('Failed to load compliance settings:', e);
            } finally{
                _store__WEBPACK_IMPORTED_MODULE_2__/* .useComplianceStore */ .Y.getState().setLoading(false);
            }
        };
        loadSettings();
    }, []);
    // Load audit logs
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const loadLogs = async ()=>{
            try {
                const res = await fetch(`/api/audit/log?limit=100`);
                if (res.ok) {
                    const data = await res.json();
                    _store__WEBPACK_IMPORTED_MODULE_2__/* .useComplianceStore */ .Y.getState().setAuditLogs(data.logs || []);
                }
            } catch (e) {
                console.error('Failed to load audit logs:', e);
            }
        };
        if (activeSection === 'audit') loadLogs();
    }, [
        activeSection
    ]);
    // Save settings
    const saveSettings = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setSaving(true);
        try {
            const res = await fetch('/api/compliance', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(store.settings)
            });
            if (res.ok) {
                const data = await res.json();
                _store__WEBPACK_IMPORTED_MODULE_2__/* .useComplianceStore */ .Y.getState().setSettings(data.settings);
            }
        } catch (e) {
            console.error('Failed to save settings:', e);
        } finally{
            setSaving(false);
        }
    }, [
        store.settings
    ]);
    // Execute retention
    const executeRetention = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setRetentionRunning(true);
        try {
            const res = await fetch('/api/compliance/retention', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    retentionDays: store.settings.retentionDays
                })
            });
            if (res.ok) {
                const data = await res.json();
                alert(`Retention executed: ${data.messagesPurged} messages purged.`);
            }
        } catch (e) {
            console.error('Retention error:', e);
        } finally{
            setRetentionRunning(false);
        }
    }, [
        store.settings.retentionDays
    ]);
    // Filter audit logs
    const filteredLogs = store.auditLogs.filter((log)=>{
        if (severityFilter !== 'all' && log.severity !== severityFilter) return false;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            return (log.details || '').toLowerCase().includes(q) || (log.action || '').toLowerCase().includes(q) || (log.eventType || '').toLowerCase().includes(q) || (log.resource || '').toLowerCase().includes(q);
        }
        return true;
    });
    const sections = [
        {
            key: 'settings',
            label: 'Encryption & Settings',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                className: "w-4 h-4"
            })
        },
        {
            key: 'audit',
            label: 'Audit Logs',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                className: "w-4 h-4"
            })
        },
        {
            key: 'retention',
            label: 'Data Retention',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                className: "w-4 h-4"
            })
        },
        {
            key: 'baa',
            label: 'BAA Document',
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                className: "w-4 h-4"
            })
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-10 h-10 rounded-xl flex items-center justify-center",
                        style: {
                            background: 'rgba(139,92,246,0.12)',
                            border: '1px solid rgba(139,92,246,0.2)'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                            className: "w-5 h-5",
                            style: {
                                color: C.purple
                            }
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                className: "text-lg font-bold",
                                style: {
                                    color: C.text
                                },
                                children: "HIPAA Compliance"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[11px]",
                                style: {
                                    color: C.dimmed
                                },
                                children: "Encryption, audit logging, data retention, and BAA management"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex gap-1 p-1 rounded-xl",
                style: {
                    background: C.cardSolid
                },
                children: sections.map((sec)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>setActiveSection(sec.key),
                        className: "flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[12px] font-medium transition-all",
                        style: {
                            background: activeSection === sec.key ? 'rgba(139,92,246,0.12)' : 'transparent',
                            color: activeSection === sec.key ? C.purple : C.dimmed,
                            border: activeSection === sec.key ? '1px solid rgba(139,92,246,0.2)' : '1px solid transparent'
                        },
                        children: [
                            sec.icon,
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "hidden sm:inline",
                                children: sec.label
                            })
                        ]
                    }, sec.key))
            }),
            activeSection === 'settings' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-xl p-5",
                        style: {
                            background: C.cardSolid,
                            border: `1px solid ${C.cardBorder}`
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                className: "text-sm font-semibold mb-3",
                                style: {
                                    color: C.text
                                },
                                children: "Encryption Level"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "space-y-2",
                                children: ENCRYPTION_LEVELS.map((level)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>_store__WEBPACK_IMPORTED_MODULE_2__/* .useComplianceStore */ .Y.getState().updateSetting('encryptionLevel', level.value),
                                        className: "w-full text-left p-3 rounded-lg transition-all",
                                        style: {
                                            background: store.settings.encryptionLevel === level.value ? `${level.color}10` : C.card,
                                            border: `1px solid ${store.settings.encryptionLevel === level.value ? `${level.color}30` : C.cardBorder}`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2 mb-1",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "w-3 h-3 rounded-full flex-shrink-0",
                                                        style: {
                                                            background: level.color
                                                        }
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-sm font-semibold",
                                                        style: {
                                                            color: level.color
                                                        },
                                                        children: level.label
                                                    }),
                                                    store.settings.encryptionLevel === level.value && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                        className: "w-4 h-4 ml-auto",
                                                        style: {
                                                            color: level.color
                                                        }
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[11px] ml-5",
                                                style: {
                                                    color: C.dimmed
                                                },
                                                children: level.description
                                            })
                                        ]
                                    }, level.value))
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "rounded-xl p-4",
                                style: {
                                    background: C.cardSolid,
                                    border: `1px solid ${C.cardBorder}`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                        className: "text-sm font-semibold mb-2",
                                        style: {
                                            color: C.text
                                        },
                                        children: "Data Retention"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[11px] mb-3",
                                        style: {
                                            color: C.dimmed
                                        },
                                        children: "Messages older than this period will be automatically purged"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                type: "number",
                                                min: 30,
                                                max: 3650,
                                                value: store.settings.retentionDays,
                                                onChange: (e)=>_store__WEBPACK_IMPORTED_MODULE_2__/* .useComplianceStore */ .Y.getState().updateSetting('retentionDays', parseInt(e.target.value) || 365),
                                                className: "flex-1 px-3 py-2 rounded-lg text-sm outline-none",
                                                style: {
                                                    background: C.card,
                                                    border: `1px solid ${C.cardBorder}`,
                                                    color: C.text
                                                }
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[11px]",
                                                style: {
                                                    color: C.dimmed
                                                },
                                                children: "days"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "rounded-xl p-4",
                                style: {
                                    background: C.cardSolid,
                                    border: `1px solid ${C.cardBorder}`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                        className: "text-sm font-semibold mb-2",
                                        style: {
                                            color: C.text
                                        },
                                        children: "Audit Logging"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[11px] mb-3",
                                        style: {
                                            color: C.dimmed
                                        },
                                        children: "Record all access events and compliance actions"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>_store__WEBPACK_IMPORTED_MODULE_2__/* .useComplianceStore */ .Y.getState().updateSetting('auditLogging', !store.settings.auditLogging),
                                        className: "flex items-center gap-2 px-3 py-2 rounded-lg text-sm",
                                        style: {
                                            background: store.settings.auditLogging ? `${C.green}12` : `${C.danger}12`,
                                            color: store.settings.auditLogging ? C.green : C.danger,
                                            border: `1px solid ${store.settings.auditLogging ? `${C.green}25` : `${C.danger}25`}`
                                        },
                                        children: [
                                            store.settings.auditLogging ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                className: "w-4 h-4"
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                className: "w-4 h-4"
                                            }),
                                            store.settings.auditLogging ? 'Enabled' : 'Disabled'
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: saveSettings,
                        disabled: saving,
                        className: "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all",
                        style: {
                            background: `${C.purple}15`,
                            color: C.purple,
                            border: `1px solid ${C.purple}30`
                        },
                        children: [
                            saving ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                className: "w-4 h-4 animate-spin"
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            }),
                            "Save Compliance Settings"
                        ]
                    })
                ]
            }),
            activeSection === 'audit' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "relative flex-1",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                                        style: {
                                            color: C.dimmed
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                        type: "text",
                                        value: searchQuery,
                                        onChange: (e)=>setSearchQuery(e.target.value),
                                        placeholder: "Search audit logs...",
                                        className: "w-full pl-9 pr-3 py-2 rounded-lg text-sm outline-none",
                                        style: {
                                            background: C.cardSolid,
                                            border: `1px solid ${C.cardBorder}`,
                                            color: C.text
                                        }
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                value: severityFilter,
                                onChange: (e)=>setSeverityFilter(e.target.value),
                                className: "px-3 py-2 rounded-lg text-sm outline-none",
                                style: {
                                    background: C.cardSolid,
                                    border: `1px solid ${C.cardBorder}`,
                                    color: C.text
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        value: "all",
                                        children: "All Severity"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        value: "info",
                                        children: "Info"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        value: "warning",
                                        children: "Warning"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        value: "critical",
                                        children: "Critical"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "rounded-xl overflow-hidden",
                        style: {
                            border: `1px solid ${C.cardBorder}`
                        },
                        children: filteredLogs.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "text-center py-8",
                            style: {
                                color: C.dimmed
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                    className: "w-8 h-8 mx-auto mb-2 opacity-30"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-sm",
                                    children: "No audit logs found"
                                })
                            ]
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "divide-y",
                            style: {
                                borderColor: C.cardBorder
                            },
                            children: filteredLogs.slice(0, 50).map((log)=>{
                                const sevConfig = SEVERITY_CONFIG[log.severity] || SEVERITY_CONFIG.info;
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "p-3 hover:bg-white/[0.02] transition-colors",
                                    style: {
                                        background: C.cardSolid
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-start gap-3",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "w-2 h-2 rounded-full mt-1.5 flex-shrink-0",
                                                style: {
                                                    background: sevConfig.color
                                                }
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex items-center gap-2 flex-wrap",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "text-[12px] font-semibold",
                                                                style: {
                                                                    color: sevConfig.color
                                                                },
                                                                children: log.eventType
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "text-[10px] px-1.5 py-0.5 rounded",
                                                                style: {
                                                                    background: sevConfig.bg,
                                                                    color: sevConfig.color,
                                                                    border: `1px solid ${sevConfig.border}`
                                                                },
                                                                children: log.severity
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "text-[10px]",
                                                                style: {
                                                                    color: C.dimmed
                                                                },
                                                                children: log.resource
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-[11px] mt-0.5",
                                                        style: {
                                                            color: C.muted
                                                        },
                                                        children: log.details
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex items-center gap-3 mt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: "text-[10px]",
                                                                style: {
                                                                    color: C.dimmed
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                                                        className: "w-3 h-3 inline mr-0.5"
                                                                    }),
                                                                    new Date(log.timestamp).toLocaleString()
                                                                ]
                                                            }),
                                                            log.userId && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: "text-[10px]",
                                                                style: {
                                                                    color: C.dimmed
                                                                },
                                                                children: [
                                                                    "User: ",
                                                                    log.userId.slice(0, 8),
                                                                    "..."
                                                                ]
                                                            }),
                                                            log.ipAddress && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: "text-[10px]",
                                                                style: {
                                                                    color: C.dimmed
                                                                },
                                                                children: [
                                                                    "IP: ",
                                                                    log.ipAddress
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                }, log.id);
                            })
                        })
                    })
                ]
            }),
            activeSection === 'retention' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-xl p-5",
                        style: {
                            background: C.cardSolid,
                            border: `1px solid ${C.cardBorder}`
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                className: "text-sm font-semibold mb-3",
                                style: {
                                    color: C.text
                                },
                                children: "Data Retention Policy"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-[11px] mb-4",
                                style: {
                                    color: C.dimmed
                                },
                                children: [
                                    "Messages older than ",
                                    store.settings.retentionDays,
                                    " days will be permanently purged. This action cannot be undone. HIPAA requires a minimum of 6 years (2,190 days) for some record types."
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "grid grid-cols-2 gap-3 mb-4",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "p-3 rounded-lg",
                                        style: {
                                            background: C.card,
                                            border: `1px solid ${C.cardBorder}`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[10px] uppercase",
                                                style: {
                                                    color: C.dimmed
                                                },
                                                children: "Retention Period"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                className: "text-lg font-bold",
                                                style: {
                                                    color: C.cyan
                                                },
                                                children: [
                                                    store.settings.retentionDays,
                                                    " days"
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "p-3 rounded-lg",
                                        style: {
                                            background: C.card,
                                            border: `1px solid ${C.cardBorder}`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[10px] uppercase",
                                                style: {
                                                    color: C.dimmed
                                                },
                                                children: "Policy Status"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-lg font-bold",
                                                style: {
                                                    color: C.green
                                                },
                                                children: "Active"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: executeRetention,
                                disabled: retentionRunning,
                                className: "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all",
                                style: {
                                    background: `${C.danger}12`,
                                    color: C.danger,
                                    border: `1px solid ${C.danger}25`
                                },
                                children: [
                                    retentionRunning ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                        className: "w-4 h-4 animate-spin"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                        className: "w-4 h-4"
                                    }),
                                    "Execute Retention Now"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "rounded-xl p-4",
                        style: {
                            background: 'rgba(245,158,11,0.06)',
                            border: '1px solid rgba(245,158,11,0.15)'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-start gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                    className: "w-5 h-5 flex-shrink-0",
                                    style: {
                                        color: C.amber
                                    }
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-sm font-semibold",
                                            style: {
                                                color: C.amber
                                            },
                                            children: "Important Notice"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[11px] mt-1",
                                            style: {
                                                color: C.muted
                                            },
                                            children: "Executing retention will permanently modify messages older than the retention period. Ensure you have proper backups and that your retention policy complies with applicable regulations (HIPAA requires minimum 6-year retention for designated record sets). This action is logged in the audit trail."
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                ]
            }),
            activeSection === 'baa' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "space-y-4",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "rounded-xl p-5",
                    style: {
                        background: C.cardSolid,
                        border: `1px solid ${C.cardBorder}`
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                            className: "text-sm font-semibold mb-3",
                            style: {
                                color: C.text
                            },
                            children: "Business Associate Agreement (BAA)"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-[11px] mb-4",
                            style: {
                                color: C.dimmed
                            },
                            children: "A BAA is required between a covered entity (healthcare organization) and a business associate (this platform) for HIPAA compliance when handling PHI. Without a signed BAA, this platform should not be used for protected health information."
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-3 mb-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-[10px] font-bold uppercase mb-1 block",
                                            style: {
                                                color: C.dimmed
                                            },
                                            children: "Organization Name"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                            type: "text",
                                            value: store.settings.baaOrganization || '',
                                            onChange: (e)=>_store__WEBPACK_IMPORTED_MODULE_2__/* .useComplianceStore */ .Y.getState().updateSetting('baaOrganization', e.target.value),
                                            placeholder: "Enter organization name...",
                                            className: "w-full px-3 py-2 rounded-lg text-sm outline-none",
                                            style: {
                                                background: C.card,
                                                border: `1px solid ${C.cardBorder}`,
                                                color: C.text
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            onClick: ()=>_store__WEBPACK_IMPORTED_MODULE_2__/* .useComplianceStore */ .Y.getState().updateSetting('baaSigned', !store.settings.baaSigned),
                                            className: "flex items-center gap-2 px-3 py-2 rounded-lg text-sm",
                                            style: {
                                                background: store.settings.baaSigned ? `${C.green}12` : `${C.danger}12`,
                                                color: store.settings.baaSigned ? C.green : C.danger,
                                                border: `1px solid ${store.settings.baaSigned ? `${C.green}25` : `${C.danger}25`}`
                                            },
                                            children: [
                                                store.settings.baaSigned ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                    className: "w-4 h-4"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                                    className: "w-4 h-4"
                                                }),
                                                "BAA ",
                                                store.settings.baaSigned ? 'Signed' : 'Not Signed'
                                            ]
                                        }),
                                        store.settings.baaSigned && store.settings.baaSignedDate && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-[11px]",
                                            style: {
                                                color: C.dimmed
                                            },
                                            children: [
                                                "Signed on: ",
                                                new Date(store.settings.baaSignedDate).toLocaleDateString()
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            onClick: ()=>{
                                // Generate and download BAA template
                                const baaText = generateBAATemplate(store.settings.baaOrganization || '[Organization Name]');
                                const blob = new Blob([
                                    baaText
                                ], {
                                    type: 'text/plain'
                                });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `BAA-${(store.settings.baaOrganization || 'template').replace(/\s+/g, '-')}-${new Date().toISOString().slice(0, 10)}.txt`;
                                a.click();
                                URL.revokeObjectURL(url);
                            },
                            className: "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium",
                            style: {
                                background: `${C.purple}12`,
                                color: C.purple,
                                border: `1px solid ${C.purple}25`
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Clock_Download_Eye_FileText_Loader2_Lock_Save_Search_Shield_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                }),
                                "Download BAA Template"
                            ]
                        })
                    ]
                })
            })
        ]
    });
}
/* ═══════════════════════════════════════════════════════════════
   BAA DOCUMENT TEMPLATE GENERATOR
   ═══════════════════════════════════════════════════════════════ */ function generateBAATemplate(organizationName) {
    const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return `
BUSINESS ASSOCIATE AGREEMENT
==============================

This Business Associate Agreement ("BAA") is entered into as of ${date}
("Effective Date"), by and between:

COVERED ENTITY:  ${organizationName}
                 ("Covered Entity")

BUSINESS ASSOCIATE:  MedQ Platform
                     ("Business Associate")

RECITALS
--------

WHEREAS, Covered Entity is a covered entity as defined under the Health
Insurance Portability and Accountability Act of 1996 ("HIPAA"),
as amended by the Health Information Technology for Economic and Clinical
Health Act ("HITECH Act"); and

WHEREAS, Business Associate provides certain services to Covered Entity
that involve the creation, receipt, maintenance, or transmission of
Protected Health Information ("PHI"); and

WHEREAS, the parties desire to comply with the requirements of HIPAA,
the HITECH Act, and implementing regulations at 45 CFR Parts 160 and 164;

NOW, THEREFORE, the parties agree as follows:

1. DEFINITIONS
--------------

1.1 "Protected Health Information" or "PHI" means individually identifiable
health information held by or on behalf of Business Associate that is
created, received, maintained, or transmitted on behalf of Covered Entity.

1.2 "Breach" means the acquisition, access, use, or disclosure of PHI
in a manner not permitted by HIPAA which compromises the security or
privacy of such PHI.

1.3 "Data Aggregation" means the combining of PHI created or received
by Business Associate on behalf of Covered Entity.

1.4 "Designated Record Set" means a group of records maintained by or
for a covered entity that is the medical or billing records about
individuals; enrollment, payment, claims adjudication, and case
management records; or records used to make decisions about individuals.

1.5 "Security Incident" means the attempted or successful unauthorized
access, use, disclosure, modification, or destruction of information
or interference with system operations in an information system.

1.6 All other capitalized terms not defined herein shall have the same
meaning as those terms in the HIPAA Rules.

2. OBLIGATIONS OF BUSINESS ASSOCIATE
-------------------------------------

2.1 Business Associate shall not use or disclose PHI other than as
permitted or required by this Agreement or as required by law.

2.2 Business Associate shall use appropriate safeguards to prevent use
or disclosure of PHI other than as provided for by this Agreement.

2.3 Business Associate shall implement administrative, physical, and
technical safeguards that reasonably and appropriately protect the
confidentiality, integrity, and availability of PHI.

2.4 Business Associate shall ensure that any agent or subcontractor
to whom it provides PHI agrees to the same restrictions and conditions
that apply to Business Associate under this Agreement.

2.5 Business Associate shall report to Covered Entity any Security
Incident or Breach of which it becomes aware, without unreasonable
delay, and in no event later than thirty (30) calendar days after
discovery.

2.6 Business Associate shall make available to Covered Entity PHI in
a Designated Record Set, as necessary for Covered Entity to fulfill
its obligations under 45 CFR § 164.524 (access) and § 164.526
(amendment).

2.7 Business Associate shall make available to Covered Entity
information required to provide an accounting of disclosures of PHI
in accordance with 45 CFR § 164.528.

3. OBLIGATIONS OF COVERED ENTITY
----------------------------------

3.1 Covered Entity shall notify Business Associate of any limitation
in the notice of privacy practices of Covered Entity, in accordance
with 45 CFR § 164.520, or any changes in such limitation, that may
affect Business Associate's use or disclosure of PHI.

3.2 Covered Entity shall notify Business Associate of any changes in,
or revocation of, permission by an individual to use or disclose PHI,
to the extent that such changes may affect Business Associate's use
or disclosure of PHI.

3.3 Covered Entity shall notify Business Associate of any restriction
on the use or disclosure of PHI to which Covered Entity has agreed
in accordance with 45 CFR § 164.522.

4. PERMITTED USES AND DISCLOSURES
-----------------------------------

4.1 Business Associate may use or disclose PHI as necessary to perform
the services described in the underlying service agreement.

4.2 Business Associate may use PHI for the proper management and
administration of Business Associate or to carry out the legal
responsibilities of Business Associate.

4.3 Business Associate may use or disclose PHI for Data Aggregation
purposes for the lawful purposes of Covered Entity, provided that
such use is consistent with the applicable requirements of HIPAA.

4.4 Business Associate may de-identify PHI in accordance with
45 CFR § 164.514(b) and use or disclose such de-identified information
for any purpose.

5. TERM AND TERMINATION
-------------------------

5.1 This Agreement shall be effective as of the Effective Date and
shall terminate upon the earlier of: (a) the termination of the
underlying service agreement; or (b) mutual written agreement.

5.2 Upon termination of this Agreement, Business Associate shall
return or destroy all PHI received from Covered Entity, or created
or received by Business Associate on behalf of Covered Entity, that
Business Associate still maintains in any form.

5.3 If return or destruction of PHI is not feasible, Business
Associate shall continue to protect such PHI in accordance with the
terms of this Agreement for as long as Business Associate retains
such PHI.

6. ENCRYPTION AND SECURITY STANDARDS
---------------------------------------

6.1 Business Associate shall implement end-to-end encryption for all
PHI transmitted between parties using the Signal Protocol (Double
Ratchet Algorithm) with AES-256-GCM encryption.

6.2 Business Associate shall use WebRTC with SRTP encryption for all
video communications involving PHI, with key verification via Short
Authentication Strings (SAS).

6.3 Business Associate shall maintain audit logging of all access
to PHI, including user identification, timestamp, and action performed.

6.4 Business Associate shall implement data retention policies in
accordance with applicable federal and state requirements, with a
minimum retention period as specified by Covered Entity.

6.5 Business Associate shall conduct regular security risk assessments
and implement remediation measures as required by 45 CFR § 164.308(a)(1).

7. BREACH NOTIFICATION
------------------------

7.1 Business Associate shall notify Covered Entity of any Breach
of unsecured PHI without unreasonable delay, and in no event later
than thirty (30) calendar days after discovery of such Breach.

7.2 Such notification shall include: (a) identification of each
individual whose unsecured PHI has been, or is reasonably believed
to have been, accessed, acquired, used, or disclosed; (b) a brief
description of what happened; (c) a description of the types of
PHI involved; (d) steps individuals should take to protect themselves;
and (e) what Business Associate is doing to investigate and mitigate
harm.

8. INDEMNIFICATION
--------------------

8.1 Business Associate shall indemnify and hold harmless Covered Entity
from and against any and all claims, damages, losses, costs, and
expenses arising out of or relating to Business Associate's breach
of this Agreement or any use or disclosure of PHI by Business
Associate not permitted by this Agreement.

9. MISCELLANEOUS
------------------

9.1 This Agreement shall be governed by and construed in accordance
with the laws of the jurisdiction in which Covered Entity is located.

9.2 Any amendment to this Agreement shall be in writing and signed
by both parties.

9.3 If any provision of this Agreement is held to be invalid or
unenforceable, the remaining provisions shall remain in full force
and effect.

9.4 This Agreement constitutes the entire agreement between the
parties with respect to the subject matter hereof and supersedes
all prior agreements and understandings, whether written or oral.


IN WITNESS WHEREOF, the parties have executed this Agreement as of
the Effective Date.

COVERED ENTITY:

Name:    ${organizationName}
By:      __________________________
Title:   __________________________
Date:    __________________________

BUSINESS ASSOCIATE:

Name:    MedQ Platform
By:      __________________________
Title:   __________________________
Date:    __________________________

---
This BAA template is provided for informational purposes only and does not
constitute legal advice. Both parties should consult with qualified legal
counsel before executing this agreement.
`.trim();
}


/***/ }),

/***/ 226849:
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client/runtime/client");

/***/ }),

/***/ 238818:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __next_app__: () => (/* binding */ __next_app__),
/* harmony export */   handler: () => (/* binding */ handler),
/* harmony export */   routeModule: () => (/* binding */ routeModule)
/* harmony export */ });
/* harmony import */ var next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(121635);
/* harmony import */ var next_dist_build_templates_app_page_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(986315);
/* harmony import */ var next_dist_server_app_render_interop_default__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(301020);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(961287);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__) if(["default","__next_app__","routeModule","handler"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);

const module0 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 376537)));
const module1 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 695127)));
const module2 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 895547, 23)));
const module3 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 308979)));
const module4 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 145270, 23)));
const module5 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 628193, 23)));
const module6 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 929604)));
const module7 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 895547, 23)));
const module8 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 145270, 23)));
const module9 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 628193, 23)));
const module10 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 895547, 23)));
const page11 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 9071)));
const default12 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 297219)));


const tree = {
        children: [
        '',
        {
        children: [
        '(app)',
        {
        children: [
        'admin',
        {
        children: ['__PAGE__', {}, {
          page: [page11, "/workspaces/next/run/src/app/(app)/admin/page.tsx"],
          
        }]
      },
        {
        'global-error': [module10, "next/dist/client/components/builtin/global-error.js"],
        
      },
        []
      ],
modal: [
          '__DEFAULT__',
          {},
          {
            defaultPage: [default12, "/workspaces/next/run/src/app/(app)/@modal/default.tsx"],
          }
        ]
      },
        {
        'layout': [module6, "/workspaces/next/run/src/app/(app)/layout.tsx"],
'global-error': [module7, "next/dist/client/components/builtin/global-error.js"],
'forbidden': [module8, "next/dist/client/components/builtin/forbidden.js"],
'unauthorized': [module9, "next/dist/client/components/builtin/unauthorized.js"],
        metadata: {
    icon: [(async (props) => (await (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 770440)))()).default(props))],
    apple: [],
    openGraph: [(async (props) => (await (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 998558)))()).default(props))],
    twitter: [],
    manifest: undefined
  }
      },
        []
      ]
      },
        {
        'layout': [module0, "/workspaces/next/run/src/app/layout.tsx"],
'loading': [module1, "/workspaces/next/run/src/app/loading.tsx"],
'global-error': [module2, "next/dist/client/components/builtin/global-error.js"],
'not-found': [module3, "/workspaces/next/run/src/app/not-found.tsx"],
'forbidden': [module4, "next/dist/client/components/builtin/forbidden.js"],
'unauthorized': [module5, "next/dist/client/components/builtin/unauthorized.js"],
        metadata: {
    icon: [(async (props) => (await (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 770440)))()).default(props))],
    apple: [],
    openGraph: [(async (props) => (await (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 998558)))()).default(props))],
    twitter: [],
    manifest: undefined
  }
      },
        []
      ]
      }.children;
const __next_app_require__ = __webpack_require__
const __next_app_load_chunk__ = () => Promise.resolve()
const entrypoint = (0,next_dist_build_templates_app_page_runtime__WEBPACK_IMPORTED_MODULE_1__/* .createAppPageEntrypoint */ .H)({
    tree,
    page: "/(app)/admin/page",
    pathname: "/admin",
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__,
    interopDefault: next_dist_server_app_render_interop_default__WEBPACK_IMPORTED_MODULE_2__/* .interopDefault */ .T
});
const __next_app__ = entrypoint.__next_app__;
const routeModule = entrypoint.routeModule;
const handler = entrypoint.handler;


//# sourceMappingURL=app-page.js.map


/***/ }),

/***/ 239041:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Trash)
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
    name: "trash",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M10 11v6",
                key: "nco0om"
            }
        ],
        [
            "path",
            {
                d: "M14 11v6",
                key: "outv1u"
            }
        ],
        [
            "path",
            {
                d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
                key: "miytrc"
            }
        ],
        [
            "path",
            {
                d: "M3 6h18",
                key: "d0wm0j"
            }
        ],
        [
            "path",
            {
                d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
                key: "e791ji"
            }
        ]
    ],
    aliases: [
        "trash-2"
    ]
};
__iconData.node;
const Trash = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=trash.mjs.map


/***/ }),

/***/ 274552:
/***/ ((module) => {

"use strict";
module.exports = require("pino");

/***/ }),

/***/ 275811:
/***/ ((module) => {

"use strict";
module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs");;

/***/ }),

/***/ 292501:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ requireRole)
/* harmony export */ });
/* unused harmony export requireAuth */
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(73299);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_auth__WEBPACK_IMPORTED_MODULE_0__]);
_auth__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// lib/permissions.ts

async function requireAuth() {
    const session = await (0,_auth__WEBPACK_IMPORTED_MODULE_0__/* .auth */ .j2)();
    if (!session?.user) {
        throw new Error("Unauthorized");
    }
    return session;
}
async function requireRole(roles) {
    const session = await requireAuth();
    if (!roles.includes(session.user.role)) {
        throw new Error("Forbidden");
    }
    return session;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 317441:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ AnimatePresence)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var _context_LayoutGroupContext_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(179875);
/* harmony import */ var _utils_use_constant_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(982423);
/* harmony import */ var _utils_use_isomorphic_effect_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(22622);
/* harmony import */ var _PresenceChild_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(201494);
/* harmony import */ var _use_presence_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(577514);
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(820834);
/* __next_internal_client_entry_do_not_use__ AnimatePresence auto */ 







/**
 * `AnimatePresence` enables the animation of components that have been removed from the tree.
 *
 * When adding/removing more than a single child, every child **must** be given a unique `key` prop.
 *
 * Any `motion` components that have an `exit` property defined will animate out when removed from
 * the tree.
 *
 * ```jsx
 * import { motion, AnimatePresence } from 'framer-motion'
 *
 * export const Items = ({ items }) => (
 *   <AnimatePresence>
 *     {items.map(item => (
 *       <motion.div
 *         key={item.id}
 *         initial={{ opacity: 0 }}
 *         animate={{ opacity: 1 }}
 *         exit={{ opacity: 0 }}
 *       />
 *     ))}
 *   </AnimatePresence>
 * )
 * ```
 *
 * You can sequence exit animations throughout a tree using variants.
 *
 * If a child contains multiple `motion` components with `exit` props, it will only unmount the child
 * once all `motion` components have finished animating out. Likewise, any components using
 * `usePresence` all need to call `safeToRemove`.
 *
 * @public
 */ const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root })=>{
    const [isParentPresent, safeToRemove] = (0,_use_presence_mjs__WEBPACK_IMPORTED_MODULE_2__/* .usePresence */ .xQ)(propagate);
    /**
     * Filter any children that aren't ReactElements. We can only track components
     * between renders with a props.key.
     */ const presentChildren = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>(0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__/* .onlyElements */ .i)(children), [
        children
    ]);
    /**
     * Track the keys of the currently rendered children. This is used to
     * determine which children are exiting.
     */ const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(_utils_mjs__WEBPACK_IMPORTED_MODULE_3__/* .getChildKey */ ._);
    /**
     * If `initial={false}` we only want to pass this to components in the first render.
     */ const isInitialRender = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(true);
    /**
     * Track which exiting children have finished animating out.
     */ const exitComplete = (0,_utils_use_constant_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useConstant */ .M)(()=>new Map());
    /**
     * Track which components are currently processing exit to prevent duplicate processing.
     */ const exitingComponents = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(new Set());
    /**
     * Save children to render as React state. To ensure this component is concurrent-safe,
     * we check for exiting children via an effect.
     */ const [diffedChildren, setDiffedChildren] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(presentChildren);
    const [renderedChildren, setRenderedChildren] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(presentChildren);
    (0,_utils_use_isomorphic_effect_mjs__WEBPACK_IMPORTED_MODULE_5__/* .useIsomorphicLayoutEffect */ .E)(()=>{
        if (propagate && !isParentPresent && !renderedChildren.length) {
            safeToRemove?.();
        }
    }, [
        isParentPresent,
        propagate,
        renderedChildren.length,
        safeToRemove
    ]);
    (0,_utils_use_isomorphic_effect_mjs__WEBPACK_IMPORTED_MODULE_5__/* .useIsomorphicLayoutEffect */ .E)(()=>{
        isInitialRender.current = false;
        /**
         * Update complete status of exiting children.
         */ for(let i = 0; i < renderedChildren.length; i++){
            const key = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__/* .getChildKey */ ._)(renderedChildren[i]);
            if (!presentKeys.includes(key)) {
                if (exitComplete.get(key) !== true) {
                    exitComplete.set(key, false);
                }
            } else {
                exitComplete.delete(key);
                exitingComponents.current.delete(key);
            }
        }
    }, [
        renderedChildren,
        presentKeys.length,
        presentKeys.join("-")
    ]);
    const exitingChildren = [];
    if (presentChildren !== diffedChildren) {
        let nextChildren = [
            ...presentChildren
        ];
        /**
         * Loop through all the currently rendered components and decide which
         * are exiting.
         *
         * Exiting children are reinserted directly after the child they
         * previously followed. Splicing at their index within the previously
         * rendered children, as we used to, indexes into the wrong list: it
         * can interleave them with entering children and push present children
         * to new positions, remounting them (#3746).
         */ let insertionIndex = 0;
        for (const child of renderedChildren){
            const presentIndex = presentKeys.indexOf((0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__/* .getChildKey */ ._)(child));
            if (presentIndex === -1) {
                nextChildren.splice(insertionIndex++, 0, child);
                exitingChildren.push(child);
            } else {
                insertionIndex = presentIndex + exitingChildren.length + 1;
            }
        }
        /**
         * Once every exiting child has finished animating out, remove them
         * all at once. Otherwise, if we're in "wait" mode, we want to only
         * render the exiting children until they've all exited.
         */ if (exitingChildren.every((child)=>exitComplete.get((0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__/* .getChildKey */ ._)(child)))) {
            nextChildren = presentChildren;
        } else if (mode === "wait") {
            nextChildren = exitingChildren;
        }
        setRenderedChildren((0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__/* .onlyElements */ .i)(nextChildren));
        setDiffedChildren(presentChildren);
        /**
         * Early return to ensure once we've set state with the latest diffed
         * children, we can immediately re-render.
         */ return null;
    }
    if (false) {}
    /**
     * If we've been provided a forceRender function by the LayoutGroupContext,
     * we can use it to force a re-render amongst all surrounding components once
     * all components have finished animating out.
     */ const { forceRender } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_LayoutGroupContext_mjs__WEBPACK_IMPORTED_MODULE_6__/* .LayoutGroupContext */ .L);
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: renderedChildren.map((child)=>{
            const key = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__/* .getChildKey */ ._)(child);
            const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
            const onExit = ()=>{
                if (exitingComponents.current.has(key)) {
                    return;
                }
                if (exitComplete.has(key)) {
                    exitingComponents.current.add(key);
                    exitComplete.set(key, true);
                } else {
                    return;
                }
                let isEveryExitComplete = true;
                exitComplete.forEach((isExitComplete)=>{
                    if (!isExitComplete) isEveryExitComplete = false;
                });
                if (isEveryExitComplete) {
                    forceRender?.();
                    /**
                     * Re-diff rather than setting the children to render
                     * directly: this update can be applied after a
                     * transition has committed new children, so any
                     * children read now could be stale by then.
                     */ setDiffedChildren([]);
                    propagate && safeToRemove?.();
                    onExitComplete && onExitComplete();
                }
            };
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PresenceChild_mjs__WEBPACK_IMPORTED_MODULE_7__/* .PresenceChild */ .O, {
                isPresent: isPresent,
                initial: !isInitialRender.current || initial ? undefined : false,
                custom: custom,
                presenceAffectsLayout: presenceAffectsLayout,
                mode: mode,
                root: root,
                onExitComplete: isPresent ? undefined : onExit,
                anchorX: anchorX,
                anchorY: anchorY,
                children: child
            }, key);
        })
    });
};
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 321820:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 328354:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 332706:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Save)
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
    name: "save",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
                key: "1c8476"
            }
        ],
        [
            "path",
            {
                d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",
                key: "1ydtos"
            }
        ],
        [
            "path",
            {
                d: "M7 3v4a1 1 0 0 0 1 1h7",
                key: "t51u73"
            }
        ]
    ]
};
__iconData.node;
const Save = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=save.mjs.map


/***/ }),

/***/ 333873:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 356391:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ legacyTheme)
/* harmony export */ });
/**
 * This is the theme as was the default in 2.x and 3.x branches.
 *
 * It's not very consistent, colors are all over the place and overall exists only for backwards compatibility.
 * Prefer to use either {@link lightTheme} or {@link darkTheme} instead.
 *
 * @deprecated
 * @experimental
 */ var legacyTheme = {
    grid: {
        stroke: '#ccc',
        fill: 'none'
    }
};


/***/ }),

/***/ 359923:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ TrendingDown)
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
    name: "trending-down",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M16 17h6v-6",
                key: "t6n2it"
            }
        ],
        [
            "path",
            {
                d: "m22 17-8.5-8.5-5 5L2 7",
                key: "x473p"
            }
        ]
    ]
};
__iconData.node;
const TrendingDown = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=trending-down.mjs.map


/***/ }),

/***/ 364172:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 757338));


/***/ }),

/***/ 379551:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 383519:
/***/ ((module) => {

"use strict";
module.exports = require("postgres-array");

/***/ }),

/***/ 390916:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ LineChart)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _state_optionsSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(353935);
/* harmony import */ var _CartesianChart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(390206);




var allowedTooltipTypes = [
    'axis'
];
/**
 * @consumes ResponsiveContainerContext
 * @provides CartesianViewBoxContext
 * @provides CartesianChartContext
 */ var LineChart = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((props, ref)=>{
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CartesianChart__WEBPACK_IMPORTED_MODULE_1__/* .CartesianChart */ .P, {
        chartName: "LineChart",
        defaultTooltipEventType: "axis",
        validateTooltipEventTypes: allowedTooltipTypes,
        tooltipPayloadSearcher: _state_optionsSlice__WEBPACK_IMPORTED_MODULE_2__/* .arrayTooltipSearcher */ .uN,
        categoricalChartProps: props,
        ref: ref
    });
});


/***/ }),

/***/ 405430:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Upload)
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
    name: "upload",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 3v12",
                key: "1x0j5s"
            }
        ],
        [
            "path",
            {
                d: "m17 8-5-5-5 5",
                key: "7q97r8"
            }
        ],
        [
            "path",
            {
                d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
                key: "ih7n3h"
            }
        ]
    ]
};
__iconData.node;
const Upload = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=upload.mjs.map


/***/ }),

/***/ 408157:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Megaphone)
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
    name: "megaphone",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
                key: "q8bfy3"
            }
        ],
        [
            "path",
            {
                d: "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14",
                key: "1853fq"
            }
        ],
        [
            "path",
            {
                d: "M8 6v8",
                key: "15ugcq"
            }
        ]
    ]
};
__iconData.node;
const Megaphone = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=megaphone.mjs.map


/***/ }),

/***/ 415509:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ToggleLeft)
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
    name: "toggle-left",
    size: 24,
    node: [
        [
            "circle",
            {
                cx: "9",
                cy: "12",
                r: "3",
                key: "u3jwor"
            }
        ],
        [
            "rect",
            {
                width: "20",
                height: "14",
                x: "2",
                y: "5",
                rx: "7",
                key: "g7kal2"
            }
        ]
    ]
};
__iconData.node;
const ToggleLeft = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=toggle-left.mjs.map


/***/ }),

/***/ 419121:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ 455511:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 487005:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Braces)
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
    name: "braces",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1",
                key: "ezmyqa"
            }
        ],
        [
            "path",
            {
                d: "M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",
                key: "e1hn23"
            }
        ]
    ],
    aliases: [
        "curly-braces"
    ]
};
__iconData.node;
const Braces = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=braces.mjs.map


/***/ }),

/***/ 491645:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 494122:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ isBrowser)
/* harmony export */ });
const isBrowser = typeof window !== "undefined";


//# sourceMappingURL=is-browser.mjs.map


/***/ }),

/***/ 504573:
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ 505152:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 508445:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ LockOpen)
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
    name: "lock-open",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "18",
                height: "11",
                x: "3",
                y: "11",
                rx: "2",
                ry: "2",
                key: "1w4ew1"
            }
        ],
        [
            "path",
            {
                d: "M7 11V7a5 5 0 0 1 9.9-1",
                key: "1mm8w8"
            }
        ]
    ],
    aliases: [
        "unlock"
    ]
};
__iconData.node;
const LockOpen = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=lock-open.mjs.map


/***/ }),

/***/ 521621:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ AreaChart)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _state_optionsSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(353935);
/* harmony import */ var _CartesianChart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(390206);




var allowedTooltipTypes = [
    'axis'
];
/**
 * @consumes ResponsiveContainerContext
 * @provides CartesianViewBoxContext
 * @provides CartesianChartContext
 */ var AreaChart = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((props, ref)=>{
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CartesianChart__WEBPACK_IMPORTED_MODULE_1__/* .CartesianChart */ .P, {
        chartName: "AreaChart",
        defaultTooltipEventType: "axis",
        validateTooltipEventTypes: allowedTooltipTypes,
        tooltipPayloadSearcher: _state_optionsSlice__WEBPACK_IMPORTED_MODULE_2__/* .arrayTooltipSearcher */ .uN,
        categoricalChartProps: props,
        ref: ref
    });
});


/***/ }),

/***/ 529294:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ 537663:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Flag)
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
    name: "flag",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",
                key: "1jaruq"
            }
        ]
    ]
};
__iconData.node;
const Flag = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=flag.mjs.map


/***/ }),

/***/ 579646:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 583997:
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ 594735:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 597165:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ModerationTab)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(495210);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(27993);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(199646);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(761022);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(269357);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(537663);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(239041);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(334460);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(77014);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(890707);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(925297);
/* harmony import */ var _components_ui_badge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(902864);
/* harmony import */ var _components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(756642);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(41139);
/* __next_internal_client_entry_do_not_use__ default auto */ 








/* ────────────────────── Component ────────────────────── */ function ModerationTab() {
    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [refreshing, setRefreshing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [statusFilter, setStatusFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('pending');
    const [page, setPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const limit = 10;
    // Action state
    const [busyId, setBusyId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [deleteTarget, setDeleteTarget] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [deleting, setDeleting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const fetchData = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (showRefresh = false)=>{
        if (showRefresh) setRefreshing(true);
        else setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                status: statusFilter
            });
            const res = await fetch(`/api/admin/reports?${params}`);
            if (!res.ok) throw new Error('Failed to fetch reports');
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.error(err);
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to load moderation queue');
        } finally{
            setLoading(false);
            setRefreshing(false);
        }
    }, [
        page,
        statusFilter
    ]);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetchData();
    }, [
        fetchData
    ]);
    const handleStatusUpdate = async (reportId, newStatus)=>{
        setBusyId(reportId);
        try {
            const res = await fetch(`/api/admin/reports/${reportId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: newStatus
                })
            });
            if (!res.ok) {
                const err = await res.json().catch(()=>({}));
                throw new Error(err.error || 'Failed to update report');
            }
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Marked as ${newStatus}`);
            fetchData();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(err.message || 'Failed to update report');
        } finally{
            setBusyId(null);
        }
    };
    const handleDelete = async ()=>{
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            const res = await fetch(`/api/admin/reports/${deleteTarget.id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Failed to delete report');
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success('Report deleted');
            setDeleteTarget(null);
            fetchData();
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Failed to delete report');
        } finally{
            setDeleting(false);
        }
    };
    /* ── Loading state ── */ if (loading && !data) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "space-y-4",
            children: [
                0,
                1,
                2
            ].map((i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "h-32 rounded-2xl animate-pulse",
                    style: {
                        background: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.card,
                        border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.cardBorder}`
                    }
                }, i))
        });
    }
    if (!data) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "text-center py-12",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-xs",
                style: {
                    color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                },
                children: "No moderation data available."
            })
        });
    }
    const reports = data.reports || [];
    const totalPages = data.totalPages || 1;
    const total = data.total || 0;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between flex-wrap gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                className: "text-sm font-bold",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.text
                                },
                                children: "Content Moderation"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-[10px]",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                children: [
                                    "Review reported questions \xb7 ",
                                    total,
                                    " item",
                                    total === 1 ? '' : 's',
                                    " match current filter"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>fetchData(true),
                        disabled: refreshing,
                        className: "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border",
                        style: {
                            background: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.card,
                            borderColor: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.cardBorder,
                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                className: `w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "hidden sm:inline",
                                children: "Refresh"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex items-center gap-2 flex-wrap p-2 rounded-xl",
                style: {
                    background: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.card,
                    border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.cardBorder}`
                },
                children: [
                    {
                        key: 'pending',
                        label: 'Pending'
                    },
                    {
                        key: 'reviewed',
                        label: 'Reviewed'
                    },
                    {
                        key: 'resolved',
                        label: 'Resolved'
                    },
                    {
                        key: 'all',
                        label: 'All'
                    }
                ].map((opt)=>{
                    const isActive = statusFilter === opt.key;
                    const count = opt.key === 'all' ? total : data.statusBreakdown[opt.key] ?? 0;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>{
                            setStatusFilter(opt.key);
                            setPage(1);
                        },
                        className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all",
                        style: {
                            background: isActive ? _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.amber : 'transparent',
                            color: isActive ? '#0c0e14' : _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                        },
                        children: [
                            opt.label,
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "px-1.5 py-0.5 rounded-full text-[9px] font-bold",
                                style: {
                                    background: isActive ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.05)',
                                    color: isActive ? '#0c0e14' : _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                children: count
                            })
                        ]
                    }, opt.key);
                })
            }),
            reports.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "rounded-2xl py-16 text-center",
                style: {
                    background: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.card,
                    border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.cardBorder}`
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                        className: "w-8 h-8 mx-auto mb-2",
                        style: {
                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.green
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-xs font-medium",
                        style: {
                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.text
                        },
                        children: "All clear!"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[10px] mt-1",
                        style: {
                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                        },
                        children: "No reports match this filter."
                    })
                ]
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "space-y-3",
                children: reports.map((report, idx)=>{
                    const reasonColor = _shared__WEBPACK_IMPORTED_MODULE_6__/* .REPORT_REASON_COLORS */ .DL[report.reason] ?? _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted;
                    const statusColor = _shared__WEBPACK_IMPORTED_MODULE_6__/* .REPORT_STATUS_COLORS */ .zC[report.status] ?? _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted;
                    const isBusy = busyId === report.id;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_9__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            y: 12
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.25,
                            delay: idx * 0.03
                        },
                        className: "rounded-2xl border p-4",
                        style: {
                            background: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.card,
                            borderColor: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-start justify-between gap-3 mb-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0",
                                                style: {
                                                    background: `${_shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.blue}20`,
                                                    color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.blue
                                                },
                                                children: (0,_shared__WEBPACK_IMPORTED_MODULE_6__/* .getInitials */ .IM)(report.user.name, report.user.email)
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-xs font-medium",
                                                        style: {
                                                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.text
                                                        },
                                                        children: report.user.name || report.user.email || 'Unknown reporter'
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                        className: "text-[10px]",
                                                        style: {
                                                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                                                        },
                                                        children: [
                                                            (0,_shared__WEBPACK_IMPORTED_MODULE_6__/* .formatRelative */ .om)(report.createdAt),
                                                            " \xb7 ",
                                                            (0,_shared__WEBPACK_IMPORTED_MODULE_6__/* .formatDate */ .Yq)(report.createdAt)
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_4__/* .Badge */ .E, {
                                                variant: "outline",
                                                className: "text-[9px] uppercase tracking-wider font-semibold",
                                                style: {
                                                    background: `${reasonColor}15`,
                                                    color: reasonColor,
                                                    borderColor: `${reasonColor}30`
                                                },
                                                children: report.reason
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_4__/* .Badge */ .E, {
                                                variant: "outline",
                                                className: "text-[9px] uppercase tracking-wider font-semibold",
                                                style: {
                                                    background: `${statusColor}15`,
                                                    color: statusColor,
                                                    borderColor: `${statusColor}30`
                                                },
                                                children: report.status
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "rounded-lg p-3 mb-3",
                                style: {
                                    background: 'rgba(255,255,255,0.02)',
                                    border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.cardBorder}`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2 mb-1.5",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded",
                                                style: {
                                                    background: `${_shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.purple}15`,
                                                    color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.purple
                                                },
                                                children: report.question.type
                                            }),
                                            report.question.system && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "text-[10px]",
                                                style: {
                                                    color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                                                },
                                                children: [
                                                    report.question.system,
                                                    report.question.topic ? ` · ${report.question.topic}` : ''
                                                ]
                                            }),
                                            report.question.isAIGenerated && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded",
                                                style: {
                                                    background: `${_shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.cyan}15`,
                                                    color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.cyan
                                                },
                                                children: "AI"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-xs leading-relaxed",
                                        style: {
                                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.text
                                        },
                                        children: report.question.text || /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("em", {
                                            style: {
                                                color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.dimmed
                                            },
                                            children: "(empty question text)"
                                        })
                                    })
                                ]
                            }),
                            report.comment && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-start gap-2 mb-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5 mt-0.5 flex-shrink-0",
                                        style: {
                                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "text-[11px] italic",
                                        style: {
                                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                                        },
                                        children: [
                                            "“",
                                            report.comment,
                                            "”"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center justify-end gap-2",
                                children: [
                                    report.status !== 'reviewed' && report.status !== 'resolved' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                        size: "sm",
                                        variant: "ghost",
                                        onClick: ()=>handleStatusUpdate(report.id, 'reviewed'),
                                        disabled: isBusy,
                                        className: "h-7 px-2.5 text-[11px]",
                                        style: {
                                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.blue
                                        },
                                        children: [
                                            isBusy ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                className: "w-3 h-3 mr-1 animate-spin"
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                className: "w-3 h-3 mr-1"
                                            }),
                                            "Mark Reviewed"
                                        ]
                                    }),
                                    report.status !== 'resolved' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                        size: "sm",
                                        onClick: ()=>handleStatusUpdate(report.id, 'resolved'),
                                        disabled: isBusy,
                                        className: "h-7 px-2.5 text-[11px]",
                                        style: {
                                            background: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.green,
                                            color: '#0c0e14'
                                        },
                                        children: [
                                            isBusy ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                className: "w-3 h-3 mr-1 animate-spin"
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                className: "w-3 h-3 mr-1"
                                            }),
                                            "Resolve"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                        size: "sm",
                                        variant: "ghost",
                                        onClick: ()=>setDeleteTarget(report),
                                        disabled: isBusy,
                                        className: "h-7 px-2.5 text-[11px]",
                                        style: {
                                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.red
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                                className: "w-3 h-3 mr-1"
                                            }),
                                            "Delete"
                                        ]
                                    })
                                ]
                            })
                        ]
                    }, report.id);
                })
            }),
            totalPages > 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between px-4 py-3 rounded-2xl",
                style: {
                    background: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.card,
                    border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.cardBorder}`
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "text-[10px]",
                        style: {
                            color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                        },
                        children: [
                            "Page ",
                            page,
                            " of ",
                            totalPages
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                variant: "ghost",
                                size: "sm",
                                onClick: ()=>setPage(Math.max(1, page - 1)),
                                disabled: page <= 1,
                                className: "h-8 px-2 text-xs",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                children: "Previous"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                variant: "ghost",
                                size: "sm",
                                onClick: ()=>setPage(Math.min(totalPages, page + 1)),
                                disabled: page >= totalPages,
                                className: "h-8 px-2 text-xs",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                children: "Next"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialog */ .Lt, {
                open: !!deleteTarget,
                onOpenChange: (open)=>{
                    if (!open) setDeleteTarget(null);
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogContent */ .EO, {
                    style: {
                        background: '#1a1e2b',
                        borderColor: 'rgba(255,255,255,0.1)',
                        color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.text
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogHeader */ .wd, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogTitle */ .r7, {
                                    style: {
                                        color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.text
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                                className: "w-5 h-5",
                                                style: {
                                                    color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.red
                                                }
                                            }),
                                            "Delete Report"
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogDescription */ .$v, {
                                    style: {
                                        color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted
                                    },
                                    children: "Permanently delete this report? This removes it from the audit queue but keeps the underlying question intact."
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogFooter */ .ck, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogCancel */ .Zr, {
                                    style: {
                                        color: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.muted,
                                        borderColor: 'rgba(255,255,255,0.1)'
                                    },
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_alert_dialog__WEBPACK_IMPORTED_MODULE_5__/* .AlertDialogAction */ .Rx, {
                                    onClick: handleDelete,
                                    disabled: deleting,
                                    style: {
                                        background: _shared__WEBPACK_IMPORTED_MODULE_6__/* .ADMIN_COLORS */ .Lp.red,
                                        color: '#fff'
                                    },
                                    children: deleting ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5 animate-spin"
                                            }),
                                            "Deleting..."
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Flag_Loader2_MessageSquare_RefreshCw_Trash2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 mr-1.5"
                                            }),
                                            "Delete Report"
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}


/***/ }),

/***/ 601264:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ToggleRight)
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
    name: "toggle-right",
    size: 24,
    node: [
        [
            "circle",
            {
                cx: "15",
                cy: "12",
                r: "3",
                key: "1afu0r"
            }
        ],
        [
            "rect",
            {
                width: "20",
                height: "14",
                x: "2",
                y: "5",
                rx: "7",
                key: "g7kal2"
            }
        ]
    ]
};
__iconData.node;
const ToggleRight = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=toggle-right.mjs.map


/***/ }),

/***/ 612747:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ DollarSign)
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
    name: "dollar-sign",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 3v18",
                key: "108xh3"
            }
        ],
        [
            "path",
            {
                d: "M17 5H9.5a1 1 0 000 7h5a1 1 0 010 7H6",
                key: "pwzcbw"
            }
        ]
    ]
};
__iconData.node;
const DollarSign = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=dollar-sign.mjs.map


/***/ }),

/***/ 628946:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ CartesianGrid)
/* harmony export */ });
/* unused harmony export defaultCartesianGridProps */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_LogUtils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(81095);
/* harmony import */ var _util_DataUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(901791);
/* harmony import */ var _util_ChartUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(830841);
/* harmony import */ var _getTicks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(142296);
/* harmony import */ var _CartesianAxis__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(666011);
/* harmony import */ var _context_chartLayoutContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(655644);
/* harmony import */ var _state_selectors_axisSelectors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(742367);
/* harmony import */ var _state_hooks__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(332671);
/* harmony import */ var _context_PanoramaContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(70383);
/* harmony import */ var _util_resolveDefaultProps__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(169599);
/* harmony import */ var _util_svgPropertiesNoEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(370719);
/* harmony import */ var _util_isWellBehavedNumber__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(9434);
/* harmony import */ var _zIndex_ZIndexLayer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(317947);
/* harmony import */ var _zIndex_DefaultZIndexes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(506859);
/* harmony import */ var _theme_RechartsThemeContext__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(991775);
var _excluded = [
    "x1",
    "y1",
    "x2",
    "y2",
    "key"
], _excluded2 = [
    "offset"
], _excluded3 = [
    "xAxisId",
    "yAxisId"
], _excluded4 = [
    "xAxisId",
    "yAxisId"
];
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function(n) {
        for(var e = 1; e < arguments.length; e++){
            var t = arguments[e];
            for(var r in t)({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
        }
        return n;
    }, _extends.apply(null, arguments);
}
function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o, r, i = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        for(r = 0; r < n.length; r++)o = n[r], -1 === t.indexOf(o) && ({}).propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
}
function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for(var n in r)if (({}).hasOwnProperty.call(r, n)) {
        if (-1 !== e.indexOf(n)) continue;
        t[n] = r[n];
    }
    return t;
}
















/**
 * The <CartesianGrid horizontal
 */ // We exclude strokeDasharray here because Recharts allows array of numbers while DOM does not
var Background = (props)=>{
    var fill = props.fill;
    if (!fill || fill === 'none') {
        return null;
    }
    var fillOpacity = props.fillOpacity, x = props.x, y = props.y, width = props.width, height = props.height, ry = props.ry;
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
        x: x,
        y: y,
        ry: ry,
        width: width,
        height: height,
        stroke: "none",
        fill: fill,
        fillOpacity: fillOpacity,
        className: "recharts-cartesian-grid-bg"
    });
};
function LineItem(_ref) {
    var option = _ref.option, lineItemProps = _ref.lineItemProps;
    var lineItem;
    if (/*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(option)) {
        // @ts-expect-error typescript does not see the props type when cloning an element
        lineItem = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(option, lineItemProps);
    } else if (typeof option === 'function') {
        lineItem = option(lineItemProps);
    } else {
        var _svgPropertiesNoEvent;
        var x1 = lineItemProps.x1, y1 = lineItemProps.y1, x2 = lineItemProps.x2, y2 = lineItemProps.y2, key = lineItemProps.key, others = _objectWithoutProperties(lineItemProps, _excluded);
        var _ref2 = (_svgPropertiesNoEvent = (0,_util_svgPropertiesNoEvents__WEBPACK_IMPORTED_MODULE_1__/* .svgPropertiesNoEvents */ .uZ)(others)) !== null && _svgPropertiesNoEvent !== void 0 ? _svgPropertiesNoEvent : {}, __ = _ref2.offset, restOfFilteredProps = _objectWithoutProperties(_ref2, _excluded2);
        var strokeDasharray = Array.isArray(restOfFilteredProps.strokeDasharray) ? restOfFilteredProps.strokeDasharray.join(',') : restOfFilteredProps.strokeDasharray;
        lineItem = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("line", _extends({}, restOfFilteredProps, {
            strokeDasharray: strokeDasharray,
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            fill: "none",
            key: key
        }));
    }
    return lineItem;
}
function HorizontalGridLines(props) {
    var x = props.x, width = props.width, _props$horizontal = props.horizontal, horizontal = _props$horizontal === void 0 ? true : _props$horizontal, horizontalPoints = props.horizontalPoints;
    if (!horizontal || !horizontalPoints || !horizontalPoints.length) {
        return null;
    }
    var xAxisId = props.xAxisId, yAxisId = props.yAxisId, otherLineItemProps = _objectWithoutProperties(props, _excluded3);
    var items = horizontalPoints.map((entry, i)=>{
        var lineItemProps = _objectSpread(_objectSpread({}, otherLineItemProps), {}, {
            x1: x,
            y1: entry,
            x2: x + width,
            y2: entry,
            key: "line-".concat(i),
            index: i
        });
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(LineItem, {
            key: "line-".concat(i),
            option: horizontal,
            lineItemProps: lineItemProps
        });
    });
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
        className: "recharts-cartesian-grid-horizontal"
    }, items);
}
function VerticalGridLines(props) {
    var y = props.y, height = props.height, _props$vertical = props.vertical, vertical = _props$vertical === void 0 ? true : _props$vertical, verticalPoints = props.verticalPoints;
    if (!vertical || !verticalPoints || !verticalPoints.length) {
        return null;
    }
    var xAxisId = props.xAxisId, yAxisId = props.yAxisId, otherLineItemProps = _objectWithoutProperties(props, _excluded4);
    var items = verticalPoints.map((entry, i)=>{
        var lineItemProps = _objectSpread(_objectSpread({}, otherLineItemProps), {}, {
            x1: entry,
            y1: y,
            x2: entry,
            y2: y + height,
            key: "line-".concat(i),
            index: i
        });
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(LineItem, {
            option: vertical,
            lineItemProps: lineItemProps,
            key: "line-".concat(i)
        });
    });
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
        className: "recharts-cartesian-grid-vertical"
    }, items);
}
function HorizontalStripes(props) {
    var horizontalFill = props.horizontalFill, fillOpacity = props.fillOpacity, x = props.x, y = props.y, width = props.width, height = props.height, horizontalPoints = props.horizontalPoints, _props$horizontal2 = props.horizontal, horizontal = _props$horizontal2 === void 0 ? true : _props$horizontal2;
    if (!horizontal || !horizontalFill || !horizontalFill.length || horizontalPoints == null) {
        return null;
    }
    var roundedSortedHorizontalPoints = horizontalPoints.map((e)=>Math.round(e + y - y)).sort((a, b)=>a - b);
    // Why is this condition `!==` instead of `<=` ?
    if (y !== roundedSortedHorizontalPoints[0]) {
        roundedSortedHorizontalPoints.unshift(0);
    }
    var items = roundedSortedHorizontalPoints.map((entry, i)=>{
        // Why do we strip only the last stripe if it is invisible, and not all invisible stripes?
        var nextPoint = roundedSortedHorizontalPoints[i + 1];
        var lastStripe = nextPoint == null;
        var lineHeight = lastStripe ? y + height - entry : nextPoint - entry;
        if (lineHeight <= 0) {
            return null;
        }
        var colorIndex = i % horizontalFill.length;
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
            key: "react-".concat(i),
            y: entry,
            x: x,
            height: lineHeight,
            width: width,
            stroke: "none",
            fill: horizontalFill[colorIndex],
            fillOpacity: fillOpacity,
            className: "recharts-cartesian-grid-bg"
        });
    });
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
        className: "recharts-cartesian-gridstripes-horizontal"
    }, items);
}
function VerticalStripes(props) {
    var _props$vertical2 = props.vertical, vertical = _props$vertical2 === void 0 ? true : _props$vertical2, verticalFill = props.verticalFill, fillOpacity = props.fillOpacity, x = props.x, y = props.y, width = props.width, height = props.height, verticalPoints = props.verticalPoints;
    if (!vertical || !verticalFill || !verticalFill.length) {
        return null;
    }
    var roundedSortedVerticalPoints = verticalPoints.map((e)=>Math.round(e + x - x)).sort((a, b)=>a - b);
    if (x !== roundedSortedVerticalPoints[0]) {
        roundedSortedVerticalPoints.unshift(0);
    }
    var items = roundedSortedVerticalPoints.map((entry, i)=>{
        var nextPoint = roundedSortedVerticalPoints[i + 1];
        var lastStripe = nextPoint == null;
        var lineWidth = lastStripe ? x + width - entry : nextPoint - entry;
        if (lineWidth <= 0) {
            return null;
        }
        var colorIndex = i % verticalFill.length;
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
            key: "react-".concat(i),
            x: entry,
            y: y,
            width: lineWidth,
            height: height,
            stroke: "none",
            fill: verticalFill[colorIndex],
            fillOpacity: fillOpacity,
            className: "recharts-cartesian-grid-bg"
        });
    });
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
        className: "recharts-cartesian-gridstripes-vertical"
    }, items);
}
var defaultVerticalCoordinatesGenerator = (_ref3, syncWithTicks)=>{
    var xAxis = _ref3.xAxis, width = _ref3.width, height = _ref3.height, offset = _ref3.offset;
    return (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_2__/* .getCoordinatesOfGrid */ .PW)((0,_getTicks__WEBPACK_IMPORTED_MODULE_3__/* .getTicks */ .f)(_objectSpread(_objectSpread(_objectSpread({}, _CartesianAxis__WEBPACK_IMPORTED_MODULE_4__/* .defaultCartesianAxisProps */ .F), xAxis), {}, {
        ticks: (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_2__/* .getTicksOfAxis */ .Rh)(xAxis, true),
        viewBox: {
            x: 0,
            y: 0,
            width,
            height
        }
    })), offset.left, offset.left + offset.width, syncWithTicks);
};
var defaultHorizontalCoordinatesGenerator = (_ref4, syncWithTicks)=>{
    var yAxis = _ref4.yAxis, width = _ref4.width, height = _ref4.height, offset = _ref4.offset;
    return (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_2__/* .getCoordinatesOfGrid */ .PW)((0,_getTicks__WEBPACK_IMPORTED_MODULE_3__/* .getTicks */ .f)(_objectSpread(_objectSpread(_objectSpread({}, _CartesianAxis__WEBPACK_IMPORTED_MODULE_4__/* .defaultCartesianAxisProps */ .F), yAxis), {}, {
        ticks: (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_2__/* .getTicksOfAxis */ .Rh)(yAxis, true),
        viewBox: {
            x: 0,
            y: 0,
            width,
            height
        }
    })), offset.top, offset.top + offset.height, syncWithTicks);
};
var defaultCartesianGridProps = {
    horizontal: true,
    vertical: true,
    // The ordinates of horizontal grid lines
    horizontalPoints: [],
    // The abscissas of vertical grid lines
    verticalPoints: [],
    // The fill of colors of grid lines
    verticalFill: [],
    horizontalFill: [],
    xAxisId: 0,
    yAxisId: 0,
    syncWithTicks: false,
    zIndex: _zIndex_DefaultZIndexes__WEBPACK_IMPORTED_MODULE_5__/* .DefaultZIndexes */ .I.grid
};
/**
 * Renders background grid with lines and fill colors in a Cartesian chart.
 *
 * @consumes CartesianChartContext
 */ function CartesianGrid(props) {
    var _propsIncludingDefaul, _propsIncludingDefaul2, _propsIncludingDefaul3, _propsIncludingDefaul4, _propsIncludingDefaul5, _propsIncludingDefaul6;
    var chartWidth = (0,_context_chartLayoutContext__WEBPACK_IMPORTED_MODULE_6__/* .useChartWidth */ .yi)();
    var chartHeight = (0,_context_chartLayoutContext__WEBPACK_IMPORTED_MODULE_6__/* .useChartHeight */ .rY)();
    var offset = (0,_context_chartLayoutContext__WEBPACK_IMPORTED_MODULE_6__/* .useOffsetInternal */ .W7)();
    var propsIncludingDefaults = _objectSpread(_objectSpread({}, (0,_util_resolveDefaultProps__WEBPACK_IMPORTED_MODULE_7__/* .resolveDefaultProps */ .e)(props, defaultCartesianGridProps)), {}, {
        x: (0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_8__/* .isNumber */ .Et)(props.x) ? props.x : offset.left,
        y: (0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_8__/* .isNumber */ .Et)(props.y) ? props.y : offset.top,
        width: (0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_8__/* .isNumber */ .Et)(props.width) ? props.width : offset.width,
        height: (0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_8__/* .isNumber */ .Et)(props.height) ? props.height : offset.height
    });
    var xAxisId = propsIncludingDefaults.xAxisId, yAxisId = propsIncludingDefaults.yAxisId, x = propsIncludingDefaults.x, y = propsIncludingDefaults.y, width = propsIncludingDefaults.width, height = propsIncludingDefaults.height, syncWithTicks = propsIncludingDefaults.syncWithTicks, horizontalValues = propsIncludingDefaults.horizontalValues, verticalValues = propsIncludingDefaults.verticalValues;
    var isPanorama = (0,_context_PanoramaContext__WEBPACK_IMPORTED_MODULE_9__/* .useIsPanorama */ .r)();
    var xAxis = (0,_state_hooks__WEBPACK_IMPORTED_MODULE_10__/* .useAppSelector */ .G)((state)=>(0,_state_selectors_axisSelectors__WEBPACK_IMPORTED_MODULE_11__/* .selectAxisPropsNeededForCartesianGridTicksGenerator */ .ZB)(state, 'xAxis', xAxisId, isPanorama));
    var yAxis = (0,_state_hooks__WEBPACK_IMPORTED_MODULE_10__/* .useAppSelector */ .G)((state)=>(0,_state_selectors_axisSelectors__WEBPACK_IMPORTED_MODULE_11__/* .selectAxisPropsNeededForCartesianGridTicksGenerator */ .ZB)(state, 'yAxis', yAxisId, isPanorama));
    var theme = (0,_theme_RechartsThemeContext__WEBPACK_IMPORTED_MODULE_12__/* .useRechartsTheme */ .f)();
    var themeProps = {
        stroke: (_propsIncludingDefaul = propsIncludingDefaults.stroke) !== null && _propsIncludingDefaul !== void 0 ? _propsIncludingDefaul : theme.grid.stroke,
        strokeWidth: (_propsIncludingDefaul2 = propsIncludingDefaults.strokeWidth) !== null && _propsIncludingDefaul2 !== void 0 ? _propsIncludingDefaul2 : theme.grid.strokeWidth,
        strokeOpacity: (_propsIncludingDefaul3 = propsIncludingDefaults.strokeOpacity) !== null && _propsIncludingDefaul3 !== void 0 ? _propsIncludingDefaul3 : theme.grid.strokeOpacity,
        strokeDasharray: (_propsIncludingDefaul4 = propsIncludingDefaults.strokeDasharray) !== null && _propsIncludingDefaul4 !== void 0 ? _propsIncludingDefaul4 : theme.grid.strokeDasharray
    };
    if (!(0,_util_isWellBehavedNumber__WEBPACK_IMPORTED_MODULE_13__/* .isPositiveNumber */ .F)(width) || !(0,_util_isWellBehavedNumber__WEBPACK_IMPORTED_MODULE_13__/* .isPositiveNumber */ .F)(height) || !(0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_8__/* .isNumber */ .Et)(x) || !(0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_8__/* .isNumber */ .Et)(y)) {
        return null;
    }
    /*
   * verticalCoordinatesGenerator and horizontalCoordinatesGenerator are defined
   * outside the propsIncludingDefaults because they were never part of the original props
   * and they were never passed as a prop down to horizontal/vertical custom elements.
   * If we add these two to propsIncludingDefaults then we are changing public API.
   * Not a bad thing per se but also not necessary.
   */ var verticalCoordinatesGenerator = propsIncludingDefaults.verticalCoordinatesGenerator || defaultVerticalCoordinatesGenerator;
    var horizontalCoordinatesGenerator = propsIncludingDefaults.horizontalCoordinatesGenerator || defaultHorizontalCoordinatesGenerator;
    var horizontalPoints = propsIncludingDefaults.horizontalPoints, verticalPoints = propsIncludingDefaults.verticalPoints;
    // No horizontal points are specified
    if ((!horizontalPoints || !horizontalPoints.length) && typeof horizontalCoordinatesGenerator === 'function') {
        var isHorizontalValues = horizontalValues && horizontalValues.length;
        var generatorResult = horizontalCoordinatesGenerator({
            yAxis: yAxis ? _objectSpread(_objectSpread({}, yAxis), {}, {
                ticks: isHorizontalValues ? horizontalValues : yAxis.ticks
            }) : undefined,
            width: chartWidth !== null && chartWidth !== void 0 ? chartWidth : width,
            height: chartHeight !== null && chartHeight !== void 0 ? chartHeight : height,
            offset
        }, isHorizontalValues ? true : syncWithTicks);
        (0,_util_LogUtils__WEBPACK_IMPORTED_MODULE_14__/* .warn */ .R)(Array.isArray(generatorResult), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(typeof generatorResult, "]"));
        if (Array.isArray(generatorResult)) {
            horizontalPoints = generatorResult;
        }
    }
    // No vertical points are specified
    if ((!verticalPoints || !verticalPoints.length) && typeof verticalCoordinatesGenerator === 'function') {
        var isVerticalValues = verticalValues && verticalValues.length;
        var _generatorResult = verticalCoordinatesGenerator({
            xAxis: xAxis ? _objectSpread(_objectSpread({}, xAxis), {}, {
                ticks: isVerticalValues ? verticalValues : xAxis.ticks
            }) : undefined,
            width: chartWidth !== null && chartWidth !== void 0 ? chartWidth : width,
            height: chartHeight !== null && chartHeight !== void 0 ? chartHeight : height,
            offset
        }, isVerticalValues ? true : syncWithTicks);
        (0,_util_LogUtils__WEBPACK_IMPORTED_MODULE_14__/* .warn */ .R)(Array.isArray(_generatorResult), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(typeof _generatorResult, "]"));
        if (Array.isArray(_generatorResult)) {
            verticalPoints = _generatorResult;
        }
    }
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_zIndex_ZIndexLayer__WEBPACK_IMPORTED_MODULE_15__/* .ZIndexLayer */ .g, {
        zIndex: propsIncludingDefaults.zIndex
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
        className: "recharts-cartesian-grid"
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Background, {
        fill: (_propsIncludingDefaul5 = propsIncludingDefaults.fill) !== null && _propsIncludingDefaul5 !== void 0 ? _propsIncludingDefaul5 : theme.grid.fill,
        fillOpacity: (_propsIncludingDefaul6 = propsIncludingDefaults.fillOpacity) !== null && _propsIncludingDefaul6 !== void 0 ? _propsIncludingDefaul6 : theme.grid.fillOpacity,
        x: propsIncludingDefaults.x,
        y: propsIncludingDefaults.y,
        width: propsIncludingDefaults.width,
        height: propsIncludingDefaults.height,
        ry: propsIncludingDefaults.ry
    }), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(HorizontalStripes, _extends({}, propsIncludingDefaults, {
        horizontalPoints: horizontalPoints
    })), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(VerticalStripes, _extends({}, propsIncludingDefaults, {
        verticalPoints: verticalPoints
    })), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(HorizontalGridLines, _extends({}, propsIncludingDefaults, themeProps, {
        offset: offset,
        horizontalPoints: horizontalPoints,
        xAxis: xAxis,
        yAxis: yAxis
    })), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(VerticalGridLines, _extends({}, propsIncludingDefaults, themeProps, {
        offset: offset,
        verticalPoints: verticalPoints,
        xAxis: xAxis,
        yAxis: yAxis
    }))));
}
CartesianGrid.displayName = 'CartesianGrid';


/***/ }),

/***/ 629021:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 638522:
/***/ ((module) => {

"use strict";
module.exports = require("node:zlib");

/***/ }),

/***/ 646060:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/no-fallback-error.external.js");

/***/ }),

/***/ 659970:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ UserCog)
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
    name: "user-cog",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M10 15H6a4 4 0 0 0-4 4v2",
                key: "1nfge6"
            }
        ],
        [
            "path",
            {
                d: "m14.305 16.53.923-.382",
                key: "1itpsq"
            }
        ],
        [
            "path",
            {
                d: "m15.228 13.852-.923-.383",
                key: "eplpkm"
            }
        ],
        [
            "path",
            {
                d: "m16.852 12.228-.383-.923",
                key: "13v3q0"
            }
        ],
        [
            "path",
            {
                d: "m16.852 17.772-.383.924",
                key: "1i8mnm"
            }
        ],
        [
            "path",
            {
                d: "m19.148 12.228.383-.923",
                key: "1q8j1v"
            }
        ],
        [
            "path",
            {
                d: "m19.53 18.696-.382-.924",
                key: "vk1qj3"
            }
        ],
        [
            "path",
            {
                d: "m20.772 13.852.924-.383",
                key: "n880s0"
            }
        ],
        [
            "path",
            {
                d: "m20.772 16.148.924.383",
                key: "1g6xey"
            }
        ],
        [
            "circle",
            {
                cx: "18",
                cy: "15",
                r: "3",
                key: "gjjjvw"
            }
        ],
        [
            "circle",
            {
                cx: "9",
                cy: "7",
                r: "4",
                key: "nufk8"
            }
        ]
    ]
};
__iconData.node;
const UserCog = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=user-cog.mjs.map


/***/ }),

/***/ 663033:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ 673097:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Pause)
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
    name: "pause",
    size: 24,
    node: [
        [
            "rect",
            {
                x: "14",
                y: "3",
                width: "5",
                height: "18",
                rx: "1",
                key: "kaeet6"
            }
        ],
        [
            "rect",
            {
                x: "5",
                y: "3",
                width: "5",
                height: "18",
                rx: "1",
                key: "1wsw3u"
            }
        ]
    ]
};
__iconData.node;
const Pause = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=pause.mjs.map


/***/ }),

/***/ 685461:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ MousePointerClick)
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
    name: "mouse-pointer-click",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M14 4.1 12 6",
                key: "ita8i4"
            }
        ],
        [
            "path",
            {
                d: "m5.1 8-2.9-.8",
                key: "1go3kf"
            }
        ],
        [
            "path",
            {
                d: "m6 12-1.9 2",
                key: "mnht97"
            }
        ],
        [
            "path",
            {
                d: "M7.2 2.2 8 5.1",
                key: "1cfko1"
            }
        ],
        [
            "path",
            {
                d: "M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z",
                key: "s0h3yz"
            }
        ]
    ]
};
__iconData.node;
const MousePointerClick = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=mouse-pointer-click.mjs.map


/***/ }),

/***/ 686056:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Box)
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
    name: "box",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
                key: "hh9hay"
            }
        ],
        [
            "path",
            {
                d: "m3.3 7 8.7 5 8.7-5",
                key: "g66t2b"
            }
        ],
        [
            "path",
            {
                d: "M12 22V12",
                key: "d0xqtd"
            }
        ]
    ]
};
__iconData.node;
const Box = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=box.mjs.map


/***/ }),

/***/ 710846:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");

/***/ }),

/***/ 733503:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ BarChart)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _state_optionsSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(353935);
/* harmony import */ var _CartesianChart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(390206);




var allowedTooltipTypes = [
    'axis',
    'item'
];
/**
 * @consumes ResponsiveContainerContext
 * @provides CartesianViewBoxContext
 * @provides CartesianChartContext
 */ var BarChart = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((props, ref)=>{
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CartesianChart__WEBPACK_IMPORTED_MODULE_1__/* .CartesianChart */ .P, {
        chartName: "BarChart",
        defaultTooltipEventType: "axis",
        validateTooltipEventTypes: allowedTooltipTypes,
        tooltipPayloadSearcher: _state_optionsSlice__WEBPACK_IMPORTED_MODULE_2__/* .arrayTooltipSearcher */ .uN,
        categoricalChartProps: props,
        ref: ref
    });
});


/***/ }),

/***/ 741025:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/dynamic-access-async-storage.external.js");

/***/ }),

/***/ 746411:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ useComplianceStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(469517);

const defaultSettings = {
    encryptionLevel: 'transport',
    retentionDays: 365,
    auditLogging: true,
    baaSigned: false
};
const defaultRetentionStats = {
    totalMessages: 0,
    messagesToDelete: 0,
    oldestMessage: null,
    lastRetentionRun: null,
    nextScheduledRun: null
};
const useComplianceStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__/* .create */ .v)((set)=>({
        settings: defaultSettings,
        auditLogs: [],
        retentionStats: defaultRetentionStats,
        loading: false,
        error: null,
        setSettings: (settings)=>set({
                settings
            }),
        updateSetting: (key, value)=>set((s)=>({
                    settings: {
                        ...s.settings,
                        [key]: value
                    }
                })),
        setAuditLogs: (logs)=>set({
                auditLogs: logs
            }),
        addAuditLog: (entry)=>set((s)=>({
                    auditLogs: [
                        entry,
                        ...s.auditLogs
                    ].slice(0, 500)
                })),
        setRetentionStats: (stats)=>set({
                retentionStats: stats
            }),
        setLoading: (loading)=>set({
                loading
            }),
        setError: (error)=>set({
                error
            }),
        reset: ()=>set({
                settings: defaultSettings,
                auditLogs: [],
                retentionStats: defaultRetentionStats,
                loading: false,
                error: null
            })
    }));


/***/ }),

/***/ 757078:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ prisma)
/* harmony export */ });
/* harmony import */ var _generated_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(732152);
/* harmony import */ var _prisma_adapter_pg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(249750);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(380127);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_1__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_prisma_adapter_pg__WEBPACK_IMPORTED_MODULE_2__]);
_prisma_adapter_pg__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// lib/prisma.ts — project-root Prisma client singleton.
//
// auth.ts imports `prisma` from "../lib/prisma" — relative to src/auth.ts,
// that resolves to /tmp/my-project/lib/prisma.ts (THIS file), NOT
// /tmp/my-project/src/lib/prisma.ts. Both files coexist for historical
// reasons; this one is the one actually used by the auth flow.
//
// The resolver matches src/lib/db.ts: prefer a postgres:// URL from either
// the shell env or .env.local, falling back to .env, and never trusting a
// stale SQLite file: URL injected by the platform boot script.



// Load .env first, then .env.local (overrides). The platform boot script
// rewrites .env with a stale SQLite DATABASE_URL on every recycle, so
// .env.local is the persistent source of truth.
(0,dotenv__WEBPACK_IMPORTED_MODULE_1__.config)({
    override: true
});
const { parsed } = (0,dotenv__WEBPACK_IMPORTED_MODULE_1__.config)({
    path: ".env.local",
    override: true
});
const envUrl = process.env.DATABASE_URL;
const fileUrl = parsed?.DATABASE_URL;
const resolvedUrl = envUrl && envUrl.startsWith("postgres") ? envUrl : fileUrl && fileUrl.startsWith("postgres") ? fileUrl : envUrl ?? fileUrl;
if (!resolvedUrl) {
    throw new Error("DATABASE_URL is not defined");
}
const globalForPrisma = globalThis;
const adapter = new _prisma_adapter_pg__WEBPACK_IMPORTED_MODULE_2__/* .PrismaPg */ .M({
    connectionString: resolvedUrl
});
// Reuse the existing global prisma instance if present (same pattern as
// src/lib/db.ts) — this avoids spawning a second PrismaClient + connection
// pool when both this module and db.ts are imported in the same process.
const prisma = globalForPrisma.prisma ?? new _generated_client__WEBPACK_IMPORTED_MODULE_0__/* .PrismaClient */ .m3({
    adapter,
    log: [
        "error",
        "warn"
    ]
});
if (false) {}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 757338:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(777943);
/* harmony import */ var react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__);
// This file is generated by the Webpack next-flight-loader.

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__.registerClientReference)(
function() { throw new Error("Attempted to call the default export of \"/workspaces/next/run/src/components/medq/admin/AdminTab.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."); },
"/workspaces/next/run/src/components/medq/admin/AdminTab.tsx",
"default",
));


/***/ }),

/***/ 770252:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 58004));


/***/ }),

/***/ 781630:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 820834:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ getChildKey),
/* harmony export */   i: () => (/* binding */ onlyElements)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);


const getChildKey = (child) => child.key || "";
function onlyElements(children) {
    const filtered = [];
    // We use forEach here instead of map as map mutates the component key by prepending `.$`
    react__WEBPACK_IMPORTED_MODULE_0__.Children.forEach(children, (child) => {
        if ((0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child))
            filtered.push(child);
    });
    return filtered;
}


//# sourceMappingURL=utils.mjs.map


/***/ }),

/***/ 847539:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ RevenueTab)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(495210);
/* harmony import */ var _barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(612747);
/* harmony import */ var _barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(811897);
/* harmony import */ var _barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(167494);
/* harmony import */ var _barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(539737);
/* harmony import */ var _barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(27993);
/* harmony import */ var _barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(289824);
/* harmony import */ var _barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(135195);
/* harmony import */ var _barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(505152);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(521621);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(628946);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(122393);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(854206);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(877942);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(975843);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(685606);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(443576);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(93237);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(733503);
/* harmony import */ var _barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(316625);
/* harmony import */ var _TabResponsiveContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10246);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(890707);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(41139);
/* __next_internal_client_entry_do_not_use__ default auto */ 







/* ────────────────────── Component ────────────────────── */ function RevenueTab() {
    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [refreshing, setRefreshing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [windowDays, setWindowDays] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(30);
    const fetchData = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (showRefresh = false)=>{
        if (showRefresh) setRefreshing(true);
        else setLoading(true);
        try {
            const res = await fetch(`/api/admin/revenue?days=${windowDays}`);
            if (!res.ok) throw new Error('Failed to fetch revenue');
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.error(err);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Failed to load revenue data');
        } finally{
            setLoading(false);
            setRefreshing(false);
        }
    }, [
        windowDays
    ]);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetchData();
    }, [
        fetchData
    ]);
    if (loading && !data) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                    children: [
                        0,
                        1,
                        2,
                        3
                    ].map((i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "h-28 rounded-2xl animate-pulse",
                            style: {
                                background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
                                border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`
                            }
                        }, i))
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "h-72 rounded-2xl animate-pulse",
                    style: {
                        background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
                        border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`
                    }
                })
            ]
        });
    }
    if (!data) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "text-center py-12",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-xs",
                style: {
                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                },
                children: "No revenue data available."
            })
        });
    }
    const summaryCards = [
        {
            label: 'Total Revenue (USD)',
            value: (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatUsd */ .UK)(data.summary.totalUsd),
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green,
            sub: `${data.summary.paidOrders} paid order${data.summary.paidOrders === 1 ? '' : 's'}`
        },
        {
            label: 'Credits Earned (Ad Pool)',
            value: (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatNumber */ .ZV)(data.summary.totalCreditsEarned),
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber,
            sub: 'GroupAdRevenueShare'
        },
        {
            label: 'Credits in Wallets',
            value: (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatNumber */ .ZV)(data.summary.totalCreditsInWallets),
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cyan,
            sub: `${data.summary.walletCount} wallet${data.summary.walletCount === 1 ? '' : 's'}`
        },
        {
            label: 'Pending Orders',
            value: (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatNumber */ .ZV)(data.summary.pendingOrders),
            icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                className: "w-5 h-5"
            }),
            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.purple,
            sub: `${data.summary.refundedOrders} refunded`
        }
    ];
    const fmtDay = (s)=>{
        const d = new Date(s);
        return isNaN(d.getTime()) ? s : `${d.getMonth() + 1}/${d.getDate()}`;
    };
    // Pie data for payment breakdown
    const paymentPie = [
        {
            name: 'Subscription',
            value: data.paymentBreakdown.subscription.usd,
            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.purple
        },
        {
            name: 'Credits',
            value: data.paymentBreakdown.credits.usd,
            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber
        }
    ].filter((d)=>d.value > 0);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between flex-wrap gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                className: "text-sm font-bold",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                },
                                children: "Revenue Tracking"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-[10px]",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                children: [
                                    "Generated ",
                                    (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatDate */ .Yq)(data.generatedAt),
                                    " \xb7 Window: ",
                                    data.windowDays,
                                    "d"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex items-center gap-1 p-1 rounded-lg border",
                                style: {
                                    background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
                                    borderColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder
                                },
                                children: [
                                    7,
                                    30,
                                    90
                                ].map((d)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setWindowDays(d),
                                        disabled: refreshing,
                                        className: "px-2.5 py-1 rounded-md text-[10px] font-medium transition-all",
                                        style: {
                                            background: windowDays === d ? _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green : 'transparent',
                                            color: windowDays === d ? '#0c0e14' : _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                        },
                                        children: [
                                            d,
                                            "d"
                                        ]
                                    }, d))
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: ()=>fetchData(true),
                                disabled: refreshing,
                                className: "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border",
                                style: {
                                    background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
                                    borderColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder,
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                        className: `w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "hidden sm:inline",
                                        children: "Refresh"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                children: summaryCards.map((card, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_10__/* .motion */ .P.div, {
                        initial: {
                            opacity: 0,
                            y: 16
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.35,
                            delay: i * 0.06
                        },
                        className: "rounded-2xl p-4 border",
                        style: {
                            background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
                            borderColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex items-center justify-between mb-2",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-9 h-9 rounded-lg flex items-center justify-center",
                                    style: {
                                        background: `${card.color}15`
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        style: {
                                            color: card.color
                                        },
                                        children: card.icon
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-2xl font-bold",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                },
                                children: card.value
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px] mt-0.5",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                children: card.label
                            }),
                            card.sub && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[9px] mt-1",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.dimmed
                                },
                                children: card.sub
                            })
                        ]
                    }, card.label))
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ChartCard, {
                title: "Revenue (USD)",
                subtitle: `Daily revenue over the last ${data.windowDays} days`,
                icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                    className: "w-4 h-4",
                    style: {
                        color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green
                    }
                }),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TabResponsiveContainer__WEBPACK_IMPORTED_MODULE_2__/* .TabResponsiveContainer */ .L, {
                    width: "100%",
                    height: 260,
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_12__/* .AreaChart */ .Q, {
                        data: data.dailySeries,
                        margin: {
                            top: 10,
                            right: 10,
                            left: -10,
                            bottom: 0
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("defs", {
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("linearGradient", {
                                    id: "usdGradient",
                                    x1: "0",
                                    y1: "0",
                                    x2: "0",
                                    y2: "1",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
                                            offset: "0%",
                                            stopColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green,
                                            stopOpacity: 0.4
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
                                            offset: "100%",
                                            stopColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green,
                                            stopOpacity: 0
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_13__/* .CartesianGrid */ .d, {
                                strokeDasharray: "3 3",
                                stroke: "rgba(255,255,255,0.04)"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_14__/* .XAxis */ .W, {
                                dataKey: "date",
                                tickFormatter: fmtDay,
                                tick: {
                                    fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                    fontSize: 10
                                },
                                stroke: "rgba(255,255,255,0.06)"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_15__/* .YAxis */ .h, {
                                tick: {
                                    fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                    fontSize: 10
                                },
                                stroke: "rgba(255,255,255,0.06)",
                                tickFormatter: (v)=>`$${v}`
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_16__/* .Tooltip */ .m, {
                                contentStyle: {
                                    background: '#1a1e2b',
                                    border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`,
                                    borderRadius: 8,
                                    fontSize: 11,
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                },
                                labelStyle: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                labelFormatter: (l)=>`Date: ${(0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatDate */ .Yq)(l)}`,
                                formatter: (v)=>[
                                        `$${Number(v).toFixed(2)}`,
                                        'Revenue'
                                    ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_17__/* .Area */ .Gk, {
                                type: "monotone",
                                dataKey: "usd",
                                stroke: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green,
                                strokeWidth: 2,
                                fill: "url(#usdGradient)",
                                name: "Revenue (USD)"
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ChartCard, {
                        title: "Payment Breakdown",
                        subtitle: "Subscription vs credit-pack purchases",
                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                            className: "w-4 h-4",
                            style: {
                                color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.purple
                            }
                        }),
                        children: [
                            paymentPie.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(EmptyChart, {
                                label: "No paid orders in this window."
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TabResponsiveContainer__WEBPACK_IMPORTED_MODULE_2__/* .TabResponsiveContainer */ .L, {
                                width: "100%",
                                height: 240,
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_18__/* .PieChart */ .r, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_19__/* .Pie */ .Fq, {
                                            data: paymentPie,
                                            dataKey: "value",
                                            nameKey: "name",
                                            cx: "50%",
                                            cy: "50%",
                                            innerRadius: 50,
                                            outerRadius: 90,
                                            paddingAngle: 3,
                                            children: paymentPie.map((entry, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_20__/* .Cell */ .f, {
                                                    fill: entry.color
                                                }, idx))
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_16__/* .Tooltip */ .m, {
                                            contentStyle: {
                                                background: '#1a1e2b',
                                                border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`,
                                                borderRadius: 8,
                                                fontSize: 11,
                                                color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                            },
                                            formatter: (v, n)=>[
                                                    `$${Number(v).toFixed(2)}`,
                                                    n
                                                ]
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "mt-3 space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PaymentRow, {
                                        label: "Subscription",
                                        color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.purple,
                                        count: data.paymentBreakdown.subscription.count,
                                        usd: data.paymentBreakdown.subscription.usd
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PaymentRow, {
                                        label: "Credit Packs",
                                        color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber,
                                        count: data.paymentBreakdown.credits.count,
                                        usd: data.paymentBreakdown.credits.usd
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ChartCard, {
                        title: "Top Ad-Pool Earners",
                        subtitle: "Top 10 users by GroupAdRevenueShare credits earned",
                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                            className: "w-4 h-4",
                            style: {
                                color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber
                            }
                        }),
                        children: data.topPayouts.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(EmptyChart, {
                            label: "No ad-pool payouts in this window."
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "space-y-2 max-h-72 overflow-y-auto pr-1",
                            children: data.topPayouts.map((p, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center justify-between gap-3 p-2 rounded-lg",
                                    style: {
                                        background: 'rgba(255,255,255,0.02)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-2 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[10px] font-bold w-5 text-center flex-shrink-0",
                                                    style: {
                                                        color: idx < 3 ? _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber : _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.dimmed
                                                    },
                                                    children: idx + 1
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0",
                                                    style: {
                                                        background: `${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.blue}20`,
                                                        color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.blue
                                                    },
                                                    children: (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .getInitials */ .IM)(p.name, p.email)
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-xs font-medium truncate",
                                                            style: {
                                                                color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                                            },
                                                            children: p.name || 'Unnamed'
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-[10px] truncate",
                                                            style: {
                                                                color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                                            },
                                                            children: p.email || '—'
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-xs font-bold flex-shrink-0",
                                            style: {
                                                color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber
                                            },
                                            children: [
                                                (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatNumber */ .ZV)(p.credits),
                                                " cr"
                                            ]
                                        })
                                    ]
                                }, p.userId))
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ChartCard, {
                        title: "Credits Earned",
                        subtitle: "By category over the window",
                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                            className: "w-4 h-4",
                            style: {
                                color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green
                            }
                        }),
                        children: data.creditFlow.earnedByCategory.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(EmptyChart, {
                            label: "No credit earnings recorded."
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TabResponsiveContainer__WEBPACK_IMPORTED_MODULE_2__/* .TabResponsiveContainer */ .L, {
                            width: "100%",
                            height: Math.max(220, data.creditFlow.earnedByCategory.length * 36),
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_22__/* .BarChart */ .E, {
                                data: data.creditFlow.earnedByCategory,
                                layout: "vertical",
                                margin: {
                                    top: 10,
                                    right: 20,
                                    left: 30,
                                    bottom: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_13__/* .CartesianGrid */ .d, {
                                        strokeDasharray: "3 3",
                                        stroke: "rgba(255,255,255,0.04)"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_14__/* .XAxis */ .W, {
                                        type: "number",
                                        tick: {
                                            fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                            fontSize: 10
                                        },
                                        stroke: "rgba(255,255,255,0.06)",
                                        allowDecimals: false
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_15__/* .YAxis */ .h, {
                                        type: "category",
                                        dataKey: "category",
                                        tick: {
                                            fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                            fontSize: 10
                                        },
                                        stroke: "rgba(255,255,255,0.06)",
                                        width: 130
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_16__/* .Tooltip */ .m, {
                                        contentStyle: {
                                            background: '#1a1e2b',
                                            border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`,
                                            borderRadius: 8,
                                            fontSize: 11,
                                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                        },
                                        labelStyle: {
                                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_23__/* .Bar */ .yP, {
                                        dataKey: "amount",
                                        name: "Credits Earned",
                                        fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.green,
                                        radius: [
                                            0,
                                            4,
                                            4,
                                            0
                                        ]
                                    })
                                ]
                            })
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ChartCard, {
                        title: "Credits Spent",
                        subtitle: "By category over the window",
                        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                            className: "w-4 h-4",
                            style: {
                                color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.red
                            }
                        }),
                        children: data.creditFlow.spentByCategory.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(EmptyChart, {
                            label: "No credit spending recorded."
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TabResponsiveContainer__WEBPACK_IMPORTED_MODULE_2__/* .TabResponsiveContainer */ .L, {
                            width: "100%",
                            height: Math.max(220, data.creditFlow.spentByCategory.length * 36),
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_22__/* .BarChart */ .E, {
                                data: data.creditFlow.spentByCategory,
                                layout: "vertical",
                                margin: {
                                    top: 10,
                                    right: 20,
                                    left: 30,
                                    bottom: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_13__/* .CartesianGrid */ .d, {
                                        strokeDasharray: "3 3",
                                        stroke: "rgba(255,255,255,0.04)"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_14__/* .XAxis */ .W, {
                                        type: "number",
                                        tick: {
                                            fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                            fontSize: 10
                                        },
                                        stroke: "rgba(255,255,255,0.06)",
                                        allowDecimals: false
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_15__/* .YAxis */ .h, {
                                        type: "category",
                                        dataKey: "category",
                                        tick: {
                                            fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted,
                                            fontSize: 10
                                        },
                                        stroke: "rgba(255,255,255,0.06)",
                                        width: 130
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_16__/* .Tooltip */ .m, {
                                        contentStyle: {
                                            background: '#1a1e2b',
                                            border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder}`,
                                            borderRadius: 8,
                                            fontSize: 11,
                                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                        },
                                        labelStyle: {
                                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Area_AreaChart_Bar_BarChart_CartesianGrid_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_23__/* .Bar */ .yP, {
                                        dataKey: "amount",
                                        name: "Credits Spent",
                                        fill: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.red,
                                        radius: [
                                            0,
                                            4,
                                            4,
                                            0
                                        ]
                                    })
                                ]
                            })
                        })
                    })
                ]
            }),
            data.summary.refundedOrders > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-start gap-3 p-3 rounded-xl",
                style: {
                    background: `${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber}10`,
                    border: `1px solid ${_shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber}40`
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertCircle_Coins_CreditCard_DollarSign_RefreshCw_TrendingUp_Users_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                        className: "w-4 h-4 mt-0.5 flex-shrink-0",
                        style: {
                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.amber
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-xs font-medium",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                                },
                                children: [
                                    data.summary.refundedOrders,
                                    " refunded order",
                                    data.summary.refundedOrders === 1 ? '' : 's',
                                    " in this window."
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px] mt-0.5",
                                style: {
                                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                                },
                                children: "Refunds are not deducted from the totals above. Investigate each refund in the audit log."
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
/* ────────────────────── Helpers ────────────────────── */ function ChartCard({ title, subtitle, icon, children }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_10__/* .motion */ .P.div, {
        initial: {
            opacity: 0,
            y: 16
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.35
        },
        className: "rounded-2xl border p-4",
        style: {
            background: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.card,
            borderColor: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.cardBorder
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2 mb-1",
                children: [
                    icon,
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
                        className: "text-xs font-bold",
                        style: {
                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                        },
                        children: title
                    })
                ]
            }),
            subtitle && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-[10px] mb-3",
                style: {
                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.muted
                },
                children: subtitle
            }),
            children
        ]
    });
}
function EmptyChart({ label }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "h-32 flex items-center justify-center",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-[11px]",
            style: {
                color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.dimmed
            },
            children: label
        })
    });
}
function PaymentRow({ label, color, count, usd }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center justify-between text-[11px]",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "w-2.5 h-2.5 rounded-sm",
                        style: {
                            background: color
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        style: {
                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                        },
                        children: label
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        style: {
                            color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.dimmed
                        },
                        children: [
                            "(",
                            count,
                            ")"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "font-semibold",
                style: {
                    color: _shared__WEBPACK_IMPORTED_MODULE_4__/* .ADMIN_COLORS */ .Lp.text
                },
                children: (0,_shared__WEBPACK_IMPORTED_MODULE_4__/* .formatUsd */ .UK)(usd)
            })
        ]
    });
}


/***/ }),

/***/ 849543:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Calendar)
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
    name: "calendar",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M8 2v3",
                key: "1ioesn"
            }
        ],
        [
            "path",
            {
                d: "M16 2v3",
                key: "otl347"
            }
        ],
        [
            "rect",
            {
                x: "3",
                y: "3",
                width: "18",
                height: "18",
                rx: "2",
                key: "h1oib"
            }
        ],
        [
            "path",
            {
                d: "M3 9h18",
                key: "1pudct"
            }
        ]
    ]
};
__iconData.node;
const Calendar = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=calendar.mjs.map


/***/ }),

/***/ 876266:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   At: () => (/* binding */ logAudit),
/* harmony export */   vF: () => (/* binding */ logger)
/* harmony export */ });
/* unused harmony exports createLogger, logError, logRequest */
/* harmony import */ var pino__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(274552);
/* harmony import */ var pino__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pino__WEBPACK_IMPORTED_MODULE_0__);

const isDev = "production" === 'development';
const logger = pino__WEBPACK_IMPORTED_MODULE_0___default()({
    level: isDev ? 'debug' : 'info',
    browser: {
        asObject: true
    },
    // [sandbox adaptation] pino worker-thread transports (pino-pretty) crash
    // inside the Next.js bundled server ("the worker has exited" uncaught
    // exceptions). Plain JSON logs are emitted instead — still readable in
    // `.zscripts/dev.log`.
    transport: undefined,
    formatters: {
        level: (label)=>{
            return {
                level: label
            };
        }
    }
});
/**
 * Create a child logger with additional context
 */ function createLogger(context) {
    return logger.child(context);
}
/**
 * Log audit events (auth, security, etc.)
 */ function logAudit(event, data) {
    logger.info({
        audit: true,
        event,
        ...data
    }, `[AUDIT] ${event}`);
}
/**
 * Log errors with structured data
 */ function logError(error, context) {
    logger.error({
        error: {
            message: error.message,
            stack: error.stack,
            name: error.name
        },
        ...context
    }, error.message);
}
/**
 * Log HTTP requests (for API routes)
 */ function logRequest(method, url, statusCode, duration) {
    logger.info({
        http: {
            method,
            url,
            statusCode,
            duration
        }
    }, `${method} ${url} ${statusCode} - ${duration}ms`);
}


/***/ }),

/***/ 881321:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Type)
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
    name: "type",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 4v16",
                key: "1654pz"
            }
        ],
        [
            "path",
            {
                d: "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2",
                key: "e0r10z"
            }
        ],
        [
            "path",
            {
                d: "M9 20h6",
                key: "s66wpe"
            }
        ]
    ]
};
__iconData.node;
const Type = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=type.mjs.map


/***/ }),

/***/ 885596:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Ban)
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
    name: "ban",
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
            "path",
            {
                d: "M4.929 4.929 19.07 19.071",
                key: "196cmz"
            }
        ]
    ]
};
__iconData.node;
const Ban = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=ban.mjs.map


/***/ }),

/***/ 903295:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ 913656:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ Skeleton)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(114490);


function Skeleton({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        "data-slot": "skeleton",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.cn)("animate-pulse rounded-md bg-muted", className),
        ...props
    });
}



/***/ }),

/***/ 927910:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 932594:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ PopChild)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(673109);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var _context_MotionConfigContext_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(469320);
/* harmony import */ var _utils_use_composed_ref_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(134795);
/* __next_internal_client_entry_do_not_use__ PopChild auto */ 





/**
 * Measurement functionality has to be within a separate component
 * to leverage snapshot lifecycle.
 */ class PopChildMeasure extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    getSnapshotBeforeUpdate(prevProps) {
        const element = this.props.childRef.current;
        if ((0,motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .isHTMLElement */ .s)(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
            const parent = element.offsetParent;
            const parentWidth = (0,motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .isHTMLElement */ .s)(parent) ? parent.offsetWidth || 0 : 0;
            const parentHeight = (0,motion_dom__WEBPACK_IMPORTED_MODULE_2__/* .isHTMLElement */ .s)(parent) ? parent.offsetHeight || 0 : 0;
            const computedStyle = getComputedStyle(element);
            const size = this.props.sizeRef.current;
            size.height = parseFloat(computedStyle.height);
            size.width = parseFloat(computedStyle.width);
            size.top = element.offsetTop;
            size.left = element.offsetLeft;
            size.right = parentWidth - size.width - size.left;
            size.bottom = parentHeight - size.height - size.top;
            size.direction = computedStyle.direction;
        }
        return null;
    }
    /**
     * Required with getSnapshotBeforeUpdate to stop React complaining.
     */ componentDidUpdate() {}
    render() {
        return this.props.children;
    }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
    const id = (0,react__WEBPACK_IMPORTED_MODULE_1__.useId)();
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const size = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        direction: "ltr"
    });
    const { nonce } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_MotionConfigContext_mjs__WEBPACK_IMPORTED_MODULE_3__/* .MotionConfigContext */ .Q);
    /**
     * In React 19, refs are passed via props.ref instead of element.ref.
     * We check props.ref first (React 19) and fall back to element.ref (React 18).
     *
     * The composed ref is only used when popping the child out (pop !== false),
     * so we avoid reading children.props.ref otherwise. In React 18.3 that read
     * triggers a spurious "`ref` is not a prop" warning getter (#3745).
     */ const childRef = pop !== false ? children.props?.ref ?? children?.ref : undefined;
    const composedRef = (0,_utils_use_composed_ref_mjs__WEBPACK_IMPORTED_MODULE_4__/* .useComposedRefs */ .s)(ref, childRef);
    /**
     * We create and inject a style block so we can apply this explicit
     * sizing in a non-destructive manner by just deleting the style block.
     *
     * We can't apply size via render as the measurement happens
     * in getSnapshotBeforeUpdate (post-render), likewise if we apply the
     * styles directly on the DOM node, we might be overwriting
     * styles set via the style prop.
     */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useInsertionEffect)(()=>{
        const { width, height, top, left, right, bottom, direction } = size.current;
        if (isPresent || pop === false || !ref.current || !width || !height) return;
        const isRTL = direction === "rtl";
        const x = anchorX === "left" ? isRTL ? `right: ${right}` : `left: ${left}` : isRTL ? `left: ${left}` : `right: ${right}`;
        const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
        ref.current.dataset.motionPopId = id;
        const style = document.createElement("style");
        if (nonce) style.nonce = nonce;
        const parent = root ?? document.head;
        parent.appendChild(style);
        if (style.sheet) {
            style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
        }
        return ()=>{
            ref.current?.removeAttribute("data-motion-pop-id");
            if (parent.contains(style)) {
                parent.removeChild(style);
            }
        };
    }, [
        isPresent
    ]);
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PopChildMeasure, {
        isPresent: isPresent,
        childRef: ref,
        sizeRef: size,
        pop: pop,
        children: pop === false ? children : /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.cloneElement(children, {
            ref: composedRef
        })
    });
}
 //# sourceMappingURL=PopChild.mjs.map


/***/ }),

/***/ 954171:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Play)
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
    name: "play",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
                key: "10ikf1"
            }
        ]
    ]
};
__iconData.node;
const Play = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=play.mjs.map


/***/ }),

/***/ 971889:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ AreaRevealShape)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_DataUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(901791);
/* harmony import */ var _shape_Curve__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(950976);
/* harmony import */ var _util_isWellBehavedNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9434);
/* harmony import */ var _container_Layer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(340948);
/* harmony import */ var _util_svgPropertiesNoEvents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(370719);
/* harmony import */ var _util_useId__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(293652);
var _excluded = [
    "animationElapsedTime",
    "isAnimating",
    "isEntrance",
    "layout",
    "isRange",
    "stroke",
    "connectNulls"
], _excluded2 = [
    "id",
    "baseLine"
];
function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function(n) {
        for(var e = 1; e < arguments.length; e++){
            var t = arguments[e];
            for(var r in t)({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
        }
        return n;
    }, _extends.apply(null, arguments);
}
function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o, r, i = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        for(r = 0; r < n.length; r++)o = n[r], -1 === t.indexOf(o) && ({}).propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
}
function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for(var n in r)if (({}).hasOwnProperty.call(r, n)) {
        if (-1 !== e.indexOf(n)) continue;
        t[n] = r[n];
    }
    return t;
}







/**
 * Props for the clip-path rect computation.
 * @internal
 */ function HorizontalClipRect(_ref) {
    var _points$, _points;
    var alpha = _ref.alpha, baseLine = _ref.baseLine, points = _ref.points, strokeWidth = _ref.strokeWidth;
    var startX = (_points$ = points[0]) === null || _points$ === void 0 ? void 0 : _points$.x;
    var endX = (_points = points[points.length - 1]) === null || _points === void 0 ? void 0 : _points.x;
    if (!(0,_util_isWellBehavedNumber__WEBPACK_IMPORTED_MODULE_1__/* .isWellBehavedNumber */ .H)(startX) || !(0,_util_isWellBehavedNumber__WEBPACK_IMPORTED_MODULE_1__/* .isWellBehavedNumber */ .H)(endX)) {
        return null;
    }
    var width = alpha * Math.abs(startX - endX);
    var maxY = Math.max(...points.map((entry)=>entry.y || 0));
    if ((0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_2__/* .isNumber */ .Et)(baseLine)) {
        maxY = Math.max(baseLine, maxY);
    } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
        maxY = Math.max(...baseLine.map((entry)=>entry.y || 0), maxY);
    }
    if ((0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_2__/* .isNumber */ .Et)(maxY)) {
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
            x: startX < endX ? startX : startX - width,
            y: 0,
            width: width,
            height: Math.floor(maxY + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1))
        });
    }
    return null;
}
function VerticalClipRect(_ref2) {
    var _points$2, _points2;
    var alpha = _ref2.alpha, baseLine = _ref2.baseLine, points = _ref2.points, strokeWidth = _ref2.strokeWidth;
    var startY = (_points$2 = points[0]) === null || _points$2 === void 0 ? void 0 : _points$2.y;
    var endY = (_points2 = points[points.length - 1]) === null || _points2 === void 0 ? void 0 : _points2.y;
    if (!(0,_util_isWellBehavedNumber__WEBPACK_IMPORTED_MODULE_1__/* .isWellBehavedNumber */ .H)(startY) || !(0,_util_isWellBehavedNumber__WEBPACK_IMPORTED_MODULE_1__/* .isWellBehavedNumber */ .H)(endY)) {
        return null;
    }
    var height = alpha * Math.abs(startY - endY);
    var maxX = Math.max(...points.map((entry)=>entry.x || 0));
    if ((0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_2__/* .isNumber */ .Et)(baseLine)) {
        maxX = Math.max(baseLine, maxX);
    } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
        maxX = Math.max(...baseLine.map((entry)=>entry.x || 0), maxX);
    }
    if ((0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_2__/* .isNumber */ .Et)(maxX)) {
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
            x: 0,
            y: startY < endY ? startY : startY - height,
            width: maxX + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1),
            height: Math.floor(height)
        });
    }
    return null;
}
function RevealClipRect(_ref3) {
    var alpha = _ref3.alpha, layout = _ref3.layout, points = _ref3.points, baseLine = _ref3.baseLine, strokeWidth = _ref3.strokeWidth;
    if (layout === 'vertical') {
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(VerticalClipRect, {
            alpha: alpha,
            points: points,
            baseLine: baseLine,
            strokeWidth: strokeWidth
        });
    }
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(HorizontalClipRect, {
        alpha: alpha,
        points: points,
        baseLine: baseLine,
        strokeWidth: strokeWidth
    });
}
/**
 * The default shape for Area that reveals the chart with a left-to-right (or top-to-bottom)
 * clip-path animation on entrance, and renders the plain curve otherwise.
 *
 * This component renders the complete Area visual: the filled area curve, the stroke curve,
 * and (for range areas) the baseline stroke curve. During entrance animation, all curves are
 * wrapped in a clip-path that progressively reveals the area.
 *
 * This is the built-in entrance animation for Area. It is automatically used when no custom
 * `shape` prop is provided. You can import and reuse it as a starting point for custom shapes.
 *
 * @example
 * ```tsx
 * import { Area, AreaRevealShape } from 'recharts';
 *
 * // Use the default shape explicitly (same as providing no shape prop)
 * <Area dataKey="value" shape={AreaRevealShape} />
 * ```
 *
 * @see {@link https://recharts.github.io/en-US/guide/animations Animation guide}
 *
 * @since 3.9
 */ function AreaRevealShape(props) {
    var _props$animationElaps = props.animationElapsedTime, animationElapsedTime = _props$animationElaps === void 0 ? 1 : _props$animationElaps, _props$isAnimating = props.isAnimating, isAnimating = _props$isAnimating === void 0 ? false : _props$isAnimating, _props$isEntrance = props.isEntrance, isEntrance = _props$isEntrance === void 0 ? false : _props$isEntrance, layoutProp = props.layout, isRange = props.isRange, stroke = props.stroke, connectNulls = props.connectNulls, restProps = _objectWithoutProperties(props, _excluded);
    var layout = layoutProp === 'vertical' ? 'vertical' : 'horizontal';
    var finalConnectNulls = connectNulls !== null && connectNulls !== void 0 ? connectNulls : false;
    var clipId = (0,_util_useId__WEBPACK_IMPORTED_MODULE_3__/* .useId */ .B)();
    var id = restProps.id, baseLine = restProps.baseLine, propsWithoutIdBaseline = _objectWithoutProperties(restProps, _excluded2);
    var strokeSvgProps = (0,_util_svgPropertiesNoEvents__WEBPACK_IMPORTED_MODULE_4__/* .svgPropertiesNoEvents */ .uZ)(propsWithoutIdBaseline);
    var fillCurve = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shape_Curve__WEBPACK_IMPORTED_MODULE_5__/* .Curve */ .Ip, _extends({}, restProps, {
        id: id,
        baseLine: baseLine,
        connectNulls: finalConnectNulls,
        stroke: "none",
        className: "recharts-area-area",
        layout: layout
    }));
    var strokeCurve = stroke !== 'none' && /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shape_Curve__WEBPACK_IMPORTED_MODULE_5__/* .Curve */ .Ip, _extends({}, strokeSvgProps, {
        className: "recharts-area-curve",
        layout: layout,
        type: restProps.type,
        connectNulls: finalConnectNulls,
        fill: "none",
        stroke: stroke,
        points: restProps.points
    }));
    var baselineCurve = stroke !== 'none' && isRange && Array.isArray(baseLine) && /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_shape_Curve__WEBPACK_IMPORTED_MODULE_5__/* .Curve */ .Ip, _extends({}, strokeSvgProps, {
        className: "recharts-area-curve",
        layout: layout,
        type: restProps.type,
        connectNulls: finalConnectNulls,
        fill: "none",
        stroke: stroke,
        points: baseLine
    }));
    if (isEntrance && (isAnimating || animationElapsedTime < 1)) {
        var _restProps$points;
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_container_Layer__WEBPACK_IMPORTED_MODULE_6__/* .Layer */ .W, null, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("clipPath", {
            id: clipId
        }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(RevealClipRect, {
            alpha: animationElapsedTime,
            points: (_restProps$points = restProps.points) !== null && _restProps$points !== void 0 ? _restProps$points : [],
            baseLine: baseLine,
            layout: layout,
            strokeWidth: restProps.strokeWidth
        }))), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_container_Layer__WEBPACK_IMPORTED_MODULE_6__/* .Layer */ .W, {
            clipPath: "url(#".concat(clipId, ")")
        }, fillCurve, strokeCurve, baselineCurve));
    }
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, fillCurve, strokeCurve, baselineCurve);
}


/***/ }),

/***/ 972876:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ TabVisibilityContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const TabVisibilityContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(true);


/***/ }),

/***/ 975843:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gk: () => (/* binding */ Area),
/* harmony export */   Vf: () => (/* binding */ computeArea)
/* harmony export */ });
/* unused harmony exports defaultAreaProps, getBaseValue */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(699314);
/* harmony import */ var _container_Layer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(340948);
/* harmony import */ var _component_LabelList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(647459);
/* harmony import */ var _component_Dots__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(283521);
/* harmony import */ var _util_DataUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(901791);
/* harmony import */ var _util_ChartUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(830841);
/* harmony import */ var _util_ReactUtils__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(221480);
/* harmony import */ var _component_ActivePoints__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(736136);
/* harmony import */ var _state_SetTooltipEntrySettings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(500443);
/* harmony import */ var _GraphicalItemClipPath__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(610059);
/* harmony import */ var _state_selectors_areaSelectors__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(141791);
/* harmony import */ var _context_PanoramaContext__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(70383);
/* harmony import */ var _context_chartLayoutContext__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(655644);
/* harmony import */ var _state_selectors_selectors__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(684004);
/* harmony import */ var _state_SetLegendPayload__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(182118);
/* harmony import */ var _state_hooks__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(332671);
/* harmony import */ var _animation_AnimatedItems__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(699659);
/* harmony import */ var _animation_matchBy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(564644);
/* harmony import */ var _animation_useAnimationStartSnapshot__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(703049);
/* harmony import */ var _util_resolveDefaultProps__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(169599);
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(220597);
/* harmony import */ var _context_RegisterGraphicalItemId__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(315541);
/* harmony import */ var _state_SetGraphicalItem__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(793021);
/* harmony import */ var _util_svgPropertiesNoEvents__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(370719);
/* harmony import */ var _util_getRadiusAndStrokeWidthFromDot__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(801432);
/* harmony import */ var _util_svgPropertiesAndEvents__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(250149);
/* harmony import */ var _util_ActiveShapeUtils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(61368);
/* harmony import */ var _zIndex_ZIndexLayer__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(317947);
/* harmony import */ var _zIndex_DefaultZIndexes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(506859);
/* harmony import */ var _util_propsAreEqual__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(266762);
/* harmony import */ var _AreaRevealShape__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(971889);
var _excluded = [
    "id"
], _excluded2 = [
    "activeDot",
    "animationBegin",
    "animationDuration",
    "animationEasing",
    "connectNulls",
    "dot",
    "fill",
    "fillOpacity",
    "hide",
    "isAnimationActive",
    "legendType",
    "stroke",
    "xAxisId",
    "yAxisId"
];
function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function(n) {
        for(var e = 1; e < arguments.length; e++){
            var t = arguments[e];
            for(var r in t)({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
        }
        return n;
    }, _extends.apply(null, arguments);
}
function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o, r, i = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        for(r = 0; r < n.length; r++)o = n[r], -1 === t.indexOf(o) && ({}).propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
}
function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for(var n in r)if (({}).hasOwnProperty.call(r, n)) {
        if (-1 !== e.indexOf(n)) continue;
        t[n] = r[n];
    }
    return t;
}
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}

































/**
 * @inline
 */ /**
 * Our base value array has payload in it, and we expose it externally too.
 */ /**
 * Internal props, combination of external props + defaultProps + private Recharts state
 */ /**
 * External props, intended for end users to fill in
 */ var defaultAreaAnimateItems = (items, animationElapsedTime)=>{
    if (items == null) {
        // First render: return items as-is, clip-path animation handles the reveal
        return [];
    }
    if (animationElapsedTime === 1) {
        return items.flatMap((item)=>item.status === 'removed' ? [] : [
                item.next
            ]);
    }
    return items.flatMap((item)=>{
        if (item.status === 'matched') {
            return [
                _objectSpread(_objectSpread({}, item.next), {}, {
                    x: (0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_1__/* .interpolate */ .GW)(item.prev.x, item.next.x, animationElapsedTime),
                    y: (0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_1__/* .interpolate */ .GW)(item.prev.y, item.next.y, animationElapsedTime)
                })
            ];
        }
        if (item.status === 'added') {
            /*
       * Here we just return the final position without interpolating
       * so that we can allow the default initial animation that is done by clipPath in AreaRevealShape.
       * If you want your own custom animations then you may want to interpolate this one as well.
       */ return [
                item.next
            ];
        }
        // removed: drop
        return [];
    });
};
var defaultAreaProps = {
    activeDot: true,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: 'ease',
    animationMatchBy: _animation_matchBy__WEBPACK_IMPORTED_MODULE_2__/* .matchByIndex */ .hC,
    animationInterpolateFn: defaultAreaAnimateItems,
    connectNulls: false,
    dot: false,
    fill: '#3182bd',
    fillOpacity: 0.6,
    hide: false,
    isAnimationActive: 'auto',
    legendType: 'line',
    stroke: '#3182bd',
    strokeWidth: 1,
    type: 'linear',
    label: false,
    shape: _AreaRevealShape__WEBPACK_IMPORTED_MODULE_3__/* .AreaRevealShape */ .q,
    xAxisId: 0,
    yAxisId: 0,
    zIndex: _zIndex_DefaultZIndexes__WEBPACK_IMPORTED_MODULE_4__/* .DefaultZIndexes */ .I.area
};
/**
 * Because of naming conflict, we are forced to ignore certain (valid) SVG attributes.
 */ function getLegendItemColor(stroke, fill) {
    return stroke && stroke !== 'none' ? stroke : fill;
}
var computeLegendPayloadFromAreaData = (props)=>{
    var dataKey = props.dataKey, name = props.name, stroke = props.stroke, fill = props.fill, legendType = props.legendType, hide = props.hide;
    return [
        {
            inactive: hide,
            dataKey,
            type: legendType,
            color: getLegendItemColor(stroke, fill),
            value: (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_5__/* .getTooltipNameProp */ .uM)(name, dataKey),
            payload: props
        }
    ];
};
var SetAreaTooltipEntrySettings = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.memo((_ref)=>{
    var dataKey = _ref.dataKey, data = _ref.data, stroke = _ref.stroke, strokeWidth = _ref.strokeWidth, fill = _ref.fill, name = _ref.name, hide = _ref.hide, unit = _ref.unit, formatter = _ref.formatter, tooltipType = _ref.tooltipType, id = _ref.id;
    var tooltipEntrySettings = {
        dataDefinedOnItem: data,
        getPosition: _util_DataUtils__WEBPACK_IMPORTED_MODULE_1__/* .noop */ .lQ,
        settings: {
            stroke,
            strokeWidth,
            fill,
            dataKey,
            nameKey: undefined,
            name: (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_5__/* .getTooltipNameProp */ .uM)(name, dataKey),
            hide,
            type: tooltipType,
            color: getLegendItemColor(stroke, fill),
            unit,
            formatter,
            graphicalItemId: id
        }
    };
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_state_SetTooltipEntrySettings__WEBPACK_IMPORTED_MODULE_6__/* .SetTooltipEntrySettings */ .r, {
        tooltipEntrySettings: tooltipEntrySettings
    });
});
function AreaDotsWrapper(_ref2) {
    var clipPathId = _ref2.clipPathId, points = _ref2.points, props = _ref2.props;
    var needClip = props.needClip, dot = props.dot, dataKey = props.dataKey;
    var areaProps = (0,_util_svgPropertiesNoEvents__WEBPACK_IMPORTED_MODULE_7__/* .svgPropertiesNoEvents */ .uZ)(props);
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_component_Dots__WEBPACK_IMPORTED_MODULE_8__/* .Dots */ .n, {
        points: points,
        dot: dot,
        className: "recharts-area-dots",
        dotClassName: "recharts-area-dot",
        dataKey: dataKey,
        baseProps: areaProps,
        needClip: needClip,
        clipPathId: clipPathId
    });
}
function AreaLabelListProvider(_ref3) {
    var showLabels = _ref3.showLabels, children = _ref3.children, points = _ref3.points;
    var labelListEntries = points.map((point)=>{
        var _point$x, _point$y;
        var viewBox = {
            x: (_point$x = point.x) !== null && _point$x !== void 0 ? _point$x : 0,
            y: (_point$y = point.y) !== null && _point$y !== void 0 ? _point$y : 0,
            width: 0,
            lowerWidth: 0,
            upperWidth: 0,
            height: 0
        };
        return _objectSpread(_objectSpread({}, viewBox), {}, {
            value: point.value,
            payload: point.payload,
            parentViewBox: undefined,
            viewBox,
            fill: undefined
        });
    });
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_component_LabelList__WEBPACK_IMPORTED_MODULE_9__/* .CartesianLabelListContextProvider */ .h8, {
        value: showLabels ? labelListEntries : undefined
    }, children);
}
function StaticArea(_ref4) {
    var points = _ref4.points, baseLine = _ref4.baseLine, needClip = _ref4.needClip, clipPathId = _ref4.clipPathId, props = _ref4.props, animationElapsedTime = _ref4.animationElapsedTime, isAnimating = _ref4.isAnimating, isEntrance = _ref4.isEntrance;
    var layout = props.layout, type = props.type, stroke = props.stroke, connectNulls = props.connectNulls, isRange = props.isRange, shape = props.shape;
    var id = props.id, propsWithoutId = _objectWithoutProperties(props, _excluded);
    var propsWithEvents = (0,_util_svgPropertiesAndEvents__WEBPACK_IMPORTED_MODULE_10__/* .svgPropertiesAndEvents */ .a)(propsWithoutId);
    var curveProps = _objectSpread(_objectSpread({}, propsWithEvents), {}, {
        id,
        points,
        connectNulls,
        type,
        baseLine,
        layout,
        stroke,
        isRange,
        animationElapsedTime,
        isAnimating,
        isEntrance
    });
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (points === null || points === void 0 ? void 0 : points.length) > 1 && /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_container_Layer__WEBPACK_IMPORTED_MODULE_11__/* .Layer */ .W, {
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : undefined
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_util_ActiveShapeUtils__WEBPACK_IMPORTED_MODULE_12__/* .Shape */ .y, {
        option: shape,
        DefaultShape: defaultAreaProps.shape,
        shapeProps: curveProps
    })), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(AreaDotsWrapper, {
        points: points,
        props: propsWithoutId,
        clipPathId: clipPathId
    }));
}
function interpolateScalarBaseLine(baseLine, prevBaseLine, animationElapsedTime) {
    if ((0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_1__/* .isNumber */ .Et)(baseLine)) {
        var previousNumberBaseLine = (0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_1__/* .isNumber */ .Et)(prevBaseLine) ? prevBaseLine : undefined;
        return (0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_1__/* .interpolate */ .GW)(previousNumberBaseLine, baseLine, animationElapsedTime);
    }
    if ((0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_1__/* .isNullish */ .uy)(baseLine) || (0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_1__/* .isNan */ .M8)(baseLine)) {
        var _previousNumberBaseLine = (0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_1__/* .isNumber */ .Et)(prevBaseLine) ? prevBaseLine : undefined;
        return (0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_1__/* .interpolate */ .GW)(_previousNumberBaseLine, 0, animationElapsedTime);
    }
    return baseLine;
}
function AreaWithAnimation(_ref5) {
    var needClip = _ref5.needClip, clipPathId = _ref5.clipPathId, props = _ref5.props, previousPointsRef = _ref5.previousPointsRef, previousBaselineRef = _ref5.previousBaselineRef;
    var points = props.points, baseLine = props.baseLine, isAnimationActive = props.isAnimationActive, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, animationMatchBy = props.animationMatchBy, animationInterpolateFn = props.animationInterpolateFn;
    var animationInput = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({
            points,
            baseLine
        }), [
        points,
        baseLine
    ]);
    var baseLineAnimationState = (0,_animation_useAnimationStartSnapshot__WEBPACK_IMPORTED_MODULE_13__/* .useAnimationStartSnapshot */ .U)(animationInput, previousBaselineRef);
    var layout = (0,_context_chartLayoutContext__WEBPACK_IMPORTED_MODULE_14__/* .useCartesianChartLayout */ .kz)();
    var _useAnimationCallback = (0,_animation_AnimatedItems__WEBPACK_IMPORTED_MODULE_15__/* .useAnimationCallbacks */ .I)(props.onAnimationStart, props.onAnimationEnd), isAnimating = _useAnimationCallback.isAnimating, handleAnimationStart = _useAnimationCallback.handleAnimationStart, handleAnimationEnd = _useAnimationCallback.handleAnimationEnd;
    var prevBaseLine = baseLineAnimationState.startValue;
    if (layout == null) {
        return null;
    }
    var baseLineAnimationItems;
    if (Array.isArray(baseLine) && Array.isArray(prevBaseLine)) {
        baseLineAnimationItems = (0,_animation_matchBy__WEBPACK_IMPORTED_MODULE_2__/* .matchAnimationItems */ .qe)(prevBaseLine, baseLine, animationMatchBy);
    } else if (Array.isArray(baseLine)) {
        baseLineAnimationItems = (0,_animation_matchBy__WEBPACK_IMPORTED_MODULE_2__/* .matchAnimationItems */ .qe)(null, baseLine, animationMatchBy);
    } else {
        baseLineAnimationItems = null;
    }
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_animation_AnimatedItems__WEBPACK_IMPORTED_MODULE_15__/* .AnimatedItems */ .U, {
        animationInput: animationInput,
        animationIdPrefix: "recharts-area-",
        items: points,
        previousItemsRef: previousPointsRef,
        isAnimationActive: isAnimationActive,
        animationBegin: animationBegin,
        animationDuration: animationDuration,
        animationEasing: animationEasing,
        onAnimationStart: handleAnimationStart,
        onAnimationEnd: handleAnimationEnd,
        animationInterpolateFn: animationInterpolateFn,
        animationMatchBy: animationMatchBy,
        layout: layout
    }, (stepPoints, animationElapsedTime, isEntrance)=>{
        var stepBaseLine;
        if (animationElapsedTime === 1) {
            stepBaseLine = baseLine;
        } else if (Array.isArray(baseLine)) {
            stepBaseLine = animationInterpolateFn(baseLineAnimationItems, animationElapsedTime, layout);
        } else {
            stepBaseLine = isEntrance ? baseLine : interpolateScalarBaseLine(baseLine, prevBaseLine, animationElapsedTime);
        }
        baseLineAnimationState.syncStepValue(stepBaseLine, animationElapsedTime);
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(AreaLabelListProvider, {
            showLabels: !isAnimating,
            points: points
        }, props.children, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(StaticArea, {
            points: stepPoints,
            baseLine: stepBaseLine,
            needClip: needClip,
            clipPathId: clipPathId,
            props: props,
            animationElapsedTime: animationElapsedTime,
            isAnimating: isAnimating || animationElapsedTime < 1,
            isEntrance: isEntrance
        }), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_component_LabelList__WEBPACK_IMPORTED_MODULE_9__/* .LabelListFromLabelProp */ .qY, {
            label: props.label
        }));
    });
}
/*
 * This component decides if the area should be animated or not.
 * It also holds the state of the animation.
 */ function RenderArea(_ref6) {
    var needClip = _ref6.needClip, clipPathId = _ref6.clipPathId, props = _ref6.props;
    /*
   * These two must be refs, not state!
   * Because we want to store the most recent shape of the animation in case we have to interrupt the animation;
   * that happens when user initiates another animation before the current one finishes.
   *
   * If this was a useState, then every step in the animation would trigger a re-render.
   * So, useRef it is.
   */ var previousPointsRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    var previousBaselineRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(AreaWithAnimation, {
        needClip: needClip,
        clipPathId: clipPathId,
        props: props,
        previousPointsRef: previousPointsRef,
        previousBaselineRef: previousBaselineRef
    });
}
class AreaWithState extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
    render() {
        var _this$props = this.props, hide = _this$props.hide, dot = _this$props.dot, points = _this$props.points, className = _this$props.className, top = _this$props.top, left = _this$props.left, needClip = _this$props.needClip, xAxisId = _this$props.xAxisId, yAxisId = _this$props.yAxisId, width = _this$props.width, height = _this$props.height, id = _this$props.id, baseLine = _this$props.baseLine, zIndex = _this$props.zIndex;
        if (hide) {
            return null;
        }
        var layerClass = (0,clsx__WEBPACK_IMPORTED_MODULE_16__/* .clsx */ .$)('recharts-area', className);
        var clipPathId = id;
        var _getRadiusAndStrokeWi = (0,_util_getRadiusAndStrokeWidthFromDot__WEBPACK_IMPORTED_MODULE_17__/* .getRadiusAndStrokeWidthFromDot */ .x)(dot), r = _getRadiusAndStrokeWi.r, strokeWidth = _getRadiusAndStrokeWi.strokeWidth;
        var clipDot = (0,_util_ReactUtils__WEBPACK_IMPORTED_MODULE_18__/* .isClipDot */ .y$)(dot);
        var dotSize = r * 2 + strokeWidth;
        var activePointsClipPath = needClip ? "url(#clipPath-".concat(clipDot ? '' : 'dots-').concat(clipPathId, ")") : undefined;
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_zIndex_ZIndexLayer__WEBPACK_IMPORTED_MODULE_19__/* .ZIndexLayer */ .g, {
            zIndex: zIndex
        }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_container_Layer__WEBPACK_IMPORTED_MODULE_11__/* .Layer */ .W, {
            className: layerClass
        }, needClip && /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_GraphicalItemClipPath__WEBPACK_IMPORTED_MODULE_20__/* .GraphicalItemClipPath */ .Q, {
            clipPathId: clipPathId,
            xAxisId: xAxisId,
            yAxisId: yAxisId
        }), !clipDot && /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("clipPath", {
            id: "clipPath-dots-".concat(clipPathId)
        }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
            x: left - dotSize / 2,
            y: top - dotSize / 2,
            width: width + dotSize,
            height: height + dotSize
        }))), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(RenderArea, {
            needClip: needClip,
            clipPathId: clipPathId,
            props: this.props
        })), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_component_ActivePoints__WEBPACK_IMPORTED_MODULE_21__/* .ActivePoints */ .W, {
            points: points,
            mainColor: getLegendItemColor(this.props.stroke, this.props.fill),
            itemDataKey: this.props.dataKey,
            activeDot: this.props.activeDot,
            clipPath: activePointsClipPath
        }), this.props.isRange && Array.isArray(baseLine) && /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_component_ActivePoints__WEBPACK_IMPORTED_MODULE_21__/* .ActivePoints */ .W, {
            points: baseLine,
            mainColor: getLegendItemColor(this.props.stroke, this.props.fill),
            itemDataKey: this.props.dataKey,
            activeDot: this.props.activeDot,
            clipPath: activePointsClipPath
        }));
    }
}
function AreaImpl(props) {
    var _useAppSelector;
    var activeDot = props.activeDot, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, connectNulls = props.connectNulls, dot = props.dot, fill = props.fill, fillOpacity = props.fillOpacity, hide = props.hide, isAnimationActive = props.isAnimationActive, legendType = props.legendType, stroke = props.stroke, xAxisId = props.xAxisId, yAxisId = props.yAxisId, everythingElse = _objectWithoutProperties(props, _excluded2);
    var layout = (0,_context_chartLayoutContext__WEBPACK_IMPORTED_MODULE_14__/* .useChartLayout */ .WX)();
    var chartName = (0,_state_selectors_selectors__WEBPACK_IMPORTED_MODULE_22__/* .useChartName */ .fW)();
    var _useNeedsClip = (0,_GraphicalItemClipPath__WEBPACK_IMPORTED_MODULE_20__/* .useNeedsClip */ .l)(xAxisId, yAxisId), needClip = _useNeedsClip.needClip;
    var isPanorama = (0,_context_PanoramaContext__WEBPACK_IMPORTED_MODULE_23__/* .useIsPanorama */ .r)();
    var _ref7 = (_useAppSelector = (0,_state_hooks__WEBPACK_IMPORTED_MODULE_24__/* .useAppSelector */ .G)((state)=>(0,_state_selectors_areaSelectors__WEBPACK_IMPORTED_MODULE_25__/* .selectArea */ .k)(state, props.id, isPanorama))) !== null && _useAppSelector !== void 0 ? _useAppSelector : {}, points = _ref7.points, isRange = _ref7.isRange, baseLine = _ref7.baseLine;
    var plotArea = (0,_hooks__WEBPACK_IMPORTED_MODULE_26__/* .usePlotArea */ .oM)();
    if (layout !== 'horizontal' && layout !== 'vertical' || plotArea == null) {
        // Can't render Area in an unsupported layout
        return null;
    }
    if (chartName !== 'AreaChart' && chartName !== 'ComposedChart') {
        // There is nothing stopping us from rendering Area in other charts, except for historical reasons. Do we want to allow that?
        return null;
    }
    var height = plotArea.height, width = plotArea.width, left = plotArea.x, top = plotArea.y;
    if (!points || !points.length) {
        return null;
    }
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(AreaWithState, _extends({}, everythingElse, {
        activeDot: activeDot,
        animationBegin: animationBegin,
        animationDuration: animationDuration,
        animationEasing: animationEasing,
        baseLine: baseLine,
        connectNulls: connectNulls,
        dot: dot,
        fill: fill,
        fillOpacity: fillOpacity,
        height: height,
        hide: hide,
        layout: layout,
        isAnimationActive: isAnimationActive,
        isRange: isRange,
        legendType: legendType,
        needClip: needClip,
        points: points,
        stroke: stroke,
        width: width,
        left: left,
        top: top,
        xAxisId: xAxisId,
        yAxisId: yAxisId
    }));
}
var getBaseValue = (layout, chartBaseValue, itemBaseValue, xAxis, yAxis)=>{
    // The baseValue can be defined both on the AreaChart, and on the Area.
    // The value for the item takes precedence.
    var baseValue = itemBaseValue !== null && itemBaseValue !== void 0 ? itemBaseValue : chartBaseValue;
    if ((0,_util_DataUtils__WEBPACK_IMPORTED_MODULE_1__/* .isNumber */ .Et)(baseValue)) {
        return baseValue;
    }
    var numericAxis = layout === 'horizontal' ? yAxis : xAxis;
    // @ts-expect-error d3scale .domain() returns unknown, Math.max expects number
    var domain = numericAxis.scale.domain();
    if (numericAxis.type === 'number') {
        var domainMax = Math.max(domain[0], domain[1]);
        var domainMin = Math.min(domain[0], domain[1]);
        if (baseValue === 'dataMin') {
            return domainMin;
        }
        if (baseValue === 'dataMax') {
            return domainMax;
        }
        return domainMax < 0 ? domainMax : Math.max(Math.min(domain[0], domain[1]), 0);
    }
    if (baseValue === 'dataMin') {
        return domain[0];
    }
    if (baseValue === 'dataMax') {
        return domain[1];
    }
    return domain[0];
};
function computeArea(_ref8) {
    var _ref8$areaSettings = _ref8.areaSettings, connectNulls = _ref8$areaSettings.connectNulls, itemBaseValue = _ref8$areaSettings.baseValue, dataKey = _ref8$areaSettings.dataKey, stackedData = _ref8.stackedData, layout = _ref8.layout, chartBaseValue = _ref8.chartBaseValue, xAxis = _ref8.xAxis, yAxis = _ref8.yAxis, displayedData = _ref8.displayedData, dataStartIndex = _ref8.dataStartIndex, xAxisTicks = _ref8.xAxisTicks, yAxisTicks = _ref8.yAxisTicks, bandSize = _ref8.bandSize, stackDataKeys = _ref8.stackDataKeys;
    var hasStack = stackedData && stackedData.length;
    var baseValue = getBaseValue(layout, chartBaseValue, itemBaseValue, xAxis, yAxis);
    var isHorizontalLayout = layout === 'horizontal';
    var isRange = false;
    var points = displayedData.map((entry, index)=>{
        var _valueAsArray$, _valueAsArray, _xAxis$scale$map;
        var valueAsArray;
        if (hasStack) {
            valueAsArray = stackedData[dataStartIndex + index];
        } else {
            var _rawValue = (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_5__/* .getValueByDataKey */ .kr)(entry, dataKey);
            if (!Array.isArray(_rawValue)) {
                valueAsArray = [
                    baseValue,
                    _rawValue
                ];
            } else {
                valueAsArray = _rawValue;
                isRange = true;
            }
        }
        var value1 = (_valueAsArray$ = (_valueAsArray = valueAsArray) === null || _valueAsArray === void 0 ? void 0 : _valueAsArray[1]) !== null && _valueAsArray$ !== void 0 ? _valueAsArray$ : null;
        var rawValue = (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_5__/* .getValueByDataKey */ .kr)(entry, dataKey);
        /*
     * A null in one series of a stack is rendered as zero contribution so the series above keep their offsets.
     * When every series in the stack is null, there is no offset to preserve,
     * so the point is a gap that connectNulls is allowed to connect across.
     */ var wholeStackIsNull = hasStack && rawValue == null && stackDataKeys != null && stackDataKeys.length > 0 && stackDataKeys.every((key)=>(0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_5__/* .getValueByDataKey */ .kr)(entry, key) == null);
        var isBreakPoint = value1 == null || hasStack && !connectNulls && rawValue == null || wholeStackIsNull;
        if (isHorizontalLayout) {
            var _yAxis$scale$map;
            return {
                x: (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_5__/* .getCateCoordinateOfLine */ .nb)({
                    axis: xAxis,
                    ticks: xAxisTicks,
                    bandSize,
                    entry,
                    index
                }),
                y: isBreakPoint ? null : (_yAxis$scale$map = yAxis.scale.map(value1)) !== null && _yAxis$scale$map !== void 0 ? _yAxis$scale$map : null,
                value: valueAsArray,
                payload: entry
            };
        }
        return {
            x: isBreakPoint ? null : (_xAxis$scale$map = xAxis.scale.map(value1)) !== null && _xAxis$scale$map !== void 0 ? _xAxis$scale$map : null,
            y: (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_5__/* .getCateCoordinateOfLine */ .nb)({
                axis: yAxis,
                ticks: yAxisTicks,
                bandSize,
                entry,
                index
            }),
            value: valueAsArray,
            payload: entry
        };
    });
    var baseLine;
    if (hasStack || isRange) {
        baseLine = points.map((entry)=>{
            var _xAxis$scale$map2;
            var x = Array.isArray(entry.value) ? entry.value[0] : null;
            if (isHorizontalLayout) {
                var _yAxis$scale$map2;
                return {
                    x: entry.x,
                    y: x != null && entry.y != null ? (_yAxis$scale$map2 = yAxis.scale.map(x)) !== null && _yAxis$scale$map2 !== void 0 ? _yAxis$scale$map2 : null : null,
                    payload: entry.payload
                };
            }
            return {
                x: x != null ? (_xAxis$scale$map2 = xAxis.scale.map(x)) !== null && _xAxis$scale$map2 !== void 0 ? _xAxis$scale$map2 : null : null,
                y: entry.y,
                payload: entry.payload
            };
        });
    } else {
        baseLine = isHorizontalLayout ? yAxis.scale.map(baseValue) : xAxis.scale.map(baseValue);
    }
    return {
        points,
        baseLine: baseLine !== null && baseLine !== void 0 ? baseLine : 0,
        isRange
    };
}
function AreaFn(outsideProps) {
    var props = (0,_util_resolveDefaultProps__WEBPACK_IMPORTED_MODULE_27__/* .resolveDefaultProps */ .e)(outsideProps, defaultAreaProps);
    var isPanorama = (0,_context_PanoramaContext__WEBPACK_IMPORTED_MODULE_23__/* .useIsPanorama */ .r)();
    // Report all props to Redux store first, before calling hooks, to avoid circular dependencies.
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_context_RegisterGraphicalItemId__WEBPACK_IMPORTED_MODULE_28__/* .RegisterGraphicalItemId */ .x, {
        id: props.id,
        type: "area"
    }, (id)=>/*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_state_SetLegendPayload__WEBPACK_IMPORTED_MODULE_29__/* .SetLegendPayload */ .A, {
            legendPayload: computeLegendPayloadFromAreaData(props)
        }), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(SetAreaTooltipEntrySettings, {
            dataKey: props.dataKey,
            data: props.data,
            stroke: props.stroke,
            strokeWidth: props.strokeWidth,
            fill: props.fill,
            name: props.name,
            hide: props.hide,
            unit: props.unit,
            formatter: props.formatter,
            tooltipType: props.tooltipType,
            id: id
        }), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_state_SetGraphicalItem__WEBPACK_IMPORTED_MODULE_30__/* .SetCartesianGraphicalItem */ .p, {
            type: "area",
            id: id,
            data: props.data,
            dataKey: props.dataKey,
            xAxisId: props.xAxisId,
            yAxisId: props.yAxisId,
            zAxisId: 0,
            stackId: (0,_util_ChartUtils__WEBPACK_IMPORTED_MODULE_5__/* .getNormalizedStackId */ .$8)(props.stackId),
            hide: props.hide,
            barSize: undefined,
            baseValue: props.baseValue,
            isPanorama: isPanorama,
            connectNulls: props.connectNulls
        }), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(AreaImpl, _extends({}, props, {
            id: id
        }))));
}
/**
 * @provides LabelListContext
 * @consumes CartesianChartContext
 */ var Area = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.memo(AreaFn, _util_propsAreEqual__WEBPACK_IMPORTED_MODULE_31__/* .propsAreEqual */ .P);
// @ts-expect-error we need to set the displayName for debugging purposes
Area.displayName = 'Area';


/***/ }),

/***/ 979428:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 991775:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ useRechartsTheme)
/* harmony export */ });
/* unused harmony export RechartsThemeProvider */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _legacyTheme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(356391);


var RechartsThemeContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(_legacyTheme__WEBPACK_IMPORTED_MODULE_1__/* .legacyTheme */ .b);
/**
 * Applies the provided theme to all charts in the children tree.
 *
 * @experimental
 */ var RechartsThemeProvider = RechartsThemeContext.Provider;
/**
 * Reads the currently active theme in the children tree.
 *
 * @experimental
 */ var useRechartsTheme = ()=>(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(RechartsThemeContext);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,5573,1435,4515,476,799,6655,7043,6455,2976,8163,5068,9911,9142,8971,8835,859,1068,5362,3396,8696], () => (__webpack_exec__(238818)));
module.exports = __webpack_exports__;

})();