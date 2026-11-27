"use strict";
exports.id = 7798;
exports.ids = [7798];
exports.modules = {

/***/ 148874:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ 247798:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LP: () => (/* binding */ VoicePanel),
/* harmony export */   xX: () => (/* binding */ QuestionPicker),
/* harmony export */   zd: () => (/* binding */ InstantFeedbackPanel)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(244412);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(732438);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(954171);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(673097);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(67612);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(816414);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(862842);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(857762);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(239041);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(269357);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(229813);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(77014);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(199646);
/* harmony import */ var _barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(691995);
/* harmony import */ var _lib_medq_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(148874);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(337023);
/* __next_internal_client_entry_do_not_use__ VoicePanel,QuestionPicker,InstantFeedbackPanel auto */ 
/**
 * Reusable UI sub-components for the exam simulator:
 *   • VoicePanel      — mic button + transcript display + TTS controls
 *   • QuestionPicker  — search/filter/select UI for setup
 *   • InstantFeedbackPanel — shows correct/incorrect + explanation inline
 *
 * Used by both /exam-sim/page.tsx and ExamSimulatorTab.tsx.
 */ 



function VoicePanel({ voiceMode, voiceSettings, setVoiceSettings, voices, questionText, options, selectedLetter, onLetterSelected, onTranscript, answerMode, spokenText, setSpokenText, onOpenAnswerChange }) {
    const { isSpeaking, isPaused, speak, stop, togglePause } = (0,_shared__WEBPACK_IMPORTED_MODULE_3__/* .useSpeech */ .mt)(voiceSettings, voices);
    const { isRecording, interim, start, stop: stopRec } = (0,_shared__WEBPACK_IMPORTED_MODULE_3__/* .useSpeechRecognition */ .Vw)((transcript)=>{
        onTranscript(transcript);
        setSpokenText(transcript);
        if (answerMode === 'mcq') {
            const letter = (0,_shared__WEBPACK_IMPORTED_MODULE_3__/* .matchLetter */ .iP)(transcript);
            if (letter) {
                onLetterSelected(letter);
            }
        } else {
            onOpenAnswerChange(transcript);
        }
    });
    if (!voiceMode) return null;
    const fullText = `${(0,_shared__WEBPACK_IMPORTED_MODULE_3__/* .stripHtml */ .QZ)(questionText)}. ${options.map((o, i)=>`Option ${(0,_shared__WEBPACK_IMPORTED_MODULE_3__/* .indexToLetter */ .wS)(i)}: ${(0,_shared__WEBPACK_IMPORTED_MODULE_3__/* .stripHtml */ .QZ)(o)}`).join('. ')}`;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "mt-4 rounded-2xl border border-[#4fc3f7]/20 bg-[#4fc3f7]/[0.04] p-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2 mb-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                        className: "w-4 h-4 text-[#4fc3f7]"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                        className: "text-xs font-bold text-[#4fc3f7] uppercase tracking-wider",
                        children: "Voice mode"
                    }),
                    !_shared__WEBPACK_IMPORTED_MODULE_3__/* .TTS_SUPPORTED */ .dz && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-[10px] text-amber-400",
                        children: "(TTS unavailable)"
                    }),
                    !_shared__WEBPACK_IMPORTED_MODULE_3__/* .ASR_SUPPORTED */ .uq && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-[10px] text-amber-400",
                        children: "(mic unavailable)"
                    })
                ]
            }),
            _shared__WEBPACK_IMPORTED_MODULE_3__/* .TTS_SUPPORTED */ .dz && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2 mb-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: ()=>speak(fullText),
                        disabled: isSpeaking && !isPaused,
                        className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#4fc3f7]/15 text-[#4fc3f7] hover:bg-[#4fc3f7]/25 disabled:opacity-50",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            " Read aloud"
                        ]
                    }),
                    isSpeaking && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        onClick: togglePause,
                        className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs bg-white/5 text-[#e8ecf4] hover:bg-white/10",
                        children: isPaused ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5"
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5"
                        })
                    }),
                    isSpeaking && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        onClick: stop,
                        className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs bg-white/5 text-[#e8ecf4] hover:bg-white/10",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                            className: "w-3.5 h-3.5"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-[10px] text-[#5a6478] ml-auto",
                        children: isSpeaking ? isPaused ? 'paused' : 'speaking…' : ''
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col items-center py-3",
                children: [
                    !_shared__WEBPACK_IMPORTED_MODULE_3__/* .ASR_SUPPORTED */ .uq ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "text-center text-[10px] text-[#5a6478]",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                className: "w-8 h-8 mx-auto mb-1 opacity-50"
                            }),
                            "Voice input needs Chrome, Edge, or Safari."
                        ]
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: isRecording ? stopRec : start,
                        className: `relative w-16 h-16 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-red-500/30 text-red-300 ring-4 ring-red-500/40 animate-pulse' : 'bg-[#4fc3f7]/20 text-[#4fc3f7] hover:bg-[#4fc3f7]/30'}`,
                        title: isRecording ? 'Stop' : 'Speak your answer',
                        children: [
                            isRecording ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                className: "w-6 h-6"
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                className: "w-6 h-6"
                            }),
                            isRecording && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "absolute inset-0 rounded-full border-2 border-red-400/60 animate-ping"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "mt-2 text-[10px] text-[#5a6478]",
                        children: isRecording ? 'Listening… tap to stop' : _shared__WEBPACK_IMPORTED_MODULE_3__/* .ASR_SUPPORTED */ .uq ? answerMode === 'mcq' ? 'Say "B" / "option C" / "second one"' : 'Tap to speak your answer' : ''
                    })
                ]
            }),
            (interim || spokenText) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mt-2 p-2.5 rounded-lg bg-[#0a0e1a] border border-white/5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "text-[10px] text-[#5a6478] uppercase tracking-wider mb-0.5",
                        children: interim ? 'Hearing…' : 'Last captured'
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "text-xs text-[#e8ecf4]",
                        children: interim || spokenText
                    })
                ]
            }),
            answerMode === 'mcq' && selectedLetter && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mt-2 p-2.5 rounded-lg bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "w-6 h-6 rounded-full bg-[#4fc3f7] text-[#0a0e1a] flex items-center justify-center text-xs font-bold",
                        children: selectedLetter
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-xs text-[#e8ecf4]",
                        children: options[(0,_shared__WEBPACK_IMPORTED_MODULE_3__/* .letterToIndex */ .EF)(selectedLetter)] || '(no matching option)'
                    })
                ]
            }),
            answerMode === 'open' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                value: spokenText,
                onChange: (e)=>{
                    setSpokenText(e.target.value);
                    onOpenAnswerChange(e.target.value);
                },
                placeholder: "Your spoken answer will appear here. You can also type to edit.",
                className: "mt-2 w-full p-2.5 rounded-lg bg-[#0a0e1a] border border-white/10 text-[#e8ecf4] text-xs min-h-20 resize-y focus:outline-none focus:border-[#4fc3f7]"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("details", {
                className: "mt-3",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("summary", {
                        className: "text-[10px] text-[#5a6478] cursor-pointer hover:text-[#e8ecf4] flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                className: "w-3 h-3"
                            }),
                            " Voice settings"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "mt-2 p-3 rounded-lg bg-[#0a0e1a] border border-white/5 space-y-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                        className: "text-[10px] text-[#5a6478] block mb-1",
                                        children: "Voice"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                        value: voiceSettings.voiceURI || '',
                                        onChange: (e)=>setVoiceSettings((s)=>({
                                                    ...s,
                                                    voiceURI: e.target.value || null
                                                })),
                                        className: "w-full p-1.5 rounded-md bg-white/5 border border-white/10 text-[#e8ecf4] text-xs",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                                value: "",
                                                children: "Default"
                                            }),
                                            voices.map((v)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("option", {
                                                    value: v.voiceURI,
                                                    children: [
                                                        v.name,
                                                        " (",
                                                        v.lang,
                                                        ")"
                                                    ]
                                                }, v.voiceURI))
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                        className: "text-[10px] text-[#5a6478] block mb-1",
                                        children: [
                                            "Speed: ",
                                            voiceSettings.rate.toFixed(2),
                                            "\xd7"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                        type: "range",
                                        min: 0.5,
                                        max: 2,
                                        step: 0.05,
                                        value: voiceSettings.rate,
                                        onChange: (e)=>setVoiceSettings((s)=>({
                                                    ...s,
                                                    rate: parseFloat(e.target.value)
                                                })),
                                        className: "w-full accent-[#4fc3f7]"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                        className: "text-[10px] text-[#5a6478] block mb-1",
                                        children: [
                                            "Pitch: ",
                                            voiceSettings.pitch.toFixed(2)
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                        type: "range",
                                        min: 0,
                                        max: 2,
                                        step: 0.1,
                                        value: voiceSettings.pitch,
                                        onChange: (e)=>setVoiceSettings((s)=>({
                                                    ...s,
                                                    pitch: parseFloat(e.target.value)
                                                })),
                                        className: "w-full accent-[#4fc3f7]"
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
function QuestionPicker({ picker }) {
    const [showResults, setShowResults] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "rounded-xl border border-white/[0.08] bg-[#0a0e1a] p-4 space-y-3",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
                        className: "text-xs font-bold text-[#e8ecf4] uppercase tracking-wider",
                        children: "Pick questions"
                    }),
                    picker.selectedCount > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: picker.clear,
                        className: "text-[10px] text-[#ff8a8a] hover:underline flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                className: "w-3 h-3"
                            }),
                            " Clear (",
                            picker.selectedCount,
                            ")"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-1 sm:grid-cols-3 gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                        type: "text",
                        value: picker.query,
                        onChange: (e)=>picker.setQuery(e.target.value),
                        onKeyDown: (e)=>{
                            if (e.key === 'Enter') {
                                picker.search();
                                setShowResults(true);
                            }
                        },
                        placeholder: "Search question text…",
                        className: "sm:col-span-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-[#e8ecf4] focus:outline-none focus:border-[#4fc3f7]"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                        value: picker.system,
                        onChange: (e)=>picker.setSystem(e.target.value),
                        className: "px-2 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-[#e8ecf4]",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                value: "all",
                                children: "All systems"
                            }),
                            _lib_medq_types__WEBPACK_IMPORTED_MODULE_2__/* .MEDICAL_SYSTEMS */ .FU.map((s)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                    value: s,
                                    children: s
                                }, s))
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: ()=>{
                            picker.search();
                            setShowResults(true);
                        },
                        disabled: picker.loading,
                        className: "flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#4fc3f7]/15 text-[#4fc3f7] text-xs font-bold hover:bg-[#4fc3f7]/25 disabled:opacity-50",
                        children: [
                            picker.loading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5 animate-spin"
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                className: "w-3.5 h-3.5"
                            }),
                            "Search"
                        ]
                    })
                ]
            }),
            picker.selectedCount > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "text-[11px] text-[#00e5a0] font-semibold",
                children: [
                    "✓ ",
                    picker.selectedCount,
                    " question",
                    picker.selectedCount !== 1 ? 's' : '',
                    " selected — these will be used instead of random sampling"
                ]
            }),
            showResults && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "rounded-lg border border-white/[0.06] bg-[#0a0e1a] overflow-hidden",
                children: picker.loading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "p-4 text-center text-xs text-[#5a6478]",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                            className: "w-4 h-4 animate-spin mx-auto mb-1"
                        }),
                        " Searching…"
                    ]
                }) : picker.results.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "p-4 text-center text-xs text-[#5a6478]",
                    children: picker.searched ? 'No questions match your filters.' : 'Click Search to find questions.'
                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        (()=>{
                            const visibleIds = picker.results.map((q)=>q.id);
                            const allSelected = visibleIds.every((id)=>picker.selected.has(id));
                            const someSelected = visibleIds.some((id)=>picker.selected.has(id));
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "sticky top-0 z-10 flex items-center gap-2 px-3 py-2 bg-[#151821] border-b border-white/[0.06] text-xs",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        type: "button",
                                        onClick: ()=>allSelected ? picker.deselectAll(visibleIds) : picker.selectAll(visibleIds),
                                        className: `flex items-center gap-1.5 px-2.5 py-1 rounded-md font-bold transition-all ${allSelected ? 'bg-[#ff5757]/15 text-[#ff8a8a] hover:bg-[#ff5757]/25' : 'bg-[#00e5a0]/15 text-[#00e5a0] hover:bg-[#00e5a0]/25'}`,
                                        title: allSelected ? 'Deselect all visible results' : 'Select all visible results',
                                        children: [
                                            allSelected ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5"
                                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                                className: "w-3.5 h-3.5"
                                            }),
                                            allSelected ? 'Deselect all' : 'Select all',
                                            " (",
                                            visibleIds.length,
                                            ")"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[#5a6478] text-[10px]",
                                        children: someSelected && !allSelected ? `${visibleIds.filter((id)=>picker.selected.has(id)).length} of ${visibleIds.length} visible selected` : `· ${picker.selectedCount} total selected`
                                    })
                                ]
                            });
                        })(),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "max-h-72 overflow-y-auto divide-y divide-white/[0.04]",
                            children: picker.results.map((q)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PickerRow, {
                                    q: q,
                                    selected: picker.selected.has(q.id),
                                    onToggle: ()=>picker.toggle(q.id)
                                }, q.id))
                        })
                    ]
                })
            })
        ]
    });
}
function PickerRow({ q, selected, onToggle }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        type: "button",
        onClick: onToggle,
        className: `w-full text-left p-3 hover:bg-white/[0.03] transition-all flex items-start gap-2 ${selected ? 'bg-[#00e5a0]/[0.06]' : ''}`,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: `mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 ${selected ? 'bg-[#00e5a0] border-[#00e5a0] text-[#0a0e1a]' : 'border-white/20 text-transparent'}`,
                children: selected && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                    className: "w-3.5 h-3.5"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-xs text-[#e8ecf4] line-clamp-2",
                        children: q.text || '(empty question text)'
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-wrap items-center gap-1.5 mt-1",
                        children: [
                            q.system && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[9px] px-1.5 py-0.5 rounded bg-[#4fc3f7]/15 text-[#4fc3f7]",
                                children: q.system
                            }),
                            q.topic && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-[#8b95a8]",
                                children: q.topic
                            }),
                            q.difficulty && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-[#8b95a8]",
                                children: q.difficulty
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-[9px] text-[#5a6478]",
                                children: [
                                    q.optionsCount,
                                    " options"
                                ]
                            }),
                            q.isAIGenerated && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[9px] text-[#a78bfa]",
                                children: "AI"
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
function InstantFeedbackPanel({ feedback, checking, onNext, isLast }) {
    if (checking) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "mt-4 p-4 rounded-xl border border-white/10 bg-white/5 flex items-center gap-2",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                    className: "w-4 h-4 animate-spin text-[#4fc3f7]"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "text-xs text-[#8b95a8]",
                    children: "Checking your answer…"
                })
            ]
        });
    }
    if (!feedback) return null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: `mt-4 rounded-xl border p-4 ${feedback.correct ? 'border-[#00e5a0]/40 bg-[#00e5a0]/[0.06]' : 'border-[#ff5757]/40 bg-[#ff5757]/[0.06]'}`,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2 mb-2",
                children: [
                    feedback.correct ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                        className: "w-5 h-5 text-[#00e5a0]"
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                        className: "w-5 h-5 text-[#ff5757]"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
                        className: `text-sm font-bold ${feedback.correct ? 'text-[#00e5a0]' : 'text-[#ff8a8a]'}`,
                        children: feedback.correct ? 'Correct!' : feedback.blank ? 'No answer' : 'Not quite'
                    })
                ]
            }),
            !feedback.correct && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                className: "text-xs text-[#8b95a8] mb-2",
                children: [
                    "Correct answer: ",
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-[#00e5a0] font-bold",
                        children: feedback.correctAnswer
                    })
                ]
            }),
            feedback.explanation && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "text-xs text-[#e8ecf4] leading-relaxed whitespace-pre-wrap mb-2",
                children: feedback.explanation
            }),
            feedback.clinicalPearl && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "text-[11px] text-[#f59e0b] mt-2 p-2 rounded-lg bg-[#f59e0b]/[0.06] border border-[#f59e0b]/20",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "font-bold",
                        children: "Clinical pearl: "
                    }),
                    feedback.clinicalPearl
                ]
            }),
            feedback.mnemonic && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "text-[11px] text-[#a78bfa] mt-2 p-2 rounded-lg bg-[#a78bfa]/[0.06] border border-[#a78bfa]/20",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "font-bold",
                        children: "Mnemonic: "
                    }),
                    feedback.mnemonic
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                type: "button",
                onClick: onNext,
                className: "mt-3 w-full py-2 rounded-lg text-xs font-bold bg-[#4fc3f7] text-[#0a0e1a] hover:bg-[#4fc3f7]/90 flex items-center justify-center gap-1.5",
                children: [
                    isLast ? 'Finish & see report' : 'Next question',
                    " ",
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckCircle2_ChevronRight_Headphones_Loader2_Mic_MicOff_Pause_Play_Search_Settings_Square_Trash2_Volume2_XCircle_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                        className: "w-3.5 h-3.5"
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 337023:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EF: () => (/* binding */ letterToIndex),
/* harmony export */   Jf: () => (/* binding */ useVoiceSettings),
/* harmony export */   QZ: () => (/* binding */ stripHtml),
/* harmony export */   Vw: () => (/* binding */ useSpeechRecognition),
/* harmony export */   Yg: () => (/* binding */ useInstantFeedback),
/* harmony export */   dz: () => (/* binding */ TTS_SUPPORTED),
/* harmony export */   iP: () => (/* binding */ matchLetter),
/* harmony export */   mt: () => (/* binding */ useSpeech),
/* harmony export */   oi: () => (/* binding */ useQuestionPicker),
/* harmony export */   uq: () => (/* binding */ ASR_SUPPORTED),
/* harmony export */   wS: () => (/* binding */ indexToLetter)
/* harmony export */ });
/* unused harmony export DEFAULT_VOICE_SETTINGS */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(890707);
/* __next_internal_client_entry_do_not_use__ DEFAULT_VOICE_SETTINGS,TTS_SUPPORTED,ASR_SUPPORTED,stripHtml,letterToIndex,indexToLetter,matchLetter,useVoiceSettings,useSpeech,useSpeechRecognition,useQuestionPicker,useInstantFeedback auto */ /**
 * Shared exam-simulator logic: voice (TTS + ASR), question picker,
 * instant-feedback check.
 *
 * Extracted from the standalone /exam-sim page and ExamSimulatorTab so both
 * surfaces (the standalone route and the in-app tab) get identical behavior
 * without copy-paste divergence.
 *
 * Voice: uses the browser-native Web Speech API (speechSynthesis for TTS,
 * SpeechRecognition for ASR) — no API keys, no audio leaves the device.
 */ 

