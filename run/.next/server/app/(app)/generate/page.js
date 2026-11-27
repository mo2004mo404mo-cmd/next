(() => {
var exports = {};
exports.id = 6203;
exports.ids = [6203];
exports.modules = {

/***/ 33392:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Unplug)
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
    name: "unplug",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m19 5 3-3",
                key: "yk6iyv"
            }
        ],
        [
            "path",
            {
                d: "m2 22 3-3",
                key: "19mgm9"
            }
        ],
        [
            "path",
            {
                d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z",
                key: "goz73y"
            }
        ],
        [
            "path",
            {
                d: "M7.5 13.5 10 11",
                key: "7xgeeb"
            }
        ],
        [
            "path",
            {
                d: "M10.5 16.5 13 14",
                key: "10btkg"
            }
        ],
        [
            "path",
            {
                d: "m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z",
                key: "1snsnr"
            }
        ]
    ]
};
__iconData.node;
const Unplug = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=unplug.mjs.map


/***/ }),

/***/ 55591:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 74075:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ 77334:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GenerateLoading)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(305735);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

// Loading state for /generate — mirrors the two-column workbench layout
// (config rail on the left, output workspace on the right on lg+) so the
// page doesn't flash a different structure while the route segment loads.
function GenerateLoading() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "animate-pulse lg:grid lg:grid-cols-[minmax(340px,430px)_minmax(0,1fr)] xl:grid-cols-[minmax(380px,470px)_minmax(0,1fr)] lg:gap-6 items-start",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "bg-[#151821] border border-white/[0.06] rounded-2xl p-6 mb-8 lg:mb-0 space-y-6",
                children: [
                    [
                        0,
                        1,
                        2
                    ].map((group)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-2.5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "h-2.5 w-28 rounded bg-white/[0.06]"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "h-9 w-24 rounded-xl bg-white/[0.04]"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "h-9 w-24 rounded-xl bg-white/[0.04]"
                                        })
                                    ]
                                })
                            ]
                        }, group)),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "space-y-2.5",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "h-2.5 w-28 rounded bg-white/[0.06]"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "h-11 w-full rounded-xl bg-white/[0.04]"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "h-14 w-full rounded-xl bg-[#00e5a0]/[0.08]"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "rounded-2xl border border-dashed border-white/[0.09] bg-white/[0.015] lg:min-h-[540px] flex flex-col items-center justify-center gap-4 py-14",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "w-14 h-14 rounded-2xl bg-white/[0.05]"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "h-3 w-56 max-w-full rounded bg-white/[0.05]"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "h-2.5 w-72 max-w-full rounded bg-white/[0.03]"
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 78335:
/***/ (() => {



/***/ }),

/***/ 84990:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GenerateLayout),
/* harmony export */   metadata: () => (/* binding */ metadata)
/* harmony export */ });
/**
 * Per-route metadata for /generate (client pages cannot export metadata, so
 * a tiny server layout provides it — previously every route shared the root
 * "MedQ — Medical Question Generator" title).
 */ const metadata = {
    title: 'Generate Questions — MedQ',
    description: 'Generate exam-ready medical questions with AI — by topic, from files, or grounded in your knowledge library.'
};
function GenerateLayout({ children }) {
    return children;
}


/***/ }),

/***/ 108128:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/runtime-reacts.external.js");

/***/ }),

/***/ 132602:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Library)
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
    name: "library",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m16 6 4 14",
                key: "ji33uf"
            }
        ],
        [
            "path",
            {
                d: "M12 6v14",
                key: "1n7gus"
            }
        ],
        [
            "path",
            {
                d: "M8 8v12",
                key: "1gg7y9"
            }
        ],
        [
            "path",
            {
                d: "M4 4v16",
                key: "6qkkli"
            }
        ]
    ]
};
__iconData.node;
const Library = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=library.mjs.map


/***/ }),

/***/ 134631:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 148874:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FU: () => (/* binding */ MEDICAL_SYSTEMS),
/* harmony export */   Fc: () => (/* binding */ DIFFICULTY_COLORS),
/* harmony export */   L7: () => (/* binding */ TOPIC_MAP),
/* harmony export */   My: () => (/* binding */ DIFFICULTY_LABELS),
/* harmony export */   Yg: () => (/* binding */ DIFFICULTY_LEVELS),
/* harmony export */   bU: () => (/* binding */ QUESTION_TYPES),
/* harmony export */   hy: () => (/* binding */ normalizeDifficulty),
/* harmony export */   rX: () => (/* binding */ DIFFICULTY_OPTIONS)
/* harmony export */ });
/* unused harmony exports DIFFICULTY_BG_COLORS, getDifficultyLevel */
const MEDICAL_SYSTEMS = [
    'OBG',
    'Cardiovascular',
    'Respiratory',
    'Neurological',
    'Gastrointestinal',
    'Renal',
    'Endocrine',
    'Hematologic',
    'Musculoskeletal',
    'Integumentary',
    'Reproductive',
    'Immunologic',
    'Pharmacology',
    'Pathology',
    'Microbiology',
    'Biochemistry'
];
const TOPIC_MAP = {
    OBG: [
        'Operative Vaginal Delivery',
        'Malpresentation Malpositions Breech',
        'Abnormal Labour Patterns',
        'Multiple Multifetal Pregnancy',
        'Postpartum Hemorrhage PPH',
        'PROM Preterm Labour',
        'SGA Fetal Growth Restriction',
        'Rh Iso-immunization',
        'Cesarean Delivery',
        'Amenorrhea',
        'Hyperprolactinemia Hirsutism PCOS',
        'Puberty Menopause',
        'Physiology of Menstruation',
        'Anatomy Embryology'
    ],
    Cardiovascular: [
        'Hypertension',
        'Heart Failure',
        'Arrhythmias',
        'Coronary Artery Disease',
        'Valvular Heart Disease',
        'Myocarditis',
        'Aortic Dissection',
        'Endocarditis'
    ],
    Respiratory: [
        'COPD',
        'Asthma',
        'Pneumonia',
        'Pulmonary Embolism',
        'Interstitial Lung Disease',
        'ARDS',
        'Lung Cancer',
        'Pleural Effusion'
    ],
    Neurological: [
        'Stroke',
        'Epilepsy',
        'Parkinson Disease',
        'Multiple Sclerosis',
        'Meningitis',
        'Myasthenia Gravis',
        'Alzheimer Disease',
        'Guillain-Barre'
    ],
    Gastrointestinal: [
        'Peptic Ulcer Disease',
        'Inflammatory Bowel Disease',
        'Pancreatitis',
        'Cirrhosis',
        'Hepatitis',
        'Celiac Disease',
        'GI Bleeding',
        'Appendicitis'
    ],
    Renal: [
        'Acute Kidney Injury',
        'Chronic Kidney Disease',
        'Nephrotic Syndrome',
        'Glomerulonephritis',
        'Renal Stones',
        'UTI',
        'Polycystic Kidney Disease'
    ],
    Endocrine: [
        'Diabetes Mellitus',
        'Thyroid Disorders',
        'Cushing Syndrome',
        'Addison Disease',
        'Pheochromocytoma',
        'Hyperparathyroidism',
        'SIADH',
        'Diabetes Insipidus'
    ],
    Hematologic: [
        'Anemia',
        'Leukemia',
        'Lymphoma',
        'Coagulation Disorders',
        'Sickle Cell Disease',
        'Thrombocytopenia',
        'Hemophilia',
        'DIC'
    ],
    Musculoskeletal: [
        'Rheumatoid Arthritis',
        'Osteoarthritis',
        'Osteoporosis',
        'Gout',
        'Lyme Disease',
        'Osteomyelitis',
        'Fractures',
        'Lupus'
    ],
    Integumentary: [
        'Melanoma',
        'Psoriasis',
        'Eczema',
        'Burns',
        'Cellulitis',
        'Contact Dermatitis',
        'Acne Vulgaris',
        'Basal Cell Carcinoma'
    ],
    Reproductive: [
        'Ectopic Pregnancy',
        'PCOS',
        'Endometriosis',
        'Preeclampsia',
        'Prostate Cancer',
        'Cervical Cancer',
        'Infertility',
        'Menorrhagia'
    ],
    Immunologic: [
        'HIV/AIDS',
        'Autoimmune Diseases',
        'Transplant Rejection',
        'Primary Immunodeficiency',
        'Anaphylaxis',
        'SLE',
        'Sarcoidosis',
        'Vasculitis'
    ],
    Pharmacology: [
        'ACE Inhibitors',
        'Beta Blockers',
        'Statins',
        'Antibiotics',
        'Anticoagulants',
        'NSAIDs',
        'Opioids',
        'Antidepressants'
    ],
    Pathology: [
        'Neoplasia',
        'Inflammation',
        'Infarction',
        'Apoptosis',
        'Necrosis',
        'Amyloidosis',
        'Hemochromatosis',
        'Atherosclerosis'
    ],
    Microbiology: [
        'Staphylococcus',
        'Streptococcus',
        'E. coli',
        'TB',
        'Malaria',
        'HIV',
        'Hepatitis Viruses',
        'Fungal Infections'
    ],
    Biochemistry: [
        'Glycolysis',
        'TCA Cycle',
        'Urea Cycle',
        'Lipid Metabolism',
        'Porphyrias',
        'Glycogen Storage Diseases',
        'Electron Transport Chain'
    ]
};
const DIFFICULTY_OPTIONS = [
    'Easy',
    'Basic',
    'Moderate',
    'Hard',
    'Expert'
];
const DIFFICULTY_LEVELS = {
    'Easy': 1,
    'Basic': 2,
    'Moderate': 3,
    'Hard': 4,
    'Expert': 5
};
const DIFFICULTY_LABELS = {
    1: 'Easy',
    2: 'Basic',
    3: 'Moderate',
    4: 'Hard',
    5: 'Expert'
};
const DIFFICULTY_COLORS = {
    1: '#22c55e',
    2: '#4ade80',
    3: '#f59e0b',
    4: '#f97316',
    5: '#ef4444'
};
const DIFFICULTY_BG_COLORS = {
    1: 'rgba(34,197,94,0.10)',
    2: 'rgba(74,222,128,0.10)',
    3: 'rgba(245,158,11,0.10)',
    4: 'rgba(249,115,22,0.10)',
    5: 'rgba(239,68,68,0.10)'
};
/** Map legacy difficulty values to new 5-level system */ function normalizeDifficulty(difficulty) {
    if (difficulty === 'Medium') return 'Moderate';
    const valid = new Set([
        'Easy',
        'Basic',
        'Moderate',
        'Hard',
        'Expert'
    ]);
    return valid.has(difficulty) ? difficulty : 'Moderate';
}
/** Get numeric level from difficulty label */ function getDifficultyLevel(difficulty) {
    return DIFFICULTY_LEVELS[normalizeDifficulty(difficulty)] ?? 3;
}
const QUESTION_TYPES = [
    'mcq',
    'tf',
    'short'
];


/***/ }),

/***/ 158886:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ ResumableUploadProgress)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Loader2_Pause_Play_RefreshCw_RotateCw_X_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(199646);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Loader2_Pause_Play_RefreshCw_RotateCw_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(334460);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Loader2_Pause_Play_RefreshCw_RotateCw_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(645535);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Loader2_Pause_Play_RefreshCw_RotateCw_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(673097);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Loader2_Pause_Play_RefreshCw_RotateCw_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(27993);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Loader2_Pause_Play_RefreshCw_RotateCw_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(269357);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Loader2_Pause_Play_RefreshCw_RotateCw_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(954171);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_Loader2_Pause_Play_RefreshCw_RotateCw_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(131223);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(114490);
/* harmony import */ var _lib_uploads_upload_progress_state__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(290505);
/**
 * ResumableUploadProgress.tsx — UX for the resumable chunked upload path
 * (Stage 13 UX layer).
 *
 * Renders the state produced by useResumableUpload() / the pure state
 * machine in upload-progress-state.ts. Shows:
 *   ● a smooth progress bar (0..100%) with %
 *   ● the human-facing phase message
 *   ● speed + ETA (when the engine has enough samples)
 *   ● a "resumed from X%" badge when the server already had bytes
 *   ● a retrying indicator (chunk N, attempt M) when a chunk is retrying
 *   ● Pause / Resume / Cancel buttons (visibility via deriveControls)
 *   ● a Retry hint when the upload ended in failure (re-pick the file)
 *
 * The component is a PRESENTATIONAL layer: it calls back into the hook for
 * pause/resume/cancel; it never touches the upload engine directly.
 */ /* __next_internal_client_entry_do_not_use__ ResumableUploadProgress auto */ 




function PhaseIcon({ phase }) {
    if (phase === 'done') return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Loader2_Pause_Play_RefreshCw_RotateCw_X_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
        className: "w-4 h-4 text-emerald-400"
    });
    if (phase === 'error') return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Loader2_Pause_Play_RefreshCw_RotateCw_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
        className: "w-4 h-4 text-amber-400"
    });
    if (phase === 'cancelled') return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Loader2_Pause_Play_RefreshCw_RotateCw_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
        className: "w-4 h-4 text-zinc-400"
    });
    if (phase === 'paused') return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Loader2_Pause_Play_RefreshCw_RotateCw_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
        className: "w-4 h-4 text-[#4fc3f7]"
    });
    if (phase === 'retrying') return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Loader2_Pause_Play_RefreshCw_RotateCw_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
        className: "w-4 h-4 text-[#4fc3f7] animate-spin"
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Loader2_Pause_Play_RefreshCw_RotateCw_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
        className: "w-4 h-4 text-[#4fc3f7] animate-spin"
    });
}
function ResumableUploadProgressImpl({ state, onPause, onResume, onCancel, onRetry, className }) {
    const controls = (0,_lib_uploads_upload_progress_state__WEBPACK_IMPORTED_MODULE_8__/* .deriveControls */ .kv)(state);
    const isError = state.phase === 'error';
    const isDone = state.phase === 'done';
    const isCancelled = state.phase === 'cancelled';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_9__.cn)('w-full max-w-md mx-auto space-y-3', className),
        role: "status",
        "aria-live": "polite",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2 justify-center",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PhaseIcon, {
                        phase: state.phase
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-sm text-[#e8ecf4] font-medium text-center",
                        children: state.message
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "w-full bg-white/[0.06] rounded-full h-2 overflow-hidden",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_9__.cn)('h-2 rounded-full transition-all duration-300', isError ? 'bg-amber-400' : isCancelled ? 'bg-zinc-500' : isDone ? 'bg-emerald-400' : 'bg-[#4fc3f7]'),
                    style: {
                        width: `${Math.max(0, Math.min(100, state.progress))}%`
                    }
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-center gap-3 text-[10px] text-[#5a6478]",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        children: [
                            state.progress,
                            "%"
                        ]
                    }),
                    controls.showStats && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                children: "\xb7"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                children: (0,_lib_uploads_upload_progress_state__WEBPACK_IMPORTED_MODULE_8__/* .formatSpeed */ .DB)(state.bytesPerSecond)
                            }),
                            state.etaSeconds !== null && state.etaSeconds > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        children: "\xb7"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            (0,_lib_uploads_upload_progress_state__WEBPACK_IMPORTED_MODULE_8__/* .formatEta */ .gc)(state.etaSeconds),
                                            " left"
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    state.totalBytes > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                children: "\xb7"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    (0,_lib_uploads_upload_progress_state__WEBPACK_IMPORTED_MODULE_8__/* .formatBytes */ .z3)(state.uploadedBytes),
                                    " / ",
                                    (0,_lib_uploads_upload_progress_state__WEBPACK_IMPORTED_MODULE_8__/* .formatBytes */ .z3)(state.totalBytes)
                                ]
                            })
                        ]
                    }),
                    controls.showResumedBadge && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                children: "\xb7"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-emerald-400/80",
                                children: [
                                    "resumed from ",
                                    Math.round(state.resumedBytes / Math.max(1, state.totalBytes) * 100),
                                    "%"
                                ]
                            })
                        ]
                    })
                ]
            }),
            controls.showRetryingIndicator && state.phase !== 'done' && state.phase !== 'error' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-center gap-1.5 text-[10px] text-[#4fc3f7]/80",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Loader2_Pause_Play_RefreshCw_RotateCw_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                        className: "w-3 h-3 animate-spin"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        children: "Retrying — your progress is saved on the server"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-center gap-2",
                children: [
                    controls.canPause && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: onPause,
                        className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.06] hover:bg-white/[0.1] text-xs text-[#e8ecf4] transition-colors",
                        "aria-label": "Pause upload",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Loader2_Pause_Play_RefreshCw_RotateCw_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            " Pause"
                        ]
                    }),
                    controls.canResume && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: onResume,
                        className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#4fc3f7]/20 hover:bg-[#4fc3f7]/30 text-xs text-[#4fc3f7] transition-colors",
                        "aria-label": "Resume upload",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Loader2_Pause_Play_RefreshCw_RotateCw_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            " Resume"
                        ]
                    }),
                    controls.canCancel && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: onCancel,
                        className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-xs text-[#5a6478] hover:text-[#e8ecf4] transition-colors",
                        "aria-label": "Cancel upload",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Loader2_Pause_Play_RefreshCw_RotateCw_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            " Cancel"
                        ]
                    }),
                    controls.canRetry && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: onRetry,
                        className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#4fc3f7]/20 hover:bg-[#4fc3f7]/30 text-xs text-[#4fc3f7] transition-colors",
                        "aria-label": "Retry upload from where it stopped",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_Loader2_Pause_Play_RefreshCw_RotateCw_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            " Retry from where it stopped"
                        ]
                    })
                ]
            }),
            isError && state.error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-[10px] text-amber-400/70 text-center break-words max-w-sm mx-auto",
                children: state.error
            })
        ]
    });
}
const ResumableUploadProgress = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(ResumableUploadProgressImpl);


/***/ }),

/***/ 173566:
/***/ ((module) => {

"use strict";
module.exports = require("worker_threads");

/***/ }),

/***/ 185448:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ChevronUp)
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
    name: "chevron-up",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m18 15-6-6-6 6",
                key: "153udz"
            }
        ]
    ]
};
__iconData.node;
const ChevronUp = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=chevron-up.mjs.map


/***/ }),

/***/ 228970:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Sprout)
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
    name: "sprout",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3",
                key: "139s4v"
            }
        ],
        [
            "path",
            {
                d: "M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4",
                key: "1dlkgp"
            }
        ],
        [
            "path",
            {
                d: "M5 21h14",
                key: "11awu3"
            }
        ]
    ]
};
__iconData.node;
const Sprout = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=sprout.mjs.map


/***/ }),

/***/ 230222:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Anchor)
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
    name: "anchor",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 6v16",
                key: "nqf5sj"
            }
        ],
        [
            "path",
            {
                d: "m19 13 2-1a9 9 0 0 1-18 0l2 1",
                key: "y7qv08"
            }
        ],
        [
            "path",
            {
                d: "M9 11h6",
                key: "1fldmi"
            }
        ],
        [
            "circle",
            {
                cx: "12",
                cy: "4",
                r: "2",
                key: "muu5ef"
            }
        ]
    ]
};
__iconData.node;
const Anchor = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=anchor.mjs.map


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

/***/ 290505:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $8: () => (/* binding */ onExtracting),
/* harmony export */   Bf: () => (/* binding */ onCancelled),
/* harmony export */   DB: () => (/* binding */ formatSpeed),
/* harmony export */   ER: () => (/* binding */ onDone),
/* harmony export */   Jb: () => (/* binding */ onProgress),
/* harmony export */   S5: () => (/* binding */ onError),
/* harmony export */   Ws: () => (/* binding */ initState),
/* harmony export */   gc: () => (/* binding */ formatEta),
/* harmony export */   kv: () => (/* binding */ deriveControls),
/* harmony export */   lM: () => (/* binding */ onResumed),
/* harmony export */   o0: () => (/* binding */ onPaused),
/* harmony export */   oY: () => (/* binding */ onRetrying),
/* harmony export */   xF: () => (/* binding */ onAssembling),
/* harmony export */   z3: () => (/* binding */ formatBytes)
/* harmony export */ });
/* unused harmony exports UPLOAD_FRACTION_OF_OVERALL, PREPARING_PROGRESS, ASSEMBLING_PROGRESS */
/**
 * upload-progress-state.ts — PURE state machine for the resumable upload UX
 * (Stage 13 UX layer).
 *
 * The chunked-upload engine (`chunked-upload-client.ts`) already exposes
 * `ResumableUploadProgress` callbacks, but they are a raw stream of
 * snapshots — not a UI-friendly state. This module derives the
 * human-facing phase, labels, and button-visibility rules from that stream
 * with PURE functions (no React, no side-effects) so the UX logic is
 * unit-testable in node.
 *
 * The React hook (`use-resumable-upload.ts`) wires these transitions to
 * `useState`; the component (`ResumableUploadProgress.tsx`) renders the
 * resulting state. Both are thin layers over THIS module.
 */ // ▬▬ phases ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
