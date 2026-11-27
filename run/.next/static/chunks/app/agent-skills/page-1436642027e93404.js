(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[76393],{

/***/ 18349:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ Textarea)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40980);



function Textarea({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
        "data-slot": "textarea",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", className),
        ...props
    });
}



/***/ }),

/***/ 40980:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cn: () => (/* binding */ cn)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29722);
/* harmony import */ var tailwind_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(622);


function cn(...inputs) {
    return (0,tailwind_merge__WEBPACK_IMPORTED_MODULE_0__/* .twMerge */ .QP)((0,clsx__WEBPACK_IMPORTED_MODULE_1__/* .clsx */ .$)(inputs));
}


/***/ }),

/***/ 45160:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ Badge)
/* harmony export */ });
/* unused harmony export badgeVariants */
/* harmony import */ var _base_ui_react_merge_props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40253);
/* harmony import */ var _base_ui_react_use_render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41537);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18460);
/* harmony import */ var cn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(52968);




const badgeVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_0__/* .cva */ .F)("group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
            secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
            destructive: "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
            outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
            ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
            link: "text-primary underline-offset-4 hover:underline"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant = "default", render, ...props }) {
    return (0,_base_ui_react_use_render__WEBPACK_IMPORTED_MODULE_1__/* .useRender */ .C)({
        defaultTagName: "span",
        props: (0,_base_ui_react_merge_props__WEBPACK_IMPORTED_MODULE_2__/* .mergeProps */ .v6)({
            className: (0,cn__WEBPACK_IMPORTED_MODULE_3__.cn)(badgeVariants({
                variant
            }), className)
        }, props),
        render,
        state: {
            slot: "badge",
            variant
        }
    });
}



/***/ }),

/***/ 47687:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Xi: () => (/* binding */ TabsTrigger),
/* harmony export */   av: () => (/* binding */ TabsContent),
/* harmony export */   j7: () => (/* binding */ TabsList),
/* harmony export */   tU: () => (/* binding */ Tabs)
/* harmony export */ });
/* unused harmony export tabsListVariants */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _base_ui_react_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(81381);
/* harmony import */ var _base_ui_react_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(56745);
/* harmony import */ var _base_ui_react_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18796);
/* harmony import */ var _base_ui_react_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(22327);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18460);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40980);
/* __next_internal_client_entry_do_not_use__ Tabs,TabsList,TabsTrigger,TabsContent,tabsListVariants auto */ 



function Tabs({ className, orientation = "horizontal", ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_tabs__WEBPACK_IMPORTED_MODULE_1__/* .TabsRoot */ .p, {
        "data-slot": "tabs",
        "data-orientation": orientation,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("group/tabs flex gap-2 data-horizontal:flex-col", className),
        ...props
    });
}
const tabsListVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_3__/* .cva */ .F)("group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none", {
    variants: {
        variant: {
            default: "bg-muted",
            line: "gap-1 bg-transparent"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function TabsList({ className, variant = "default", ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_tabs__WEBPACK_IMPORTED_MODULE_4__/* .TabsList */ .j, {
        "data-slot": "tabs-list",
        "data-variant": variant,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)(tabsListVariants({
            variant
        }), className),
        ...props
    });
}
function TabsTrigger({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_tabs__WEBPACK_IMPORTED_MODULE_5__/* .TabsTab */ .M, {
        "data-slot": "tabs-trigger",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent", "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground", "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100", className),
        ...props
    });
}
function TabsContent({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_tabs__WEBPACK_IMPORTED_MODULE_6__/* .TabsPanel */ .R, {
        "data-slot": "tabs-content",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("flex-1 text-sm outline-none", className),
        ...props
    });
}



/***/ }),

/***/ 59820:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 61657));


/***/ }),

/***/ 60529:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _base_ui_react_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(44886);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40980);




function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_input__WEBPACK_IMPORTED_MODULE_2__/* .Input */ .p, {
        type: type,
        "data-slot": "input",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", className),
        ...props
    });
}



/***/ }),

/***/ 61657:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AgentSkillsPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(37206);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(89239);
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(81477);
/* harmony import */ var _components_ui_textarea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18349);
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(60529);
/* harmony import */ var _components_ui_badge__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(45160);
/* harmony import */ var _components_ui_separator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(97916);
/* harmony import */ var _components_ui_tabs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(47687);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(36483);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(8117);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(797);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(23876);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(94774);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(86210);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(7527);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(25182);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(84614);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(15688);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(12980);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(65377);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(50626);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(97932);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(27898);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(77618);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(40557);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(29450);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(86272);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(57990);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(68562);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(9383);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(34000);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(31966);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(6923);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(64577);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(99314);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(50825);
/* harmony import */ var _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(1275);
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(18931);
/* harmony import */ var _components_medq_ai_agent_MultimodalRenderer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(10962);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * MedQ Agent Skills — Enhanced UI
 *
 * Three tabs:
 *   1. CHAT  — Conversation with the MedQ agent. Uses the JOB-BASED endpoint
 *              (/api/medq-agent/job) so long tool chains never time out.
 *              Renders markdown, shows tool-call cards inline, polls for
 *              progress every 800ms.
 *   2. SKILLS — Searchable, categorized grid of all 18 skill tools. Each
 *               card has a "Use this skill" button that drops a prompt
 *               template into the chat tab.
 *   3. UPLOAD — Embedded file-upload widget (links to /skills-playground for
 *               the full VLM / image-edit / video-understand flow).
 *
 * Replaces the previous SSE-only /agent-skills page.
 */ 











