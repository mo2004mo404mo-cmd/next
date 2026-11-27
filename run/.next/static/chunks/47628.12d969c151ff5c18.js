"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[47628],{

/***/ 47628:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(75860);
/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(21728);
/* harmony import */ var _react_three_drei__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(49667);
/* harmony import */ var _react_three_drei__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(83678);
/* harmony import */ var _react_three_drei__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(31091);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(97650);
/* harmony import */ var three_examples_jsm_loaders_OBJLoader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(45282);
/* harmony import */ var _barrel_optimize_names_Box_Eye_EyeOff_Grid3X3_Loader2_RotateCcw_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(92571);
/* harmony import */ var _barrel_optimize_names_Box_Eye_EyeOff_Grid3X3_Loader2_RotateCcw_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(25182);
/* harmony import */ var _barrel_optimize_names_Box_Eye_EyeOff_Grid3X3_Loader2_RotateCcw_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(89034);
/* harmony import */ var _barrel_optimize_names_Box_Eye_EyeOff_Grid3X3_Loader2_RotateCcw_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(92298);
/* harmony import */ var _barrel_optimize_names_Box_Eye_EyeOff_Grid3X3_Loader2_RotateCcw_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(29450);
/* harmony import */ var _barrel_optimize_names_Box_Eye_EyeOff_Grid3X3_Loader2_RotateCcw_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(38426);
/* harmony import */ var _barrel_optimize_names_Box_Eye_EyeOff_Grid3X3_Loader2_RotateCcw_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(47603);
/* __next_internal_client_entry_do_not_use__ default auto */ 