// ▬▬ constants (mirrors file-extract.ts upload/parse split) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
/** Upload phase fills 0..60% of the overall bar; server parse fills 60..100%. */ const UPLOAD_FRACTION_OF_OVERALL = 0.6;
const PREPARING_PROGRESS = 5;
const ASSEMBLING_PROGRESS = 65;
// ▬▬ pure transitions ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
function initState(totalBytes) {
    return {
        phase: 'preparing',
        progress: PREPARING_PROGRESS,
        uploadedBytes: 0,
        totalBytes: Math.max(0, totalBytes),
        bytesPerSecond: 0,
        etaSeconds: null,
        resumedBytes: 0,
        attempt: 1,
        message: 'Preparing upload…'
    };
}
function onProgress(prev, p) {
    // Map the engine's 0..1 upload fraction onto the 0..60% overall slice.
    const uploadPct = Math.max(0, Math.min(1, p.fraction)) * 100 * UPLOAD_FRACTION_OF_OVERALL;
    const progress = Math.max(PREPARING_PROGRESS, Math.round(uploadPct));
    const resumed = p.resumedBytes > 0 && p.uploadedBytes <= p.resumedBytes;
    return {
        ...prev,
        phase: resumed ? 'uploading' : p.attempt > 1 ? 'retrying' : 'uploading',
        progress,
        uploadedBytes: p.uploadedBytes,
        totalBytes: p.totalBytes,
        bytesPerSecond: p.bytesPerSecond,
        etaSeconds: p.etaSeconds,
        resumedBytes: p.resumedBytes,
        attempt: p.attempt,
        message: resumed ? `Resuming upload… (${Math.round(p.resumedBytes / Math.max(1, p.totalBytes) * 100)}% already on server)` : p.attempt > 1 ? `Uploading… (retry attempt ${p.attempt})` : `Uploading… ${Math.round(p.fraction * 100)}%`,
        error: undefined
    };
}
function onRetrying(prev, info) {
    return {
        ...prev,
        phase: 'retrying',
        attempt: info.attempt,
        message: `Connection hiccup on chunk ${info.chunkIndex + 1} — retrying (attempt ${info.attempt})…`
    };
}
function onPaused(prev) {
    if (prev.phase === 'done' || prev.phase === 'error' || prev.phase === 'cancelled') return prev;
    return {
        ...prev,
        phase: 'paused',
        message: `Paused — ${Math.round(prev.uploadedBytes / Math.max(1, prev.totalBytes) * 100)}% safely on the server. Click resume to continue.`
    };
}
function onResumed(prev) {
    if (prev.phase !== 'paused') return prev;
    return {
        ...prev,
        phase: 'uploading',
        message: `Resuming from ${Math.round(prev.uploadedBytes / Math.max(1, prev.totalBytes) * 100)}%…`
    };
}
function onAssembling(prev) {
    return {
        ...prev,
        phase: 'assembling',
        progress: ASSEMBLING_PROGRESS,
        message: 'Finalizing upload on the server…'
    };
}
function onExtracting(prev, pct) {
    return {
        ...prev,
        phase: 'uploading',
        progress: Math.max(ASSEMBLING_PROGRESS, Math.min(99, pct)),
        message: 'Extracting content on the server…'
    };
}
function onDone(prev) {
    return {
        ...prev,
        phase: 'done',
        progress: 100,
        uploadedBytes: prev.totalBytes,
        message: 'Upload complete',
        error: undefined
    };
}
function onError(prev, message) {
    return {
        ...prev,
        phase: 'error',
        message: 'Upload failed — you can retry from where it stopped.',
        error: message
    };
}
function onCancelled(prev) {
    return {
        ...prev,
        phase: 'cancelled',
        message: 'Upload cancelled — your progress is saved. Re-pick the file to resume.'
    };
}
function deriveControls(state) {
    const active = state.phase === 'uploading' || state.phase === 'retrying';
    return {
        canPause: active,
        canResume: state.phase === 'paused',
        canCancel: active || state.phase === 'paused',
        canRetry: state.phase === 'error',
        showStats: active && state.bytesPerSecond > 0,
        showResumedBadge: state.resumedBytes > 0 && state.uploadedBytes > state.resumedBytes,
        showRetryingIndicator: state.phase === 'retrying' || state.attempt > 1
    };
}
// ▬▬ formatters (kept here so tests cover the exact user-facing strings) ▬▬▬▬▬▬
function formatSpeed(bytesPerSecond) {
    if (!Number.isFinite(bytesPerSecond) || bytesPerSecond <= 0) return '—';
    if (bytesPerSecond < 1024) return `${Math.round(bytesPerSecond)} B/s`;
    if (bytesPerSecond < 1024 * 1024) return `${(bytesPerSecond / 1024).toFixed(0)} KB/s`;
    return `${(bytesPerSecond / 1024 / 1024).toFixed(1)} MB/s`;
}
function formatEta(seconds) {
    if (seconds === null || seconds === undefined || !Number.isFinite(seconds) || seconds < 0) return '';
    const s = Math.ceil(seconds);
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    const r = s % 60;
    if (m < 60) return `${m}m ${String(r).padStart(2, '0')}s`;
    const h = Math.floor(m / 60);
    return `${h}h ${String(m % 60).padStart(2, '0')}m`;
}
function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes < 0) return '0 B';
    if (bytes < 1024) return `${Math.round(bytes)} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
    return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}


/***/ }),

/***/ 292330:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ FileTypeCorner)
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
    name: "file-type-corner",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 22h6a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6",
                key: "15usau"
            }
        ],
        [
            "path",
            {
                d: "M14 2v5a1 1 0 0 0 1 1h5",
                key: "wfsgrz"
            }
        ],
        [
            "path",
            {
                d: "M3 16v-1.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V16",
                key: "s1gz5"
            }
        ],
        [
            "path",
            {
                d: "M6 22h2",
                key: "194x9m"
            }
        ],
        [
            "path",
            {
                d: "M7 14v8",
                key: "11ixej"
            }
        ]
    ],
    aliases: [
        "file-type-2"
    ]
};
__iconData.node;
const FileTypeCorner = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=file-type-corner.mjs.map


/***/ }),

/***/ 296487:
/***/ (() => {



/***/ }),

/***/ 297219:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ModalDefault)
/* harmony export */ });
/**
 * @modal parallel route default.
 *
 * Rendered when no modal route is active (the common case). Must return
 * null so the slot contributes nothing to the layout tree.
 *
 * When an intercepted route IS active — e.g. the user clicked a question in
 * /bank and was soft-navigated to /bank/[id] — Next.js renders
 * (app)/@modal/(.)bank/[id]/page.tsx into this slot instead, showing the
 * question detail as a modal over the still-mounted bank list. Pressing
 * Back (or closing the modal) soft-navigates back to /bank, the slot
 * re-renders to this default, and the modal disappears — with the list's
 * state (filters, scroll, pagination) preserved because it never unmounted.
 */ function ModalDefault() {
    return null;
}


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

/***/ 333873:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 362007:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GenerateTab)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_medq_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(148874);
/* harmony import */ var _lib_offline_ai_engine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(731554);
/* harmony import */ var _components_medq_QuestionCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(910576);
/* harmony import */ var _lib_download_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(245019);
/* harmony import */ var _components_medq_KnowledgeLibraryPanel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(481649);
/* harmony import */ var _lib_file_extract__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(716449);
/* harmony import */ var _lib_uploads_use_resumable_upload__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(852740);
/* harmony import */ var _lib_generate_prefill__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(559853);
/* harmony import */ var _components_medq_ResumableUploadProgress__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(158886);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(890707);
/* harmony import */ var _hooks_use_job_socket__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(972067);
/* harmony import */ var _lib_browser_ai__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(684350);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(118201);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(415509);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(159361);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(228970);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(144730);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(705824);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(435364);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(464571);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(645535);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(334460);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(199646);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(269357);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(640245);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(239041);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(967254);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(126773);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(436274);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(883292);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(124735);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(488580);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(132602);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(405430);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(292330);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(8251);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(880592);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(369702);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(709728);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(915741);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(347352);
/* __next_internal_client_entry_do_not_use__ default auto */ 














const TYPE_ICONS = {
    mcq: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
        className: "w-3.5 h-3.5"
    }),
    tf: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
        className: "w-3.5 h-3.5"
    }),
    short: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
        className: "w-3.5 h-3.5"
    })
};
const TYPE_LABELS = {
    mcq: 'MCQ',
    tf: 'True/False',
    short: 'Short Answer'
};
const DIFF_ICONS = {
    Easy: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
        className: "w-3.5 h-3.5"
    }),
    Medium: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
        className: "w-3.5 h-3.5"
    }),
    Hard: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
        className: "w-3.5 h-3.5"
    })
};
function GenerateTab({ onQuestionsGenerated }) {
    // Starts EMPTY — the demo-leftover hardcoded 'ACE inhibitors' default
    // prefilled every fresh visit and leaked into generations when the user
    // forgot to change it. The placeholder guides the input instead.
    const [topic, setTopic] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [system, setSystem] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [activeTypes, setActiveTypes] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([
        'mcq'
    ]);
    const [activeDiffs, setActiveDiffs] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([
        'Medium'
    ]);
    const [count, setCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(2);
    const [generating, setGenerating] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [progressMsg, setProgressMsg] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    // Agent engine (default): builds each part separately + creates media (images/audio/video)
    const [engineMode, setEngineMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('agent');
    // ── Weakness-targeted generation ──
    const [weakness, setWeakness] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [weaknessLoading, setWeaknessLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // ── Deep-agent tuning (wired to /api/generate/deep-agent params) ──
    // "Target my weak areas" inclusion for the MAIN Generate run (the weakness
    // card's own button stays as the one-click auto-pick path).
    const [includeWeakTopics, setIncludeWeakTopics] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Extra guidance → deep agent `focusHint` (was a dead API param until now).
    const [focusHint, setFocusHint] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    // Per-request model override → deep agent `model` ("providerId:modelId",
    // e.g. "zai:glm-4.5"). Empty = account default (resolved server-side).
    const [modelOverride, setModelOverride] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [accountModel, setAccountModel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [questions, setQuestions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [downloading, setDownloading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // Start with server-safe defaults to avoid hydration mismatch
    const [isOnline, setIsOnline] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [genMode, setGenMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('online');
    const [offlineAvail, setOfflineAvail] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // Browser AI state — start with safe defaults, update after mount
    const [aiModelStatus, setAiModelStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        loaded: false,
        loading: false,
        progress: 0,
        modelId: null,
        error: null
    });
    const [showAiPanel, setShowAiPanel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [selectedModelId, setSelectedModelId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('Llama-3.2-1B-Instruct-q4f16_1-MLC');
    // File upload state
    const [sourceMode, setSourceMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('topic');
    const [extractedFile, setExtractedFile] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // Stage 13 UX: resumable upload hook drives progress + pause/resume/cancel.
    const { state: uploadState, upload: startResumableUpload, pause: pauseUpload, resume: resumeUpload, cancel: cancelUpload, reset: resetUpload } = (0,_lib_uploads_use_resumable_upload__WEBPACK_IMPORTED_MODULE_8__/* .useResumableUpload */ .b)();
    const [isDragOver, setIsDragOver] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showContentPreview, setShowContentPreview] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // ── Knowledge Library (RAG grounding) ──
    const [knowledgeSourceIds, setKnowledgeSourceIds] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [mediaRagUploading, setMediaRagUploading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const fileInputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // ── Generation timeout guard ──
    const genTimeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Output workspace (right column on desktop, section below the form on mobile) —
    // scrolled into view when generation starts so progress is visible immediately.
    const workspaceRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const scrollWorkspaceIntoView = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        // Defer one frame so the progress banner is mounted before scrolling.
        requestAnimationFrame(()=>{
            workspaceRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }, []);
    // Agent mode runs 5 stages per question (incl. media generation) — allow up to 8 min
    const GENERATION_TIMEOUT_MS = engineMode === 'agent' ? 180 * 60000 : 60 * 60000;
    // Cleanup timeout on unmount
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        return ()=>{
            if (genTimeoutRef.current) clearTimeout(genTimeoutRef.current);
        };
    }, []);
    // ── Prefill from the AI agent / pricing CTA ("medq-generate-questions") ──
    // Dispatchers navigate to /generate first and fire the event ~500 ms later,
    // but a cold compile of this route can outlast that, so they also stash
    // the payload in sessionStorage (src/lib/generate-prefill.ts). Drain the
    // stash on mount, then keep listening — whichever arrives first wins.
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const DIFF_MAP = {
            easy: 'Easy',
            basic: 'Basic',
            medium: 'Moderate',
            moderate: 'Moderate',
            hard: 'Hard',
            expert: 'Expert'
        };
        const applyPrefill = (d)=>{
            if (!d) return;
            if (typeof d.topic === 'string' && d.topic) {
                setTopic(d.topic);
                setSourceMode('topic');
                setExtractedFile(null);
            }
            if (typeof d.count === 'number' && d.count > 0) setCount(Math.min(Math.floor(d.count), 50));
            if (typeof d.difficulty === 'string' && d.difficulty) {
                const mapped = DIFF_MAP[d.difficulty.toLowerCase()];
                if (mapped) setActiveDiffs([
                    mapped
                ]);
                else setActiveDiffs([
                    ..._lib_medq_types__WEBPACK_IMPORTED_MODULE_2__/* .DIFFICULTY_OPTIONS */ .rX
                ]); // 'mixed' / unknown → all levels
            }
        };
        applyPrefill((0,_lib_generate_prefill__WEBPACK_IMPORTED_MODULE_19__/* .drainGeneratePrefill */ .km)());
        const onPrefillEvent = (e)=>{
            (0,_lib_generate_prefill__WEBPACK_IMPORTED_MODULE_19__/* .clearGeneratePrefill */ .TU)();
            applyPrefill(e.detail);
        };
        window.addEventListener('medq-generate-questions', onPrefillEvent);
        return ()=>window.removeEventListener('medq-generate-questions', onPrefillEvent);
    }, []);
    // Hydration-safe: set browser-only values after mount
    const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setMounted(true);
        setIsOnline(navigator.onLine);
        setAiModelStatus(_lib_browser_ai__WEBPACK_IMPORTED_MODULE_12__/* .browserAI */ .d.getModelStatus());
    }, []);
    // Listen for online/offline events
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleOnline = ()=>setIsOnline(true);
        const handleOffline = ()=>setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return ()=>{
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    // Subscribe to browser AI status
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const unsub = _lib_browser_ai__WEBPACK_IMPORTED_MODULE_12__/* .browserAI */ .d.subscribe(()=>{
            setAiModelStatus(_lib_browser_ai__WEBPACK_IMPORTED_MODULE_12__/* .browserAI */ .d.getModelStatus());
        });
        return unsub;
    }, []);
    // Update offline availability when topic/system changes
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (topic && system) {
            const avail = (0,_lib_offline_ai_engine__WEBPACK_IMPORTED_MODULE_3__/* .getOfflineAvailability */ .pc)(topic, system);
            setOfflineAvail(avail);
        } else {
            setOfflineAvail(null);
        }
    }, [
        topic,
        system
    ]);
    // Auto-switch to offline mode when going offline
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!isOnline && genMode === 'online') {
            setGenMode('offline');
        }
    }, [
        isOnline,
        genMode
    ]);
    const toggleType = (value)=>{
        setActiveTypes((prev)=>{
            const next = prev.includes(value) ? prev.filter((t)=>t !== value) : [
                ...prev,
                value
            ];
            return next.length === 0 ? prev : next;
        });
    };
    const toggleDiff = (value)=>{
        setActiveDiffs((prev)=>{
            const next = prev.includes(value) ? prev.filter((d)=>d !== value) : [
                ...prev,
                value
            ];
            return next.length === 0 ? prev : next;
        });
    };
    // ── File handling ──
    const handleFileSelect = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (file)=>{
        // Media files (audio/video) cannot be extracted client-side — route them
        // through the server-side knowledge pipeline: upload → ASR/VLM → RAG index.
        const isMedia = file.type.startsWith('audio/') || file.type.startsWith('video/') || /\.(mp3|wav|m4a|aac|ogg|flac|wma|opus|mp4|mov|mkv|avi|webm|3gp|aiff)$/i.test(file.name);
        if (isMedia) {
            setMediaRagUploading(file.name);
            try {
                const form = new FormData();
                form.append('file', file, file.name);
                const res = await fetch('/api/knowledge/upload', {
                    method: 'POST',
                    body: form
                });
                const json = await res.json();
                if (!res.ok) throw new Error(json.error || `Upload failed (${res.status})`);
                // Auto-select the new source for grounding.
                setKnowledgeSourceIds((ids)=>ids.includes(json.sourceId) ? ids : [
                        ...ids,
                        json.sourceId
                    ]);
                const autoTopic = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
                if (!topic.trim()) setTopic(autoTopic);
                sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success(`"${file.name}" uploaded — transcribing server-side. It is pre-selected in the Knowledge Library below; press Generate once it turns ready.`);
            } catch (error) {
                sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error(error instanceof Error ? error.message : 'Media upload failed');
            } finally{
                setMediaRagUploading(null);
            }
            return;
        }
        if (!(0,_lib_file_extract__WEBPACK_IMPORTED_MODULE_7__/* .isFileTypeSupported */ .VX)(file)) {
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error(`Unsupported file type. Supported: PDF, DOCX, TXT, MD, CSV, PNG, JPG, WEBP`);
            return;
        }
        // Stage 13 UX: the per-plan cap (visitor 2MB … pro 100MB) is enforced
        // server-side at POST /api/uploads and surfaced through the resumable
        // error state with a precise message. This guard only short-circuits the
        // pointless round-trip for a file above the ABSOLUTE 100MB ceiling.
        if (file.size > 100 * 1024 * 1024) {
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error(`File is ${Math.round(file.size / 1024 / 1024 * 10) / 10}MB — above the 100MB absolute cap.`);
            return;
        }
        try {
            // Stage 13 UX: the hook drives progress + pause/resume/cancel. On
            // success it sets state to 'done' and returns the content; on failure
            // or cancel it sets state to 'error'/'cancelled' — the component
            // shows the right message + Retry button, so we don't toast here.
            const content = await startResumableUpload(file);
            setExtractedFile(content);
            resetUpload(); // hide the progress UI — the file-info card takes over
            // Auto-set topic from filename if not already set
            const autoTopic = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
            if (!topic.trim()) {
                setTopic(autoTopic);
            }
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success(`Extracted content from ${file.name}${content.imageUrls?.length ? ' (includes images for AI vision)' : ''}`);
        } catch (error) {
            // Don't toast — the <ResumableUploadProgress> error state shows the
            // message + a Retry button. Cancels also land here (UploadCancelledError)
            // but the component shows the cancelled state, not an error.
            if (!/cancel/i.test(error instanceof Error ? error.message : String(error))) {
                // Only toast for unexpected errors the component can't show
                sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error(error instanceof Error ? error.message : 'Failed to extract file content');
            }
        }
    }, [
        topic,
        startResumableUpload,
        resetUpload
    ]);
    const handleFileInput = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((e)=>{
        const file = e.target.files?.[0];
        if (file) handleFileSelect(file);
        // Reset input so same file can be re-selected
        e.target.value = '';
    }, [
        handleFileSelect
    ]);
    const handleDrop = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((e)=>{
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFileSelect(file);
    }, [
        handleFileSelect
    ]);
    const handleDragOver = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((e)=>{
        e.preventDefault();
        setIsDragOver(true);
    }, []);
    const handleDragLeave = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((e)=>{
        e.preventDefault();
        setIsDragOver(false);
    }, []);
    const clearFile = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setExtractedFile(null);
        resetUpload();
        setShowContentPreview(false);
    }, [
        resetUpload
    ]);
    // ── Account default model (shown as the placeholder for the override) ──
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetch('/api/user/default-model').then((res)=>res.ok ? res.json() : null).then((data)=>{
            if (data?.defaultModel) setAccountModel(data.defaultModel);
        }).catch(()=>{});
    }, []);
    // ── Weakness analysis loader ──
    const loadWeaknessAnalysis = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setWeaknessLoading(true);
        try {
            const res = await fetch('/api/generate/weakness');
            const data = await res.json();
            if (res.ok) {
                setWeakness(data);
                if (!data.weakAreas?.length) {
                    sonner__WEBPACK_IMPORTED_MODULE_10__.toast.info('Not enough answer history yet — answer a few questions and come back!');
                }
            } else if (res.status !== 401) {
                sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error(data.error || 'Could not load weakness analysis');
            } else {
                sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('Log in to target your weaknesses');
            }
        } catch  {
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('Could not load weakness analysis');
        } finally{
            setWeaknessLoading(false);
        }
    }, []);
    // ── Socket.io for real-time job progress ──
    const { connected: socketConnected, listenToJob, stopListening } = (0,_hooks_use_job_socket__WEBPACK_IMPORTED_MODULE_11__/* .useJobSocket */ .a)({
        pollUrl: engineMode === 'agent' ? '/api/generate/deep-agent' : '/api/generate',
        pollIntervalMs: 3000,
        onProgress: (data)=>{
            setProgressMsg(data.progress || 'Processing...');
            // Stream partial results — show each question as it's generated
            if (data.partialResult) {
                setQuestions((prev)=>{
                    // Avoid duplicates (partialResult might be re-sent)
                    const newQ = data.partialResult;
                    if (prev.some((q)=>q.id === newQ.id)) return prev;
                    const updated = [
                        ...prev,
                        newQ
                    ];
                    (0,_lib_offline_ai_engine__WEBPACK_IMPORTED_MODULE_3__/* .cacheQuestions */ .C3)(updated);
                    onQuestionsGenerated?.(updated);
                    return updated;
                });
            }
            // Reset timeout on each progress update
            if (genTimeoutRef.current) clearTimeout(genTimeoutRef.current);
            genTimeoutRef.current = setTimeout(()=>{
                sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('Generation timed out. Please try again.');
                setGenerating(false);
                setProgressMsg('');
                stopListening();
            }, GENERATION_TIMEOUT_MS);
        },
        onCompleted: (data)=>{
            // Clear timeout
            if (genTimeoutRef.current) {
                clearTimeout(genTimeoutRef.current);
                genTimeoutRef.current = null;
            }
            if (data.result && Array.isArray(data.result) && data.result.length > 0) {
                const qs = data.result;
                setQuestions(qs);
                (0,_lib_offline_ai_engine__WEBPACK_IMPORTED_MODULE_3__/* .cacheQuestions */ .C3)(qs);
                onQuestionsGenerated?.(qs);
                sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success(`Generated ${qs.length} question${qs.length > 1 ? 's' : ''} (AI)`);
            } else if (questions.length === 0) {
                // Completed but no results at all — likely parsing failed
                sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('Generation completed but no questions could be parsed. Try again with different parameters.');
            }
            setGenerating(false);
            setProgressMsg('');
        },
        onFailed: (data)=>{
            // Clear timeout
            if (genTimeoutRef.current) {
                clearTimeout(genTimeoutRef.current);
                genTimeoutRef.current = null;
            }
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error(data.error || 'Generation failed');
            setGenerating(false);
            setProgressMsg('');
        }
    });
    // ── Start a batch generation job (sends count to server) ──
    const startBatchJob = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (url, body)=>{
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (!res.ok) {
            const errData = await res.json().catch(()=>({}));
            throw new Error(errData.error || `Server error ${res.status}`);
        }
        const { jobId } = await res.json();
        if (!jobId) throw new Error('Server did not return a job ID');
        // Listen for real-time progress via socket
        listenToJob(jobId);
    }, [
        listenToJob
    ]);
    // ── Weakness-targeted generation (agent pipeline, auto-picked weak topics) ──
    const handleWeaknessGenerate = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        setGenerating(true);
        setQuestions([]);
        setEngineMode('agent'); // weakness jobs run through the agent pipeline
        scrollWorkspaceIntoView();
        if (genTimeoutRef.current) clearTimeout(genTimeoutRef.current);
        genTimeoutRef.current = setTimeout(()=>{
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('Generation timed out. Please try again.');
            setGenerating(false);
            setProgressMsg('');
            stopListening();
        }, GENERATION_TIMEOUT_MS);
        try {
            await startBatchJob('/api/generate/weakness', {});
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success('🎯 Targeting your weakest areas…');
        } catch (err) {
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error(err instanceof Error ? err.message : 'Weakness generation failed');
            setGenerating(false);
            setProgressMsg('');
            if (genTimeoutRef.current) {
                clearTimeout(genTimeoutRef.current);
                genTimeoutRef.current = null;
            }
        }
    }, [
        startBatchJob,
        stopListening,
        scrollWorkspaceIntoView
    ]);
    // ── Generate ──
    const handleGenerate = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        const effectiveTopic = sourceMode === 'file' ? topic.trim() || extractedFile?.fileName?.replace(/\.[^.]+$/, '') || 'Medical' : topic.trim();
        const effectiveSystem = system || 'General';
        if (sourceMode === 'topic' && !effectiveTopic) {
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('Please enter a topic');
            return;
        }
        if (sourceMode === 'file' && !extractedFile && knowledgeSourceIds.length === 0) {
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('Please upload a file first (or select a source from the Knowledge Library)');
            return;
        }
        setGenerating(true);
        setQuestions([]);
        scrollWorkspaceIntoView();
        const totalToGenerate = Math.min(Math.max(count, 1), 100);
        // Start a global timeout for the entire generation
        if (genTimeoutRef.current) clearTimeout(genTimeoutRef.current);
        genTimeoutRef.current = setTimeout(()=>{
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('Generation timed out. Please try again.');
            setGenerating(false);
            setProgressMsg('');
            stopListening();
        }, GENERATION_TIMEOUT_MS);
        try {
            let generatedQuestions = [];
            if (genMode === 'offline' && sourceMode !== 'file') {
                // Offline generation (non-file mode) — keeps original batch approach
                if (_lib_browser_ai__WEBPACK_IMPORTED_MODULE_12__/* .browserAI */ .d.isModelLoaded()) {
                    try {
                        const prompt = `Generate ${totalToGenerate} medical questions about "${effectiveTopic}" in the ${effectiveSystem} system. 