const SKILL_META = {
    pdf: {
        icon: _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A,
        category: 'Documents',
        color: 'from-rose-500 to-red-600',
        solidBg: '#e11d48',
        ring: 'ring-rose-200',
        samplePrompt: 'Make me a PDF cheat sheet of the cranial nerves with mnemonics'
    },
    pptx: {
        icon: _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A,
        category: 'Documents',
        color: 'from-orange-500 to-amber-600',
        solidBg: '#ea580c',
        ring: 'ring-orange-200',
        samplePrompt: 'Generate a PowerPoint deck on the cardiac cycle (5 slides)'
    },
    docx: {
        icon: _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A,
        category: 'Documents',
        color: 'from-blue-500 to-indigo-600',
        solidBg: '#2563eb',
        ring: 'ring-blue-200',
        samplePrompt: 'Make me a Word document template for SOAP notes'
    },
    xlsx: {
        icon: _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A,
        category: 'Documents',
        color: 'from-emerald-500 to-green-600',
        solidBg: '#059669',
        ring: 'ring-emerald-200',
        samplePrompt: 'Build me an Excel sheet of common lab reference ranges by age'
    },
    charts: {
        icon: _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A,
        category: 'Data',
        color: 'from-cyan-500 to-teal-600',
        solidBg: '#0891b2',
        ring: 'ring-cyan-200',
        samplePrompt: 'Create a bar chart comparing the efficacy of common antihypertensives'
    },
    'image-generation': {
        icon: _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A,
        category: 'Images',
        color: 'from-violet-500 to-purple-600',
        solidBg: '#7c3aed',
        ring: 'ring-violet-200',
        samplePrompt: 'Generate a medical illustration of the nephron'
    },
    'image-search': {
        icon: _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A,
        category: 'Images',
        color: 'from-fuchsia-500 to-pink-600',
        solidBg: '#c026d3',
        ring: 'ring-fuchsia-200',
        samplePrompt: 'Find me 3 real histology slides of cardiac muscle tissue'
    },
    'image-edit': {
        icon: _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A,
        category: 'Images',
        color: 'from-pink-500 to-rose-600',
        solidBg: '#db2777',
        ring: 'ring-pink-200',
        samplePrompt: '(Use the Upload tab to upload an image to edit)'
    },
    vlm: {
        icon: _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A,
        category: 'Images',
        color: 'from-sky-500 to-cyan-600',
        solidBg: '#0284c7',
        ring: 'ring-sky-200',
        samplePrompt: '(Use the Upload tab to upload an image to analyze)'
    },
    tts: {
        icon: _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A,
        category: 'Audio & Video',
        color: 'from-amber-500 to-yellow-600',
        solidBg: '#d97706',
        ring: 'ring-amber-200',
        samplePrompt: 'Pronounce "onychocryptosis" and save it as an audio file'
    },
    asr: {
        icon: _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A,
        category: 'Audio & Video',
        color: 'from-yellow-500 to-orange-600',
        solidBg: '#ca8a04',
        ring: 'ring-yellow-200',
        samplePrompt: '(Use the Upload tab to upload audio for transcription)'
    },
    'video-understand': {
        icon: _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A,
        category: 'Audio & Video',
        color: 'from-red-500 to-pink-600',
        solidBg: '#dc2626',
        ring: 'ring-red-200',
        samplePrompt: '(Use the Upload tab to upload a video to analyze)'
    },
    'web-search': {
        icon: _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A,
        category: 'Web',
        color: 'from-indigo-500 to-blue-600',
        solidBg: '#4f46e5',
        ring: 'ring-indigo-200',
        samplePrompt: 'Search the web for the latest 2023 ACC/AHA heart failure guidelines and summarize'
    },
    'web-reader': {
        icon: _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A,
        category: 'Web',
        color: 'from-blue-500 to-sky-600',
        solidBg: '#2563eb',
        ring: 'ring-blue-200',
        samplePrompt: 'Read https://www.who.int/news-room/fact-sheets/detail/hypertension and summarize'
    },
    'lecture-summarizer': {
        icon: _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A,
        category: 'Study',
        color: 'from-purple-500 to-indigo-600',
        solidBg: '#7c3aed',
        ring: 'ring-purple-200',
        samplePrompt: 'I uploaded a 45-minute lecture audio on acute coronary syndromes — transcribe it and give me a summary, key points, and 10 flashcards'
    },
    'osce-simulator': {
        icon: _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A,
        category: 'Study',
        color: 'from-teal-500 to-emerald-600',
        solidBg: '#0d9488',
        ring: 'ring-teal-200',
        samplePrompt: 'Set up an OSCE station: 57-year-old male with crushing chest pain radiating to the left arm — I want to practice by speaking my questions aloud'
    },
    'exam-planner': {
        icon: _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A,
        category: 'Study',
        color: 'from-rose-500 to-pink-600',
        solidBg: '#e11d48',
        ring: 'ring-rose-200',
        samplePrompt: 'Plan a 12-week USMLE Step 1 study schedule starting Jan 1 — subjects: Cardiology (mastery 40), Respiratory (mastery 60), Renal (mastery 30)'
    },
    'guidelines-library': {
        icon: _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A,
        category: 'Study',
        color: 'from-amber-500 to-orange-600',
        solidBg: '#d97706',
        ring: 'ring-amber-200',
        samplePrompt: 'What do the latest ACC/AHA and ESC guidelines say about hypertension management? Focus on pharmacologic therapy.'
    },
    '3d-models': {
        icon: _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A,
        category: '3D',
        color: 'from-violet-500 to-fuchsia-600',
        solidBg: '#8b5cf6',
        ring: 'ring-violet-200',
        samplePrompt: '(Opens the 3D Models tab — search Sketchfab for interactive anatomy models)'
    }
};
const CATEGORIES = [
    'Documents',
    'Data',
    'Images',
    'Audio & Video',
    'Web',
    'Study',
    '3D'
];
// ── 3D Models tab (lazy-loaded — uses client-only anatomy search) ──
const AnatomyDiscover = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_2__["default"])(()=>Promise.all(/* import() */[__webpack_require__.e(2595), __webpack_require__.e(25818), __webpack_require__.e(41004)]).then(__webpack_require__.bind(__webpack_require__, 25818)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(25818)
            ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex items-center justify-center py-20 text-slate-500",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                    className: "size-6 animate-spin mr-2"
                }),
                " Loading 3D model search…"
            ]
        })
});
const SAMPLE_PROMPTS = [
    'Make me a PDF cheat sheet of the cranial nerves with mnemonics',
    'Generate a PowerPoint deck on the cardiac cycle (5 slides)',
    'Create a bar chart comparing the efficacy of common antihypertensives',
    'Generate a medical illustration of the nephron',
    'Search the web for the latest 2023 ACC/AHA heart failure guidelines and summarize',
    'Make me a Word document template for SOAP notes',
    'Build me an Excel sheet of common lab reference ranges by age',
    'Pronounce "onychocryptosis" and save it as an audio file',
    'Build me a cardiology study pack: guidelines library → cheat sheet PDF → hemodynamics chart → review slides',
    'Plan a 12-week USMLE Step 1 study schedule — Cardiology (mastery 40), Respiratory (60), Renal (30)',
    'Set up an OSCE station: 57-year-old male with crushing chest pain radiating to the left arm',
    'What do the ACC/AHA and ESC guidelines say about atrial fibrillation management?',
    'I uploaded a lecture audio — transcribe it and turn it into flashcards',
    'Practice an OSCE station with voice — I\'ll speak my questions, you respond out loud as the patient'
];
// ─── Component ─────────────────────────────────────────────────────
function AgentSkillsPage() {
    const [skills, setSkills] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [input, setInput] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [activeTab, setActiveTab] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('chat');
    const [search, setSearch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const abortRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const pollTimers = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(new Map());
    const scrollRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetch('/api/medq-agent/skills').then((r)=>r.json()).then((data)=>setSkills(data.skills || [])).catch((err)=>console.error('Failed to load skills', err));
    }, []);
    // Force light mode on this page — the page was designed with light theme
    // (white cards, slate text, teal accents). Dark mode would invert the
    // shadcn semantic tokens (Card, Button, Input) and break contrast.
    // We restore the previous theme on unmount so navigation elsewhere
    // respects the user's preference.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const html = document.documentElement;
        const wasDark = html.classList.contains('dark');
        if (wasDark) html.classList.remove('dark');
        return ()=>{
            if (wasDark) html.classList.add('dark');
        };
    }, []);
    // Auto-scroll to bottom on new messages.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [
        messages
    ]);
    // ─── Job polling ────────────────────────────────────────────────
    // Bounded polling: retry up to MAX_POLL_RETRIES on transient errors (5xx /
    // network), with exponential backoff. 404 means the job is gone — stop.
    // After max retries, mark the assistant message as failed so the UI
    // doesn't hammer a dead server forever (this was the HTTP 502 console
    // error storm seen previously).
    const MAX_POLL_RETRIES = 6;
    const pollRetryCounts = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(new Map());
    const pollJob = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (jobId, msgId, since = 0)=>{
        try {
            const resp = await fetch(`/api/medq-agent/job/${jobId}?since=${since}`);
            if (!resp.ok) {
                throw new Error(`HTTP ${resp.status}`);
            }
            const data = await resp.json();
            // Success — reset retry counter for this message.
            pollRetryCounts.current.delete(msgId);
            // Update the assistant message with new events.
            setMessages((prev)=>prev.map((m)=>{
                    if (m.id !== msgId) return m;
                    // Rebuild toolCalls + content + progressText from the events we've seen.
                    // We pull from `allEvents` so we always have the complete picture.
                    const allEvents = data.allEvents || [];
                    const toolCalls = [];
                    let content = '';
                    let progressText = '';
                    for (const evt of allEvents){
                        if (evt.type === 'text' && evt.text) {
                            content += evt.text;
                        } else if (evt.type === 'tool_call' && evt.name) {
                            toolCalls.push({
                                name: evt.name,
                                args: evt.args || {},
                                status: 'running',
                                iteration: evt.iteration
                            });
                        } else if (evt.type === 'tool_result' && evt.name) {
                            // Find the matching running tool call and update it.
                            for(let i = toolCalls.length - 1; i >= 0; i--){
                                if (toolCalls[i].name === evt.name && toolCalls[i].status === 'running') {
                                    toolCalls[i].result = evt.result;
                                    // Use the explicit `failed` flag when present (set by the
                                    // route handler based on CapabilityResult.ok). Fall back to
                                    // the old `!evt.result` heuristic for legacy callers.
                                    toolCalls[i].status = evt.failed ? 'failed' : evt.result ? 'done' : 'failed';
                                    break;
                                }
                            }
                        } else if (evt.type === 'progress' && evt.text) {
                            progressText = evt.text;
                        }
                    }
                    return {
                        ...m,
                        content,
                        toolCalls,
                        progressText,
                        status: data.status === 'completed' ? 'completed' : data.status === 'failed' ? 'failed' : 'running'
                    };
                }));
            // If not done, schedule next poll.
            if (data.status === 'pending' || data.status === 'processing') {
                const nextSince = data.since || Date.now();
                const timer = setTimeout(()=>pollJob(jobId, msgId, nextSince), 800);
                pollTimers.current.set(msgId, timer);
            } else {
                // Done — clear timer.
                const timer = pollTimers.current.get(msgId);
                if (timer) {
                    clearTimeout(timer);
                    pollTimers.current.delete(msgId);
                }
            }
        } catch (err) {
            const errStr = err.message || String(err);
            const is404 = /HTTP 404/.test(errStr);
            const retries = (pollRetryCounts.current.get(msgId) || 0) + 1;
            // 404 = job genuinely gone (server restart cleared the in-memory store,
            // or the job expired). Don't retry — mark as failed.
            if (is404) {
                console.warn('[pollJob] job not found (404), stopping:', jobId);
                pollRetryCounts.current.delete(msgId);
                pollTimers.current.delete(msgId);
                setMessages((prev)=>prev.map((m)=>{
                        if (m.id !== msgId) return m;
                        return {
                            ...m,
                            status: 'failed',
                            content: '⚠️ This agent session was lost (server may have restarted). Please send your request again.',
                            progressText: undefined
                        };
                    }));
                return;
            }
            // Transient error (5xx, network). Exponential backoff: 2s, 4s, 8s, 16s, 32s, 64s.
            if (retries > MAX_POLL_RETRIES) {
                console.error('[pollJob] giving up after', retries, 'retries for job', jobId, err);
                pollRetryCounts.current.delete(msgId);
                pollTimers.current.delete(msgId);
                setMessages((prev)=>prev.map((m)=>{
                        if (m.id !== msgId) return m;
                        return {
                            ...m,
                            status: 'failed',
                            content: `⚠️ Lost connection to the agent after ${retries - 1} retries. The server may be busy or restarting. Please try again in a moment.\n\nError: ${errStr}`,
                            progressText: undefined
                        };
                    }));
                return;
            }
            pollRetryCounts.current.set(msgId, retries);
            // Exponential backoff capped at 30s.
            const delay = Math.min(2000 * Math.pow(2, retries - 1), 30000);
            console.warn(`[pollJob] retry ${retries}/${MAX_POLL_RETRIES} in ${delay}ms for job ${jobId}: ${errStr}`);
            const timer = setTimeout(()=>pollJob(jobId, msgId, since), delay);
            pollTimers.current.set(msgId, timer);
        }
    }, []);
    // ─── Send message (job-based) ───────────────────────────────────
    const sendMessage = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (text)=>{
        if (!text.trim()) return;
        setInput('');
        const msgId = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        const userMsg = {
            id: `user_${msgId}`,
            role: 'user',
            content: text,
            timestamp: Date.now()
        };
        const assistantMsg = {
            id: `asst_${msgId}`,
            role: 'assistant',
            content: '',
            toolCalls: [],
            status: 'running',
            progressText: 'Starting…',
            timestamp: Date.now() + 1
        };
        setMessages((m)=>[
                ...m,
                userMsg,
                assistantMsg
            ]);
        try {
            const resp = await fetch('/api/medq-agent/job', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: text,
                    mode: 'study'
                })
            });
            if (!resp.ok) {
                const errText = await resp.text();
                throw new Error(`HTTP ${resp.status}: ${errText}`);
            }
            const data = await resp.json();
            const jobId = data.jobId;
            // Attach jobId to the assistant message.
            setMessages((prev)=>prev.map((m)=>m.id === assistantMsg.id ? {
                        ...m,
                        jobId
                    } : m));
            // Start polling.
            pollJob(jobId, assistantMsg.id, 0);
        } catch (err) {
            setMessages((prev)=>prev.map((m)=>{
                    if (m.id !== assistantMsg.id) return m;
                    return {
                        ...m,
                        status: 'failed',
                        content: `⚠️ Failed to start agent job: ${err.message}`,
                        progressText: undefined
                    };
                }));
        }
    }, [
        pollJob
    ]);
    const handleStop = ()=>{
        // Note: the job continues running in the background; we just stop polling.
        // The user can refresh the page later and the result will still be there.
        for (const [, timer] of pollTimers.current)clearTimeout(timer);
        pollTimers.current.clear();
        pollRetryCounts.current.clear();
        setMessages((prev)=>prev.map((m)=>m.status === 'running' ? {
                    ...m,
                    status: 'completed',
                    progressText: undefined
                } : m));
    };
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };
    const useSkillPrompt = (prompt)=>{
        setInput(prompt);
        setActiveTab('chat');
    };
    // Special handling for skills that don't fit the chat-prompt model:
    // 3D Models opens its own dedicated tab (it's a search UI, not an LLM tool).
    const useSkill = (skillId)=>{
        if (skillId === '3d-models') {
            setActiveTab('models');
            return;
        }
        const meta = SKILL_META[skillId];
        if (meta?.samplePrompt) {
            useSkillPrompt(meta.samplePrompt);
        }
    };
    // Filter skills by search.
    const filteredSkills = skills.filter((s)=>{
        if (!search) return true;
        const q = search.toLowerCase();
        return s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
    });
    const isRunning = messages.some((m)=>m.status === 'running');
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "min-h-screen flex flex-col bg-slate-100/70",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "h-1 w-full bg-gradient-to-r from-teal-500 via-sky-500 to-cyan-500"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("header", {
                className: "border-b border-slate-200 bg-white shadow-sm sticky top-0 z-10",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "container mx-auto px-4 py-3.5 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "size-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                                        className: "size-5"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
                                            className: "text-lg font-bold tracking-tight text-slate-900",
                                            children: "MedQ Agent"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                            className: "text-xs text-slate-600 font-medium",
                                            children: [
                                                "AI medical study buddy \xb7 ",
                                                skills.length,
                                                " skills \xb7 background-job mode (no timeouts)"
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_7__/* .Badge */ .E, {
                                    variant: "outline",
                                    className: "gap-1 hidden sm:flex border-slate-300 text-slate-700 bg-white",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                                            className: "size-3"
                                        }),
                                        skills.length,
                                        " skills"
                                    ]
                                }),
                                isRunning && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_7__/* .Badge */ .E, {
                                    className: "gap-1.5 bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                            className: "size-3 animate-spin"
                                        }),
                                        "running"
                                    ]
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "container mx-auto px-4 py-4 flex-1",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_tabs__WEBPACK_IMPORTED_MODULE_9__/* .Tabs */ .tU, {
                    value: activeTab,
                    onValueChange: setActiveTab,
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_tabs__WEBPACK_IMPORTED_MODULE_9__/* .TabsList */ .j7, {
                            className: "grid w-full max-w-2xl grid-cols-4 bg-slate-200/60 p-1",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_tabs__WEBPACK_IMPORTED_MODULE_9__/* .TabsTrigger */ .Xi, {
                                    value: "chat",
                                    className: "gap-1.5 data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                                            className: "size-3.5"
                                        }),
                                        "Chat"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_tabs__WEBPACK_IMPORTED_MODULE_9__/* .TabsTrigger */ .Xi, {
                                    value: "skills",
                                    className: "gap-1.5 data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                                            className: "size-3.5"
                                        }),
                                        "Skills"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_tabs__WEBPACK_IMPORTED_MODULE_9__/* .TabsTrigger */ .Xi, {
                                    value: "models",
                                    className: "gap-1.5 data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                            className: "size-3.5"
                                        }),
                                        "3D Models"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_tabs__WEBPACK_IMPORTED_MODULE_9__/* .TabsTrigger */ .Xi, {
                                    value: "upload",
                                    className: "gap-1.5 data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                            className: "size-3.5"
                                        }),
                                        "Upload"
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_tabs__WEBPACK_IMPORTED_MODULE_9__/* .TabsContent */ .av, {
                            value: "chat",
                            className: "mt-4",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .Card */ .Zp, {
                                        className: "flex flex-col h-[calc(100vh-220px)] border-slate-200 shadow-sm overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardHeader */ .aR, {
                                                className: "border-b border-slate-200 bg-gradient-to-r from-slate-50 to-teal-50/40 py-3",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardTitle */ .ZB, {
                                                                    className: "text-base flex items-center gap-2 text-slate-900",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                                                                            className: "size-4 text-teal-600"
                                                                        }),
                                                                        "Conversation"
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardDescription */ .BT, {
                                                                    className: "text-xs mt-0.5 text-slate-600",
                                                                    children: "Runs in background \xb7 polls every 800ms \xb7 no timeout errors"
                                                                })
                                                            ]
                                                        }),
                                                        isRunning && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                                            onClick: handleStop,
                                                            variant: "outline",
                                                            size: "sm",
                                                            className: "gap-1.5 border-slate-300 text-slate-700 hover:bg-slate-50",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "size-2.5 bg-rose-500 rounded-sm"
                                                                }),
                                                                "Stop polling"
                                                            ]
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                ref: scrollRef,
                                                className: "flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60",
                                                children: [
                                                    messages.length === 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "text-center py-10 space-y-5",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "size-14 mx-auto rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/30",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                                                                    className: "size-7"
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                        className: "font-semibold text-slate-800 text-base",
                                                                        children: "Try one of these prompts"
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                        className: "text-sm text-slate-600 mt-1",
                                                                        children: "Or write your own below"
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl mx-auto",
                                                                children: SAMPLE_PROMPTS.map((prompt)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                        className: "text-xs text-left px-3 py-2.5 rounded-lg border border-slate-200 bg-white hover:border-teal-300 hover:bg-teal-50/50 hover:shadow-sm transition-all text-slate-700 hover:text-slate-900",
                                                                        onClick: ()=>sendMessage(prompt),
                                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                            className: "block leading-relaxed",
                                                                            children: prompt
                                                                        })
                                                                    }, prompt))
                                                            })
                                                        ]
                                                    }),
                                                    messages.map((msg)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MessageBubble, {
                                                            message: msg
                                                        }, msg.id))
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "border-t border-slate-200 p-3 bg-white",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex gap-2 items-end",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_textarea__WEBPACK_IMPORTED_MODULE_5__/* .Textarea */ .T, {
                                                                value: input,
                                                                onChange: (e)=>setInput(e.target.value),
                                                                onKeyDown: handleKeyDown,
                                                                placeholder: "Ask the agent to make something... (e.g., 'Make me a PDF cheat sheet on ECG interpretation')",
                                                                className: "min-h-[52px] max-h-[200px] resize-none border-slate-300 focus-visible:ring-teal-500/30 focus-visible:border-teal-500",
                                                                disabled: isRunning
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                                                                onClick: ()=>sendMessage(input),
                                                                disabled: !input.trim() || isRunning,
                                                                size: "icon",
                                                                className: "bg-gradient-to-br from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white shadow-md shadow-teal-500/20",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                                                    className: "size-4"
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                        className: "text-[11px] text-slate-500 mt-1.5 font-medium",
                                                        children: [
                                                            "Press ",
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("kbd", {
                                                                className: "px-1 py-0.5 rounded border border-slate-300 bg-slate-50 text-[10px] font-mono",
                                                                children: "Enter"
                                                            }),
                                                            " to send,",
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("kbd", {
                                                                className: "ml-1 px-1 py-0.5 rounded border border-slate-300 bg-slate-50 text-[10px] font-mono",
                                                                children: "Shift+Enter"
                                                            }),
                                                            " for newline \xb7 runs as background job"
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("aside", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .Card */ .Zp, {
                                                className: "border-slate-200 shadow-sm",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardHeader */ .aR, {
                                                        className: "py-3 border-b border-slate-100",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardTitle */ .ZB, {
                                                            className: "text-sm flex items-center gap-2 text-slate-800",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                                                                    className: "size-4 text-amber-500"
                                                                }),
                                                                "Quick prompts"
                                                            ]
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardContent */ .Wu, {
                                                        className: "space-y-1.5 pt-3",
                                                        children: SAMPLE_PROMPTS.slice(0, 5).map((p)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                onClick: ()=>useSkillPrompt(p),
                                                                className: "w-full text-left text-xs px-2.5 py-2 rounded-md border border-slate-200 bg-white hover:border-teal-300 hover:bg-teal-50 text-slate-700 hover:text-slate-900 transition-colors leading-relaxed",
                                                                children: p
                                                            }, p))
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .Card */ .Zp, {
                                                className: "bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200 shadow-sm",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardContent */ .Wu, {
                                                    className: "p-3.5 text-xs text-teal-900 space-y-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                            className: "font-semibold flex items-center gap-1.5 text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                                                                    className: "size-4 text-teal-600"
                                                                }),
                                                                "Pro tip"
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "leading-relaxed text-teal-800/90",
                                                            children: 'Chain skills: ask for a "cardiology study pack" and the agent will web-search, generate a PDF cheat sheet, build a chart, and create review slides — all in one job.'
                                                        })
                                                    ]
                                                })
                                            })
                                        ]
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_tabs__WEBPACK_IMPORTED_MODULE_9__/* .TabsContent */ .av, {
                            value: "skills",
                            className: "mt-4",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "space-y-5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "relative flex-1 max-w-md",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                                                        className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_6__/* .Input */ .p, {
                                                        placeholder: "Search skills by name, description, or ID…",
                                                        value: search,
                                                        onChange: (e)=>setSearch(e.target.value),
                                                        className: "pl-9 border-slate-300 focus-visible:ring-teal-500/30 focus-visible:border-teal-500"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_7__/* .Badge */ .E, {
                                                variant: "outline",
                                                className: "text-xs border-slate-300 text-slate-700 bg-white",
                                                children: [
                                                    filteredSkills.length,
                                                    " of ",
                                                    skills.length
                                                ]
                                            })
                                        ]
                                    }),
                                    CATEGORIES.map((cat)=>{
                                        const catSkills = filteredSkills.filter((s)=>SKILL_META[s.id]?.category === cat);
                                        if (catSkills.length === 0) return null;
                                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "space-y-2.5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                                                    className: "text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            className: "size-1.5 rounded-full bg-teal-500"
                                                        }),
                                                        cat,
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_7__/* .Badge */ .E, {
                                                            variant: "outline",
                                                            className: "text-[10px] py-0 px-1.5 border-slate-300 text-slate-600",
                                                            children: catSkills.length
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3",
                                                    children: catSkills.map((skill)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SkillCard, {
                                                            skill: skill,
                                                            onUse: useSkill
                                                        }, skill.id))
                                                })
                                            ]
                                        }, cat);
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_tabs__WEBPACK_IMPORTED_MODULE_9__/* .TabsContent */ .av, {
                            value: "models",
                            className: "mt-4",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .Card */ .Zp, {
                                className: "border-slate-200 shadow-sm overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardHeader */ .aR, {
                                        className: "border-b border-slate-100 bg-gradient-to-r from-slate-50 to-teal-50/30 py-3",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardTitle */ .ZB, {
                                                            className: "text-base flex items-center gap-2 text-slate-900",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                                                    className: "size-4 text-teal-600"
                                                                }),
                                                                "3D Anatomy Models"
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardDescription */ .BT, {
                                                            className: "text-xs mt-0.5 text-slate-600",
                                                            children: "Search Sketchfab for 3D models + reference images by topic — all inline, no app exit."
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_7__/* .Badge */ .E, {
                                                    variant: "outline",
                                                    className: "gap-1 border-slate-300 text-slate-700 bg-white hidden sm:flex",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                                            className: "size-3"
                                                        }),
                                                        "Sketchfab + ZAI"
                                                    ]
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardContent */ .Wu, {
                                        className: "p-0",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "bg-[#0c0e14] text-white rounded-b-lg",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AnatomyDiscover, {})
                                        })
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_tabs__WEBPACK_IMPORTED_MODULE_9__/* .TabsContent */ .av, {
                            value: "upload",
                            className: "mt-4",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .Card */ .Zp, {
                                className: "max-w-3xl mx-auto border-slate-200 shadow-sm",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardHeader */ .aR, {
                                        className: "border-b border-slate-100 bg-gradient-to-r from-slate-50 to-teal-50/30",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardTitle */ .ZB, {
                                                className: "text-base flex items-center gap-2 text-slate-900",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                                        className: "size-4 text-teal-600"
                                                    }),
                                                    "Upload a file to analyze"
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardDescription */ .BT, {
                                                className: "text-slate-600",
                                                children: "VLM, image-edit, and video-understand skills need a public image/video URL as input. Use the dedicated playground to upload a file, then run a skill on it."
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .CardContent */ .Wu, {
                                        className: "space-y-4 pt-4",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "grid grid-cols-1 md:grid-cols-3 gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UploadSkillCard, {
                                                        icon: _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A,
                                                        title: "VLM",
                                                        description: "Analyze an image — describe, identify, extract text.",
                                                        color: "from-sky-500 to-cyan-600"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UploadSkillCard, {
                                                        icon: _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A,
                                                        title: "Image Edit",
                                                        description: "Transform an image via a text prompt.",
                                                        color: "from-violet-500 to-purple-600"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UploadSkillCard, {
                                                        icon: _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A,
                                                        title: "Video Understanding",
                                                        description: "Summarize or analyze a short video clip.",
                                                        color: "from-emerald-500 to-teal-600"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_separator__WEBPACK_IMPORTED_MODULE_8__/* .Separator */ .w, {
                                                className: "bg-slate-200"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "text-center py-4",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                        href: "/skills-playground",
                                                        className: (0,_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .buttonVariants */ .r)({
                                                            size: 'lg',
                                                            className: 'gap-2 bg-gradient-to-br from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white shadow-md shadow-teal-500/20'
                                                        }),
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                                                className: "size-4"
                                                            }),
                                                            "Open Upload Playground",
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_35__/* ["default"] */ .A, {
                                                                className: "size-3 rotate-180"
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-xs text-slate-600 mt-2",
                                                        children: "Opens /skills-playground in the same tab — drag-drop upload, run skill, view result."
                                                    })
                                                ]
                                            })
                                        ]
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
// ─── Message Bubble ────────────────────────────────────────────────
function MessageBubble({ message }) {
    const isUser = message.role === 'user';
    const isRunning = message.status === 'running';
    const isFailed = message.status === 'failed';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: `flex ${isUser ? 'justify-end' : 'justify-start'}`,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: `max-w-[85%] ${isUser ? 'order-2' : ''}`,
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: `rounded-2xl px-4 py-3 text-sm leading-relaxed ${isUser ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-md shadow-teal-500/20 rounded-br-md' : isFailed ? 'bg-rose-50 border border-rose-200 text-rose-900 rounded-bl-md' : 'bg-white border border-slate-200 text-slate-800 shadow-sm rounded-bl-md'}`,
                    children: message.content ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: `whitespace-pre-wrap leading-relaxed prose prose-sm max-w-none ${isUser ? 'prose-invert prose-headings:text-white prose-strong:text-white prose-code:bg-white/20 prose-code:text-white prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-a:text-white prose-a:underline' : 'prose-slate prose-headings:font-semibold prose-headings:text-slate-900 prose-headings:mt-2 prose-headings:mb-1 prose-p:my-1 prose-ul:my-1 prose-li:my-0 prose-code:text-pink-700 prose-code:bg-pink-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-a:text-teal-700 prose-a:underline'}`,
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_markdown__WEBPACK_IMPORTED_MODULE_36__/* .Markdown */ .oz, {
                            children: message.content
                        })
                    }) : isRunning ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: `flex items-center gap-2 text-xs italic ${isUser ? 'text-white/80' : 'text-slate-600'}`,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                className: "size-3.5 animate-spin"
                            }),
                            message.progressText || 'Working…'
                        ]
                    }) : message.toolCalls && message.toolCalls.length > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "text-xs text-slate-600 italic",
                        children: "Calling tools…"
                    }) : null
                }),
                message.toolCalls && message.toolCalls.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "mt-2 space-y-1.5",
                    children: message.toolCalls.map((tc, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToolCallCard, {
                            toolCall: tc
                        }, i))
                }),
                message.jobId && !isUser && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "mt-1.5 flex items-center gap-2 text-[11px] text-slate-600 font-medium",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_37__/* ["default"] */ .A, {
                            className: "size-3"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("code", {
                            className: "font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-700",
                            children: [
                                message.jobId.slice(0, 24),
                                "…"
                            ]
                        }),
                        isRunning && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded",
                            children: "\xb7 polling"
                        }),
                        message.status === 'completed' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded",
                            children: "\xb7 done"
                        }),
                        isFailed && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded",
                            children: "\xb7 failed"
                        })
                    ]
                })
            ]
        })
    });
}
// ─── Tool Call Card ────────────────────────────────────────────────
function ToolCallCard({ toolCall }) {
    const skillId = toolCall.name.replace('skill_generate_', '').replace('skill_', '').replace('_', '-');
    const meta = SKILL_META[skillId];
    const Icon = meta?.icon || _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A;
    // artifactCard emits actions with type 'external' (link/view/download actions).
    // The old code looked for type 'link' — that was a typo, never matched, so
    // download buttons never rendered in the UI.
    const downloadAction = toolCall.result?.actions?.find((a)=>a.type === 'external' || a.type === 'link');
    // For image results, also surface a 'View image' action so we can render an inline preview.
    const viewAction = toolCall.result?.actions?.find((a)=>a.type === 'external' && a.id === 'view');
    const isImageResult = viewAction && /\.(png|jpg|jpeg|webp|gif)$/i.test(viewAction.target);
    const [copied, setCopied] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Pull multimodalContent (3D models, tables, etc.) from the result.
    // The route sends the full array so we can render inline visual blocks.
    const multimodalContent = toolCall.result?.multimodalContent;
    const hasRichContent = multimodalContent && multimodalContent.length > 0;
    const copyArgs = async ()=>{
        await navigator.clipboard.writeText(JSON.stringify(toolCall.args, null, 2));
        setCopied(true);
        setTimeout(()=>setCopied(false), 1500);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: `rounded-lg border bg-white p-2.5 text-xs shadow-sm ${meta?.ring ? `ring-1 ${meta.ring}` : 'border-slate-200'}`,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: `size-5 rounded bg-gradient-to-br ${meta?.color || 'from-slate-500 to-slate-600'} flex items-center justify-center text-white shrink-0`,
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
                            className: "size-3"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                        className: "font-mono text-[11px] font-semibold text-slate-800",
                        children: toolCall.name
                    }),
                    toolCall.iteration !== undefined && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_7__/* .Badge */ .E, {
                        variant: "outline",
                        className: "text-[9px] py-0 px-1 border-slate-300 text-slate-600",
                        children: [
                            "iter ",
                            toolCall.iteration + 1
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_7__/* .Badge */ .E, {
                        variant: toolCall.status === 'done' ? 'default' : toolCall.status === 'failed' ? 'destructive' : 'secondary',
                        className: `text-[10px] py-0 px-1.5 ml-auto font-medium ${toolCall.status === 'done' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 hover:bg-emerald-100' : toolCall.status === 'failed' ? 'bg-rose-100 text-rose-800 border border-rose-200 hover:bg-rose-100' : 'bg-amber-100 text-amber-800 border border-amber-200 hover:bg-amber-100'}`,
                        children: [
                            toolCall.status === 'running' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                className: "size-2.5 mr-1 animate-spin"
                            }),
                            toolCall.status
                        ]
                    })
                ]
            }),
            Object.keys(toolCall.args).length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mt-1.5 flex items-start gap-1.5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("pre", {
                        className: "flex-1 text-[10px] text-slate-700 font-mono bg-slate-50 border border-slate-200 rounded p-1.5 overflow-auto max-h-32 leading-relaxed",
                        children: [
                            JSON.stringify(toolCall.args, null, 2).slice(0, 500),
                            JSON.stringify(toolCall.args).length > 500 ? '\n…' : ''
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: copyArgs,
                        className: "text-slate-400 hover:text-teal-600 mt-1 p-1 rounded hover:bg-teal-50 transition-colors",
                        title: "Copy args",
                        children: copied ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_38__/* ["default"] */ .A, {
                            className: "size-3"
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                            className: "size-3"
                        })
                    })
                ]
            }),
            toolCall.result && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_separator__WEBPACK_IMPORTED_MODULE_8__/* .Separator */ .w, {
                        className: "my-2 bg-slate-200"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-slate-800 leading-relaxed",
                        children: toolCall.result.description
                    }),
                    toolCall.result.artifact && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "mt-1.5 space-y-0.5",
                        children: Object.entries(toolCall.result.artifact).slice(0, 5).map(([k, v])=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-slate-600 font-medium",
                                        children: [
                                            k,
                                            ":"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "font-mono text-[10px] text-slate-800",
                                        children: String(v).slice(0, 60)
                                    })
                                ]
                            }, k))
                    }),
                    hasRichContent && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "mt-2 rounded-lg overflow-hidden border border-slate-200 bg-[#0c0e14]",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_ai_agent_MultimodalRenderer__WEBPACK_IMPORTED_MODULE_10__/* .MultimodalRenderer */ .i, {
                            content: multimodalContent
                        })
                    }),
                    isImageResult && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                        href: viewAction.target,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "block mt-2",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                            src: viewAction.target,
                            alt: toolCall.result.description || 'Generated image',
                            className: "rounded-md border border-slate-200 max-w-full max-h-64 object-contain bg-white"
                        })
                    }),
                    downloadAction && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                        href: downloadAction.target,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "mt-2 inline-flex items-center gap-1.5 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-2 py-1 rounded transition-colors",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_40__/* ["default"] */ .A, {
                                className: "size-3"
                            }),
                            downloadAction.label,
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_41__/* ["default"] */ .A, {
                                className: "size-2.5"
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
// ─── Skill Card (Skills tab) ───────────────────────────────────────
function SkillCard({ skill, onUse }) {
    const meta = SKILL_META[skill.id];
    const Icon = meta?.icon || _barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A;
    const prompt = meta?.samplePrompt || `Use the ${skill.name} skill`;
    const isUploadSkill = prompt.startsWith('(Use the Upload tab');
    const isModelsSkill = skill.id === '3d-models';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__/* .Card */ .Zp, {
        className: `p-3 hover:shadow-md transition-all flex flex-col border-slate-200 bg-white ${meta ? `hover:${meta.ring}` : ''}`,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-start gap-2.5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: `size-10 rounded-lg bg-gradient-to-br ${meta?.color || 'from-slate-500 to-slate-600'} flex items-center justify-center text-white shrink-0 shadow-sm`,
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
                            className: "size-5"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "min-w-0 flex-1",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-sm font-bold leading-tight text-slate-900",
                                children: skill.name
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px] text-slate-500 mt-0.5 font-mono",
                                children: skill.id
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-xs text-slate-700 mt-2 line-clamp-3 flex-1 leading-relaxed",
                children: skill.description
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-1 mt-2 flex-wrap",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_7__/* .Badge */ .E, {
                        variant: "outline",
                        className: "text-[10px] py-0 px-1.5 border-slate-300 text-slate-700 bg-slate-50",
                        children: skill.outputKind
                    }),
                    skill.extensions?.map((ext)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_7__/* .Badge */ .E, {
                            variant: "outline",
                            className: "text-[10px] py-0 px-1.5 uppercase border-slate-300 text-slate-700 bg-slate-50",
                            children: [
                                ".",
                                ext
                            ]
                        }, ext)),
                    skill.estimatedRuntimeSeconds && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_7__/* .Badge */ .E, {
                        variant: "outline",
                        className: "text-[10px] py-0 px-1.5 border-slate-300 text-slate-700 bg-slate-50",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_37__/* ["default"] */ .A, {
                                className: "size-2.5 mr-0.5"
                            }),
                            "~",
                            skill.estimatedRuntimeSeconds,
                            "s"
                        ]
                    }),
                    skill.requiresCredentials && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_7__/* .Badge */ .E, {
                        variant: "outline",
                        className: "text-[10px] py-0 px-1.5 text-amber-800 border-amber-300 bg-amber-50",
                        children: "key"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .$, {
                size: "sm",
                variant: isModelsSkill ? 'default' : 'outline',
                className: `mt-2.5 w-full text-xs gap-1.5 ${isModelsSkill ? 'bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white hover:from-violet-600 hover:to-fuchsia-700' : 'border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900'}`,
                disabled: isUploadSkill,
                onClick: ()=>onUse(skill.id),
                children: isUploadSkill ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                            className: "size-3"
                        }),
                        "See Upload tab"
                    ]
                }) : isModelsSkill ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                            className: "size-3"
                        }),
                        "Open 3D Models"
                    ]
                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowLeft_BarChart3_BookOpen_Box_CalendarClock_Check_Clock_Copy_Download_ExternalLink_Eye_FileEdit_FileText_Globe_Headphones_Image_ImagePlay_Lightbulb_Loader2_Mic_Presentation_Search_Send_Sparkles_Stethoscope_Table2_Upload_Video_Volume2_Wrench_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                            className: "size-3"
                        }),
                        "Use this skill"
                    ]
                })
            })
        ]
    });
}
// ─── Upload Skill Card (Upload tab) ────────────────────────────────
function UploadSkillCard({ icon: Icon, title, description, color }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "rounded-lg border border-slate-200 bg-white p-3.5 shadow-sm hover:shadow-md transition-shadow",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex items-start gap-2.5",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: `size-9 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white shrink-0 shadow-sm`,
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
                        className: "size-4.5"
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "min-w-0 flex-1",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-sm font-bold text-slate-900",
                            children: title
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-xs text-slate-700 mt-0.5 leading-relaxed",
                            children: description
                        })
                    ]
                })
            ]
        })
    });
}


