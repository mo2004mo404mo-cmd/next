"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[96795],{

/***/ 43385:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ useTheme),
/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* __next_internal_client_entry_do_not_use__ ThemeProvider,useTheme auto */ 

const ThemeContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
function ThemeProvider({ children }) {
    const [theme, setThemeState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('system');
    const [systemTheme, setSystemTheme] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('dark');
    const resolvedTheme = theme === 'system' ? systemTheme : theme;
    // Hydrate from localStorage after mount (avoids SSR mismatch)
    /* eslint-disable react-hooks/set-state-in-effect -- Hydration from localStorage must happen in effect */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const stored = localStorage.getItem('theme');
        if (stored && [
            'light',
            'dark',
            'system'
        ].includes(stored)) {
            setThemeState(stored);
        } else {
            // No stored preference → default to dark (matches layout.tsx's html className="dark")
            // so the user's first paint is the polished dark theme.
            setThemeState('dark');
        }
        setSystemTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }, []);
    /* eslint-enable react-hooks/set-state-in-effect */ // Apply theme to document
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const root = document.documentElement;
        if (resolvedTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [
        resolvedTheme
    ]);
    // Listen to system theme changes
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = ()=>{
            setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
        };
        mediaQuery.addEventListener('change', handleChange);
        return ()=>mediaQuery.removeEventListener('change', handleChange);
    }, []);
    // Save theme to localStorage
    const handleSetTheme = (newTheme)=>{
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ThemeContext.Provider, {
        value: {
            theme,
            setTheme: handleSetTheme,
            resolvedTheme
        },
        children: children
    });
}
function useTheme() {
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}


/***/ }),

/***/ 96795:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChatWhiteboard)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var react_konva__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(59524);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18986);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(26636);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(46405);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(40852);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(67401);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(36565);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(51867);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(14929);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(82879);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(83449);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(26937);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(70299);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(21748);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(92653);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(64577);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(62818);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(6957);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(19928);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(32159);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(50825);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(19707);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(8962);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(31966);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(86272);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(15330);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(60976);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(29572);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(12980);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(79267);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(36619);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(31372);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(9383);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(64304);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(36483);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(15561);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(86210);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(51128);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(25879);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(6923);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(76401);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(3665);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(78780);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(76721);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66609);
/* harmony import */ var _lib_hooks_use_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(43385);
/* __next_internal_client_entry_do_not_use__ default auto */ 