Types: ${activeTypes.join(', ')}. Difficulty: ${activeDiffs.join(', ')}.
For each question, provide a JSON array where each object has: type (mcq/tf/short), text, options (for mcq), answer, explanation, mnemonic, clinicalPearl, distractorAnalysis, difficulty, system, topic, tags.
Return ONLY valid JSON, no other text.`;
                        const result = await _lib_browser_ai__WEBPACK_IMPORTED_MODULE_12__/* .browserAI */ .d.generate(prompt, 2048);
                        let parsed = [];
                        try {
                            const jsonMatch = result.match(/\[[\s\S]*\]/);
                            if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
                        } catch  {}
                        if (parsed.length > 0) {
                            generatedQuestions = parsed.map((q, i)=>({
                                    id: `browser-ai-${Date.now()}-${i}`,
                                    type: q.type || 'mcq',
                                    text: q.text || '',
                                    options: q.options || [],
                                    answer: q.answer || '',
                                    explanation: q.explanation || '',
                                    mnemonic: q.mnemonic || '',
                                    clinicalPearl: q.clinicalPearl || '',
                                    distractorAnalysis: q.distractorAnalysis || '',
                                    difficulty: q.difficulty || 'Medium',
                                    system: effectiveSystem,
                                    topic: effectiveTopic,
                                    tags: q.tags || [
                                        effectiveTopic,
                                        effectiveSystem,
                                        'browser-ai'
                                    ],
                                    isAIGenerated: true,
                                    createdAt: new Date().toISOString(),
                                    updatedAt: new Date().toISOString()
                                }));
                            (0,_lib_offline_ai_engine__WEBPACK_IMPORTED_MODULE_3__/* .cacheQuestions */ .C3)(generatedQuestions);
                            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success(`Generated ${generatedQuestions.length} questions (Browser AI)`);
                        } else {
                            await new Promise((resolve)=>setTimeout(resolve, 500));
                            generatedQuestions = (0,_lib_offline_ai_engine__WEBPACK_IMPORTED_MODULE_3__/* .generateOfflineQuestions */ .Sd)(effectiveTopic, effectiveSystem, activeTypes, activeDiffs, Math.min(Math.max(count, 1), 100));
                            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success(`Generated ${generatedQuestions.length} questions (Template Engine — AI output unparseable)`);
                        }
                    } catch  {
                        await new Promise((resolve)=>setTimeout(resolve, 500));
                        generatedQuestions = (0,_lib_offline_ai_engine__WEBPACK_IMPORTED_MODULE_3__/* .generateOfflineQuestions */ .Sd)(effectiveTopic, effectiveSystem, activeTypes, activeDiffs, Math.min(Math.max(count, 1), 100));
                        sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success(`Generated ${generatedQuestions.length} questions (Template Engine)`);
                    }
                } else {
                    await new Promise((resolve)=>setTimeout(resolve, 800 + Math.random() * 700));
                    generatedQuestions = (0,_lib_offline_ai_engine__WEBPACK_IMPORTED_MODULE_3__/* .generateOfflineQuestions */ .Sd)(effectiveTopic, effectiveSystem, activeTypes, activeDiffs, Math.min(Math.max(count, 1), 100));
                    sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success(`Generated ${generatedQuestions.length} question${generatedQuestions.length > 1 ? 's' : ''} (Offline)`);
                }
            } else if (sourceMode === 'file' && extractedFile) {
                // File-based generation — send count to server, one async job
                if (!navigator.onLine) {
                    sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('File-based generation requires internet. Please connect and try again.');
                    setGenerating(false);
                    setProgressMsg('');
                    if (genTimeoutRef.current) {
                        clearTimeout(genTimeoutRef.current);
                        genTimeoutRef.current = null;
                    }
                    return;
                }
                setProgressMsg('Starting file-based generation...');
                try {
                    await startBatchJob('/api/generate-from-file', {
                        fileContent: extractedFile.text || '',
                        fileName: extractedFile.fileName || '',
                        fileType: extractedFile.fileType || '',
                        topic: effectiveTopic,
                        system: effectiveSystem,
                        types: activeTypes,
                        difficulties: activeDiffs,
                        count: totalToGenerate,
                        imageUrls: extractedFile.imageUrls || []
                    });
                    // Async job started — socket/poll callbacks will handle setGenerating(false)
                    // Do NOT reset generating state here
                    return;
                } catch (error) {
                    sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error(error instanceof Error ? error.message : 'Failed to start generation');
                    setGenerating(false);
                    setProgressMsg('');
                    if (genTimeoutRef.current) {
                        clearTimeout(genTimeoutRef.current);
                        genTimeoutRef.current = null;
                    }
                    return;
                }
            } else {
                // Online AI generation — send count to server, one async job
                if (!navigator.onLine) {
                    sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('You are offline. Switching to offline mode.');
                    setGenMode('offline');
                    setGenerating(false);
                    setProgressMsg('');
                    if (genTimeoutRef.current) {
                        clearTimeout(genTimeoutRef.current);
                        genTimeoutRef.current = null;
                    }
                    return;
                }
                setProgressMsg(engineMode === 'agent' || knowledgeSourceIds.length ? '🤖 Deep agent starting…' : 'Starting generation...');
                try {
                    // RAG grounding requires the agent pipeline — force it when sources are selected.
                    const useAgentEngine = engineMode === 'agent' || knowledgeSourceIds.length > 0;
                    // ── Deep-agent tuning params (previously dead API fields) ──
                    // weakTopics: the learner's measured weak areas, sent when the
                    // "include weak areas" toggle is on and analysis data exists.
                    const weakTopicList = includeWeakTopics && weakness?.weakAreas?.length ? weakness.weakAreas.slice(0, 5).map((w)=>w.topic ? `${w.topic} (${w.system})` : `${w.system} — weakest areas`) : undefined;
                    // focusHint: the user's extra guidance, augmented with the accuracy
                    // context when weak-area targeting is active.
                    const trimmedHint = focusHint.trim().slice(0, 400);
                    const effectiveFocusHint = [
                        trimmedHint || null,
                        weakTopicList ? `Target the learner's weakest areas (overall accuracy ${(weakness.overall.accuracy * 100).toFixed(0)}% over ${weakness.overall.attempts} attempts) — drill the frequently-confused concepts.` : null
                    ].filter(Boolean).join(' ') || undefined;
                    const effectiveModel = modelOverride.trim() || undefined;
                    await startBatchJob(useAgentEngine ? '/api/generate/deep-agent' : '/api/generate', {
                        topic: effectiveTopic,
                        types: activeTypes,
                        difficulties: activeDiffs,
                        system: effectiveSystem,
                        count: totalToGenerate,
                        ...useAgentEngine ? {
                            ...weakTopicList ? {
                                weakTopics: weakTopicList
                            } : {},
                            ...effectiveFocusHint ? {
                                focusHint: effectiveFocusHint
                            } : {},
                            ...effectiveModel ? {
                                model: effectiveModel
                            } : {}
                        } : {},
                        ...useAgentEngine && knowledgeSourceIds.length ? {
                            knowledgeSourceIds
                        } : {}
                    });
                    // Async job started — socket/poll callbacks will handle setGenerating(false)
                    // Do NOT reset generating state here
                    return;
                } catch (error) {
                    sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error(error instanceof Error ? error.message : 'Failed to start generation');
                    setGenerating(false);
                    setProgressMsg('');
                    if (genTimeoutRef.current) {
                        clearTimeout(genTimeoutRef.current);
                        genTimeoutRef.current = null;
                    }
                    return;
                }
            }
            setQuestions(generatedQuestions);
            onQuestionsGenerated?.(generatedQuestions);
        } catch (error) {
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error(error instanceof Error ? error.message : 'Failed to generate questions');
        } finally{
            // Only reset generating for synchronous (offline) path
            // For async jobs (online/file), socket/poll callbacks handle this
            if (genMode === 'offline' && sourceMode !== 'file') {
                setGenerating(false);
                setProgressMsg('');
            }
            if (genTimeoutRef.current && genMode === 'offline' && sourceMode !== 'file') {
                clearTimeout(genTimeoutRef.current);
                genTimeoutRef.current = null;
            }
        }
    }, [
        topic,
        system,
        activeTypes,
        activeDiffs,
        count,
        genMode,
        sourceMode,
        extractedFile,
        knowledgeSourceIds,
        onQuestionsGenerated,
        startBatchJob,
        includeWeakTopics,
        weakness,
        focusHint,
        modelOverride,
        scrollWorkspaceIntoView
    ]);
    const handleLoadAiModel = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        try {
            await _lib_browser_ai__WEBPACK_IMPORTED_MODULE_12__/* .browserAI */ .d.loadModel(selectedModelId);
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success('AI model loaded successfully!');
        } catch (error) {
            sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error(error instanceof Error ? error.message : 'Failed to load model');
        }
    }, [
        selectedModelId
    ]);
    const handleUnloadAiModel = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        _lib_browser_ai__WEBPACK_IMPORTED_MODULE_12__/* .browserAI */ .d.unloadModel();
        sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success('AI model unloaded');
    }, []);
    const availableModels = _lib_browser_ai__WEBPACK_IMPORTED_MODULE_12__/* .browserAI */ .d.getAvailableModels();
    // Only check WebGPU support after mount to avoid hydration mismatch
    const isWebGpuSupported = mounted ? _lib_browser_ai__WEBPACK_IMPORTED_MODULE_12__/* .browserAI */ .d.isSupported() : false;
    const isFileMode = sourceMode === 'file';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            !isOnline && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mb-6 bg-[#ffb347]/10 border border-[#ffb347]/25 rounded-xl px-5 py-4 flex items-start gap-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                        className: "w-5 h-5 text-[#ffb347] flex-shrink-0 mt-0.5"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-sm font-semibold text-[#ffb347]",
                                children: "You are offline"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-xs text-[#ffb347]/70 mt-1",
                                children: [
                                    "AI generation requires internet, but you can still generate questions using the ",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                        children: "Offline Engine"
                                    }),
                                    " — powered by built-in medical templates, cached questions, or a ",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                        children: "Browser AI model"
                                    }),
                                    " if downloaded.",
                                    isFileMode && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "block mt-1 text-[#ff5757]",
                                        children: "⚠️ File-based generation requires internet connection."
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "lg:grid lg:grid-cols-[minmax(340px,430px)_minmax(0,1fr)] xl:grid-cols-[minmax(380px,470px)_minmax(0,1fr)] lg:gap-6 items-start",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "lg:sticky lg:top-2 lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto custom-scrollbar lg:pr-1",
                        children: [
                            showAiPanel && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "mb-6 bg-[#151821] border border-[#8b5cf6]/20 rounded-2xl p-6",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center justify-between mb-4",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                                        className: "w-5 h-5 text-[#8b5cf6]"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                        className: "text-sm font-bold text-[#e8ecf4]",
                                                        children: "Browser AI Model"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-[10px] px-2 py-0.5 rounded-md bg-[#8b5cf6]/10 text-[#8b5cf6] font-semibold",
                                                        children: "Offline-Ready"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                type: "button",
                                                onClick: ()=>setShowAiPanel(false),
                                                className: "p-1.5 rounded-lg text-[#5a6478] hover:text-[#e8ecf4] hover:bg-white/[0.06] transition-all cursor-pointer",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                                                    className: "w-4 h-4"
                                                })
                                            })
                                        ]
                                    }),
                                    !isWebGpuSupported ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-start gap-3 p-4 rounded-xl bg-[#ff5757]/5 border border-[#ff5757]/20",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                                className: "w-5 h-5 text-[#ff5757] flex-shrink-0 mt-0.5"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-sm font-semibold text-[#ff5757]",
                                                        children: "WebGPU Not Available"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-xs text-[#ff5757]/70 mt-1",
                                                        children: "Browser AI requires WebGPU. Use Chrome 113+ or Edge 113+."
                                                    })
                                                ]
                                            })
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "mb-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex items-center justify-between mb-2",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "text-xs text-[#5a6478] font-semibold",
                                                                children: "Status"
                                                            }),
                                                            aiModelStatus.loaded ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: "flex items-center gap-1 text-[10px] text-[#00e5a0] font-semibold",
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                                                                        className: "w-3 h-3"
                                                                    }),
                                                                    " Model Loaded"
                                                                ]
                                                            }) : aiModelStatus.loading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: "flex items-center gap-1 text-[10px] text-[#ffb347] font-semibold",
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                                                        className: "w-3 h-3 animate-spin"
                                                                    }),
                                                                    " Loading... ",
                                                                    aiModelStatus.progress,
                                                                    "%"
                                                                ]
                                                            }) : aiModelStatus.error ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: "flex items-center gap-1 text-[10px] text-[#ff5757] font-semibold",
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                                                        className: "w-3 h-3"
                                                                    }),
                                                                    " Error"
                                                                ]
                                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "text-[10px] text-[#5a6478] font-semibold",
                                                                children: "No Model"
                                                            })
                                                        ]
                                                    }),
                                                    aiModelStatus.loading && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "w-full bg-white/[0.06] rounded-full h-2 mb-1",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "h-2 rounded-full bg-[#8b5cf6] transition-all duration-300",
                                                            style: {
                                                                width: `${aiModelStatus.progress}%`
                                                            }
                                                        })
                                                    }),
                                                    aiModelStatus.error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                        className: "text-[10px] text-[#ff5757] mt-1",
                                                        children: aiModelStatus.error
                                                    }),
                                                    aiModelStatus.loaded && aiModelStatus.modelId && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                        className: "text-[10px] text-[#8b95a8] mt-1",
                                                        children: [
                                                            "Active: ",
                                                            availableModels.find((m)=>m.id === aiModelStatus.modelId)?.name || aiModelStatus.modelId
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                        className: "text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2 block",
                                                        children: "Select Model"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "grid gap-2",
                                                        children: availableModels.map((model)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                                type: "button",
                                                                onClick: ()=>setSelectedModelId(model.id),
                                                                className: `text-left p-3 rounded-xl border transition-all cursor-pointer ${selectedModelId === model.id ? 'border-[#8b5cf6]/40 bg-[#8b5cf6]/10' : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]'}`,
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                        className: "flex items-center justify-between",
                                                                        children: [
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                                className: "text-xs font-bold text-[#e8ecf4]",
                                                                                children: model.name
                                                                            }),
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                                className: "text-[10px] px-1.5 py-0.5 rounded-md bg-white/[0.06] text-[#5a6478] font-medium",
                                                                                children: model.size
                                                                            })
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                        className: "text-[10px] text-[#5a6478] mt-0.5",
                                                                        children: model.description
                                                                    })
                                                                ]
                                                            }, model.id))
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "flex gap-2",
                                                children: !aiModelStatus.loaded ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    type: "button",
                                                    onClick: handleLoadAiModel,
                                                    disabled: aiModelStatus.loading,
                                                    className: "flex-1 py-3 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white text-sm font-bold flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#8b5cf6]/25",
                                                    children: aiModelStatus.loading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                                                className: "w-4 h-4 animate-spin"
                                                            }),
                                                            " Downloading... ",
                                                            aiModelStatus.progress,
                                                            "%"
                                                        ]
                                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                                                className: "w-4 h-4"
                                                            }),
                                                            " Download & Load Model"
                                                        ]
                                                    })
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                    type: "button",
                                                    onClick: handleUnloadAiModel,
                                                    className: "flex-1 py-3 rounded-xl bg-[#ff5757]/10 border border-[#ff5757]/20 text-[#ff5757] text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#ff5757]/20 transition-all cursor-pointer",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                                            className: "w-4 h-4"
                                                        }),
                                                        " Unload Model"
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[10px] text-[#3a4055] mt-3",
                                                children: "⚡ Browser AI runs on your device — no internet needed after download."
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "bg-[#151821] border border-white/[0.06] rounded-2xl p-5 sm:p-6 lg:p-6 mb-8 lg:mb-0",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "mb-6",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                className: "text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2.5 block",
                                                children: "Generation Mode"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex gap-2 flex-wrap",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                        type: "button",
                                                        onClick: ()=>setGenMode('online'),
                                                        disabled: !isOnline,
                                                        className: `inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${genMode === 'online' ? 'bg-[#00e5a0]/10 border border-[#00e5a0]/35 text-[#00e5a0]' : 'bg-[#1a1e2b] border border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0]'} ${!isOnline ? 'opacity-40 cursor-not-allowed' : ''}`,
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                                                className: "w-3.5 h-3.5"
                                                            }),
                                                            " AI (Online)"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                        type: "button",
                                                        onClick: ()=>setGenMode('offline'),
                                                        className: `inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${genMode === 'offline' ? 'bg-[#00e5a0]/10 border border-[#00e5a0]/35 text-[#00e5a0]' : 'bg-[#1a1e2b] border border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0]'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                                                className: "w-3.5 h-3.5"
                                                            }),
                                                            " Offline Engine"
                                                        ]
                                                    }),
                                                    isWebGpuSupported && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                        type: "button",
                                                        onClick: ()=>setShowAiPanel(!showAiPanel),
                                                        className: `inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${showAiPanel || aiModelStatus.loaded ? 'bg-[#8b5cf6]/10 border border-[#8b5cf6]/35 text-[#8b5cf6]' : 'bg-[#1a1e2b] border border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0]'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                                                className: "w-3.5 h-3.5"
                                                            }),
                                                            " Browser AI ",
                                                            aiModelStatus.loaded && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "w-1.5 h-1.5 rounded-full bg-[#00e5a0]"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            genMode === 'online' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                className: "text-[10px] text-[#5a6478] mt-2 flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                                        className: "w-3 h-3"
                                                    }),
                                                    " High-quality questions with rich formatting"
                                                ]
                                            }),
                                            genMode === 'offline' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                className: "text-[10px] text-[#5a6478] mt-2 flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                                        className: "w-3 h-3"
                                                    }),
                                                    " Works without internet — templates + cached questions",
                                                    aiModelStatus.loaded && ' + Browser AI model'
                                                ]
                                            }),
                                            genMode === 'offline' && offlineAvail && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "mt-2 flex items-center gap-3 text-[10px]",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "flex items-center gap-1 text-[#00e5a0]",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                                                                className: "w-3 h-3"
                                                            }),
                                                            " ",
                                                            offlineAvail.cached,
                                                            " cached"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "flex items-center gap-1 text-[#8b95a8]",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                                                className: "w-3 h-3"
                                                            }),
                                                            " ",
                                                            offlineAvail.templates,
                                                            " templates"
                                                        ]
                                                    }),
                                                    aiModelStatus.loaded && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "flex items-center gap-1 text-[#8b5cf6]",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                                                className: "w-3 h-3"
                                                            }),
                                                            " AI ready"
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "mb-6",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                className: "text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2.5 block",
                                                children: "Source"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                        type: "button",
                                                        onClick: ()=>setSourceMode('topic'),
                                                        className: `inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${sourceMode === 'topic' ? 'bg-[#4fc3f7]/10 border border-[#4fc3f7]/35 text-[#4fc3f7]' : 'bg-[#1a1e2b] border border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0]'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                                                                className: "w-3.5 h-3.5"
                                                            }),
                                                            " Topic"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                        type: "button",
                                                        onClick: ()=>setSourceMode('file'),
                                                        className: `inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${sourceMode === 'file' ? 'bg-[#4fc3f7]/10 border border-[#4fc3f7]/35 text-[#4fc3f7]' : 'bg-[#1a1e2b] border border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0]'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                                                className: "w-3.5 h-3.5"
                                                            }),
                                                            " From File",
                                                            extractedFile && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "w-1.5 h-1.5 rounded-full bg-[#00e5a0]"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            sourceMode === 'file' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                className: "text-[10px] text-[#5a6478] mt-2 flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                                        className: "w-3 h-3 shrink-0"
                                                    }),
                                                    "PDF, DOCX, TXT, or image → questions. Audio/video are transcribed into the Knowledge Library."
                                                ]
                                            })
                                        ]
                                    }),
                                    sourceMode === 'topic' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "mb-6",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                className: "text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2.5 block",
                                                children: "Engine"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                        type: "button",
                                                        onClick: ()=>setEngineMode('agent'),
                                                        className: `inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${engineMode === 'agent' ? 'bg-[#00e5a0]/10 border border-[#00e5a0]/35 text-[#00e5a0]' : 'bg-[#1a1e2b] border border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0]'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                                                className: "w-3.5 h-3.5"
                                                            }),
                                                            " Deep Agent Mode"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                        type: "button",
                                                        onClick: ()=>setEngineMode('fast'),
                                                        className: `inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${engineMode === 'fast' ? 'bg-[#f59e0b]/10 border border-[#f59e0b]/35 text-[#f59e0b]' : 'bg-[#1a1e2b] border border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0]'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                                                className: "w-3.5 h-3.5"
                                                            }),
                                                            " Fast Mode"
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[10px] text-[#5a6478] mt-2 flex items-center gap-1.5",
                                                children: engineMode === 'agent' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                                            className: "w-3 h-3 text-[#00e5a0]/70 shrink-0"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                            title: "A real autonomous deep agent — it plans its own steps, delegates writing to a specialist subagent, calls tools (web search, image generation, audio, your knowledge library), and saves each question itself",
                                                            children: "Thorough mode: researches sources, verifies facts. Takes 2–3 min."
                                                        })
                                                    ]
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                                            className: "w-3 h-3 text-[#f59e0b]/70 shrink-0"
                                                        }),
                                                        "Single LLM call — text-only questions, fastest."
                                                    ]
                                                })
                                            })
                                        ]
                                    }),
                                    sourceMode === 'topic' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "mb-6",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_KnowledgeLibraryPanel__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                                selectedIds: knowledgeSourceIds,
                                                onToggle: (id)=>setKnowledgeSourceIds((ids)=>ids.includes(id) ? ids.filter((x)=>x !== id) : [
                                                            ...ids,
                                                            id
                                                        ]),
                                                autoSelectNew: false,
                                                onSourcesReady: (ready)=>{
                                                    const newlySelected = ready.filter((s)=>knowledgeSourceIds.includes(s.id));
                                                    if (newlySelected.length) {
                                                        sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success(`${newlySelected.length === 1 ? newlySelected[0].name : newlySelected.length + ' sources'} indexed — ready to ground generation`);
                                                    }
                                                }
                                            }),
                                            engineMode === 'agent' && knowledgeSourceIds.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                className: "text-[10px] text-[#00e5a0] mt-2 flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                                                        className: "w-3 h-3"
                                                    }),
                                                    "RAG grounding active — questions will be written from the selected sources’ passages, with citations"
                                                ]
                                            }),
                                            engineMode === 'fast' && knowledgeSourceIds.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                className: "text-[10px] text-[#f59e0b] mt-2 flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                                        className: "w-3 h-3"
                                                    }),
                                                    "RAG grounding needs Agent Mode — switch engines to use the library"
                                                ]
                                            })
                                        ]
                                    }),
                                    sourceMode === 'file' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "mb-5",
                                        children: !extractedFile ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            onDrop: handleDrop,
                                            onDragOver: handleDragOver,
                                            onDragLeave: handleDragLeave,
                                            onClick: ()=>fileInputRef.current?.click(),
                                            className: `relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${isDragOver ? 'border-[#4fc3f7]/50 bg-[#4fc3f7]/5 scale-[1.01]' : 'border-white/[0.1] bg-[#1a1e2b] hover:border-[#4fc3f7]/30 hover:bg-[#4fc3f7]/[0.03]'}`,
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                    ref: fileInputRef,
                                                    type: "file",
                                                    accept: ".pdf,.docx,.doc,.txt,.md,.csv,.tsv,.png,.jpg,.jpeg,.webp,.bmp,.gif,.mp3,.wav,.m4a,.aac,.ogg,.flac,.opus,.mp4,.mov,.mkv,.avi,.webm",
                                                    onChange: handleFileInput,
                                                    className: "hidden"
                                                }),
                                                uploadState ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_ResumableUploadProgress__WEBPACK_IMPORTED_MODULE_9__/* .ResumableUploadProgress */ .$, {
                                                    state: uploadState,
                                                    onPause: pauseUpload,
                                                    onResume: resumeUpload,
                                                    onCancel: cancelUpload,
                                                    onRetry: ()=>fileInputRef.current?.click()
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "space-y-3",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "w-14 h-14 mx-auto rounded-2xl bg-[#4fc3f7]/10 flex items-center justify-center",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_35__/* ["default"] */ .A, {
                                                                className: "w-7 h-7 text-[#4fc3f7]"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                    className: "text-sm text-[#e8ecf4] font-semibold",
                                                                    children: isDragOver ? 'Drop your file here' : 'Drop a file or click to upload'
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                    className: "text-xs text-[#5a6478] mt-1",
                                                                    children: "PDF, DOCX, TXT, MD, CSV, PNG, JPG, WEBP — up to 100MB (plan-dependent)"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex items-center justify-center gap-2 text-[10px] text-[#3a4055]",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                    className: "flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_36__/* ["default"] */ .A, {
                                                                            className: "w-3 h-3"
                                                                        }),
                                                                        " PDF"
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    children: "\xb7"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                    className: "flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_36__/* ["default"] */ .A, {
                                                                            className: "w-3 h-3"
                                                                        }),
                                                                        " DOCX"
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    children: "\xb7"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                    className: "flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_36__/* ["default"] */ .A, {
                                                                            className: "w-3 h-3"
                                                                        }),
                                                                        " TXT"
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    children: "\xb7"
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                    className: "flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_36__/* ["default"] */ .A, {
                                                                            className: "w-3 h-3"
                                                                        }),
                                                                        " Images"
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        }) : /* ── File uploaded — show info card ── */ /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "bg-[#1a1e2b] border border-[#4fc3f7]/20 rounded-2xl p-5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-start gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "w-12 h-12 rounded-xl bg-[#4fc3f7]/10 flex items-center justify-center flex-shrink-0",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_37__/* ["default"] */ .A, {
                                                                className: "w-6 h-6 text-[#4fc3f7]"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "flex-1 min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    className: "flex items-center gap-2 mb-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                            className: "text-sm font-bold text-[#e8ecf4] truncate",
                                                                            children: extractedFile.fileName
                                                                        }),
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                            className: "text-[10px] px-2 py-0.5 rounded-md bg-[#4fc3f7]/10 text-[#4fc3f7] font-semibold flex-shrink-0",
                                                                            children: (0,_lib_file_extract__WEBPACK_IMPORTED_MODULE_7__/* .getFileTypeLabel */ .Hx)({
                                                                                name: extractedFile.fileName
                                                                            })
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    className: "flex items-center gap-3 text-[10px] text-[#5a6478]",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                            children: (0,_lib_file_extract__WEBPACK_IMPORTED_MODULE_7__/* .formatFileSize */ .v7)(extractedFile.fileSize)
                                                                        }),
                                                                        extractedFile.pageCount && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                            children: [
                                                                                extractedFile.pageCount,
                                                                                " pages"
                                                                            ]
                                                                        }),
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                            children: [
                                                                                extractedFile.text.length.toLocaleString(),
                                                                                " chars extracted"
                                                                            ]
                                                                        }),
                                                                        extractedFile.imageUrls?.length && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                            className: "text-[#8b5cf6] flex items-center gap-1",
                                                                            children: [
                                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_38__/* ["default"] */ .A, {
                                                                                    className: "w-3 h-3"
                                                                                }),
                                                                                " ",
                                                                                extractedFile.imageUrls.length,
                                                                                " image(s) for AI vision"
                                                                            ]
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                                    type: "button",
                                                                    onClick: ()=>setShowContentPreview(!showContentPreview),
                                                                    className: "mt-2 inline-flex items-center gap-1.5 text-[10px] text-[#4fc3f7] hover:text-[#7fd7f9] transition-colors cursor-pointer",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_38__/* ["default"] */ .A, {
                                                                            className: "w-3 h-3"
                                                                        }),
                                                                        showContentPreview ? 'Hide content preview' : 'Preview extracted content'
                                                                    ]
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                            type: "button",
                                                            onClick: clearFile,
                                                            className: "p-2 rounded-lg text-[#5a6478] hover:text-[#ff5757] hover:bg-[#ff5757]/10 transition-all cursor-pointer",
                                                            title: "Remove file",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                                                                className: "w-4 h-4"
                                                            })
                                                        })
                                                    ]
                                                }),
                                                showContentPreview && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "mt-4 p-4 bg-[#0c0e14] rounded-xl border border-white/[0.06] max-h-64 overflow-y-auto",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("pre", {
                                                        className: "text-[11px] text-[#8b95a8] whitespace-pre-wrap font-mono leading-relaxed",
                                                        children: [
                                                            extractedFile.text.slice(0, 3000),
                                                            extractedFile.text.length > 3000 ? '\n\n[... truncated preview ...]' : ''
                                                        ]
                                                    })
                                                })
                                            ]
                                        })
                                    }),
                                    sourceMode === 'file' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "mb-6",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_KnowledgeLibraryPanel__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                                selectedIds: knowledgeSourceIds,
                                                onToggle: (id)=>setKnowledgeSourceIds((ids)=>ids.includes(id) ? ids.filter((x)=>x !== id) : [
                                                            ...ids,
                                                            id
                                                        ]),
                                                autoSelectNew: true,
                                                onSourcesReady: (ready)=>{
                                                    sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success(`${ready.length === 1 ? `"${ready[0].name}"` : ready.length + ' sources'} indexed${ready[0]?.meta?.chunks ? ` (${ready[0].meta.chunks} passages)` : ''} — ready to ground generation`);
                                                }
                                            }),
                                            knowledgeSourceIds.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                className: "text-[10px] text-[#00e5a0] mt-2 flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                                                        className: "w-3 h-3"
                                                    }),
                                                    "Selected sources will ground Agent-mode generation with cited passages — switch the Engine to Agent Mode and press Generate"
                                                ]
                                            })
                                        ]
                                    }),
                                    sourceMode === 'topic' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "mb-5",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                className: "text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2.5 block",
                                                children: "Topic"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                value: topic,
                                                onChange: (e)=>setTopic(e.target.value),
                                                onKeyDown: (e)=>e.key === 'Enter' && handleGenerate(),
                                                placeholder: "e.g. ACE inhibitors, COPD management, Multiple sclerosis...",
                                                className: "w-full bg-[#1a1e2b] border border-white/[0.08] rounded-xl px-4 py-3.5 text-[#e8ecf4] text-sm placeholder-[#3a4055] outline-none focus:border-[#00e5a0]/40 focus:ring-2 focus:ring-[#00e5a0]/10 transition-all"
                                            }),
                                            system && _lib_medq_types__WEBPACK_IMPORTED_MODULE_2__/* .TOPIC_MAP */ .L7[system] && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "flex flex-wrap gap-1.5 mt-2.5",
                                                children: _lib_medq_types__WEBPACK_IMPORTED_MODULE_2__/* .TOPIC_MAP */ .L7[system].map((t)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                        type: "button",
                                                        onClick: ()=>setTopic(t),
                                                        className: "px-3 py-1.5 rounded-lg text-xs font-medium border border-white/[0.06] bg-white/[0.03] text-[#5a6478] hover:bg-[#00e5a0]/[0.08] hover:border-[#00e5a0]/20 hover:text-[#00e5a0] transition-all",
                                                        children: t
                                                    }, t))
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "mt-3.5 rounded-xl border border-[#ff5757]/[0.15] bg-[#ff5757]/[0.03] p-3.5",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex items-center gap-2.5",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "w-8 h-8 rounded-lg bg-[#ff5757]/10 border border-[#ff5757]/20 flex items-center justify-center text-sm flex-shrink-0",
                                                                children: "\uD83C\uDFAF"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                className: "flex-1 min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                        className: "text-xs font-bold text-[#e8ecf4]",
                                                                        children: "Target my weaknesses"
                                                                    }),
                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                        className: "text-[10px] text-[#5a6478]",
                                                                        children: weakness ? `${weakness.overall.attempts} attempts analyzed · ${(weakness.overall.accuracy * 100).toFixed(0)}% overall accuracy` : 'analyzes your answers, then drills what you miss most'
                                                                    })
                                                                ]
                                                            }),
                                                            !weakness && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                type: "button",
                                                                onClick: loadWeaknessAnalysis,
                                                                disabled: weaknessLoading || generating,
                                                                className: "px-3.5 py-2 rounded-lg text-[11px] font-bold bg-white/[0.05] border border-white/[0.08] text-[#e8ecf4] hover:bg-white/[0.1] disabled:opacity-50 flex items-center gap-1.5 flex-shrink-0",
                                                                children: weaknessLoading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "w-3 h-3 border-2 border-[#5a6478]/40 border-t-[#e8ecf4] rounded-full animate-spin"
                                                                }) : 'Analyze'
                                                            })
                                                        ]
                                                    }),
                                                    weakness && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "mt-3",
                                                        children: weakness.weakAreas.length > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                    className: "space-y-1 mb-3",
                                                                    children: weakness.weakAreas.slice(0, 4).map((w, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                            className: "flex items-center gap-2 text-[11px]",
                                                                            children: [
                                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                                    className: "flex-1 truncate text-[#c8d0e0]",
                                                                                    children: [
                                                                                        w.topic ? `${w.topic}` : `${w.system}`,
                                                                                        " ",
                                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                                            className: "text-[#5a6478]",
                                                                                            children: [
                                                                                                "(",
                                                                                                w.system,
                                                                                                ")"
                                                                                            ]
                                                                                        })
                                                                                    ]
                                                                                }),
                                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                                    className: "w-20 h-1.5 rounded-full bg-white/[0.05] overflow-hidden flex-shrink-0",
                                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                                        className: "h-full rounded-full",
                                                                                        style: {
                                                                                            width: `${w.accuracy * 100}%`,
                                                                                            background: w.accuracy < 0.4 ? '#ff5757' : w.accuracy < 0.6 ? '#f59e0b' : '#4fc3f7'
                                                                                        }
                                                                                    })
                                                                                }),
                                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                                    className: "text-[10px] text-[#8b95a8] tabular-nums w-14 text-right flex-shrink-0",
                                                                                    children: [
                                                                                        (w.accuracy * 100).toFixed(0),
                                                                                        "% \xb7 ",
                                                                                        w.attempts
                                                                                    ]
                                                                                })
                                                                            ]
                                                                        }, i))
                                                                }),
                                                                engineMode === 'agent' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                                    type: "button",
                                                                    onClick: ()=>setIncludeWeakTopics((v)=>!v),
                                                                    className: `w-full mb-3 py-2 px-3 rounded-lg text-left text-[11px] font-semibold border transition-all flex items-center gap-2.5 ${includeWeakTopics ? 'bg-[#ff5757]/[0.14] border-[#ff5757]/40 text-[#ff8a8a]' : 'bg-white/[0.03] border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0]'}`,
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                            className: `w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 text-[9px] ${includeWeakTopics ? 'bg-[#ff5757] border-[#ff5757] text-white' : 'border-white/[0.2]'}`,
                                                                            children: includeWeakTopics ? '✓' : ''
                                                                        }),
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                            className: "flex-1",
                                                                            children: "Also target my weak areas in the main Generate run (top 5 above)"
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                                    type: "button",
                                                                    onClick: handleWeaknessGenerate,
                                                                    disabled: generating,
                                                                    className: "w-full py-2.5 rounded-lg text-[11px] font-bold bg-[#ff5757]/[0.12] text-[#ff8a8a] border border-[#ff5757]/30 hover:bg-[#ff5757]/[0.2] disabled:opacity-50 flex items-center justify-center gap-2",
                                                                    children: generating ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                                        children: [
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                                className: "w-3 h-3 border-2 border-[#ff5757]/30 border-t-[#ff8a8a] rounded-full animate-spin"
                                                                            }),
                                                                            "generating targeted questions…"
                                                                        ]
                                                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                                        children: [
                                                                            "\uD83C\uDFAF Generate ",
                                                                            weakness.recommendation.suggestedCount,
                                                                            " targeted questions — ",
                                                                            weakness.recommendation.system,
                                                                            " / ",
                                                                            weakness.recommendation.topic
                                                                        ]
                                                                    })
                                                                })
                                                            ]
                                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-[10px] text-[#5a6478] py-1.5",
                                                            children: "No weak areas detected yet — answer questions in the bank and the analyzer will find them."
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    sourceMode === 'file' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "mb-5",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                                className: "text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2.5 block",
                                                children: [
                                                    "Topic ",
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-[#3a4055] lowercase tracking-normal font-normal",
                                                        children: "(auto-detected, editable)"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                value: topic,
                                                onChange: (e)=>setTopic(e.target.value),
                                                placeholder: "Topic from file name...",
                                                className: "w-full bg-[#1a1e2b] border border-white/[0.08] rounded-xl px-4 py-3.5 text-[#e8ecf4] text-sm placeholder-[#3a4055] outline-none focus:border-[#4fc3f7]/40 focus:ring-2 focus:ring-[#4fc3f7]/10 transition-all"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "mb-5",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                                className: "text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2.5 block",
                                                children: [
                                                    "Medical System ",
                                                    sourceMode === 'file' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-[#3a4055] lowercase tracking-normal font-normal",
                                                        children: "(optional for files)"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                                value: system,
                                                onChange: (e)=>setSystem(e.target.value),
                                                className: "w-full bg-[#1a1e2b] border border-white/[0.08] rounded-xl px-4 py-3.5 text-[#e8ecf4] text-sm outline-none focus:border-[#00e5a0]/40 focus:ring-2 focus:ring-[#00e5a0]/10 transition-all appearance-none",
                                                style: {
                                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%235a6478' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'right 16px center'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                                        value: "",
                                                        children: "Select a system..."
                                                    }),
                                                    _lib_medq_types__WEBPACK_IMPORTED_MODULE_2__/* .MEDICAL_SYSTEMS */ .FU.map((s)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                                            value: s,
                                                            children: s
                                                        }, s))
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                        className: "text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2.5 block",
                                                        children: "Question Types"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "flex flex-wrap gap-2",
                                                        children: _lib_medq_types__WEBPACK_IMPORTED_MODULE_2__/* .QUESTION_TYPES */ .bU.map((type)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                                type: "button",
                                                                onClick: ()=>toggleType(type),
                                                                className: `inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeTypes.includes(type) ? 'bg-[#00e5a0]/10 border border-[#00e5a0]/35 text-[#00e5a0]' : 'bg-[#1a1e2b] border border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0]'}`,
                                                                children: [
                                                                    TYPE_ICONS[type],
                                                                    " ",
                                                                    TYPE_LABELS[type]
                                                                ]
                                                            }, type))
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                        className: "text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2.5 block",
                                                        children: "Difficulty"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "flex flex-wrap gap-2",
                                                        children: _lib_medq_types__WEBPACK_IMPORTED_MODULE_2__/* .DIFFICULTY_OPTIONS */ .rX.map((diff)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                                type: "button",
                                                                onClick: ()=>toggleDiff(diff),
                                                                className: `inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeDiffs.includes(diff) ? 'bg-[#00e5a0]/10 border border-[#00e5a0]/35 text-[#00e5a0]' : 'bg-[#1a1e2b] border border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0]'}`,
                                                                children: [
                                                                    DIFF_ICONS[diff],
                                                                    " ",
                                                                    diff
                                                                ]
                                                            }, diff))
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "mb-6 max-w-[160px]",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                className: "text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2.5 block",
                                                children: "Count"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                type: "number",
                                                min: 1,
                                                max: 100,
                                                value: count,
                                                onChange: (e)=>setCount(Math.min(Math.max(parseInt(e.target.value) || 1, 1), 100)),
                                                className: "w-20 bg-[#1a1e2b] border border-white/[0.08] rounded-xl px-4 py-3.5 text-[#e8ecf4] text-sm text-center outline-none focus:border-[#00e5a0]/40 focus:ring-2 focus:ring-[#00e5a0]/10 transition-all"
                                            })
                                        ]
                                    }),
                                    sourceMode === 'topic' && (engineMode === 'agent' || knowledgeSourceIds.length > 0) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "mb-6 space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                                        className: "text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2.5 block",
                                                        children: [
                                                            "Extra Guidance ",
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "text-[#3a4055] lowercase tracking-normal font-normal",
                                                                children: "(optional — passed to the deep agent)"
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                                                        value: focusHint,
                                                        onChange: (e)=>setFocusHint(e.target.value.slice(0, 400)),
                                                        rows: 2,
                                                        placeholder: "e.g. focus on diagnosis dilemmas, include an ECG image with every question, avoid drug trade names…",
                                                        className: "w-full bg-[#1a1e2b] border border-white/[0.08] rounded-xl px-4 py-3 text-[#e8ecf4] text-sm placeholder-[#3a4055] outline-none focus:border-[#00e5a0]/40 focus:ring-2 focus:ring-[#00e5a0]/10 transition-all resize-none"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                        className: "text-[10px] text-[#5a6478] mt-1.5 flex items-center gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                                                className: "w-3 h-3 text-[#00e5a0]/70"
                                                            }),
                                                            "Steers the agent's authoring choices: emphasis, media requirements, style constraints. ",
                                                            400 - focusHint.length,
                                                            " characters left."
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                                        className: "text-xs font-semibold uppercase tracking-widest text-[#5a6478] mb-2.5 block",
                                                        children: [
                                                            "Model ",
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "text-[#3a4055] lowercase tracking-normal font-normal",
                                                                children: "(optional override)"
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                        value: modelOverride,
                                                        onChange: (e)=>setModelOverride(e.target.value),
                                                        placeholder: accountModel ? `Account default: ${accountModel}` : 'Account default (set one in settings)',
                                                        className: "w-full bg-[#1a1e2b] border border-white/[0.08] rounded-xl px-4 py-3 text-[#e8ecf4] text-sm placeholder-[#3a4055] outline-none focus:border-[#00e5a0]/40 focus:ring-2 focus:ring-[#00e5a0]/10 transition-all"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                        className: "text-[10px] text-[#5a6478] mt-1.5 flex items-center gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                                                className: "w-3 h-3 text-[#00e5a0]/70"
                                                            }),
                                                            "Format “provider:model”, e.g. zai:glm-4.5. Leave empty to use your account default model."
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "lg:sticky lg:bottom-0 lg:z-10 lg:-mx-6 lg:-mb-6 lg:px-6 lg:pt-3 lg:pb-5 lg:bg-[#151821] lg:border-t lg:border-white/[0.07] lg:rounded-b-2xl",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            type: "button",
                                            onClick: handleGenerate,
                                            disabled: generating || genMode === 'online' && !isOnline || isFileMode && !extractedFile,
                                            className: `w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2.5 ${genMode === 'online' && !isOnline || isFileMode && !extractedFile ? 'bg-[#3a4055]/50 cursor-not-allowed text-[#5a6478]' : generating ? isFileMode ? 'bg-gradient-to-r from-[#4fc3f7]/70 to-[#039be5]/70 cursor-not-allowed text-[#0c0e14]/70 shadow-lg shadow-[#4fc3f7]/15' : genMode === 'offline' ? 'bg-gradient-to-r from-[#8b5cf6]/70 to-[#7c3aed]/70 cursor-not-allowed text-white/70 shadow-lg shadow-[#8b5cf6]/15' : 'bg-gradient-to-r from-[#00e5a0]/70 to-[#00c48c]/70 cursor-not-allowed text-[#0c0e14]/70 shadow-lg shadow-[#00e5a0]/15' : isFileMode ? 'bg-gradient-to-r from-[#4fc3f7] to-[#039be5] text-[#0c0e14] shadow-lg shadow-[#4fc3f7]/25 hover:-translate-y-0.5 hover:shadow-[#4fc3f7]/35' : genMode === 'offline' ? 'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white shadow-lg shadow-[#8b5cf6]/25 hover:-translate-y-0.5 hover:shadow-[#8b5cf6]/35' : 'bg-gradient-to-r from-[#00e5a0] to-[#00c48c] text-[#0c0e14] shadow-lg shadow-[#00e5a0]/25 hover:-translate-y-0.5 hover:shadow-[#00e5a0]/35'}`,
                                            children: genMode === 'online' && !isOnline ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_39__/* ["default"] */ .A, {
                                                        className: "w-4 h-4"
                                                    }),
                                                    " Offline — Switch to Offline Mode"
                                                ]
                                            }) : isFileMode && !extractedFile ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                                        className: "w-4 h-4"
                                                    }),
                                                    " Upload a file first"
                                                ]
                                            }) : generating ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                                        className: "w-4 h-4 animate-spin"
                                                    }),
                                                    " Generating..."
                                                ]
                                            }) : isFileMode ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                                        className: "w-4 h-4"
                                                    }),
                                                    " Generate from File (AI)"
                                                ]
                                            }) : genMode === 'offline' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                children: [
                                                    aiModelStatus.loaded ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                                        className: "w-4 h-4"
                                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                                        className: "w-4 h-4"
                                                    }),
                                                    " ",
                                                    aiModelStatus.loaded ? 'Generate Questions (Browser AI)' : 'Generate Questions (Offline)'
                                                ]
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                children: [
                                                    engineMode === 'agent' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_33__/* ["default"] */ .A, {
                                                        className: "w-4 h-4"
                                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                                        className: "w-4 h-4"
                                                    }),
                                                    " Generate ",
                                                    count,
                                                    " Question",
                                                    count > 1 ? 's' : '',
                                                    " (",
                                                    engineMode === 'agent' ? 'Agent' : 'AI',
                                                    ")"
                                                ]
                                            })
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        ref: workspaceRef,
                        className: "min-w-0 scroll-mt-4",
                        children: [
                            generating && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "mb-6 rounded-2xl overflow-hidden border border-[#00e5a0]/20 bg-[#151821]",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "px-6 py-5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-3 mb-3",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "w-9 h-9 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                                        className: "w-5 h-5 text-[#00e5a0] animate-spin"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "text-sm font-bold text-[#e8ecf4]",
                                                            children: progressMsg || 'Preparing generation...'
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                            className: "text-[11px] text-[#5a6478] mt-0.5",
                                                            children: [
                                                                questions.length > 0 ? `${questions.length} of ${count} question${count > 1 ? 's' : ''} ready` : `Generating ${count} question${count > 1 ? 's' : ''} about ${topic || 'your topic'}`,
                                                                socketConnected && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "text-[#00e5a0] ml-2",
                                                                    children: "⚡ Real-time"
                                                                }),
                                                                !socketConnected && genMode === 'online' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                    className: "text-[#ffb347] ml-2",
                                                                    children: "\uD83D\uDCE1 Polling..."
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    type: "button",
                                                    onClick: ()=>{
                                                        setGenerating(false);
                                                        setProgressMsg('');
                                                        stopListening();
                                                        if (genTimeoutRef.current) {
                                                            clearTimeout(genTimeoutRef.current);
                                                            genTimeoutRef.current = null;
                                                        }
                                                        (0,sonner__WEBPACK_IMPORTED_MODULE_10__.toast)('Generation cancelled', {
                                                            description: `${questions.length} question${questions.length !== 1 ? 's' : ''} were already saved.`
                                                        });
                                                    },
                                                    className: "p-2 rounded-lg text-[#5a6478] hover:text-[#ff5757] hover:bg-[#ff5757]/10 transition-all cursor-pointer",
                                                    title: "Cancel generation",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                                                        className: "w-4 h-4"
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "w-full bg-white/[0.04] rounded-full h-2 overflow-hidden",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "h-2 rounded-full bg-gradient-to-r from-[#00e5a0] to-[#4fc3f7] transition-all duration-700 ease-out",
                                                style: {
                                                    width: questions.length > 0 ? `${Math.round(questions.length / count * 100)}%` : progressMsg.includes('Connecting') ? '10%' : '20%'
                                                }
                                            })
                                        })
                                    ]
                                })
                            }),
                            questions.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center justify-between mb-5 pb-4 border-b border-white/[0.05]",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-3 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                                        className: "text-lg font-bold text-[#e8ecf4] truncate",
                                                        children: topic
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "text-xs text-[#5a6478] font-medium flex-shrink-0",
                                                        children: [
                                                            questions.length,
                                                            " question",
                                                            questions.length > 1 ? 's' : '',
                                                            generating && ` · ${count - questions.length} more coming...`,
                                                            !generating && ` · ${system || 'General'}`
                                                        ]
                                                    }),
                                                    isFileMode && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#4fc3f7]/10 text-[#4fc3f7] border border-[#4fc3f7]/25",
                                                        children: "From File"
                                                    }),
                                                    questions[0]?.isAIGenerated === false && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#8b5cf6]/10 text-[#8b5cf6] border border-[#8b5cf6]/25",
                                                        children: "Offline Generated"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2 flex-shrink-0",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                        type: "button",
                                                        onClick: async ()=>{
                                                            setDownloading('json');
                                                            try {
                                                                await (0,_lib_download_utils__WEBPACK_IMPORTED_MODULE_5__/* .downloadAsJSON */ .ni)(questions);
                                                                sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success('Downloaded JSON');
                                                            } catch  {
                                                                sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('Failed');
                                                            } finally{
                                                                setDownloading(null);
                                                            }
                                                        },
                                                        disabled: downloading !== null,
                                                        className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1a1e2b] border border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0] transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_40__/* ["default"] */ .A, {
                                                                className: "w-3.5 h-3.5"
                                                            }),
                                                            " ",
                                                            downloading === 'json' ? 'Saving…' : 'JSON'
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                        type: "button",
                                                        onClick: async ()=>{
                                                            setDownloading('pdf');
                                                            try {
                                                                await (0,_lib_download_utils__WEBPACK_IMPORTED_MODULE_5__/* .downloadAsPDF */ .pQ)(questions);
                                                                sonner__WEBPACK_IMPORTED_MODULE_10__.toast.success('Downloaded PDF');
                                                            } catch  {
                                                                sonner__WEBPACK_IMPORTED_MODULE_10__.toast.error('Failed');
                                                            } finally{
                                                                setDownloading(null);
                                                            }
                                                        },
                                                        disabled: downloading !== null,
                                                        className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1a1e2b] border border-white/[0.08] text-[#8b95a8] hover:border-white/[0.15] hover:text-[#c8d0e0] transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_41__/* ["default"] */ .A, {
                                                                className: "w-3.5 h-3.5"
                                                            }),
                                                            " ",
                                                            downloading === 'pdf' ? 'Generating…' : 'PDF'
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "flex flex-col gap-6",
                                        children: questions.map((q, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_QuestionCard__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                                question: q,
                                                index: idx
                                            }, q.id || idx))
                                    })
                                ]
                            }),
                            questions.length === 0 && !generating && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "rounded-2xl border border-dashed border-white/[0.09] bg-white/[0.015] lg:min-h-[540px] flex flex-col items-center justify-center text-center px-6 py-14",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00e5a0]/15 to-[#4fc3f7]/10 border border-white/[0.06] flex items-center justify-center mb-5",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_42__/* ["default"] */ .A, {
                                            className: "w-8 h-8 text-[#00e5a0]/80"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                        className: "text-lg font-bold text-[#c8d0e0]",
                                        children: "Generated questions will appear here"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-sm text-[#5a6478] mt-2 max-w-md leading-relaxed",
                                        children: "Configure the generator and press Generate — questions stream in live, one by one, and are auto-saved to your Bank."
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex flex-wrap items-center justify-center gap-2 mt-6",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-[#00e5a0]/[0.07] border border-[#00e5a0]/15 text-[#00e5a0]/90",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                                                        className: "w-3 h-3"
                                                    }),
                                                    " By topic"
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-[#4fc3f7]/[0.07] border border-[#4fc3f7]/15 text-[#4fc3f7]/90",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                                        className: "w-3 h-3"
                                                    }),
                                                    " From files"
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-[#8b5cf6]/[0.07] border border-[#8b5cf6]/15 text-[#8b5cf6]/90",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_34__/* ["default"] */ .A, {
                                                        className: "w-3 h-3"
                                                    }),
                                                    " Knowledge library"
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[11px] text-[#3a4055] mt-5",
                                        children: "Works online (AI) and offline (built-in engine + browser AI)"
                                    }),
                                    isWebGpuSupported && !aiModelStatus.loaded && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        type: "button",
                                        onClick: ()=>setShowAiPanel(true),
                                        className: "mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6] hover:bg-[#8b5cf6]/20 transition-all cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_Bolt_Bot_Brain_CheckCircle2_CloudOff_Cpu_Database_Download_Eye_File_FileJson_FileText_FileType2_FileUp_Flame_Library_ListChecks_Loader2_PenLine_Skull_Sparkles_Sprout_ToggleLeft_Trash2_Upload_WifiOff_X_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5"
                                            }),
                                            " Download Browser AI for True Offline AI"
                                        ]
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