/***/ }),

/***/ 81477:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BT: () => (/* binding */ CardDescription),
/* harmony export */   Wu: () => (/* binding */ CardContent),
/* harmony export */   ZB: () => (/* binding */ CardTitle),
/* harmony export */   Zp: () => (/* binding */ Card),
/* harmony export */   aR: () => (/* binding */ CardHeader)
/* harmony export */ });
/* unused harmony exports CardFooter, CardAction */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var cn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52968);



function Card({ className, size = "default", ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        "data-slot": "card",
        "data-size": size,
        className: (0,cn__WEBPACK_IMPORTED_MODULE_2__.cn)("group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl", className),
        ...props
    });
}
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        "data-slot": "card-header",
        className: (0,cn__WEBPACK_IMPORTED_MODULE_2__.cn)("group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)", className),
        ...props
    });
}
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        "data-slot": "card-title",
        className: (0,cn__WEBPACK_IMPORTED_MODULE_2__.cn)("text-base leading-snug font-medium group-data-[size=sm]/card:text-sm", className),
        ...props
    });
}
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        "data-slot": "card-description",
        className: (0,cn__WEBPACK_IMPORTED_MODULE_2__.cn)("text-sm text-muted-foreground", className),
        ...props
    });
}
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ _jsx("div", {
        "data-slot": "card-action",
        className: cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    });
}
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        "data-slot": "card-content",
        className: (0,cn__WEBPACK_IMPORTED_MODULE_2__.cn)("px-(--card-spacing)", className),
        ...props
    });
}
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ _jsx("div", {
        "data-slot": "card-footer",
        className: cn("flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)", className),
        ...props
    });
}



/***/ }),

/***/ 89239:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ Button),
/* harmony export */   r: () => (/* binding */ buttonVariants)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _base_ui_react_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(35684);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18460);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40980);




const buttonVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_1__/* .cva */ .F)("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/80",
            outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
            ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
            destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
            sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
            lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            icon: "size-8",
            "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
            "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
            "icon-lg": "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant = "default", size = "default", ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$, {
        "data-slot": "button",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    });
}



/***/ }),

/***/ 97916:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ Separator)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var _base_ui_react_separator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30030);
/* harmony import */ var cn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52968);
/* __next_internal_client_entry_do_not_use__ Separator auto */ 


function Separator({ className, orientation = "horizontal", ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_separator__WEBPACK_IMPORTED_MODULE_1__/* .Separator */ .w, {
        "data-slot": "separator",
        orientation: orientation,
        className: (0,cn__WEBPACK_IMPORTED_MODULE_2__.cn)("shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch", className),
        ...props
    });
}



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [18409,68298,27173,33697,31573,52968,2040,57083,97432,92703,10962,28441,93794,77358], () => (__webpack_exec__(59820)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);