/* ══════════════════════════════════════════════════════════════ */ /* ── Constants ──                                               */ /* ══════════════════════════════════════════════════════════════ */ const COLORS = [
    '#00e5a0',
    '#4fc3f7',
    '#ff5757',
    '#f59e0b',
    '#8b5cf6',
    '#ec4899',
    '#ffffff',
    '#5a6478',
    '#e74c3c',
    '#0984e3',
    '#fdcb6e',
    '#6c5ce7'
];
const BRUSH_SIZES = [
    2,
    4,
    8,
    14
];
const STICKY_COLORS = [
    {
        name: 'Yellow',
        body: '#FEF3C7',
        fold: '#FDE68A',
        text: '#92400E'
    },
    {
        name: 'Pink',
        body: '#FCE7F3',
        fold: '#F9A8D4',
        text: '#9D174D'
    },
    {
        name: 'Blue',
        body: '#DBEAFE',
        fold: '#93C5FD',
        text: '#1E40AF'
    },
    {
        name: 'Green',
        body: '#D1FAE5',
        fold: '#6EE7B7',
        text: '#065F46'
    },
    {
        name: 'Orange',
        body: '#FED7AA',
        fold: '#FDBA74',
        text: '#9A3412'
    },
    {
        name: 'Purple',
        body: '#EDE9FE',
        fold: '#C4B5FD',
        text: '#5B21B6'
    }
];
const CANVAS_BG = '#1a1d27';
const CONNECTOR_STYLES = [
    {
        value: 'straight',
        label: 'Straight'
    },
    {
        value: 'curved',
        label: 'Curved'
    },
    {
        value: 'elbow',
        label: 'Elbow'
    }
];
const ARROWHEAD_OPTIONS = [
    {
        value: 'none',
        label: 'No Arrow'
    },
    {
        value: 'end',
        label: 'End Arrow'
    },
    {
        value: 'start',
        label: 'Start Arrow'
    },
    {
        value: 'both',
        label: 'Both Arrows'
    }
];
const ZOOM_PRESETS = [
    0.5,
    0.75,
    1,
    1.5,
    2
];
const TOOL_CONFIG = {
    pen: {
        label: 'Pen',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        cursor: 'crosshair'
    },
    highlighter: {
        label: 'Highlighter',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        cursor: 'crosshair'
    },
    eraser: {
        label: 'Eraser',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        cursor: 'crosshair'
    },
    rectangle: {
        label: 'Rectangle',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        cursor: 'crosshair'
    },
    circle: {
        label: 'Circle',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        cursor: 'crosshair'
    },
    line: {
        label: 'Line',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        cursor: 'crosshair'
    },
    arrow: {
        label: 'Arrow',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        cursor: 'crosshair'
    },
    text: {
        label: 'Text',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        cursor: 'text'
    },
    sticky: {
        label: 'Sticky Note',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        cursor: 'crosshair'
    },
    connector: {
        label: 'Connector',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        cursor: 'crosshair'
    },
    laser: {
        label: 'Laser',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        cursor: 'none'
    },
    frame: {
        label: 'Frame',
        icon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
            className: "w-4 h-4"
        }),
        cursor: 'crosshair'
    }
};
function generateId() {
    return `dw_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}
function formatTimer(ms) {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
/* ══════════════════════════════════════════════════════════════ */ /* ── Anchor Point Helpers ──                                    */ /* ══════════════════════════════════════════════════════════════ */ function getAnchorPoints(item) {
    switch(item.type){
        case 'sticky':
        case 'rect':
        case 'frame':
            {
                const x = item.x || 0, y = item.y || 0, w = item.width || 180, h = item.height || 160;
                return {
                    top: {
                        x: x + w / 2,
                        y
                    },
                    right: {
                        x: x + w,
                        y: y + h / 2
                    },
                    bottom: {
                        x: x + w / 2,
                        y: y + h
                    },
                    left: {
                        x,
                        y: y + h / 2
                    }
                };
            }
        case 'circle':
            {
                const x = item.x || 0, y = item.y || 0, r = item.radius || 50;
                return {
                    top: {
                        x,
                        y: y - r
                    },
                    right: {
                        x: x + r,
                        y
                    },
                    bottom: {
                        x,
                        y: y + r
                    },
                    left: {
                        x: x - r,
                        y
                    }
                };
            }
        case 'diamond':
            {
                const x = item.x || 0, y = item.y || 0, hw = (item.width || 80) / 2, hh = (item.height || 80) / 2;
                return {
                    top: {
                        x,
                        y: y - hh
                    },
                    right: {
                        x: x + hw,
                        y
                    },
                    bottom: {
                        x,
                        y: y + hh
                    },
                    left: {
                        x: x - hw,
                        y
                    }
                };
            }
        case 'image':
        case 'file':
        case 'link':
            {
                const x = item.x || 0, y = item.y || 0, w = item.width || 200, h = item.height || 150;
                return {
                    top: {
                        x: x + w / 2,
                        y
                    },
                    right: {
                        x: x + w,
                        y: y + h / 2
                    },
                    bottom: {
                        x: x + w / 2,
                        y: y + h
                    },
                    left: {
                        x,
                        y: y + h / 2
                    }
                };
            }
        case 'text':
            {
                const x = item.x || 0, y = item.y || 0;
                const approxW = (item.text || '').length * (item.fontSize || 18) * 0.55;
                const approxH = (item.fontSize || 18) * 1.2;
                return {
                    top: {
                        x: x + approxW / 2,
                        y
                    },
                    right: {
                        x: x + approxW,
                        y: y + approxH / 2
                    },
                    bottom: {
                        x: x + approxW / 2,
                        y: y + approxH
                    },
                    left: {
                        x,
                        y: y + approxH / 2
                    }
                };
            }
        default:
            return {
                top: {
                    x: 0,
                    y: 0
                },
                right: {
                    x: 0,
                    y: 0
                },
                bottom: {
                    x: 0,
                    y: 0
                },
                left: {
                    x: 0,
                    y: 0
                }
            };
    }
}
function buildConnectorPath(sx, sy, sAnchor, tx, ty, tAnchor, style) {
    if (style === 'straight') {
        return [
            sx,
            sy,
            tx,
            ty
        ];
    }
    if (style === 'curved') {
        const OFFSET = 80;
        const sOffset = {
            top: {
                x: 0,
                y: -OFFSET
            },
            right: {
                x: OFFSET,
                y: 0
            },
            bottom: {
                x: 0,
                y: OFFSET
            },
            left: {
                x: -OFFSET,
                y: 0
            }
        };
        const tOffset = {
            top: {
                x: 0,
                y: -OFFSET
            },
            right: {
                x: OFFSET,
                y: 0
            },
            bottom: {
                x: 0,
                y: OFFSET
            },
            left: {
                x: -OFFSET,
                y: 0
            }
        };
        const cp1x = sx + sOffset[sAnchor].x;
        const cp1y = sy + sOffset[sAnchor].y;
        const cp2x = tx + tOffset[tAnchor].x;
        const cp2y = ty + tOffset[tAnchor].y;
        return [
            sx,
            sy,
            cp1x,
            cp1y,
            cp2x,
            cp2y,
            tx,
            ty
        ];
    }
    // Elbow - right-angle path
    const sDir = {
        top: {
            x: 0,
            y: -1
        },
        right: {
            x: 1,
            y: 0
        },
        bottom: {
            x: 0,
            y: 1
        },
        left: {
            x: -1,
            y: 0
        }
    };
    const tDir = {
        top: {
            x: 0,
            y: -1
        },
        right: {
            x: 1,
            y: 0
        },
        bottom: {
            x: 0,
            y: 1
        },
        left: {
            x: -1,
            y: 0
        }
    };
    const midX = (sx + tx) / 2;
    const midY = (sy + ty) / 2;
    const p1x = sx + sDir[sAnchor].x * Math.abs(midX - sx);
    const p1y = sy + sDir[sAnchor].y * Math.abs(midY - sy);
    const p2x = tx + tDir[tAnchor].x * Math.abs(midX - tx);
    const p2y = ty + tDir[tAnchor].y * Math.abs(midY - ty);
    return [
        sx,
        sy,
        p1x,
        p1y,
        p2x,
        p2y,
        tx,
        ty
    ];
}
function drawArrowhead(x, y, angle, size = 10) {
    const x1 = x - size * Math.cos(angle - Math.PI / 6);
    const y1 = y - size * Math.sin(angle - Math.PI / 6);
    const x2 = x - size * Math.cos(angle + Math.PI / 6);
    const y2 = y - size * Math.sin(angle + Math.PI / 6);
    return `M ${x1} ${y1} L ${x} ${y} L ${x2} ${y2}`;
}
const TEMPLATES = [
    // 1. Mind Map
    {
        name: 'Mind Map',
        icon: '🧠',
        items: (()=>{
            const cx = 400, cy = 250;
            const items = [
                {
                    id: generateId(),
                    type: 'circle',
                    x: cx,
                    y: cy,
                    radius: 60,
                    strokeColor: '#00e5a0',
                    fillColor: 'rgba(0,229,160,0.08)',
                    strokeWidth: 2,
                    opacity: 1,
                    text: 'Central Topic',
                    fontSize: 14
                },
                {
                    id: generateId(),
                    type: 'text',
                    x: cx - 45,
                    y: cy - 8,
                    text: 'Central Topic',
                    strokeColor: '#00e5a0',
                    fillColor: 'transparent',
                    strokeWidth: 1,
                    opacity: 1,
                    fontSize: 14
                }
            ];
            const branches = [
                {
                    label: 'Branch 1',
                    angle: -Math.PI / 2
                },
                {
                    label: 'Branch 2',
                    angle: -Math.PI / 6
                },
                {
                    label: 'Branch 3',
                    angle: Math.PI / 6
                },
                {
                    label: 'Branch 4',
                    angle: Math.PI / 2
                },
                {
                    label: 'Branch 5',
                    angle: Math.PI * 5 / 6
                },
                {
                    label: 'Branch 6',
                    angle: -Math.PI * 5 / 6
                }
            ];
            branches.forEach((b, i)=>{
                const ex = cx + Math.cos(b.angle) * 200;
                const ey = cy + Math.sin(b.angle) * 150;
                const rectW = 100, rectH = 40;
                items.push({
                    id: generateId(),
                    type: 'line',
                    points: [
                        cx + Math.cos(b.angle) * 60,
                        cy + Math.sin(b.angle) * 60,
                        ex - Math.cos(b.angle) * (rectW / 2),
                        ey
                    ],
                    strokeColor: '#4fc3f7',
                    fillColor: 'transparent',
                    strokeWidth: 2,
                    opacity: 0.7
                });
                items.push({
                    id: generateId(),
                    type: 'rect',
                    x: ex - rectW / 2,
                    y: ey - rectH / 2,
                    width: rectW,
                    height: rectH,
                    strokeColor: '#4fc3f7',
                    fillColor: 'rgba(79,195,247,0.08)',
                    strokeWidth: 1.5,
                    opacity: 1
                });
                items.push({
                    id: generateId(),
                    type: 'text',
                    x: ex - rectW / 2 + 12,
                    y: ey - 7,
                    text: b.label,
                    strokeColor: '#4fc3f7',
                    fillColor: 'transparent',
                    strokeWidth: 1,
                    opacity: 1,
                    fontSize: 13
                });
            });
            return items;
        })()
    },
    // 2. Kanban Board
    {
        name: 'Kanban Board',
        icon: '📋',
        items: (()=>{
            const items = [];
            const cols = [
                'To Do',
                'In Progress',
                'Review',
                'Done'
            ];
            const colW = 170, gap = 12, startX = 30, startY = 40;
            const colColors = [
                '#f59e0b',
                '#4fc3f7',
                '#8b5cf6',
                '#00e5a0'
            ];
            cols.forEach((col, i)=>{
                const x = startX + i * (colW + gap);
                // Column header
                items.push({
                    id: generateId(),
                    type: 'rect',
                    x,
                    y: startY,
                    width: colW,
                    height: 36,
                    strokeColor: colColors[i],
                    fillColor: 'rgba(0,0,0,0.3)',
                    strokeWidth: 1.5,
                    opacity: 1
                });
                items.push({
                    id: generateId(),
                    type: 'text',
                    x: x + 10,
                    y: startY + 9,
                    text: col,
                    strokeColor: colColors[i],
                    fillColor: 'transparent',
                    strokeWidth: 1,
                    opacity: 1,
                    fontSize: 14
                });
                // Two sticky notes per column
                const stickyColors = [
                    {
                        body: '#FEF3C7',
                        fold: '#FDE68A',
                        text: '#92400E'
                    },
                    {
                        body: '#DBEAFE',
                        fold: '#93C5FD',
                        text: '#1E40AF'
                    }
                ];
                stickyColors.forEach((sc, j)=>{
                    items.push({
                        id: generateId(),
                        type: 'sticky',
                        x: x + 8,
                        y: startY + 50 + j * 120,
                        width: colW - 16,
                        height: 100,
                        strokeColor: 'transparent',
                        fillColor: 'transparent',
                        strokeWidth: 1,
                        opacity: 1,
                        text: '',
                        fontSize: 12,
                        stickyColor: sc.body,
                        stickyFoldColor: sc.fold,
                        stickyTextColor: sc.text
                    });
                });
            });
            return items;
        })()
    },
    // 3. SWOT Analysis
    {
        name: 'SWOT Analysis',
        icon: '📊',
        items: (()=>{
            const items = [];
            const cx = 400, cy = 250, qw = 180, qh = 130, gap = 8;
            const positions = [
                {
                    x: cx - qw - gap / 2,
                    y: cy - qh - gap / 2,
                    label: 'Strengths',
                    color: '#00e5a0'
                },
                {
                    x: cx + gap / 2,
                    y: cy - qh - gap / 2,
                    label: 'Weaknesses',
                    color: '#ff5757'
                },
                {
                    x: cx - qw - gap / 2,
                    y: cy + gap / 2,
                    label: 'Opportunities',
                    color: '#4fc3f7'
                },
                {
                    x: cx + gap / 2,
                    y: cy + gap / 2,
                    label: 'Threats',
                    color: '#f59e0b'
                }
            ];
            positions.forEach((p)=>{
                items.push({
                    id: generateId(),
                    type: 'rect',
                    x: p.x,
                    y: p.y,
                    width: qw,
                    height: qh,
                    strokeColor: p.color,
                    fillColor: 'rgba(0,0,0,0.2)',
                    strokeWidth: 2,
                    opacity: 1
                });
                items.push({
                    id: generateId(),
                    type: 'text',
                    x: p.x + 12,
                    y: p.y + 10,
                    text: p.label,
                    strokeColor: p.color,
                    fillColor: 'transparent',
                    strokeWidth: 1,
                    opacity: 1,
                    fontSize: 16
                });
            });
            // Title
            items.push({
                id: generateId(),
                type: 'text',
                x: cx - 50,
                y: cy - qh - gap / 2 - 30,
                text: 'SWOT Analysis',
                strokeColor: '#e8ecf4',
                fillColor: 'transparent',
                strokeWidth: 1,
                opacity: 1,
                fontSize: 18
            });
            return items;
        })()
    },
    // 4. Venn Diagram
    {
        name: 'Venn Diagram',
        icon: '⭕',
        items: (()=>{
            const items = [];
            const cx = 400, cy = 260, r = 100, off = 70;
            const circles = [
                {
                    x: cx - off,
                    y: cy - 30,
                    label: 'A',
                    color: '#00e5a0'
                },
                {
                    x: cx + off,
                    y: cy - 30,
                    label: 'B',
                    color: '#4fc3f7'
                },
                {
                    x: cx,
                    y: cy + 50,
                    label: 'C',
                    color: '#8b5cf6'
                }
            ];
            circles.forEach((c)=>{
                items.push({
                    id: generateId(),
                    type: 'circle',
                    x: c.x,
                    y: c.y,
                    radius: r,
                    strokeColor: c.color,
                    fillColor: 'transparent',
                    strokeWidth: 2,
                    opacity: 0.7
                });
                items.push({
                    id: generateId(),
                    type: 'text',
                    x: c.x + (c.label === 'A' ? -40 : c.label === 'B' ? 30 : -5),
                    y: c.y - 60,
                    text: c.label,
                    strokeColor: c.color,
                    fillColor: 'transparent',
                    strokeWidth: 1,
                    opacity: 1,
                    fontSize: 18
                });
            });
            items.push({
                id: generateId(),
                type: 'text',
                x: cx - 50,
                y: cy - 170,
                text: 'Venn Diagram',
                strokeColor: '#e8ecf4',
                fillColor: 'transparent',
                strokeWidth: 1,
                opacity: 1,
                fontSize: 18
            });
            return items;
        })()
    },
    // 5. Flowchart
    {
        name: 'Flowchart',
        icon: '🔀',
        items: (()=>{
            const items = [];
            const cx = 400;
            // Start
            items.push({
                id: generateId(),
                type: 'rect',
                x: cx - 60,
                y: 30,
                width: 120,
                height: 40,
                strokeColor: '#00e5a0',
                fillColor: 'rgba(0,229,160,0.1)',
                strokeWidth: 2,
                opacity: 1
            });
            items.push({
                id: generateId(),
                type: 'text',
                x: cx - 25,
                y: 40,
                text: 'Start',
                strokeColor: '#00e5a0',
                fillColor: 'transparent',
                strokeWidth: 1,
                opacity: 1,
                fontSize: 14
            });
            // Arrow down
            items.push({
                id: generateId(),
                type: 'arrow',
                points: [
                    cx,
                    70,
                    cx,
                    100
                ],
                strokeColor: '#8b95a8',
                fillColor: '#8b95a8',
                strokeWidth: 2,
                opacity: 1
            });
            // Process
            items.push({
                id: generateId(),
                type: 'rect',
                x: cx - 80,
                y: 100,
                width: 160,
                height: 50,
                strokeColor: '#4fc3f7',
                fillColor: 'rgba(79,195,247,0.08)',
                strokeWidth: 1.5,
                opacity: 1
            });
            items.push({
                id: generateId(),
                type: 'text',
                x: cx - 40,
                y: 115,
                text: 'Process',
                strokeColor: '#4fc3f7',
                fillColor: 'transparent',
                strokeWidth: 1,
                opacity: 1,
                fontSize: 14
            });
            // Arrow down
            items.push({
                id: generateId(),
                type: 'arrow',
                points: [
                    cx,
                    150,
                    cx,
                    180
                ],
                strokeColor: '#8b95a8',
                fillColor: '#8b95a8',
                strokeWidth: 2,
                opacity: 1
            });
            // Decision (diamond shape approximated with rotated rect - use circle for simplicity)
            items.push({
                id: generateId(),
                type: 'circle',
                x: cx,
                y: 220,
                radius: 40,
                strokeColor: '#f59e0b',
                fillColor: 'rgba(245,158,11,0.08)',
                strokeWidth: 2,
                opacity: 1
            });
            items.push({
                id: generateId(),
                type: 'text',
                x: cx - 30,
                y: 213,
                text: 'Decision',
                strokeColor: '#f59e0b',
                fillColor: 'transparent',
                strokeWidth: 1,
                opacity: 1,
                fontSize: 13
            });
            // Yes branch
            items.push({
                id: generateId(),
                type: 'arrow',
                points: [
                    cx - 40,
                    220,
                    cx - 140,
                    220
                ],
                strokeColor: '#00e5a0',
                fillColor: '#00e5a0',
                strokeWidth: 2,
                opacity: 1
            });
            items.push({
                id: generateId(),
                type: 'text',
                x: cx - 110,
                y: 205,
                text: 'Yes',
                strokeColor: '#00e5a0',
                fillColor: 'transparent',
                strokeWidth: 1,
                opacity: 1,
                fontSize: 12
            });
            items.push({
                id: generateId(),
                type: 'rect',
                x: cx - 240,
                y: 200,
                width: 100,
                height: 40,
                strokeColor: '#00e5a0',
                fillColor: 'rgba(0,229,160,0.08)',
                strokeWidth: 1.5,
                opacity: 1
            });
            items.push({
                id: generateId(),
                type: 'text',
                x: cx - 222,
                y: 211,
                text: 'Action A',
                strokeColor: '#00e5a0',
                fillColor: 'transparent',
                strokeWidth: 1,
                opacity: 1,
                fontSize: 13
            });
            // No branch
            items.push({
                id: generateId(),
                type: 'arrow',
                points: [
                    cx + 40,
                    220,
                    cx + 140,
                    220
                ],
                strokeColor: '#ff5757',
                fillColor: '#ff5757',
                strokeWidth: 2,
                opacity: 1
            });
            items.push({
                id: generateId(),
                type: 'text',
                x: cx + 80,
                y: 205,
                text: 'No',
                strokeColor: '#ff5757',
                fillColor: 'transparent',
                strokeWidth: 1,
                opacity: 1,
                fontSize: 12
            });
            items.push({
                id: generateId(),
                type: 'rect',
                x: cx + 140,
                y: 200,
                width: 100,
                height: 40,
                strokeColor: '#ff5757',
                fillColor: 'rgba(255,87,87,0.08)',
                strokeWidth: 1.5,
                opacity: 1
            });
            items.push({
                id: generateId(),
                type: 'text',
                x: cx + 158,
                y: 211,
                text: 'Action B',
                strokeColor: '#ff5757',
                fillColor: 'transparent',
                strokeWidth: 1,
                opacity: 1,
                fontSize: 13
            });
            // End
            items.push({
                id: generateId(),
                type: 'arrow',
                points: [
                    cx,
                    260,
                    cx,
                    300
                ],
                strokeColor: '#8b95a8',
                fillColor: '#8b95a8',
                strokeWidth: 2,
                opacity: 1
            });
            items.push({
                id: generateId(),
                type: 'rect',
                x: cx - 60,
                y: 300,
                width: 120,
                height: 40,
                strokeColor: '#ec4899',
                fillColor: 'rgba(236,72,153,0.08)',
                strokeWidth: 2,
                opacity: 1
            });
            items.push({
                id: generateId(),
                type: 'text',
                x: cx - 22,
                y: 311,
                text: 'End',
                strokeColor: '#ec4899',
                fillColor: 'transparent',
                strokeWidth: 1,
                opacity: 1,
                fontSize: 14
            });
            return items;
        })()
    },
    // 6. Brainstorm
    {
        name: 'Brainstorm',
        icon: '💡',
        items: (()=>{
            const items = [];
            // Central topic
            items.push({
                id: generateId(),
                type: 'circle',
                x: 400,
                y: 250,
                radius: 50,
                strokeColor: '#f59e0b',
                fillColor: 'rgba(245,158,11,0.1)',
                strokeWidth: 2,
                opacity: 1
            });
            items.push({
                id: generateId(),
                type: 'text',
                x: 370,
                y: 243,
                text: 'Topic',
                strokeColor: '#f59e0b',
                fillColor: 'transparent',
                strokeWidth: 1,
                opacity: 1,
                fontSize: 16
            });
            // Scattered sticky notes
            const notePositions = [
                {
                    x: 80,
                    y: 60,
                    text: 'Idea 1',
                    color: STICKY_COLORS[0]
                },
                {
                    x: 300,
                    y: 50,
                    text: 'Idea 2',
                    color: STICKY_COLORS[1]
                },
                {
                    x: 550,
                    y: 70,
                    text: 'Idea 3',
                    color: STICKY_COLORS[2]
                },
                {
                    x: 100,
                    y: 300,
                    text: 'Idea 4',
                    color: STICKY_COLORS[3]
                },
                {
                    x: 620,
                    y: 280,
                    text: 'Idea 5',
                    color: STICKY_COLORS[4]
                },
                {
                    x: 300,
                    y: 380,
                    text: 'Idea 6',
                    color: STICKY_COLORS[5]
                }
            ];
            notePositions.forEach((n)=>{
                items.push({
                    id: generateId(),
                    type: 'sticky',
                    x: n.x,
                    y: n.y,
                    width: 140,
                    height: 100,
                    strokeColor: 'transparent',
                    fillColor: 'transparent',
                    strokeWidth: 1,
                    opacity: 1,
                    text: n.text,
                    fontSize: 13,
                    stickyColor: n.color.body,
                    stickyFoldColor: n.color.fold,
                    stickyTextColor: n.color.text
                });
            });
            items.push({
                id: generateId(),
                type: 'text',
                x: 300,
                y: 10,
                text: 'Brainstorm Session',
                strokeColor: '#e8ecf4',
                fillColor: 'transparent',
                strokeWidth: 1,
                opacity: 1,
                fontSize: 18
            });
            return items;
        })()
    },
    // 7. Weekly Planner
    {
        name: 'Weekly Planner',
        icon: '📅',
        items: (()=>{
            const items = [];
            const days = [
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat',
                'Sun'
            ];
            const colW = 100, startX = 20, startY = 50, rowH = 350;
            days.forEach((day, i)=>{
                const x = startX + i * (colW + 6);
                // Header
                items.push({
                    id: generateId(),
                    type: 'rect',
                    x,
                    y: startY,
                    width: colW,
                    height: 30,
                    strokeColor: '#4fc3f7',
                    fillColor: 'rgba(79,195,247,0.1)',
                    strokeWidth: 1.5,
                    opacity: 1
                });
                items.push({
                    id: generateId(),
                    type: 'text',
                    x: x + colW / 2 - 14,
                    y: startY + 7,
                    text: day,
                    strokeColor: '#4fc3f7',
                    fillColor: 'transparent',
                    strokeWidth: 1,
                    opacity: 1,
                    fontSize: 13
                });
                // Body
                items.push({
                    id: generateId(),
                    type: 'rect',
                    x,
                    y: startY + 30,
                    width: colW,
                    height: rowH - 30,
                    strokeColor: 'rgba(255,255,255,0.08)',
                    fillColor: 'rgba(0,0,0,0.15)',
                    strokeWidth: 1,
                    opacity: 1
                });
            });
            items.push({
                id: generateId(),
                type: 'text',
                x: 300,
                y: 15,
                text: 'Weekly Planner',
                strokeColor: '#e8ecf4',
                fillColor: 'transparent',
                strokeWidth: 1,
                opacity: 1,
                fontSize: 18
            });
            return items;
        })()
    },
    // 8. Medical Case Study
    {
        name: 'Medical Case Study',
        icon: '🏥',
        items: (()=>{
            const items = [];
            const sections = [
                {
                    x: 20,
                    y: 50,
                    w: 360,
                    h: 120,
                    label: 'Patient Information',
                    color: '#00e5a0',
                    subtext: 'Name, Age, Gender, DOB...'
                },
                {
                    x: 400,
                    y: 50,
                    w: 360,
                    h: 120,
                    label: 'Chief Complaint',
                    color: '#ff5757',
                    subtext: 'Primary symptoms...'
                },
                {
                    x: 20,
                    y: 190,
                    w: 360,
                    h: 120,
                    label: 'Symptoms & History',
                    color: '#f59e0b',
                    subtext: 'Onset, duration, severity...'
                },
                {
                    x: 400,
                    y: 190,
                    w: 360,
                    h: 120,
                    label: 'Diagnosis',
                    color: '#4fc3f7',
                    subtext: 'Assessment findings...'
                },
                {
                    x: 20,
                    y: 330,
                    w: 360,
                    h: 120,
                    label: 'Treatment Plan',
                    color: '#8b5cf6',
                    subtext: 'Medications, procedures...'
                },
                {
                    x: 400,
                    y: 330,
                    w: 360,
                    h: 120,
                    label: 'Follow-up',
                    color: '#ec4899',
                    subtext: 'Next visit, monitoring...'
                }
            ];
            sections.forEach((s)=>{
                items.push({
                    id: generateId(),
                    type: 'rect',
                    x: s.x,
                    y: s.y,
                    width: s.w,
                    height: s.h,
                    strokeColor: s.color,
                    fillColor: 'rgba(0,0,0,0.2)',
                    strokeWidth: 2,
                    opacity: 1
                });
                items.push({
                    id: generateId(),
                    type: 'text',
                    x: s.x + 12,
                    y: s.y + 10,
                    text: s.label,
                    strokeColor: s.color,
                    fillColor: 'transparent',
                    strokeWidth: 1,
                    opacity: 1,
                    fontSize: 15
                });
                items.push({
                    id: generateId(),
                    type: 'text',
                    x: s.x + 12,
                    y: s.y + 35,
                    text: s.subtext,
                    strokeColor: '#5a6478',
                    fillColor: 'transparent',
                    strokeWidth: 1,
                    opacity: 0.6,
                    fontSize: 12
                });
            });
            items.push({
                id: generateId(),
                type: 'text',
                x: 300,
                y: 15,
                text: 'Medical Case Study',
                strokeColor: '#e8ecf4',
                fillColor: 'transparent',
                strokeWidth: 1,
                opacity: 1,
                fontSize: 18
            });
            return items;
        })()
    },
    // 9. Patient Vitals Tracker
    {
        name: 'Patient Vitals Tracker',
        icon: '❤️',
        items: (()=>{
            const items = [];
            const vitals = [
                {
                    label: 'Heart Rate',
                    unit: 'bpm',
                    color: '#ff5757',
                    y: 60
                },
                {
                    label: 'Blood Pressure',
                    unit: 'mmHg',
                    color: '#4fc3f7',
                    y: 140
                },
                {
                    label: 'Temperature',
                    unit: '°F',
                    color: '#f59e0b',
                    y: 220
                },
                {
                    label: 'O2 Saturation',
                    unit: '%',
                    color: '#00e5a0',
                    y: 300
                },
                {
                    label: 'Resp. Rate',
                    unit: '/min',
                    color: '#8b5cf6',
                    y: 380
                }
            ];
            vitals.forEach((v)=>{
                // Label
                items.push({
                    id: generateId(),
                    type: 'rect',
                    x: 20,
                    y: v.y,
                    width: 160,
                    height: 55,
                    strokeColor: v.color,
                    fillColor: 'rgba(0,0,0,0.2)',
                    strokeWidth: 1.5,
                    opacity: 1
                });
                items.push({
                    id: generateId(),
                    type: 'text',
                    x: 30,
                    y: v.y + 8,
                    text: v.label,
                    strokeColor: v.color,
                    fillColor: 'transparent',
                    strokeWidth: 1,
                    opacity: 1,
                    fontSize: 14
                });
                items.push({
                    id: generateId(),
                    type: 'text',
                    x: 30,
                    y: v.y + 30,
                    text: `___ ${v.unit}`,
                    strokeColor: '#5a6478',
                    fillColor: 'transparent',
                    strokeWidth: 1,
                    opacity: 0.5,
                    fontSize: 12
                });
                // Tracking area
                items.push({
                    id: generateId(),
                    type: 'rect',
                    x: 200,
                    y: v.y,
                    width: 560,
                    height: 55,
                    strokeColor: 'rgba(255,255,255,0.06)',
                    fillColor: 'rgba(0,0,0,0.15)',
                    strokeWidth: 1,
                    opacity: 1
                });
            });
            items.push({
                id: generateId(),
                type: 'text',
                x: 280,
                y: 15,
                text: 'Patient Vitals Tracker',
                strokeColor: '#e8ecf4',
                fillColor: 'transparent',
                strokeWidth: 1,
                opacity: 1,
                fontSize: 18
            });
            return items;
        })()
    },
    // 10. Differential Diagnosis
    {
        name: 'Differential Diagnosis',
        icon: '🔍',
        items: (()=>{
            const items = [];
            const cx = 400, cy = 260;
            // Central diagnosis
            items.push({
                id: generateId(),
                type: 'circle',
                x: cx,
                y: cy,
                radius: 65,
                strokeColor: '#ff5757',
                fillColor: 'rgba(255,87,87,0.08)',
                strokeWidth: 2.5,
                opacity: 1
            });
            items.push({
                id: generateId(),
                type: 'text',
                x: cx - 55,
                y: cy - 18,
                text: 'Primary',
                strokeColor: '#ff5757',
                fillColor: 'transparent',
                strokeWidth: 1,
                opacity: 1,
                fontSize: 14
            });
            items.push({
                id: generateId(),
                type: 'text',
                x: cx - 55,
                y: cy + 2,
                text: 'Diagnosis',
                strokeColor: '#ff5757',
                fillColor: 'transparent',
                strokeWidth: 1,
                opacity: 1,
                fontSize: 14
            });
            // Branching possibilities
            const branches = [
                {
                    label: 'DDx 1: Condition A',
                    angle: -Math.PI / 2,
                    color: '#f59e0b'
                },
                {
                    label: 'DDx 2: Condition B',
                    angle: -Math.PI / 5,
                    color: '#4fc3f7'
                },
                {
                    label: 'DDx 3: Condition C',
                    angle: Math.PI / 5,
                    color: '#00e5a0'
                },
                {
                    label: 'DDx 4: Condition D',
                    angle: Math.PI / 2,
                    color: '#8b5cf6'
                },
                {
                    label: 'DDx 5: Condition E',
                    angle: Math.PI * 4 / 5,
                    color: '#ec4899'
                },
                {
                    label: 'DDx 6: Condition F',
                    angle: -Math.PI * 4 / 5,
                    color: '#fdcb6e'
                }
            ];
            branches.forEach((b)=>{
                const ex = cx + Math.cos(b.angle) * 210;
                const ey = cy + Math.sin(b.angle) * 160;
                const rectW = 150, rectH = 40;
                // Line from center
                items.push({
                    id: generateId(),
                    type: 'line',
                    points: [
                        cx + Math.cos(b.angle) * 65,
                        cy + Math.sin(b.angle) * 65,
                        ex - Math.cos(b.angle) * (rectW / 2),
                        ey
                    ],
                    strokeColor: b.color,
                    fillColor: 'transparent',
                    strokeWidth: 1.5,
                    opacity: 0.6,
                    dash: [
                        6,
                        4
                    ]
                });
                // Box
                items.push({
                    id: generateId(),
                    type: 'rect',
                    x: ex - rectW / 2,
                    y: ey - rectH / 2,
                    width: rectW,
                    height: rectH,
                    strokeColor: b.color,
                    fillColor: 'rgba(0,0,0,0.25)',
                    strokeWidth: 1.5,
                    opacity: 1
                });
                items.push({
                    id: generateId(),
                    type: 'text',
                    x: ex - rectW / 2 + 10,
                    y: ey - 7,
                    text: b.label,
                    strokeColor: b.color,
                    fillColor: 'transparent',
                    strokeWidth: 1,
                    opacity: 1,
                    fontSize: 12
                });
            });
            items.push({
                id: generateId(),
                type: 'text',
                x: 280,
                y: 15,
                text: 'Differential Diagnosis',
                strokeColor: '#e8ecf4',
                fillColor: 'transparent',
                strokeWidth: 1,
                opacity: 1,
                fontSize: 18
            });
            return items;
        })()
    }
];
/**
 * Resample a points array [x1,y1,x2,y2,...] into N evenly-spaced points.
 */ function resamplePoints(pts, numPoints = 64) {
    const points = [];
    for(let i = 0; i < pts.length - 1; i += 2){
        points.push({
            x: pts[i],
            y: pts[i + 1]
        });
    }
    if (points.length < 2) return points;
    // Calculate total path length
    let totalLen = 0;
    for(let i = 1; i < points.length; i++){
        totalLen += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
    }
    const interval = totalLen / (numPoints - 1);
    const resampled = [
        {
            ...points[0]
        }
    ];
    let accum = 0;
    for(let i = 1; i < points.length; i++){
        const d = Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
        if (accum + d >= interval) {
            const ratio = (interval - accum) / d;
            const nx = points[i - 1].x + ratio * (points[i].x - points[i - 1].x);
            const ny = points[i - 1].y + ratio * (points[i].y - points[i - 1].y);
            resampled.push({
                x: nx,
                y: ny
            });
            // Insert and re-process from this new point
            points.splice(i, 0, {
                x: nx,
                y: ny
            });
            accum = 0;
        } else {
            accum += d;
        }
        if (resampled.length >= numPoints) break;
    }
    // Pad if needed
    while(resampled.length < numPoints){
        resampled.push({
            ...resampled[resampled.length - 1]
        });
    }
    return resampled.slice(0, numPoints);
}
/**
 * Compute bounding box of points.
 */ function boundingBox(points) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of points){
        if (p.x < minX) minX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.x > maxX) maxX = p.x;
        if (p.y > maxY) maxY = p.y;
    }
    return {
        minX,
        minY,
        maxX,
        maxY,
        cx: (minX + maxX) / 2,
        cy: (minY + maxY) / 2,
        w: maxX - minX,
        h: maxY - minY
    };
}
/**
 * Calculate path perimeter.
 */ function pathLength(points) {
    let len = 0;
    for(let i = 1; i < points.length; i++){
        len += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
    }
    return len;
}
/**
 * Check how "closed" a path is: distance from last point to first point relative to bounding box diagonal.
 */ function closureRatio(points) {
    if (points.length < 2) return 0;
    const first = points[0];
    const last = points[points.length - 1];
    const bb = boundingBox(points);
    const diag = Math.hypot(bb.w, bb.h);
    if (diag === 0) return 0;
    const dist = Math.hypot(last.x - first.x, last.y - first.y);
    return 1 - Math.min(dist / diag, 1);
}
/**
 * Detect corners using angular change between segments.
 * Returns indices of corners.
 */ function detectCorners(points, angleThreshold = Math.PI / 3.5) {
    if (points.length < 3) return [];
    const corners = [];
    // Calculate angles between consecutive segments
    const angles = [];
    for(let i = 1; i < points.length - 1; i++){
        const dx1 = points[i].x - points[i - 1].x;
        const dy1 = points[i].y - points[i - 1].y;
        const dx2 = points[i + 1].x - points[i].x;
        const dy2 = points[i + 1].y - points[i].y;
        const a1 = Math.atan2(dy1, dx1);
        const a2 = Math.atan2(dy2, dx2);
        let diff = Math.abs(a2 - a1);
        if (diff > Math.PI) diff = 2 * Math.PI - diff;
        angles.push(diff);
    }
    // Find peaks (local maxima above threshold)
    const minDist = Math.max(3, Math.floor(points.length / 20));
    for(let i = 0; i < angles.length; i++){
        if (angles[i] < angleThreshold) continue;
        let isPeak = true;
        for(let j = Math.max(0, i - minDist); j <= Math.min(angles.length - 1, i + minDist); j++){
            if (j !== i && angles[j] > angles[i]) {
                isPeak = false;
                break;
            }
        }
        if (isPeak) {
            corners.push(i + 1); // +1 because angles is offset by 1
        }
    }
    // Merge corners that are too close
    if (corners.length <= 1) return corners;
    const merged = [
        corners[0]
    ];
    for(let i = 1; i < corners.length; i++){
        if (corners[i] - merged[merged.length - 1] >= minDist) {
            merged.push(corners[i]);
        } else {
            // Keep the one with higher angle
            merged[merged.length - 1] = angles[corners[i] - 1] > angles[merged[merged.length - 1] - 1] ? corners[i] : merged[merged.length - 1];
        }
    }
    return merged;
}
/**
 * Check how circular a set of points is.
 * Returns a score 0..1 where 1 is a perfect circle.
 */ function circularityScore(points) {
    if (points.length < 5) return 0;
    const bb = boundingBox(points);
    // Aspect ratio should be close to 1
    const aspectRatio = bb.w > 0 && bb.h > 0 ? Math.min(bb.w, bb.h) / Math.max(bb.w, bb.h) : 0;
    if (aspectRatio < 0.5) return 0;
    // Check distance from center — all points should be roughly same distance
    const distances = points.map((p)=>Math.hypot(p.x - bb.cx, p.y - bb.cy));
    const avgDist = distances.reduce((a, b)=>a + b, 0) / distances.length;
    if (avgDist === 0) return 0;
    const variance = distances.reduce((a, d)=>a + (d - avgDist) ** 2, 0) / distances.length;
    const stdDev = Math.sqrt(variance);
    const coefficientOfVariation = stdDev / avgDist;
    // A perfect circle would have CV = 0; we allow up to ~0.3
    const circScore = Math.max(0, 1 - coefficientOfVariation / 0.3);
    return circScore * aspectRatio;
}
/**
 * Check how rectangular a set of points is (4 corners, ~90 degree angles).
 */ function rectangularityScore(points, corners) {
    if (corners.length !== 4) return 0;
    if (points.length < 8) return 0;
    const bb = boundingBox(points);
    // Check that corners are roughly at the bounding box corners
    const bbCorners = [
        {
            x: bb.minX,
            y: bb.minY
        },
        {
            x: bb.maxX,
            y: bb.minY
        },
        {
            x: bb.maxX,
            y: bb.maxY
        },
        {
            x: bb.minX,
            y: bb.maxY
        }
    ];
    // Match each detected corner to nearest bbox corner
    let totalDist = 0;
    const usedBb = new Set();
    for (const ci of corners){
        const p = points[ci];
        let minD = Infinity;
        let minIdx = 0;
        for(let j = 0; j < 4; j++){
            if (usedBb.has(j)) continue;
            const d = Math.hypot(p.x - bbCorners[j].x, p.y - bbCorners[j].y);
            if (d < minD) {
                minD = d;
                minIdx = j;
            }
        }
        usedBb.add(minIdx);
        totalDist += minD;
    }
    const diag = Math.hypot(bb.w, bb.h);
    if (diag === 0) return 0;
    const avgDistRatio = totalDist / (4 * diag);
    // Good rect: avgDistRatio < 0.15
    return Math.max(0, 1 - avgDistRatio / 0.15);
}
/**
 * Check how triangular a set of points is (3 corners).
 */ function triangularityScore(points, corners) {
    if (corners.length !== 3) return 0;
    if (points.length < 6) return 0;
    // Check that the area of the triangle formed by the 3 corners
    // is a significant fraction of the bounding box area
    const c0 = points[corners[0]];
    const c1 = points[corners[1]];
    const c2 = points[corners[2]];
    const triArea = Math.abs((c0.x * (c1.y - c2.y) + c1.x * (c2.y - c0.y) + c2.x * (c0.y - c1.y)) / 2);
    const bbArea = Math.max(1, boundingBox(points).w * boundingBox(points).h);
    const areaRatio = triArea / bbArea;
    // A perfect inscribed triangle covers ~0.5 of bbox area
    // Acceptable range: 0.25..0.7
    if (areaRatio < 0.2) return 0;
    return Math.min(1, areaRatio / 0.4);
}
/**
 * Check how diamond-like a set of points is (4 corners but rotated 45°).
 */ function diamondnessScore(points, corners) {
    if (corners.length !== 4) return 0;
    if (points.length < 8) return 0;
    const bb = boundingBox(points);
    // For a diamond, corners should be at midpoints of bbox sides
    const diamondCorners = [
        {
            x: bb.cx,
            y: bb.minY
        },
        {
            x: bb.maxX,
            y: bb.cy
        },
        {
            x: bb.cx,
            y: bb.maxY
        },
        {
            x: bb.minX,
            y: bb.cy
        }
    ];
    let totalDist = 0;
    const usedDc = new Set();
    for (const ci of corners){
        const p = points[ci];
        let minD = Infinity;
        let minIdx = 0;
        for(let j = 0; j < 4; j++){
            if (usedDc.has(j)) continue;
            const d = Math.hypot(p.x - diamondCorners[j].x, p.y - diamondCorners[j].y);
            if (d < minD) {
                minD = d;
                minIdx = j;
            }
        }
        usedDc.add(minIdx);
        totalDist += minD;
    }
    const diag = Math.hypot(bb.w, bb.h);
    if (diag === 0) return 0;
    const avgDistRatio = totalDist / (4 * diag);
    // Also check aspect ratio — diamonds can be elongated but shouldn't be too extreme
    const aspectRatio = bb.w > 0 && bb.h > 0 ? Math.min(bb.w, bb.h) / Math.max(bb.w, bb.h) : 0;
    const score = Math.max(0, 1 - avgDistRatio / 0.15);
    return score * Math.max(0.5, aspectRatio);
}
/**
 * Check if the stroke looks like an arrow (a line with a directional tip).
 */ function arrownessScore(points) {
    if (points.length < 6) return 0;
    const bb = boundingBox(points);
    // An arrow has a long shaft and a shorter, wider head
    // Check: the path is NOT closed (low closure ratio)
    const closure = closureRatio(points);
    if (closure > 0.6) return 0;
    // Check: the stroke is roughly straight overall
    const startToEnd = Math.hypot(points[points.length - 1].x - points[0].x, points[points.length - 1].y - points[0].y);
    const perim = pathLength(points);
    if (perim === 0) return 0;
    const straightness = startToEnd / perim;
    // A perfectly straight line = 1, but an arrow has a slight bend at the tip
    // Allow straightness of 0.5-0.85 (arrow heads reduce straightness)
    if (straightness < 0.3) return 0;
    // Check: the last ~20% of the path deviates sideways (arrow head)
    const headStart = Math.floor(points.length * 0.7);
    const headPoints = points.slice(headStart);
    const shaftPoints = points.slice(0, headStart + 1);
    if (shaftPoints.length < 2 || headPoints.length < 2) return 0;
    // Shaft direction
    const shaftDx = shaftPoints[shaftPoints.length - 1].x - shaftPoints[0].x;
    const shaftDy = shaftPoints[shaftPoints.length - 1].y - shaftPoints[0].y;
    const shaftLen = Math.hypot(shaftDx, shaftDy);
    if (shaftLen === 0) return 0;
    const shaftAngle = Math.atan2(shaftDy, shaftDx);
    // Head lateral deviation
    let maxLateral = 0;
    for (const p of headPoints){
        // Project onto perpendicular of shaft direction
        const lateral = Math.abs((p.x - shaftPoints[0].x) * Math.sin(shaftAngle) - (p.y - shaftPoints[0].y) * Math.cos(shaftAngle));
        maxLateral = Math.max(maxLateral, lateral);
    }
    // The head should deviate sideways relative to the shaft width
    const diag = Math.hypot(bb.w, bb.h);
    if (diag === 0) return 0;
    const lateralRatio = maxLateral / diag;
    // Good arrow: lateral deviation is significant but not too much
    if (lateralRatio < 0.05 || lateralRatio > 0.6) return 0;
    return Math.min(1, straightness * 1.2) * Math.min(1, lateralRatio * 5);
}
/**
 * Main shape recognition function.
 * Analyzes a freeform path and returns the best matching shape.
 */ function recognizeShape(rawPoints) {
    // Need at least ~10 points to recognize anything
    const points = [];
    for(let i = 0; i < rawPoints.length - 1; i += 2){
        points.push({
            x: rawPoints[i],
            y: rawPoints[i + 1]
        });
    }
    if (points.length < 8) return null;
    const bb = boundingBox(points);
    // Too small to recognize
    if (bb.w < 20 && bb.h < 20) return null;
    const isClosed = closureRatio(points) > 0.65;
    const resampled = resamplePoints(rawPoints, 64);
    const corners = detectCorners(resampled);
    // Score each shape
    const scores = [];
    // Circle: must be closed, high circularity
    if (isClosed) {
        const circScore = circularityScore(resampled);
        if (circScore > 0.5) {
            scores.push({
                shape: 'circle',
                score: circScore,
                drawItem: {
                    type: 'circle',
                    x: bb.cx,
                    y: bb.cy,
                    radius: Math.hypot(bb.w, bb.h) / 2 * (circScore > 0.7 ? 1 : 0.9),
                    fillColor: 'transparent'
                }
            });
        }
    }
    // Rectangle: closed, 4 corners
    if (isClosed && corners.length >= 3) {
        const rectScore = rectangularityScore(resampled, corners.length === 4 ? corners : corners.slice(0, 4));
        if (rectScore > 0.5) {
            scores.push({
                shape: 'rect',
                score: rectScore,
                drawItem: {
                    type: 'rect',
                    x: bb.minX,
                    y: bb.minY,
                    width: bb.w,
                    height: bb.h,
                    fillColor: 'transparent'
                }
            });
        }
    }
    // Triangle: closed, 3 corners
    if (isClosed && corners.length >= 2) {
        const triScore = triangularityScore(resampled, corners.length === 3 ? corners : corners.slice(0, 3));
        if (triScore > 0.4) {
            // Build triangle as a line with 3 points forming a closed triangle
            const triCorners = (corners.length === 3 ? corners : corners.slice(0, 3)).map((i)=>resampled[i]);
            // Use the centroid of detected corners
            const triCx = triCorners.reduce((a, p)=>a + p.x, 0) / triCorners.length;
            const triCy = triCorners.reduce((a, p)=>a + p.y, 0) / triCorners.length;
            const triRadius = Math.max(...triCorners.map((p)=>Math.hypot(p.x - triCx, p.y - triCy)));
            // Equilateral triangle points
            const triPoints = [];
            for(let i = 0; i < 3; i++){
                const angle = -Math.PI / 2 + i * 2 * Math.PI / 3;
                triPoints.push(triCx + triRadius * Math.cos(angle), triCy + triRadius * Math.sin(angle));
            }
            // Close the triangle
            triPoints.push(triPoints[0], triPoints[1]);
            scores.push({
                shape: 'triangle',
                score: triScore,
                drawItem: {
                    type: 'line',
                    points: triPoints,
                    fillColor: 'transparent'
                }
            });
        }
    }
    // Diamond: closed, 4 corners but diamond-shaped
    if (isClosed && corners.length >= 3) {
        const diamScore = diamondnessScore(resampled, corners.length === 4 ? corners : corners.slice(0, 4));
        // Only consider diamond if it scores better than rectangle
        if (diamScore > 0.5) {
            scores.push({
                shape: 'diamond',
                score: diamScore,
                drawItem: {
                    type: 'diamond',
                    x: bb.cx,
                    y: bb.cy,
                    width: bb.w,
                    height: bb.h,
                    fillColor: 'transparent'
                }
            });
        }
    }
    // Arrow: not closed, directional
    if (!isClosed) {
        const arrScore = arrownessScore(resampled);
        if (arrScore > 0.4) {
            scores.push({
                shape: 'arrow',
                score: arrScore,
                drawItem: {
                    type: 'arrow',
                    points: [
                        points[0].x,
                        points[0].y,
                        points[points.length - 1].x,
                        points[points.length - 1].y
                    ],
                    fillColor: undefined
                }
            });
        }
    }
    // Return the best scoring shape if above threshold
    if (scores.length === 0) return null;
    scores.sort((a, b)=>b.score - a.score);
    const best = scores[0];
    if (best.score < 0.5) return null;
    return {
        shape: best.shape,
        confidence: Math.min(best.score, 1),
        drawItem: best.drawItem
    };
}
/* ══════════════════════════════════════════════════════════════ */ /* ── Injected Styles ──                                         */ /* ══════════════════════════════════════════════════════════════ */ const CHAT_WB_STYLE_ID = 'chat-whiteboard-styles';
function injectChatWbStyles() {
    if (typeof document === 'undefined') return;
    if (document.getElementById(CHAT_WB_STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = CHAT_WB_STYLE_ID;
    style.textContent = `
    @keyframes chatWbRecPulse { 0%,100% { opacity:1; } 50% { opacity:.4; } }
    .chat-wb-rec-pulse { animation: chatWbRecPulse 1s ease-in-out infinite; }
    .chat-wb-scrollbar::-webkit-scrollbar { width: 4px; }
    .chat-wb-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .chat-wb-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }
    @keyframes shapeToastIn { from { opacity:0; transform: translateY(6px) scale(0.95); } to { opacity:1; transform: translateY(0) scale(1); } }
  `;
    document.head.appendChild(style);
}
/* ══════════════════════════════════════════════════════════════ */ /* ── DrawItem Renderer ──                                       */ /* ══════════════════════════════════════════════════════════════ */ function RenderDrawItem({ item }) {
    const commonProps = {
        id: item.id,
        stroke: item.strokeColor,
        strokeWidth: item.strokeWidth,
        opacity: item.opacity
    };
    switch(item.type){
        case 'line':
        case 'freeform':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Line */ .N1, {
                ...commonProps,
                points: item.points || [],
                fill: item.fillColor !== 'transparent' ? item.fillColor : undefined,
                lineCap: "round",
                lineJoin: "round",
                tension: item.type === 'freeform' ? 0.5 : 0,
                globalCompositeOperation: item.globalCompositeOperation,
                dash: item.aiGenerated ? [
                    8,
                    4
                ] : item.dash
            });
        case 'rect':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                        ...commonProps,
                        x: item.x || 0,
                        y: item.y || 0,
                        width: item.width || 0,
                        height: item.height || 0,
                        fill: item.fillColor !== 'transparent' ? item.fillColor : undefined,
                        cornerRadius: 2
                    }),
                    item.aiGenerated && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                        x: item.x || 0,
                        y: item.y || 0,
                        width: item.width || 0,
                        height: item.height || 0,
                        stroke: "#8b5cf6",
                        strokeWidth: 1.5,
                        dash: [
                            6,
                            4
                        ],
                        cornerRadius: 2,
                        opacity: 0.5,
                        listening: false
                    }),
                    item.aiGenerated && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                        x: (item.x || 0) + 3,
                        y: (item.y || 0) + 3,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                                width: 18,
                                height: 14,
                                fill: "rgba(139,92,246,0.85)",
                                cornerRadius: 2
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                                text: "AI",
                                fontSize: 8,
                                fill: "white",
                                x: 2,
                                y: 2,
                                fontStyle: "bold",
                                listening: false
                            })
                        ]
                    })
                ]
            });
        case 'circle':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Circle */ .jl, {
                        ...commonProps,
                        x: item.x || 0,
                        y: item.y || 0,
                        radius: item.radius || 0,
                        fill: item.fillColor !== 'transparent' ? item.fillColor : undefined
                    }),
                    item.aiGenerated && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Circle */ .jl, {
                        x: item.x || 0,
                        y: item.y || 0,
                        radius: item.radius || 0,
                        stroke: "#8b5cf6",
                        strokeWidth: 1.5,
                        dash: [
                            6,
                            4
                        ],
                        opacity: 0.5,
                        listening: false
                    }),
                    item.aiGenerated && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                        x: (item.x || 0) - 8,
                        y: (item.y || 0) - (item.radius || 0) - 14,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                                width: 18,
                                height: 14,
                                fill: "rgba(139,92,246,0.85)",
                                cornerRadius: 2
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                                text: "AI",
                                fontSize: 8,
                                fill: "white",
                                x: 2,
                                y: 2,
                                fontStyle: "bold",
                                listening: false
                            })
                        ]
                    })
                ]
            });
        case 'arrow':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Arrow */ .i3, {
                ...commonProps,
                points: item.points || [],
                fill: item.strokeColor,
                pointerLength: 10,
                pointerWidth: 8,
                lineCap: "round",
                lineJoin: "round",
                dash: item.aiGenerated ? [
                    8,
                    4
                ] : undefined
            });
        case 'text':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                        id: item.id,
                        x: item.x || 0,
                        y: item.y || 0,
                        text: item.text || '',
                        fontSize: item.fontSize || 18,
                        fontFamily: item.fontFamily || 'Arial',
                        fill: item.strokeColor,
                        opacity: item.opacity
                    }),
                    item.aiGenerated && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                        x: (item.x || 0) - 1,
                        y: (item.y || 0) - 12,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                                width: 14,
                                height: 10,
                                fill: "rgba(139,92,246,0.85)",
                                cornerRadius: 2
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                                text: "AI",
                                fontSize: 6,
                                fill: "white",
                                x: 1,
                                y: 1,
                                fontStyle: "bold",
                                listening: false
                            })
                        ]
                    })
                ]
            });
        case 'diamond':
            {
                const cx = item.x || 0;
                const cy = item.y || 0;
                const hw = (item.width || 0) / 2;
                const hh = (item.height || 0) / 2;
                const diamondPath = `M ${cx} ${cy - hh} L ${cx + hw} ${cy} L ${cx} ${cy + hh} L ${cx - hw} ${cy} Z`;
                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Path */ .wA, {
                            ...commonProps,
                            data: diamondPath,
                            fill: item.fillColor !== 'transparent' ? item.fillColor : undefined
                        }),
                        item.aiGenerated && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Path */ .wA, {
                            data: diamondPath,
                            stroke: "#8b5cf6",
                            strokeWidth: 1.5,
                            dash: [
                                6,
                                4
                            ],
                            opacity: 0.5,
                            listening: false
                        }),
                        item.aiGenerated && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                            x: cx - hw + 3,
                            y: cy - hh + 3,
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                                    width: 18,
                                    height: 14,
                                    fill: "rgba(139,92,246,0.85)",
                                    cornerRadius: 2
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                                    text: "AI",
                                    fontSize: 8,
                                    fill: "white",
                                    x: 2,
                                    y: 2,
                                    fontStyle: "bold",
                                    listening: false
                                })
                            ]
                        })
                    ]
                });
            }
        case 'frame':
            // Frames are rendered separately via FrameShape component
            return null;
        case 'image':
            // Images are rendered separately via ImageShape component
            return null;
        case 'file':
            // File cards are rendered separately via FileCardShape component
            return null;
        case 'link':
            // Link cards are rendered separately via LinkCardShape component
            return null;
        default:
            return null;
    }
}
function ConnectorShape({ item, allItems, isSelected, onSelect, onDelete }) {
    const sourceItem = allItems.find((i)=>i.id === item.sourceId);
    const targetItem = allItems.find((i)=>i.id === item.targetId);
    if (!sourceItem || !targetItem) return null;
    const sourceAnchors = getAnchorPoints(sourceItem);
    const targetAnchors = getAnchorPoints(targetItem);
    const sAnchor = item.sourceAnchor || 'right';
    const tAnchor = item.targetAnchor || 'left';
    const sp = sourceAnchors[sAnchor];
    const tp = targetAnchors[tAnchor];
    if (!sp || !tp) return null;
    const style = item.connectorStyle || 'curved';
    const points = buildConnectorPath(sp.x, sp.y, sAnchor, tp.x, tp.y, tAnchor, style);
    const arrowhead = item.showArrowhead || 'end';
    const strokeColor = item.strokeColor || '#4fc3f7';
    // Compute angles for arrowheads
    const endAngle = points.length >= 4 ? Math.atan2(points[points.length - 1] - points[points.length - 3], points[points.length - 2] - points[points.length - 4]) : 0;
    const startAngle = points.length >= 4 ? Math.atan2(points[1] - points[3], points[0] - points[2]) : 0;
    // Build SVG path data for arrowheads
    const endArrowData = arrowhead === 'end' || arrowhead === 'both' ? drawArrowhead(tp.x, tp.y, endAngle) : '';
    const startArrowData = arrowhead === 'start' || arrowhead === 'both' ? drawArrowhead(sp.x, sp.y, startAngle) : '';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
        onClick: (e)=>{
            e.cancelBubble = true;
            onSelect(item.id);
        },
        onTap: (e)=>{
            e.cancelBubble = true;
            onSelect(item.id);
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Line */ .N1, {
                points: points,
                stroke: "transparent",
                strokeWidth: 14,
                lineCap: "round",
                lineJoin: "round",
                tension: style === 'curved' ? 0.5 : 0
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Line */ .N1, {
                id: item.id,
                name: "connector-line",
                points: points,
                stroke: isSelected ? '#00e5a0' : strokeColor,
                strokeWidth: isSelected ? 3 : 2,
                lineCap: "round",
                lineJoin: "round",
                tension: style === 'curved' ? 0.5 : 0,
                dash: item.aiGenerated ? [
                    8,
                    4
                ] : item.dash || undefined,
                opacity: 0.85
            }),
            endArrowData && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Path */ .wA, {
                data: endArrowData,
                fill: isSelected ? '#00e5a0' : strokeColor
            }),
            startArrowData && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Path */ .wA, {
                data: startArrowData,
                fill: isSelected ? '#00e5a0' : strokeColor
            }),
            item.aiGenerated && !isSelected && (()=>{
                const midIdx = Math.floor(points.length / 2);
                const midX = midIdx % 2 === 0 ? points[midIdx] : (points[midIdx - 1] + points[midIdx + 1]) / 2;
                const midY = midIdx % 2 === 1 ? points[midIdx] : (points[midIdx - 1] + points[midIdx + 1]) / 2;
                // Fallback for simpler point arrays
                const bx = points.length >= 4 ? (points[0] + points[points.length - 2]) / 2 : 0;
                const by = points.length >= 4 ? (points[1] + points[points.length - 1]) / 2 : 0;
                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                    x: bx - 8,
                    y: by - 6,
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                            width: 16,
                            height: 12,
                            fill: "rgba(139,92,246,0.85)",
                            cornerRadius: 2
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                            text: "AI",
                            fontSize: 7,
                            fill: "white",
                            x: 1,
                            y: 1,
                            fontStyle: "bold",
                            listening: false
                        })
                    ]
                });
            })(),
            isSelected && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Circle */ .jl, {
                x: sp.x,
                y: sp.y,
                radius: 5,
                fill: "#00e5a0"
            }),
            isSelected && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Circle */ .jl, {
                x: tp.x,
                y: tp.y,
                radius: 5,
                fill: "#00e5a0"
            })
        ]
    });
}
function ImageShape({ item, isSelected, onSelect, onDragEnd, onResizeEnd, onDelete }) {
    const [image, setImage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [hovered, setHovered] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const groupRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!item.src) return;
        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = ()=>setImage(img);
        img.onerror = ()=>console.warn('Failed to load image:', item.src);
        img.src = item.src;
    }, [
        item.src
    ]);
    const w = item.width || 200;
    const h = item.height || 150;
    const rot = item.rotation || 0;
    const origAspect = image ? image.width / image.height : 1;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
        ref: groupRef,
        x: item.x || 0,
        y: item.y || 0,
        rotation: rot,
        offsetX: 0,
        offsetY: 0,
        draggable: true,
        onClick: (e)=>{
            e.cancelBubble = true;
            onSelect(item.id);
        },
        onTap: (e)=>{
            e.cancelBubble = true;
            onSelect(item.id);
        },
        onDragEnd: (e)=>{
            e.cancelBubble = true;
            onDragEnd(item.id, e.target.x(), e.target.y());
        },
        onMouseEnter: ()=>setHovered(true),
        onMouseLeave: ()=>setHovered(false),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                x: 3,
                y: 3,
                width: w,
                height: h,
                fill: "rgba(0,0,0,0.3)",
                cornerRadius: 4
            }),
            image && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Image */ ._V, {
                image: image,
                width: w,
                height: h,
                cornerRadius: 4
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                width: w,
                height: h,
                stroke: isSelected ? '#00e5a0' : hovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
                strokeWidth: isSelected ? 2 : 1,
                cornerRadius: 4,
                listening: false
            }),
            isSelected && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                x: w - 6,
                y: h - 6,
                draggable: true,
                onDragEnd: (e)=>{
                    e.cancelBubble = true;
                    const dx = e.target.x();
                    const dy = e.target.y();
                    // Maintain aspect ratio
                    const newW = Math.max(40, w + dx);
                    const newH = newW / origAspect;
                    onResizeEnd(item.id, newW, newH);
                    e.target.position({
                        x: w - 6,
                        y: h - 6
                    });
                },
                onDragMove: (e)=>{
                    e.cancelBubble = true;
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                        width: 12,
                        height: 12,
                        fill: "transparent"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                        x: 1,
                        y: 1,
                        width: 10,
                        height: 10,
                        fill: "#00e5a0",
                        cornerRadius: 2,
                        opacity: 0.9
                    })
                ]
            }),
            (isSelected || hovered) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                x: w - 4,
                y: -12,
                onClick: (e)=>{
                    e.cancelBubble = true;
                    onDelete(item.id);
                },
                onTap: (e)=>{
                    e.cancelBubble = true;
                    onDelete(item.id);
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                        width: 16,
                        height: 16,
                        fill: "rgba(255,87,87,0.85)",
                        cornerRadius: 3
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                        text: "\xd7",
                        fontSize: 12,
                        fill: "white",
                        x: 3,
                        y: 0,
                        listening: false
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                x: 4,
                y: 4,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                        width: 20,
                        height: 14,
                        fill: "rgba(0,0,0,0.6)",
                        cornerRadius: 2
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                        text: "IMG",
                        fontSize: 7,
                        fill: "white",
                        x: 2,
                        y: 2,
                        fontStyle: "bold",
                        listening: false
                    })
                ]
            })
        ]
    });
}
function FileCardShape({ item, isSelected, onSelect, onDragEnd, onDelete }) {
    const [hovered, setHovered] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const w = item.width || 200;
    const h = item.height || 80;
    const fileName = item.fileName || 'Unknown file';
    const fileSize = item.fileSize || 0;
    const fileType = item.fileType || '';
    const fileUrl = item.fileUrl || '#';
    const formatSize = (bytes)=>{
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };
    const getFileIcon = ()=>{
        if (fileType.startsWith('image/')) return '🖼';
        if (fileType.startsWith('video/')) return '🎬';
        if (fileType.startsWith('audio/')) return '🎵';
        if (fileType.includes('pdf')) return '📄';
        if (fileType.includes('zip') || fileType.includes('rar')) return '📦';
        if (fileType.includes('word') || fileType.includes('document')) return '📝';
        if (fileType.includes('sheet') || fileType.includes('excel')) return '📊';
        if (fileType.includes('presentation') || fileType.includes('powerpoint')) return '📑';
        return '📎';
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
        x: item.x || 0,
        y: item.y || 0,
        draggable: true,
        onClick: (e)=>{
            e.cancelBubble = true;
            onSelect(item.id);
        },
        onTap: (e)=>{
            e.cancelBubble = true;
            onSelect(item.id);
        },
        onDragEnd: (e)=>{
            e.cancelBubble = true;
            onDragEnd(item.id, e.target.x(), e.target.y());
        },
        onMouseEnter: ()=>setHovered(true),
        onMouseLeave: ()=>setHovered(false),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                x: 2,
                y: 2,
                width: w,
                height: h,
                fill: "rgba(0,0,0,0.2)",
                cornerRadius: 8
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                width: w,
                height: h,
                fill: "rgba(30,33,44,0.95)",
                stroke: isSelected ? '#00e5a0' : hovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)',
                strokeWidth: isSelected ? 2 : 1,
                cornerRadius: 8
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                x: 8,
                y: 12,
                width: 44,
                height: 44,
                fill: "rgba(79,195,247,0.1)",
                cornerRadius: 6
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                text: getFileIcon(),
                fontSize: 20,
                x: 16,
                y: 20,
                listening: false
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                text: fileName.length > 22 ? fileName.substring(0, 20) + '…' : fileName,
                fontSize: 12,
                fill: "#e8ecf4",
                fontStyle: "bold",
                x: 60,
                y: 16,
                listening: false
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                text: `${formatSize(fileSize)} • ${fileType.split('/').pop()?.toUpperCase() || 'FILE'}`,
                fontSize: 10,
                fill: "#5a6478",
                x: 60,
                y: 34,
                listening: false
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                text: "Click to download",
                fontSize: 9,
                fill: "#4fc3f7",
                x: 60,
                y: 52,
                listening: false
            }),
            (isSelected || hovered) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                x: w - 4,
                y: -12,
                onClick: (e)=>{
                    e.cancelBubble = true;
                    onDelete(item.id);
                },
                onTap: (e)=>{
                    e.cancelBubble = true;
                    onDelete(item.id);
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                        width: 16,
                        height: 16,
                        fill: "rgba(255,87,87,0.85)",
                        cornerRadius: 3
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                        text: "\xd7",
                        fontSize: 12,
                        fill: "white",
                        x: 3,
                        y: 0,
                        listening: false
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                width: w,
                height: h,
                fill: "transparent",
                onDblClick: (e)=>{
                    e.cancelBubble = true;
                    if (fileUrl && fileUrl !== '#') {
                        window.open(fileUrl, '_blank');
                    }
                },
                onDblTap: (e)=>{
                    e.cancelBubble = true;
                    if (fileUrl && fileUrl !== '#') {
                        window.open(fileUrl, '_blank');
                    }
                }
            })
        ]
    });
}
function LinkCardShape({ item, isSelected, onSelect, onDragEnd, onDelete }) {
    const [hovered, setHovered] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [faviconImg, setFaviconImg] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const w = item.width || 260;
    const h = item.height || 90;
    const title = item.linkTitle || item.linkUrl || 'Link';
    const description = item.linkDescription || '';
    const favicon = item.linkFavicon || '';
    const url = item.linkUrl || '';
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!favicon) return;
        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = ()=>setFaviconImg(img);
        img.onerror = ()=>{}; // ignore favicon load errors
        img.src = favicon;
    }, [
        favicon
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
        x: item.x || 0,
        y: item.y || 0,
        draggable: true,
        onClick: (e)=>{
            e.cancelBubble = true;
            onSelect(item.id);
        },
        onTap: (e)=>{
            e.cancelBubble = true;
            onSelect(item.id);
        },
        onDragEnd: (e)=>{
            e.cancelBubble = true;
            onDragEnd(item.id, e.target.x(), e.target.y());
        },
        onMouseEnter: ()=>setHovered(true),
        onMouseLeave: ()=>setHovered(false),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                x: 2,
                y: 2,
                width: w,
                height: h,
                fill: "rgba(0,0,0,0.2)",
                cornerRadius: 8
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                width: w,
                height: h,
                fill: "rgba(30,33,44,0.95)",
                stroke: isSelected ? '#00e5a0' : hovered ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.06)',
                strokeWidth: isSelected ? 2 : 1,
                cornerRadius: 8
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                width: 4,
                height: h,
                fill: "#8b5cf6",
                cornerRadius: [
                    8,
                    0,
                    0,
                    8
                ]
            }),
            faviconImg ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Image */ ._V, {
                image: faviconImg,
                x: 14,
                y: 10,
                width: 20,
                height: 20
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                x: 14,
                y: 10,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                        width: 20,
                        height: 20,
                        fill: "rgba(139,92,246,0.15)",
                        cornerRadius: 4
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                        text: "\uD83D\uDD17",
                        fontSize: 11,
                        x: 3,
                        y: 2,
                        listening: false
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                text: title.length > 35 ? title.substring(0, 33) + '…' : title,
                fontSize: 12,
                fill: "#e8ecf4",
                fontStyle: "bold",
                x: 42,
                y: 12,
                width: w - 52,
                listening: false
            }),
            description && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                text: description.length > 60 ? description.substring(0, 58) + '…' : description,
                fontSize: 10,
                fill: "#8b95a8",
                x: 42,
                y: 30,
                width: w - 52,
                listening: false
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                text: url.length > 45 ? url.substring(0, 43) + '…' : url,
                fontSize: 9,
                fill: "#4fc3f7",
                x: 42,
                y: h - 24,
                width: w - 52,
                listening: false
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                x: w - 22,
                y: h - 22,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                        width: 14,
                        height: 14,
                        fill: "rgba(79,195,247,0.1)",
                        cornerRadius: 3
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                        text: "↗",
                        fontSize: 10,
                        fill: "#4fc3f7",
                        x: 2,
                        y: 0,
                        listening: false
                    })
                ]
            }),
            (isSelected || hovered) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                x: w - 4,
                y: -12,
                onClick: (e)=>{
                    e.cancelBubble = true;
                    onDelete(item.id);
                },
                onTap: (e)=>{
                    e.cancelBubble = true;
                    onDelete(item.id);
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                        width: 16,
                        height: 16,
                        fill: "rgba(255,87,87,0.85)",
                        cornerRadius: 3
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                        text: "\xd7",
                        fontSize: 12,
                        fill: "white",
                        x: 3,
                        y: 0,
                        listening: false
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                width: w,
                height: h,
                fill: "transparent",
                onDblClick: (e)=>{
                    e.cancelBubble = true;
                    if (url) window.open(url, '_blank');
                },
                onDblTap: (e)=>{
                    e.cancelBubble = true;
                    if (url) window.open(url, '_blank');
                }
            })
        ]
    });
}
function StickyNoteShape({ item, isEditing, isSelected, onDragEnd, onDoubleClick, onDelete, onResizeStart, onSelect, voteCount = 0, isVotingCandidate = false, hasLocalVote = false, votingPhase = 'idle', onCastVote, voteRank = null }) {
    const [hovered, setHovered] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const FOLD = 18;
    const w = item.width || 180;
    const h = item.height || 160;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
        id: item.id,
        name: "sticky-group",
        x: item.x || 0,
        y: item.y || 0,
        draggable: true,
        onDragEnd: (e)=>{
            e.cancelBubble = true;
            onDragEnd(item.id, e.target.x(), e.target.y());
        },
        onMouseEnter: ()=>setHovered(true),
        onMouseLeave: ()=>setHovered(false),
        onDblClick: (e)=>{
            e.cancelBubble = true;
            onDoubleClick(item.id);
        },
        onClick: (e)=>{
            e.cancelBubble = true;
            onSelect(item.id);
        },
        onTap: (e)=>{
            e.cancelBubble = true;
            onSelect(item.id);
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                x: 4,
                y: 4,
                width: w,
                height: h,
                fill: "rgba(0,0,0,0.18)",
                cornerRadius: 3,
                listening: false
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                width: w,
                height: h,
                fill: item.stickyColor || '#FEF3C7',
                cornerRadius: 3
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Line */ .N1, {
                points: [
                    w - FOLD,
                    0,
                    w,
                    0,
                    w,
                    FOLD
                ],
                fill: item.stickyFoldColor || '#FDE68A',
                closed: true,
                listening: false
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Line */ .N1, {
                points: [
                    w - FOLD,
                    0,
                    w - FOLD + 5,
                    FOLD - 5,
                    w,
                    FOLD
                ],
                stroke: "rgba(0,0,0,0.08)",
                strokeWidth: 1,
                listening: false
            }),
            !isEditing && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                x: 14,
                y: 14,
                width: w - 28,
                height: h - 28,
                text: item.text || 'Double-click to edit',
                fontSize: item.fontSize || 14,
                fontFamily: item.fontFamily || 'Arial',
                fill: item.stickyTextColor || '#92400E',
                lineHeight: 1.4,
                wrap: "word",
                fontStyle: item.text ? 'normal' : 'italic',
                opacity: item.text ? 1 : 0.45,
                listening: false
            }),
            isSelected && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                width: w,
                height: h,
                stroke: "#00e5a0",
                strokeWidth: 2,
                dash: [
                    6,
                    3
                ],
                cornerRadius: 3,
                listening: false
            }),
            item.aiGenerated && !isSelected && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                width: w,
                height: h,
                stroke: "#8b5cf6",
                strokeWidth: 1.5,
                dash: [
                    6,
                    4
                ],
                cornerRadius: 3,
                listening: false,
                opacity: 0.5
            }),
            item.aiGenerated && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                x: 4,
                y: h - 18,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                        width: 18,
                        height: 14,
                        fill: "rgba(139,92,246,0.85)",
                        cornerRadius: 2
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                        text: "AI",
                        fontSize: 8,
                        fill: "white",
                        x: 2,
                        y: 2,
                        fontStyle: "bold",
                        listening: false
                    })
                ]
            }),
            isVotingCandidate && votingPhase === 'active' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                width: w,
                height: h,
                stroke: hasLocalVote ? '#f59e0b' : '#fbbf24',
                strokeWidth: hasLocalVote ? 3 : 2,
                dash: hasLocalVote ? undefined : [
                    8,
                    4
                ],
                cornerRadius: 3,
                listening: false,
                opacity: hasLocalVote ? 0.9 : 0.6
            }),
            isVotingCandidate && (votingPhase === 'active' || votingPhase === 'ended') && voteCount > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                x: -6,
                y: -6,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Circle */ .jl, {
                        radius: 12,
                        fill: hasLocalVote ? '#f59e0b' : 'rgba(245,158,11,0.8)'
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                        text: `${voteCount}`,
                        fontSize: 10,
                        fill: "white",
                        fontStyle: "bold",
                        x: voteCount >= 10 ? -6 : -3,
                        y: -4,
                        listening: false
                    })
                ]
            }),
            votingPhase === 'ended' && voteRank !== null && voteRank <= 3 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                x: w - 22,
                y: -8,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Circle */ .jl, {
                        radius: 10,
                        fill: voteRank === 1 ? '#f59e0b' : voteRank === 2 ? '#94a3b8' : '#cd7f32'
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                        text: `${voteRank}`,
                        fontSize: 10,
                        fill: "white",
                        fontStyle: "bold",
                        x: -3,
                        y: -4,
                        listening: false
                    })
                ]
            }),
            isVotingCandidate && votingPhase === 'active' && !hasLocalVote && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                width: w,
                height: h,
                fill: "transparent",
                onClick: (e)=>{
                    e.cancelBubble = true;
                    onCastVote?.(item.id);
                },
                onTap: (e)=>{
                    e.cancelBubble = true;
                    onCastVote?.(item.id);
                }
            }),
            hovered && !isEditing && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                x: w - 24,
                y: 4,
                onClick: (e)=>{
                    e.cancelBubble = true;
                    onDelete(item.id);
                },
                onTap: (e)=>{
                    e.cancelBubble = true;
                    onDelete(item.id);
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Circle */ .jl, {
                        radius: 9,
                        fill: "rgba(0,0,0,0.18)"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                        text: "✕",
                        fontSize: 11,
                        fill: "rgba(0,0,0,0.55)",
                        x: -4,
                        y: -5
                    })
                ]
            }),
            hovered && !isEditing && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                x: w - 14,
                y: h - 14,
                onMouseDown: (e)=>{
                    e.cancelBubble = true;
                    onResizeStart(item.id);
                },
                onTouchStart: (e)=>{
                    e.cancelBubble = true;
                    onResizeStart(item.id);
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                        width: 14,
                        height: 14,
                        fill: "transparent"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Line */ .N1, {
                        points: [
                            4,
                            10,
                            10,
                            4
                        ],
                        stroke: "rgba(0,0,0,0.25)",
                        strokeWidth: 2,
                        lineCap: "round"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Line */ .N1, {
                        points: [
                            7,
                            10,
                            10,
                            7
                        ],
                        stroke: "rgba(0,0,0,0.25)",
                        strokeWidth: 2,
                        lineCap: "round"
                    })
                ]
            })
        ]
    });
}
function FrameShape({ item, isSelected, onSelect, onDragEnd, onDoubleClick, onDelete, onResizeEnd }) {
    const [hovered, setHovered] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const w = item.width || 800;
    const h = item.height || 600;
    const title = item.frameTitle || 'Untitled Slide';
    const bgColor = item.frameBgColor || 'rgba(26,29,39,0.5)';
    const HANDLE_SIZE = 8;
    const handleResizeDragMove = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((corner, e)=>{
        e.cancelBubble = true;
        const node = e.target;
        const dx = node.x();
        const dy = node.y();
        let newX = item.x || 0;
        let newY = item.y || 0;
        let newW = w;
        let newH = h;
        switch(corner){
            case 'tl':
                newX = (item.x || 0) + dx;
                newY = (item.y || 0) + dy;
                newW = w - dx;
                newH = h - dy;
                break;
            case 'tr':
                newY = (item.y || 0) + dy;
                newW = w + dx;
                newH = h - dy;
                break;
            case 'bl':
                newX = (item.x || 0) + dx;
                newW = w - dx;
                newH = h + dy;
                break;
            case 'br':
                newW = w + dx;
                newH = h + dy;
                break;
        }
        // Minimum size
        if (newW < 100) {
            newW = 100;
            if (corner === 'tl' || corner === 'bl') newX = (item.x || 0) + w - 100;
        }
        if (newH < 80) {
            newH = 80;
            if (corner === 'tl' || corner === 'tr') newY = (item.y || 0) + h - 80;
        }
        node.x(0);
        node.y(0);
        onResizeEnd(item.id, newX, newY, newW, newH);
    }, [
        item,
        w,
        h,
        onResizeEnd
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
        id: item.id,
        name: "frame-group",
        x: item.x || 0,
        y: item.y || 0,
        draggable: true,
        onDragEnd: (e)=>{
            e.cancelBubble = true;
            onDragEnd(item.id, e.target.x(), e.target.y());
        },
        onMouseEnter: ()=>setHovered(true),
        onMouseLeave: ()=>setHovered(false),
        onClick: (e)=>{
            e.cancelBubble = true;
            onSelect(item.id);
        },
        onTap: (e)=>{
            e.cancelBubble = true;
            onSelect(item.id);
        },
        onDblClick: (e)=>{
            e.cancelBubble = true;
            onDoubleClick(item.id);
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                width: w,
                height: h,
                fill: bgColor,
                cornerRadius: 4
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                width: w,
                height: h,
                stroke: isSelected ? '#00e5a0' : 'rgba(255,255,255,0.2)',
                strokeWidth: isSelected ? 2 : 1.5,
                dash: [
                    8,
                    4
                ],
                cornerRadius: 4
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                x: 8,
                y: -22,
                height: 20,
                width: Math.max(title.length * 8 + 16, 60),
                fill: isSelected ? '#00e5a0' : 'rgba(255,255,255,0.1)',
                cornerRadius: 4
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                x: 14,
                y: -18,
                text: title,
                fontSize: 11,
                fontFamily: "Arial",
                fill: isSelected ? '#000' : '#8b95a8',
                fontStyle: "bold",
                listening: false
            }),
            item.frameNotes && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                x: w - 28,
                y: -20,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Circle */ .jl, {
                        radius: 8,
                        fill: "rgba(245,158,11,0.2)",
                        stroke: "#f59e0b",
                        strokeWidth: 1
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                        x: -4,
                        y: -5,
                        text: "N",
                        fontSize: 10,
                        fill: "#f59e0b",
                        fontStyle: "bold",
                        listening: false
                    })
                ]
            }),
            hovered && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                x: w - 20,
                y: 4,
                onClick: (e)=>{
                    e.cancelBubble = true;
                    onDelete(item.id);
                },
                onTap: (e)=>{
                    e.cancelBubble = true;
                    onDelete(item.id);
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Circle */ .jl, {
                        radius: 9,
                        fill: "rgba(255,87,87,0.2)"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                        text: "✕",
                        fontSize: 11,
                        fill: "rgba(255,87,87,0.8)",
                        x: -4,
                        y: -5
                    })
                ]
            }),
            isSelected && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                        x: -HANDLE_SIZE / 2,
                        y: -HANDLE_SIZE / 2,
                        width: HANDLE_SIZE,
                        height: HANDLE_SIZE,
                        fill: "#00e5a0",
                        stroke: "#fff",
                        strokeWidth: 1,
                        cornerRadius: 2,
                        draggable: true,
                        onDragMove: (e)=>handleResizeDragMove('tl', e),
                        onDragEnd: (e)=>{
                            e.cancelBubble = true;
                        },
                        onMouseEnter: (e)=>{
                            const stage = e.target.getStage();
                            if (stage) stage.container().style.cursor = 'nwse-resize';
                        },
                        onMouseLeave: (e)=>{
                            const stage = e.target.getStage();
                            if (stage) stage.container().style.cursor = 'crosshair';
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                        x: w - HANDLE_SIZE / 2,
                        y: -HANDLE_SIZE / 2,
                        width: HANDLE_SIZE,
                        height: HANDLE_SIZE,
                        fill: "#00e5a0",
                        stroke: "#fff",
                        strokeWidth: 1,
                        cornerRadius: 2,
                        draggable: true,
                        onDragMove: (e)=>handleResizeDragMove('tr', e),
                        onDragEnd: (e)=>{
                            e.cancelBubble = true;
                        },
                        onMouseEnter: (e)=>{
                            const stage = e.target.getStage();
                            if (stage) stage.container().style.cursor = 'nesw-resize';
                        },
                        onMouseLeave: (e)=>{
                            const stage = e.target.getStage();
                            if (stage) stage.container().style.cursor = 'crosshair';
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                        x: -HANDLE_SIZE / 2,
                        y: h - HANDLE_SIZE / 2,
                        width: HANDLE_SIZE,
                        height: HANDLE_SIZE,
                        fill: "#00e5a0",
                        stroke: "#fff",
                        strokeWidth: 1,
                        cornerRadius: 2,
                        draggable: true,
                        onDragMove: (e)=>handleResizeDragMove('bl', e),
                        onDragEnd: (e)=>{
                            e.cancelBubble = true;
                        },
                        onMouseEnter: (e)=>{
                            const stage = e.target.getStage();
                            if (stage) stage.container().style.cursor = 'nesw-resize';
                        },
                        onMouseLeave: (e)=>{
                            const stage = e.target.getStage();
                            if (stage) stage.container().style.cursor = 'crosshair';
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                        x: w - HANDLE_SIZE / 2,
                        y: h - HANDLE_SIZE / 2,
                        width: HANDLE_SIZE,
                        height: HANDLE_SIZE,
                        fill: "#00e5a0",
                        stroke: "#fff",
                        strokeWidth: 1,
                        cornerRadius: 2,
                        draggable: true,
                        onDragMove: (e)=>handleResizeDragMove('br', e),
                        onDragEnd: (e)=>{
                            e.cancelBubble = true;
                        },
                        onMouseEnter: (e)=>{
                            const stage = e.target.getStage();
                            if (stage) stage.container().style.cursor = 'nwse-resize';
                        },
                        onMouseLeave: (e)=>{
                            const stage = e.target.getStage();
                            if (stage) stage.container().style.cursor = 'crosshair';
                        }
                    })
                ]
            })
        ]
    });
}
/* ══════════════════════════════════════════════════════════════ */ /* ── Anchor Points Overlay ──                                   */ /* ══════════════════════════════════════════════════════════════ */ function AnchorPointsOverlay({ item, onAnchorClick }) {
    const anchors = getAnchorPoints(item);
    const anchorPositions = [
        'top',
        'right',
        'bottom',
        'left'
    ];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: anchorPositions.map((pos)=>{
            const pt = anchors[pos];
            if (!pt || pt.x === 0 && pt.y === 0) return null;
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Circle */ .jl, {
                x: pt.x,
                y: pt.y,
                radius: 6,
                fill: "#00e5a0",
                stroke: "#fff",
                strokeWidth: 1.5,
                opacity: 0.9,
                name: `anchor-${pos}`,
                onClick: (e)=>{
                    e.cancelBubble = true;
                    onAnchorClick(item.id, pos);
                },
                onTap: (e)=>{
                    e.cancelBubble = true;
                    onAnchorClick(item.id, pos);
                },
                onMouseEnter: (e)=>{
                    const stage = e.target.getStage();
                    if (stage) stage.container().style.cursor = 'pointer';
                },
                onMouseLeave: (e)=>{
                    const stage = e.target.getStage();
                    if (stage) stage.container().style.cursor = 'crosshair';
                }
            }, `${item.id}-anchor-${pos}`);
        })
    });
}
/* ══════════════════════════════════════════════════════════════ */ /* ── Template Panel ──                                          */ /* ══════════════════════════════════════════════════════════════ */ function TemplatePanel({ open, onClose, onApply }) {
    if (!open) return null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "absolute top-0 right-0 bottom-0 z-30 flex",
        style: {
            pointerEvents: 'auto'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "absolute inset-0",
                style: {
                    background: 'rgba(0,0,0,0.4)'
                },
                onClick: onClose
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative ml-auto flex flex-col",
                style: {
                    width: '320px',
                    background: 'rgba(21,24,33,0.98)',
                    borderLeft: '1px solid rgba(255,255,255,0.06)'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between px-4 py-3",
                        style: {
                            borderBottom: '1px solid rgba(255,255,255,0.06)'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                        className: "w-4 h-4 text-[#00e5a0]"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-sm font-semibold text-[#e8ecf4]",
                                        children: "Templates"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: onClose,
                                className: "p-1 rounded-lg hover:bg-white/[0.06] transition-colors",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                    className: "w-4 h-4 text-[#8b95a8]"
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex-1 overflow-y-auto chat-wb-scrollbar p-3",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "grid grid-cols-2 gap-3",
                            children: TEMPLATES.map((tpl, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    onClick: ()=>{
                                        // Regenerate IDs for the template items
                                        const newItems = tpl.items.map((item)=>({
                                                ...item,
                                                id: generateId()
                                            }));
                                        onApply(newItems);
                                    },
                                    className: "flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all hover:bg-white/[0.04] text-left",
                                    style: {
                                        border: '1px solid rgba(255,255,255,0.06)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "w-full rounded-md flex items-center justify-center",
                                            style: {
                                                background: CANVAS_BG,
                                                height: '80px',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            },
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                style: {
                                                    fontSize: '32px',
                                                    opacity: 0.7
                                                },
                                                children: tpl.icon
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-[11px] text-[#8b95a8] text-center leading-tight",
                                            children: tpl.name
                                        })
                                    ]
                                }, idx))
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "px-4 py-2",
                        style: {
                            borderTop: '1px solid rgba(255,255,255,0.06)'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "text-[10px] text-[#5a6478]",
                            children: "Clicking a template replaces the current canvas content."
                        })
                    })
                ]
            })
        ]
    });
}
/* ══════════════════════════════════════════════════════════════ */ /* ── Minimap Component ──                                       */ /* ══════════════════════════════════════════════════════════════ */ function Minimap({ items, zoomLevel, stagePos, dimensions, onJumpTo }) {
    const minimapW = 180;
    const minimapH = 120;
    const minimapRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { resolvedTheme } = (0,_lib_hooks_use_theme__WEBPACK_IMPORTED_MODULE_4__/* .useTheme */ .D)();
    const minimapBg = resolvedTheme === 'light' ? 'rgba(248, 250, 252, 0.95)' : 'rgba(26,29,39,0.9)';
    // Calculate content bounds
    const bounds = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        let minX = -100, minY = -100, maxX = dimensions.width + 100, maxY = dimensions.height + 100;
        items.forEach((item)=>{
            if (item.type === 'sticky' || item.type === 'rect' || item.type === 'frame') {
                minX = Math.min(minX, item.x || 0);
                minY = Math.min(minY, item.y || 0);
                maxX = Math.max(maxX, (item.x || 0) + (item.width || 0));
                maxY = Math.max(maxY, (item.y || 0) + (item.height || 0));
            } else if (item.type === 'circle') {
                minX = Math.min(minX, (item.x || 0) - (item.radius || 0));
                minY = Math.min(minY, (item.y || 0) - (item.radius || 0));
                maxX = Math.max(maxX, (item.x || 0) + (item.radius || 0));
                maxY = Math.max(maxY, (item.y || 0) + (item.radius || 0));
            } else if (item.type === 'text') {
                const approxW = (item.text || '').length * (item.fontSize || 18) * 0.55;
                minX = Math.min(minX, item.x || 0);
                minY = Math.min(minY, item.y || 0);
                maxX = Math.max(maxX, (item.x || 0) + approxW);
                maxY = Math.max(maxY, (item.y || 0) + (item.fontSize || 18) * 1.2);
            } else if (item.type === 'line' || item.type === 'freeform' || item.type === 'arrow') {
                const pts = item.points || [];
                for(let i = 0; i < pts.length; i += 2){
                    minX = Math.min(minX, pts[i]);
                    minY = Math.min(minY, pts[i + 1]);
                    maxX = Math.max(maxX, pts[i]);
                    maxY = Math.max(maxY, pts[i + 1]);
                }
            }
        });
        return {
            minX,
            minY,
            maxX,
            maxY
        };
    }, [
        items,
        dimensions
    ]);
    // Scale factors
    const contentW = bounds.maxX - bounds.minX || 1;
    const contentH = bounds.maxY - bounds.minY || 1;
    const scale = Math.min(minimapW / contentW, minimapH / contentH);
    // Draw minimap
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const canvas = minimapRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, minimapW, minimapH);
        // Background
        ctx.fillStyle = minimapBg;
        ctx.fillRect(0, 0, minimapW, minimapH);
        const offsetX = (minimapW - contentW * scale) / 2;
        const offsetY = (minimapH - contentH * scale) / 2;
        const toMiniX = (wx)=>(wx - bounds.minX) * scale + offsetX;
        const toMiniY = (wy)=>(wy - bounds.minY) * scale + offsetY;
        // Draw items as simple shapes
        items.forEach((item)=>{
            ctx.save();
            if (item.type === 'frame') {
                // Frames drawn as dashed outlines in minimap
                ctx.strokeStyle = '#8b5cf6';
                ctx.lineWidth = 1;
                ctx.setLineDash([
                    3,
                    2
                ]);
                ctx.strokeRect(toMiniX(item.x || 0), toMiniY(item.y || 0), (item.width || 0) * scale, (item.height || 0) * scale);
                ctx.setLineDash([]);
                ctx.fillStyle = 'rgba(139,92,246,0.08)';
                ctx.fillRect(toMiniX(item.x || 0), toMiniY(item.y || 0), (item.width || 0) * scale, (item.height || 0) * scale);
            } else if (item.type === 'sticky' || item.type === 'rect') {
                ctx.fillStyle = item.type === 'sticky' ? item.stickyColor || '#FEF3C7' : item.fillColor !== 'transparent' ? item.fillColor : 'rgba(255,255,255,0.1)';
                ctx.strokeStyle = item.strokeColor;
                ctx.lineWidth = 0.5;
                ctx.fillRect(toMiniX(item.x || 0), toMiniY(item.y || 0), (item.width || 0) * scale, (item.height || 0) * scale);
                ctx.strokeRect(toMiniX(item.x || 0), toMiniY(item.y || 0), (item.width || 0) * scale, (item.height || 0) * scale);
            } else if (item.type === 'circle') {
                ctx.strokeStyle = item.strokeColor;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.arc(toMiniX(item.x || 0), toMiniY(item.y || 0), (item.radius || 0) * scale, 0, Math.PI * 2);
                ctx.stroke();
            } else if (item.type === 'line' || item.type === 'freeform' || item.type === 'arrow') {
                const pts = item.points || [];
                if (pts.length >= 4) {
                    ctx.strokeStyle = item.strokeColor;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(toMiniX(pts[0]), toMiniY(pts[1]));
                    for(let i = 2; i < pts.length; i += 2){
                        ctx.lineTo(toMiniX(pts[i]), toMiniY(pts[i + 1]));
                    }
                    ctx.stroke();
                }
            } else if (item.type === 'text') {
                ctx.fillStyle = item.strokeColor;
                ctx.fillRect(toMiniX(item.x || 0), toMiniY(item.y || 0), 2, 1);
            }
            ctx.restore();
        });
        // Draw viewport rectangle
        const vpLeft = -stagePos.x / zoomLevel;
        const vpTop = -stagePos.y / zoomLevel;
        const vpRight = vpLeft + dimensions.width / zoomLevel;
        const vpBottom = vpTop + dimensions.height / zoomLevel;
        ctx.strokeStyle = '#00e5a0';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(toMiniX(vpLeft), toMiniY(vpTop), (vpRight - vpLeft) * scale, (vpBottom - vpTop) * scale);
        // Semi-transparent fill for viewport
        ctx.fillStyle = 'rgba(0,229,160,0.05)';
        ctx.fillRect(toMiniX(vpLeft), toMiniY(vpTop), (vpRight - vpLeft) * scale, (vpBottom - vpTop) * scale);
    }, [
        items,
        zoomLevel,
        stagePos,
        dimensions,
        bounds,
        contentW,
        contentH,
        scale,
        minimapBg
    ]);
    // Click to jump
    const handleClick = (e)=>{
        const canvas = minimapRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        const offsetX = (minimapW - contentW * scale) / 2;
        const offsetY = (minimapH - contentH * scale) / 2;
        const worldX = (clickX - offsetX) / scale + bounds.minX;
        const worldY = (clickY - offsetY) / scale + bounds.minY;
        onJumpTo(worldX, worldY);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("canvas", {
        ref: minimapRef,
        width: minimapW,
        height: minimapH,
        onClick: handleClick,
        style: {
            position: 'absolute',
            bottom: 8,
            right: 8,
            width: minimapW,
            height: minimapH,
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            cursor: 'pointer',
            zIndex: 20,
            background: 'rgba(26,29,39,0.95)'
        },
        title: "Click to jump to location"
    });
}
/* ══════════════════════════════════════════════════════════════ */ /* ── Remote Cursor Shape (Konva) ──                             */ /* ══════════════════════════════════════════════════════════════ */ const CURSOR_ARROW_PATH = 'M 0 0 L 0 18 L 5 14 L 9 22 L 12 20 L 8 12 L 14 12 Z';
/** Small tool-icon shapes for remote cursor badges */ const TOOL_BADGE_PATHS = {
    pen: 'M 3 12 L 6 3 L 7 3 L 4 12 Z M 2 12 L 8 12 L 8 13 L 2 13 Z',
    highlighter: 'M 3 6 L 8 6 L 8 11 L 3 11 Z M 2 11 L 9 11 L 9 12 L 2 12 Z',
    eraser: 'M 2 7 L 9 7 L 9 12 L 2 12 Z',
    rectangle: 'M 2 4 L 10 4 L 10 11 L 2 11 Z',
    circle: 'M 6 4 A 4 4 0 1 1 6 4.01 Z',
    line: 'M 2 11 L 10 4',
    arrow: 'M 2 11 L 10 4 M 6 4 L 10 4 L 10 8',
    text: 'M 3 4 L 9 4 M 6 4 L 6 12 M 4 12 L 8 12',
    sticky: 'M 3 3 L 10 3 L 10 11 L 3 11 Z',
    connector: 'M 2 10 L 6 4 L 10 10',
    laser: 'M 6 2 L 6 12 M 2 6 L 10 6',
    frame: 'M 2 3 L 10 3 L 10 11 L 2 11 Z M 4 1 L 8 1'
};
function RemoteCursorShape({ cursor }) {
    const name = cursor.userName || 'User';
    const initials = name.split(' ').map((n)=>n[0]).join('').toUpperCase().slice(0, 2);
    const color = cursor.color || '#4fc3f7';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
        x: cursor.x,
        y: cursor.y,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Path */ .wA, {
                data: CURSOR_ARROW_PATH,
                fill: color,
                stroke: "rgba(0,0,0,0.4)",
                strokeWidth: 0.5
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                x: 14,
                y: 10,
                width: Math.max(name.length * 7 + 12, 38),
                height: 18,
                fill: color,
                cornerRadius: 3,
                stroke: "rgba(0,0,0,0.2)",
                strokeWidth: 0.5
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                x: 17,
                y: 12,
                text: name,
                fontSize: 10,
                fontFamily: "Arial",
                fill: "#000000",
                fontStyle: "bold",
                listening: false
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                x: 1,
                y: 18,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Circle */ .jl, {
                        radius: 8,
                        fill: color,
                        stroke: "rgba(0,0,0,0.3)",
                        strokeWidth: 0.5,
                        opacity: 0.9
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Path */ .wA, {
                        data: TOOL_BADGE_PATHS[cursor.tool] || TOOL_BADGE_PATHS.pen,
                        fill: "#000000",
                        opacity: 0.7,
                        scale: {
                            x: 0.7,
                            y: 0.7
                        },
                        x: -5,
                        y: -5,
                        listening: false
                    })
                ]
            })
        ]
    });
}
/* ══════════════════════════════════════════════════════════════ */ /* ── Laser Pointer Shape (Konva) ──                             */ /* ══════════════════════════════════════════════════════════════ */ const LASER_TRAIL_LIFETIME = 1500; // ms before a trail point fully fades
const LASER_DOT_RADIUS = 6;
const LASER_GLOW_RADIUS = 18;
const LASER_TRAIL_MAX_POINTS = 60;
/** Render a single laser pointer with pulsing dot, glow, and fading trail */ function LaserPointerShape({ points, color = '#ff5757', name }) {
    const now = Date.now();
    // Filter out expired trail points
    const livePoints = points.filter((p)=>now - p.timestamp < LASER_TRAIL_LIFETIME);
    if (livePoints.length === 0) return null;
    const latest = livePoints[livePoints.length - 1];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
        children: [
            livePoints.map((p, i)=>{
                const age = now - p.timestamp;
                const progress = age / LASER_TRAIL_LIFETIME; // 0 → 1
                const opacity = Math.max(0, 1 - progress) * 0.6;
                const radius = Math.max(1, LASER_DOT_RADIUS * 0.5 * (1 - progress * 0.6));
                // Trail color shifts from the laser color toward orange/yellow as it fades
                const trailColor = i === livePoints.length - 1 ? color : blendTrailColor(color, progress);
                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Circle */ .jl, {
                    x: p.x,
                    y: p.y,
                    radius: radius,
                    fill: trailColor,
                    opacity: opacity,
                    listening: false
                }, `trail-${i}-${p.timestamp}`);
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Circle */ .jl, {
                x: latest.x,
                y: latest.y,
                radius: LASER_GLOW_RADIUS,
                fill: color,
                opacity: 0.15,
                listening: false
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Circle */ .jl, {
                x: latest.x,
                y: latest.y,
                radius: LASER_DOT_RADIUS + 4,
                fill: color,
                opacity: 0.3,
                listening: false
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Circle */ .jl, {
                x: latest.x,
                y: latest.y,
                radius: LASER_DOT_RADIUS,
                fill: color,
                opacity: 1,
                listening: false
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Circle */ .jl, {
                x: latest.x,
                y: latest.y,
                radius: LASER_DOT_RADIUS * 0.4,
                fill: "#ffffff",
                opacity: 0.85,
                listening: false
            }),
            name && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                        x: latest.x + 14,
                        y: latest.y - 8,
                        width: Math.max(name.length * 7 + 12, 38),
                        height: 16,
                        fill: color,
                        cornerRadius: 3,
                        opacity: 0.85
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                        x: latest.x + 17,
                        y: latest.y - 6,
                        text: name,
                        fontSize: 9,
                        fontFamily: "Arial",
                        fill: "#ffffff",
                        fontStyle: "bold",
                        listening: false
                    })
                ]
            })
        ]
    });
}
/** Blend a hex color toward orange as it fades, for the trail effect */ function blendTrailColor(hexColor, progress) {
    // Target: warm orange #ff6b35
    const r1 = parseInt(hexColor.slice(1, 3), 16);
    const g1 = parseInt(hexColor.slice(3, 5), 16);
    const b1 = parseInt(hexColor.slice(5, 7), 16);
    const r2 = 255, g2 = 107, b2 = 53;
    const t = progress * 0.7; // don't fully blend, just tint
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
function VoteConfigModal({ items, onStart, onClose }) {
    const [title, setTitle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('Team Vote');
    const [votesPerUser, setVotesPerUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(3);
    const [timeLimit, setTimeLimit] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0); // 0 = no limit
    const [selectedIds, setSelectedIds] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Set());
    // Only show voteable items: sticky, rect, circle, text
    const voteableItems = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>items.filter((i)=>[
                'sticky',
                'rect',
                'circle',
                'diamond',
                'image',
                'file',
                'link',
                'text'
            ].includes(i.type)), [
        items
    ]);
    const toggleItem = (id)=>{
        setSelectedIds((prev)=>{
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };
    const selectAll = ()=>setSelectedIds(new Set(voteableItems.map((i)=>i.id)));
    const deselectAll = ()=>setSelectedIds(new Set());
    const handleStart = ()=>{
        if (!title.trim()) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Please enter a vote title.');
            return;
        }
        if (selectedIds.size < 2) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Select at least 2 items to vote on.');
            return;
        }
        onStart({
            id: `vote_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
            title: title.trim(),
            votesPerUser: Math.max(1, votesPerUser),
            timeLimitSeconds: Math.max(0, timeLimit),
            candidateItemIds: Array.from(selectedIds),
            createdBy: 'local',
            createdAt: Date.now()
        });
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "absolute inset-0 flex items-center justify-center z-40",
        style: {
            background: 'rgba(0,0,0,0.55)'
        },
        onClick: (e)=>{
            if (e.target === e.currentTarget) onClose();
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "rounded-xl p-5 w-[520px] max-w-[92vw] max-h-[80vh] flex flex-col",
            style: {
                background: 'rgba(26,29,39,0.98)',
                border: '1px solid rgba(245,158,11,0.25)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(245,158,11,0.08)'
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center justify-between mb-4",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                    className: "w-5 h-5 text-[#f59e0b]"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-sm font-semibold text-[#e8ecf4]",
                                    children: "Start a Vote"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: onClose,
                            className: "p-1 rounded-md hover:bg-white/[0.06] transition-colors",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                className: "w-4 h-4 text-[#8b95a8]"
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "mb-3",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                            className: "text-[11px] text-[#5a6478] mb-1 block",
                            children: "Vote Title"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                            value: title,
                            onChange: (e)=>setTitle(e.target.value),
                            className: "w-full bg-[rgba(0,0,0,0.3)] border border-white/10 rounded-lg px-3 py-2 text-sm text-[#e8ecf4] outline-none focus:border-[#f59e0b]/40",
                            placeholder: "e.g., Prioritize Ideas"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex gap-4 mb-3",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                    className: "text-[11px] text-[#5a6478] mb-1 block",
                                    children: "Votes per Person"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        1,
                                        2,
                                        3,
                                        5
                                    ].map((n)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            onClick: ()=>setVotesPerUser(n),
                                            className: `w-9 h-9 rounded-lg text-sm font-medium transition-all ${votesPerUser === n ? 'ring-1 ring-[#f59e0b] text-[#f59e0b]' : 'text-[#8b95a8]'}`,
                                            style: {
                                                background: votesPerUser === n ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.04)'
                                            },
                                            children: n
                                        }, n))
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                    className: "text-[11px] text-[#5a6478] mb-1 block",
                                    children: "Time Limit (seconds)"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        0,
                                        30,
                                        60,
                                        120
                                    ].map((n)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            onClick: ()=>setTimeLimit(n),
                                            className: `px-2.5 h-9 rounded-lg text-xs font-medium transition-all ${timeLimit === n ? 'ring-1 ring-[#f59e0b] text-[#f59e0b]' : 'text-[#8b95a8]'}`,
                                            style: {
                                                background: timeLimit === n ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.04)'
                                            },
                                            children: n === 0 ? 'None' : `${n}s`
                                        }, n))
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "mb-3",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center justify-between mb-1.5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                    className: "text-[11px] text-[#5a6478]",
                                    children: [
                                        "Items to Vote On (",
                                        selectedIds.size,
                                        " selected)"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            onClick: selectAll,
                                            className: "text-[10px] text-[#4fc3f7] hover:underline",
                                            children: "All"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            onClick: deselectAll,
                                            className: "text-[10px] text-[#ff5757] hover:underline",
                                            children: "None"
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-col gap-1 max-h-[200px] overflow-y-auto chat-wb-scrollbar pr-1",
                            children: [
                                voteableItems.length === 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "text-[11px] text-[#5a6478] py-4 text-center",
                                    children: "No voteable items on canvas. Add sticky notes or shapes first."
                                }),
                                voteableItems.map((item)=>{
                                    const isSelected = selectedIds.has(item.id);
                                    const label = item.type === 'sticky' ? item.text || 'Empty note' : item.type === 'text' ? item.text || 'Text' : item.type === 'rect' ? `Rectangle` : `Circle`;
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>toggleItem(item.id),
                                        className: `flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all ${isSelected ? 'ring-1 ring-[#f59e0b]' : ''}`,
                                        style: {
                                            background: isSelected ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.02)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: `w-4 h-4 rounded flex items-center justify-center ${isSelected ? 'bg-[#f59e0b]' : 'border border-white/15'}`,
                                                children: isSelected && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                                                    className: "w-3 h-3 text-black"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-xs text-[#e8ecf4] truncate flex-1",
                                                children: label
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[9px] text-[#5a6478]",
                                                children: item.type
                                            })
                                        ]
                                    }, item.id);
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center justify-between mt-2",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                            className: "text-[10px] text-[#5a6478]",
                            children: [
                                selectedIds.size,
                                " items selected, ",
                                votesPerUser,
                                " vote",
                                votesPerUser > 1 ? 's' : '',
                                " each",
                                timeLimit > 0 ? `, ${timeLimit}s limit` : ''
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: onClose,
                                    className: "px-3 py-1.5 rounded-lg text-xs font-medium text-[#8b95a8] hover:bg-white/[0.06] transition-colors",
                                    children: "Cancel"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    onClick: handleStart,
                                    disabled: selectedIds.size < 2 || !title.trim(),
                                    className: "flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
                                    style: {
                                        background: 'rgba(245,158,11,0.2)',
                                        color: '#fbbf24',
                                        border: '1px solid rgba(245,158,11,0.3)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5"
                                        }),
                                        " Start Vote"
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
/* ══════════════════════════════════════════════════════════════ */ /* ── PDF Export Dialog ──                                        */ /* ══════════════════════════════════════════════════════════════ */ const PDF_PAGE_SIZES = {
    a4: {
        label: 'A4 (210 × 297 mm)',
        w: 595,
        h: 842
    },
    letter: {
        label: 'Letter (8.5 × 11 in)',
        w: 612,
        h: 792
    },
    custom: {
        label: 'Custom',
        w: 800,
        h: 600
    }
};
function ExportPdfDialog({ open, onClose, onExport, frameCount, itemCount, exporting, progress }) {
    const [config, setConfig] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        pageSize: 'a4',
        orientation: 'landscape',
        customWidth: 800,
        customHeight: 600,
        includeGrid: false,
        framesAsPages: true,
        margin: 20,
        quality: 'vector'
    });
    if (!open) return null;
    const pageDim = config.pageSize === 'custom' ? {
        w: config.customWidth,
        h: config.customHeight
    } : PDF_PAGE_SIZES[config.pageSize];
    const effectiveW = config.orientation === 'landscape' ? Math.max(pageDim.w, pageDim.h) : pageDim.w;
    const effectiveH = config.orientation === 'landscape' ? Math.min(pageDim.w, pageDim.h) : pageDim.h;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "absolute inset-0 z-50 flex items-center justify-center",
        style: {
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(6px)'
        },
        onClick: (e)=>{
            if (!exporting && e.target === e.currentTarget) onClose();
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "rounded-2xl shadow-2xl w-[440px] max-h-[90vh] overflow-y-auto chat-wb-scrollbar",
            style: {
                background: 'rgba(21,24,33,0.99)',
                border: '1px solid rgba(255,255,255,0.1)'
            },
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center justify-between px-5 py-4",
                    style: {
                        borderBottom: '1px solid rgba(255,255,255,0.06)'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2.5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-8 h-8 rounded-lg flex items-center justify-center",
                                    style: {
                                        background: 'rgba(79,195,247,0.15)'
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                                        className: "w-4.5 h-4.5 text-[#4fc3f7]"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                            className: "text-sm font-bold text-[#e8ecf4]",
                                            children: "Export as PDF"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                            className: "text-[10px] text-[#5a6478]",
                                            children: [
                                                itemCount,
                                                " items • ",
                                                frameCount,
                                                " frame",
                                                frameCount !== 1 ? 's' : ''
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        !exporting && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: onClose,
                            className: "p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                className: "w-4 h-4 text-[#5a6478]"
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "px-5 py-4 space-y-4",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                    className: "text-[11px] font-semibold text-[#8b95a8] uppercase tracking-wider block mb-2",
                                    children: "Page Size"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex gap-2",
                                    children: [
                                        'a4',
                                        'letter',
                                        'custom'
                                    ].map((sz)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            onClick: ()=>setConfig((c)=>({
                                                        ...c,
                                                        pageSize: sz
                                                    })),
                                            className: `flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${config.pageSize === sz ? 'ring-1 ring-[#4fc3f7]' : ''}`,
                                            style: {
                                                background: config.pageSize === sz ? 'rgba(79,195,247,0.12)' : 'rgba(255,255,255,0.03)',
                                                color: config.pageSize === sz ? '#4fc3f7' : '#8b95a8',
                                                border: `1px solid ${config.pageSize === sz ? 'rgba(79,195,247,0.2)' : 'rgba(255,255,255,0.06)'}`
                                            },
                                            children: PDF_PAGE_SIZES[sz].label.split(' (')[0]
                                        }, sz))
                                })
                            ]
                        }),
                        config.pageSize === 'custom' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-[10px] text-[#5a6478] block mb-1",
                                            children: "Width (px)"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                            type: "number",
                                            value: config.customWidth,
                                            onChange: (e)=>setConfig((c)=>({
                                                        ...c,
                                                        customWidth: Math.max(200, parseInt(e.target.value) || 200)
                                                    })),
                                            className: "w-full px-2.5 py-1.5 rounded-lg text-xs outline-none",
                                            style: {
                                                background: 'rgba(255,255,255,0.04)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                color: 'var(--medq-text, #e8ecf4)'
                                            }
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-[10px] text-[#5a6478] block mb-1",
                                            children: "Height (px)"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                            type: "number",
                                            value: config.customHeight,
                                            onChange: (e)=>setConfig((c)=>({
                                                        ...c,
                                                        customHeight: Math.max(200, parseInt(e.target.value) || 200)
                                                    })),
                                            className: "w-full px-2.5 py-1.5 rounded-lg text-xs outline-none",
                                            style: {
                                                background: 'rgba(255,255,255,0.04)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                color: 'var(--medq-text, #e8ecf4)'
                                            }
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                    className: "text-[11px] font-semibold text-[#8b95a8] uppercase tracking-wider block mb-2",
                                    children: "Orientation"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex gap-2",
                                    children: [
                                        'portrait',
                                        'landscape'
                                    ].map((o)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            onClick: ()=>setConfig((c)=>({
                                                        ...c,
                                                        orientation: o
                                                    })),
                                            className: `flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${config.orientation === o ? 'ring-1 ring-[#4fc3f7]' : ''}`,
                                            style: {
                                                background: config.orientation === o ? 'rgba(79,195,247,0.12)' : 'rgba(255,255,255,0.03)',
                                                color: config.orientation === o ? '#4fc3f7' : '#8b95a8',
                                                border: `1px solid ${config.orientation === o ? 'rgba(79,195,247,0.2)' : 'rgba(255,255,255,0.06)'}`
                                            },
                                            children: [
                                                o === 'portrait' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "w-4 h-5 rounded-sm border-2 border-current"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "w-5 h-4 rounded-sm border-2 border-current"
                                                }),
                                                o.charAt(0).toUpperCase() + o.slice(1)
                                            ]
                                        }, o))
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                    className: "text-[11px] font-semibold text-[#8b95a8] uppercase tracking-wider block mb-2",
                                    children: "Export Quality"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            onClick: ()=>setConfig((c)=>({
                                                        ...c,
                                                        quality: 'vector'
                                                    })),
                                            className: `flex-1 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${config.quality === 'vector' ? 'ring-1 ring-[#00e5a0]' : ''}`,
                                            style: {
                                                background: config.quality === 'vector' ? 'rgba(0,229,160,0.08)' : 'rgba(255,255,255,0.03)',
                                                color: config.quality === 'vector' ? '#00e5a0' : '#8b95a8',
                                                border: `1px solid ${config.quality === 'vector' ? 'rgba(0,229,160,0.2)' : 'rgba(255,255,255,0.06)'}`
                                            },
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "font-bold",
                                                    children: "Vector"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "text-[9px] opacity-70 mt-0.5",
                                                    children: "Crisp text & shapes at any scale"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            onClick: ()=>setConfig((c)=>({
                                                        ...c,
                                                        quality: 'raster'
                                                    })),
                                            className: `flex-1 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${config.quality === 'raster' ? 'ring-1 ring-[#f59e0b]' : ''}`,
                                            style: {
                                                background: config.quality === 'raster' ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.03)',
                                                color: config.quality === 'raster' ? '#f59e0b' : '#8b95a8',
                                                border: `1px solid ${config.quality === 'raster' ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.06)'}`
                                            },
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "font-bold",
                                                    children: "Raster"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "text-[9px] opacity-70 mt-0.5",
                                                    children: "Screenshot-based, faster export"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        frameCount > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center justify-between py-1",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "text-xs font-medium text-[#e8ecf4]",
                                            children: "Frames as Pages"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "text-[10px] text-[#5a6478]",
                                            children: "Each frame becomes a separate page"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: ()=>setConfig((c)=>({
                                                ...c,
                                                framesAsPages: !c.framesAsPages
                                            })),
                                    className: "p-0.5",
                                    children: config.framesAsPages ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                        className: "w-8 h-5 text-[#00e5a0]"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                                        className: "w-8 h-5 text-[#5a6478]"
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center justify-between py-1",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "text-xs font-medium text-[#e8ecf4]",
                                            children: "Include Grid"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "text-[10px] text-[#5a6478]",
                                            children: "Draw dot grid on each page"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: ()=>setConfig((c)=>({
                                                ...c,
                                                includeGrid: !c.includeGrid
                                            })),
                                    className: "p-0.5",
                                    children: config.includeGrid ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                        className: "w-8 h-5 text-[#00e5a0]"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                                        className: "w-8 h-5 text-[#5a6478]"
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center justify-between mb-1.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                            className: "text-[11px] font-semibold text-[#8b95a8] uppercase tracking-wider",
                                            children: "Margin"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "text-xs text-[#e8ecf4] font-mono",
                                            children: [
                                                config.margin,
                                                "px"
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                    type: "range",
                                    min: 0,
                                    max: 60,
                                    step: 5,
                                    value: config.margin,
                                    onChange: (e)=>setConfig((c)=>({
                                                ...c,
                                                margin: parseInt(e.target.value)
                                            })),
                                    className: "w-full h-1.5 rounded-full appearance-none cursor-pointer",
                                    style: {
                                        background: 'rgba(255,255,255,0.08)'
                                    }
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex justify-between text-[9px] text-[#5a6478] mt-1",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            children: "0px"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            children: "30px"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            children: "60px"
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "rounded-lg p-3",
                            style: {
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.04)'
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "text-[10px] text-[#5a6478] mb-2",
                                    children: "Preview"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex justify-center",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "rounded border-2 border-dashed relative",
                                        style: {
                                            width: Math.min(160, effectiveW / 5),
                                            height: Math.min(120, effectiveH / 5),
                                            borderColor: 'rgba(79,195,247,0.3)',
                                            background: 'white'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "absolute rounded-sm",
                                                style: {
                                                    top: config.margin / 5,
                                                    left: config.margin / 5,
                                                    right: config.margin / 5,
                                                    bottom: config.margin / 5,
                                                    border: '1px solid rgba(79,195,247,0.15)'
                                                }
                                            }),
                                            config.includeGrid && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "absolute inset-0 opacity-20",
                                                style: {
                                                    backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.3) 1px, transparent 1px)',
                                                    backgroundSize: '8px 8px'
                                                }
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "text-[9px] text-[#5a6478] text-center mt-2",
                                    children: [
                                        effectiveW,
                                        " \xd7 ",
                                        effectiveH,
                                        " pt • ",
                                        config.orientation
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                exporting && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "px-5 py-3",
                    style: {
                        borderTop: '1px solid rgba(255,255,255,0.06)'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2 mb-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                    className: "w-3.5 h-3.5 text-[#4fc3f7] animate-spin"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "text-xs text-[#4fc3f7] font-medium",
                                    children: [
                                        "Exporting... ",
                                        Math.round(progress),
                                        "%"
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-full h-1.5 rounded-full overflow-hidden",
                            style: {
                                background: 'rgba(255,255,255,0.06)'
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "h-full rounded-full transition-all duration-300",
                                style: {
                                    width: `${progress}%`,
                                    background: 'linear-gradient(90deg, #4fc3f7, #00e5a0)'
                                }
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center justify-end gap-2 px-5 py-4",
                    style: {
                        borderTop: '1px solid rgba(255,255,255,0.06)'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: onClose,
                            disabled: exporting,
                            className: "px-4 py-2 rounded-lg text-xs font-medium text-[#8b95a8] hover:bg-white/[0.06] transition-colors disabled:opacity-40",
                            children: "Cancel"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            onClick: ()=>onExport(config),
                            disabled: exporting,
                            className: "flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed",
                            style: {
                                background: 'rgba(79,195,247,0.2)',
                                color: '#4fc3f7',
                                border: '1px solid rgba(79,195,247,0.3)'
                            },
                            children: [
                                exporting ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                    className: "w-3.5 h-3.5 animate-spin"
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                    className: "w-3.5 h-3.5"
                                }),
                                "Export PDF"
                            ]
                        })
                    ]
                })
            ]
        })
    });
}
/* ── PDF vector rendering helpers ── */ function getItemBounds(item) {
    switch(item.type){
        case 'rect':
        case 'sticky':
        case 'frame':
        case 'image':
        case 'file':
        case 'link':
            return {
                x: item.x || 0,
                y: item.y || 0,
                w: item.width || 0,
                h: item.height || 0
            };
        case 'circle':
            {
                const r = item.radius || 0;
                return {
                    x: (item.x || 0) - r,
                    y: (item.y || 0) - r,
                    w: r * 2,
                    h: r * 2
                };
            }
        case 'diamond':
            {
                const hw = (item.width || 80) / 2, hh = (item.height || 80) / 2;
                return {
                    x: (item.x || 0) - hw,
                    y: (item.y || 0) - hh,
                    w: item.width || 80,
                    h: item.height || 80
                };
            }
        case 'text':
            return {
                x: item.x || 0,
                y: item.y || 0,
                w: (item.text || '').length * (item.fontSize || 18) * 0.55,
                h: (item.fontSize || 18) * 1.2
            };
        case 'line':
        case 'freeform':
        case 'arrow':
            {
                const pts = item.points || [];
                if (pts.length < 4) return null;
                let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                for(let i = 0; i < pts.length; i += 2){
                    minX = Math.min(minX, pts[i]);
                    minY = Math.min(minY, pts[i + 1]);
                    maxX = Math.max(maxX, pts[i]);
                    maxY = Math.max(maxY, pts[i + 1]);
                }
                return {
                    x: minX,
                    y: minY,
                    w: maxX - minX,
                    h: maxY - minY
                };
            }
        case 'connector':
            return null;
        default:
            return null;
    }
}
function pdfColor(color) {
    if (color === 'transparent') return 'transparent';
    if (color.startsWith('rgba')) {
        const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (m) return `#${parseInt(m[1]).toString(16).padStart(2, '0')}${parseInt(m[2]).toString(16).padStart(2, '0')}${parseInt(m[3]).toString(16).padStart(2, '0')}`;
    }
    return color;
}
function renderDrawItemToPdf(pdf, item, allItems, scale, offsetX, offsetY) {
    const tx = (x)=>x * scale + offsetX;
    const ty = (y)=>y * scale + offsetY;
    const ts = (s)=>s * scale;
    const strokeColor = pdfColor(item.strokeColor);
    const fillColor = pdfColor(item.fillColor);
    const sw = ts(item.strokeWidth);
    switch(item.type){
        case 'line':
        case 'freeform':
            {
                const pts = item.points || [];
                if (pts.length < 4) return;
                pdf.setDrawColor(strokeColor);
                pdf.setLineWidth(sw);
                pdf.setLineCap('round');
                if (item.type === 'freeform' && pts.length > 4) {
                    pdf.moveTo(tx(pts[0]), ty(pts[1]));
                    for(let i = 2; i < pts.length - 1; i += 2){
                        pdf.lineTo(tx(pts[i]), ty(pts[i + 1]));
                    }
                    pdf.stroke();
                } else {
                    for(let i = 0; i < pts.length - 2; i += 2){
                        pdf.line(tx(pts[i]), ty(pts[i + 1]), tx(pts[i + 2]), ty(pts[i + 3]));
                    }
                }
                break;
            }
        case 'rect':
            {
                const x = tx(item.x || 0), y = ty(item.y || 0);
                const w = ts(item.width || 0), h = ts(item.height || 0);
                if (fillColor !== 'transparent') {
                    pdf.setFillColor(fillColor);
                    pdf.setDrawColor(strokeColor);
                    pdf.setLineWidth(sw);
                    pdf.rect(x, y, w, h, 'FD');
                } else {
                    pdf.setDrawColor(strokeColor);
                    pdf.setLineWidth(sw);
                    pdf.rect(x, y, w, h, 'S');
                }
                break;
            }
        case 'circle':
            {
                const cx = tx(item.x || 0), cy = ty(item.y || 0);
                const r = ts(item.radius || 0);
                if (fillColor !== 'transparent') {
                    pdf.setFillColor(fillColor);
                    pdf.setDrawColor(strokeColor);
                    pdf.setLineWidth(sw);
                    pdf.circle(cx, cy, r, 'FD');
                } else {
                    pdf.setDrawColor(strokeColor);
                    pdf.setLineWidth(sw);
                    pdf.circle(cx, cy, r, 'S');
                }
                break;
            }
        case 'arrow':
            {
                const pts = item.points || [];
                if (pts.length < 4) return;
                pdf.setDrawColor(strokeColor);
                pdf.setFillColor(strokeColor);
                pdf.setLineWidth(sw);
                pdf.setLineCap('round');
                for(let i = 0; i < pts.length - 2; i += 2){
                    pdf.line(tx(pts[i]), ty(pts[i + 1]), tx(pts[i + 2]), ty(pts[i + 3]));
                }
                if (pts.length >= 4) {
                    const last = pts.length;
                    const ex = pts[last - 2], ey = pts[last - 1];
                    const px = pts[last - 4], py = pts[last - 3];
                    const angle = Math.atan2(ey - py, ex - px);
                    const headLen = ts(10);
                    const x1 = ex - headLen * Math.cos(angle - Math.PI / 6);
                    const y1 = ey - headLen * Math.sin(angle - Math.PI / 6);
                    const x2 = ex - headLen * Math.cos(angle + Math.PI / 6);
                    const y2 = ey - headLen * Math.sin(angle + Math.PI / 6);
                    pdf.triangle(tx(ex), ty(ey), tx(x1), ty(y1), tx(x2), ty(y2), 'F');
                }
                break;
            }
        case 'text':
            {
                const x = tx(item.x || 0), y = ty(item.y || 0);
                const fs = ts(item.fontSize || 18);
                pdf.setFontSize(fs);
                pdf.setTextColor(strokeColor);
                pdf.text(item.text || '', x, y + fs * 0.85, {
                    baseline: 'alphabetic'
                });
                break;
            }
        case 'diamond':
            {
                const cx = item.x || 0, cy = item.y || 0;
                const hw = (item.width || 80) / 2, hh = (item.height || 80) / 2;
                const ptx = tx(cx), pty = ty(cy);
                const shw = ts(hw), shh = ts(hh);
                if (fillColor !== 'transparent') {
                    pdf.setFillColor(fillColor);
                }
                pdf.setDrawColor(strokeColor);
                pdf.setLineWidth(sw);
                const top = [
                    ptx,
                    pty - shh
                ];
                const right = [
                    ptx + shw,
                    pty
                ];
                const bottom = [
                    ptx,
                    pty + shh
                ];
                const left = [
                    ptx - shw,
                    pty
                ];
                if (fillColor !== 'transparent') {
                    pdf.triangle(top[0], top[1], right[0], right[1], bottom[0], bottom[1], 'F');
                    pdf.triangle(top[0], top[1], bottom[0], bottom[1], left[0], left[1], 'F');
                }
                pdf.line(top[0], top[1], right[0], right[1]);
                pdf.line(right[0], right[1], bottom[0], bottom[1]);
                pdf.line(bottom[0], bottom[1], left[0], left[1]);
                pdf.line(left[0], left[1], top[0], top[1]);
                break;
            }
        case 'sticky':
            {
                const x = tx(item.x || 0), y = ty(item.y || 0);
                const w = ts(item.width || 180), h = ts(item.height || 160);
                const fold = ts(18);
                pdf.setFillColor(pdfColor(item.stickyColor || '#FEF3C7'));
                pdf.rect(x, y, w, h, 'F');
                pdf.setFillColor(pdfColor(item.stickyFoldColor || '#FDE68A'));
                pdf.triangle(x + w - fold, y, x + w, y, x + w, y + fold, 'F');
                if (item.text) {
                    const fs = ts(item.fontSize || 14);
                    pdf.setFontSize(fs);
                    pdf.setTextColor(pdfColor(item.stickyTextColor || '#92400E'));
                    const lines = (item.text || '').split('\n');
                    lines.forEach((line, li)=>{
                        pdf.text(line, x + ts(12), y + ts(24) + li * fs * 1.3, {
                            baseline: 'alphabetic'
                        });
                    });
                }
                pdf.setDrawColor(strokeColor === 'transparent' ? '#e5e7eb' : strokeColor);
                pdf.setLineWidth(0.5);
                pdf.rect(x, y, w, h, 'S');
                break;
            }
        case 'connector':
            {
                const sourceItem = allItems.find((i)=>i.id === item.sourceId);
                const targetItem = allItems.find((i)=>i.id === item.targetId);
                if (!sourceItem || !targetItem) return;
                const sAnchors = getAnchorPoints(sourceItem);
                const tAnchors = getAnchorPoints(targetItem);
                const sp = sAnchors[item.sourceAnchor || 'right'];
                const tp = tAnchors[item.targetAnchor || 'left'];
                if (!sp || !tp) return;
                const style = item.connectorStyle || 'curved';
                const cpts = buildConnectorPath(sp.x, sp.y, item.sourceAnchor || 'right', tp.x, tp.y, item.targetAnchor || 'left', style);
                pdf.setDrawColor(strokeColor);
                pdf.setLineWidth(ts(2));
                pdf.setLineCap('round');
                if (cpts.length >= 4) {
                    pdf.moveTo(tx(cpts[0]), ty(cpts[1]));
                    for(let i = 2; i < cpts.length - 1; i += 2){
                        pdf.lineTo(tx(cpts[i]), ty(cpts[i + 1]));
                    }
                    pdf.stroke();
                }
                const arrowhead = item.showArrowhead || 'end';
                if (arrowhead === 'end' || arrowhead === 'both') {
                    const endAngle = cpts.length >= 4 ? Math.atan2(cpts[cpts.length - 1] - cpts[cpts.length - 3], cpts[cpts.length - 2] - cpts[cpts.length - 4]) : 0;
                    const ex = tp.x, ey = tp.y;
                    const hl = ts(10);
                    pdf.setFillColor(strokeColor);
                    pdf.triangle(tx(ex), ty(ey), tx(ex - hl * Math.cos(endAngle - Math.PI / 6)), ty(ey - hl * Math.sin(endAngle - Math.PI / 6)), tx(ex - hl * Math.cos(endAngle + Math.PI / 6)), ty(ey - hl * Math.sin(endAngle + Math.PI / 6)), 'F');
                }
                if (arrowhead === 'start' || arrowhead === 'both') {
                    const startAngle = cpts.length >= 4 ? Math.atan2(cpts[1] - cpts[3], cpts[0] - cpts[2]) : 0;
                    const sx = sp.x, sy = sp.y;
                    const hl = ts(10);
                    pdf.setFillColor(strokeColor);
                    pdf.triangle(tx(sx), ty(sy), tx(sx - hl * Math.cos(startAngle - Math.PI / 6)), ty(sy - hl * Math.sin(startAngle - Math.PI / 6)), tx(sx - hl * Math.cos(startAngle + Math.PI / 6)), ty(sy - hl * Math.sin(startAngle + Math.PI / 6)), 'F');
                }
                break;
            }
        case 'image':
            {
                const x = tx(item.x || 0), y = ty(item.y || 0);
                const w = ts(item.width || 200), h = ts(item.height || 150);
                pdf.setDrawColor('#888888');
                pdf.setLineWidth(0.5);
                pdf.setFillColor('#f0f0f0');
                pdf.rect(x, y, w, h, 'FD');
                pdf.setFontSize(ts(10));
                pdf.setTextColor('#888888');
                pdf.text('[Image]', x + w / 2, y + h / 2, {
                    align: 'center',
                    baseline: 'middle'
                });
                break;
            }
        case 'file':
            {
                const x = tx(item.x || 0), y = ty(item.y || 0);
                const w = ts(item.width || 200), h = ts(item.height || 80);
                pdf.setFillColor('#2a2d3a');
                pdf.setDrawColor('#444');
                pdf.setLineWidth(0.5);
                pdf.roundedRect(x, y, w, h, ts(4), ts(4), 'FD');
                pdf.setFontSize(ts(11));
                pdf.setTextColor('#e8ecf4');
                pdf.text(item.fileName || 'File', x + ts(60), y + ts(28), {
                    baseline: 'alphabetic'
                });
                pdf.setFontSize(ts(8));
                pdf.setTextColor('#8b95a8');
                const sizeStr = item.fileSize ? `${(item.fileSize / 1024).toFixed(1)} KB` : '';
                pdf.text(`${sizeStr} • ${(item.fileType || 'FILE').split('/').pop()?.toUpperCase()}`, x + ts(60), y + ts(44), {
                    baseline: 'alphabetic'
                });
                break;
            }
        case 'link':
            {
                const x = tx(item.x || 0), y = ty(item.y || 0);
                const w = ts(item.width || 240), h = ts(item.height || 80);
                pdf.setFillColor('#2a2d3a');
                pdf.setDrawColor('#8b5cf6');
                pdf.setLineWidth(0.5);
                pdf.roundedRect(x, y, w, h, ts(4), ts(4), 'FD');
                pdf.setFontSize(ts(11));
                pdf.setTextColor('#e8ecf4');
                pdf.text(item.linkTitle || 'Link', x + ts(12), y + ts(24), {
                    baseline: 'alphabetic'
                });
                pdf.setFontSize(ts(8));
                pdf.setTextColor('#8b5cf6');
                pdf.text(item.linkUrl || '', x + ts(12), y + ts(42), {
                    baseline: 'alphabetic'
                });
                break;
            }
        case 'frame':
            {
                break;
            }
    }
}
/* ══════════════════════════════════════════════════════════════ */ /* ── Layers Panel ──                                            */ /* ══════════════════════════════════════════════════════════════ */ function LayersPanel({ open, onClose, items, frameItems, selectedFrameId, onSelectFrame, onFitToFrame, onExportFramePng, onExportAllPdf }) {
    if (!open) return null;
    const isItemInFrameLocal = (item, frame)=>{
        if (item.id === frame.id) return false;
        if (item.type === 'connector') return false;
        const fx = frame.x || 0, fy = frame.y || 0, fw = frame.width || 0, fh = frame.height || 0;
        let ix, iy, iw, ih;
        if (item.type === 'rect' || item.type === 'sticky' || item.type === 'image' || item.type === 'file' || item.type === 'link') {
            ix = item.x || 0;
            iy = item.y || 0;
            iw = item.width || 0;
            ih = item.height || 0;
        } else if (item.type === 'circle') {
            const r = item.radius || 0;
            ix = (item.x || 0) - r;
            iy = (item.y || 0) - r;
            iw = r * 2;
            ih = r * 2;
        } else if (item.type === 'diamond') {
            const hw = (item.width || 80) / 2, hh = (item.height || 80) / 2;
            ix = (item.x || 0) - hw;
            iy = (item.y || 0) - hh;
            iw = item.width || 80;
            ih = item.height || 80;
        } else if (item.type === 'text') {
            ix = item.x || 0;
            iy = item.y || 0;
            iw = (item.text || '').length * (item.fontSize || 18) * 0.55;
            ih = (item.fontSize || 18) * 1.2;
        } else {
            return false;
        }
        const cx = ix + iw / 2, cy = iy + ih / 2;
        return cx >= fx && cx <= fx + fw && cy >= fy && cy <= fy + fh;
    };
    const getItemIcon = (type)=>{
        switch(type){
            case 'rect':
                return '▬';
            case 'circle':
                return '●';
            case 'sticky':
                return '📝';
            case 'text':
                return 'T';
            case 'line':
                return '╱';
            case 'arrow':
                return '→';
            case 'diamond':
                return '◆';
            case 'image':
                return '🖼';
            case 'file':
                return '📄';
            case 'link':
                return '🔗';
            case 'connector':
                return '⟷';
            default:
                return '•';
        }
    };
    const getItemLabel = (item)=>{
        if (item.type === 'text') return item.text?.slice(0, 20) || 'Text';
        if (item.type === 'sticky') return item.text?.slice(0, 20) || 'Sticky Note';
        if (item.type === 'frame') return item.frameTitle || 'Frame';
        if (item.type === 'image') return 'Image';
        if (item.type === 'file') return item.fileName || 'File';
        if (item.type === 'link') return item.linkTitle || item.linkUrl || 'Link';
        return item.type.charAt(0).toUpperCase() + item.type.slice(1);
    };
    // Items not in any frame
    const orphanItems = items.filter((item)=>item.type !== 'frame' && item.type !== 'connector' && !frameItems.some((frame)=>isItemInFrameLocal(item, frame)));
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "absolute top-0 right-0 bottom-0 z-30 flex",
        style: {
            pointerEvents: 'auto'
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "w-64 h-full flex flex-col overflow-hidden",
            style: {
                background: 'rgba(21,24,33,0.98)',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)'
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center justify-between px-3 py-2.5",
                    style: {
                        borderBottom: '1px solid rgba(255,255,255,0.06)'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                    className: "w-4 h-4 text-[#8b5cf6]"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-xs font-bold text-[#e8ecf4]",
                                    children: "Layers & Frames"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: onClose,
                            className: "p-1 rounded hover:bg-white/[0.06] transition-colors",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5 text-[#5a6478]"
                            })
                        })
                    ]
                }),
                frameItems.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "px-3 py-2",
                    style: {
                        borderBottom: '1px solid rgba(255,255,255,0.04)'
                    },
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: onExportAllPdf,
                        className: "flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-[#4fc3f7] hover:bg-[rgba(79,195,247,0.08)] transition-colors",
                        style: {
                            border: '1px solid rgba(79,195,247,0.15)'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Export All Frames as PDF"
                        ]
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex-1 overflow-y-auto chat-wb-scrollbar",
                    children: [
                        frameItems.map((frame, idx)=>{
                            const childItems = items.filter((item)=>isItemInFrameLocal(item, frame));
                            const isSel = selectedFrameId === frame.id;
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    borderBottom: '1px solid rgba(255,255,255,0.04)'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: `flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors ${isSel ? 'bg-[rgba(139,92,246,0.1)]' : 'hover:bg-white/[0.03]'}`,
                                        onClick: ()=>onSelectFrame(frame.id),
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 flex-shrink-0",
                                                style: {
                                                    color: isSel ? '#8b5cf6' : '#5a6478'
                                                }
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: `text-[11px] font-semibold flex-1 truncate ${isSel ? 'text-[#8b5cf6]' : 'text-[#e8ecf4]'}`,
                                                children: frame.frameTitle || `Slide ${idx + 1}`
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[9px] text-[#5a6478] flex-shrink-0",
                                                children: childItems.length
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    onFitToFrame(frame.id);
                                                },
                                                className: "p-1 rounded hover:bg-white/[0.06] transition-colors flex-shrink-0",
                                                title: "Fit to Frame",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                                    className: "w-3 h-3 text-[#5a6478]"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    onExportFramePng(frame.id);
                                                },
                                                className: "p-1 rounded hover:bg-white/[0.06] transition-colors flex-shrink-0",
                                                title: "Export as PNG",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                                    className: "w-3 h-3 text-[#5a6478]"
                                                })
                                            })
                                        ]
                                    }),
                                    childItems.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "pb-1",
                                        children: childItems.map((child)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2 px-3 py-1 pl-8 hover:bg-white/[0.02] transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-[10px] w-4 text-center",
                                                        style: {
                                                            color: child.strokeColor !== 'transparent' ? child.strokeColor : '#5a6478'
                                                        },
                                                        children: getItemIcon(child.type)
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-[10px] text-[#8b95a8] truncate",
                                                        children: getItemLabel(child)
                                                    }),
                                                    child.aiGenerated && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-[8px] px-1 rounded-full bg-[rgba(139,92,246,0.15)] text-[#a78bfa] ml-auto",
                                                        children: "AI"
                                                    })
                                                ]
                                            }, child.id))
                                    })
                                ]
                            }, frame.id);
                        }),
                        orphanItems.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            style: {
                                borderTop: '1px solid rgba(255,255,255,0.06)'
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "px-3 py-1.5",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[10px] font-semibold text-[#5a6478] uppercase tracking-wider",
                                        children: "Unframed Items"
                                    })
                                }),
                                orphanItems.map((item)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2 px-3 py-1 hover:bg-white/[0.02] transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[10px] w-4 text-center",
                                                style: {
                                                    color: item.strokeColor !== 'transparent' ? item.strokeColor : '#5a6478'
                                                },
                                                children: getItemIcon(item.type)
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[10px] text-[#8b95a8] truncate",
                                                children: getItemLabel(item)
                                            }),
                                            item.aiGenerated && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[8px] px-1 rounded-full bg-[rgba(139,92,246,0.15)] text-[#a78bfa] ml-auto",
                                                children: "AI"
                                            })
                                        ]
                                    }, item.id))
                            ]
                        })
                    ]
                })
            ]
        })
    });
}
/* ══════════════════════════════════════════════════════════════ */ /* ── Main Component ──                                          */ /* ══════════════════════════════════════════════════════════════ */ function ChatWhiteboard({ onSave, onRecordingComplete, onBack, onSend, sending = false, hasCapturedData = false, onCursorMove, onCursorLeave, remoteCursors = [], onLaserMove, onLaserStop, remoteLasers = [], onVoteCast, onVoteEnd, remoteVoteEvents = [] }) {
    /* ── State ── */ const [tool, setTool] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('pen');
    const [color, setColor] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('#00e5a0');
    const [brushSize, setBrushSize] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(4);
    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [tempItem, setTempItem] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [dimensions, setDimensions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        width: 800,
        height: 600
    });
    // History for undo/redo
    const [history, setHistory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [historyIndex, setHistoryIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(-1);
    // Text input state
    const [textInput, setTextInput] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [textValue, setTextValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    // Sticky note state
    const [editingStickyId, setEditingStickyId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [editingStickyText, setEditingStickyText] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [selectedStickyId, setSelectedStickyId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [stickyColorIdx, setStickyColorIdx] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    // Recording state
    const [recStatus, setRecStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('idle');
    const [recDuration, setRecDuration] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    // Connector state
    const [connectorStyle, setConnectorStyle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('curved');
    const [connectorArrowhead, setConnectorArrowhead] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('end');
    const [connectingFrom, setConnectingFrom] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [hoveredItemId, setHoveredItemId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [selectedConnectorId, setSelectedConnectorId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [tempConnectorEnd, setTempConnectorEnd] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // Template panel state
    const [showTemplatePanel, setShowTemplatePanel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Zoom/Pan state
    const [zoomLevel, setZoomLevel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const [stagePos, setStagePos] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        x: 0,
        y: 0
    });
    const [isPanning, setIsPanning] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [spaceHeld, setSpaceHeld] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [panStart, setPanStart] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [showMinimap, setShowMinimap] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    // Laser pointer state
    const [laserTrail, setLaserTrail] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [laserActive, setLaserActive] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Frame / Presentation state
    const [presentingFrame, setPresentingFrame] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [isPresenting, setIsPresenting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [editingFrameId, setEditingFrameId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [editingFrameNotes, setEditingFrameNotes] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [editingFrameTitle, setEditingFrameTitle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [showFrameNotesPanel, setShowFrameNotesPanel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [selectedFrameId, setSelectedFrameId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [showLayersPanel, setShowLayersPanel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // AI Feature state
    const [showAiPrompt, setShowAiPrompt] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [aiPromptText, setAiPromptText] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [aiLoading, setAiLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [aiClusterLoading, setAiClusterLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [aiSummarizeLoading, setAiSummarizeLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [aiPromptMode, setAiPromptMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('generate');
    // Shape Recognition state
    const [shapeRecognitionEnabled, setShapeRecognitionEnabled] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [shapeSuggestion, setShapeSuggestion] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // Insert Embed state
    const [showInsertMenu, setShowInsertMenu] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showLinkInputDialog, setShowLinkInputDialog] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [linkInputUrl, setLinkInputUrl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [linkLoading, setLinkLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [selectedEmbedId, setSelectedEmbedId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const fileInputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const imageInputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Voting state
    const [votingPhase, setVotingPhase] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('idle');
    const [activeVoteConfig, setActiveVoteConfig] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [voteTallies, setVoteTallies] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({}); // itemId -> count
    const [localUserVotes, setLocalUserVotes] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]); // itemIds the local user voted for
    const [voteTimeRemaining, setVoteTimeRemaining] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0); // seconds remaining
    const [voteResults, setVoteResults] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null); // final results when ended
    // PDF Export state
    const [showPdfExportDialog, setShowPdfExportDialog] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [pdfExporting, setPdfExporting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [pdfExportProgress, setPdfExportProgress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    /* ── Refs ── */ const stageRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const isDrawing = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const drawStart = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const currentPoints = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)([]);
    const itemsRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(items);
    const connectingFromRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Recording refs
    const mediaRecorderRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const chunksRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)([]);
    const canvasStreamRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const micStreamRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const compositeCanvasRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const compositeCtxRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const animFrameRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const timerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const recStartRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const pausedDurationRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const pauseStartRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const textAreaRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const stickyEditRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const resizingRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Zoom/Pan refs
    const zoomLevelRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(1);
    const stagePosRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({
        x: 0,
        y: 0
    });
    const spaceHeldRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const isPanningRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const panStartRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const lastTouchDistRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const lastTouchCenterRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Cursor broadcast throttle (15fps ≈ 67ms interval)
    const lastCursorBroadcastRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const CURSOR_BROADCAST_INTERVAL = 67; // ~15fps
    // Laser pointer refs
    const laserTrailRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)([]);
    const laserActiveRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const lastLaserBroadcastRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const LASER_BROADCAST_INTERVAL = 67; // ~15fps
    // Voting refs
    const voteTimerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const voteTalliesRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({});
    const localUserVotesRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)([]);
    const laserAnimFrameRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    // Keep itemsRef in sync
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        itemsRef.current = items;
    }, [
        items
    ]);
    // Keep connectingFromRef in sync
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        connectingFromRef.current = connectingFrom;
    }, [
        connectingFrom
    ]);
    // Keep zoom/pan refs in sync
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        zoomLevelRef.current = zoomLevel;
    }, [
        zoomLevel
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        stagePosRef.current = stagePos;
    }, [
        stagePos
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        spaceHeldRef.current = spaceHeld;
    }, [
        spaceHeld
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        isPanningRef.current = isPanning;
    }, [
        isPanning
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        panStartRef.current = panStart;
    }, [
        panStart
    ]);
    // Keep laser refs in sync
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        laserActiveRef.current = laserActive;
    }, [
        laserActive
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        laserTrailRef.current = laserTrail;
    }, [
        laserTrail
    ]);
    // Laser trail cleanup: re-render to fade out old points
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (tool !== 'laser' && remoteLasers.length === 0) return;
        let running = true;
        const tick = ()=>{
            if (!running) return;
            const now = Date.now();
            setLaserTrail((prev)=>{
                const filtered = prev.filter((p)=>now - p.timestamp < LASER_TRAIL_LIFETIME);
                return filtered.length === prev.length ? prev : filtered;
            });
            laserAnimFrameRef.current = requestAnimationFrame(tick);
        };
        laserAnimFrameRef.current = requestAnimationFrame(tick);
        return ()=>{
            running = false;
            if (laserAnimFrameRef.current) cancelAnimationFrame(laserAnimFrameRef.current);
        };
    }, [
        tool,
        remoteLasers.length
    ]);
    // Inject styles
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        injectChatWbStyles();
    }, []);
    /* ── Resize Observer ── */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const c = containerRef.current;
        if (!c) return;
        const update = ()=>{
            const rect = c.getBoundingClientRect();
            setDimensions({
                width: Math.floor(rect.width),
                height: Math.floor(rect.height)
            });
        };
        update();
        const obs = new ResizeObserver(update);
        obs.observe(c);
        return ()=>obs.disconnect();
    }, []);
    /* ── History helpers ── */ const pushHistory = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((newItems)=>{
        setHistory((prev)=>{
            const next = prev.slice(0, historyIndex + 1);
            next.push([
                ...newItems
            ]);
            return next;
        });
        setHistoryIndex((prev)=>prev + 1);
    }, [
        historyIndex
    ]);
    const undo = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (historyIndex < 0) return;
        const prevItems = historyIndex > 0 ? history[historyIndex - 1] : [];
        setItems([
            ...prevItems
        ]);
        setHistoryIndex((prev)=>prev - 1);
    }, [
        history,
        historyIndex
    ]);
    const redo = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (historyIndex >= history.length - 1) return;
        const nextItems = history[historyIndex + 1];
        setItems([
            ...nextItems
        ]);
        setHistoryIndex((prev)=>prev + 1);
    }, [
        history,
        historyIndex
    ]);
    /* ── Connector delete handler ── */ const handleConnectorDelete = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((id)=>{
        setItems((prev)=>{
            const next = prev.filter((item)=>item.id !== id);
            requestAnimationFrame(()=>pushHistory(next));
            return next;
        });
        setSelectedConnectorId(null);
    }, [
        pushHistory
    ]);
    /* ── Sticky note handlers (declared early for forward refs) ── */ const commitStickyText = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!editingStickyId) return;
        setItems((prev)=>{
            const next = prev.map((item)=>item.id === editingStickyId ? {
                    ...item,
                    text: editingStickyText
                } : item);
            requestAnimationFrame(()=>pushHistory(next));
            return next;
        });
        setEditingStickyId(null);
        setEditingStickyText('');
    }, [
        editingStickyId,
        editingStickyText,
        pushHistory
    ]);
    const handleStickyDragEnd = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((id, x, y)=>{
        setItems((prev)=>{
            const next = prev.map((item)=>item.id === id ? {
                    ...item,
                    x,
                    y
                } : item);
            requestAnimationFrame(()=>pushHistory(next));
            return next;
        });
    }, [
        pushHistory
    ]);
    const handleStickyDelete = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((id)=>{
        setItems((prev)=>{
            const next = prev.filter((item)=>item.id !== id);
            requestAnimationFrame(()=>pushHistory(next));
            return next;
        });
        if (selectedStickyId === id) setSelectedStickyId(null);
        if (editingStickyId === id) {
            setEditingStickyId(null);
            setEditingStickyText('');
        }
    }, [
        pushHistory,
        selectedStickyId,
        editingStickyId
    ]);
    const handleStickyDoubleClick = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((id)=>{
        const item = itemsRef.current.find((i)=>i.id === id);
        if (!item) return;
        setEditingStickyId(id);
        setEditingStickyText(item.text || '');
        setTimeout(()=>stickyEditRef.current?.focus(), 80);
    }, []);
    const handleStickySelect = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((id)=>{
        setSelectedStickyId(id);
    }, []);
    /* ── Frame containment helper ── */ const isItemInFrame = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((item, frame)=>{
        if (!frame) return false;
        const fx = frame.x || 0;
        const fy = frame.y || 0;
        const fw = frame.width || 0;
        const fh = frame.height || 0;
        let itemX, itemY, itemW, itemH;
        if (item.type === 'rect' || item.type === 'sticky' || item.type === 'frame') {
            itemX = item.x || 0;
            itemY = item.y || 0;
            itemW = item.width || 0;
            itemH = item.height || 0;
        } else if (item.type === 'circle') {
            const r = item.radius || 0;
            itemX = (item.x || 0) - r;
            itemY = (item.y || 0) - r;
            itemW = r * 2;
            itemH = r * 2;
        } else if (item.type === 'text') {
            itemX = item.x || 0;
            itemY = item.y || 0;
            itemW = (item.text || '').length * (item.fontSize || 18) * 0.55;
            itemH = (item.fontSize || 18) * 1.2;
        } else if (item.type === 'line' || item.type === 'freeform' || item.type === 'arrow') {
            const pts = item.points || [];
            for(let i = 0; i < pts.length; i += 2){
                if (pts[i] >= fx && pts[i] <= fx + fw && pts[i + 1] >= fy && pts[i + 1] <= fy + fh) return true;
            }
            return false;
        } else if (item.type === 'connector') {
            return true;
        } else if (item.type === 'diamond') {
            const hw = (item.width || 80) / 2;
            const hh = (item.height || 80) / 2;
            itemX = (item.x || 0) - hw;
            itemY = (item.y || 0) - hh;
            itemW = item.width || 80;
            itemH = item.height || 80;
        } else if (item.type === 'image' || item.type === 'file' || item.type === 'link') {
            itemX = item.x || 0;
            itemY = item.y || 0;
            itemW = item.width || 200;
            itemH = item.height || 150;
        } else {
            return false;
        }
        const centerX = itemX + itemW / 2;
        const centerY = itemY + itemH / 2;
        return centerX >= fx && centerX <= fx + fw && centerY >= fy && centerY <= fy + fh;
    }, []);
    /* ── Frame event handlers ── */ const handleFrameSelect = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((id)=>{
        setSelectedFrameId(id);
    }, []);
    const handleFrameDragEnd = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((id, x, y)=>{
        setItems((prev)=>{
            const frame = prev.find((i)=>i.id === id);
            if (!frame) return prev;
            const dx = x - (frame.x || 0);
            const dy = y - (frame.y || 0);
            const next = prev.map((item)=>{
                if (item.id === id) return {
                    ...item,
                    x,
                    y
                };
                // Move child items with the frame
                if (isItemInFrame(item, frame)) {
                    if (item.type === 'line' || item.type === 'freeform' || item.type === 'arrow') {
                        const pts = item.points ? [
                            ...item.points
                        ] : [];
                        for(let i = 0; i < pts.length; i += 2){
                            pts[i] += dx;
                            pts[i + 1] += dy;
                        }
                        return {
                            ...item,
                            points: pts
                        };
                    } else if (item.type === 'connector') {
                        // Connectors are handled by their source/target anchors, skip
                        return item;
                    } else {
                        return {
                            ...item,
                            x: (item.x || 0) + dx,
                            y: (item.y || 0) + dy
                        };
                    }
                }
                return item;
            });
            requestAnimationFrame(()=>pushHistory(next));
            return next;
        });
    }, [
        pushHistory,
        isItemInFrame
    ]);
    const handleFrameDoubleClick = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((id)=>{
        const item = itemsRef.current.find((i)=>i.id === id);
        if (!item) return;
        setEditingFrameId(id);
        setEditingFrameTitle(item.frameTitle || '');
        setEditingFrameNotes(item.frameNotes || '');
        setShowFrameNotesPanel(true);
    }, []);
    const handleFrameDelete = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((id)=>{
        setItems((prev)=>{
            const next = prev.filter((item)=>item.id !== id);
            requestAnimationFrame(()=>pushHistory(next));
            return next;
        });
        if (selectedFrameId === id) setSelectedFrameId(null);
    }, [
        pushHistory,
        selectedFrameId
    ]);
    const handleFrameResizeEnd = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((id, x, y, width, height)=>{
        setItems((prev)=>{
            const next = prev.map((item)=>item.id === id ? {
                    ...item,
                    x,
                    y,
                    width,
                    height
                } : item);
            requestAnimationFrame(()=>pushHistory(next));
            return next;
        });
    }, [
        pushHistory
    ]);
    /* ── Frame / Presentation helpers ── */ const frameItems = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return items.filter((item)=>item.type === 'frame').sort((a, b)=>{
            const ay = a.y || 0;
            const by = b.y || 0;
            if (Math.abs(ay - by) > 50) return ay - by;
            return (a.x || 0) - (b.x || 0);
        });
    }, [
        items
    ]);
    const enterPresentation = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (frameItems.length === 0) return;
        setIsPresenting(true);
        setPresentingFrame(0);
        setTool('laser');
        setLaserTrail([]);
    }, [
        frameItems.length
    ]);
    const exitPresentation = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setIsPresenting(false);
        setTool('pen');
        setLaserTrail([]);
        setLaserActive(false);
        laserActiveRef.current = false;
        setShowFrameNotesPanel(false);
    }, []);
    const navigateSlide = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((direction)=>{
        setPresentingFrame((prev)=>{
            const next = prev + direction;
            if (next < 0) return 0;
            if (next >= frameItems.length) return frameItems.length - 1;
            return next;
        });
    }, [
        frameItems.length
    ]);
    const currentFrame = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return frameItems[presentingFrame] || null;
    }, [
        frameItems,
        presentingFrame
    ]);
    const presentationScale = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!currentFrame) return 1;
        const fw = currentFrame.width || 800;
        const fh = currentFrame.height || 600;
        const scaleX = dimensions.width / fw;
        const scaleY = dimensions.height / fh;
        return Math.min(scaleX, scaleY) * 0.95;
    }, [
        currentFrame,
        dimensions
    ]);
    const presentationOffset = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!currentFrame) return {
            x: 0,
            y: 0
        };
        const fw = currentFrame.width || 800;
        const fh = currentFrame.height || 600;
        const scaledW = fw * presentationScale;
        const scaledH = fh * presentationScale;
        return {
            x: (dimensions.width - scaledW) / 2 - (currentFrame.x || 0) * presentationScale,
            y: (dimensions.height - scaledH) / 2 - (currentFrame.y || 0) * presentationScale
        };
    }, [
        currentFrame,
        presentationScale,
        dimensions
    ]);
    /* ── AI Feature Handlers ── */ /** AI Generate: calls the API to generate DrawItem[] from a prompt */ const handleAiGenerate = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (!aiPromptText.trim()) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Please enter a description of what you want to generate.');
            return;
        }
        setAiLoading(true);
        try {
            const response = await fetch('/api/whiteboard/ai-generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: aiPromptText.trim()
                })
            });
            if (!response.ok) {
                const errData = await response.json().catch(()=>({}));
                throw new Error(errData.error || 'Failed to generate content.');
            }
            const data = await response.json();
            const generatedItems = data.items || [];
            if (generatedItems.length === 0) {
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('AI could not generate any items. Try a different prompt.');
                return;
            }
            // Offset generated items to center of current viewport
            const viewportCenterX = (dimensions.width / 2 - stagePosRef.current.x) / zoomLevelRef.current;
            const viewportCenterY = (dimensions.height / 2 - stagePosRef.current.y) / zoomLevelRef.current;
            // Calculate bounding box of generated items to center them
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            generatedItems.forEach((item)=>{
                if (item.type === 'sticky' || item.type === 'rect' || item.type === 'frame') {
                    minX = Math.min(minX, item.x || 0);
                    minY = Math.min(minY, item.y || 0);
                    maxX = Math.max(maxX, (item.x || 0) + (item.width || 0));
                    maxY = Math.max(maxY, (item.y || 0) + (item.height || 0));
                } else if (item.type === 'circle') {
                    const r = item.radius || 0;
                    minX = Math.min(minX, (item.x || 0) - r);
                    minY = Math.min(minY, (item.y || 0) - r);
                    maxX = Math.max(maxX, (item.x || 0) + r);
                    maxY = Math.max(maxY, (item.y || 0) + r);
                } else if (item.type === 'text') {
                    minX = Math.min(minX, item.x || 0);
                    minY = Math.min(minY, item.y || 0);
                    maxX = Math.max(maxX, (item.x || 0) + (item.text || '').length * (item.fontSize || 18) * 0.55);
                    maxY = Math.max(maxY, (item.y || 0) + (item.fontSize || 18) * 1.2);
                } else if (item.type === 'line' || item.type === 'arrow' || item.type === 'freeform') {
                    const pts = item.points || [];
                    for(let i = 0; i < pts.length; i += 2){
                        minX = Math.min(minX, pts[i]);
                        minY = Math.min(minY, pts[i + 1]);
                        maxX = Math.max(maxX, pts[i]);
                        maxY = Math.max(maxY, pts[i + 1]);
                    }
                }
            });
            const offsetX = minX !== Infinity ? viewportCenterX - (minX + maxX) / 2 : 0;
            const offsetY = minY !== Infinity ? viewportCenterY - (minY + maxY) / 2 : 0;
            // Apply offset and ensure aiGenerated flag
            const offsetItems = generatedItems.map((item)=>{
                const offsetItem = {
                    ...item,
                    aiGenerated: true
                };
                if (offsetItem.type === 'sticky' || offsetItem.type === 'rect' || offsetItem.type === 'frame') {
                    offsetItem.x = (offsetItem.x || 0) + offsetX;
                    offsetItem.y = (offsetItem.y || 0) + offsetY;
                } else if (offsetItem.type === 'circle') {
                    offsetItem.x = (offsetItem.x || 0) + offsetX;
                    offsetItem.y = (offsetItem.y || 0) + offsetY;
                } else if (offsetItem.type === 'text') {
                    offsetItem.x = (offsetItem.x || 0) + offsetX;
                    offsetItem.y = (offsetItem.y || 0) + offsetY;
                } else if (offsetItem.type === 'line' || offsetItem.type === 'arrow' || offsetItem.type === 'freeform') {
                    offsetItem.points = (offsetItem.points || []).map((p, i)=>i % 2 === 0 ? p + offsetX : p + offsetY);
                }
                return offsetItem;
            });
            // Add items to canvas with undo support
            setItems((prev)=>{
                const next = [
                    ...prev,
                    ...offsetItems
                ];
                requestAnimationFrame(()=>pushHistory(next));
                return next;
            });
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success(`AI generated ${offsetItems.length} items on canvas.`);
            setShowAiPrompt(false);
            setAiPromptText('');
        } catch (err) {
            console.error('[AI Generate] Error:', err);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(err.message || 'Failed to generate AI content.');
        } finally{
            setAiLoading(false);
        }
    }, [
        aiPromptText,
        dimensions,
        pushHistory
    ]);
    /** AI Cluster: auto-groups nearby sticky notes by topic and adds connectors */ const handleAiCluster = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        const stickyNotes = items.filter((i)=>i.type === 'sticky' && i.text && i.text.trim());
        if (stickyNotes.length < 2) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Need at least 2 sticky notes with text to cluster.');
            return;
        }
        setAiClusterLoading(true);
        try {
            // Gather all sticky note texts for topic analysis
            const stickyTexts = stickyNotes.map((s)=>({
                    id: s.id,
                    text: s.text || '',
                    x: s.x || 0,
                    y: s.y || 0,
                    width: s.width || 180,
                    height: s.height || 160
                }));
            // Simple proximity-based clustering: group stickies within 300px of each other
            const CLUSTER_DISTANCE = 350;
            const clusters = [];
            const assigned = new Set();
            for (const sticky of stickyTexts){
                if (assigned.has(sticky.id)) continue;
                const cluster = {
                    items: [
                        sticky
                    ],
                    centerX: sticky.x + sticky.width / 2,
                    centerY: sticky.y + sticky.height / 2
                };
                assigned.add(sticky.id);
                for (const other of stickyTexts){
                    if (assigned.has(other.id)) continue;
                    const dx = other.x + other.width / 2 - cluster.centerX;
                    const dy = other.y + other.height / 2 - cluster.centerY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CLUSTER_DISTANCE) {
                        cluster.items.push(other);
                        assigned.add(other.id);
                        // Recalculate center
                        cluster.centerX = cluster.items.reduce((s, i)=>s + i.x + i.width / 2, 0) / cluster.items.length;
                        cluster.centerY = cluster.items.reduce((s, i)=>s + i.y + i.height / 2, 0) / cluster.items.length;
                    }
                }
                clusters.push(cluster);
            }
            if (clusters.length <= 1) {
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.info('All sticky notes are already in one cluster. Try spreading them out.');
                setAiClusterLoading(false);
                return;
            }
            // Create connector items between cluster members
            const newConnectors = [];
            const clusterColors = [
                '#4fc3f7',
                '#00e5a0',
                '#f59e0b',
                '#8b5cf6',
                '#ec4899',
                '#ff5757'
            ];
            clusters.forEach((cluster, clusterIdx)=>{
                const color = clusterColors[clusterIdx % clusterColors.length];
                // Connect items within cluster in a chain
                for(let i = 0; i < cluster.items.length - 1; i++){
                    const source = cluster.items[i];
                    const target = cluster.items[i + 1];
                    // Determine best anchor positions
                    const dx = target.x + target.width / 2 - (source.x + source.width / 2);
                    const dy = target.y + target.height / 2 - (source.y + source.height / 2);
                    let sourceAnchor = 'right';
                    let targetAnchor = 'left';
                    if (Math.abs(dy) > Math.abs(dx)) {
                        sourceAnchor = dy > 0 ? 'bottom' : 'top';
                        targetAnchor = dy > 0 ? 'top' : 'bottom';
                    } else {
                        sourceAnchor = dx > 0 ? 'right' : 'left';
                        targetAnchor = dx > 0 ? 'left' : 'right';
                    }
                    newConnectors.push({
                        id: generateId(),
                        type: 'connector',
                        sourceId: source.id,
                        sourceAnchor,
                        targetId: target.id,
                        targetAnchor,
                        connectorStyle: 'curved',
                        showArrowhead: 'end',
                        strokeColor: color,
                        fillColor: 'transparent',
                        strokeWidth: 2,
                        opacity: 0.7,
                        aiGenerated: true,
                        dash: [
                            8,
                            4
                        ]
                    });
                }
            });
            // Add connectors to canvas with undo support
            setItems((prev)=>{
                const next = [
                    ...prev,
                    ...newConnectors
                ];
                requestAnimationFrame(()=>pushHistory(next));
                return next;
            });
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success(`AI clustered ${stickyNotes.length} notes into ${clusters.length} groups with ${newConnectors.length} connectors.`);
        } catch (err) {
            console.error('[AI Cluster] Error:', err);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(err.message || 'Failed to cluster sticky notes.');
        } finally{
            setAiClusterLoading(false);
        }
    }, [
        items,
        pushHistory
    ]);
    /** AI Summarize: reads all text on canvas and generates a summary sticky note */ const handleAiSummarize = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        // Collect all text from the canvas
        const textItems = items.filter((i)=>i.type === 'text' && i.text && i.text.trim() || i.type === 'sticky' && i.text && i.text.trim());
        if (textItems.length === 0) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('No text content found on canvas to summarize.');
            return;
        }
        setAiSummarizeLoading(true);
        try {
            const texts = textItems.map((i)=>i.text || '').filter((t)=>t.trim());
            const response = await fetch('/api/whiteboard/ai-summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    texts
                })
            });
            if (!response.ok) {
                const errData = await response.json().catch(()=>({}));
                throw new Error(errData.error || 'Failed to summarize content.');
            }
            const data = await response.json();
            const summary = data.summary || '';
            if (!summary) {
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('AI could not generate a summary. Please try again.');
                return;
            }
            // Place summary sticky note in the top-right area of viewport
            const viewportTopRightX = (dimensions.width - 40 - stagePosRef.current.x) / zoomLevelRef.current;
            const viewportTopRightY = (40 - stagePosRef.current.y) / zoomLevelRef.current;
            const summarySticky = {
                id: generateId(),
                type: 'sticky',
                x: viewportTopRightX - 220,
                y: viewportTopRightY,
                width: 220,
                height: 200,
                strokeColor: 'transparent',
                fillColor: 'transparent',
                strokeWidth: 1,
                opacity: 1,
                text: summary,
                fontSize: 12,
                fontFamily: 'Arial',
                stickyColor: '#EDE9FE',
                stickyFoldColor: '#C4B5FD',
                stickyTextColor: '#5B21B6',
                aiGenerated: true
            };
            setItems((prev)=>{
                const next = [
                    ...prev,
                    summarySticky
                ];
                requestAnimationFrame(()=>pushHistory(next));
                return next;
            });
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('AI generated a summary note on the canvas.');
        } catch (err) {
            console.error('[AI Summarize] Error:', err);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(err.message || 'Failed to summarize canvas content.');
        } finally{
            setAiSummarizeLoading(false);
        }
    }, [
        items,
        dimensions,
        pushHistory
    ]);
    /* ── Voting Handlers ── */ /** Start a new vote with the given config */ const startVote = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((config)=>{
        setActiveVoteConfig(config);
        setVotingPhase('active');
        setVoteTallies({});
        setLocalUserVotes([]);
        setVoteResults(null);
        voteTalliesRef.current = {};
        localUserVotesRef.current = [];
        // Initialize tallies for all candidates to 0
        const initialTallies = {};
        config.candidateItemIds.forEach((id)=>{
            initialTallies[id] = 0;
        });
        setVoteTallies(initialTallies);
        voteTalliesRef.current = initialTallies;
        // Start countdown timer if time-limited
        if (config.timeLimitSeconds > 0) {
            setVoteTimeRemaining(config.timeLimitSeconds);
            voteTimerRef.current = setInterval(()=>{
                setVoteTimeRemaining((prev)=>{
                    if (prev <= 1) {
                        // Time's up — end the vote
                        if (voteTimerRef.current) {
                            clearInterval(voteTimerRef.current);
                            voteTimerRef.current = null;
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success(`Voting started: "${config.title}"`);
    }, []);
    /** Cast a vote on a specific item */ const castVote = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((itemId)=>{
        if (votingPhase !== 'active' || !activeVoteConfig) return;
        if (!activeVoteConfig.candidateItemIds.includes(itemId)) return;
        if (localUserVotesRef.current.includes(itemId)) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('You already voted on this item.');
            return;
        }
        if (localUserVotesRef.current.length >= activeVoteConfig.votesPerUser) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(`You've used all ${activeVoteConfig.votesPerUser} votes.`);
            return;
        }
        // Update local state
        const newVotes = [
            ...localUserVotesRef.current,
            itemId
        ];
        setLocalUserVotes(newVotes);
        localUserVotesRef.current = newVotes;
        const newTallies = {
            ...voteTalliesRef.current,
            [itemId]: (voteTalliesRef.current[itemId] || 0) + 1
        };
        setVoteTallies(newTallies);
        voteTalliesRef.current = newTallies;
        // Broadcast vote via Socket.IO callback
        if (onVoteCast) {
            onVoteCast({
                voteId: activeVoteConfig.id,
                userId: 'local',
                userName: 'You',
                itemId,
                timestamp: Date.now()
            });
        }
    }, [
        votingPhase,
        activeVoteConfig,
        onVoteCast
    ]);
    /** Process a remote vote event */ const processRemoteVote = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((event)=>{
        if (!activeVoteConfig || event.voteId !== activeVoteConfig.id) return;
        if (!activeVoteConfig.candidateItemIds.includes(event.itemId)) return;
        const newTallies = {
            ...voteTalliesRef.current,
            [event.itemId]: (voteTalliesRef.current[event.itemId] || 0) + 1
        };
        setVoteTallies(newTallies);
        voteTalliesRef.current = newTallies;
    }, [
        activeVoteConfig
    ]);
    /** End the current vote and show results */ const endVote = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (voteTimerRef.current) {
            clearInterval(voteTimerRef.current);
            voteTimerRef.current = null;
        }
        setVotingPhase('ended');
        const finalTallies = {
            ...voteTalliesRef.current
        };
        setVoteResults(finalTallies);
        // Broadcast vote end via Socket.IO callback
        if (onVoteEnd && activeVoteConfig) {
            onVoteEnd({
                voteId: activeVoteConfig.id,
                results: finalTallies,
                timestamp: Date.now()
            });
        }
        sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('Voting ended! Results are shown on the canvas.');
    }, [
        activeVoteConfig,
        onVoteEnd
    ]);
    /** Reset voting back to idle */ const resetVoting = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (voteTimerRef.current) {
            clearInterval(voteTimerRef.current);
            voteTimerRef.current = null;
        }
        setVotingPhase('idle');
        setActiveVoteConfig(null);
        setVoteTallies({});
        setLocalUserVotes([]);
        setVoteTimeRemaining(0);
        setVoteResults(null);
        voteTalliesRef.current = {};
        localUserVotesRef.current = [];
    }, []);
    // Process remote vote events
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (remoteVoteEvents.length > 0) {
            const latest = remoteVoteEvents[remoteVoteEvents.length - 1];
            processRemoteVote(latest);
        }
    }, [
        remoteVoteEvents,
        processRemoteVote
    ]);
    // Auto-end vote when timer reaches 0
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (votingPhase === 'active' && activeVoteConfig && activeVoteConfig.timeLimitSeconds > 0 && voteTimeRemaining === 0) {
            endVote();
        }
    }, [
        voteTimeRemaining,
        votingPhase,
        activeVoteConfig,
        endVote
    ]);
    // Cleanup timer on unmount
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        return ()=>{
            if (voteTimerRef.current) {
                clearInterval(voteTimerRef.current);
            }
        };
    }, []);
    /** Computed: sorted results for ranking display */ const rankedResults = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const tallies = voteResults || voteTallies;
        if (!activeVoteConfig) return [];
        return activeVoteConfig.candidateItemIds.map((id)=>({
                itemId: id,
                count: tallies[id] || 0
            })).sort((a, b)=>b.count - a.count);
    }, [
        voteResults,
        voteTallies,
        activeVoteConfig
    ]);
    const handleStickyResizeStart = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((id)=>{
        const stage = stageRef.current;
        if (!stage) return;
        const pointerPos = stage.getPointerPosition();
        if (!pointerPos) return;
        // Convert screen position to world position
        const worldX = (pointerPos.x - stagePosRef.current.x) / zoomLevelRef.current;
        const worldY = (pointerPos.y - stagePosRef.current.y) / zoomLevelRef.current;
        const item = itemsRef.current.find((i)=>i.id === id);
        if (!item) return;
        resizingRef.current = {
            stickyId: id,
            startX: worldX,
            startY: worldY,
            startW: item.width || 180,
            startH: item.height || 160
        };
    }, []);
    /* ── Space key tracking for pan mode ── */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleKeyDown = (e)=>{
            if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return;
            if (e.code === 'Space' && !spaceHeldRef.current) {
                e.preventDefault();
                setSpaceHeld(true);
            }
        };
        const handleKeyUp = (e)=>{
            if (e.code === 'Space') {
                setSpaceHeld(false);
                setIsPanning(false);
                isPanningRef.current = false;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return ()=>{
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);
    /* ── Wheel zoom handler ── */ const handleWheel = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((e)=>{
        e.evt.preventDefault();
        const stage = stageRef.current;
        if (!stage) return;
        const oldScale = zoomLevelRef.current;
        const pointer = stage.getPointerPosition();
        if (!pointer) return;
        // Only zoom with Ctrl or pinch
        const ctrlKey = e.evt.ctrlKey || e.evt.metaKey;
        if (!ctrlKey) return;
        const scaleBy = 1.08;
        const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
        const clampedScale = Math.max(0.1, Math.min(5, newScale));
        // Zoom toward pointer position
        const mousePointTo = {
            x: (pointer.x - stagePosRef.current.x) / oldScale,
            y: (pointer.y - stagePosRef.current.y) / oldScale
        };
        const newPos = {
            x: pointer.x - mousePointTo.x * clampedScale,
            y: pointer.y - mousePointTo.y * clampedScale
        };
        setZoomLevel(clampedScale);
        setStagePos(newPos);
    }, []);
    /* ── Shape Recognition handlers ── */ const acceptShapeSuggestion = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!shapeSuggestion) return;
        const { freeformId, replacementItem } = shapeSuggestion;
        setItems((prev)=>{
            // Remove the freeform line and add the clean shape
            const next = prev.filter((i)=>i.id !== freeformId);
            next.push(replacementItem);
            requestAnimationFrame(()=>pushHistory(next));
            return next;
        });
        setShapeSuggestion(null);
        sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success(`Converted to ${shapeSuggestion.shapeName}`);
    }, [
        shapeSuggestion,
        pushHistory
    ]);
    const rejectShapeSuggestion = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setShapeSuggestion(null);
    }, []);
    /* ── Embed Handlers ── */ const handleImageFileSelect = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (file)=>{
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch('/api/whiteboard/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Upload failed');
            // Get image dimensions
            const img = new window.Image();
            img.src = data.url;
            await new Promise((resolve)=>{
                img.onload = ()=>resolve();
            });
            // Scale to fit viewport if too large
            const maxDim = 400;
            let w = img.naturalWidth;
            let h = img.naturalHeight;
            if (w > maxDim || h > maxDim) {
                const scale = maxDim / Math.max(w, h);
                w = Math.round(w * scale);
                h = Math.round(h * scale);
            }
            // Place at center of viewport
            const vpCenterX = (dimensions.width / 2 - stagePos.x) / zoomLevel;
            const vpCenterY = (dimensions.height / 2 - stagePos.y) / zoomLevel;
            const newItem = {
                id: generateId(),
                type: 'image',
                x: vpCenterX - w / 2,
                y: vpCenterY - h / 2,
                width: w,
                height: h,
                src: data.url,
                strokeColor: 'transparent',
                fillColor: 'transparent',
                strokeWidth: 0,
                opacity: 1,
                rotation: 0
            };
            setItems((prev)=>{
                const next = [
                    ...prev,
                    newItem
                ];
                requestAnimationFrame(()=>pushHistory(next));
                return next;
            });
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('Image added to canvas');
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(err.message || 'Failed to upload image');
        }
    }, [
        dimensions,
        stagePos,
        zoomLevel,
        pushHistory
    ]);
    const handleFileSelect = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (file)=>{
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch('/api/whiteboard/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Upload failed');
            const vpCenterX = (dimensions.width / 2 - stagePos.x) / zoomLevel;
            const vpCenterY = (dimensions.height / 2 - stagePos.y) / zoomLevel;
            const newItem = {
                id: generateId(),
                type: 'file',
                x: vpCenterX - 100,
                y: vpCenterY - 40,
                width: 200,
                height: 80,
                strokeColor: 'transparent',
                fillColor: 'transparent',
                strokeWidth: 0,
                opacity: 1,
                fileName: data.name || file.name,
                fileUrl: data.url,
                fileType: data.type || file.type,
                fileSize: data.size || file.size
            };
            setItems((prev)=>{
                const next = [
                    ...prev,
                    newItem
                ];
                requestAnimationFrame(()=>pushHistory(next));
                return next;
            });
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('File added to canvas');
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(err.message || 'Failed to upload file');
        }
    }, [
        dimensions,
        stagePos,
        zoomLevel,
        pushHistory
    ]);
    const handleAddLink = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (!linkInputUrl.trim()) return;
        setLinkLoading(true);
        try {
            // Fetch link metadata
            const res = await fetch('/api/whiteboard/link-meta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: linkInputUrl.trim()
                })
            });
            const data = await res.json();
            const vpCenterX = (dimensions.width / 2 - stagePos.x) / zoomLevel;
            const vpCenterY = (dimensions.height / 2 - stagePos.y) / zoomLevel;
            const newItem = {
                id: generateId(),
                type: 'link',
                x: vpCenterX - 130,
                y: vpCenterY - 45,
                width: 260,
                height: 90,
                strokeColor: 'transparent',
                fillColor: 'transparent',
                strokeWidth: 0,
                opacity: 1,
                linkUrl: linkInputUrl.trim(),
                linkTitle: data.title || linkInputUrl.trim(),
                linkDescription: data.description || '',
                linkFavicon: data.favicon || ''
            };
            setItems((prev)=>{
                const next = [
                    ...prev,
                    newItem
                ];
                requestAnimationFrame(()=>pushHistory(next));
                return next;
            });
            setShowLinkInputDialog(false);
            setLinkInputUrl('');
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('Link card added to canvas');
        } catch (err) {
            // Even if metadata fails, add a basic link card
            const vpCenterX = (dimensions.width / 2 - stagePos.x) / zoomLevel;
            const vpCenterY = (dimensions.height / 2 - stagePos.y) / zoomLevel;
            const newItem = {
                id: generateId(),
                type: 'link',
                x: vpCenterX - 130,
                y: vpCenterY - 45,
                width: 260,
                height: 90,
                strokeColor: 'transparent',
                fillColor: 'transparent',
                strokeWidth: 0,
                opacity: 1,
                linkUrl: linkInputUrl.trim(),
                linkTitle: linkInputUrl.trim(),
                linkDescription: '',
                linkFavicon: ''
            };
            setItems((prev)=>{
                const next = [
                    ...prev,
                    newItem
                ];
                requestAnimationFrame(()=>pushHistory(next));
                return next;
            });
            setShowLinkInputDialog(false);
            setLinkInputUrl('');
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('Link card added');
        }
        setLinkLoading(false);
    }, [
        linkInputUrl,
        dimensions,
        stagePos,
        zoomLevel,
        pushHistory
    ]);
    const handleEmbedDragEnd = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((id, x, y)=>{
        setItems((prev)=>prev.map((item)=>item.id === id ? {
                    ...item,
                    x,
                    y
                } : item));
    }, []);
    const handleEmbedResizeEnd = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((id, w, h)=>{
        setItems((prev)=>{
            const next = prev.map((item)=>item.id === id ? {
                    ...item,
                    width: w,
                    height: h
                } : item);
            requestAnimationFrame(()=>pushHistory(next));
            return next;
        });
    }, [
        pushHistory
    ]);
    const handleEmbedDelete = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((id)=>{
        setItems((prev)=>{
            const next = prev.filter((item)=>item.id !== id);
            requestAnimationFrame(()=>pushHistory(next));
            return next;
        });
        setSelectedEmbedId(null);
    }, [
        pushHistory
    ]);
    // Drag-and-drop from desktop
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const container = containerRef.current;
        if (!container) return;
        const handleDragOver = (e)=>{
            e.preventDefault();
            e.stopPropagation();
        };
        const handleDrop = async (e)=>{
            e.preventDefault();
            e.stopPropagation();
            const files = e.dataTransfer?.files;
            if (!files || files.length === 0) return;
            for(let i = 0; i < files.length; i++){
                const file = files[i];
                if (file.type.startsWith('image/')) {
                    await handleImageFileSelect(file);
                } else {
                    await handleFileSelect(file);
                }
            }
        };
        container.addEventListener('dragover', handleDragOver);
        container.addEventListener('drop', handleDrop);
        return ()=>{
            container.removeEventListener('dragover', handleDragOver);
            container.removeEventListener('drop', handleDrop);
        };
    }, [
        handleImageFileSelect,
        handleFileSelect
    ]);
    // Clipboard paste support
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handlePaste = async (e)=>{
            // Don't intercept paste when editing text fields
            if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return;
            const items = e.clipboardData?.items;
            if (!items) return;
            for(let i = 0; i < items.length; i++){
                const item = items[i];
                if (item.type.startsWith('image/')) {
                    e.preventDefault();
                    const file = item.getAsFile();
                    if (file) await handleImageFileSelect(file);
                    return;
                }
            }
        };
        window.addEventListener('paste', handlePaste);
        return ()=>window.removeEventListener('paste', handlePaste);
    }, [
        handleImageFileSelect
    ]);
    /* ── Keyboard shortcuts ── */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handler = (e)=>{
            if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return;
            // Presentation mode shortcuts
            if (isPresenting) {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    exitPresentation();
                    return;
                } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
                    e.preventDefault();
                    navigateSlide(1);
                    return;
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    navigateSlide(-1);
                    return;
                } else if (e.key === 'n' || e.key === 'N') {
                    e.preventDefault();
                    setShowFrameNotesPanel((prev)=>!prev);
                    return;
                }
                return; // In presentation mode, only handle these shortcuts
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                undo();
            } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'z' && e.shiftKey)) {
                e.preventDefault();
                redo();
            } else if (e.key === 'Delete' && selectedStickyId && !editingStickyId) {
                e.preventDefault();
                handleStickyDelete(selectedStickyId);
            } else if (e.key === 'Delete' && selectedConnectorId) {
                e.preventDefault();
                handleConnectorDelete(selectedConnectorId);
            } else if (e.key === 'Escape' && editingStickyId) {
                e.preventDefault();
                setEditingStickyId(null);
                setEditingStickyText('');
            } else if (e.key === 'Escape' && editingFrameId) {
                e.preventDefault();
                setEditingFrameId(null);
                setEditingFrameTitle('');
                setEditingFrameNotes('');
            } else if (e.key === 'Escape' && connectingFrom) {
                e.preventDefault();
                setConnectingFrom(null);
                setTempConnectorEnd(null);
            } else if (e.key === 'Escape' && shapeSuggestion) {
                e.preventDefault();
                setShapeSuggestion(null);
            } else if (e.key === 'Enter' && shapeSuggestion) {
                e.preventDefault();
                acceptShapeSuggestion();
            } else if (e.key === 'l' || e.key === 'L') {
                e.preventDefault();
                setTool((prev)=>prev === 'laser' ? 'pen' : 'laser');
                setTextInput(null);
                setTextValue('');
                setSelectedStickyId(null);
                setSelectedConnectorId(null);
                setConnectingFrom(null);
                setTempConnectorEnd(null);
            }
        };
        window.addEventListener('keydown', handler);
        return ()=>window.removeEventListener('keydown', handler);
    }, [
        undo,
        redo,
        selectedStickyId,
        editingStickyId,
        handleStickyDelete,
        selectedConnectorId,
        handleConnectorDelete,
        connectingFrom,
        isPresenting,
        exitPresentation,
        navigateSlide,
        editingFrameId,
        shapeSuggestion,
        acceptShapeSuggestion
    ]);
    /* ── Get pointer position relative to stage (world coordinates) ── */ const getPointerPos = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        const stage = stageRef.current;
        if (!stage) return null;
        const pos = stage.getPointerPosition();
        if (!pos) return null;
        // Transform screen position to world position
        const worldX = (pos.x - stagePosRef.current.x) / zoomLevelRef.current;
        const worldY = (pos.y - stagePosRef.current.y) / zoomLevelRef.current;
        return {
            x: worldX,
            y: worldY
        };
    }, []);
    /* ── Find nearest anchor for a position on a given item ── */ const findNearestAnchor = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((itemId, pos)=>{
        const item = itemsRef.current.find((i)=>i.id === itemId);
        if (!item) return null;
        const anchors = getAnchorPoints(item);
        let bestDist = Infinity;
        let bestAnchor = null;
        for (const [key, pt] of Object.entries(anchors)){
            const dist = Math.hypot(pt.x - pos.x, pt.y - pos.y);
            if (dist < bestDist) {
                bestDist = dist;
                bestAnchor = key;
            }
        }
        return bestAnchor;
    }, []);
    /* ── Mouse/Touch handlers ── */ const handleMouseDown = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((e)=>{
        // Handle pinch-to-zoom touch end reset
        const touchEvt = e.evt;
        if (touchEvt.touches && touchEvt.touches.length === 0) {
            lastTouchDistRef.current = null;
            lastTouchCenterRef.current = null;
        }
        // Check for pan start: Space+click or middle mouse button
        const mouseEvt = e.evt;
        if ((spaceHeldRef.current || mouseEvt.button === 1) && tool !== 'connector') {
            setIsPanning(true);
            isPanningRef.current = true;
            const pos = stageRef.current?.getPointerPosition();
            if (pos) {
                setPanStart({
                    x: pos.x,
                    y: pos.y,
                    stageX: stagePosRef.current.x,
                    stageY: stagePosRef.current.y
                });
                panStartRef.current = {
                    x: pos.x,
                    y: pos.y,
                    stageX: stagePosRef.current.x,
                    stageY: stagePosRef.current.y
                };
            }
            e.cancelBubble = true;
            return;
        }
        // Laser pointer: activate on mouse down, add trail point
        if (tool === 'laser') {
            setLaserActive(true);
            laserActiveRef.current = true;
            const pos = getPointerPos();
            if (pos) {
                const newPoint = {
                    x: pos.x,
                    y: pos.y,
                    timestamp: Date.now()
                };
                setLaserTrail((prev)=>[
                        ...prev.slice(-LASER_TRAIL_MAX_POINTS),
                        newPoint
                    ]);
                // Broadcast
                if (onLaserMove) {
                    const now = Date.now();
                    if (now - lastLaserBroadcastRef.current >= LASER_BROADCAST_INTERVAL) {
                        lastLaserBroadcastRef.current = now;
                        onLaserMove({
                            x: pos.x,
                            y: pos.y
                        });
                    }
                }
            }
            return;
        }
        // Frame tool: start drawing a frame
        if (tool === 'frame') {
            const pos = getPointerPos();
            if (!pos) return;
            isDrawing.current = true;
            drawStart.current = pos;
            const newFrame = {
                id: generateId(),
                type: 'frame',
                x: pos.x,
                y: pos.y,
                width: 0,
                height: 0,
                strokeColor: 'rgba(255,255,255,0.2)',
                fillColor: 'rgba(26,29,39,0.5)',
                strokeWidth: 1.5,
                opacity: 1,
                frameTitle: `Slide ${itemsRef.current.filter((i)=>i.type === 'frame').length + 1}`,
                frameNotes: '',
                frameBgColor: 'rgba(26,29,39,0.5)'
            };
            setTempItem(newFrame);
            return;
        }
        // Check if clicking on an anchor point (connector tool)
        const targetName = e.target.getName();
        if (targetName?.startsWith('anchor-') && tool === 'connector') {
            const anchor = targetName.replace('anchor-', '');
            // Find parent item
            const stage = stageRef.current;
            if (!stage) return;
            const pos = stage.getPointerPosition();
            if (!pos) return;
            // Find which item has this anchor position nearby
            const connectableItems = itemsRef.current.filter((i)=>[
                    'sticky',
                    'rect',
                    'circle',
                    'diamond',
                    'image',
                    'file',
                    'link',
                    'text'
                ].includes(i.type));
            for (const item of connectableItems){
                const anchors = getAnchorPoints(item);
                const anchorPt = anchors[anchor];
                if (anchorPt && Math.hypot(anchorPt.x - pos.x, anchorPt.y - pos.y) < 15) {
                    setConnectingFrom({
                        itemId: item.id,
                        anchor
                    });
                    connectingFromRef.current = {
                        itemId: item.id,
                        anchor
                    };
                    isDrawing.current = true;
                    e.cancelBubble = true;
                    return;
                }
            }
        }
        // Check if clicking on a connector line (to select it)
        if (targetName === 'connector-line' || e.target.getParent()?.getName?.() === 'connector-line') {
            const connId = e.target.getId();
            if (connId && tool === 'connector') {
                setSelectedConnectorId(connId);
                e.cancelBubble = true;
                return;
            }
        }
        // If clicking on a sticky note, handle differently for connector tool
        const clickedOnSticky = e.target.findAncestor((node)=>node.getName() === 'sticky-group');
        if (clickedOnSticky && tool === 'connector') {
            // For connector tool on sticky: find nearest anchor
            const stage = stageRef.current;
            if (!stage) return;
            const pos = stage.getPointerPosition();
            if (!pos) return;
            const stickyId = clickedOnSticky.getId();
            const nearestAnchor = findNearestAnchor(stickyId, pos);
            if (nearestAnchor) {
                // If already connecting, complete the connection
                if (connectingFromRef.current && connectingFromRef.current.itemId !== stickyId) {
                    const newConnector = {
                        id: generateId(),
                        type: 'connector',
                        sourceId: connectingFromRef.current.itemId,
                        sourceAnchor: connectingFromRef.current.anchor,
                        targetId: stickyId,
                        targetAnchor: nearestAnchor,
                        connectorStyle,
                        showArrowhead: connectorArrowhead,
                        strokeColor: color,
                        fillColor: 'transparent',
                        strokeWidth: 2,
                        opacity: 0.85
                    };
                    setItems((prev)=>{
                        const next = [
                            ...prev,
                            newConnector
                        ];
                        requestAnimationFrame(()=>pushHistory(next));
                        return next;
                    });
                    setConnectingFrom(null);
                    connectingFromRef.current = null;
                    setTempConnectorEnd(null);
                    isDrawing.current = false;
                    return;
                }
                // Start connecting
                setConnectingFrom({
                    itemId: stickyId,
                    anchor: nearestAnchor
                });
                connectingFromRef.current = {
                    itemId: stickyId,
                    anchor: nearestAnchor
                };
                isDrawing.current = true;
                e.cancelBubble = true;
                return;
            }
            return;
        }
        if (clickedOnSticky) {
            return;
        }
        // If editing a sticky note, commit and close
        if (editingStickyId) {
            commitStickyText();
        }
        // Deselect sticky note when clicking on empty canvas
        setSelectedStickyId(null);
        setSelectedConnectorId(null);
        setSelectedEmbedId(null);
        setShowInsertMenu(false);
        const pos = getPointerPos();
        if (!pos) return;
        // If clicking on text input overlay, don't start drawing
        if (textInput?.visible) return;
        // Connector tool: check if clicking on a rect/circle/text shape
        if (tool === 'connector') {
            const clickedId = e.target.getId();
            if (clickedId) {
                const clickedItem = itemsRef.current.find((i)=>i.id === clickedId);
                if (clickedItem && [
                    'rect',
                    'circle',
                    'diamond',
                    'image',
                    'file',
                    'link',
                    'text'
                ].includes(clickedItem.type)) {
                    const nearestAnchor = findNearestAnchor(clickedId, pos);
                    if (nearestAnchor) {
                        if (connectingFromRef.current && connectingFromRef.current.itemId !== clickedId) {
                            const newConnector = {
                                id: generateId(),
                                type: 'connector',
                                sourceId: connectingFromRef.current.itemId,
                                sourceAnchor: connectingFromRef.current.anchor,
                                targetId: clickedId,
                                targetAnchor: nearestAnchor,
                                connectorStyle,
                                showArrowhead: connectorArrowhead,
                                strokeColor: color,
                                fillColor: 'transparent',
                                strokeWidth: 2,
                                opacity: 0.85
                            };
                            setItems((prev)=>{
                                const next = [
                                    ...prev,
                                    newConnector
                                ];
                                requestAnimationFrame(()=>pushHistory(next));
                                return next;
                            });
                            setConnectingFrom(null);
                            connectingFromRef.current = null;
                            setTempConnectorEnd(null);
                            isDrawing.current = false;
                            return;
                        }
                        setConnectingFrom({
                            itemId: clickedId,
                            anchor: nearestAnchor
                        });
                        connectingFromRef.current = {
                            itemId: clickedId,
                            anchor: nearestAnchor
                        };
                        isDrawing.current = true;
                        return;
                    }
                }
            }
            // Clicking empty space with connector tool - if connecting, cancel
            if (connectingFromRef.current) {
                setConnectingFrom(null);
                connectingFromRef.current = null;
                setTempConnectorEnd(null);
                isDrawing.current = false;
            }
            return;
        }
        if (tool === 'text') {
            setTextInput({
                visible: true,
                x: pos.x,
                y: pos.y
            });
            setTextValue('');
            setTimeout(()=>textAreaRef.current?.focus(), 50);
            return;
        }
        if (tool === 'sticky') {
            // Create a new sticky note at click position
            const sc = STICKY_COLORS[stickyColorIdx];
            const newItem = {
                id: generateId(),
                type: 'sticky',
                x: pos.x - 90,
                y: pos.y - 80,
                width: 180,
                height: 160,
                strokeColor: 'transparent',
                fillColor: 'transparent',
                strokeWidth: 1,
                opacity: 1,
                text: '',
                fontSize: 14,
                fontFamily: 'Arial',
                stickyColor: sc.body,
                stickyFoldColor: sc.fold,
                stickyTextColor: sc.text
            };
            setItems((prev)=>{
                const next = [
                    ...prev,
                    newItem
                ];
                requestAnimationFrame(()=>pushHistory(next));
                return next;
            });
            // Immediately start editing the text
            setEditingStickyId(newItem.id);
            setEditingStickyText('');
            setTimeout(()=>stickyEditRef.current?.focus(), 80);
            return;
        }
        isDrawing.current = true;
        if (tool === 'pen' || tool === 'highlighter' || tool === 'eraser') {
            const isHighlighter = tool === 'highlighter';
            const isEraser = tool === 'eraser';
            const newPoints = [
                pos.x,
                pos.y,
                pos.x,
                pos.y
            ];
            currentPoints.current = newPoints;
            const newItem = {
                id: generateId(),
                type: 'line',
                points: [
                    ...newPoints
                ],
                strokeColor: isEraser ? CANVAS_BG : color,
                fillColor: 'transparent',
                strokeWidth: isEraser ? brushSize * 4 : isHighlighter ? brushSize * 5 : brushSize,
                opacity: isHighlighter ? 0.35 : 1,
                globalCompositeOperation: isEraser ? 'destination-out' : undefined,
                dash: undefined
            };
            setTempItem(newItem);
        } else {
            // Shape tools: rectangle, circle, line, arrow
            drawStart.current = pos;
        }
    }, [
        tool,
        color,
        brushSize,
        getPointerPos,
        textInput,
        editingStickyId,
        stickyColorIdx,
        pushHistory,
        connectorStyle,
        connectorArrowhead,
        findNearestAnchor
    ]);
    const handleMouseMove = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((e)=>{
        // Broadcast cursor position (throttled to 15fps)
        if (onCursorMove) {
            const now = Date.now();
            if (now - lastCursorBroadcastRef.current >= CURSOR_BROADCAST_INTERVAL) {
                lastCursorBroadcastRef.current = now;
                const pos = getPointerPos();
                if (pos) {
                    onCursorMove({
                        x: pos.x,
                        y: pos.y,
                        tool
                    });
                }
            }
        }
        // Handle pinch-to-zoom
        const touchEvt = e.evt;
        if (touchEvt.touches && touchEvt.touches.length === 2) {
            const t1 = {
                x: touchEvt.touches[0].clientX,
                y: touchEvt.touches[0].clientY
            };
            const t2 = {
                x: touchEvt.touches[1].clientX,
                y: touchEvt.touches[1].clientY
            };
            const dist = Math.hypot(t2.x - t1.x, t2.y - t1.y);
            const center = {
                x: (t1.x + t2.x) / 2,
                y: (t1.y + t2.y) / 2
            };
            if (lastTouchDistRef.current !== null) {
                const scaleRatio = dist / lastTouchDistRef.current;
                const oldScale = zoomLevelRef.current;
                const newScale = Math.max(0.1, Math.min(5, oldScale * scaleRatio));
                const containerRect = containerRef.current?.getBoundingClientRect();
                if (containerRect) {
                    const pointer = {
                        x: center.x - containerRect.left,
                        y: center.y - containerRect.top
                    };
                    const mousePointTo = {
                        x: (pointer.x - stagePosRef.current.x) / oldScale,
                        y: (pointer.y - stagePosRef.current.y) / oldScale
                    };
                    setStagePos({
                        x: pointer.x - mousePointTo.x * newScale,
                        y: pointer.y - mousePointTo.y * newScale
                    });
                }
                setZoomLevel(newScale);
            }
            lastTouchDistRef.current = dist;
            lastTouchCenterRef.current = center;
            return;
        }
        // Handle panning
        if (isPanningRef.current && panStartRef.current) {
            const pos = stageRef.current?.getPointerPosition();
            if (!pos) return;
            const dx = pos.x - panStartRef.current.x;
            const dy = pos.y - panStartRef.current.y;
            setStagePos({
                x: panStartRef.current.stageX + dx,
                y: panStartRef.current.stageY + dy
            });
            return;
        }
        // Handle connector connecting preview
        if (connectingFromRef.current && tool === 'connector') {
            const pos = getPointerPos();
            if (!pos) return;
            setTempConnectorEnd(pos);
            // Check if hovering over a connectable element for anchor display
            const targetName = e.target.getName();
            const clickedOnSticky = e.target.findAncestor((node)=>node.getName() === 'sticky-group');
            if (clickedOnSticky) {
                setHoveredItemId(clickedOnSticky.getId());
            } else {
                const targetId = e.target.getId();
                if (targetId) {
                    const item = itemsRef.current.find((i)=>i.id === targetId);
                    if (item && [
                        'rect',
                        'circle',
                        'diamond',
                        'image',
                        'file',
                        'link',
                        'text'
                    ].includes(item.type)) {
                        setHoveredItemId(targetId);
                    } else {
                        setHoveredItemId(null);
                    }
                } else {
                    setHoveredItemId(null);
                }
            }
            return;
        }
        // Update hovered item for anchor display (connector tool only)
        if (tool === 'connector' && !connectingFromRef.current) {
            const clickedOnSticky = e.target.findAncestor((node)=>node.getName() === 'sticky-group');
            if (clickedOnSticky) {
                setHoveredItemId(clickedOnSticky.getId());
            } else {
                const targetId = e.target.getId();
                if (targetId) {
                    const item = itemsRef.current.find((i)=>i.id === targetId);
                    if (item && [
                        'rect',
                        'circle',
                        'diamond',
                        'image',
                        'file',
                        'link',
                        'text'
                    ].includes(item.type)) {
                        setHoveredItemId(targetId);
                    } else {
                        setHoveredItemId(null);
                    }
                } else {
                    setHoveredItemId(null);
                }
            }
        }
        // Handle laser pointer trail
        if (tool === 'laser' && laserActiveRef.current) {
            const pos = getPointerPos();
            if (pos) {
                const newPoint = {
                    x: pos.x,
                    y: pos.y,
                    timestamp: Date.now()
                };
                setLaserTrail((prev)=>[
                        ...prev.slice(-LASER_TRAIL_MAX_POINTS),
                        newPoint
                    ]);
                // Broadcast (throttled)
                if (onLaserMove) {
                    const now = Date.now();
                    if (now - lastLaserBroadcastRef.current >= LASER_BROADCAST_INTERVAL) {
                        lastLaserBroadcastRef.current = now;
                        onLaserMove({
                            x: pos.x,
                            y: pos.y
                        });
                    }
                }
            }
            return;
        }
        // Handle sticky note resize
        if (resizingRef.current) {
            const pos = getPointerPos();
            if (!pos) return;
            const { stickyId, startX, startY, startW, startH } = resizingRef.current;
            const newW = Math.max(100, startW + (pos.x - startX));
            const newH = Math.max(80, startH + (pos.y - startY));
            setItems((prev)=>prev.map((item)=>item.id === stickyId ? {
                        ...item,
                        width: newW,
                        height: newH
                    } : item));
            return;
        }
        if (!isDrawing.current) return;
        const pos = getPointerPos();
        if (!pos) return;
        // Frame drawing
        if (tool === 'frame' && drawStart.current) {
            const x = Math.min(drawStart.current.x, pos.x);
            const y = Math.min(drawStart.current.y, pos.y);
            const w = Math.abs(pos.x - drawStart.current.x);
            const h = Math.abs(pos.y - drawStart.current.y);
            setTempItem((prev)=>{
                if (!prev) return null;
                return {
                    ...prev,
                    x,
                    y,
                    width: w,
                    height: h
                };
            });
            return;
        }
        if (tool === 'pen' || tool === 'highlighter' || tool === 'eraser') {
            // Append point to current line
            currentPoints.current = [
                ...currentPoints.current,
                pos.x,
                pos.y
            ];
            setTempItem((prev)=>{
                if (!prev) return prev;
                return {
                    ...prev,
                    points: [
                        ...currentPoints.current
                    ]
                };
            });
        } else if (drawStart.current) {
            // Shape preview
            const sx = drawStart.current.x;
            const sy = drawStart.current.y;
            const dx = pos.x - sx;
            const dy = pos.y - sy;
            if (tool === 'rectangle') {
                setTempItem({
                    id: 'temp-shape',
                    type: 'rect',
                    x: Math.min(sx, pos.x),
                    y: Math.min(sy, pos.y),
                    width: Math.abs(dx),
                    height: Math.abs(dy),
                    strokeColor: color,
                    fillColor: 'transparent',
                    strokeWidth: brushSize,
                    opacity: 1
                });
            } else if (tool === 'circle') {
                const radius = Math.sqrt(dx * dx + dy * dy);
                setTempItem({
                    id: 'temp-shape',
                    type: 'circle',
                    x: sx,
                    y: sy,
                    radius,
                    strokeColor: color,
                    fillColor: 'transparent',
                    strokeWidth: brushSize,
                    opacity: 1
                });
            } else if (tool === 'line') {
                setTempItem({
                    id: 'temp-shape',
                    type: 'line',
                    points: [
                        sx,
                        sy,
                        pos.x,
                        pos.y
                    ],
                    strokeColor: color,
                    fillColor: 'transparent',
                    strokeWidth: brushSize,
                    opacity: 1
                });
            } else if (tool === 'arrow') {
                setTempItem({
                    id: 'temp-shape',
                    type: 'arrow',
                    points: [
                        sx,
                        sy,
                        pos.x,
                        pos.y
                    ],
                    strokeColor: color,
                    fillColor: color,
                    strokeWidth: brushSize,
                    opacity: 1
                });
            }
        }
    }, [
        tool,
        color,
        brushSize,
        getPointerPos,
        onCursorMove
    ]);
    const handleMouseUp = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((e)=>{
        // Reset pinch-to-zoom state on touch end
        const touchEvt = e.evt;
        if (touchEvt.touches && touchEvt.touches.length === 0) {
            lastTouchDistRef.current = null;
            lastTouchCenterRef.current = null;
        }
        // End panning
        if (isPanningRef.current) {
            setIsPanning(false);
            isPanningRef.current = false;
            setPanStart(null);
            panStartRef.current = null;
            return;
        }
        // End laser pointer
        if (tool === 'laser' && laserActiveRef.current) {
            setLaserActive(false);
            laserActiveRef.current = false;
            onLaserStop?.();
            return;
        }
        // Handle connector completion
        if (connectingFromRef.current && tool === 'connector') {
            const targetName = e.target.getName();
            // Check if releasing on an anchor point
            if (targetName?.startsWith('anchor-')) {
                const anchor = targetName.replace('anchor-', '');
                const stage = stageRef.current;
                if (stage) {
                    const pos = stage.getPointerPosition();
                    if (pos) {
                        const connectableItems = itemsRef.current.filter((i)=>[
                                'sticky',
                                'rect',
                                'circle',
                                'diamond',
                                'image',
                                'file',
                                'link',
                                'text'
                            ].includes(i.type));
                        for (const item of connectableItems){
                            if (item.id === connectingFromRef.current.itemId) continue;
                            const anchors = getAnchorPoints(item);
                            const anchorPt = anchors[anchor];
                            if (anchorPt && Math.hypot(anchorPt.x - pos.x, anchorPt.y - pos.y) < 15) {
                                const newConnector = {
                                    id: generateId(),
                                    type: 'connector',
                                    sourceId: connectingFromRef.current.itemId,
                                    sourceAnchor: connectingFromRef.current.anchor,
                                    targetId: item.id,
                                    targetAnchor: anchor,
                                    connectorStyle,
                                    showArrowhead: connectorArrowhead,
                                    strokeColor: color,
                                    fillColor: 'transparent',
                                    strokeWidth: 2,
                                    opacity: 0.85
                                };
                                setItems((prev)=>{
                                    const next = [
                                        ...prev,
                                        newConnector
                                    ];
                                    requestAnimationFrame(()=>pushHistory(next));
                                    return next;
                                });
                                break;
                            }
                        }
                    }
                }
            } else {
                // Check if releasing on a sticky or other connectable element
                const clickedOnSticky = e.target.findAncestor((node)=>node.getName() === 'sticky-group');
                const targetId = clickedOnSticky ? clickedOnSticky.getId() : e.target.getId();
                if (targetId && targetId !== connectingFromRef.current.itemId) {
                    const targetItem = itemsRef.current.find((i)=>i.id === targetId);
                    if (targetItem && [
                        'sticky',
                        'rect',
                        'circle',
                        'diamond',
                        'image',
                        'file',
                        'link',
                        'text'
                    ].includes(targetItem.type)) {
                        const stage = stageRef.current;
                        const pos = stage?.getPointerPosition();
                        if (pos) {
                            const nearestAnchor = findNearestAnchor(targetId, pos);
                            if (nearestAnchor) {
                                const newConnector = {
                                    id: generateId(),
                                    type: 'connector',
                                    sourceId: connectingFromRef.current.itemId,
                                    sourceAnchor: connectingFromRef.current.anchor,
                                    targetId,
                                    targetAnchor: nearestAnchor,
                                    connectorStyle,
                                    showArrowhead: connectorArrowhead,
                                    strokeColor: color,
                                    fillColor: 'transparent',
                                    strokeWidth: 2,
                                    opacity: 0.85
                                };
                                setItems((prev)=>{
                                    const next = [
                                        ...prev,
                                        newConnector
                                    ];
                                    requestAnimationFrame(()=>pushHistory(next));
                                    return next;
                                });
                            }
                        }
                    }
                }
            }
            setConnectingFrom(null);
            connectingFromRef.current = null;
            setTempConnectorEnd(null);
            isDrawing.current = false;
            return;
        }
        // End sticky note resize
        if (resizingRef.current) {
            const nextItems = itemsRef.current;
            requestAnimationFrame(()=>pushHistory(nextItems));
            resizingRef.current = null;
            return;
        }
        if (!isDrawing.current) return;
        isDrawing.current = false;
        // Frame tool: commit frame
        if (tool === 'frame' && tempItem && tempItem.type === 'frame') {
            const w = tempItem.width || 0;
            const h = tempItem.height || 0;
            if (w > 40 && h > 30) {
                setItems((prev)=>{
                    const next = [
                        ...prev,
                        tempItem
                    ];
                    requestAnimationFrame(()=>pushHistory(next));
                    return next;
                });
            }
            setTempItem(null);
            drawStart.current = null;
            return;
        }
        if (tempItem) {
            const newItem = {
                ...tempItem,
                id: generateId()
            };
            setItems((prev)=>{
                const next = [
                    ...prev,
                    newItem
                ];
                // Push to history after state update
                requestAnimationFrame(()=>pushHistory(next));
                return next;
            });
            // Shape recognition: check if pen/highlighter stroke resembles a known shape
            if (shapeRecognitionEnabled && (tool === 'pen' || tool === 'highlighter') && newItem.points && newItem.points.length >= 16) {
                const result = recognizeShape(newItem.points);
                if (result && result.shape && result.confidence >= 0.5) {
                    const shapeNames = {
                        circle: 'Circle',
                        rect: 'Rectangle',
                        triangle: 'Triangle',
                        diamond: 'Diamond',
                        arrow: 'Arrow'
                    };
                    const shapeName = shapeNames[result.shape] || result.shape;
                    // Build the replacement DrawItem with inherited properties
                    const replacement = {
                        id: generateId(),
                        type: result.drawItem.type || 'circle',
                        strokeColor: newItem.strokeColor,
                        fillColor: result.drawItem.fillColor || 'transparent',
                        strokeWidth: newItem.strokeWidth,
                        opacity: newItem.opacity,
                        ...result.drawItem
                    };
                    // Fix: for arrow type, fillColor should match strokeColor
                    if (replacement.type === 'arrow') {
                        replacement.fillColor = replacement.strokeColor;
                    }
                    // Calculate center position for the toast
                    const pts = newItem.points;
                    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                    for(let i = 0; i < pts.length - 1; i += 2){
                        if (pts[i] < minX) minX = pts[i];
                        if (pts[i + 1] < minY) minY = pts[i + 1];
                        if (pts[i] > maxX) maxX = pts[i];
                        if (pts[i + 1] > maxY) maxY = pts[i + 1];
                    }
                    const toastPos = {
                        x: (minX + maxX) / 2,
                        y: Math.min(minY, minY - 30)
                    };
                    setShapeSuggestion({
                        shapeName,
                        confidence: result.confidence,
                        freeformId: newItem.id,
                        replacementItem: replacement,
                        position: toastPos
                    });
                    // Auto-dismiss after 4 seconds
                    setTimeout(()=>{
                        setShapeSuggestion((prev)=>prev?.freeformId === newItem.id ? null : prev);
                    }, 4000);
                }
            }
            setTempItem(null);
        }
        drawStart.current = null;
        currentPoints.current = [];
    }, [
        tempItem,
        pushHistory,
        tool,
        connectorStyle,
        connectorArrowhead,
        color,
        findNearestAnchor,
        shapeRecognitionEnabled
    ]);
    const handleMouseLeave = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (isDrawing.current) {
            handleMouseUp({});
        }
        // Deactivate laser pointer
        if (laserActiveRef.current) {
            setLaserActive(false);
            laserActiveRef.current = false;
            onLaserStop?.();
        }
        setHoveredItemId(null);
        // Broadcast cursor leave to remote users
        onCursorLeave?.();
    }, [
        handleMouseUp,
        onCursorLeave,
        onLaserStop
    ]);
    /* ── Text input commit ── */ const commitText = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!textInput || !textValue.trim()) {
            setTextInput(null);
            setTextValue('');
            return;
        }
        const newItem = {
            id: generateId(),
            type: 'text',
            x: textInput.x,
            y: textInput.y,
            text: textValue,
            strokeColor: color,
            fillColor: 'transparent',
            strokeWidth: 1,
            opacity: 1,
            fontSize: 18,
            fontFamily: 'Arial'
        };
        setItems((prev)=>{
            const next = [
                ...prev,
                newItem
            ];
            requestAnimationFrame(()=>pushHistory(next));
            return next;
        });
        setTextInput(null);
        setTextValue('');
    }, [
        textInput,
        textValue,
        color,
        pushHistory
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!textInput?.visible) return;
        const handler = (e)=>{
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                commitText();
            } else if (e.key === 'Escape') {
                setTextInput(null);
                setTextValue('');
            }
        };
        window.addEventListener('keydown', handler);
        return ()=>window.removeEventListener('keydown', handler);
    }, [
        textInput,
        commitText
    ]);
    /* ── Sticky note handlers already declared above ── */ /* ── Clear canvas ── */ const clearCanvas = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setItems([]);
        setTempItem(null);
        pushHistory([]);
        onSave('');
        sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('Canvas cleared');
    }, [
        onSave,
        pushHistory
    ]);
    /* ── Export to PNG ── */ const captureCanvas = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        const stage = stageRef.current;
        if (!stage) return;
        const dataUrl = stage.toDataURL({
            pixelRatio: 2
        });
        onSave(dataUrl);
        sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('Captured! Tap Send to share.');
    }, [
        onSave
    ]);
    /* ── Apply template ── */ const applyTemplate = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((templateItems)=>{
        setItems(templateItems);
        setTempItem(null);
        pushHistory(templateItems);
        setShowTemplatePanel(false);
        sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('Template applied!');
    }, [
        pushHistory
    ]);
    /* ── Anchor click handler ── */ const handleAnchorClick = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((itemId, anchor)=>{
        if (connectingFromRef.current) {
            // Complete the connection
            if (connectingFromRef.current.itemId !== itemId) {
                const newConnector = {
                    id: generateId(),
                    type: 'connector',
                    sourceId: connectingFromRef.current.itemId,
                    sourceAnchor: connectingFromRef.current.anchor,
                    targetId: itemId,
                    targetAnchor: anchor,
                    connectorStyle,
                    showArrowhead: connectorArrowhead,
                    strokeColor: color,
                    fillColor: 'transparent',
                    strokeWidth: 2,
                    opacity: 0.85
                };
                setItems((prev)=>{
                    const next = [
                        ...prev,
                        newConnector
                    ];
                    requestAnimationFrame(()=>pushHistory(next));
                    return next;
                });
            }
            setConnectingFrom(null);
            connectingFromRef.current = null;
            setTempConnectorEnd(null);
        } else {
            // Start connecting
            setConnectingFrom({
                itemId,
                anchor
            });
            connectingFromRef.current = {
                itemId,
                anchor
            };
            isDrawing.current = true;
        }
    }, [
        connectorStyle,
        connectorArrowhead,
        color,
        pushHistory
    ]);
    /* ── Recording: Create composite stream ── */ const createCompositeStream = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((stage, mic)=>{
        const stageCanvas = stage.toCanvas({
            pixelRatio: 1
        });
        const w = stageCanvas.width;
        const h = stageCanvas.height;
        // Create offscreen composite canvas for recording
        const compositeCanvas = document.createElement('canvas');
        compositeCanvas.width = w;
        compositeCanvas.height = h;
        const ctx = compositeCanvas.getContext('2d');
        compositeCanvasRef.current = compositeCanvas;
        compositeCtxRef.current = ctx;
        // Canvas capture stream at target FPS
        const fps = 15;
        const canvasStream = compositeCanvas.captureStream(fps);
        canvasStreamRef.current = canvasStream;
        // Composite loop: draw current stage every frame
        let lastDrawTime = 0;
        const frameInterval = 1000 / fps;
        const drawFrame = (now)=>{
            if (now - lastDrawTime < frameInterval) {
                animFrameRef.current = requestAnimationFrame(drawFrame);
                return;
            }
            lastDrawTime = now;
            try {
                ctx.clearRect(0, 0, w, h);
                // Fill background
                ctx.fillStyle = CANVAS_BG;
                ctx.fillRect(0, 0, w, h);
                const currentCanvas = stage.toCanvas({
                    pixelRatio: 1
                });
                ctx.drawImage(currentCanvas, 0, 0, w, h);
            } catch  {
            // Stage might be unmounted
            }
            animFrameRef.current = requestAnimationFrame(drawFrame);
        };
        animFrameRef.current = requestAnimationFrame(drawFrame);
        // Combine video tracks with audio tracks
        const tracks = [
            ...canvasStream.getVideoTracks()
        ];
        if (mic) {
            tracks.push(...mic.getAudioTracks());
        }
        return new MediaStream(tracks);
    }, []);
    /* ── Recording: Cleanup ── */ const cleanupRecording = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (animFrameRef.current) {
            cancelAnimationFrame(animFrameRef.current);
            animFrameRef.current = 0;
        }
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        if (canvasStreamRef.current) {
            canvasStreamRef.current.getTracks().forEach((t)=>t.stop());
            canvasStreamRef.current = null;
        }
        if (micStreamRef.current) {
            micStreamRef.current.getTracks().forEach((t)=>t.stop());
            micStreamRef.current = null;
        }
        compositeCanvasRef.current = null;
        compositeCtxRef.current = null;
        mediaRecorderRef.current = null;
        chunksRef.current = [];
        setRecStatus('idle');
        setRecDuration(0);
    }, []);
    /* ── Cleanup on unmount ── */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        return ()=>{
            cleanupRecording();
        };
    }, [
        cleanupRecording
    ]);
    /* ── Recording: Start ── */ const startRecording = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        const stage = stageRef.current;
        if (!stage) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Canvas not ready');
            return;
        }
        try {
            // Request microphone permission
            let mic = null;
            try {
                mic = await navigator.mediaDevices.getUserMedia({
                    audio: true
                });
                micStreamRef.current = mic;
            } catch  {
                (0,sonner__WEBPACK_IMPORTED_MODULE_3__.toast)('Microphone unavailable — recording without audio', {
                    icon: '🎤'
                });
            }
            const compositeStream = createCompositeStream(stage, mic);
            // Determine MIME type
            const mimeTypes = [
                'video/webm;codecs=vp9,opus',
                'video/webm;codecs=vp8,opus',
                'video/webm'
            ];
            const mimeType = mimeTypes.find((mt)=>{
                try {
                    return MediaRecorder.isTypeSupported(mt);
                } catch  {
                    return false;
                }
            }) || '';
            const recorder = new MediaRecorder(compositeStream, {
                mimeType: mimeType || undefined,
                videoBitsPerSecond: 2500000,
                audioBitsPerSecond: 128000
            });
            chunksRef.current = [];
            mediaRecorderRef.current = recorder;
            recorder.ondataavailable = (e)=>{
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };
            recorder.onerror = ()=>{
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Recording failed');
                cleanupRecording();
            };
            recorder.start(1000);
            recStartRef.current = Date.now();
            pausedDurationRef.current = 0;
            // Timer
            timerRef.current = setInterval(()=>{
                const elapsed = Date.now() - recStartRef.current - pausedDurationRef.current;
                setRecDuration(elapsed);
            }, 200);
            setRecStatus('recording');
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('Recording started');
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error(err.message || 'Failed to start recording');
        }
    }, [
        createCompositeStream,
        cleanupRecording
    ]);
    /* ── Recording: Pause ── */ const pauseRecording = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (mediaRecorderRef.current?.state === 'recording') {
            mediaRecorderRef.current.pause();
            pauseStartRef.current = Date.now();
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
                animFrameRef.current = 0;
            }
            setRecStatus('paused');
        }
    }, []);
    /* ── Recording: Resume ── */ const resumeRecording = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (mediaRecorderRef.current?.state === 'paused') {
            mediaRecorderRef.current.resume();
            pausedDurationRef.current += Date.now() - pauseStartRef.current;
            // Restart composite animation loop
            const stage = stageRef.current;
            if (stage && compositeCanvasRef.current && compositeCtxRef.current) {
                const w = compositeCanvasRef.current.width;
                const h = compositeCanvasRef.current.height;
                const ctx = compositeCtxRef.current;
                const fps = 15;
                let lastDrawTime = 0;
                const frameInterval = 1000 / fps;
                const drawFrame = (now)=>{
                    if (now - lastDrawTime < frameInterval) {
                        animFrameRef.current = requestAnimationFrame(drawFrame);
                        return;
                    }
                    lastDrawTime = now;
                    try {
                        ctx.clearRect(0, 0, w, h);
                        ctx.fillStyle = CANVAS_BG;
                        ctx.fillRect(0, 0, w, h);
                        const currentCanvas = stage.toCanvas({
                            pixelRatio: 1
                        });
                        ctx.drawImage(currentCanvas, 0, 0, w, h);
                    } catch  {}
                    animFrameRef.current = requestAnimationFrame(drawFrame);
                };
                animFrameRef.current = requestAnimationFrame(drawFrame);
            }
            setRecStatus('recording');
        }
    }, []);
    /* ── Recording: Stop ── */ const stopRecording = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        return new Promise((resolve)=>{
            const recorder = mediaRecorderRef.current;
            if (!recorder || recorder.state === 'inactive') {
                cleanupRecording();
                resolve();
                return;
            }
            recorder.onstop = ()=>{
                const blob = new Blob(chunksRef.current, {
                    type: recorder.mimeType || 'video/webm'
                });
                const url = URL.createObjectURL(blob);
                if (onRecordingComplete) {
                    onRecordingComplete(blob, url);
                }
                cleanupRecording();
                sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success(`Recording saved (${formatTimer(recDuration)})`);
                resolve();
            };
            recorder.stop();
        });
    }, [
        onRecordingComplete,
        recDuration,
        cleanupRecording
    ]);
    /* ── Cursor style for canvas ── */ const cursorStyle = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (isPanning) return 'grabbing';
        if (spaceHeld) return 'grab';
        return TOOL_CONFIG[tool]?.cursor || 'default';
    }, [
        tool,
        isPanning,
        spaceHeld
    ]);
    /* ── Helper: world position to screen position ── */ const worldToScreen = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((wx, wy)=>{
        return {
            x: wx * zoomLevel + stagePos.x,
            y: wy * zoomLevel + stagePos.y
        };
    }, [
        zoomLevel,
        stagePos
    ]);
    /* ── Zoom preset handler ── */ const zoomToLevel = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((newZoom)=>{
        // Zoom centered on canvas center
        const centerX = dimensions.width / 2;
        const centerY = dimensions.height / 2;
        const oldScale = zoomLevelRef.current;
        const mousePointTo = {
            x: (centerX - stagePosRef.current.x) / oldScale,
            y: (centerY - stagePosRef.current.y) / oldScale
        };
        setStagePos({
            x: centerX - mousePointTo.x * newZoom,
            y: centerY - mousePointTo.y * newZoom
        });
        setZoomLevel(newZoom);
    }, [
        dimensions
    ]);
    /* ── Fit to content ── */ const fitToContent = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (items.length === 0) {
            zoomToLevel(1);
            return;
        }
        // Calculate bounding box of all items
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        items.forEach((item)=>{
            if (item.type === 'sticky' || item.type === 'rect' || item.type === 'frame') {
                minX = Math.min(minX, item.x || 0);
                minY = Math.min(minY, item.y || 0);
                maxX = Math.max(maxX, (item.x || 0) + (item.width || 0));
                maxY = Math.max(maxY, (item.y || 0) + (item.height || 0));
            } else if (item.type === 'circle') {
                minX = Math.min(minX, (item.x || 0) - (item.radius || 0));
                minY = Math.min(minY, (item.y || 0) - (item.radius || 0));
                maxX = Math.max(maxX, (item.x || 0) + (item.radius || 0));
                maxY = Math.max(maxY, (item.y || 0) + (item.radius || 0));
            } else if (item.type === 'text') {
                minX = Math.min(minX, item.x || 0);
                minY = Math.min(minY, item.y || 0);
                maxX = Math.max(maxX, (item.x || 0) + (item.text || '').length * (item.fontSize || 18) * 0.55);
                maxY = Math.max(maxY, (item.y || 0) + (item.fontSize || 18) * 1.2);
            } else if (item.type === 'line' || item.type === 'freeform' || item.type === 'arrow') {
                const pts = item.points || [];
                for(let i = 0; i < pts.length; i += 2){
                    minX = Math.min(minX, pts[i]);
                    minY = Math.min(minY, pts[i + 1]);
                    maxX = Math.max(maxX, pts[i]);
                    maxY = Math.max(maxY, pts[i + 1]);
                }
            }
        });
        if (minX === Infinity) return;
        const padding = 60;
        const contentW = maxX - minX + padding * 2;
        const contentH = maxY - minY + padding * 2;
        const scaleX = dimensions.width / contentW;
        const scaleY = dimensions.height / contentH;
        const newZoom = Math.max(0.1, Math.min(2, Math.min(scaleX, scaleY)));
        const contentCenterX = (minX + maxX) / 2;
        const contentCenterY = (minY + maxY) / 2;
        setStagePos({
            x: dimensions.width / 2 - contentCenterX * newZoom,
            y: dimensions.height / 2 - contentCenterY * newZoom
        });
        setZoomLevel(newZoom);
    }, [
        items,
        dimensions,
        zoomToLevel
    ]);
    /* ── Fit to frame ── */ const fitToFrame = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((frameId)=>{
        const frame = items.find((i)=>i.id === frameId);
        if (!frame) return;
        const fx = frame.x || 0;
        const fy = frame.y || 0;
        const fw = frame.width || 800;
        const fh = frame.height || 600;
        const padding = 40;
        const scaleX = dimensions.width / (fw + padding * 2);
        const scaleY = dimensions.height / (fh + padding * 2);
        const newZoom = Math.max(0.1, Math.min(5, Math.min(scaleX, scaleY)));
        setStagePos({
            x: dimensions.width / 2 - (fx + fw / 2) * newZoom,
            y: dimensions.height / 2 - (fy + fh / 2) * newZoom
        });
        setZoomLevel(newZoom);
    }, [
        items,
        dimensions
    ]);
    /* ── Export frame as PNG ── */ const exportFrameAsPng = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (frameId)=>{
        const frame = items.find((i)=>i.id === frameId);
        if (!frame) return;
        const stage = stageRef.current;
        if (!stage) return;
        const fx = frame.x || 0;
        const fy = frame.y || 0;
        const fw = frame.width || 800;
        const fh = frame.height || 600;
        try {
            const dataUrl = stage.toDataURL({
                x: fx,
                y: fy,
                width: fw,
                height: fh,
                pixelRatio: 2
            });
            const link = document.createElement('a');
            link.download = `${frame.frameTitle || 'frame'}.png`;
            link.href = dataUrl;
            link.click();
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success('Frame exported as PNG');
        } catch (err) {
            console.error('Export failed:', err);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Failed to export frame');
        }
    }, [
        items
    ]);
    /* ── Export all frames as PDF ── */ const exportAllFramesAsPdf = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (frameItems.length === 0) return;
        const stage = stageRef.current;
        if (!stage) return;
        try {
            const { jsPDF } = await Promise.all(/* import() */[__webpack_require__.e(70293), __webpack_require__.e(53930), __webpack_require__.e(84568)]).then(__webpack_require__.bind(__webpack_require__, 18831));
            const firstFrame = frameItems[0];
            const fw = firstFrame.width || 800;
            const fh = firstFrame.height || 600;
            const orientation = fw > fh ? 'landscape' : 'portrait';
            const pdf = new jsPDF({
                orientation,
                unit: 'px',
                format: [
                    fw,
                    fh
                ]
            });
            for(let i = 0; i < frameItems.length; i++){
                if (i > 0) {
                    const f = frameItems[i];
                    const fW = f.width || 800;
                    const fH = f.height || 600;
                    const orient = fW > fH ? 'landscape' : 'portrait';
                    pdf.addPage([
                        fW,
                        fH
                    ], orient);
                }
                const frame = frameItems[i];
                const fx = frame.x || 0;
                const fy = frame.y || 0;
                const fW = frame.width || 800;
                const fH = frame.height || 600;
                const dataUrl = stage.toDataURL({
                    x: fx,
                    y: fy,
                    width: fW,
                    height: fH,
                    pixelRatio: 2
                });
                pdf.addImage(dataUrl, 'PNG', 0, 0, fW, fH);
            }
            pdf.save('whiteboard-frames.pdf');
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success(`Exported ${frameItems.length} frames as PDF`);
        } catch (err) {
            console.error('PDF export failed:', err);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Failed to export PDF');
        }
    }, [
        frameItems
    ]);
    /* ── Comprehensive PDF Export ── */ const performPdfExport = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (config)=>{
        const stage = stageRef.current;
        if (!stage) return;
        setPdfExporting(true);
        setPdfExportProgress(0);
        try {
            const { jsPDF } = await Promise.all(/* import() */[__webpack_require__.e(70293), __webpack_require__.e(53930), __webpack_require__.e(84568)]).then(__webpack_require__.bind(__webpack_require__, 18831));
            const pageDim = config.pageSize === 'custom' ? {
                w: config.customWidth,
                h: config.customHeight
            } : PDF_PAGE_SIZES[config.pageSize];
            const pageW = config.orientation === 'landscape' ? Math.max(pageDim.w, pageDim.h) : pageDim.w;
            const pageH = config.orientation === 'landscape' ? Math.min(pageDim.w, pageDim.h) : pageDim.h;
            const margin = config.margin;
            const contentW = pageW - margin * 2;
            const contentH = pageH - margin * 2;
            const pages = [];
            if (config.framesAsPages && frameItems.length > 0) {
                // Each frame is a page
                for (const frame of frameItems){
                    const fx = frame.x || 0, fy = frame.y || 0;
                    const fw = frame.width || 800, fh = frame.height || 600;
                    const childItems = items.filter((item)=>item.id !== frame.id && item.type !== 'frame' && isItemInFrame(item, frame));
                    pages.push({
                        items: childItems,
                        bounds: {
                            x: fx,
                            y: fy,
                            w: fw,
                            h: fh
                        },
                        title: frame.frameTitle || 'Slide',
                        bgColor: frame.frameBgColor || CANVAS_BG
                    });
                }
                // Also add orphan items as a page if any
                const orphanItems = items.filter((item)=>item.type !== 'frame' && item.type !== 'connector' && !frameItems.some((frame)=>isItemInFrame(item, frame)));
                if (orphanItems.length > 0) {
                    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                    for (const item of orphanItems){
                        const b = getItemBounds(item);
                        if (b) {
                            minX = Math.min(minX, b.x);
                            minY = Math.min(minY, b.y);
                            maxX = Math.max(maxX, b.x + b.w);
                            maxY = Math.max(maxY, b.y + b.h);
                        }
                    }
                    if (minX !== Infinity) {
                        pages.push({
                            items: orphanItems,
                            bounds: {
                                x: minX - 20,
                                y: minY - 20,
                                w: maxX - minX + 40,
                                h: maxY - minY + 40
                            },
                            title: 'Unframed Content',
                            bgColor: CANVAS_BG
                        });
                    }
                }
            } else {
                // All content on pages
                let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                const renderableItems = items.filter((i)=>i.type !== 'frame');
                for (const item of renderableItems){
                    const b = getItemBounds(item);
                    if (b) {
                        minX = Math.min(minX, b.x);
                        minY = Math.min(minY, b.y);
                        maxX = Math.max(maxX, b.x + b.w);
                        maxY = Math.max(maxY, b.y + b.h);
                    }
                }
                if (minX === Infinity) {
                    minX = 0;
                    minY = 0;
                    maxX = 800;
                    maxY = 600;
                }
                const padding = 40;
                pages.push({
                    items: renderableItems,
                    bounds: {
                        x: minX - padding,
                        y: minY - padding,
                        w: maxX - minX + padding * 2,
                        h: maxY - minY + padding * 2
                    },
                    title: 'Whiteboard',
                    bgColor: CANVAS_BG
                });
            }
            const pdf = new jsPDF({
                orientation: config.orientation,
                unit: 'pt',
                format: [
                    pageW,
                    pageH
                ]
            });
            for(let pi = 0; pi < pages.length; pi++){
                if (pi > 0) pdf.addPage([
                    pageW,
                    pageH
                ], config.orientation);
                const page = pages[pi];
                const b = page.bounds;
                // Scale to fit content area
                const scaleX = contentW / b.w;
                const scaleY = contentH / b.h;
                const scale = Math.min(scaleX, scaleY);
                // Background
                pdf.setFillColor(page.bgColor.startsWith('#') ? page.bgColor : '#1a1d27');
                pdf.rect(0, 0, pageW, pageH, 'F');
                // Grid
                if (config.includeGrid) {
                    pdf.setFillColor(200, 200, 200);
                    const gridSpacing = 20 * scale;
                    const dotR = 0.5;
                    for(let gx = margin; gx < pageW - margin; gx += gridSpacing){
                        for(let gy = margin; gy < pageH - margin; gy += gridSpacing){
                            pdf.circle(gx, gy, dotR, 'F');
                        }
                    }
                }
                if (config.quality === 'vector') {
                    // Vector rendering
                    const offsetX = margin + (contentW - b.w * scale) / 2 - b.x * scale;
                    const offsetY = margin + (contentH - b.h * scale) / 2 - b.y * scale;
                    for (const item of page.items){
                        renderDrawItemToPdf(pdf, item, items, scale, offsetX, offsetY);
                    }
                } else {
                    // Raster rendering via Konva screenshot
                    const dataUrl = stage.toDataURL({
                        x: b.x,
                        y: b.y,
                        width: b.w,
                        height: b.h,
                        pixelRatio: 2
                    });
                    const imgX = margin + (contentW - b.w * scale) / 2;
                    const imgY = margin + (contentH - b.h * scale) / 2;
                    pdf.addImage(dataUrl, 'PNG', imgX, imgY, b.w * scale, b.h * scale);
                }
                // Page number footer
                pdf.setFontSize(8);
                pdf.setTextColor(150, 150, 150);
                pdf.text(`${page.title} — ${pi + 1} / ${pages.length}`, pageW / 2, pageH - 8, {
                    align: 'center'
                });
                setPdfExportProgress((pi + 1) / pages.length * 100);
                // Yield to UI
                await new Promise((r)=>setTimeout(r, 10));
            }
            pdf.save('whiteboard-export.pdf');
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.success(`PDF exported: ${pages.length} page${pages.length > 1 ? 's' : ''} (${config.quality})`);
        } catch (err) {
            console.error('PDF export failed:', err);
            sonner__WEBPACK_IMPORTED_MODULE_3__.toast.error('Failed to export PDF');
        } finally{
            setPdfExporting(false);
            setPdfExportProgress(0);
            setShowPdfExportDialog(false);
        }
    }, [
        items,
        frameItems,
        isItemInFrame,
        dimensions
    ]);
    /* ── Minimap jump handler ── */ const handleMinimapJump = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((worldX, worldY)=>{
        setStagePos({
            x: dimensions.width / 2 - worldX * zoomLevelRef.current,
            y: dimensions.height / 2 - worldY * zoomLevelRef.current
        });
    }, [
        dimensions
    ]);
    /* ── Render items with background ── */ const connectorItems = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return items.filter((i)=>i.type === 'connector');
    }, [
        items
    ]);
    const regularItems = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return items.filter((i)=>i.type !== 'sticky' && i.type !== 'connector' && i.type !== 'frame' && i.type !== 'image' && i.type !== 'file' && i.type !== 'link');
    }, [
        items
    ]);
    const stickyItems = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return items.filter((i)=>i.type === 'sticky');
    }, [
        items
    ]);
    // Items that can have anchor points
    const connectableItems = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return items.filter((i)=>[
                'sticky',
                'rect',
                'circle',
                'diamond',
                'image',
                'file',
                'link',
                'text',
                'frame'
            ].includes(i.type));
    }, [
        items
    ]);
    // Build temporary connector preview line
    const tempConnectorPreview = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!connectingFrom || !tempConnectorEnd) return null;
        const sourceItem = items.find((i)=>i.id === connectingFrom.itemId);
        if (!sourceItem) return null;
        const sourceAnchors = getAnchorPoints(sourceItem);
        const sp = sourceAnchors[connectingFrom.anchor];
        if (!sp) return null;
        const points = buildConnectorPath(sp.x, sp.y, connectingFrom.anchor, tempConnectorEnd.x, tempConnectorEnd.y, 'left', connectorStyle);
        return points;
    }, [
        connectingFrom,
        tempConnectorEnd,
        items,
        connectorStyle
    ]);
    const renderedItems = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                    x: -5000,
                    y: -5000,
                    width: 10000,
                    height: 10000,
                    fill: CANVAS_BG,
                    listening: false
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                    x: -2000,
                    y: -2000,
                    width: 4000,
                    height: 4000,
                    stroke: "rgba(255,255,255,0.03)",
                    strokeWidth: 1,
                    fill: "transparent",
                    listening: false
                }),
                regularItems.map((item)=>{
                    const isVotingCandidate = !!activeVoteConfig?.candidateItemIds.includes(item.id);
                    const voteCount = voteTallies[item.id] || 0;
                    const voteRankIdx = rankedResults.findIndex((r)=>r.itemId === item.id);
                    const voteRank = voteRankIdx >= 0 ? voteRankIdx + 1 : null;
                    const hasLocalVote = localUserVotes.includes(item.id);
                    if (!isVotingCandidate || votingPhase === 'idle') {
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RenderDrawItem, {
                            item: item
                        }, item.id);
                    }
                    // For voting candidates that aren't sticky (rect, circle, text, etc.), add vote overlays
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RenderDrawItem, {
                                item: item
                            }),
                            votingPhase === 'active' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                                x: item.type === 'rect' ? item.x || 0 : item.type === 'circle' ? (item.x || 0) - (item.radius || 0) : item.x || 0,
                                y: item.type === 'rect' ? item.y || 0 : item.type === 'circle' ? (item.y || 0) - (item.radius || 0) : (item.y || 0) - 4,
                                width: item.type === 'rect' ? item.width || 0 : item.type === 'circle' ? (item.radius || 0) * 2 : (item.text || '').length * (item.fontSize || 18) * 0.55,
                                height: item.type === 'rect' ? item.height || 0 : item.type === 'circle' ? (item.radius || 0) * 2 : (item.fontSize || 18) * 1.4,
                                stroke: hasLocalVote ? '#f59e0b' : '#fbbf24',
                                strokeWidth: hasLocalVote ? 3 : 2,
                                dash: hasLocalVote ? undefined : [
                                    8,
                                    4
                                ],
                                cornerRadius: 4,
                                listening: false,
                                opacity: hasLocalVote ? 0.9 : 0.5
                            }),
                            (votingPhase === 'active' || votingPhase === 'ended') && voteCount > 0 && (()=>{
                                const badgeX = item.type === 'rect' ? (item.x || 0) - 6 : item.type === 'circle' ? (item.x || 0) - (item.radius || 0) - 6 : (item.x || 0) - 6;
                                const badgeY = item.type === 'rect' ? (item.y || 0) - 6 : item.type === 'circle' ? (item.y || 0) - (item.radius || 0) - 6 : (item.y || 0) - 18;
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                                    x: badgeX,
                                    y: badgeY,
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Circle */ .jl, {
                                            radius: 12,
                                            fill: hasLocalVote ? '#f59e0b' : 'rgba(245,158,11,0.8)'
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                                            text: `${voteCount}`,
                                            fontSize: 10,
                                            fill: "white",
                                            fontStyle: "bold",
                                            x: voteCount >= 10 ? -6 : -3,
                                            y: -4,
                                            listening: false
                                        })
                                    ]
                                });
                            })(),
                            votingPhase === 'ended' && voteRank !== null && voteRank <= 3 && (()=>{
                                const rx = item.type === 'rect' ? (item.x || 0) + (item.width || 0) - 4 : item.type === 'circle' ? (item.x || 0) + (item.radius || 0) - 8 : (item.x || 0) + (item.text || '').length * (item.fontSize || 18) * 0.55 - 4;
                                const ry = item.type === 'rect' ? (item.y || 0) - 8 : item.type === 'circle' ? (item.y || 0) - (item.radius || 0) - 8 : (item.y || 0) - 18;
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .YJ, {
                                    x: rx,
                                    y: ry,
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Circle */ .jl, {
                                            radius: 10,
                                            fill: voteRank === 1 ? '#f59e0b' : voteRank === 2 ? '#94a3b8' : '#cd7f32'
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Text */ .EY, {
                                            text: `${voteRank}`,
                                            fontSize: 10,
                                            fill: "white",
                                            fontStyle: "bold",
                                            x: -3,
                                            y: -4,
                                            listening: false
                                        })
                                    ]
                                });
                            })(),
                            votingPhase === 'active' && !hasLocalVote && (()=>{
                                const cx = item.type === 'rect' ? item.x || 0 : item.type === 'circle' ? (item.x || 0) - (item.radius || 0) : item.x || 0;
                                const cy = item.type === 'rect' ? item.y || 0 : item.type === 'circle' ? (item.y || 0) - (item.radius || 0) : (item.y || 0) - 4;
                                const cw = item.type === 'rect' ? item.width || 0 : item.type === 'circle' ? (item.radius || 0) * 2 : (item.text || '').length * (item.fontSize || 18) * 0.55;
                                const ch = item.type === 'rect' ? item.height || 0 : item.type === 'circle' ? (item.radius || 0) * 2 : (item.fontSize || 18) * 1.4;
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                                    x: cx,
                                    y: cy,
                                    width: cw,
                                    height: ch,
                                    fill: "transparent",
                                    onClick: (e)=>{
                                        e.cancelBubble = true;
                                        castVote(item.id);
                                    },
                                    onTap: (e)=>{
                                        e.cancelBubble = true;
                                        castVote(item.id);
                                    }
                                });
                            })()
                        ]
                    }, item.id);
                }),
                connectorItems.map((item)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ConnectorShape, {
                        item: item,
                        allItems: items,
                        isSelected: selectedConnectorId === item.id,
                        onSelect: (id)=>setSelectedConnectorId(id),
                        onDelete: handleConnectorDelete
                    }, item.id)),
                items.filter((i)=>i.type === 'image').map((item)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ImageShape, {
                        item: item,
                        isSelected: selectedEmbedId === item.id,
                        onSelect: (id)=>setSelectedEmbedId(id),
                        onDragEnd: handleEmbedDragEnd,
                        onResizeEnd: handleEmbedResizeEnd,
                        onDelete: handleEmbedDelete
                    }, item.id)),
                items.filter((i)=>i.type === 'file').map((item)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(FileCardShape, {
                        item: item,
                        isSelected: selectedEmbedId === item.id,
                        onSelect: (id)=>setSelectedEmbedId(id),
                        onDragEnd: handleEmbedDragEnd,
                        onDelete: handleEmbedDelete
                    }, item.id)),
                items.filter((i)=>i.type === 'link').map((item)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LinkCardShape, {
                        item: item,
                        isSelected: selectedEmbedId === item.id,
                        onSelect: (id)=>setSelectedEmbedId(id),
                        onDragEnd: handleEmbedDragEnd,
                        onDelete: handleEmbedDelete
                    }, item.id)),
                tempItem && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RenderDrawItem, {
                    item: tempItem
                }),
                tempConnectorPreview && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Line */ .N1, {
                    points: tempConnectorPreview,
                    stroke: color,
                    strokeWidth: 2,
                    dash: [
                        6,
                        4
                    ],
                    opacity: 0.6,
                    lineCap: "round",
                    tension: connectorStyle === 'curved' ? 0.5 : 0
                }),
                tool === 'connector' && connectableItems.map((item)=>{
                    // Only show anchors for hovered item, or for all items when connecting
                    const shouldShow = connectingFrom ? item.id !== connectingFrom.itemId : hoveredItemId === item.id;
                    if (!shouldShow) return null;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AnchorPointsOverlay, {
                        item: item,
                        onAnchorClick: handleAnchorClick
                    }, `anchors-${item.id}`);
                }),
                stickyItems.map((item)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StickyNoteShape, {
                        item: item,
                        isEditing: editingStickyId === item.id,
                        isSelected: selectedStickyId === item.id,
                        onDragEnd: handleStickyDragEnd,
                        onDoubleClick: handleStickyDoubleClick,
                        onDelete: handleStickyDelete,
                        onResizeStart: handleStickyResizeStart,
                        onSelect: handleStickySelect,
                        voteCount: voteTallies[item.id] || 0,
                        isVotingCandidate: !!activeVoteConfig?.candidateItemIds.includes(item.id),
                        hasLocalVote: localUserVotes.includes(item.id),
                        votingPhase: votingPhase,
                        onCastVote: castVote,
                        voteRank: rankedResults.findIndex((r)=>r.itemId === item.id) >= 0 ? rankedResults.findIndex((r)=>r.itemId === item.id) + 1 : null
                    }, item.id)),
                tool === 'connector' && stickyItems.map((item)=>{
                    const shouldShow = connectingFrom ? item.id !== connectingFrom.itemId : hoveredItemId === item.id;
                    if (!shouldShow) return null;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AnchorPointsOverlay, {
                        item: item,
                        onAnchorClick: handleAnchorClick
                    }, `sticky-anchors-${item.id}`);
                }),
                remoteCursors.map((cursor)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RemoteCursorShape, {
                        cursor: cursor
                    }, `remote-cursor-${cursor.userId}`)),
                tool === 'laser' && laserTrail.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LaserPointerShape, {
                    points: laserTrail,
                    color: "#ff5757"
                }),
                remoteLasers.map((rl)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LaserPointerShape, {
                        points: rl.points,
                        color: rl.color,
                        name: rl.userName
                    }, `remote-laser-${rl.userId}`)),
                !isPresenting && frameItems.map((item)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(FrameShape, {
                        item: item,
                        isSelected: selectedFrameId === item.id,
                        onSelect: handleFrameSelect,
                        onDragEnd: handleFrameDragEnd,
                        onDoubleClick: handleFrameDoubleClick,
                        onDelete: handleFrameDelete,
                        onResizeEnd: handleFrameResizeEnd
                    }, item.id)),
                tool === 'connector' && frameItems.map((item)=>{
                    const shouldShow = connectingFrom ? item.id !== connectingFrom.itemId : hoveredItemId === item.id;
                    if (!shouldShow) return null;
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AnchorPointsOverlay, {
                        item: item,
                        onAnchorClick: handleAnchorClick
                    }, `frame-anchors-${item.id}`);
                })
            ]
        });
    }, [
        regularItems,
        connectorItems,
        stickyItems,
        frameItems,
        tempItem,
        tempConnectorPreview,
        dimensions,
        editingStickyId,
        selectedStickyId,
        handleStickyDragEnd,
        handleStickyDoubleClick,
        handleStickyDelete,
        handleStickyResizeStart,
        handleStickySelect,
        selectedConnectorId,
        handleConnectorDelete,
        handleAnchorClick,
        tool,
        connectableItems,
        connectingFrom,
        hoveredItemId,
        items,
        color,
        connectorStyle,
        remoteCursors,
        laserTrail,
        remoteLasers,
        isPresenting,
        selectedFrameId,
        handleFrameSelect,
        handleFrameDragEnd,
        handleFrameDoubleClick,
        handleFrameDelete,
        handleFrameResizeEnd
    ]);
    /* ═══════════════════════════════════════════════════════════ */ /* ── Render ──                                              */ /* ═══════════════════════════════════════════════════════════ */ return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "w-full h-full flex flex-col",
        style: {
            background: 'var(--medq-bg, #0c0e14)'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2 px-3 py-2 flex-shrink-0",
                style: {
                    background: 'rgba(21,24,33,0.95)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)'
                },
                children: [
                    onBack && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: onBack,
                        className: "p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors",
                        title: "Back",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                            className: "w-4 h-4 text-[#8b95a8]"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2 mr-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                className: "w-4 h-4 text-[#00e5a0]"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-sm font-semibold text-[#e8ecf4]",
                                children: "Whiteboard"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>setShowTemplatePanel(true),
                        className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
                        style: {
                            background: 'rgba(0,229,160,0.1)',
                            color: '#00e5a0',
                            border: '1px solid rgba(0,229,160,0.15)'
                        },
                        title: "Open template library",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            " Templates"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>setShowLayersPanel((prev)=>!prev),
                        className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${showLayersPanel ? 'ring-1 ring-[#8b5cf6]' : ''}`,
                        style: {
                            background: showLayersPanel ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.06)',
                            color: '#8b5cf6',
                            border: `1px solid ${showLayersPanel ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.1)'}`
                        },
                        title: "Layers & Frames panel",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            " Layers"
                        ]
                    }),
                    frameItems.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: enterPresentation,
                        className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
                        style: {
                            background: 'rgba(139,92,246,0.12)',
                            color: '#8b5cf6',
                            border: '1px solid rgba(139,92,246,0.2)'
                        },
                        title: "Enter presentation mode",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            " Present"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>{
                            setAiPromptMode('generate');
                            setShowAiPrompt(true);
                        },
                        disabled: aiLoading,
                        className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40",
                        style: {
                            background: 'rgba(139,92,246,0.12)',
                            color: '#8b5cf6',
                            border: '1px solid rgba(139,92,246,0.2)'
                        },
                        title: "AI Generate — Create canvas items from a description",
                        children: [
                            aiLoading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5 animate-spin"
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "AI Generate"
                        ]
                    }),
                    (recStatus === 'recording' || recStatus === 'paused') && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-1.5 px-2 py-1 rounded-lg",
                        style: {
                            background: 'rgba(255,87,87,0.12)'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: `w-2 h-2 rounded-full ${recStatus === 'recording' ? 'chat-wb-rec-pulse' : ''}`,
                                style: {
                                    background: recStatus === 'recording' ? '#ff5757' : '#f59e0b'
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-xs font-mono text-[#ff5757]",
                                children: formatTimer(recDuration)
                            }),
                            recStatus === 'paused' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[10px] text-[#f59e0b]",
                                children: "PAUSED"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex-1"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: undo,
                        disabled: historyIndex < 0,
                        className: "p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
                        title: "Undo (Ctrl+Z)",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                            className: "w-4 h-4 text-[#8b95a8]"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: redo,
                        disabled: historyIndex >= history.length - 1,
                        className: "p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
                        title: "Redo (Ctrl+Y)",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                            className: "w-4 h-4 text-[#8b95a8]"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-px h-5 mx-1",
                        style: {
                            background: 'rgba(255,255,255,0.08)'
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: captureCanvas,
                        className: "p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors",
                        title: "Capture as PNG",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                            className: "w-4 h-4 text-[#4fc3f7]"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: ()=>setShowPdfExportDialog(true),
                        className: "p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors",
                        title: "Export as PDF",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                            className: "w-4 h-4 text-[#4fc3f7]"
                        })
                    }),
                    recStatus === 'idle' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: startRecording,
                        className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
                        style: {
                            background: 'rgba(255,87,87,0.12)',
                            color: '#ff5757',
                            border: '1px solid rgba(255,87,87,0.2)'
                        },
                        title: "Start recording with audio",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            " Rec"
                        ]
                    }),
                    recStatus === 'recording' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: pauseRecording,
                        className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
                        style: {
                            background: 'rgba(245,158,11,0.12)',
                            color: '#f59e0b',
                            border: '1px solid rgba(245,158,11,0.2)'
                        },
                        title: "Pause recording",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_35__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            " Pause"
                        ]
                    }),
                    recStatus === 'paused' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: resumeRecording,
                        className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
                        style: {
                            background: 'rgba(0,229,160,0.12)',
                            color: '#00e5a0',
                            border: '1px solid rgba(0,229,160,0.2)'
                        },
                        title: "Resume recording",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_36__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            " Resume"
                        ]
                    }),
                    (recStatus === 'recording' || recStatus === 'paused') && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: stopRecording,
                        className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
                        style: {
                            background: 'rgba(255,87,87,0.15)',
                            color: '#ff5757',
                            border: '1px solid rgba(255,87,87,0.25)'
                        },
                        title: "Stop recording",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_37__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            " Stop"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-px h-5 mx-1",
                        style: {
                            background: 'rgba(255,255,255,0.08)'
                        }
                    }),
                    onSend && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: onSend,
                        disabled: sending || !hasCapturedData,
                        className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
                        style: {
                            background: 'rgba(0,229,160,0.15)',
                            color: '#00e5a0',
                            border: '1px solid rgba(0,229,160,0.2)'
                        },
                        title: "Send to chat",
                        children: [
                            sending ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-3.5 h-3.5 border-2 border-[#00e5a0] border-t-transparent rounded-full animate-spin"
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_38__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Send"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex-1 flex min-h-0",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col items-center gap-1 p-1.5 flex-shrink-0",
                        style: {
                            background: 'rgba(21,24,33,0.95)',
                            borderRight: '1px solid rgba(255,255,255,0.06)'
                        },
                        children: [
                            Object.keys(TOOL_CONFIG).map((t)=>{
                                const cfg = TOOL_CONFIG[t];
                                const isActive = tool === t;
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: ()=>{
                                        setTool(t);
                                        setTextInput(null);
                                        setTextValue('');
                                        setSelectedStickyId(null);
                                        setSelectedConnectorId(null);
                                        setConnectingFrom(null);
                                        setTempConnectorEnd(null);
                                        // Clear laser trail when switching away from laser
                                        if (t !== 'laser') {
                                            setLaserTrail([]);
                                            setLaserActive(false);
                                            laserActiveRef.current = false;
                                        }
                                    },
                                    className: `p-2 rounded-lg transition-all ${isActive ? t === 'laser' ? 'ring-1 ring-[#ff5757]' : t === 'frame' ? 'ring-1 ring-[#8b5cf6]' : 'ring-1 ring-[#00e5a0]' : ''}`,
                                    style: {
                                        background: isActive ? t === 'laser' ? 'rgba(255,87,87,0.15)' : t === 'frame' ? 'rgba(139,92,246,0.12)' : 'rgba(0,229,160,0.12)' : 'transparent',
                                        color: isActive ? t === 'laser' ? '#ff5757' : t === 'frame' ? '#8b5cf6' : '#00e5a0' : '#8b95a8'
                                    },
                                    title: cfg.label,
                                    children: cfg.icon
                                }, t);
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-6 my-1",
                                style: {
                                    borderTop: '1px solid rgba(255,255,255,0.06)'
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>{
                                    setAiPromptMode('generate');
                                    setShowAiPrompt(true);
                                },
                                className: "p-2 rounded-lg hover:bg-[rgba(139,92,246,0.12)] transition-colors group",
                                title: "AI Generate — Create items from a description",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                                    className: "w-4 h-4 text-[#8b5cf6] group-hover:text-[#a78bfa]"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: handleAiCluster,
                                disabled: aiClusterLoading,
                                className: "p-2 rounded-lg hover:bg-[rgba(79,195,247,0.12)] transition-colors group disabled:opacity-40 disabled:cursor-not-allowed",
                                title: "AI Cluster — Auto-group nearby sticky notes",
                                children: aiClusterLoading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                    className: "w-4 h-4 text-[#4fc3f7] animate-spin"
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                                    className: "w-4 h-4 text-[#4fc3f7] group-hover:text-[#81d4fa]"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: handleAiSummarize,
                                disabled: aiSummarizeLoading,
                                className: "p-2 rounded-lg hover:bg-[rgba(245,158,11,0.12)] transition-colors group disabled:opacity-40 disabled:cursor-not-allowed",
                                title: "AI Summarize — Generate a summary of canvas text",
                                children: aiSummarizeLoading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                    className: "w-4 h-4 text-[#f59e0b] animate-spin"
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_40__/* ["default"] */ .A, {
                                    className: "w-4 h-4 text-[#f59e0b] group-hover:text-[#fbbf24]"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-6 my-1",
                                style: {
                                    borderTop: '1px solid rgba(255,255,255,0.06)'
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>{
                                    if (votingPhase === 'idle') {
                                        setVotingPhase('configuring');
                                    }
                                },
                                disabled: votingPhase !== 'idle',
                                className: `p-2 rounded-lg transition-colors group disabled:opacity-40 disabled:cursor-not-allowed ${votingPhase !== 'idle' ? 'ring-1 ring-[#f59e0b]' : ''}`,
                                style: {
                                    background: votingPhase !== 'idle' ? 'rgba(245,158,11,0.12)' : 'transparent'
                                },
                                title: "Vote — Start a collaborative vote on canvas items",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                    className: "w-4 h-4 text-[#f59e0b] group-hover:text-[#fbbf24]"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-6 my-1",
                                style: {
                                    borderTop: '1px solid rgba(255,255,255,0.06)'
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        onClick: ()=>setShowInsertMenu((prev)=>!prev),
                                        className: `p-2 rounded-lg transition-colors group ${showInsertMenu ? 'ring-1 ring-[#4fc3f7]' : ''}`,
                                        style: {
                                            background: showInsertMenu ? 'rgba(79,195,247,0.12)' : 'transparent'
                                        },
                                        title: "Insert — Add image, file, or link to canvas",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_41__/* ["default"] */ .A, {
                                            className: "w-4 h-4 text-[#4fc3f7] group-hover:text-[#81d4fa]"
                                        })
                                    }),
                                    showInsertMenu && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "absolute left-full ml-2 top-0 rounded-xl shadow-2xl z-50 overflow-hidden",
                                        style: {
                                            background: 'rgba(21,24,33,0.97)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            backdropFilter: 'blur(12px)',
                                            minWidth: 180
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "px-3 py-2 text-[10px] font-bold text-[#5a6478] uppercase tracking-wider",
                                                style: {
                                                    borderBottom: '1px solid rgba(255,255,255,0.06)'
                                                },
                                                children: "Insert"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                onClick: ()=>{
                                                    setShowInsertMenu(false);
                                                    imageInputRef.current?.click();
                                                },
                                                className: "flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-white/[0.04] transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_42__/* ["default"] */ .A, {
                                                        className: "w-4 h-4 text-[#00e5a0]"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "text-xs font-medium text-[#e8ecf4]",
                                                                children: "Image"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "text-[9px] text-[#5a6478]",
                                                                children: "JPG, PNG, GIF, WebP"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                onClick: ()=>{
                                                    setShowInsertMenu(false);
                                                    fileInputRef.current?.click();
                                                },
                                                className: "flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-white/[0.04] transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_40__/* ["default"] */ .A, {
                                                        className: "w-4 h-4 text-[#4fc3f7]"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "text-xs font-medium text-[#e8ecf4]",
                                                                children: "File"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "text-[9px] text-[#5a6478]",
                                                                children: "PDF, DOC, ZIP, etc."
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                onClick: ()=>{
                                                    setShowInsertMenu(false);
                                                    setShowLinkInputDialog(true);
                                                },
                                                className: "flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-white/[0.04] transition-colors",
                                                style: {
                                                    borderTop: '1px solid rgba(255,255,255,0.04)'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_43__/* ["default"] */ .A, {
                                                        className: "w-4 h-4 text-[#8b5cf6]"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "text-xs font-medium text-[#e8ecf4]",
                                                                children: "Web Link"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "text-[9px] text-[#5a6478]",
                                                                children: "Embed a URL as a card"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "px-3 py-2 text-[9px] text-[#5a6478]",
                                                style: {
                                                    borderTop: '1px solid rgba(255,255,255,0.04)'
                                                },
                                                children: "Tip: Ctrl+V to paste image from clipboard, or drag files onto canvas"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                ref: imageInputRef,
                                type: "file",
                                accept: "image/*",
                                className: "hidden",
                                onChange: (e)=>{
                                    const file = e.target.files?.[0];
                                    if (file) handleImageFileSelect(file);
                                    e.target.value = '';
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                ref: fileInputRef,
                                type: "file",
                                className: "hidden",
                                onChange: (e)=>{
                                    const file = e.target.files?.[0];
                                    if (file) handleFileSelect(file);
                                    e.target.value = '';
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-6 my-1",
                                style: {
                                    borderTop: '1px solid rgba(255,255,255,0.06)'
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: clearCanvas,
                                className: "p-2 rounded-lg hover:bg-red-500/[0.08] transition-colors",
                                title: "Clear canvas",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_44__/* ["default"] */ .A, {
                                    className: "w-4 h-4 text-[#ff5757]"
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        ref: containerRef,
                        className: "flex-1 relative overflow-hidden",
                        style: {
                            cursor: cursorStyle
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Stage */ .BI, {
                                ref: stageRef,
                                width: dimensions.width,
                                height: dimensions.height,
                                scaleX: zoomLevel,
                                scaleY: zoomLevel,
                                x: stagePos.x,
                                y: stagePos.y,
                                onWheel: handleWheel,
                                onMouseDown: handleMouseDown,
                                onMouseMove: handleMouseMove,
                                onMouseUp: handleMouseUp,
                                onMouseLeave: handleMouseLeave,
                                onTouchStart: handleMouseDown,
                                onTouchMove: handleMouseMove,
                                onTouchEnd: handleMouseUp,
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Layer */ .Wd, {
                                    children: renderedItems
                                })
                            }),
                            textInput?.visible && (()=>{
                                const screenPos = worldToScreen(textInput.x, textInput.y);
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                    ref: textAreaRef,
                                    value: textValue,
                                    onChange: (e)=>setTextValue(e.target.value),
                                    onBlur: commitText,
                                    className: "absolute border-none outline-none resize-none bg-transparent",
                                    style: {
                                        left: screenPos.x,
                                        top: screenPos.y,
                                        color: color,
                                        fontSize: `${18 * zoomLevel}px`,
                                        fontFamily: 'Arial, sans-serif',
                                        minWidth: `${100 * zoomLevel}px`,
                                        minHeight: `${30 * zoomLevel}px`,
                                        caretColor: color,
                                        transform: `scale(${1})`
                                    },
                                    placeholder: "Type here..."
                                });
                            })(),
                            editingStickyId && (()=>{
                                const sticky = items.find((i)=>i.id === editingStickyId);
                                if (!sticky) return null;
                                const screenPos = worldToScreen(sticky.x || 0, sticky.y || 0);
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                    ref: stickyEditRef,
                                    value: editingStickyText,
                                    onChange: (e)=>setEditingStickyText(e.target.value),
                                    onBlur: commitStickyText,
                                    onKeyDown: (e)=>{
                                        if (e.key === 'Escape') {
                                            e.preventDefault();
                                            setEditingStickyId(null);
                                            setEditingStickyText('');
                                        }
                                    },
                                    className: "absolute border-none outline-none resize-none",
                                    style: {
                                        left: screenPos.x,
                                        top: screenPos.y,
                                        width: (sticky.width || 180) * zoomLevel - 4,
                                        height: (sticky.height || 160) * zoomLevel - 4,
                                        padding: `${14 * zoomLevel}px`,
                                        background: sticky.stickyColor || '#FEF3C7',
                                        color: sticky.stickyTextColor || '#92400E',
                                        fontSize: `${(sticky.fontSize || 14) * zoomLevel}px`,
                                        fontFamily: sticky.fontFamily || 'Arial',
                                        lineHeight: '1.4',
                                        borderRadius: '3px',
                                        caretColor: sticky.stickyTextColor || '#92400E',
                                        zIndex: 10,
                                        boxShadow: '2px 2px 8px rgba(0,0,0,0.18)'
                                    },
                                    placeholder: "Type your note..."
                                });
                            })(),
                            editingFrameId && (()=>{
                                const frame = items.find((i)=>i.id === editingFrameId);
                                if (!frame) return null;
                                const screenPos = worldToScreen(frame.x || 0, frame.y || 0);
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "absolute flex flex-col gap-2 p-3 rounded-lg",
                                    style: {
                                        left: screenPos.x,
                                        top: Math.max(4, screenPos.y - 70),
                                        background: 'rgba(21,24,33,0.98)',
                                        border: '1px solid rgba(139,92,246,0.3)',
                                        zIndex: 15,
                                        minWidth: '220px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-1.5 mb-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5 text-[#8b5cf6]"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[10px] font-semibold text-[#8b5cf6]",
                                                    children: "Frame Settings"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[9px] text-[#5a6478]",
                                                    children: "Background"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    onClick: ()=>{
                                                        setItems((prev)=>prev.map((item)=>item.id === editingFrameId ? {
                                                                    ...item,
                                                                    frameBgColor: 'transparent'
                                                                } : item));
                                                    },
                                                    className: `w-5 h-5 rounded border transition-all ${!frame.frameBgColor || frame.frameBgColor === 'rgba(26,29,39,0.5)' ? 'ring-1 ring-[#8b5cf6]' : ''}`,
                                                    style: {
                                                        background: 'repeating-conic-gradient(rgba(255,255,255,0.1) 0% 25%, transparent 0% 50%) 0 0 / 6px 6px',
                                                        borderColor: 'rgba(255,255,255,0.15)'
                                                    },
                                                    title: "Transparent"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    onClick: ()=>{
                                                        setItems((prev)=>prev.map((item)=>item.id === editingFrameId ? {
                                                                    ...item,
                                                                    frameBgColor: '#ffffff'
                                                                } : item));
                                                    },
                                                    className: `w-5 h-5 rounded border transition-all ${frame.frameBgColor === '#ffffff' ? 'ring-1 ring-[#8b5cf6]' : ''}`,
                                                    style: {
                                                        background: '#ffffff',
                                                        borderColor: 'rgba(255,255,255,0.2)'
                                                    },
                                                    title: "White"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    onClick: ()=>{
                                                        setItems((prev)=>prev.map((item)=>item.id === editingFrameId ? {
                                                                    ...item,
                                                                    frameBgColor: CANVAS_BG
                                                                } : item));
                                                    },
                                                    className: `w-5 h-5 rounded border transition-all ${frame.frameBgColor === CANVAS_BG ? 'ring-1 ring-[#8b5cf6]' : ''}`,
                                                    style: {
                                                        background: CANVAS_BG,
                                                        borderColor: 'rgba(255,255,255,0.15)'
                                                    },
                                                    title: "Dark"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    onClick: ()=>{
                                                        setItems((prev)=>prev.map((item)=>item.id === editingFrameId ? {
                                                                    ...item,
                                                                    frameBgColor: '#f8f9fa'
                                                                } : item));
                                                    },
                                                    className: `w-5 h-5 rounded border transition-all ${frame.frameBgColor === '#f8f9fa' ? 'ring-1 ring-[#8b5cf6]' : ''}`,
                                                    style: {
                                                        background: '#f8f9fa',
                                                        borderColor: 'rgba(255,255,255,0.2)'
                                                    },
                                                    title: "Light Gray"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                    type: "color",
                                                    value: frame.frameBgColor?.startsWith('#') ? frame.frameBgColor : '#1a1d27',
                                                    onChange: (e)=>{
                                                        setItems((prev)=>prev.map((item)=>item.id === editingFrameId ? {
                                                                    ...item,
                                                                    frameBgColor: e.target.value
                                                                } : item));
                                                    },
                                                    className: "w-5 h-5 rounded cursor-pointer border border-white/10",
                                                    title: "Custom color"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                            value: editingFrameTitle,
                                            onChange: (e)=>setEditingFrameTitle(e.target.value),
                                            onBlur: ()=>{
                                                setItems((prev)=>prev.map((item)=>item.id === editingFrameId ? {
                                                            ...item,
                                                            frameTitle: editingFrameTitle
                                                        } : item));
                                                setEditingFrameId(null);
                                            },
                                            onKeyDown: (e)=>{
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    setItems((prev)=>prev.map((item)=>item.id === editingFrameId ? {
                                                                ...item,
                                                                frameTitle: editingFrameTitle
                                                            } : item));
                                                    setEditingFrameId(null);
                                                } else if (e.key === 'Escape') {
                                                    setEditingFrameId(null);
                                                }
                                            },
                                            className: "bg-transparent border border-white/10 rounded px-2 py-1 text-xs text-[#e8ecf4] outline-none focus:border-[#8b5cf6]/30",
                                            placeholder: "Frame title...",
                                            autoFocus: true
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                            value: editingFrameNotes,
                                            onChange: (e)=>{
                                                setEditingFrameNotes(e.target.value);
                                                setItems((prev)=>prev.map((item)=>item.id === editingFrameId ? {
                                                            ...item,
                                                            frameNotes: e.target.value
                                                        } : item));
                                            },
                                            onKeyDown: (e)=>{
                                                if (e.key === 'Escape') {
                                                    e.preventDefault();
                                                    setEditingFrameId(null);
                                                }
                                            },
                                            className: "bg-transparent border border-white/10 rounded px-2 py-1 text-[10px] text-[#8b95a8] outline-none focus:border-[#8b5cf6]/30 resize-none",
                                            style: {
                                                height: '60px'
                                            },
                                            placeholder: "Speaker notes (visible in presentation mode)..."
                                        })
                                    ]
                                });
                            })(),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TemplatePanel, {
                                open: showTemplatePanel,
                                onClose: ()=>setShowTemplatePanel(false),
                                onApply: applyTemplate
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LayersPanel, {
                                open: showLayersPanel,
                                onClose: ()=>setShowLayersPanel(false),
                                items: items,
                                frameItems: frameItems,
                                selectedFrameId: selectedFrameId,
                                onSelectFrame: (id)=>{
                                    setSelectedFrameId(id);
                                    fitToFrame(id);
                                },
                                onFitToFrame: fitToFrame,
                                onExportFramePng: exportFrameAsPng,
                                onExportAllPdf: exportAllFramesAsPdf
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ExportPdfDialog, {
                                open: showPdfExportDialog,
                                onClose: ()=>{
                                    if (!pdfExporting) setShowPdfExportDialog(false);
                                },
                                onExport: performPdfExport,
                                frameCount: frameItems.length,
                                itemCount: items.length,
                                exporting: pdfExporting,
                                progress: pdfExportProgress
                            }),
                            showLinkInputDialog && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "absolute inset-0 z-50 flex items-center justify-center",
                                style: {
                                    background: 'rgba(0,0,0,0.5)',
                                    backdropFilter: 'blur(4px)'
                                },
                                onClick: ()=>{
                                    setShowLinkInputDialog(false);
                                    setLinkInputUrl('');
                                },
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "rounded-xl shadow-2xl p-5 w-96",
                                    style: {
                                        background: 'rgba(21,24,33,0.98)',
                                        border: '1px solid rgba(139,92,246,0.2)'
                                    },
                                    onClick: (e)=>e.stopPropagation(),
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center justify-between mb-3",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_43__/* ["default"] */ .A, {
                                                            className: "w-4 h-4 text-[#8b5cf6]"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "text-sm font-semibold text-[#e8ecf4]",
                                                            children: "Add Web Link"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    onClick: ()=>{
                                                        setShowLinkInputDialog(false);
                                                        setLinkInputUrl('');
                                                    },
                                                    className: "p-1 rounded hover:bg-white/[0.06] transition-colors",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                                        className: "w-4 h-4 text-[#5a6478]"
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                            type: "url",
                                            value: linkInputUrl,
                                            onChange: (e)=>setLinkInputUrl(e.target.value),
                                            onKeyDown: (e)=>{
                                                if (e.key === 'Enter') handleAddLink();
                                                if (e.key === 'Escape') {
                                                    setShowLinkInputDialog(false);
                                                    setLinkInputUrl('');
                                                }
                                            },
                                            placeholder: "https://example.com/article",
                                            className: "w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-colors",
                                            style: {
                                                background: 'rgba(255,255,255,0.04)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                color: 'var(--medq-text, #e8ecf4)',
                                                caretColor: '#8b5cf6'
                                            },
                                            autoFocus: true
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[10px] text-[#5a6478] mt-2",
                                            children: "We'll fetch the page title, description, and favicon automatically."
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center justify-end gap-2 mt-4",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    onClick: ()=>{
                                                        setShowLinkInputDialog(false);
                                                        setLinkInputUrl('');
                                                    },
                                                    className: "px-3 py-1.5 rounded-lg text-xs font-medium text-[#8b95a8] hover:bg-white/[0.06] transition-colors",
                                                    children: "Cancel"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                    onClick: handleAddLink,
                                                    disabled: linkLoading || !linkInputUrl.trim(),
                                                    className: "flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed",
                                                    style: {
                                                        background: 'rgba(139,92,246,0.2)',
                                                        color: '#8b5cf6',
                                                        border: '1px solid rgba(139,92,246,0.3)'
                                                    },
                                                    children: [
                                                        linkLoading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                                            className: "w-3.5 h-3.5 animate-spin"
                                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_43__/* ["default"] */ .A, {
                                                            className: "w-3.5 h-3.5"
                                                        }),
                                                        "Add Link"
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            }),
                            showAiPrompt && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "absolute inset-0 flex items-center justify-center z-30",
                                style: {
                                    background: 'rgba(0,0,0,0.5)'
                                },
                                onClick: (e)=>{
                                    if (e.target === e.currentTarget) {
                                        setShowAiPrompt(false);
                                        setAiPromptText('');
                                    }
                                },
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "rounded-xl p-5 w-[480px] max-w-[90vw]",
                                    style: {
                                        background: 'rgba(26,29,39,0.98)',
                                        border: '1px solid rgba(139,92,246,0.25)',
                                        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(139,92,246,0.1)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center justify-between mb-4",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                                                            className: "w-5 h-5 text-[#8b5cf6]"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "text-sm font-semibold text-[#e8ecf4]",
                                                            children: "AI Generate"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "text-[10px] px-1.5 py-0.5 rounded-full bg-[rgba(139,92,246,0.15)] text-[#a78bfa]",
                                                            children: "Beta"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    onClick: ()=>{
                                                        setShowAiPrompt(false);
                                                        setAiPromptText('');
                                                    },
                                                    className: "p-1 rounded-md hover:bg-white/[0.06] transition-colors",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                                        className: "w-4 h-4 text-[#8b95a8]"
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "mb-3",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                    className: "text-[11px] text-[#5a6478] mb-1.5 block",
                                                    children: "Describe what you want on the canvas"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                                    value: aiPromptText,
                                                    onChange: (e)=>setAiPromptText(e.target.value),
                                                    onKeyDown: (e)=>{
                                                        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                                                            e.preventDefault();
                                                            handleAiGenerate();
                                                        }
                                                        if (e.key === 'Escape') {
                                                            setShowAiPrompt(false);
                                                            setAiPromptText('');
                                                        }
                                                    },
                                                    className: "w-full h-28 bg-[rgba(0,0,0,0.3)] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-[#e8ecf4] outline-none focus:border-[#8b5cf6]/40 resize-none placeholder:text-[#5a6478]",
                                                    placeholder: "e.g., Create a mind map about cardiac anatomy\ne.g., Draw a flowchart for patient triage\ne.g., Make a SWOT analysis for a medical startup",
                                                    autoFocus: true
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "flex flex-wrap gap-1.5 mb-4",
                                            children: [
                                                'Mind map about cardiac anatomy',
                                                'Flowchart for patient triage',
                                                'SWOT analysis for a medical device',
                                                'Compare viral vs bacterial infections',
                                                'Steps for CPR procedure',
                                                'Brainstorm study topics'
                                            ].map((suggestion)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    onClick: ()=>setAiPromptText(suggestion),
                                                    className: "px-2 py-1 rounded-md text-[10px] transition-all hover:bg-[rgba(139,92,246,0.15)]",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.04)',
                                                        color: 'var(--medq-text-muted, #8b95a8)',
                                                        border: '1px solid rgba(255,255,255,0.06)'
                                                    },
                                                    children: suggestion
                                                }, suggestion))
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[10px] text-[#5a6478]",
                                                    children: "Ctrl+Enter to generate"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                            onClick: ()=>{
                                                                setShowAiPrompt(false);
                                                                setAiPromptText('');
                                                            },
                                                            className: "px-3 py-1.5 rounded-lg text-xs font-medium text-[#8b95a8] hover:bg-white/[0.06] transition-colors",
                                                            children: "Cancel"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                            onClick: handleAiGenerate,
                                                            disabled: aiLoading || !aiPromptText.trim(),
                                                            className: "flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
                                                            style: {
                                                                background: 'rgba(139,92,246,0.2)',
                                                                color: '#a78bfa',
                                                                border: '1px solid rgba(139,92,246,0.3)'
                                                            },
                                                            children: aiLoading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                                                        className: "w-3.5 h-3.5 animate-spin"
                                                                    }),
                                                                    "Generating..."
                                                                ]
                                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                                                                        className: "w-3.5 h-3.5"
                                                                    }),
                                                                    "Generate"
                                                                ]
                                                            })
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            }),
                            votingPhase === 'configuring' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(VoteConfigModal, {
                                items: items,
                                onStart: startVote,
                                onClose: resetVoting
                            }),
                            (votingPhase === 'active' || votingPhase === 'ended') && activeVoteConfig && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "absolute top-3 right-3 w-[260px] rounded-xl overflow-hidden z-25",
                                style: {
                                    background: 'rgba(21,24,33,0.96)',
                                    border: '1px solid rgba(245,158,11,0.2)',
                                    boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(245,158,11,0.06)'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-3 py-2.5 flex items-center justify-between",
                                        style: {
                                            background: 'rgba(245,158,11,0.08)',
                                            borderBottom: '1px solid rgba(245,158,11,0.12)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                                        className: "w-4 h-4 text-[#f59e0b]"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-xs font-semibold text-[#f59e0b]",
                                                        children: activeVoteConfig.title
                                                    })
                                                ]
                                            }),
                                            votingPhase === 'ended' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[9px] px-1.5 py-0.5 rounded-full bg-[rgba(245,158,11,0.15)] text-[#f59e0b]",
                                                children: "Ended"
                                            }),
                                            votingPhase === 'active' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[9px] px-1.5 py-0.5 rounded-full bg-[rgba(0,229,160,0.15)] text-[#00e5a0]",
                                                children: "Active"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-3 py-2",
                                        style: {
                                            borderBottom: '1px solid rgba(255,255,255,0.04)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex items-center gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                                                className: "w-3 h-3 text-[#8b95a8]"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: "text-[10px] text-[#8b95a8]",
                                                                children: [
                                                                    localUserVotes.length,
                                                                    "/",
                                                                    activeVoteConfig.votesPerUser,
                                                                    " votes used"
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    activeVoteConfig.timeLimitSeconds > 0 && votingPhase === 'active' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_45__/* ["default"] */ .A, {
                                                                className: "w-3 h-3 text-[#ff5757]"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: `text-[11px] font-mono font-bold ${voteTimeRemaining <= 10 ? 'text-[#ff5757]' : 'text-[#e8ecf4]'}`,
                                                                children: [
                                                                    Math.floor(voteTimeRemaining / 60),
                                                                    ":",
                                                                    (voteTimeRemaining % 60).toString().padStart(2, '0')
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    activeVoteConfig.timeLimitSeconds > 0 && votingPhase === 'ended' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-[10px] text-[#5a6478]",
                                                        children: "Time's up"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "mt-1.5 h-1.5 rounded-full overflow-hidden",
                                                style: {
                                                    background: 'rgba(255,255,255,0.06)'
                                                },
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "h-full rounded-full transition-all",
                                                    style: {
                                                        width: `${localUserVotes.length / activeVoteConfig.votesPerUser * 100}%`,
                                                        background: '#f59e0b'
                                                    }
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "px-3 py-2 max-h-[240px] overflow-y-auto chat-wb-scrollbar",
                                        children: rankedResults.map((result, idx)=>{
                                            const canvasItem = items.find((i)=>i.id === result.itemId);
                                            if (!canvasItem) return null;
                                            const label = canvasItem.type === 'sticky' ? canvasItem.text || 'Empty note' : canvasItem.type === 'text' ? canvasItem.text || 'Text' : canvasItem.type === 'rect' ? 'Rectangle' : 'Circle';
                                            const maxVotes = Math.max(...rankedResults.map((r)=>r.count), 1);
                                            const barWidth = result.count / maxVotes * 100;
                                            const isLocal = localUserVotes.includes(result.itemId);
                                            const rankColor = idx === 0 ? '#f59e0b' : idx === 1 ? '#94a3b8' : idx === 2 ? '#cd7f32' : '#5a6478';
                                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2 mb-1.5 last:mb-0",
                                                children: [
                                                    votingPhase === 'ended' && idx < 3 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                                                        style: {
                                                            background: rankColor
                                                        },
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "text-[9px] font-bold text-white",
                                                            children: idx + 1
                                                        })
                                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                                                        style: {
                                                            background: 'rgba(255,255,255,0.06)'
                                                        },
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "text-[9px] text-[#5a6478]",
                                                            children: idx + 1
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "flex items-center justify-between mb-0.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                        className: "text-[10px] text-[#e8ecf4] truncate max-w-[130px]",
                                                                        children: label
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                        className: `text-[10px] font-bold ${isLocal ? 'text-[#f59e0b]' : 'text-[#8b95a8]'}`,
                                                                        children: result.count
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "h-1 rounded-full overflow-hidden",
                                                                style: {
                                                                    background: 'rgba(255,255,255,0.04)'
                                                                },
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                    className: "h-full rounded-full transition-all",
                                                                    style: {
                                                                        width: `${barWidth}%`,
                                                                        background: isLocal ? '#f59e0b' : rankColor,
                                                                        opacity: result.count > 0 ? 1 : 0.3
                                                                    }
                                                                })
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }, result.itemId);
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "px-3 py-2 flex gap-2",
                                        style: {
                                            borderTop: '1px solid rgba(255,255,255,0.04)'
                                        },
                                        children: [
                                            votingPhase === 'active' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                onClick: endVote,
                                                className: "flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] font-medium transition-colors",
                                                style: {
                                                    background: 'rgba(255,87,87,0.12)',
                                                    color: '#ff5757',
                                                    border: '1px solid rgba(255,87,87,0.2)'
                                                },
                                                children: "End Vote"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                onClick: resetVoting,
                                                className: "flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] font-medium transition-colors",
                                                style: {
                                                    background: 'rgba(255,255,255,0.04)',
                                                    color: 'var(--medq-text-muted, #8b95a8)',
                                                    border: '1px solid rgba(255,255,255,0.06)'
                                                },
                                                children: votingPhase === 'ended' ? 'Close' : 'Cancel'
                                            })
                                        ]
                                    })
                                ]
                            }),
                            showMinimap && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Minimap, {
                                items: items,
                                zoomLevel: zoomLevel,
                                stagePos: stagePos,
                                dimensions: dimensions,
                                onJumpTo: handleMinimapJump
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex items-center gap-2 px-3 py-2 flex-shrink-0 flex-wrap",
                style: {
                    background: 'rgba(21,24,33,0.95)',
                    borderTop: '1px solid rgba(255,255,255,0.06)'
                },
                children: tool === 'connector' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-1.5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-[10px] text-[#5a6478] mr-1",
                                    children: "Style"
                                }),
                                CONNECTOR_STYLES.map((cs)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        onClick: ()=>setConnectorStyle(cs.value),
                                        className: `px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${connectorStyle === cs.value ? 'ring-1 ring-[#00e5a0]' : ''}`,
                                        style: {
                                            background: connectorStyle === cs.value ? 'rgba(0,229,160,0.12)' : 'transparent',
                                            color: connectorStyle === cs.value ? '#00e5a0' : '#8b95a8'
                                        },
                                        children: cs.label
                                    }, cs.value))
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-px h-6",
                            style: {
                                background: 'rgba(255,255,255,0.08)'
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-1.5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-[10px] text-[#5a6478] mr-1",
                                    children: "Arrow"
                                }),
                                ARROWHEAD_OPTIONS.map((ah)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        onClick: ()=>setConnectorArrowhead(ah.value),
                                        className: `px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${connectorArrowhead === ah.value ? 'ring-1 ring-[#00e5a0]' : ''}`,
                                        style: {
                                            background: connectorArrowhead === ah.value ? 'rgba(0,229,160,0.12)' : 'transparent',
                                            color: connectorArrowhead === ah.value ? '#00e5a0' : '#8b95a8'
                                        },
                                        children: ah.label
                                    }, ah.value))
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-px h-6",
                            style: {
                                background: 'rgba(255,255,255,0.08)'
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "flex items-center gap-1",
                            children: COLORS.slice(0, 8).map((c)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: ()=>setColor(c),
                                    className: `w-5 h-5 rounded-full transition-all ${color === c ? 'ring-2 ring-white/30 scale-110' : ''}`,
                                    style: {
                                        background: c,
                                        border: c === CANVAS_BG ? '1px solid rgba(255,255,255,0.15)' : c === '#ffffff' ? '1px solid rgba(255,255,255,0.2)' : 'none'
                                    }
                                }, c))
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "flex-1"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                            className: "text-[10px] text-[#5a6478]",
                            children: [
                                "Click anchor to start, click another to connect",
                                connectingFrom && ' • ESC to cancel',
                                selectedConnectorId && ' • Del to remove'
                            ]
                        })
                    ]
                }) : tool === 'frame' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                    className: "w-4 h-4 text-[#8b5cf6]"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-xs font-medium text-[#8b5cf6]",
                                    children: "Frame Tool"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-px h-6",
                            style: {
                                background: 'rgba(255,255,255,0.08)'
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                            className: "text-[10px] text-[#5a6478]",
                            children: [
                                "Click & drag to create a frame. Each frame becomes a slide.",
                                frameItems.length > 0 && ` ${frameItems.length} frame${frameItems.length > 1 ? 's' : ''} created.`
                            ]
                        }),
                        frameItems.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-px h-6",
                                    style: {
                                        background: 'rgba(255,255,255,0.08)'
                                    }
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    onClick: enterPresentation,
                                    className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
                                    style: {
                                        background: 'rgba(139,92,246,0.12)',
                                        color: '#8b5cf6',
                                        border: '1px solid rgba(139,92,246,0.2)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5"
                                        }),
                                        " Present"
                                    ]
                                })
                            ]
                        }),
                        selectedFrameId && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-px h-6",
                                    style: {
                                        background: 'rgba(255,255,255,0.08)'
                                    }
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    onClick: ()=>fitToFrame(selectedFrameId),
                                    className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
                                    style: {
                                        background: 'rgba(0,229,160,0.1)',
                                        color: '#00e5a0',
                                        border: '1px solid rgba(0,229,160,0.15)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5"
                                        }),
                                        " Fit to Frame"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    onClick: ()=>exportFrameAsPng(selectedFrameId),
                                    className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
                                    style: {
                                        background: 'rgba(79,195,247,0.1)',
                                        color: '#4fc3f7',
                                        border: '1px solid rgba(79,195,247,0.15)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5"
                                        }),
                                        " Export PNG"
                                    ]
                                })
                            ]
                        }),
                        frameItems.length > 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-px h-6",
                                    style: {
                                        background: 'rgba(255,255,255,0.08)'
                                    }
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    onClick: exportAllFramesAsPdf,
                                    className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors",
                                    style: {
                                        background: 'rgba(79,195,247,0.1)',
                                        color: '#4fc3f7',
                                        border: '1px solid rgba(79,195,247,0.15)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_40__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5"
                                        }),
                                        " Export PDF"
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "flex-1"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            onClick: ()=>setShowLayersPanel((prev)=>!prev),
                            className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${showLayersPanel ? 'ring-1 ring-[#8b5cf6]' : ''}`,
                            style: {
                                background: showLayersPanel ? 'rgba(139,92,246,0.12)' : 'transparent',
                                color: showLayersPanel ? '#8b5cf6' : '#5a6478'
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                    className: "w-3.5 h-3.5"
                                }),
                                " Layers"
                            ]
                        })
                    ]
                }) : tool === 'laser' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-4 h-4 rounded-full",
                                    style: {
                                        background: '#ff5757',
                                        boxShadow: '0 0 8px rgba(255,87,87,0.5)'
                                    }
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-xs font-medium text-[#ff5757]",
                                    children: "Laser Pointer"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-px h-6",
                            style: {
                                background: 'rgba(255,255,255,0.08)'
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "text-[10px] text-[#5a6478]",
                            children: "Click & drag to point at things. No permanent marks. Press L to toggle."
                        }),
                        remoteLasers.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-px h-6",
                                    style: {
                                        background: 'rgba(255,255,255,0.08)'
                                    }
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "text-[10px] text-[#4fc3f7]",
                                    children: [
                                        remoteLasers.length,
                                        " other laser",
                                        remoteLasers.length > 1 ? 's' : '',
                                        " active"
                                    ]
                                })
                            ]
                        })
                    ]
                }) : tool === 'sticky' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-[10px] text-[#5a6478] mr-1",
                                    children: "Note color"
                                }),
                                STICKY_COLORS.map((sc, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        onClick: ()=>{
                                            setStickyColorIdx(idx);
                                            // If a sticky note is selected, change its color
                                            if (selectedStickyId) {
                                                setItems((prev)=>prev.map((item)=>item.id === selectedStickyId ? {
                                                            ...item,
                                                            stickyColor: sc.body,
                                                            stickyFoldColor: sc.fold,
                                                            stickyTextColor: sc.text
                                                        } : item));
                                            }
                                        },
                                        className: `w-7 h-7 rounded-md transition-all ${stickyColorIdx === idx ? 'ring-2 ring-white/30 scale-110' : ''}`,
                                        style: {
                                            background: sc.body,
                                            border: '1px solid rgba(0,0,0,0.12)'
                                        },
                                        title: sc.name
                                    }, sc.name))
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "flex-1"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                            className: "text-[10px] text-[#5a6478]",
                            children: [
                                "Click canvas to add note",
                                selectedStickyId && ' • Select color to change note'
                            ]
                        })
                    ]
                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "flex items-center gap-1.5",
                            children: COLORS.map((c)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: ()=>{
                                        setColor(c);
                                        if (tool === 'eraser') setTool('pen');
                                    },
                                    className: `w-6 h-6 rounded-full transition-all ${color === c && tool !== 'eraser' ? 'ring-2 ring-white/30 scale-110' : ''}`,
                                    style: {
                                        background: c,
                                        border: c === CANVAS_BG ? '1px solid rgba(255,255,255,0.15)' : c === '#ffffff' ? '1px solid rgba(255,255,255,0.2)' : 'none'
                                    }
                                }, c))
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-px h-6",
                            style: {
                                background: 'rgba(255,255,255,0.08)'
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "flex items-center gap-1",
                            children: BRUSH_SIZES.map((s)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: ()=>setBrushSize(s),
                                    className: `w-7 h-7 rounded-lg flex items-center justify-center transition-all ${brushSize === s ? 'ring-1 ring-[#00e5a0]' : ''}`,
                                    style: {
                                        background: brushSize === s ? 'rgba(0,229,160,0.12)' : 'transparent'
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "rounded-full",
                                        style: {
                                            width: Math.min(s + 1, 12),
                                            height: Math.min(s + 1, 12),
                                            background: tool === 'eraser' ? '#5a6478' : color
                                        }
                                    })
                                }, s))
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-px h-6",
                            style: {
                                background: 'rgba(255,255,255,0.08)'
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: ()=>zoomToLevel(Math.max(0.1, zoomLevel / 1.2)),
                                    className: "w-6 h-6 rounded flex items-center justify-center text-[#8b95a8] hover:bg-white/[0.06] transition-colors text-xs font-bold",
                                    title: "Zoom out",
                                    children: "−"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "text-[10px] text-[#e8ecf4] font-mono min-w-[36px] text-center",
                                    children: [
                                        Math.round(zoomLevel * 100),
                                        "%"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: ()=>zoomToLevel(Math.min(5, zoomLevel * 1.2)),
                                    className: "w-6 h-6 rounded flex items-center justify-center text-[#8b95a8] hover:bg-white/[0.06] transition-colors text-xs font-bold",
                                    title: "Zoom in",
                                    children: "+"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-0.5",
                            children: [
                                ZOOM_PRESETS.map((p)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>zoomToLevel(p),
                                        className: `px-1.5 py-0.5 rounded text-[9px] transition-all ${Math.abs(zoomLevel - p) < 0.01 ? 'text-[#00e5a0] bg-[rgba(0,229,160,0.12)]' : 'text-[#5a6478] hover:bg-white/[0.04]'}`,
                                        children: [
                                            Math.round(p * 100),
                                            "%"
                                        ]
                                    }, p)),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    onClick: fitToContent,
                                    className: "px-1.5 py-0.5 rounded text-[9px] text-[#5a6478] hover:bg-white/[0.04] transition-all",
                                    title: "Fit to content",
                                    children: "Fit"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "flex-1"
                        }),
                        (tool === 'pen' || tool === 'highlighter') && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "w-px h-6",
                                    style: {
                                        background: 'rgba(255,255,255,0.08)'
                                    }
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    onClick: ()=>setShapeRecognitionEnabled((prev)=>!prev),
                                    className: "flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium transition-all",
                                    style: {
                                        background: shapeRecognitionEnabled ? 'rgba(0,229,160,0.12)' : 'transparent',
                                        color: shapeRecognitionEnabled ? '#00e5a0' : '#5a6478',
                                        border: shapeRecognitionEnabled ? '1px solid rgba(0,229,160,0.2)' : '1px solid transparent'
                                    },
                                    title: shapeRecognitionEnabled ? 'Shape recognition: ON — rough shapes auto-detected' : 'Shape recognition: OFF',
                                    children: [
                                        shapeRecognitionEnabled ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "hidden sm:inline",
                                            children: "Shape Rec"
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                            className: "text-[10px] text-[#5a6478]",
                            children: [
                                TOOL_CONFIG[tool]?.label,
                                tool === 'eraser' && ` • ${brushSize * 4}px`,
                                tool === 'laser' && ' • Click & drag to point'
                            ]
                        })
                    ]
                })
            }),
            shapeSuggestion && !isPresenting && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "absolute z-40 flex items-center gap-2 px-3 py-2 rounded-xl shadow-2xl",
                style: {
                    left: `calc(${shapeSuggestion.position.x * zoomLevel + stagePos.x}px - 80px)`,
                    top: `calc(${shapeSuggestion.position.y * zoomLevel + stagePos.y}px - 50px)`,
                    background: 'rgba(21,24,33,0.96)',
                    border: '1px solid rgba(0,229,160,0.25)',
                    backdropFilter: 'blur(12px)',
                    animation: 'shapeToastIn 0.2s ease-out',
                    pointerEvents: 'auto'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-center w-7 h-7 rounded-lg",
                        style: {
                            background: 'rgba(0,229,160,0.1)'
                        },
                        children: [
                            shapeSuggestion.shapeName === 'Circle' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                className: "w-4 h-4 text-[#00e5a0]"
                            }),
                            shapeSuggestion.shapeName === 'Rectangle' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                className: "w-4 h-4 text-[#00e5a0]"
                            }),
                            shapeSuggestion.shapeName === 'Triangle' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_46__/* ["default"] */ .A, {
                                className: "w-4 h-4 text-[#00e5a0]"
                            }),
                            shapeSuggestion.shapeName === 'Diamond' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_47__/* ["default"] */ .A, {
                                className: "w-4 h-4 text-[#00e5a0]"
                            }),
                            shapeSuggestion.shapeName === 'Arrow' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                className: "w-4 h-4 text-[#00e5a0]"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-[11px] font-semibold text-[#e8ecf4] leading-tight",
                                children: [
                                    "Convert to ",
                                    shapeSuggestion.shapeName,
                                    "?"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-[9px] text-[#5a6478]",
                                children: [
                                    Math.round(shapeSuggestion.confidence * 100),
                                    "% match"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: acceptShapeSuggestion,
                        className: "flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all hover:scale-105",
                        style: {
                            background: 'rgba(0,229,160,0.2)',
                            color: '#00e5a0',
                            border: '1px solid rgba(0,229,160,0.3)'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                                className: "w-3 h-3"
                            }),
                            "Yes"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: rejectShapeSuggestion,
                        className: "flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all hover:bg-white/[0.06]",
                        style: {
                            color: 'var(--medq-text-muted, #8b95a8)'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                className: "w-3 h-3"
                            }),
                            "No"
                        ]
                    })
                ]
            }),
            isPresenting && currentFrame && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "fixed inset-0 z-50 flex flex-col",
                style: {
                    background: 'var(--medq-bg, #0c0e14)'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        ref: (el)=>{
                            if (el) {
                                const rect = el.getBoundingClientRect();
                                if (rect.width !== dimensions.width || rect.height !== dimensions.height) {
                                    setDimensions({
                                        width: Math.floor(rect.width),
                                        height: Math.floor(rect.height)
                                    });
                                }
                            }
                        },
                        className: "flex-1 relative",
                        style: {
                            cursor: 'none'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Stage */ .BI, {
                                width: dimensions.width,
                                height: dimensions.height - 60,
                                scaleX: presentationScale,
                                scaleY: presentationScale,
                                x: presentationOffset.x,
                                y: presentationOffset.y,
                                onMouseDown: (e)=>{
                                    if (tool === 'laser') {
                                        setLaserActive(true);
                                        laserActiveRef.current = true;
                                        const stage = e.target.getStage();
                                        if (!stage) return;
                                        const pos = stage.getPointerPosition();
                                        if (!pos) return;
                                        const worldX = (pos.x - presentationOffset.x) / presentationScale;
                                        const worldY = (pos.y - presentationOffset.y) / presentationScale;
                                        const newPoint = {
                                            x: worldX,
                                            y: worldY,
                                            timestamp: Date.now()
                                        };
                                        setLaserTrail((prev)=>[
                                                ...prev.slice(-LASER_TRAIL_MAX_POINTS),
                                                newPoint
                                            ]);
                                    }
                                },
                                onMouseMove: (e)=>{
                                    if (tool === 'laser' && laserActiveRef.current) {
                                        const stage = e.target.getStage();
                                        if (!stage) return;
                                        const pos = stage.getPointerPosition();
                                        if (!pos) return;
                                        const worldX = (pos.x - presentationOffset.x) / presentationScale;
                                        const worldY = (pos.y - presentationOffset.y) / presentationScale;
                                        const newPoint = {
                                            x: worldX,
                                            y: worldY,
                                            timestamp: Date.now()
                                        };
                                        setLaserTrail((prev)=>[
                                                ...prev.slice(-LASER_TRAIL_MAX_POINTS),
                                                newPoint
                                            ]);
                                        if (onLaserMove) {
                                            const now = Date.now();
                                            if (now - lastLaserBroadcastRef.current >= LASER_BROADCAST_INTERVAL) {
                                                lastLaserBroadcastRef.current = now;
                                                onLaserMove({
                                                    x: worldX,
                                                    y: worldY
                                                });
                                            }
                                        }
                                    }
                                },
                                onMouseUp: ()=>{
                                    setLaserActive(false);
                                    laserActiveRef.current = false;
                                    if (onLaserStop) onLaserStop();
                                },
                                onMouseLeave: ()=>{
                                    setLaserActive(false);
                                    laserActiveRef.current = false;
                                },
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Layer */ .Wd, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_konva__WEBPACK_IMPORTED_MODULE_2__/* .Rect */ .rw, {
                                            x: currentFrame.x || 0,
                                            y: currentFrame.y || 0,
                                            width: currentFrame.width || 800,
                                            height: currentFrame.height || 600,
                                            fill: currentFrame.frameBgColor || CANVAS_BG,
                                            cornerRadius: 4
                                        }),
                                        items.filter((item)=>item.id !== currentFrame.id && isItemInFrame(item, currentFrame)).map((item)=>{
                                            if (item.type === 'sticky') {
                                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(StickyNoteShape, {
                                                    item: item,
                                                    isEditing: false,
                                                    isSelected: false,
                                                    onDragEnd: ()=>{},
                                                    onDoubleClick: ()=>{},
                                                    onDelete: ()=>{},
                                                    onResizeStart: ()=>{},
                                                    onSelect: ()=>{}
                                                }, item.id);
                                            }
                                            if (item.type === 'connector') {
                                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ConnectorShape, {
                                                    item: item,
                                                    allItems: items,
                                                    isSelected: false,
                                                    onSelect: ()=>{},
                                                    onDelete: ()=>{}
                                                }, item.id);
                                            }
                                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RenderDrawItem, {
                                                item: item
                                            }, item.id);
                                        }),
                                        laserTrail.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LaserPointerShape, {
                                            points: laserTrail,
                                            color: "#ff5757"
                                        }),
                                        remoteLasers.map((rl)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LaserPointerShape, {
                                                points: rl.points,
                                                color: rl.color,
                                                name: rl.userName
                                            }, `rl-${rl.userId}`)),
                                        remoteCursors.map((cursor)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RemoteCursorShape, {
                                                cursor: cursor
                                            }, `rc-${cursor.userId}`))
                                    ]
                                })
                            }),
                            showFrameNotesPanel && currentFrame && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "absolute top-4 right-4 w-72 rounded-lg p-4",
                                style: {
                                    background: 'rgba(21,24,33,0.95)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    zIndex: 40
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center justify-between mb-2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-xs font-semibold text-[#f59e0b]",
                                                children: "Speaker Notes"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                onClick: ()=>setShowFrameNotesPanel(false),
                                                className: "text-[#5a6478] hover:text-white",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5"
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                        value: editingFrameNotes,
                                        onChange: (e)=>{
                                            setEditingFrameNotes(e.target.value);
                                            setItems((prev)=>prev.map((item)=>item.id === currentFrame.id ? {
                                                        ...item,
                                                        frameNotes: e.target.value
                                                    } : item));
                                        },
                                        className: "w-full h-40 bg-transparent border border-white/10 rounded p-2 text-xs text-[#8b95a8] resize-none outline-none focus:border-[#f59e0b]/30",
                                        placeholder: "Add speaker notes..."
                                    })
                                ]
                            }),
                            !showFrameNotesPanel && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>{
                                    setShowFrameNotesPanel(true);
                                    setEditingFrameNotes(currentFrame.frameNotes || '');
                                },
                                className: "absolute top-4 right-4 p-2 rounded-lg flex items-center",
                                style: {
                                    background: 'rgba(21,24,33,0.8)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: '#f59e0b',
                                    zIndex: 39
                                },
                                title: "Toggle speaker notes (N)",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_40__/* ["default"] */ .A, {
                                    className: "w-4 h-4"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "absolute top-4 left-4 px-3 py-1.5 rounded-lg",
                                style: {
                                    background: 'rgba(21,24,33,0.8)',
                                    border: '1px solid rgba(139,92,246,0.2)',
                                    zIndex: 38
                                },
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-sm font-semibold text-[#8b5cf6]",
                                    children: currentFrame.frameTitle || `Slide ${presentingFrame + 1}`
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2 px-4 py-3 flex-shrink-0",
                        style: {
                            background: 'rgba(21,24,33,0.98)',
                            borderTop: '1px solid rgba(255,255,255,0.06)',
                            height: '60px'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>navigateSlide(-1),
                                disabled: presentingFrame === 0,
                                className: "p-2 rounded-lg hover:bg-white/[0.06] transition-colors disabled:opacity-30",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_48__/* ["default"] */ .A, {
                                    className: "w-5 h-5 text-[#e8ecf4]"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-sm font-mono text-[#e8ecf4] min-w-[50px] text-center",
                                children: [
                                    presentingFrame + 1,
                                    "/",
                                    frameItems.length
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>navigateSlide(1),
                                disabled: presentingFrame === frameItems.length - 1,
                                className: "p-2 rounded-lg hover:bg-white/[0.06] transition-colors disabled:opacity-30",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_49__/* ["default"] */ .A, {
                                    className: "w-5 h-5 text-[#e8ecf4]"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-px h-6",
                                style: {
                                    background: 'rgba(255,255,255,0.08)'
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "flex items-center gap-2 flex-1 overflow-x-auto chat-wb-scrollbar px-2",
                                children: frameItems.map((frame, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        onClick: ()=>{
                                            setPresentingFrame(idx);
                                            setEditingFrameNotes(frame.frameNotes || '');
                                        },
                                        className: `flex-shrink-0 rounded-md overflow-hidden transition-all ${idx === presentingFrame ? 'ring-2 ring-[#8b5cf6]' : 'opacity-60 hover:opacity-100'}`,
                                        style: {
                                            width: '80px',
                                            height: '50px',
                                            background: CANVAS_BG,
                                            border: '1px solid rgba(255,255,255,0.08)'
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "w-full h-full flex items-center justify-center p-1",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[9px] text-[#8b95a8] text-center leading-tight truncate",
                                                children: frame.frameTitle || `Slide ${idx + 1}`
                                            })
                                        })
                                    }, frame.id))
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-px h-6",
                                style: {
                                    background: 'rgba(255,255,255,0.08)'
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "w-3 h-3 rounded-full",
                                        style: {
                                            background: '#ff5757',
                                            boxShadow: '0 0 6px rgba(255,87,87,0.5)'
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[10px] text-[#ff5757]",
                                        children: "Laser"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "w-px h-6",
                                style: {
                                    background: 'rgba(255,255,255,0.08)'
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: exitPresentation,
                                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                                style: {
                                    background: 'rgba(255,87,87,0.12)',
                                    color: '#ff5757',
                                    border: '1px solid rgba(255,87,87,0.2)'
                                },
                                title: "Exit presentation (Esc)",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_Camera_Check_ChevronLeft_ChevronRight_Circle_Clock_Crosshair_Diamond_Download_Eraser_FileOutput_FileText_Group_Highlighter_Image_Layers_LayoutTemplate_Link2_Loader2_Maximize2_Minus_Monitor_MoveRight_Paperclip_Pause_Pencil_Play_Redo2_Send_Sparkles_Square_StickyNote_ThumbsUp_ToggleLeft_ToggleRight_Trash2_Triangle_Type_Undo2_Video_VideoOff_Vote_Waypoints_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5"
                                    }),
                                    " Exit"
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

}]);