/***/ }),

/***/ 369013:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Presentation)
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
    name: "presentation",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M2 3h20",
                key: "91anmk"
            }
        ],
        [
            "path",
            {
                d: "M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3",
                key: "2k9sn8"
            }
        ],
        [
            "path",
            {
                d: "m7 21 5-5 5 5",
                key: "bip4we"
            }
        ]
    ]
};
__iconData.node;
const Presentation = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=presentation.mjs.map


/***/ }),

/***/ 379551:
/***/ ((module) => {

"use strict";
module.exports = require("url");

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

/***/ 435364:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ CloudOff)
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
    name: "cloud-off",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M10.94 5.274A7 7 0 0 1 15.71 10h1.79a4.5 4.5 0 0 1 4.222 6.057",
                key: "1uxyv8"
            }
        ],
        [
            "path",
            {
                d: "M18.796 18.81A4.5 4.5 0 0 1 17.5 19H9A7 7 0 0 1 5.79 5.78",
                key: "99tcn7"
            }
        ],
        [
            "path",
            {
                d: "m2 2 20 20",
                key: "1ooewy"
            }
        ]
    ]
};
__iconData.node;
const CloudOff = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=cloud-off.mjs.map


/***/ }),

/***/ 436274:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Database)
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
    name: "database",
    size: 24,
    node: [
        [
            "ellipse",
            {
                cx: "12",
                cy: "5",
                rx: "9",
                ry: "3",
                key: "msslwz"
            }
        ],
        [
            "path",
            {
                d: "M3 5V19A9 3 0 0 0 21 19V5",
                key: "1wlel7"
            }
        ],
        [
            "path",
            {
                d: "M3 12A9 3 0 0 0 21 12",
                key: "mv7ke4"
            }
        ]
    ]
};
__iconData.node;
const Database = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=database.mjs.map


/***/ }),

/***/ 455511:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 475952:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 918597));


/***/ }),

/***/ 481649:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ KnowledgeLibraryPanel)
/* harmony export */ });
/* unused harmony export kindBadge */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(890707);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(432474);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(59742);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(541687);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(915741);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(132602);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(269357);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(269627);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(185448);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(877265);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(405430);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(41034);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(126773);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(954171);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(673097);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(645535);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(789216);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(550565);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(199646);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(334460);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(682902);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(762840);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(357509);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(880592);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(239041);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(229813);
/* harmony import */ var _AudioRecorder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(727408);
/* harmony import */ var _SourceViewerModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(216252);
/* harmony import */ var _TranscriptStudioModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(877971);
/* harmony import */ var _DrivePickerModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(715259);
/* harmony import */ var _lib_uploads_chunked_upload_client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(197944);
/* __next_internal_client_entry_do_not_use__ kindBadge,default auto */ 
/**
 * Knowledge Library panel — the RAG management UI on the Generate page.
 *
 * Capabilities:
 *   - Upload ANY supported file (PDF, DOCX, TXT/MD, audio, video, images)
 *     to /api/knowledge/upload → server-side parsing (ASR / VLM OCR / text
 *     extraction) → chunk → contextual enrichment → embedding → indexed.
 *   - Paste a URL (YouTube video, Google Drive / Docs / Sheets share link,
 *     Dropbox, or any direct file URL) → background download + ingestion.
 *   - CONNECTED Google Drive (OAuth): browse + import private files via the
 *     DrivePickerModal (setup guide shown when the server has no OAuth
 *     client configured yet).
 *   - Live status polling while sources are pending/processing.
 *   - OPEN any file (click its name or the eye icon) to view the extracted
 *     content / transcript and the indexed passages (SourceViewerModal).
 *   - Select sources to ground agent question generation (RAG citations).
 *   - Delete sources.
 *   - "Test retrieval" box hitting /api/knowledge/search with full hybrid
 *     diagnostics (dense / BM25 / rerank scores) — visible quality feedback.
 */ 







const KIND_ICON = {
    audio: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
        className: "w-3.5 h-3.5"
    }),
    video: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
        className: "w-3.5 h-3.5"
    }),
    image: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
        className: "w-3.5 h-3.5"
    }),
    document: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
        className: "w-3.5 h-3.5"
    }),
    url: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
        className: "w-3.5 h-3.5"
    }),
    text: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
        className: "w-3.5 h-3.5"
    })
};
const KIND_COLOR = {
    audio: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
    video: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
    image: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
    document: 'text-[#4fc3f7] bg-[#4fc3f7]/10 border-[#4fc3f7]/30'
};
function kindBadge(kind) {
    const icon = KIND_ICON[kind] ?? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
        className: "w-3.5 h-3.5"
    });
    const color = KIND_COLOR[kind] ?? 'text-[#8b95a8] bg-white/[0.05] border-white/10';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
        className: `inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border text-[10px] font-semibold ${color}`,
        children: [
            icon,
            kind
        ]
    });
}
// Exported so the viewer modal reuses the exact same badge renderer.