// ── Color mapping for categories ──
const CATEGORY_COLORS = {
    skeletal: '#f5f0e0',
    muscular: '#c0392b',
    cardiovascular: '#e74c3c',
    nervous: '#f1c40f',
    digestive: '#d4956a',
    respiratory: '#f0a0a0',
    urinary: '#b05050',
    reproductive: '#ec4899',
    endocrine: '#a855f7',
    lymphatic: '#06b6d4',
    integumentary: '#e8b89d'
};
// ── Dark theme colors ──
const C = {
    bg: 'var(--medq-app-bg, #0c0e14)',
    card: 'var(--medq-card-bg, rgba(255,255,255,0.03))',
    cardSolid: '#151821',
    cardBorder: 'var(--medq-card-border, rgba(255,255,255,0.06))',
    green: 'var(--medq-accent-green, #00e5a0)',
    amber: 'var(--medq-accent-amber, #ffb347)',
    danger: 'var(--medq-accent-danger, #ff5757)',
    gray: '#3a4055',
    text: 'var(--medq-text, #e8ecf4)',
    muted: 'var(--medq-muted, #5a6478)',
    cyan: 'var(--medq-accent-cyan, #22d3ee)'
};
// ── Model cache ──
const modelCache = new Map();
// ── Inner scene component that loads and renders the OBJ model ──
function OBJModelScene({ fjId, category, modelName, wireframe, colorOverride }) {
    const groupRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!fjId) return;
        let cancelled = false;
        const loadModel = async ()=>{
            setLoading(true);
            setError(null);
            try {
                // Check cache first
                if (modelCache.has(fjId)) {
                    if (!cancelled) {
                        const cachedGroup = modelCache.get(fjId);
                        if (groupRef.current) {
                            groupRef.current.clear();
                            const clonedGroup = cachedGroup.clone();
                            groupRef.current.add(clonedGroup);
                        }
                        setLoading(false);
                    }
                    return;
                }
                // Fetch OBJ content from API
                const response = await fetch(`/api/anatomy-3d?action=obj&modelId=${fjId}`);
                if (!response.ok) {
                    throw new Error(`Failed to load model (${response.status})`);
                }
                const objText = await response.text();
                if (cancelled) return;
                // Parse OBJ using OBJLoader
                const loader = new three_examples_jsm_loaders_OBJLoader_js__WEBPACK_IMPORTED_MODULE_2__/* .OBJLoader */ .L();
                const parsedObject = loader.parse(objText);
                // Get category color
                const color = colorOverride || CATEGORY_COLORS[category] || '#c0c0c0';
                // Apply materials to all meshes
                parsedObject.traverse((child)=>{
                    if (child.isMesh) {
                        const mesh = child;
                        const material = new three__WEBPACK_IMPORTED_MODULE_3__/* .MeshStandardMaterial */ ._4j({
                            color: new three__WEBPACK_IMPORTED_MODULE_3__/* .Color */ .Q1f(color),
                            roughness: 0.45,
                            metalness: 0.15,
                            side: three__WEBPACK_IMPORTED_MODULE_3__/* .DoubleSide */ .$EB,
                            flatShading: false
                        });
                        if (!mesh.geometry.attributes.normal) {
                            mesh.geometry.computeVertexNormals();
                        }
                        mesh.material = material;
                        mesh.castShadow = true;
                        mesh.receiveShadow = true;
                    }
                });
                // Auto-center and auto-scale
                const box = new three__WEBPACK_IMPORTED_MODULE_3__/* .Box3 */ .NRn().setFromObject(parsedObject);
                const center = box.getCenter(new three__WEBPACK_IMPORTED_MODULE_3__/* .Vector3 */ .Pq0());
                const size = box.getSize(new three__WEBPACK_IMPORTED_MODULE_3__/* .Vector3 */ .Pq0());
                const maxDim = Math.max(size.x, size.y, size.z);
                let scaleFactor = 1;
                if (maxDim > 0) {
                    const targetSize = 2.5;
                    scaleFactor = targetSize / maxDim;
                    parsedObject.scale.set(scaleFactor, scaleFactor, scaleFactor);
                }
                parsedObject.position.set(-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor);
                // Rotate from supine (lying on back with Z-up) to standing (Y-up anatomical position)
                parsedObject.rotation.set(-Math.PI / 2, 0, 0);
                // Cache the processed model
                modelCache.set(fjId, parsedObject);
                if (!cancelled && groupRef.current) {
                    groupRef.current.clear();
                    groupRef.current.add(parsedObject);
                }
                setLoading(false);
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Failed to load model');
                    setLoading(false);
                }
            }
        };
        loadModel();
        return ()=>{
            cancelled = true;
        };
    }, [
        fjId,
        category,
        colorOverride
    ]);
    // Apply wireframe mode to all meshes when toggled
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!groupRef.current) return;
        groupRef.current.traverse((child)=>{
            if (child.isMesh) {
                const mesh = child;
                const mat = mesh.material;
                if (mat && mat.wireframe !== undefined) {
                    mat.wireframe = wireframe || false;
                    mat.needsUpdate = true;
                }
            }
        });
    }, [
        wireframe
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("group", {
                ref: groupRef
            }),
            loading && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_react_three_drei__WEBPACK_IMPORTED_MODULE_4__/* .Html */ .E, {
                center: true,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex flex-col items-center gap-3 px-6 py-5 rounded-xl",
                    style: {
                        background: 'rgba(0,0,0,0.9)',
                        backdropFilter: 'blur(16px)',
                        border: `1px solid ${C.cardBorder}`
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_Eye_EyeOff_Grid3X3_Loader2_RotateCcw_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                            className: "w-8 h-8 animate-spin",
                            style: {
                                color: C.cyan
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "text-sm font-medium",
                            style: {
                                color: C.text
                            },
                            children: "Loading 3D Model..."
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "text-xs",
                            style: {
                                color: C.muted
                            },
                            children: modelName
                        })
                    ]
                })
            }),
            error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_react_three_drei__WEBPACK_IMPORTED_MODULE_4__/* .Html */ .E, {
                center: true,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex flex-col items-center gap-3 px-6 py-5 rounded-xl",
                    style: {
                        background: 'rgba(0,0,0,0.9)',
                        backdropFilter: 'blur(16px)',
                        border: `1px solid ${C.danger}40`
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "text-sm font-medium",
                            style: {
                                color: C.danger
                            },
                            children: "Failed to load model"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "text-xs",
                            style: {
                                color: C.muted
                            },
                            children: error
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: ()=>window.location.reload(),
                            className: "mt-1 px-3 py-1.5 rounded-lg text-xs font-semibold",
                            style: {
                                background: `${C.danger}20`,
                                color: C.danger
                            },
                            children: "Retry"
                        })
                    ]
                })
            })
        ]
    });
}
function MultiModelScene({ models, wireframe, highlightedIndex, onModelClick }) {
    // Calculate grid dimensions
    const cols = 2;
    const rows = Math.ceil(models.length / cols);
    const cellSize = 3;
    const gap = 1;
    // Calculate total grid size for centering
    const totalWidth = cols * cellSize + (cols - 1) * gap;
    const totalHeight = rows * cellSize + (rows - 1) * gap;
    const offsetX = -totalWidth / 2 + cellSize / 2;
    const offsetY = totalHeight / 2 - cellSize / 2;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: models.map((model, index)=>{
            const col = index % cols;
            const row = Math.floor(index / cols);
            const x = offsetX + col * (cellSize + gap);
            const y = offsetY - row * (cellSize + gap);
            const isHighlighted = highlightedIndex === index;
            const isDimmed = highlightedIndex !== null && highlightedIndex !== index;
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("group", {
                position: [
                    x,
                    y,
                    0
                ],
                onClick: (e)=>{
                    e.stopPropagation();
                    onModelClick(index);
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("mesh", {
                        position: [
                            0,
                            0,
                            -0.5
                        ],
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("planeGeometry", {
                                args: [
                                    cellSize - 0.2,
                                    cellSize - 0.2
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("meshStandardMaterial", {
                                color: isHighlighted ? model.colorOverride || CATEGORY_COLORS[model.category] || '#c0c0c0' : '#1a1e2b',
                                roughness: 0.9,
                                metalness: 0.05,
                                transparent: true,
                                opacity: isHighlighted ? 0.15 : isDimmed ? 0.3 : 0.6,
                                side: three__WEBPACK_IMPORTED_MODULE_3__/* .DoubleSide */ .$EB
                            })
                        ]
                    }),
                    isHighlighted && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("mesh", {
                        position: [
                            0,
                            0,
                            -0.48
                        ],
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("planeGeometry", {
                                args: [
                                    cellSize - 0.1,
                                    cellSize - 0.1
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("meshStandardMaterial", {
                                color: model.colorOverride || CATEGORY_COLORS[model.category] || '#22d3ee',
                                roughness: 0.8,
                                metalness: 0.1,
                                transparent: true,
                                opacity: 0.08,
                                side: three__WEBPACK_IMPORTED_MODULE_3__/* .DoubleSide */ .$EB
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("group", {
                        scale: isDimmed ? [
                            0.6,
                            0.6,
                            0.6
                        ] : [
                            1,
                            1,
                            1
                        ],
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(OBJModelScene, {
                            fjId: model.fjId,
                            category: model.category,
                            modelName: model.modelName,
                            wireframe: wireframe,
                            colorOverride: model.colorOverride || null
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_react_three_drei__WEBPACK_IMPORTED_MODULE_4__/* .Html */ .E, {
                        position: [
                            0,
                            -(cellSize / 2) + 0.25,
                            0
                        ],
                        center: true,
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "px-2 py-1 rounded-md text-center whitespace-nowrap",
                            style: {
                                background: isHighlighted ? `${model.colorOverride || CATEGORY_COLORS[model.category] || '#22d3ee'}20` : 'rgba(0,0,0,0.75)',
                                border: `1px solid ${isHighlighted ? `${model.colorOverride || CATEGORY_COLORS[model.category] || '#22d3ee'}50` : 'rgba(255,255,255,0.08)'}`,
                                backdropFilter: 'blur(8px)'
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                className: "text-[10px] font-semibold",
                                style: {
                                    color: isHighlighted ? model.colorOverride || CATEGORY_COLORS[model.category] || '#22d3ee' : '#e8ecf4'
                                },
                                children: model.modelName
                            })
                        })
                    })
                ]
            }, `${model.fjId}-${index}`);
        })
    });
}
// ── Camera controller that only resets on demand ──
function CameraController({ resetTrigger, isMultiModel, controlsRef }) {
    const { camera } = (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_6__.D)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (resetTrigger > 0) {
            if (isMultiModel) {
                // Wider view for multi-model
                camera.position.set(0, 2, 8);
            } else {
                camera.position.set(0, 1, 3.5);
            }
            camera.lookAt(0, 0, 0);
            // Also reset OrbitControls target to [0,0,0] so rotation centers correctly
            if (controlsRef.current) {
                controlsRef.current.target.set(0, 0, 0);
                controlsRef.current.update();
            }
        }
    }, [
        resetTrigger,
        camera,
        isMultiModel,
        controlsRef
    ]);
    return null;
}
const OBJModelViewerInner = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function OBJModelViewerInner({ modelId, fjId, category, modelName, onBack, showHeader = true, onSnapshot, models, topicName, topicEmoji, topicColor }, ref) {
    const categoryColor = CATEGORY_COLORS[category] || '#c0c0c0';
    const isMultiModel = !!(models && models.length > 0);
    const [autoRotate, setAutoRotate] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(isMultiModel ? false : true);
    const [wireframe, setWireframe] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showGrid, setShowGrid] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [lightPreset, setLightPreset] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('studio');
    const [resetTrigger, setResetTrigger] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [highlightedModelIndex, setHighlightedModelIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [showModelList, setShowModelList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const canvasContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const controlsRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Expose snapshot capability
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle)(ref, ()=>({
            takeSnapshot: ()=>{
                const container = canvasContainerRef.current;
                if (!container) return null;
                const canvas = container.querySelector('canvas');
                if (!canvas) return null;
                try {
                    return canvas.toDataURL('image/png');
                } catch  {
                    return null;
                }
            }
        }));
    // Lighting configs
    const lightConfigs = {
        studio: {
            ambient: 0.6,
            dir1: 0.9,
            dir2: 0.3,
            point1: '#88ccff',
            point2: '#ffcc88'
        },
        warm: {
            ambient: 0.4,
            dir1: 0.7,
            dir2: 0.5,
            point1: '#ffaa66',
            point2: '#ffddaa'
        },
        cool: {
            ambient: 0.5,
            dir1: 0.8,
            dir2: 0.2,
            point1: '#66aaff',
            point2: '#aaddff'
        }
    };
    const lighting = lightConfigs[lightPreset];
    // Multi-model camera settings
    const cameraPosition = isMultiModel ? [
        0,
        2,
        8
    ] : [
        0,
        1,
        3.5
    ];
    const cameraFov = isMultiModel ? 50 : 45;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "relative min-w-0 w-full h-full",
        ref: canvasContainerRef,
        style: {
            minHeight: showHeader ? 400 : 0
        },
        children: [
            showHeader && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-3 py-2 pointer-events-none",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2 pointer-events-auto",
                        children: [
                            onBack && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: onBack,
                                className: "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border hover:brightness-125",
                                style: {
                                    background: C.cardSolid,
                                    borderColor: C.cardBorder,
                                    color: C.muted
                                },
                                children: "← Back"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    isMultiModel && topicEmoji && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-sm",
                                        children: topicEmoji
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "w-2.5 h-2.5 rounded-full",
                                        style: {
                                            background: isMultiModel ? topicColor || categoryColor : categoryColor
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-xs font-bold",
                                        style: {
                                            color: C.text
                                        },
                                        children: isMultiModel ? topicName || `${models.length} Models` : modelName
                                    }),
                                    isMultiModel ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-[10px] px-1.5 py-0.5 rounded",
                                        style: {
                                            background: `${topicColor || C.cyan}15`,
                                            color: topicColor || C.cyan,
                                            border: `1px solid ${topicColor || C.cyan}30`
                                        },
                                        children: [
                                            models.length,
                                            " models"
                                        ]
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[10px] px-1.5 py-0.5 rounded",
                                        style: {
                                            background: `${categoryColor}15`,
                                            color: categoryColor,
                                            border: `1px solid ${categoryColor}30`
                                        },
                                        children: category
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-1 pointer-events-auto",
                        children: [
                            isMultiModel && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>setShowModelList((p)=>!p),
                                className: "flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all border hover:brightness-125",
                                style: {
                                    background: showModelList ? `${C.cyan}15` : C.cardSolid,
                                    borderColor: showModelList ? `${C.cyan}40` : C.cardBorder,
                                    color: showModelList ? C.cyan : C.muted
                                },
                                title: "Toggle model list",
                                children: showModelList ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_Eye_EyeOff_Grid3X3_Loader2_RotateCcw_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                    className: "w-3 h-3"
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_Eye_EyeOff_Grid3X3_Loader2_RotateCcw_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                                    className: "w-3 h-3"
                                })
                            }),
                            onSnapshot && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>{
                                    const container = canvasContainerRef.current;
                                    if (!container) return;
                                    const canvas = container.querySelector('canvas');
                                    if (!canvas) return;
                                    try {
                                        const dataUrl = canvas.toDataURL('image/png');
                                        onSnapshot(dataUrl);
                                    } catch  {}
                                },
                                className: "flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all border hover:brightness-125",
                                style: {
                                    background: `${C.green}15`,
                                    borderColor: `${C.green}30`,
                                    color: C.green
                                },
                                title: "Capture snapshot",
                                children: "\uD83D\uDCF8 Snapshot"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>setAutoRotate((p)=>!p),
                                className: "flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all border hover:brightness-125",
                                style: {
                                    background: autoRotate ? `${C.cyan}15` : C.cardSolid,
                                    borderColor: autoRotate ? `${C.cyan}40` : C.cardBorder,
                                    color: autoRotate ? C.cyan : C.muted
                                },
                                title: "Toggle auto-rotate",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_Eye_EyeOff_Grid3X3_Loader2_RotateCcw_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                    className: "w-3 h-3"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>setWireframe((p)=>!p),
                                className: "flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all border hover:brightness-125",
                                style: {
                                    background: wireframe ? `${C.amber}15` : C.cardSolid,
                                    borderColor: wireframe ? `${C.amber}40` : C.cardBorder,
                                    color: wireframe ? C.amber : C.muted
                                },
                                title: "Toggle wireframe",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_Eye_EyeOff_Grid3X3_Loader2_RotateCcw_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                    className: "w-3 h-3"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>setShowGrid((p)=>!p),
                                className: "flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all border hover:brightness-125",
                                style: {
                                    background: showGrid ? `${C.green}15` : C.cardSolid,
                                    borderColor: showGrid ? `${C.green}30` : C.cardBorder,
                                    color: showGrid ? C.green : C.muted
                                },
                                title: "Toggle grid",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_Eye_EyeOff_Grid3X3_Loader2_RotateCcw_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                                    className: "w-3 h-3"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>{
                                    const presets = [
                                        'studio',
                                        'warm',
                                        'cool'
                                    ];
                                    setLightPreset((p)=>presets[(presets.indexOf(p) + 1) % presets.length]);
                                },
                                className: "flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all border hover:brightness-125",
                                style: {
                                    background: C.cardSolid,
                                    borderColor: C.cardBorder,
                                    color: lightPreset === 'studio' ? C.cyan : lightPreset === 'warm' ? C.amber : '#66aaff'
                                },
                                title: `Lighting: ${lightPreset}`,
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_Eye_EyeOff_Grid3X3_Loader2_RotateCcw_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                                    className: "w-3 h-3"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                onClick: ()=>setResetTrigger((p)=>p + 1),
                                className: "flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all border hover:brightness-125",
                                style: {
                                    background: C.cardSolid,
                                    borderColor: C.cardBorder,
                                    color: C.muted
                                },
                                title: "Reset camera",
                                children: "⟳"
                            })
                        ]
                    })
                ]
            }),
            isMultiModel && showModelList && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "absolute top-12 left-3 z-20 rounded-xl overflow-hidden",
                style: {
                    background: 'rgba(12,14,20,0.95)',
                    backdropFilter: 'blur(16px)',
                    border: `1px solid ${C.cardBorder}`,
                    minWidth: 180,
                    maxHeight: 'calc(100% - 60px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "px-3 py-2 flex items-center gap-2",
                        style: {
                            borderBottom: `1px solid ${C.cardBorder}`
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_Eye_EyeOff_Grid3X3_Loader2_RotateCcw_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                className: "w-3 h-3",
                                style: {
                                    color: C.cyan
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-[10px] font-semibold uppercase tracking-wider",
                                style: {
                                    color: C.muted
                                },
                                children: [
                                    "Models (",
                                    models.length,
                                    ")"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "py-1 px-1.5 max-h-72 overflow-y-auto",
                        style: {
                            scrollbarWidth: 'thin',
                            scrollbarColor: `${C.gray} transparent`
                        },
                        children: models.map((model, idx)=>{
                            const catColor = model.colorOverride || CATEGORY_COLORS[model.category] || '#c0c0c0';
                            const isActive = highlightedModelIndex === idx;
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                onClick: ()=>setHighlightedModelIndex(isActive ? null : idx),
                                className: "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all duration-200 hover:brightness-110 mb-0.5",
                                style: {
                                    background: isActive ? `${catColor}12` : 'transparent',
                                    border: `1px solid ${isActive ? `${catColor}30` : 'transparent'}`
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "w-2 h-2 rounded-full flex-shrink-0",
                                        style: {
                                            background: catColor,
                                            opacity: isActive ? 1 : 0.5
                                        }
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "text-[10px] font-medium truncate flex-1",
                                        style: {
                                            color: isActive ? catColor : C.text
                                        },
                                        children: model.modelName
                                    }),
                                    isActive && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Box_Eye_EyeOff_Grid3X3_Loader2_RotateCcw_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                                        className: "w-3 h-3 flex-shrink-0",
                                        style: {
                                            color: catColor
                                        }
                                    })
                                ]
                            }, `${model.fjId}-${idx}`);
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "px-3 py-1.5",
                        style: {
                            borderTop: `1px solid ${C.cardBorder}`
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: ()=>setHighlightedModelIndex(null),
                            className: "w-full text-center text-[9px] font-semibold py-1 rounded-md transition-all hover:brightness-110",
                            style: {
                                background: `${C.cyan}10`,
                                color: C.cyan,
                                border: `1px solid ${C.cyan}20`
                            },
                            children: "Show All"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_react_three_fiber__WEBPACK_IMPORTED_MODULE_13__/* .Canvas */ .Hl, {
                camera: {
                    position: cameraPosition,
                    fov: cameraFov
                },
                gl: {
                    antialias: true,
                    alpha: true,
                    preserveDrawingBuffer: true
                },
                style: {
                    background: 'linear-gradient(180deg, #0a0c14 0%, #111318 60%, #151821 100%)'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CameraController, {
                        resetTrigger: resetTrigger,
                        isMultiModel: isMultiModel,
                        controlsRef: controlsRef
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ambientLight", {
                        intensity: lighting.ambient
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("directionalLight", {
                        position: [
                            5,
                            8,
                            5
                        ],
                        intensity: lighting.dir1,
                        castShadow: true
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("directionalLight", {
                        position: [
                            -3,
                            5,
                            -5
                        ],
                        intensity: lighting.dir2
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("pointLight", {
                        position: [
                            0,
                            2,
                            3
                        ],
                        intensity: 0.5,
                        color: lighting.point1
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("pointLight", {
                        position: [
                            0,
                            1,
                            -3
                        ],
                        intensity: 0.3,
                        color: lighting.point2
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("pointLight", {
                        position: [
                            0,
                            2,
                            -2
                        ],
                        intensity: 0.2,
                        color: "#4488ff"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("mesh", {
                        rotation: [
                            -Math.PI / 2,
                            0,
                            0
                        ],
                        position: [
                            0,
                            isMultiModel ? -4 : -1.2,
                            0
                        ],
                        receiveShadow: true,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("planeGeometry", {
                                args: [
                                    20,
                                    20
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("meshStandardMaterial", {
                                color: "#111318",
                                roughness: 0.9,
                                metalness: 0.1
                            })
                        ]
                    }),
                    showGrid && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("gridHelper", {
                        args: [
                            isMultiModel ? 16 : 6,
                            isMultiModel ? 40 : 30,
                            '#1a1e2b',
                            '#151821'
                        ],
                        position: [
                            0,
                            isMultiModel ? -3.99 : -1.19,
                            0
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_react_three_drei__WEBPACK_IMPORTED_MODULE_14__/* .ContactShadows */ ._, {
                        position: [
                            0,
                            isMultiModel ? -3.98 : -1.18,
                            0
                        ],
                        opacity: 0.4,
                        scale: isMultiModel ? 16 : 5,
                        blur: 2.5,
                        far: 4
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_react_three_drei__WEBPACK_IMPORTED_MODULE_15__/* .OrbitControls */ .N, {
                        ref: controlsRef,
                        enablePan: true,
                        enableZoom: true,
                        enableRotate: true,
                        minDistance: 0.8,
                        maxDistance: isMultiModel ? 20 : 10,
                        target: [
                            0,
                            isMultiModel ? 0 : 0,
                            0
                        ],
                        autoRotate: autoRotate,
                        autoRotateSpeed: 1.2,
                        enableDamping: true,
                        dampingFactor: 0.08,
                        makeDefault: true
                    }),
                    isMultiModel ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MultiModelScene, {
                        models: models,
                        wireframe: wireframe,
                        highlightedIndex: highlightedModelIndex,
                        onModelClick: (idx)=>{
                            setHighlightedModelIndex((prev)=>prev === idx ? null : idx);
                        }
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(OBJModelScene, {
                        fjId: fjId,
                        category: category,
                        modelName: modelName,
                        wireframe: wireframe
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "absolute bottom-2 left-3 right-3 flex items-center justify-between pointer-events-none",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "px-2 py-1 rounded-md text-[9px] font-medium",
                        style: {
                            background: 'rgba(0,0,0,0.6)',
                            color: C.muted,
                            backdropFilter: 'blur(8px)'
                        },
                        children: isMultiModel ? 'Click models to highlight · Drag to rotate · Scroll to zoom' : 'Drag to rotate · Scroll to zoom · Right-click to pan'
                    }),
                    lightPreset !== 'studio' && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "px-2 py-1 rounded-md text-[9px] font-medium",
                        style: {
                            background: 'rgba(0,0,0,0.6)',
                            color: lightPreset === 'warm' ? C.amber : '#66aaff',
                            backdropFilter: 'blur(8px)'
                        },
                        children: [
                            lightPreset === 'warm' ? '☀️ Warm' : '❄️ Cool',
                            " lighting"
                        ]
                    })
                ]
            })
        ]
    });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OBJModelViewerInner);


/***/ })

}]);