const DEFAULT_VOICE_SETTINGS = {
    rate: 0.95,
    pitch: 1,
    voiceURI: null
};
const SETTINGS_KEY = 'voice-exam-settings-v1';
// ── Capability flags ──
const TTS_SUPPORTED =  false && 0;
const ASR_SUPPORTED =  false && (0);
// ── Helpers ──
function stripHtml(s) {
    return String(s ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}
function letterToIndex(letter) {
    const l = letter.toUpperCase();
    if (l >= 'A' && l <= 'Z') return l.charCodeAt(0) - 'A'.charCodeAt(0);
    return -1;
}
function indexToLetter(i) {
    return String.fromCharCode('A'.charCodeAt(0) + i);
}
/**
 * Map a spoken transcript to a MCQ option index.
 * Handles: "B", "option B", "the answer is C", "second one", "third",
 * "1", "2", "the answer is the third option", etc.
 */ function matchLetter(transcript) {
    const t = transcript.toLowerCase().trim();
    if (!t) return null;
    const m1 = t.match(/\b([a-e])\b/);
    if (m1) return m1[1].toUpperCase();
    const m2 = t.match(/(?:option|answer|choice|letter)\s+([a-e])\b/);
    if (m2) return m2[1].toUpperCase();
    const ordMap = {
        first: 'A',
        second: 'B',
        third: 'C',
        fourth: 'D',
        fifth: 'E',
        '1st': 'A',
        '2nd': 'B',
        '3rd': 'C',
        '4th': 'D',
        '5th': 'E',
        one: 'A',
        two: 'B',
        three: 'C',
        four: 'D',
        five: 'E'
    };
    for (const [k, v] of Object.entries(ordMap)){
        if (new RegExp(`\\b${k}\\b`).test(t)) return v;
    }
    const m3 = t.match(/\b([1-5])\b/);
    if (m3) return indexToLetter(parseInt(m3[1], 10) - 1);
    return null;
}
// ── useVoiceSettings hook ──
function useVoiceSettings() {
    const [settings, setSettings] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(DEFAULT_VOICE_SETTINGS);
    const [voices, setVoices] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        try {
            const raw = localStorage.getItem(SETTINGS_KEY);
            if (raw) setSettings({
                ...DEFAULT_VOICE_SETTINGS,
                ...JSON.parse(raw)
            });
        } catch  {}
    }, []);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        try {
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        } catch  {}
    }, [
        settings
    ]);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (!TTS_SUPPORTED) return;
        const load = ()=>{
            const v = window.speechSynthesis.getVoices();
            setVoices(v);
            setSettings((s)=>{
                if (s.voiceURI) return s;
                const en = v.find((x)=>x.lang.startsWith('en'));
                return en ? {
                    ...s,
                    voiceURI: en.voiceURI
                } : s;
            });
        };
        load();
        window.speechSynthesis.onvoiceschanged = load;
        return ()=>{
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);
    return {
        settings,
        setSettings,
        voices
    };
}
// ── useSpeech hook (TTS) ──
function useSpeech(settings, voices) {
    const [isSpeaking, setIsSpeaking] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [isPaused, setIsPaused] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const supported = TTS_SUPPORTED ||  false && 0;
    const speak = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((text, onDone)=>{
        if (!text) {
            onDone?.();
            return;
        }
        // Chrome fires no voiceschanged before first getVoices() in some
        // profiles; if no voice matches, still speak with the default voice
        // instead of silently dropping the line.
        if (!('speechSynthesis' in window)) {
            onDone?.();
            return;
        }
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        u.rate = settings.rate;
        u.pitch = settings.pitch;
        if (settings.voiceURI) {
            const v = voices.find((x)=>x.voiceURI === settings.voiceURI);
            if (v) u.voice = v;
        }
        u.onstart = ()=>{
            setIsSpeaking(true);
            setIsPaused(false);
        };
        const done = ()=>{
            setIsSpeaking(false);
            setIsPaused(false);
            onDone?.();
        };
        u.onend = done;
        u.onerror = done;
        window.speechSynthesis.speak(u);
        // Chrome long-utterance stall workaround: kick resume periodically
        // while the utterance is supposed to be speaking.
        const kick = setInterval(()=>{
            if (!window.speechSynthesis.speaking) {
                clearInterval(kick);
                return;
            }
            try {
                window.speechSynthesis.resume();
            } catch  {
                clearInterval(kick);
            }
        }, 5000);
        const origEnd = u.onend;
        u.onend = ()=>{
            clearInterval(kick);
            origEnd?.call(u);
        };
        // Failsafe: if synthesis neither starts nor errors within 3s (headless
        // Chromium without voices), resolve the callback so callers unblock.
        setTimeout(()=>{
            if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
                clearInterval(kick);
                setIsSpeaking(false);
                onDone?.();
            }
        }, 3000);
    }, [
        settings.rate,
        settings.pitch,
        settings.voiceURI,
        voices
    ]);
    const stop = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        if (!supported) return;
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
    }, [
        supported
    ]);
    const togglePause = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        if (!supported) return;
        if (isPaused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
        } else {
            window.speechSynthesis.pause();
            setIsPaused(true);
        }
    }, [
        isPaused,
        supported
    ]);
    // Cleanup on unmount
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        return ()=>{
            if (TTS_SUPPORTED) window.speechSynthesis.cancel();
        };
    }, []);
    return {
        isSpeaking,
        isPaused,
        speak,
        stop,
        togglePause
    };
}
// ── useSpeechRecognition hook (ASR) ──
//
// `continuous` mode keeps the recognition session alive across utterances
// (Chrome still self-terminates it on silence — the `onend` auto-restart
// below re-arms it). Final transcripts are delivered one per callback.
// While `suppressWhileSpeaking` is set, results are ignored — that is how
// the caller keeps the mic from transcribing the device's own TTS output
// when headphones are not used.
function useSpeechRecognition(onFinal, opts = {}) {
    const { continuous = false, lang = 'en-US' } = opts;
    const [isRecording, setIsRecording] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [interim, setInterim] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const recognitionRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const onFinalRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onFinal);
    onFinalRef.current = onFinal;
    const activeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    const restartTimerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    /** Set while the caller asked us to ignore results (TTS playing). */ const suppressRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    const setSuppress = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((value)=>{
        suppressRef.current = value;
    }, []);
    const start = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        if (!ASR_SUPPORTED) {
            sonner__WEBPACK_IMPORTED_MODULE_1__.toast.error('Voice input is not supported in this browser. Try Chrome, Edge, or Safari.');
            return;
        }
        activeRef.current = true;
        const launch = ()=>{
            const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
            const rec = new Ctor();
            rec.lang = lang;
            rec.continuous = continuous;
            rec.interimResults = true;
            rec.maxAlternatives = 1;
            let finalText = '';
            rec.onstart = ()=>{
                setIsRecording(true);
                setInterim('');
                finalText = '';
            };
            rec.onerror = (e)=>{
                if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
                    // Permission gone — stop the loop, tell the user once.
                    activeRef.current = false;
                    setIsRecording(false);
                    sonner__WEBPACK_IMPORTED_MODULE_1__.toast.error('Microphone access was blocked. Allow the mic in the browser to talk to the patient.');
                    return;
                }
                if (e.error !== 'no-speech' && e.error !== 'aborted') {
                    sonner__WEBPACK_IMPORTED_MODULE_1__.toast.error(`Voice error: ${e.error}`);
                }
            };
            rec.onend = ()=>{
                setIsRecording(false);
                setInterim('');
                // Flush anything the caller never saw (Chrome ends the session on
                // its own after silence; finals accumulated since the last result
                // batch must not be lost).
                if (finalText.trim() && !suppressRef.current) {
                    onFinalRef.current(finalText.trim());
                    finalText = '';
                }
                // Continuous mode: Chrome terminated the session — re-arm it while
                // the caller still wants the mic.
                if (activeRef.current) {
                    if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
                    restartTimerRef.current = setTimeout(()=>{
                        if (activeRef.current) launch();
                    }, 300);
                }
            };
            rec.onresult = (e)=>{
                let txt = '';
                for(let i = e.resultIndex; i < e.results.length; i++){
                    txt += e.results[i][0].transcript;
                }
                finalText = txt;
                if (!suppressRef.current) setInterim(txt);
                else setInterim('');
            };
            recognitionRef.current = rec;
            try {
                rec.start();
            } catch  {
                // "already started" — the previous session hasn't torn down yet;
                // retry shortly instead of failing the whole mode.
                if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
                restartTimerRef.current = setTimeout(()=>{
                    if (activeRef.current) launch();
                }, 400);
            }
        };
        launch();
    }, [
        continuous,
        lang
    ]);
    const stop = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        activeRef.current = false;
        if (restartTimerRef.current) {
            clearTimeout(restartTimerRef.current);
            restartTimerRef.current = null;
        }
        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch  {}
        }
        setIsRecording(false);
    }, []);
    const abort = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        activeRef.current = false;
        if (restartTimerRef.current) {
            clearTimeout(restartTimerRef.current);
            restartTimerRef.current = null;
        }
        if (recognitionRef.current) {
            try {
                recognitionRef.current.abort();
            } catch  {}
        }
        setIsRecording(false);
        setInterim('');
    }, []);
    // Cleanup on unmount
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        return ()=>{
            activeRef.current = false;
            if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
            if (recognitionRef.current) try {
                recognitionRef.current.abort();
            } catch  {}
        };
    }, []);
    return {
        isRecording,
        interim,
        start,
        stop,
        abort,
        setSuppress
    };
}
// ── useQuestionPicker hook ──
function useQuestionPicker() {
    const [query, setQuery] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const [system, setSystem] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('all');
    const [topic, setTopic] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('all');
    const [results, setResults] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [selected, setSelected] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(new Set());
    const [searched, setSearched] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const search = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async ()=>{
        setLoading(true);
        setSearched(true);
        try {
            const params = new URLSearchParams();
            if (query.trim()) params.set('q', query.trim());
            if (system !== 'all') params.set('system', system);
            if (topic !== 'all') params.set('topic', topic);
            params.set('limit', '100');
            const res = await fetch(`/api/exam-sim/search-questions?${params.toString()}`);
            const data = await res.json();
            if (res.ok) setResults(data.questions || []);
            else sonner__WEBPACK_IMPORTED_MODULE_1__.toast.error(data.error || 'Search failed');
        } catch  {
            sonner__WEBPACK_IMPORTED_MODULE_1__.toast.error('Search failed — check your connection');
        } finally{
            setLoading(false);
        }
    }, [
        query,
        system,
        topic
    ]);
    const toggle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((id)=>{
        setSelected((prev)=>{
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }, []);
    // Select every ID in a given list (additive — keeps already-selected ones).
    // Used by the picker's "Select all N results" button.
    const selectAll = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((ids)=>{
        setSelected((prev)=>{
            const next = new Set(prev);
            for (const id of ids)next.add(id);
            return next;
        });
    }, []);
    // Deselect every ID in a given list (used by "Deselect all N results").
    const deselectAll = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((ids)=>{
        setSelected((prev)=>{
            const next = new Set(prev);
            for (const id of ids)next.delete(id);
            return next;
        });
    }, []);
    const clear = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>setSelected(new Set()), []);
    const selectedIds = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>[
            ...selected
        ], [
        selected
    ]);
    return {
        query,
        setQuery,
        system,
        setSystem,
        topic,
        setTopic,
        results,
        loading,
        searched,
        selected,
        selectedCount: selected.size,
        search,
        toggle,
        selectAll,
        deselectAll,
        clear,
        selectedIds
    };
}
// ── useInstantFeedback hook ──
function useInstantFeedback(examId) {
    const [feedback, setFeedback] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
    const [checking, setChecking] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(new Set());
    const check = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (questionId, answer)=>{
        if (!examId || !answer) return;
        setChecking((prev)=>new Set(prev).add(questionId));
        try {
            const res = await fetch(`/api/exam-sim/${examId}/check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    questionId,
                    answer
                })
            });
            const data = await res.json();
            if (res.ok) {
                setFeedback((prev)=>({
                        ...prev,
                        [questionId]: data
                    }));
            } else {
                sonner__WEBPACK_IMPORTED_MODULE_1__.toast.error(data.error || 'Could not check answer');
            }
        } catch  {
            sonner__WEBPACK_IMPORTED_MODULE_1__.toast.error('Could not check answer — check your connection');
        } finally{
            setChecking((prev)=>{
                const next = new Set(prev);
                next.delete(questionId);
                return next;
            });
        }
    }, [
        examId
    ]);
    const clear = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>setFeedback({}), []);
    return {
        feedback,
        checking,
        check,
        clear
    };
}


/***/ })

};
;