function formatDuration(sec) {
    if (!sec) return '';
    const m = Math.floor(sec / 60);
    const s = Math.round(sec % 60);
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
}
function formatBytes2(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
function formatElapsed(startedAtMs) {
    const sec = Math.max(0, Math.round((Date.now() - startedAtMs) / 1000));
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m > 0 ? `${m}m ${String(s).padStart(2, '0')}s` : `${s}s`;
}
/** Friendly labels for the server-side ingestion stages. */ const STAGE_LABELS = {
    preparing: 'Reading the file',
    extracting: 'Extracting text',
    transcribing: 'Transcribing / analyzing media',
    storing: 'Storing the original for preview',
    chunking: 'Splitting into passages',
    enriching: 'Summarizing passages',
    embedding: 'Generating embeddings',
    saving: 'Writing to your index',
    downloading: 'Downloading',
    reading: 'Reading the page'
};
function stageLabel(progress) {
    if (!progress) return 'Processing on the server…';
    if (progress.note) return progress.note;
    return STAGE_LABELS[progress.stage] ?? progress.stage;
}
/** XHR upload with real byte-level progress (fetch cannot report upload
 *  progress) — resolves with the parsed JSON response. The running request
 *  is registered in `registry` so the UI can cancel it mid-flight. */ function xhrUpload(file, registry, key, onProgress) {
    return new Promise((resolve)=>{
        const form = new FormData();
        form.append('file', file, file.name);
        const xhr = new XMLHttpRequest();
        registry.set(key, xhr);
        xhr.open('POST', '/api/knowledge/upload');
        xhr.upload.onprogress = (e)=>{
            if (e.lengthComputable) onProgress(e.loaded, e.total);
        };
        xhr.onload = ()=>{
            registry.delete(key);
            let json = null;
            try {
                json = JSON.parse(xhr.responseText);
            } catch  {}
            resolve({
                ok: xhr.status >= 200 && xhr.status < 300,
                status: xhr.status,
                json
            });
        };
        xhr.onerror = ()=>{
            registry.delete(key);
            resolve({
                ok: false,
                status: 0,
                json: null
            });
        };
        xhr.onabort = ()=>{
            registry.delete(key);
            resolve({
                ok: false,
                status: -1,
                json: null
            });
        };
        xhr.send(form);
    });
}
async function startResumableTransfer(file, key, registry, onUpdate) {
    const resumeUploadId = (0,_lib_uploads_chunked_upload_client__WEBPACK_IMPORTED_MODULE_7__/* .recallResumableUpload */ .xy)(file) ?? undefined;
    const handle = (0,_lib_uploads_chunked_upload_client__WEBPACK_IMPORTED_MODULE_7__/* .uploadFileResumable */ .e1)(file, {
        resumeUploadId,
        onResumed: (bytes)=>{
            onUpdate({
                resumedFrom: bytes
            });
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.info(`Resuming "${file.name}" — ${formatBytes2(bytes)} already uploaded`);
        },
        onProgress: (p)=>onUpdate({
                sent: p.uploadedBytes,
                speed: p.bytesPerSecond,
                etaSec: p.etaSeconds,
                error: undefined
            }),
        onRetrying: ({ attempt })=>onUpdate({
                error: `Retry ${attempt + 1}: connection hiccup — continuing from the last confirmed chunk…`
            })
    });
    registry.set(key, handle);
    try {
        const { uploadId } = await handle.promise;
        onUpdate({
            speed: 0,
            etaSec: null,
            error: undefined
        });
        // Ingest the ALREADY-UPLOADED bytes by reference — no second transfer.
        const form = new FormData();
        form.append('uploadId', uploadId);
        form.append('origin', 'library');
        const res = await fetch('/api/knowledge/upload', {
            method: 'POST',
            body: form
        });
        const json = await res.json().catch(()=>null);
        return {
            ok: res.ok && !!json?.sourceId,
            status: res.status,
            json
        };
    } catch (error) {
        if (error instanceof _lib_uploads_chunked_upload_client__WEBPACK_IMPORTED_MODULE_7__/* .UploadCancelledError */ .xT) return {
            ok: false,
            status: -1,
            json: null
        };
        return {
            ok: false,
            status: 0,
            json: {
                error: error instanceof Error ? error.message : 'Upload failed'
            }
        };
    } finally{
        registry.delete(key);
    }
}
/** Upload one file: small files take the single-request XHR fast path; large
 *  files take the resumable chunked path. Same TransferResult contract. */ async function startTransfer(file, key, xhrRegistry, controllerRegistry, onUpdate) {
    if (file.size > _lib_uploads_chunked_upload_client__WEBPACK_IMPORTED_MODULE_7__/* .RESUMABLE_THRESHOLD_BYTES */ .zo) {
        return startResumableTransfer(file, key, controllerRegistry, onUpdate);
    }
    return xhrUpload(file, xhrRegistry, key, (sent)=>onUpdate({
            sent
        }));
}
function KnowledgeLibraryPanel({ selectedIds, onToggle, onSourcesReady, autoSelectNew }) {
    const [sources, setSources] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [loaded, setLoaded] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /** Live upload/ingestion cards — THE progress UI (replaces the old invisible
   *  `uploading` string array that was tracked but never rendered). */ const [transfers, setTransfers] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    /** Running upload XHRs, so the ✕ button can cancel mid-flight. */ const xhrRegistry = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(new Map());
    /** Running resumable-upload controllers — pause / resume / cancel (Stage 13). */ const uploadControllers = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(new Map());
    const [collapsed, setCollapsed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [searchQuery, setSearchQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [searching, setSearching] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [searchResult, setSearchResult] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [openSource, setOpenSource] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [urlInput, setUrlInput] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [addingUrl, setAddingUrl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [driveOpen, setDriveOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const uploadRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [retryingIds, setRetryingIds] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Set());
    /** Sources currently being re-indexed (sentence-aware chunk upgrade). */ const [reindexingIds, setReindexingIds] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Set());
    const refresh = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        try {
            const res = await fetch('/api/knowledge/sources');
            if (!res.ok) return [];
            const json = await res.json();
            const list = json.sources ?? [];
            setSources(list);
            setLoaded(true);
            return list;
        } catch  {
            return [];
        }
    }, []);
    const readyNewRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(new Set());
    // OAuth-callback toast (?drive=connected|denied|… set by the Drive callback
    // redirect) — cleans the URL and opens the picker after a fresh connect.
    // Deferred one tick so the effect only reads the external system (the URL);
    // the state update happens in a callback, not synchronously in the effect.
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (true) return;
        const flag = new URLSearchParams(window.location.search).get('drive');
        if (!flag) return;
        const t = setTimeout(()=>{
            if (flag === 'connected') {
                sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success('Google Drive connected — browse and import your files');
                setDriveOpen(true);
            } else if (flag === 'denied') sonner__WEBPACK_IMPORTED_MODULE_2__.toast.info('Google Drive connection was cancelled');
            else if (flag === 'state-mismatch') sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Drive connection could not be verified — try connecting again');
            else if (flag === 'unconfigured') sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Google Drive is not configured on this server yet — see the setup guide');
            else if (flag) sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error('Google Drive connection failed — try again');
            window.history.replaceState({}, '', window.location.pathname);
        }, 0);
        return ()=>clearTimeout(t);
    }, []);
    // ── Polling loop, DERIVED FROM STATE (self-healing by construction) ──
    // The interval exists exactly while there is pending work — any source
    // pending/processing OR any live transfer card. No imperative
    // arm/disarm bookkeeping (the previous version could end up with a dead
    // interval after rapid effect re-runs, leaving the progress UI frozen).
    const tick = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        const list = await refresh();
        // Notify the parent about sources that became ready — checked EVERY tick
        // (previously only fired when polling stopped, so multi-file uploads
        // waited for the slowest file before any toast).
        const newly = list.filter((s)=>s.status === 'ready' && !readyNewRef.current.has(s.id));
        if (newly.length) {
            newly.forEach((s)=>readyNewRef.current.add(s.id));
            onSourcesReady?.(newly);
        }
        // Retire transfer cards whose source finished (ready or failed).
        const activeIds = new Set(list.filter((s)=>s.status === 'pending' || s.status === 'processing').map((s)=>s.id));
        setTransfers((ts)=>ts.filter((t)=>{
                if (t.phase !== 'server' || !t.sourceId) return true; // still uploading → keep
                return activeIds.has(t.sourceId);
            }));
    }, [
        refresh,
        onSourcesReady
    ]);
    // Keep the freshest tick in a ref so effects can always call the latest
    // closure without depending on its identity (no effect churn).
    const tickRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(tick);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        tickRef.current = tick;
    }, [
        tick
    ]);
    const pendingWork = sources.some((s)=>s.status === 'pending' || s.status === 'processing') || transfers.length > 0;
    // Initial list load (mount) — also covers reloads mid-processing.
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        void tickRef.current();
    }, []);
    // The ONE interval owner: armed while work is pending, cleared by React
    // when it drains. Re-arms automatically whenever new work appears.
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!pendingWork) return;
        void tickRef.current(); // instant feedback the moment work appears
        const id = setInterval(()=>void tickRef.current(), 1500);
        return ()=>clearInterval(id);
    }, [
        pendingWork
    ]);
    const uploadFiles = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (files, opts)=>{
        if (!files.length) return;
        const forceAutoSelect = opts?.autoSelect === true;
        for (const file of files.slice(0, 8)){
            const key = `${file.name}:${file.size}`;
            const startedAt = Date.now();
            setTransfers((ts)=>[
                    ...ts.filter((t)=>t.key !== key),
                    {
                        key,
                        name: file.name,
                        size: file.size,
                        sent: 0,
                        phase: 'uploading',
                        startedAt,
                        chunked: file.size > _lib_uploads_chunked_upload_client__WEBPACK_IMPORTED_MODULE_7__/* .RESUMABLE_THRESHOLD_BYTES */ .zo
                    }
                ]);
            // pendingWork flips true on the next render → the derived polling
            // effect arms itself. No manual re-arm needed.
            const { ok, status, json } = await startTransfer(file, key, xhrRegistry.current, uploadControllers.current, (patch)=>{
                setTransfers((ts)=>ts.map((t)=>t.key === key ? {
                            ...t,
                            ...patch
                        } : t));
            });
            if (ok && json?.sourceId) {
                const sourceId = json.sourceId;
                setTransfers((ts)=>ts.map((t)=>t.key === key ? {
                            ...t,
                            phase: 'server',
                            sourceId
                        } : t));
                readyNewRef.current.delete(sourceId);
                if (forceAutoSelect || autoSelectNew) onToggle(sourceId);
                const isMedia = file.type.startsWith('audio/') || file.type.startsWith('video/');
                sonner__WEBPACK_IMPORTED_MODULE_2__.toast.info(`Uploaded "${file.name}" — ${isMedia || file.size > 1024 * 1024 ? 'transcription takes 1-3 min, watch the progress below' : 'indexing usually takes <15s'}`);
            } else {
                setTransfers((ts)=>ts.filter((t)=>t.key !== key));
                if (status === -1) {
                    sonner__WEBPACK_IMPORTED_MODULE_2__.toast.info(`Cancelled "${file.name}"${file.size > _lib_uploads_chunked_upload_client__WEBPACK_IMPORTED_MODULE_7__/* .RESUMABLE_THRESHOLD_BYTES */ .zo ? ' — pick the file again to resume where it left off' : ''}`);
                } else sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(`Upload failed: ${json?.error || (status ? `HTTP ${status}` : 'network error')}`);
            }
        }
        void refresh();
    }, [
        autoSelectNew,
        onToggle,
        refresh
    ]);
    /** Cancel an in-flight upload / dismiss a finished card. */ const dismissTransfer = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((key)=>{
        const controller = uploadControllers.current.get(key);
        if (controller) controller.cancel(); // rejects the promise → card removed in uploadFiles
        else {
            const xhr = xhrRegistry.current.get(key);
            if (xhr) xhr.abort(); // resolves the promise → card removed in uploadFiles
            else setTransfers((ts)=>ts.filter((t)=>t.key !== key));
        }
    }, []);
    /** Pause / resume a chunked upload — confirmed chunks stay on the server,
   *  so resuming continues from the last one that landed (Stage 13). */ const togglePauseTransfer = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((key)=>{
        const controller = uploadControllers.current.get(key);
        if (!controller) return;
        setTransfers((ts)=>ts.map((t)=>{
                if (t.key !== key || !t.chunked) return t;
                if (t.paused) controller.resume();
                else controller.pause();
                return {
                    ...t,
                    paused: !t.paused,
                    speed: t.paused ? t.speed : 0
                };
            }));
    }, []);
    const onDrop = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((e)=>{
        e.preventDefault();
        e.stopPropagation();
        const files = Array.from(e.dataTransfer.files || []);
        if (files.length) void uploadFiles(files);
    }, [
        uploadFiles
    ]);
    const addUrl = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        const url = urlInput.trim();
        if (!url || addingUrl) return;
        setAddingUrl(true);
        try {
            const res = await fetch('/api/knowledge/sources', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'url',
                    url
                })
            });
            const json = await res.json();
            if (!res.ok) {
                sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(`Could not add link: ${json.error || res.status}`);
                return;
            }
            setUrlInput('');
            if (autoSelectNew) onToggle(json.sourceId);
            const isYouTube = /\byoutu\.?be\b|youtube\.com/i.test(url);
            const isDrive = /drive\.google|docs\.google/i.test(url);
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.info(isYouTube ? 'Downloading video & extracting audio + on-screen text — takes 1-3 min, watch the status below' : isDrive ? 'Fetching from Google Drive — large files take a minute' : 'Reading the link — usually under 30s');
        } catch (e) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(e instanceof Error ? e.message : 'Could not add link');
        } finally{
            setAddingUrl(false);
            void refresh();
        }
    }, [
        urlInput,
        addingUrl,
        autoSelectNew,
        onToggle,
        refresh
    ]);
    const retrySource = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (id)=>{
        if (retryingIds.has(id)) return;
        setRetryingIds((prev)=>new Set(prev).add(id));
        try {
            const res = await fetch(`/api/knowledge/sources/${id}/retry`, {
                method: 'POST'
            });
            const json = await res.json();
            if (!res.ok) {
                sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(`Could not retry: ${json.error || res.status}`);
                return;
            }
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.info('Retrying — downloading and indexing the link again');
            void tick(); // immediate refresh; the source flips to pending → the derived polling effect arms itself
        } catch (e) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(e instanceof Error ? e.message : 'Could not retry');
        } finally{
            setRetryingIds((prev)=>{
                const next = new Set(prev);
                next.delete(id);
                return next;
            });
            void refresh();
        }
    }, [
        retryingIds,
        refresh,
        tick
    ]);
    /** Re-chunk an already-indexed source with the sentence-aware chunker +
   *  extraction normalization — upgrades sources whose passages were cut
   *  mid-word / mid-sentence by the old character-stride splitter. */ const reindexSource = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (id)=>{
        if (reindexingIds.has(id)) return;
        setReindexingIds((prev)=>new Set(prev).add(id));
        try {
            const res = await fetch(`/api/knowledge/sources/${id}/reindex`, {
                method: 'POST'
            });
            const json = await res.json().catch(()=>({}));
            if (!res.ok) {
                sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(`Could not re-index: ${json.error || res.status}`);
                return;
            }
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.info('Re-indexing — rebuilding passages on clean sentence boundaries');
            void tick(); // immediate refresh; the source flips to processing → the derived polling effect arms itself
        } catch (e) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(e instanceof Error ? e.message : 'Could not re-index');
        } finally{
            setReindexingIds((prev)=>{
                const next = new Set(prev);
                next.delete(id);
                return next;
            });
            void refresh();
        }
    }, [
        reindexingIds,
        refresh,
        tick
    ]);
    const deleteSource = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (id, name)=>{
        try {
            const res = await fetch(`/api/knowledge/sources/${id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success(`Removed "${name}" from the library`);
            void refresh();
        } catch (e) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(e instanceof Error ? e.message : 'Delete failed');
        }
    }, [
        refresh
    ]);
    const runSearch = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        const q = searchQuery.trim();
        if (!q) return;
        setSearching(true);
        setSearchResult(null);
        try {
            const res = await fetch('/api/knowledge/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: q,
                    topK: 5
                })
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
            setSearchResult(json);
        } catch (e) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(e instanceof Error ? e.message : 'Search failed');
        } finally{
            setSearching(false);
        }
    }, [
        searchQuery
    ]);
    const busyCount = sources.filter((s)=>s.status === 'pending' || s.status === 'processing').length;
    const readyCount = sources.filter((s)=>s.status === 'ready').length;
    const totalChunks = sources.reduce((sum, s)=>sum + (s.meta?.chunks ?? 0), 0);
    const uploadingCount = transfers.filter((t)=>t.phase === 'uploading').length;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "rounded-2xl border border-white/[0.08] bg-[#141926] overflow-hidden",
        onDrop: onDrop,
        onDragOver: (e)=>{
            e.preventDefault();
            e.stopPropagation();
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                type: "button",
                onClick: ()=>setCollapsed((c)=>!c),
                className: "w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                className: "w-4 h-4 text-[#4fc3f7]"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-xs font-semibold tracking-wide text-[#c8d0e0]",
                                children: "Knowledge Library (RAG)"
                            }),
                            (busyCount > 0 || uploadingCount > 0) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#f59e0b] text-[10px] font-semibold",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                        className: "w-3 h-3 animate-spin"
                                    }),
                                    uploadingCount > 0 ? `${uploadingCount} uploading` : `${busyCount} processing`
                                ]
                            }),
                            selectedIds.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "px-1.5 py-0.5 rounded-md bg-[#00e5a0]/10 border border-[#00e5a0]/30 text-[#00e5a0] text-[10px] font-semibold",
                                children: [
                                    selectedIds.length,
                                    " selected"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2 text-[10px] text-[#5a6478]",
                        children: [
                            loaded && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    readyCount,
                                    " sources \xb7 ",
                                    totalChunks,
                                    " passages"
                                ]
                            }),
                            collapsed ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        ]
                    })
                ]
            }),
            !collapsed && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "px-4 pb-4 space-y-4 border-t border-white/[0.06] pt-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "text-[10px] text-[#5a6478] flex items-start gap-1.5 leading-relaxed",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                className: "w-3 h-3 mt-0.5 shrink-0"
                            }),
                            "Upload lectures, notes, PDFs, audio or video recordings. Files are transcribed/extracted, chunked and embedded into your personal retrieval index. Select sources to ground agent generation — questions will cite the exact passages they were built from."
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        onClick: ()=>uploadRef.current?.click(),
                        className: "border-2 border-dashed border-white/[0.12] rounded-xl p-4 text-center cursor-pointer hover:border-[#4fc3f7]/40 hover:bg-[#4fc3f7]/[0.03] transition-all",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                ref: uploadRef,
                                type: "file",
                                multiple: true,
                                accept: ".pdf,.docx,.pptx,.xlsx,.epub,.txt,.md,.csv,.tsv,.json,.html,.xml,audio/*,video/*,image/*,.mp3,.wav,.m4a,.ogg,.flac,.mp4,.mov,.mkv,.webm,.png,.jpg,.jpeg,.webp",
                                className: "hidden",
                                onChange: (e)=>{
                                    uploadFiles(Array.from(e.target.files || []));
                                    e.target.value = '';
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                className: "w-5 h-5 mx-auto text-[#4fc3f7]/70 mb-1"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-xs text-[#8b95a8]",
                                children: "Drop files here or click to upload"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px] text-[#5a6478] mt-1",
                                children: "PDF \xb7 DOCX \xb7 PPTX (slides + slide images) \xb7 XLSX \xb7 EPUB \xb7 TXT/MD \xb7 audio \xb7 video (audio + frames) \xb7 images — up to 8 at once \xb7 large files upload in resumable chunks (pause / resume, auto-retry, resume-after-refresh)"
                            })
                        ]
                    }),
                    transfers.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "space-y-2",
                        children: transfers.map((t)=>{
                            // Server-side progress for this transfer's source (if any).
                            const src = t.sourceId ? sources.find((s)=>s.id === t.sourceId) : undefined;
                            const progress = src?.meta?.progress;
                            const uploadPct = t.size > 0 ? Math.min(100, Math.round(t.sent / t.size * 100)) : 0;
                            const serverPct = progress?.percent ?? null;
                            const uploading = t.phase === 'uploading';
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "px-3 py-2.5 rounded-xl border border-[#4fc3f7]/20 bg-[#4fc3f7]/[0.04]",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-2 mb-1.5",
                                        children: [
                                            uploading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 text-[#4fc3f7] shrink-0"
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5 text-[#f59e0b] shrink-0 animate-[server-work-pulse_1.8s_ease-in-out_infinite]"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[11px] text-[#c8d0e0] truncate flex-1 min-w-0 font-medium",
                                                children: t.name
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "text-[9px] text-[#5a6478] shrink-0 tabular-nums",
                                                children: formatElapsed(t.startedAt)
                                            }),
                                            uploading && t.chunked && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                type: "button",
                                                onClick: ()=>togglePauseTransfer(t.key),
                                                className: "text-[#5a6478] hover:text-[#4fc3f7] transition-colors shrink-0 p-0.5",
                                                title: t.paused ? 'Resume upload' : 'Pause upload — confirmed chunks are kept on the server',
                                                "aria-label": t.paused ? 'Resume upload' : 'Pause upload',
                                                children: t.paused ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                                                    className: "w-3 h-3"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                                    className: "w-3 h-3"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                type: "button",
                                                onClick: ()=>dismissTransfer(t.key),
                                                className: "text-[#5a6478] hover:text-red-400 transition-colors shrink-0 p-0.5",
                                                title: uploading ? 'Cancel this upload' : 'Hide this card',
                                                "aria-label": uploading ? 'Cancel this upload' : 'Hide this card',
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                                                    className: "w-3 h-3"
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "h-1.5 rounded-full bg-[#0f1320] overflow-hidden",
                                        children: uploading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: `h-full rounded-full transition-[width] duration-150 ${t.paused ? 'bg-[#f59e0b]' : 'bg-gradient-to-r from-[#4fc3f7] to-[#00e5a0]'}`,
                                            style: {
                                                width: `${uploadPct}%`
                                            }
                                        }) : serverPct !== null ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "h-full rounded-full bg-gradient-to-r from-[#f59e0b] to-[#4fc3f7] transition-[width] duration-300",
                                            style: {
                                                width: `${serverPct}%`
                                            }
                                        }) : // Indeterminate shimmer — server is working, no % yet
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-[#f59e0b]/70 to-transparent animate-[shimmer_1.6s_linear_infinite] bg-[length:200%_100%]"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center justify-between gap-2 mt-1",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[9.5px] text-[#8b95a8] truncate",
                                                children: uploading ? t.paused ? `Paused at ${formatBytes2(t.sent)} / ${formatBytes2(t.size)} — resume anytime` : `${t.resumedFrom ? 'Resuming — ' : 'Uploading — '}${formatBytes2(t.sent)} / ${formatBytes2(t.size)}${t.speed ? ` · ${(0,_lib_uploads_chunked_upload_client__WEBPACK_IMPORTED_MODULE_7__/* .formatSpeed */ .DB)(t.speed)}` : ''}${t.etaSec != null ? ` · ${(0,_lib_uploads_chunked_upload_client__WEBPACK_IMPORTED_MODULE_7__/* .formatEta */ .gc)(t.etaSec)} left` : ''}` : stageLabel(progress)
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[9.5px] text-[#5a6478] shrink-0 tabular-nums font-semibold",
                                                children: uploading ? `${uploadPct}%` : serverPct !== null ? `${serverPct}%` : ''
                                            })
                                        ]
                                    }),
                                    uploading && t.error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                        className: "text-[9px] text-[#f59e0b]/90 truncate mt-0.5",
                                        children: t.error
                                    })
                                ]
                            }, t.key);
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                value: urlInput,
                                onChange: (e)=>setUrlInput(e.target.value),
                                onKeyDown: (e)=>{
                                    if (e.key === 'Enter') addUrl();
                                },
                                placeholder: "Paste a YouTube video, Google Drive or Dropbox link, or any file URL",
                                className: "flex-1 min-w-0 px-3 py-1.5 rounded-lg bg-[#0f1320] border border-white/[0.08] text-xs text-[#c8d0e0] placeholder:text-[#5a6478] focus:outline-none focus:border-[#4fc3f7]/40",
                                spellCheck: false
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: addUrl,
                                disabled: addingUrl || !urlInput.trim(),
                                className: "px-3 py-1.5 rounded-lg bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7] text-xs font-semibold disabled:opacity-40 flex items-center gap-1.5 shrink-0",
                                title: "Download & index — YouTube videos are transcribed automatically",
                                children: [
                                    addingUrl ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                        className: "w-3 h-3 animate-spin"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .A, {
                                        className: "w-3 h-3"
                                    }),
                                    "Add"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-[10px] text-[#5a6478] -mt-2",
                        children: "YouTube → audio + on-screen text \xb7 Drive/Dropbox links → share “anyone with the link”, or connect your own Drive below \xb7 up to 60 min per video"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: ()=>setDriveOpen(true),
                                className: "px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.1] text-[#8b95a8] hover:text-[#4fc3f7] hover:border-[#4fc3f7]/30 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0",
                                title: "Import files from your own Google Drive (private files, OAuth)",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .A, {
                                        className: "w-3 h-3"
                                    }),
                                    "Google Drive"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                className: "text-[10px] text-[#5a6478] truncate",
                                children: "Import from your own Drive — private files, no link-sharing needed (connect once)"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AudioRecorder__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                        onRecorded: (file)=>void uploadFiles([
                                file
                            ], {
                                autoSelect: true
                            })
                    }),
                    sources.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "space-y-1.5 max-h-72 overflow-y-auto pr-1",
                        children: sources.map((s)=>{
                            const selected = selectedIds.includes(s.id);
                            const selectable = s.status === 'ready';
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: `flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all ${selected ? 'border-[#00e5a0]/40 bg-[#00e5a0]/[0.06]' : 'border-white/[0.07] bg-[#1a1e2b] hover:border-white/[0.14]'} ${!selectable && s.status !== 'failed' ? 'opacity-80' : ''}`,
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        disabled: !selectable,
                                        onClick: ()=>onToggle(s.id),
                                        className: `w-4 h-4 shrink-0 rounded border flex items-center justify-center ${selected ? 'bg-[#00e5a0] border-[#00e5a0] text-[#0a0e17]' : selectable ? 'border-white/25 hover:border-[#00e5a0]/60' : 'border-white/10 opacity-40'}`,
                                        title: selectable ? 'Ground generation on this source' : s.status === 'failed' ? 'Indexing failed — hover the row for the error' : 'Source still indexing',
                                        children: selected && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_25__/* ["default"] */ .A, {
                                            className: "w-3 h-3"
                                        })
                                    }),
                                    kindBadge(s.meta?.fileKind || s.fileKind),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                type: "button",
                                                onClick: ()=>setOpenSource({
                                                        id: s.id,
                                                        kind: s.meta?.fileKind || s.fileKind
                                                    }),
                                                className: "text-xs text-[#c8d0e0] truncate font-medium max-w-full text-left hover:text-[#4fc3f7] hover:underline underline-offset-2 transition-colors",
                                                title: "Open file — view extracted content and indexed passages",
                                                children: s.name
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                className: "text-[10px] text-[#5a6478] truncate",
                                                children: [
                                                    s.status === 'ready' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                        children: [
                                                            s.meta?.chunks ?? '?',
                                                            " passages",
                                                            s.meta?.durationSec ? ` · ${formatDuration(s.meta.durationSec)}` : '',
                                                            s.meta?.pages ? ` · ${s.meta.pages}p` : '',
                                                            s.meta?.slides ? ` · ${s.meta.slides} slides` : '',
                                                            s.meta?.sheets ? ` · ${s.meta.sheets} sheets` : '',
                                                            s.meta?.chapters ? ` · ${s.meta.chapters} ch` : '',
                                                            s.meta?.visual === 'audio+frames' ? ' · audio+visual' : '',
                                                            s.meta?.transcription ? ` · ${s.meta.transcription}` : '',
                                                            s.meta?.ocr ? ` · OCR` : ''
                                                        ]
                                                    }),
                                                    s.status === 'pending' && 'Queued…',
                                                    s.status === 'processing' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                        children: [
                                                            stageLabel(s.meta?.progress),
                                                            s.meta?.progress ? ` · ${s.meta.progress.percent}%` : '',
                                                            ` · ${formatElapsed(new Date(s.createdAt).getTime())}`
                                                        ]
                                                    }),
                                                    s.status === 'failed' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-red-400",
                                                        children: s.error || 'Failed'
                                                    })
                                                ]
                                            }),
                                            (s.status === 'pending' || s.status === 'processing') && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "mt-1 h-1 rounded-full bg-[#0f1320] overflow-hidden",
                                                children: s.status === 'processing' && s.meta?.progress ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "h-full rounded-full bg-gradient-to-r from-[#f59e0b] to-[#4fc3f7] transition-[width] duration-300",
                                                    style: {
                                                        width: `${Math.max(4, s.meta.progress.percent)}%`
                                                    }
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-[#f59e0b]/70 to-transparent animate-[shimmer_1.6s_linear_infinite] bg-[length:200%_100%]"
                                                })
                                            })
                                        ]
                                    }),
                                    (s.status === 'pending' || s.status === 'processing') && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5 animate-spin text-[#f59e0b] shrink-0"
                                    }),
                                    s.status === 'failed' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5 text-red-400 shrink-0"
                                    }),
                                    s.status === 'failed' && s.type === 'url' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        type: "button",
                                        onClick: ()=>void retrySource(s.id),
                                        disabled: retryingIds.has(s.id),
                                        className: "px-2 py-1 rounded-md bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7] text-[10px] font-semibold hover:bg-[#4fc3f7]/20 disabled:opacity-40 flex items-center gap-1 shrink-0 transition-colors",
                                        title: "Try importing this link again — YouTube bot-checks are temporary",
                                        children: [
                                            retryingIds.has(s.id) ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                                className: "w-3 h-3 animate-spin"
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .A, {
                                                className: "w-3 h-3"
                                            }),
                                            "Retry"
                                        ]
                                    }),
                                    (s.meta?.originalMime || s.meta?.audioMime) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        onClick: ()=>setOpenSource({
                                                id: s.id,
                                                kind: 'file',
                                                tab: 'original'
                                            }),
                                        className: "text-[#5a6478] hover:text-[#00e5a0] transition-colors shrink-0 p-1",
                                        title: "Preview the original file (PDF viewer / image / player)",
                                        "aria-label": `Preview original ${s.name}`,
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_28__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5"
                                        })
                                    }),
                                    s.status === 'ready' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        onClick: ()=>void reindexSource(s.id),
                                        disabled: reindexingIds.has(s.id),
                                        className: "text-[#5a6478] hover:text-[#f59e0b] transition-colors shrink-0 p-1 disabled:opacity-40",
                                        title: "Re-index for accuracy — rebuild passages on clean sentence boundaries",
                                        "aria-label": `Re-index ${s.name}`,
                                        children: reindexingIds.has(s.id) ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 animate-spin"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_29__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        onClick: ()=>setOpenSource({
                                                id: s.id,
                                                kind: s.meta?.fileKind || s.fileKind
                                            }),
                                        className: "text-[#5a6478] hover:text-[#4fc3f7] transition-colors shrink-0 p-1",
                                        title: "Open file — view extracted content and indexed passages",
                                        "aria-label": `Open ${s.name}`,
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_30__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        type: "button",
                                        onClick: ()=>deleteSource(s.id, s.name),
                                        className: "text-[#5a6478] hover:text-red-400 transition-colors shrink-0 p-1",
                                        title: "Remove from library",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_31__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5"
                                        })
                                    })
                                ]
                            }, s.id);
                        })
                    }),
                    readyCount > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rounded-xl border border-white/[0.07] bg-[#1a1e2b] p-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2 mb-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                        className: "w-3.5 h-3.5 text-[#4fc3f7]/70"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[10px] font-semibold uppercase tracking-widest text-[#5a6478]",
                                        children: "Test retrieval"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                        value: searchQuery,
                                        onChange: (e)=>setSearchQuery(e.target.value),
                                        onKeyDown: (e)=>{
                                            if (e.key === 'Enter') runSearch();
                                        },
                                        placeholder: "e.g. what insulin rate does the DKA protocol use?",
                                        className: "flex-1 px-3 py-1.5 rounded-lg bg-[#0f1320] border border-white/[0.08] text-xs text-[#c8d0e0] placeholder:text-[#5a6478] focus:outline-none focus:border-[#4fc3f7]/40"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        type: "button",
                                        onClick: runSearch,
                                        disabled: searching || !searchQuery.trim(),
                                        className: "px-3 py-1.5 rounded-lg bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7] text-xs font-semibold disabled:opacity-40 flex items-center gap-1.5",
                                        children: [
                                            searching ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                                className: "w-3 h-3 animate-spin"
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_CheckCircle2_ChevronDown_ChevronUp_CloudUpload_Cpu_Eye_FileAudio_FileImage_FileSearch_FileText_FileVideo_HardDrive_Info_Library_Link2_Loader2_Pause_Play_RotateCcw_Search_Trash2_Upload_Wand2_X_lucide_react__WEBPACK_IMPORTED_MODULE_32__/* ["default"] */ .A, {
                                                className: "w-3 h-3"
                                            }),
                                            "Search"
                                        ]
                                    })
                                ]
                            }),
                            searchResult && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "mt-2.5 space-y-2",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "text-[10px] text-[#5a6478]",
                                        children: [
                                            searchResult.diagnostics.rerankUsed ? 'hybrid: dense + BM25 + rerank' : 'hybrid: dense + BM25 (rerank skipped)',
                                            " \xb7",
                                            ' ',
                                            searchResult.diagnostics.latencyMs,
                                            "ms \xb7 ",
                                            searchResult.diagnostics.expandedQueries.length,
                                            " query variants"
                                        ]
                                    }),
                                    (searchResult.chunks || []).slice(0, 3).map((c, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "px-2.5 py-2 rounded-lg bg-[#0f1320] border border-white/[0.06]",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex items-center justify-between gap-2 mb-1",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            className: "text-[10px] font-semibold text-[#4fc3f7] truncate",
                                                            children: [
                                                                "#",
                                                                i + 1,
                                                                " ",
                                                                c.documentTitle
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            className: "text-[10px] text-[#5a6478] shrink-0",
                                                            children: [
                                                                "rerank ",
                                                                c.rerankScore ?? '–',
                                                                " \xb7 dense ",
                                                                c.denseScore?.toFixed(2) ?? '–'
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                c.contextSummary && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[10px] text-[#8b95a8] italic mb-1 line-clamp-1",
                                                    children: c.contextSummary
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                    className: "text-[10px] text-[#5a6478] line-clamp-3 leading-relaxed",
                                                    children: c.content
                                                })
                                            ]
                                        }, c.chunkId))
                                ]
                            })
                        ]
                    })
                ]
            }),
            openSource && (openSource.kind === 'audio' && !openSource.tab ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TranscriptStudioModal__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                sourceId: openSource.id,
                onClose: ()=>setOpenSource(null),
                kindBadge: kindBadge
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_SourceViewerModal__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                sourceId: openSource.id,
                onClose: ()=>setOpenSource(null),
                kindBadge: kindBadge,
                initialTab: openSource.tab
            })),
            driveOpen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_DrivePickerModal__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                onClose: ()=>setDriveOpen(false),
                onImported: ()=>void refresh()
            })
        ]
    });
}


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

/***/ 529294:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

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

/***/ 663033:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ 705824:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Skull)
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
    name: "skull",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m12.5 17-.5-1-.5 1h1z",
                key: "3me087"
            }
        ],
        [
            "path",
            {
                d: "M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z",
                key: "1o5pge"
            }
        ],
        [
            "circle",
            {
                cx: "15",
                cy: "12",
                r: "1",
                key: "1tmaij"
            }
        ],
        [
            "circle",
            {
                cx: "9",
                cy: "12",
                r: "1",
                key: "1vctgf"
            }
        ]
    ]
};
__iconData.node;
const Skull = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=skull.mjs.map


/***/ }),

/***/ 710846:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");

/***/ }),

/***/ 715259:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ DrivePickerModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(890707);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(915741);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(112254);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(369013);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(541687);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(432474);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(59742);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(550565);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(645535);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(269357);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(790069);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(220878);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(229813);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(199646);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(640245);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(33392);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * DrivePickerModal — browse + import files from the user's CONNECTED Google
 * Drive (OAuth), or walk through the one-time server setup when the OAuth
 * client isn't configured yet.
 *
 * Opened from the Knowledge Library panel's "Google Drive" button:
 *   - configured + connected  → search box + newest-first file list with
 *                               per-file Import buttons ("Added" state)
 *   - configured, no connection → "Connect Google Drive" (redirects to the
 *                               OAuth consent screen)
 *   - not configured           → step-by-step setup guide with the exact
 *                               redirect URI to register in Google Cloud.
 */ 


function fileIcon(mime) {
    if (mime.includes('pdf')) return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
        className: "w-4 h-4 text-red-400"
    });
    if (mime.includes('spreadsheet') || mime.includes('excel') || mime.includes('csv')) return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
        className: "w-4 h-4 text-emerald-400"
    });
    if (mime.includes('presentation') || mime.includes('powerpoint')) return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
        className: "w-4 h-4 text-orange-400"
    });
    if (mime.startsWith('image/')) return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
        className: "w-4 h-4 text-cyan-400"
    });
    if (mime.startsWith('audio/')) return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
        className: "w-4 h-4 text-purple-400"
    });
    if (mime.startsWith('video/')) return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
        className: "w-4 h-4 text-orange-400"
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
        className: "w-4 h-4 text-[#8b95a8]"
    });
}
function fmtSize(bytes) {
    const n = Number(bytes);
    if (!bytes || Number.isNaN(n)) return '';
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`;
    return `${(n / 1024 / 1024).toFixed(1)} MB`;
}
function fmtDate(iso) {
    if (!iso) return '';
    try {
        return new Date(iso).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch  {
        return '';
    }
}
const NATIVE_LABEL = {
    'application/vnd.google-apps.document': 'Google Doc → text',
    'application/vnd.google-apps.spreadsheet': 'Google Sheet → csv',
    'application/vnd.google-apps.presentation': 'Google Slides → pptx',
    'application/vnd.google-apps.drawing': 'Drawing → png'
};
function DrivePickerModal({ onClose, onImported }) {
    const [status, setStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [files, setFiles] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [nextPageToken, setNextPageToken] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [query, setQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [searching, setSearching] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [importing, setImporting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Set());
    const [imported, setImported] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Set());
    const searchInputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // ── status + first page on mount
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        let alive = true;
        (async ()=>{
            try {
                const res = await fetch('/api/knowledge/drive/status');
                const json = await res.json();
                if (!alive) return;
                setStatus(json);
                if (json.configured && json.connected) void loadFiles('');
            } catch  {
                if (alive) setStatus({
                    configured: false,
                    connected: false,
                    redirectUri: ''
                });
            } finally{
                if (alive) setLoading(false);
            }
        })();
        return ()=>{
            alive = false;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const loadFiles = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (q, pageToken)=>{
        setSearching(true);
        try {
            const params = new URLSearchParams();
            if (q.trim()) params.set('q', q.trim());
            if (pageToken) params.set('pageToken', pageToken);
            const res = await fetch(`/api/knowledge/drive/files?${params.toString()}`);
            const json = await res.json();
            if (!res.ok) {
                sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(json.error || `HTTP ${res.status}`);
                return;
            }
            setFiles((prev)=>pageToken ? [
                    ...prev,
                    ...json.files || []
                ] : json.files || []);
            setNextPageToken(json.nextPageToken);
        } catch (e) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(e instanceof Error ? e.message : 'Drive request failed');
        } finally{
            setSearching(false);
        }
    }, []);
    const importFile = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (file)=>{
        if (importing.has(file.id) || imported.has(file.id)) return;
        setImporting((prev)=>new Set(prev).add(file.id));
        try {
            const res = await fetch('/api/knowledge/drive/import', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fileId: file.id,
                    name: file.name,
                    mimeType: file.mimeType
                })
            });
            const json = await res.json();
            if (!res.ok) {
                sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(json.error || `HTTP ${res.status}`);
                return;
            }
            setImported((prev)=>new Set(prev).add(file.id));
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.info(`Importing "${file.name}" from Google Drive — watch the status in your library`);
            onImported?.();
        } catch (e) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(e instanceof Error ? e.message : 'Import failed');
        } finally{
            setImporting((prev)=>{
                const next = new Set(prev);
                next.delete(file.id);
                return next;
            });
        }
    }, [
        importing,
        imported,
        onImported
    ]);
    const disconnect = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        try {
            const res = await fetch('/api/knowledge/drive/disconnect', {
                method: 'POST'
            });
            const json = await res.json();
            if (!res.ok) {
                sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(json.error || `HTTP ${res.status}`);
                return;
            }
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success('Google Drive disconnected — imported files stay in your library');
            setStatus((s)=>s ? {
                    ...s,
                    connected: false,
                    email: undefined
                } : s);
            setFiles([]);
        } catch (e) {
            sonner__WEBPACK_IMPORTED_MODULE_2__.toast.error(e instanceof Error ? e.message : 'Disconnect failed');
        }
    }, []);
    // ── keyboard: Escape closes
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const onKey = (e)=>{
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return ()=>window.removeEventListener('keydown', onKey);
    }, [
        onClose
    ]);
    const copy = (text)=>{
        void navigator.clipboard?.writeText(text).then(()=>sonner__WEBPACK_IMPORTED_MODULE_2__.toast.success('Copied')).catch(()=>{});
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4",
        onClick: onClose,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl border border-white/[0.1] bg-[#141926] overflow-hidden",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center justify-between gap-3 px-4 py-3 border-b border-white/[0.08] shrink-0",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2 min-w-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                    className: "w-4 h-4 text-[#4fc3f7] shrink-0"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-sm font-semibold text-[#c8d0e0] truncate",
                                    children: "Google Drive"
                                }),
                                status?.connected && status.email && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-[10px] text-[#5a6478] truncate hidden sm:inline",
                                    children: status.email
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            type: "button",
                            onClick: onClose,
                            className: "text-[#5a6478] hover:text-[#c8d0e0] transition-colors p-1 shrink-0",
                            "aria-label": "Close",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex-1 overflow-y-auto p-4",
                    children: [
                        loading && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "flex items-center justify-center py-16",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                className: "w-6 h-6 animate-spin text-[#4fc3f7]"
                            })
                        }),
                        !loading && status && !status.configured && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "text-xs text-[#8b95a8] leading-relaxed",
                                    children: [
                                        "Importing from ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "text-[#c8d0e0]",
                                            children: "your own Drive"
                                        }),
                                        " (private files, no link-sharing) needs a one-time Google OAuth setup. Public share links already work via the URL box — this is only for full Drive access."
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ol", {
                                    className: "space-y-2 text-xs text-[#8b95a8] list-none",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                "Open ",
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                    className: "text-[#4fc3f7] hover:underline",
                                                    href: "https://console.cloud.google.com/",
                                                    target: "_blank",
                                                    rel: "noreferrer",
                                                    children: [
                                                        "console.cloud.google.com ",
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                            className: "w-3 h-3 inline"
                                                        })
                                                    ]
                                                }),
                                                " and create (or pick) a project."
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                "Enable the ",
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[#c8d0e0]",
                                                    children: "Google Drive API"
                                                }),
                                                " (APIs & Services → Library)."
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                "Set up the ",
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[#c8d0e0]",
                                                    children: "OAuth consent screen"
                                                }),
                                                " (External) and add your Google account as a test user."
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                "Create credentials → ",
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[#c8d0e0]",
                                                    children: "OAuth client ID"
                                                }),
                                                " → Web application."
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                            children: [
                                                "Add this ",
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[#c8d0e0]",
                                                    children: "Authorized redirect URI"
                                                }),
                                                ":",
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "mt-1 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                                                            className: "flex-1 px-2 py-1 rounded bg-[#0f1320] border border-white/[0.08] text-[10px] text-[#4fc3f7] break-all",
                                                            children: status.redirectUri || '(start the server to see it)'
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                            type: "button",
                                                            onClick: ()=>copy(status.redirectUri),
                                                            className: "p-1.5 rounded border border-white/10 text-[#8b95a8] hover:text-[#4fc3f7]",
                                                            title: "Copy",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                                                className: "w-3.5 h-3.5"
                                                            })
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                "Put the Client ID / Secret in ",
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                                                    className: "px-1 rounded bg-[#0f1320] text-[10px]",
                                                    children: ".env"
                                                }),
                                                " as ",
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                                                    className: "text-[#4fc3f7]",
                                                    children: "GOOGLE_CLIENT_ID"
                                                }),
                                                " / ",
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                                                    className: "text-[#4fc3f7]",
                                                    children: "GOOGLE_CLIENT_SECRET"
                                                }),
                                                " and restart the server."
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                "Come back and click ",
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[#c8d0e0]",
                                                    children: "Connect Google Drive"
                                                }),
                                                "."
                                            ]
                                        })
                                    ].map((step, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                            className: "flex gap-2.5",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "shrink-0 w-5 h-5 rounded-full bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7] text-[10px] font-bold flex items-center justify-center",
                                                    children: i + 1
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "leading-relaxed pt-0.5",
                                                    children: step
                                                })
                                            ]
                                        }, i))
                                })
                            ]
                        }),
                        !loading && status?.configured && !status.connected && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "text-center py-10 space-y-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                    className: "w-8 h-8 mx-auto text-[#4fc3f7]/60"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-xs text-[#8b95a8] max-w-sm mx-auto leading-relaxed",
                                    children: "Connect once and you can import any file from your Google Drive — private ones too, no link-sharing needed."
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        window.location.href = '/api/knowledge/drive/connect';
                                    },
                                    className: "px-4 py-2 rounded-lg bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7] text-xs font-semibold hover:bg-[#4fc3f7]/20 transition-colors",
                                    children: "Connect Google Drive"
                                })
                            ]
                        }),
                        !loading && status?.configured && status.connected && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                            ref: searchInputRef,
                                            value: query,
                                            onChange: (e)=>setQuery(e.target.value),
                                            onKeyDown: (e)=>{
                                                if (e.key === 'Enter') {
                                                    setFiles([]);
                                                    setNextPageToken(undefined);
                                                    void loadFiles(query);
                                                }
                                            },
                                            placeholder: "Search your Drive by file name…",
                                            className: "flex-1 px-3 py-1.5 rounded-lg bg-[#0f1320] border border-white/[0.08] text-xs text-[#c8d0e0] placeholder:text-[#5a6478] focus:outline-none focus:border-[#4fc3f7]/40",
                                            spellCheck: false
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            type: "button",
                                            onClick: ()=>{
                                                setFiles([]);
                                                setNextPageToken(undefined);
                                                void loadFiles(query);
                                            },
                                            disabled: searching,
                                            className: "px-3 py-1.5 rounded-lg bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7] text-xs font-semibold disabled:opacity-40 flex items-center gap-1.5 shrink-0",
                                            children: [
                                                searching ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                    className: "w-3 h-3 animate-spin"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                                    className: "w-3 h-3"
                                                }),
                                                "Search"
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "space-y-1 max-h-[50vh] overflow-y-auto pr-1",
                                    children: [
                                        files.length === 0 && !searching && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                            className: "text-xs text-[#5a6478] text-center py-8",
                                            children: [
                                                "No files found",
                                                query ? ` for “${query}”` : '',
                                                "."
                                            ]
                                        }),
                                        files.map((f)=>{
                                            const isImporting = importing.has(f.id);
                                            const isImported = imported.has(f.id);
                                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "flex items-center gap-2.5 px-3 py-2 rounded-xl border border-white/[0.07] bg-[#1a1e2b] hover:border-white/[0.14] transition-all",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "shrink-0",
                                                        children: fileIcon(f.mimeType)
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-xs text-[#c8d0e0] truncate font-medium",
                                                                title: f.name,
                                                                children: f.name
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                                className: "text-[10px] text-[#5a6478] truncate",
                                                                children: [
                                                                    fmtSize(f.size),
                                                                    fmtDate(f.modifiedTime),
                                                                    NATIVE_LABEL[f.mimeType]
                                                                ].filter(Boolean).join(' · ')
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                        type: "button",
                                                        onClick: ()=>void importFile(f),
                                                        disabled: isImporting || isImported,
                                                        className: `px-2.5 py-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-1.5 shrink-0 border transition-colors ${isImported ? 'bg-[#00e5a0]/10 border-[#00e5a0]/30 text-[#00e5a0]' : 'bg-[#4fc3f7]/10 border-[#4fc3f7]/30 text-[#4fc3f7] hover:bg-[#4fc3f7]/20 disabled:opacity-40'}`,
                                                        children: [
                                                            isImporting ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                                                className: "w-3 h-3 animate-spin"
                                                            }) : isImported ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                                                className: "w-3 h-3"
                                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                                                className: "w-3 h-3"
                                                            }),
                                                            isImported ? 'Added' : 'Import'
                                                        ]
                                                    })
                                                ]
                                            }, f.id);
                                        })
                                    ]
                                }),
                                nextPageToken && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    type: "button",
                                    onClick: ()=>void loadFiles(query, nextPageToken),
                                    disabled: searching,
                                    className: "w-full py-2 rounded-lg border border-white/10 text-[#8b95a8] text-xs hover:border-[#4fc3f7]/30 hover:text-[#4fc3f7] disabled:opacity-40 transition-colors",
                                    children: "Load more"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center justify-between pt-1",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[10px] text-[#5a6478]",
                                            children: "Files import privately into your library \xb7 native Docs/Sheets/Slides export as text/csv/pptx"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            type: "button",
                                            onClick: ()=>void disconnect(),
                                            className: "text-[10px] text-[#5a6478] hover:text-red-400 transition-colors flex items-center gap-1 shrink-0",
                                            title: "Remove Drive access (imported files are kept)",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_Copy_Download_ExternalLink_FileAudio_FileImage_FileSpreadsheet_FileText_FileVideo_HardDrive_Loader2_Presentation_Search_Unplug_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                    className: "w-3 h-3"
                                                }),
                                                " Disconnect"
                                            ]
                                        })
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


/***/ }),

/***/ 727408:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ AudioRecorder)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_Loader2_Mic_MicOff_Square_X_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(862842);
/* harmony import */ var _barrel_optimize_names_Loader2_Mic_MicOff_Square_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(269357);
/* harmony import */ var _barrel_optimize_names_Loader2_Mic_MicOff_Square_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(67612);
/* harmony import */ var _barrel_optimize_names_Loader2_Mic_MicOff_Square_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(645535);
/* harmony import */ var _barrel_optimize_names_Loader2_Mic_MicOff_Square_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(816414);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * AudioRecorder — in-browser microphone recording → Knowledge Library.
 *
 * Flow: getUserMedia → MediaRecorder (webm/opus, mp4 on Safari) with a live
 * timer + Web-Audio level meter → on stop, wrap the blob in a File and hand
 * it to the parent, which POSTs it to /api/knowledge/upload. From there the
 * recorded audio follows the EXACT same pipeline as uploaded files:
 * ffmpeg → 25s WAV segments → ASR (timestamps) → chunk → embed → ready source.
 *
 * Graceful degradation: hidden when MediaRecorder/getUserMedia are unsupported;
 * friendly message on permission denial; hard 10-minute cap auto-stops.
 */ 

const MAX_DURATION_MS = 10 * 60 * 1000; // 10 minutes
const MIN_BYTES = 2048; // sub-2KB recordings are almost certainly accidental
/** Pick the best container/codec the browser can actually record. */ function pickRecorderMime() {
    const candidates = [
        {
            mimeType: 'audio/webm;codecs=opus',
            ext: 'webm'
        },
        {
            mimeType: 'audio/webm',
            ext: 'webm'
        },
        {
            mimeType: 'audio/mp4',
            ext: 'm4a'
        },
        {
            mimeType: 'audio/ogg;codecs=opus',
            ext: 'ogg'
        }
    ];
    for (const c of candidates){
        try {
            if (MediaRecorder.isTypeSupported(c.mimeType)) return c;
        } catch  {
        /* isTypeSupported can throw on exotic browsers — keep probing */ }
    }
    return {
        mimeType: '',
        ext: 'webm'
    }; // let the browser choose the default
}
function recordingSupported() {
    return  false && 0;
}
function timestampName(ext) {
    const d = new Date();
    const p = (n)=>String(n).padStart(2, '0');
    return `recording-${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}.${ext}`;
}
function fmtTime(ms) {
    const s = Math.floor(ms / 1000);
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}
function AudioRecorder({ onRecorded }) {
    const [phase, setPhase] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('idle');
    const [elapsed, setElapsed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [level, setLevel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [supported] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(recordingSupported);
    const recorderRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const chunksRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)([]);
    const streamRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const audioCtxRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const rafRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const timerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const startedAtRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const cancelledRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const teardown = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
        streamRef.current?.getTracks().forEach((t)=>t.stop());
        streamRef.current = null;
        audioCtxRef.current?.close().catch(()=>{});
        audioCtxRef.current = null;
        recorderRef.current = null;
    }, []);
    // Unmount safety: release mic + timers.
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>teardown, [
        teardown
    ]);
    const start = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (!supported || phase !== 'idle') return;
        setError(null);
        setPhase('requesting');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });
            streamRef.current = stream;
            const { mimeType, ext } = pickRecorderMime();
            const recorder = mimeType ? new MediaRecorder(stream, {
                mimeType
            }) : new MediaRecorder(stream);
            recorderRef.current = recorder;
            recorderRef._ext = ext; // remember ext for naming
            chunksRef.current = [];
            cancelledRef.current = false;
            // Live level meter (RMS of the mic signal).
            try {
                const ctx = new AudioContext();
                audioCtxRef.current = ctx;
                const src = ctx.createMediaStreamSource(stream);
                const analyser = ctx.createAnalyser();
                analyser.fftSize = 512;
                src.connect(analyser);
                const buf = new Uint8Array(analyser.fftSize);
                const loop = ()=>{
                    analyser.getByteTimeDomainData(buf);
                    let sum = 0;
                    for(let i = 0; i < buf.length; i++){
                        const v = (buf[i] - 128) / 128;
                        sum += v * v;
                    }
                    const rms = Math.sqrt(sum / buf.length);
                    setLevel((prev)=>Math.max(rms, prev * 0.82)); // smooth decay
                    rafRef.current = requestAnimationFrame(loop);
                };
                rafRef.current = requestAnimationFrame(loop);
            } catch  {
            /* meter is cosmetic — recording continues without it */ }
            recorder.ondataavailable = (e)=>{
                if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
            };
            recorder.onstop = ()=>{
                const ext = recorderRef._ext || 'webm';
                const type = recorder.mimeType || 'audio/webm';
                const blob = new Blob(chunksRef.current, {
                    type
                });
                teardown();
                setPhase('idle');
                setLevel(0);
                setElapsed(0);
                if (cancelledRef.current) return; // discarded
                if (blob.size < MIN_BYTES) {
                    setError('Recording too short — hold the mic a little longer.');
                    return;
                }
                onRecorded(new File([
                    blob
                ], timestampName(ext), {
                    type
                }));
            };
            recorder.start(1000); // 1s timeslices → progressive chunks
            startedAtRef.current = Date.now();
            setElapsed(0);
            setPhase('recording');
            timerRef.current = setInterval(()=>{
                const ms = Date.now() - startedAtRef.current;
                setElapsed(ms);
                if (ms >= MAX_DURATION_MS) {
                    recorderRef.current?.state === 'recording' && recorderRef.current.stop();
                }
            }, 250);
        } catch (e) {
            teardown();
            setPhase('idle');
            const name = e instanceof Error ? e.name : '';
            if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
                setError('Microphone access denied — allow it in your browser settings, then try again.');
            } else if (name === 'NotFoundError') {
                setError('No microphone found on this device.');
            } else {
                setError(e instanceof Error ? e.message : 'Could not start recording.');
            }
        }
    }, [
        supported,
        phase,
        teardown,
        onRecorded
    ]);
    const stop = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        const r = recorderRef.current;
        if (r && r.state === 'recording') {
            setPhase('finishing');
            r.stop();
        }
    }, []);
    const discard = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        cancelledRef.current = true;
        const r = recorderRef.current;
        if (r && r.state === 'recording') {
            setPhase('finishing');
            r.stop();
        } else {
            teardown();
            setPhase('idle');
            setLevel(0);
            setElapsed(0);
        }
    }, [
        teardown
    ]);
    if (!supported) return null;
    const bars = 18;
    const activeBars = Math.round(Math.min(1, level * 3.2) * bars);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            phase === 'idle' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                type: "button",
                onClick: start,
                className: "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-purple-400/25 bg-purple-400/[0.07] text-purple-300 text-xs font-semibold hover:bg-purple-400/[0.14] hover:border-purple-400/45 transition-all cursor-pointer",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Loader2_Mic_MicOff_Square_X_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                        className: "w-4 h-4"
                    }),
                    "Record from microphone",
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-[10px] font-normal text-[#5a6478]",
                        children: "— transcribed & indexed like an upload"
                    })
                ]
            }),
            phase === 'requesting' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/[0.08] bg-[#1a1e2b] text-xs text-[#8b95a8]",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Loader2_Mic_MicOff_Square_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                        className: "w-4 h-4 animate-spin text-purple-300"
                    }),
                    "Waiting for microphone permission…"
                ]
            }),
            phase === 'recording' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-3 px-4 py-3 rounded-xl border border-red-400/30 bg-red-400/[0.06]",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "flex items-center gap-2 shrink-0",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "relative flex w-2.5 h-2.5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "absolute inline-flex w-full h-full rounded-full bg-red-400 opacity-60 animate-ping"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "relative inline-flex w-2.5 h-2.5 rounded-full bg-red-500"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-xs font-bold text-red-300 tabular-nums",
                                children: fmtTime(elapsed)
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "flex-1 flex items-center justify-center gap-[3px] h-6 overflow-hidden",
                        "aria-hidden": true,
                        children: Array.from({
                            length: bars
                        }).map((_, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: `w-[3px] rounded-full transition-all duration-100 ${i < activeBars ? 'bg-red-400/80' : 'bg-white/[0.08]'}`,
                                style: {
                                    height: `${25 + i / bars * 55}%`
                                }
                            }, i))
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: stop,
                        className: "shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#00e5a0]/12 border border-[#00e5a0]/35 text-[#00e5a0] text-xs font-bold hover:bg-[#00e5a0]/20 transition-all cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Loader2_Mic_MicOff_Square_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            " Stop & index"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        onClick: discard,
                        className: "shrink-0 p-2 rounded-lg text-[#5a6478] hover:text-red-400 hover:bg-red-400/10 transition-all cursor-pointer",
                        title: "Discard recording",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Loader2_Mic_MicOff_Square_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                            className: "w-4 h-4"
                        })
                    })
                ]
            }),
            phase === 'finishing' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/[0.08] bg-[#1a1e2b] text-xs text-[#8b95a8]",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Loader2_Mic_MicOff_Square_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                        className: "w-4 h-4 animate-spin text-[#00e5a0]"
                    }),
                    "Finalizing recording…"
                ]
            }),
            error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                className: "mt-1.5 text-[10px] text-red-400 flex items-center gap-1.5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Loader2_Mic_MicOff_Square_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                        className: "w-3 h-3 shrink-0"
                    }),
                    " ",
                    error
                ]
            })
        ]
    });
}


/***/ }),

/***/ 741025:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/dynamic-access-async-storage.external.js");

/***/ }),

/***/ 758284:
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
const module10 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 84990)));
const module11 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 77334)));
const module12 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 895547, 23)));
const page13 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 918597)));
const default14 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 297219)));


const tree = {
        children: [
        '',
        {
        children: [
        '(app)',
        {
        children: [
        'generate',
        {
        children: ['__PAGE__', {}, {
          page: [page13, "/workspaces/next/run/src/app/(app)/generate/page.tsx"],
          
        }]
      },
        {
        'layout': [module10, "/workspaces/next/run/src/app/(app)/generate/layout.tsx"],
'loading': [module11, "/workspaces/next/run/src/app/(app)/generate/loading.tsx"],
'global-error': [module12, "next/dist/client/components/builtin/global-error.js"],
        
      },
        []
      ],
modal: [
          '__DEFAULT__',
          {},
          {
            defaultPage: [default14, "/workspaces/next/run/src/app/(app)/@modal/default.tsx"],
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
    page: "/(app)/generate/page",
    pathname: "/generate",
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__,
    interopDefault: next_dist_server_app_render_interop_default__WEBPACK_IMPORTED_MODULE_2__/* .interopDefault */ .T
});
const __next_app__ = entrypoint.__next_app__;
const routeModule = entrypoint.routeModule;
const handler = entrypoint.handler;


//# sourceMappingURL=app-page.js.map


/***/ }),

/***/ 781630:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 816414:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ MicOff)
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
    name: "mic-off",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 19v3",
                key: "npa21l"
            }
        ],
        [
            "path",
            {
                d: "M15 9.34V5a3 3 0 0 0-5.68-1.33",
                key: "1gzdoj"
            }
        ],
        [
            "path",
            {
                d: "M16.95 16.95A7 7 0 0 1 5 12v-2",
                key: "cqa7eg"
            }
        ],
        [
            "path",
            {
                d: "M18.89 13.23A7 7 0 0 0 19 12v-2",
                key: "16hl24"
            }
        ],
        [
            "path",
            {
                d: "m2 2 20 20",
                key: "1ooewy"
            }
        ],
        [
            "path",
            {
                d: "M9 9v3a3 3 0 0 0 5.12 2.12",
                key: "r2i35w"
            }
        ]
    ]
};
__iconData.node;
const MicOff = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=mic-off.mjs.map


/***/ }),

/***/ 852740:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ useResumableUpload)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_file_extract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(716449);
/* harmony import */ var _lib_uploads_upload_progress_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(290505);
/**
 * use-resumable-upload.ts — React hook binding the PURE upload-progress
 * state machine to extractFromFile + the resumable-upload handle.
 *
 * Stage 13 UX layer: the generate page and chat attachments used to call
 * extractFromFile(file, onProgress) and throw away the upload handle — so
 * the UI could show a progress bar but NOT pause/resume/cancel. This hook
 * captures the handle (via the onHandle callback added to extractFromFile)
 * and wires it to the state machine's transitions.
 *
 * The hook itself is a thin pass-through; all logic lives in
 * upload-progress-state.ts (pure, unit-tested).
 */ /* __next_internal_client_entry_do_not_use__ useResumableUpload auto */ 


function useResumableUpload() {
    const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [content, setContent] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const handleRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const upload = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (file)=>{
        // Fresh upload — reset content, init state.
        setContent(null);
        setState((0,_lib_uploads_upload_progress_state__WEBPACK_IMPORTED_MODULE_2__/* .initState */ .Ws)(file.size));
        let lastProgressPct = 5;
        try {
            const result = await (0,_lib_file_extract__WEBPACK_IMPORTED_MODULE_1__/* .extractFromFile */ .Y7)(file, (p)=>{
                lastProgressPct = p.progress;
                setState((prev)=>{
                    if (!prev) return prev;
                    // Map the legacy ExtractionProgress onto the state machine.
                    // The richer fields (uploadedBytes, bytesPerSecond, etc.) are
                    // present on the resumable path; absent on the small-file path.
                    if (p.retrying) {
                        return (0,_lib_uploads_upload_progress_state__WEBPACK_IMPORTED_MODULE_2__/* .onRetrying */ .oY)(prev, {
                            chunkIndex: 0,
                            attempt: p.attempt ?? 1,
                            error: p.message
                        });
                    }
                    if (p.uploadedBytes !== undefined && p.totalBytes !== undefined) {
                        return (0,_lib_uploads_upload_progress_state__WEBPACK_IMPORTED_MODULE_2__/* .onProgress */ .Jb)(prev, {
                            uploadedBytes: p.uploadedBytes,
                            totalBytes: p.totalBytes,
                            fraction: p.totalBytes > 0 ? p.uploadedBytes / p.totalBytes : 0,
                            bytesPerSecond: p.bytesPerSecond ?? 0,
                            etaSeconds: p.etaSeconds ?? null,
                            resumedBytes: p.resumedBytes ?? 0,
                            attempt: p.attempt ?? 1
                        });
                    }
                    // Small-file / server-parse phase — just carry the progress.
                    if (p.stage === 'extracting') {
                        return (0,_lib_uploads_upload_progress_state__WEBPACK_IMPORTED_MODULE_2__/* .onExtracting */ .$8)(prev, p.progress);
                    }
                    if (p.stage === 'done') {
                        return (0,_lib_uploads_upload_progress_state__WEBPACK_IMPORTED_MODULE_2__/* .onDone */ .ER)(prev);
                    }
                    return {
                        ...prev,
                        progress: p.progress,
                        message: p.message
                    };
                });
            }, (handle)=>{
                handleRef.current = handle;
            });
            // The "done" progress callback already fired onProgress(onDone), but
            // the extractFromFile path emits a final 'done' stage only on the
            // small-file path. For the resumable path, the last progress is
            // 'extracting' at 100 — flip to done here.
            setState((prev)=>prev ? (0,_lib_uploads_upload_progress_state__WEBPACK_IMPORTED_MODULE_2__/* .onAssembling */ .xF)(prev) : prev);
            setState((prev)=>prev ? {
                    ...prev,
                    progress: Math.max(prev.progress, 90)
                } : prev);
            setContent(result);
            setState((prev)=>prev ? (0,_lib_uploads_upload_progress_state__WEBPACK_IMPORTED_MODULE_2__/* .onDone */ .ER)(prev) : prev);
            handleRef.current = null;
            return result;
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            // Distinguish "cancelled by user" from "failed" — both surface as
            // errors from extractFromFile, but the state machine treats them
            // differently (cancelled keeps the resume hint).
            if (/cancel/i.test(message)) {
                setState((prev)=>prev ? (0,_lib_uploads_upload_progress_state__WEBPACK_IMPORTED_MODULE_2__/* .onCancelled */ .Bf)(prev) : null);
            } else {
                setState((prev)=>prev ? (0,_lib_uploads_upload_progress_state__WEBPACK_IMPORTED_MODULE_2__/* .onError */ .S5)(prev, message) : null);
            }
            handleRef.current = null;
            throw error;
        }
    }, []);
    const pause = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        handleRef.current?.pause();
        setState((prev)=>prev ? (0,_lib_uploads_upload_progress_state__WEBPACK_IMPORTED_MODULE_2__/* .onPaused */ .o0)(prev) : prev);
    }, []);
    const resume = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        handleRef.current?.resume();
        setState((prev)=>prev ? (0,_lib_uploads_upload_progress_state__WEBPACK_IMPORTED_MODULE_2__/* .onResumed */ .lM)(prev) : prev);
    }, []);
    const cancel = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        handleRef.current?.cancel();
        setState((prev)=>prev ? (0,_lib_uploads_upload_progress_state__WEBPACK_IMPORTED_MODULE_2__/* .onCancelled */ .Bf)(prev) : prev);
        handleRef.current = null;
    }, []);
    const reset = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        handleRef.current?.cancel();
        handleRef.current = null;
        setState(null);
        setContent(null);
    }, []);
    return {
        state,
        content,
        upload,
        pause,
        resume,
        cancel,
        reset
    };
}


/***/ }),

/***/ 877971:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ TranscriptStudioModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(998808);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(881321);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(868063);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(358250);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(230222);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(487005);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(334460);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(645535);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(269357);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(576270);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(185448);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(269627);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(673097);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(954171);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(682902);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(131223);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(229813);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(915741);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(640245);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(35471);
/* harmony import */ var _barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(220878);
/* __next_internal_client_entry_do_not_use__ default auto */ 
/**
 * TranscriptStudioModal — the ADVANCED audio transcription viewer.
 *
 * Opens for audio sources in the Knowledge Library (replaces the plain-text
 * SourceViewerModal for that kind). Everything the old viewer could not do:
 *
 *   - Waveform (decoded client-side via Web Audio) with click-to-seek and a
 *     live playhead; silences are visible as flat regions.
 *   - Synced playback of the ORIGINAL retained audio (served owner-gated
 *     with Range support from /api/knowledge/sources/[id]/audio).
 *   - Sentence-level timestamps (VAD-accurate): click any sentence or its
 *     [mm:ss] chip to jump there; the active sentence highlights while
 *     playing (karaoke mode) and auto-scrolls.
 *   - Three views: Sentences (synced), Paragraphs (readable), Raw (exactly
 *     what was indexed for RAG).
 *   - In-transcript search with match navigation (Enter / arrows).
 *   - Insights from the ingestion pipeline: LLM title, summary, keyword and
 *     topic chips (click a chip to search it).
 *   - Speech analytics: words, sentences, WPM, speech coverage.
 *   - Export: Copy, TXT, SRT (subtitles), VTT, JSON (full structure).
 *   - Keyboard: Space play/pause, arrows ±5s, Escape close.
 *
 * Graceful degradation: source has no structured transcript (pre-upgrade or
 * video) → raw text view; audio not retained → transcript without playback.
 */ 

// ─── Formatting helpers ────────────────────────────────────────────────────
function fmtTime(sec) {
    const s = Math.max(0, Math.floor(sec));
    const h = Math.floor(s / 3600);
    const m = Math.floor(s % 3600 / 60);
    const r = s % 60;
    return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}` : `${m}:${String(r).padStart(2, '0')}`;
}
function srtTime(sec) {
    const ms = Math.floor(sec % 1 * 1000);
    const s = Math.floor(sec);
    const h = Math.floor(s / 3600);
    const m = Math.floor(s % 3600 / 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
}
function vttTime(sec) {
    return srtTime(sec).replace(',', '.');
}
function buildSrt(sentences) {
    return sentences.map((s, i)=>`${i + 1}\n${srtTime(s.start)} --> ${srtTime(Math.max(s.end, s.start + 0.4))}\n${s.text}\n`).join('\n');
}
function buildVtt(sentences) {
    return `WEBVTT\n\n${sentences.map((s)=>`${vttTime(s.start)} --> ${vttTime(Math.max(s.end, s.start + 0.4))}\n${s.text}\n`).join('\n')}`;
}
function buildTxt(transcript) {
    return transcript.paragraphs.map((p)=>transcript.sentences.slice(p.from, p.to + 1).map((s)=>s.text).join(' ')).join('\n\n');
}
function downloadBlob(name, content, type) {
    const url = URL.createObjectURL(new Blob([
        content
    ], {
        type
    }));
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(()=>URL.revokeObjectURL(url), 5000);
}
// ─── Component ─────────────────────────────────────────────────────────────
const WAVEFORM_MAX_SEC = 1800; // beyond ~30 min skip the waveform decode (memory)
function TranscriptStudioModal({ sourceId, onClose, kindBadge }) {
    const [detail, setDetail] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [audioOk, setAudioOk] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null); // null = probing
    const [peaks, setPeaks] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [playing, setPlaying] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [currentTime, setCurrentTime] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [rate, setRate] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const [follow, setFollow] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [mode, setMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('sentences');
    const [query, setQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [matchIdx, setMatchIdx] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [showInsights, setShowInsights] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [copied, setCopied] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const audioRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const canvasWrapRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const listRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const drawWaveRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(()=>{});
    const lastTimeRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const lastActiveRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(-1);
    const transcript = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const t = detail?.source?.meta?.transcript;
        return t && Array.isArray(t.sentences) && t.sentences.length > 0 ? t : null;
    }, [
        detail
    ]);
    const duration = transcript?.durationSec ?? 0;
    // ── Load source detail ──
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        let alive = true;
        (async ()=>{
            try {
                const res = await fetch(`/api/knowledge/sources/${sourceId}?full=1&chunks=all`);
                const json = await res.json();
                if (!alive) return;
                if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
                setDetail(json);
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
    // ── Probe retained audio (Range probe; 206 = available) ──
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        let alive = true;
        (async ()=>{
            try {
                const res = await fetch(`/api/knowledge/sources/${sourceId}/audio`, {
                    headers: {
                        Range: 'bytes=0-1'
                    }
                });
                if (!alive) return;
                setAudioOk(res.status === 206 || res.status === 200);
                if ((res.status === 206 || res.status === 200) && res.body) void res.body.cancel();
            } catch  {
                if (alive) setAudioOk(false);
            }
        })();
        return ()=>{
            alive = false;
        };
    }, [
        sourceId
    ]);
    // ── Decode waveform peaks (only for retained audio ≤ 30 min) ──
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (audioOk !== true || !duration || duration > WAVEFORM_MAX_SEC) return;
        let alive = true;
        let ctx = null;
        (async ()=>{
            try {
                const res = await fetch(`/api/knowledge/sources/${sourceId}/audio`);
                if (!res.ok || !alive) return;
                const buf = await res.arrayBuffer();
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                ctx = new AudioCtx();
                const decoded = await ctx.decodeAudioData(buf.slice(0));
                void ctx.close().catch(()=>{});
                ctx = null;
                if (!alive) return;
                const ch = decoded.getChannelData(0);
                const buckets = Math.min(900, Math.max(240, Math.floor(decoded.duration * 10)));
                const out = new Float32Array(buckets);
                const per = Math.max(1, Math.floor(ch.length / buckets));
                const step = Math.max(1, Math.floor(per / 60));
                for(let i = 0; i < buckets; i++){
                    let max = 0;
                    const off = i * per;
                    const lim = Math.min(off + per, ch.length);
                    for(let j = off; j < lim; j += step){
                        const v = Math.abs(ch[j]);
                        if (v > max) max = v;
                    }
                    out[i] = max;
                }
                if (alive) setPeaks(out);
            } catch  {
            // decode failure (exotic codec) → waveform off, playback still fine
            } finally{
                if (ctx) void ctx.close().catch(()=>{});
            }
        })();
        return ()=>{
            alive = false;
            if (ctx) void ctx.close().catch(()=>{});
        };
    }, [
        audioOk,
        sourceId,
        duration
    ]);
    // ── (keyboard shortcuts registered AFTER the handlers they call — see
    //    the "Keyboard shortcuts" effect further down, past seekBy/jumpMatch) ──
    // ── Playback loop: canvas at 60fps, React state throttled to ~8fps ──
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!playing) return;
        let raf = 0;
        let lastState = 0;
        const tick = ()=>{
            const a = audioRef.current;
            if (a) {
                drawWaveRef.current(a.currentTime);
                const now = performance.now();
                if (now - lastState > 120) {
                    lastState = now;
                    setCurrentTime(a.currentTime);
                }
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return ()=>cancelAnimationFrame(raf);
    }, [
        playing
    ]);
    // ── Waveform drawing (time is a PARAMETER so rAF can drive it at 60fps
    //    without re-rendering React; state changes redraw via the effect below) ──
    const drawWaveform = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((time)=>{
        lastTimeRef.current = time; // remembered for the ResizeObserver redraw
        const canvas = canvasRef.current;
        if (!canvas) return;
        const wrap = canvasWrapRef.current;
        const w = wrap ? wrap.clientWidth : 600;
        if (w <= 0) return;
        const dpr = window.devicePixelRatio || 1;
        const h = 64;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        const ctx2d = canvas.getContext('2d');
        if (!ctx2d) return;
        ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx2d.clearRect(0, 0, w, h);
        const ratio = duration > 0 ? Math.min(1, Math.max(0, time / duration)) : 0;
        if (!peaks) {
            // fallback: slim progress bar (exotic codec or >30 min audio)
            ctx2d.fillStyle = '#232b3d';
            ctx2d.fillRect(0, h / 2 - 2, w, 4);
            ctx2d.fillStyle = '#4fc3f7';
            ctx2d.fillRect(0, h / 2 - 2, w * ratio, 4);
            ctx2d.fillStyle = 'rgba(255,255,255,0.85)';
            ctx2d.fillRect(Math.max(0, w * ratio - 0.5), 4, 1, h - 8);
            return;
        }
        const n = peaks.length;
        const barW = Math.max(1, w / n - 0.4);
        const mid = h / 2;
        for(let i = 0; i < n; i++){
            const x = i / n * w;
            const v = Math.pow(peaks[i], 0.75); // perceptual lift for quiet speech
            const barH = Math.max(1.2, v * (h - 10));
            ctx2d.fillStyle = i / n <= ratio ? 'rgba(79,195,247,0.95)' : '#2b3448';
            ctx2d.fillRect(x, mid - barH / 2, barW, barH);
        }
        // playhead
        const px = Math.max(0, Math.min(w - 1.5, w * ratio));
        ctx2d.fillStyle = 'rgba(255,255,255,0.9)';
        ctx2d.fillRect(px, 2, 1.5, h - 4);
    }, [
        peaks,
        duration
    ]);
    // keep a ref to the LATEST draw fn (avoids stale closures in the rAF loop)
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        drawWaveRef.current = drawWaveform;
    }, [
        drawWaveform
    ]);
    // redraw whenever inputs change (peaks load, seek, resize, pause state)
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        drawWaveform(currentTime);
    }, [
        drawWaveform,
        currentTime
    ]);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const wrap = canvasWrapRef.current;
        if (!wrap || typeof ResizeObserver === 'undefined') return;
        const ro = new ResizeObserver(()=>drawWaveRef.current(lastTimeRef.current));
        ro.observe(wrap);
        return ()=>ro.disconnect();
    }, []);
    // ── Active sentence + follow-scroll ──
    const activeSentenceId = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!transcript) return -1;
        const ss = transcript.sentences;
        let lo = 0, hi = ss.length - 1, ans = -1;
        while(lo <= hi){
            const mid = lo + hi >> 1;
            if (ss[mid].start <= currentTime) {
                ans = mid;
                lo = mid + 1;
            } else hi = mid - 1;
        }
        if (ans >= 0 && currentTime > ss[ans].end + 2.5) return -1; // in a long gap
        return ans;
    }, [
        transcript,
        currentTime
    ]);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!follow || !playing || activeSentenceId < 0) return;
        if (activeSentenceId === lastActiveRef.current) return;
        lastActiveRef.current = activeSentenceId;
        const el = listRef.current?.querySelector(`[data-sid="${activeSentenceId}"]`);
        if (el) el.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }, [
        activeSentenceId,
        follow,
        playing
    ]);
    // ── Controls ──
    const togglePlay = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        const a = audioRef.current;
        if (!a) return;
        if (a.paused) void a.play().catch(()=>{});
        else a.pause();
    }, []);
    const seekTo = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((sec)=>{
        const a = audioRef.current;
        if (!a || !isFinite(sec)) return;
        a.currentTime = Math.max(0, Math.min(sec, duration || a.duration || sec));
        setCurrentTime(a.currentTime);
        if (!transcript) return;
        // snap to the sentence that covers this time for a tidier highlight
        const ss = transcript.sentences;
        let lo = 0, hi = ss.length - 1, ans = -1;
        while(lo <= hi){
            const mid = lo + hi >> 1;
            if (ss[mid].start <= sec) {
                ans = mid;
                lo = mid + 1;
            } else hi = mid - 1;
        }
        lastActiveRef.current = ans;
    }, [
        duration,
        transcript
    ]);
    const seekBy = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((delta)=>{
        const a = audioRef.current;
        if (!a) return;
        seekTo(a.currentTime + delta);
    }, [
        seekTo
    ]);
    const onWaveformClick = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((e)=>{
        if (!duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        seekTo(ratio * duration);
    }, [
        duration,
        seekTo
    ]);
    // ── Search ──
    const matches = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const q = query.trim().toLowerCase();
        if (!q || !transcript) return [];
        return transcript.sentences.filter((s)=>s.text.toLowerCase().includes(q)).map((s)=>s.id);
    }, [
        query,
        transcript
    ]);
    const jumpMatch = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((dir)=>{
        if (matches.length === 0) return;
        const next = (matchIdx + dir + matches.length) % matches.length;
        setMatchIdx(next);
        const sid = matches[next];
        const s = transcript?.sentences[sid];
        if (s) {
            seekTo(s.start);
            lastActiveRef.current = sid;
            const el = listRef.current?.querySelector(`[data-sid="${sid}"]`);
            if (el) el.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, [
        matches,
        matchIdx,
        transcript,
        seekTo
    ]);
    // ── Keyboard shortcuts (defined AFTER the handlers so deps are fresh) ──
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const onKey = (e)=>{
            if (e.key === 'Escape') {
                onClose();
                return;
            }
            const target = e.target;
            const inInput = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
            if (inInput && e.key !== 'Enter') return;
            if (e.code === 'Space') {
                e.preventDefault();
                togglePlay();
            } else if (e.key === 'ArrowLeft' && !inInput) {
                e.preventDefault();
                seekBy(-5);
            } else if (e.key === 'ArrowRight' && !inInput) {
                e.preventDefault();
                seekBy(5);
            } else if (e.key === 'Enter' && inInput) {
                e.preventDefault();
                jumpMatch(e.shiftKey ? -1 : 1);
            }
        };
        window.addEventListener('keydown', onKey);
        return ()=>window.removeEventListener('keydown', onKey);
    }, [
        onClose,
        togglePlay,
        seekBy,
        jumpMatch
    ]);
    const highlight = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((text)=>{
        const q = query.trim();
        if (!q) return text;
        const idx = text.toLowerCase().indexOf(q.toLowerCase());
        if (idx < 0) return text;
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                text.slice(0, idx),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("mark", {
                    className: "bg-[#4fc3f7]/30 text-[#e8f4ff] rounded-[2px] px-0.5",
                    children: text.slice(idx, idx + q.length)
                }),
                text.slice(idx + q.length)
            ]
        });
    }, [
        query
    ]);
    // ── Exports ──
    const copyTxt = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (!transcript) return;
        try {
            await navigator.clipboard.writeText(buildTxt(transcript));
            setCopied(true);
            setTimeout(()=>setCopied(false), 1500);
        } catch  {}
    }, [
        transcript
    ]);
    const baseName = (detail?.source.name || 'transcript').replace(/\.[a-z0-9]+$/i, '') || 'transcript';
    const exportAs = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((kind)=>{
        if (!transcript) return;
        if (kind === 'txt') downloadBlob(`${baseName}.txt`, buildTxt(transcript), 'text/plain');
        if (kind === 'srt') downloadBlob(`${baseName}.srt`, buildSrt(transcript.sentences), 'application/x-subrip');
        if (kind === 'vtt') downloadBlob(`${baseName}.vtt`, buildVtt(transcript.sentences), 'text/vtt');
        if (kind === 'json') downloadBlob(`${baseName}.json`, JSON.stringify(transcript, null, 2), 'application/json');
    }, [
        transcript,
        baseName
    ]);
    // ── Render ──
    const s = detail?.source;
    const st = transcript?.stats;
    const insights = transcript?.insights;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm",
        onClick: onClose,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Transcript studio",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "w-full max-w-4xl max-h-[92vh] rounded-2xl border border-white/[0.1] bg-[#141926] flex flex-col overflow-hidden shadow-2xl",
            onClick: (e)=>{
                e.stopPropagation();
            },
            children: [
                audioOk === true && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("audio", {
                    ref: audioRef,
                    src: `/api/knowledge/sources/${sourceId}/audio`,
                    preload: "metadata",
                    onPlay: ()=>setPlaying(true),
                    onPause: ()=>setPlaying(false),
                    onEnded: ()=>setPlaying(false),
                    onTimeUpdate: (e)=>{
                        if (!playing) setCurrentTime(e.currentTarget.currentTime);
                    },
                    onRateChange: (e)=>setRate(e.currentTarget.playbackRate)
                }),
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
                                transcript && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "mt-1.5 flex items-center gap-1.5 flex-wrap text-[10px] text-[#5a6478]",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "inline-flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                                                    className: "w-3 h-3"
                                                }),
                                                fmtTime(transcript.durationSec)
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "inline-flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                                                    className: "w-3 h-3"
                                                }),
                                                st?.words ?? 0,
                                                " words"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "inline-flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                                                    className: "w-3 h-3"
                                                }),
                                                st?.sentences ?? 0,
                                                " sentences"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "inline-flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                                    className: "w-3 h-3"
                                                }),
                                                st?.wpm ?? 0,
                                                " wpm"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "inline-flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                                                    className: "w-3 h-3"
                                                }),
                                                Math.round((st?.coverage ?? 0) * 100),
                                                "% speech"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "inline-flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                                    className: "w-3 h-3"
                                                }),
                                                st?.segments ?? 0,
                                                " ASR segments"
                                            ]
                                        }),
                                        (st?.dropped ?? 0) > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-300",
                                            title: "Some speech windows could not be transcribed (provider limits). Re-upload later for a complete transcript.",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                                    className: "w-3 h-3"
                                                }),
                                                st?.dropped,
                                                " segment",
                                                st?.dropped === 1 ? '' : 's',
                                                " skipped — re-upload later for a full transcript"
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            type: "button",
                            onClick: onClose,
                            className: "text-[#5a6478] hover:text-[#c8d0e0] transition-colors p-1 shrink-0",
                            "aria-label": "Close",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                className: "w-4 h-4"
                            })
                        })
                    ]
                }),
                error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "px-5 py-8 text-center",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
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
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                            className: "w-5 h-5 animate-spin text-[#4fc3f7]"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "text-xs text-[#5a6478]",
                            children: "Loading transcript…"
                        })
                    ]
                }),
                !error && detail && s && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        s.status === 'failed' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mx-5 mt-3 px-3 py-2.5 rounded-lg border border-red-400/30 bg-red-400/10 flex items-start gap-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
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
                        insights && showInsights && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mx-5 mt-3 px-4 py-3 rounded-xl border border-white/[0.06] bg-[#0f1320] shrink-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    type: "button",
                                    className: "w-full flex items-center gap-2 text-left",
                                    onClick: ()=>setShowInsights(false),
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 text-[#4fc3f7] shrink-0"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[11px] font-semibold text-[#c8d0e0] truncate",
                                            children: insights.title
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 text-[#5a6478] ml-auto shrink-0"
                                        })
                                    ]
                                }),
                                insights.summary && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "text-[11px] leading-relaxed text-[#8b95a8] mt-2",
                                    children: insights.summary
                                }),
                                (insights.keywords.length > 0 || insights.topics.length > 0 || insights.entities.length > 0) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex flex-wrap gap-1.5 mt-2.5",
                                    children: [
                                        insights.keywords.slice(0, 10).map((k)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                type: "button",
                                                onClick: ()=>setQuery(k),
                                                className: "px-2 py-0.5 rounded-md bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7] text-[10px] hover:bg-[#4fc3f7]/20 transition-colors",
                                                children: k
                                            }, `kw-${k}`)),
                                        insights.topics.slice(0, 5).map((t)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[#8b95a8] text-[10px]",
                                                children: t
                                            }, `tp-${t}`)),
                                        insights.entities.slice(0, 8).map((t)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "px-2 py-0.5 rounded-md bg-emerald-400/[0.07] border border-emerald-400/20 text-emerald-300/80 text-[10px]",
                                                children: t
                                            }, `en-${t}`))
                                    ]
                                })
                            ]
                        }),
                        insights && !showInsights && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            type: "button",
                            onClick: ()=>setShowInsights(true),
                            className: "mx-5 mt-3 px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-[#5a6478] hover:text-[#8b95a8] flex items-center gap-1.5 self-start",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                    className: "w-3 h-3"
                                }),
                                " Show insights",
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                    className: "w-3 h-3"
                                })
                            ]
                        }),
                        transcript && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mx-5 mt-3 rounded-xl border border-white/[0.06] bg-[#0f1320] p-3 shrink-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    ref: canvasWrapRef,
                                    className: "w-full",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("canvas", {
                                        ref: canvasRef,
                                        onClick: onWaveformClick,
                                        className: audioOk ? 'cursor-pointer block' : 'block opacity-60',
                                        "aria-label": "Waveform — click to seek"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex items-center gap-2 mt-2.5 flex-wrap",
                                    children: audioOk ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                type: "button",
                                                onClick: togglePlay,
                                                "aria-label": playing ? 'Pause' : 'Play',
                                                className: "w-8 h-8 rounded-lg bg-[#4fc3f7]/15 border border-[#4fc3f7]/40 text-[#4fc3f7] flex items-center justify-center hover:bg-[#4fc3f7]/25 transition-colors",
                                                children: playing ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                                    className: "w-4 h-4"
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                                    className: "w-4 h-4 ml-0.5"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                type: "button",
                                                onClick: ()=>seekBy(-5),
                                                "aria-label": "Back 5 seconds",
                                                className: "w-8 h-8 rounded-lg border border-white/10 text-[#8b95a8] flex items-center justify-center hover:text-[#c8d0e0] hover:border-white/20 transition-colors",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                type: "button",
                                                onClick: ()=>seekBy(5),
                                                "aria-label": "Forward 5 seconds",
                                                className: "w-8 h-8 rounded-lg border border-white/10 text-[#8b95a8] flex items-center justify-center hover:text-[#c8d0e0] hover:border-white/20 transition-colors",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                    className: "w-3.5 h-3.5"
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "text-[11px] font-mono text-[#8b95a8] tabular-nums",
                                                children: [
                                                    fmtTime(currentTime),
                                                    " ",
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        className: "text-[#5a6478]",
                                                        children: [
                                                            "/ ",
                                                            fmtTime(transcript.durationSec)
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                                className: "ml-auto flex items-center gap-1.5 text-[10px] text-[#5a6478]",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                        type: "checkbox",
                                                        checked: follow,
                                                        onChange: (e)=>setFollow(e.target.checked),
                                                        className: "accent-[#4fc3f7] w-3 h-3"
                                                    }),
                                                    "follow playback"
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("select", {
                                                value: rate,
                                                onChange: (e)=>{
                                                    const r = Number.parseFloat(e.target.value) || 1;
                                                    setRate(r);
                                                    if (audioRef.current) audioRef.current.playbackRate = r;
                                                },
                                                "aria-label": "Playback speed",
                                                className: "bg-[#141926] border border-white/10 rounded-md text-[10px] text-[#8b95a8] px-1.5 py-1",
                                                children: [
                                                    0.75,
                                                    1,
                                                    1.25,
                                                    1.5,
                                                    2
                                                ].map((r)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                                        value: r,
                                                        children: r === 1 ? '1×' : `${r}×`
                                                    }, r))
                                            })
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "text-[10px] text-[#5a6478] flex items-center gap-1.5 py-1",
                                        children: [
                                            audioOk === null ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                                className: "w-3 h-3 animate-spin"
                                            }) : null,
                                            audioOk === false ? 'Original audio was not retained (uploaded before this upgrade) — timestamps are shown without playback.' : 'Checking for audio…'
                                        ]
                                    })
                                })
                            ]
                        }),
                        transcript && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2 px-5 pt-3 shrink-0 flex-wrap",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "relative flex-1 min-w-[180px]",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .A, {
                                            className: "w-3.5 h-3.5 text-[#5a6478] absolute left-2.5 top-1/2 -translate-y-1/2"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                            value: query,
                                            onChange: (e)=>{
                                                setQuery(e.target.value);
                                                setMatchIdx(0);
                                            },
                                            onKeyDown: (e)=>{
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    jumpMatch(e.shiftKey ? -1 : 1);
                                                }
                                            },
                                            placeholder: "Search the transcript…",
                                            className: "w-full pl-8 pr-20 py-1.5 rounded-lg bg-[#0f1320] border border-white/10 text-[11px] text-[#c8d0e0] placeholder:text-[#5a6478] focus:border-[#4fc3f7]/40 focus:outline-none"
                                        }),
                                        query.trim() && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                    className: "text-[10px] text-[#5a6478] tabular-nums",
                                                    children: matches.length === 0 ? '0' : `${matchIdx % Math.max(1, matches.length) + 1}/${matches.length}`
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    type: "button",
                                                    "aria-label": "Previous match",
                                                    onClick: ()=>jumpMatch(-1),
                                                    className: "w-5 h-5 rounded border border-white/10 text-[#8b95a8] hover:text-[#c8d0e0] flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                                        className: "w-3 h-3"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                    type: "button",
                                                    "aria-label": "Next match",
                                                    onClick: ()=>jumpMatch(1),
                                                    className: "w-5 h-5 rounded border border-white/10 text-[#8b95a8] hover:text-[#c8d0e0] flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                                        className: "w-3 h-3"
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "flex gap-1",
                                    children: [
                                        'sentences',
                                        'paragraphs',
                                        'raw'
                                    ].map((m)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                            type: "button",
                                            onClick: ()=>setMode(m),
                                            className: `px-2.5 py-1.5 rounded-lg text-[10px] font-semibold capitalize transition-colors ${mode === m ? 'bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7]' : 'border border-transparent text-[#5a6478] hover:text-[#8b95a8]'}`,
                                            children: m
                                        }, m))
                                })
                            ]
                        }),
                        transcript ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            ref: listRef,
                            className: "px-5 py-3 overflow-y-auto flex-1 min-h-0 space-y-1",
                            children: [
                                mode === 'sentences' && transcript.sentences.map((sen)=>{
                                    const isActive = sen.id === activeSentenceId;
                                    const isMatch = query.trim() && matches.includes(sen.id);
                                    const isCurrentMatch = query.trim() && matches.length > 0 && matches[matchIdx % matches.length] === sen.id;
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        "data-sid": sen.id,
                                        type: "button",
                                        onClick: ()=>{
                                            seekTo(sen.start);
                                            lastActiveRef.current = sen.id;
                                        },
                                        className: `w-full text-left flex items-start gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors ${isCurrentMatch ? 'bg-[#4fc3f7]/15 border border-[#4fc3f7]/40' : isActive ? 'bg-[#4fc3f7]/[0.08] border border-[#4fc3f7]/25' : isMatch ? 'bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06]' : 'border border-transparent hover:bg-white/[0.03]'}`,
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: `shrink-0 font-mono text-[10px] tabular-nums px-1.5 py-0.5 rounded-md border ${isActive ? 'text-[#4fc3f7] bg-[#4fc3f7]/10 border-[#4fc3f7]/30' : 'text-[#5a6478] bg-white/[0.03] border-white/[0.06]'}`,
                                                children: fmtTime(sen.start)
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: `text-[12px] leading-relaxed ${isActive ? 'text-[#e8f4ff]' : 'text-[#a8b3c5]'}`,
                                                children: highlight(sen.text)
                                            })
                                        ]
                                    }, sen.id);
                                }),
                                mode === 'paragraphs' && transcript.paragraphs.map((p, pi)=>{
                                    const sentences = transcript.sentences.slice(p.from, p.to + 1);
                                    const pStart = sentences[0]?.start ?? 0;
                                    const pEnd = sentences[sentences.length - 1]?.end ?? 0;
                                    const isActive = currentTime >= pStart && currentTime <= pEnd + 1;
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        "data-sid": p.from,
                                        type: "button",
                                        onClick: ()=>{
                                            seekTo(pStart);
                                            lastActiveRef.current = p.from;
                                        },
                                        className: `w-full text-left rounded-lg px-3 py-2.5 transition-colors border ${isActive ? 'bg-[#4fc3f7]/[0.08] border-[#4fc3f7]/25' : 'border-transparent hover:bg-white/[0.03]'}`,
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: `inline-block font-mono text-[10px] tabular-nums mb-1 px-1.5 py-0.5 rounded-md border ${isActive ? 'text-[#4fc3f7] bg-[#4fc3f7]/10 border-[#4fc3f7]/30' : 'text-[#5a6478] bg-white/[0.03] border-white/[0.06]'}`,
                                                children: fmtTime(pStart)
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "text-[12px] leading-relaxed text-[#a8b3c5]",
                                                children: highlight(sentences.map((x)=>x.text).join(' '))
                                            })
                                        ]
                                    }, pi);
                                }),
                                mode === 'raw' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("pre", {
                                    className: "whitespace-pre-wrap break-words text-[11px] leading-relaxed text-[#8b95a8] font-normal rounded-xl border border-white/[0.06] bg-[#0f1320] p-4",
                                    children: detail.content
                                })
                            ]
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "px-5 py-3 overflow-y-auto flex-1 min-h-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "rounded-xl border border-white/[0.06] bg-[#0f1320] p-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            className: "text-[10px] text-[#5a6478] uppercase tracking-widest mb-2",
                                            children: s.meta?.transcription || s.meta?.ocr || s.fileKind === 'audio' || s.fileKind === 'video' ? 'transcript' : 'extracted text'
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("pre", {
                                            className: "whitespace-pre-wrap break-words text-[11px] leading-relaxed text-[#a8b3c5] font-normal max-h-[52vh] overflow-y-auto",
                                            children: detail.content
                                        })
                                    ]
                                }),
                                (s.fileKind === 'audio' || s.meta?.fileKind === 'audio') && s.status === 'ready' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "text-[10px] text-[#5a6478] mt-2 flex items-start gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .A, {
                                            className: "w-3 h-3 mt-0.5 shrink-0"
                                        }),
                                        "Uploaded before the advanced transcription upgrade — re-upload the file to unlock the interactive studio (waveform, synced playback, sentence search, exports)."
                                    ]
                                })
                            ]
                        }),
                        transcript && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "px-5 py-3 border-t border-white/[0.08] flex items-center gap-2 flex-wrap shrink-0",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "text-[10px] text-[#5a6478] uppercase tracking-widest flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .A, {
                                            className: "w-3 h-3"
                                        }),
                                        " Export"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    type: "button",
                                    onClick: copyTxt,
                                    className: "flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-white/10 text-[10px] text-[#8b95a8] hover:text-[#c8d0e0] hover:border-white/20 transition-colors",
                                    children: [
                                        copied ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .A, {
                                            className: "w-3 h-3 text-emerald-400"
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_AlertTriangle_AlignLeft_Anchor_Braces_Check_ChevronDown_ChevronUp_Copy_Download_FileText_Gauge_Lightbulb_Loader2_Pause_Play_RotateCcw_RotateCw_Search_Timer_Type_X_lucide_react__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .A, {
                                            className: "w-3 h-3"
                                        }),
                                        copied ? 'Copied' : 'Copy'
                                    ]
                                }),
                                [
                                    'txt',
                                    'srt',
                                    'vtt',
                                    'json'
                                ].map((k)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        type: "button",
                                        onClick: ()=>exportAs(k),
                                        className: "px-2.5 py-1.5 rounded-md border border-white/10 text-[10px] uppercase text-[#8b95a8] hover:text-[#c8d0e0] hover:border-white/20 transition-colors",
                                        children: [
                                            ".",
                                            k
                                        ]
                                    }, k)),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "ml-auto text-[10px] text-[#5a6478] hidden sm:inline",
                                    children: "Space play/pause \xb7 ←/→ \xb15s \xb7 Enter next match"
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}


/***/ }),

/***/ 883292:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Bolt)
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
    name: "bolt",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
                key: "yt0hxn"
            }
        ],
        [
            "circle",
            {
                cx: "12",
                cy: "12",
                r: "4",
                key: "4exip2"
            }
        ]
    ]
};
__iconData.node;
const Bolt = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(__iconData);
 //# sourceMappingURL=bolt.mjs.map


/***/ }),

/***/ 903295:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ 918597:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(777943);
/* harmony import */ var react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__);
// This file is generated by the Webpack next-flight-loader.

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__.registerClientReference)(
function() { throw new Error("Attempted to call the default export of \"/workspaces/next/run/src/app/(app)/generate/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."); },
"/workspaces/next/run/src/app/(app)/generate/page.tsx",
"default",
));


/***/ }),

/***/ 927910:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

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

/***/ 972067:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ useJobSocket)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(106860);
/**
 * useJobSocket — React hook for real-time job progress via socket.io.
 * Falls back to polling if socket connection fails or drops.
 */ /* __next_internal_client_entry_do_not_use__ useJobSocket auto */ 

function useJobSocket(options = {}) {
    const socketRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const [connected, setConnected] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const currentJobRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const pollTimerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    // Store callbacks in refs so they can be used in effects without causing re-renders
    const callbacksRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(options);
    // Update ref inside effect to avoid React "Cannot update ref during render" error
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        callbacksRef.current = options;
    });
    // Start polling for a specific job (used as fallback when socket is down)
    const startPolling = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((jobId)=>{
        if (pollTimerRef.current) clearInterval(pollTimerRef.current);
        const pollUrl = callbacksRef.current.pollUrl;
        if (!pollUrl) return;
        const pollInterval = callbacksRef.current.pollIntervalMs || 3000;
        // Do an immediate first poll
        const doPoll = async ()=>{
            try {
                const res = await fetch(`${pollUrl}?jobId=${encodeURIComponent(jobId)}`);
                if (!res.ok) return;
                const data = await res.json();
                if (data.status === 'completed') {
                    callbacksRef.current.onCompleted?.(data);
                    // Cleanup will be handled by the callback
                    if (pollTimerRef.current) {
                        clearInterval(pollTimerRef.current);
                        pollTimerRef.current = null;
                    }
                    currentJobRef.current = null;
                } else if (data.status === 'failed') {
                    callbacksRef.current.onFailed?.(data);
                    if (pollTimerRef.current) {
                        clearInterval(pollTimerRef.current);
                        pollTimerRef.current = null;
                    }
                    currentJobRef.current = null;
                } else {
                    callbacksRef.current.onProgress?.(data);
                }
            } catch  {
            // Poll error — next poll will retry
            }
        };
        doPoll(); // Immediate first poll
        pollTimerRef.current = setInterval(doPoll, pollInterval);
    }, []);
    // Stop polling
    const stopPolling = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        if (pollTimerRef.current) {
            clearInterval(pollTimerRef.current);
            pollTimerRef.current = null;
        }
    }, []);
    // Cleanup a job: leave socket room, stop polling
    const cleanupJob = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((jobId)=>{
        if (currentJobRef.current === jobId) {
            socketRef.current?.emit('leave:job', jobId);
            currentJobRef.current = null;
        }
        stopPolling();
    }, [
        stopPolling
    ]);
    // Connect to socket service
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const socket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_1__.io)('/?XTransformPort=3003', {
            transports: [
                'websocket',
                'polling'
            ],
            reconnection: true,
            reconnectionAttempts: 15,
            reconnectionDelay: 1000
        });
        socket.on('connect', ()=>{
            console.log('[useJobSocket] Connected:', socket.id);
            setConnected(true);
            // Re-join the current job room if we reconnect
            if (currentJobRef.current) {
                socket.emit('join:job', currentJobRef.current);
                // Socket is back — stop polling fallback
                stopPolling();
            }
        });
        socket.on('disconnect', ()=>{
            console.log('[useJobSocket] Disconnected');
            setConnected(false);
            // Socket dropped — start polling as fallback if we're tracking a job
            if (currentJobRef.current && callbacksRef.current.pollUrl) {
                startPolling(currentJobRef.current);
            }
        });
        socket.on('job:progress', (data)=>{
            callbacksRef.current.onProgress?.(data);
        });
        socket.on('job:completed', (data)=>{
            callbacksRef.current.onCompleted?.(data);
            cleanupJob(data.jobId);
        });
        socket.on('job:failed', (data)=>{
            callbacksRef.current.onFailed?.(data);
            cleanupJob(data.jobId);
        });
        socketRef.current = socket;
        return ()=>{
            socket.disconnect();
            socketRef.current = null;
            stopPolling();
        };
    }, [
        cleanupJob,
        startPolling,
        stopPolling
    ]);
    /**
   * Start listening for a job's progress.
   * Joins the socket room and optionally starts polling as fallback.
   */ const listenToJob = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((jobId)=>{
        // Leave previous job room
        if (currentJobRef.current && currentJobRef.current !== jobId) {
            socketRef.current?.emit('leave:job', currentJobRef.current);
        }
        currentJobRef.current = jobId;
        // Join socket room
        if (socketRef.current?.connected) {
            socketRef.current.emit('join:job', jobId);
            // Socket is connected — no need for polling
            stopPolling();
        } else if (callbacksRef.current.pollUrl) {
            // Socket not connected — start polling as fallback
            startPolling(jobId);
        }
    }, [
        startPolling,
        stopPolling
    ]);
    /**
   * Stop listening to a job.
   */ const stopListening = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        if (currentJobRef.current) {
            cleanupJob(currentJobRef.current);
        }
    }, [
        cleanupJob
    ]);
    return {
        connected,
        listenToJob,
        stopListening
    };
}


/***/ }),

/***/ 979428:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 985680:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 362007));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,4515,476,799,6655,7043,6455,2976,9837,4336,1068,5362,3396,576,2954], () => (__webpack_exec__(758284)));
module.exports = __webpack_exports__;

})();