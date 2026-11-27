"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[10962],{

/***/ 10962:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ MultimodalRenderer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95155);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12115);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5772);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(50825);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(79267);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(36619);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12980);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(67033);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(86272);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(90467);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(44539);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(67998);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1275);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(9005);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(29450);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(54757);
/* harmony import */ var _barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(25182);
/* harmony import */ var _lib_agent_multimodal_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(98891);
/* __next_internal_client_entry_do_not_use__ MultimodalRenderer auto */ 
/**
 * MultimodalRenderer — Renders all multimodal content types from the AI agent.
 *
 * Supported formats:
 * - Text (with markdown)
 * - Tables
 * - Charts (bar, line, pie, radar)
 * - Images
 * - File exports (PDF, Excel, CSV, Word, PowerPoint)
 * - Audio player
 * - Video player
 * - Interactive cards
 * - Calendar
 * - Kanban board
 * - Timeline
 * - Approval dialogs
 * - Workflow graphs
 */ 



function MultimodalRenderer({ content, onAction }) {
    if (!content || content.length === 0) return null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "multimodal-renderer space-y-3",
        children: content.map((block, idx)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ContentBlock, {
                block: block,
                onAction: onAction
            }, idx))
    });
}
// ─── Content Block Router ─────────────────────────────────────────────
function ContentBlock({ block, onAction }) {
    switch(block.format){
        case 'text':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TextBlock, {
                content: block
            });
        case 'table':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TableBlock, {
                content: block
            });
        case 'chart':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ChartBlock, {
                content: block
            });
        case 'image':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ImageBlock, {
                content: block
            });
        case 'pdf':
        case 'excel':
        case 'csv':
        case 'word':
        case 'powerpoint':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(FileExportBlock, {
                content: block
            });
        case 'audio':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AudioBlock, {
                content: block
            });
        case 'video':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(VideoBlock, {
                content: block
            });
        case 'map':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MapBlock, {
                content: block
            });
        case 'interactive_card':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InteractiveCardBlock, {
                content: block,
                onAction: onAction
            });
        case 'calendar':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CalendarBlock, {
                content: block
            });
        case 'kanban':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(KanbanBlock, {
                content: block
            });
        case 'timeline':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TimelineBlock, {
                content: block
            });
        case 'approval_dialog':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ApprovalDialogBlock, {
                content: block,
                onAction: onAction
            });
        case 'workflow_graph':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(WorkflowGraphBlock, {
                content: block
            });
        case '3d_models':
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Models3DBlock, {
                content: block
            });
        default:
            return null;
    }
}
// ─── Format Badge ─────────────────────────────────────────────────────
function FormatBadge({ format }) {
    const color = _lib_agent_multimodal_types__WEBPACK_IMPORTED_MODULE_3__/* .FORMAT_COLORS */ .TW[format] || '#8b95a8';
    const label = _lib_agent_multimodal_types__WEBPACK_IMPORTED_MODULE_3__/* .FORMAT_LABELS */ .Sq[format] || format;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '9px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            background: `${color}15`,
            color,
            border: `1px solid ${color}30`
        },
        children: label
    });
}
// ─── Card Shell ───────────────────────────────────────────────────────
function CardShell({ format, title, children, extra }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
            background: 'rgba(20, 22, 30, 0.95)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px',
            overflow: 'hidden'
        },
        children: [
            (title || format) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: 'rgba(255,255,255,0.02)'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(FormatBadge, {
                                format: format
                            }),
                            title && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                style: {
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    color: '#e8ecf4'
                                },
                                children: title
                            })
                        ]
                    }),
                    extra
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                style: {
                    padding: '12px'
                },
                children: children
            })
        ]
    });
}
// ─── Text Block ───────────────────────────────────────────────────────
function TextBlock({ content }) {
    const text = content.text;
    if (!text) return null;
    // Simple markdown-lite rendering
    const lines = text.split('\n');
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardShell, {
        format: "text",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            style: {
                fontSize: '12px',
                lineHeight: 1.6,
                color: '#c8cdd8'
            },
            children: lines.map((line, i)=>{
                // Bold
                const parts = line.split(/(\*\*[^*]+\*\*)/g);
                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
                    children: [
                        parts.map((part, j)=>{
                            if (part.startsWith('**') && part.endsWith('**')) {
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                                    style: {
                                        color: '#e8ecf4',
                                        fontWeight: 600
                                    },
                                    children: part.slice(2, -2)
                                }, j);
                            }
                            // Inline code
                            const codeParts = part.split(/(`[^`]+`)/g);
                            return codeParts.map((cp, k)=>{
                                if (cp.startsWith('`') && cp.endsWith('`')) {
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", {
                                        style: {
                                            background: 'rgba(0,229,160,0.1)',
                                            color: '#00e5a0',
                                            padding: '1px 4px',
                                            borderRadius: '3px',
                                            fontSize: '11px'
                                        },
                                        children: cp.slice(1, -1)
                                    }, `${j}-${k}`);
                                }
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    children: cp
                                }, `${j}-${k}`);
                            });
                        }),
                        i < lines.length - 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("br", {})
                    ]
                }, i);
            })
        })
    });
}
// ─── Table Block ──────────────────────────────────────────────────────
function TableBlock({ content }) {
    const [sortCol, setSortCol] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [sortDir, setSortDir] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('asc');
    // Defensive normalization: the AI agent occasionally emits malformed table
    // rows (e.g. a plain string instead of string[], or an object). Coerce every
    // row into a string[] so `.map` on cells never throws.
    const normalizedRows = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const raw = Array.isArray(content.rows) ? content.rows : [];
        return raw.map((row)=>{
            if (Array.isArray(row)) return row.map((c)=>c == null ? '' : String(c));
            if (row == null) return [];
            if (typeof row === 'object') {
                // Object row — use values (or keys+values) as cells.
                return Object.values(row).map((v)=>v == null ? '' : String(v));
            }
            // Scalar row — single cell.
            return [
                String(row)
            ];
        });
    }, [
        content.rows
    ]);
    const sortedRows = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (sortCol === null) return normalizedRows;
        const sorted = [
            ...normalizedRows
        ].sort((a, b)=>{
            const va = a[sortCol] || '';
            const vb = b[sortCol] || '';
            return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
        });
        return sorted;
    }, [
        normalizedRows,
        sortCol,
        sortDir
    ]);
    const handleSort = (col)=>{
        if (!content.sortable) return;
        if (sortCol === col) {
            setSortDir((d)=>d === 'asc' ? 'desc' : 'asc');
        } else {
            setSortCol(col);
            setSortDir('asc');
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardShell, {
        format: "table",
        title: content.title,
        extra: content.exportable ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
            style: {
                width: 14,
                height: 14,
                color: '#5a6478',
                cursor: 'pointer'
            }
        }) : null,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            style: {
                overflowX: 'auto'
            },
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
                style: {
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '11px'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("thead", {
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tr", {
                            children: content.headers.map((h, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("th", {
                                    onClick: ()=>handleSort(i),
                                    style: {
                                        padding: '6px 8px',
                                        textAlign: 'left',
                                        fontWeight: 600,
                                        color: '#8b95a8',
                                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                                        cursor: content.sortable ? 'pointer' : 'default',
                                        whiteSpace: 'nowrap',
                                        userSelect: 'none'
                                    },
                                    children: [
                                        h,
                                        " ",
                                        sortCol === i && (sortDir === 'asc' ? '↑' : '↓')
                                    ]
                                }, i))
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tbody", {
                        children: sortedRows.map((row, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tr", {
                                style: {
                                    borderBottom: '1px solid rgba(255,255,255,0.03)'
                                },
                                children: row.map((cell, j)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                                        style: {
                                            padding: '5px 8px',
                                            color: '#c8cdd8',
                                            maxWidth: '200px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        },
                                        children: cell
                                    }, j))
                            }, i))
                    })
                ]
            })
        })
    });
}
// ─── Chart Block (SVG-based mini chart) ───────────────────────────────
function ChartBlock({ content }) {
    const { chartType, title, data } = content;
    const maxVal = Math.max(...data.datasets.flatMap((d)=>d.data), 1);
    const barWidth = Math.max(Math.min(280 / data.labels.length - 4, 40), 8);
    const chartH = 120;
    const colors = [
        '#00e5a0',
        '#4fc3f7',
        '#8b5cf6',
        '#f59e0b',
        '#ff5757',
        '#00b87a'
    ];
    // Simple bar chart
    if (chartType === 'bar' || chartType === 'area') {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardShell, {
            format: "chart",
            title: title,
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                        width: "100%",
                        viewBox: `0 0 ${data.labels.length * (barWidth + 8) + 40} ${chartH + 30}`,
                        style: {
                            maxHeight: '160px'
                        },
                        children: [
                            data.datasets.map((ds, di)=>ds.data.map((val, i)=>{
                                    const h = val / maxVal * chartH;
                                    const x = 30 + i * (barWidth + 8);
                                    const y = chartH - h;
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
                                        x: x,
                                        y: y,
                                        width: barWidth,
                                        height: h,
                                        rx: "2",
                                        fill: ds.color || colors[di % colors.length],
                                        opacity: 0.85
                                    }, `${di}-${i}`);
                                })),
                            data.labels.map((label, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("text", {
                                    x: 30 + i * (barWidth + 8) + barWidth / 2,
                                    y: chartH + 16,
                                    textAnchor: "middle",
                                    fill: "#5a6478",
                                    fontSize: "9",
                                    children: label.length > 8 ? label.slice(0, 7) + '…' : label
                                }, i))
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        style: {
                            display: 'flex',
                            gap: '12px',
                            flexWrap: 'wrap',
                            marginTop: '4px'
                        },
                        children: data.datasets.map((ds, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontSize: '9px',
                                    color: '#8b95a8'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        style: {
                                            width: 8,
                                            height: 8,
                                            borderRadius: 2,
                                            background: ds.color || colors[i % colors.length]
                                        }
                                    }),
                                    ds.label
                                ]
                            }, i))
                    })
                ]
            })
        });
    }
    // Pie chart (simplified)
    if (chartType === 'pie') {
        const total = data.datasets[0]?.data.reduce((a, b)=>a + b, 0) || 1;
        let cumulative = 0;
        const cx = 60, cy = 60, r = 50;
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardShell, {
            format: "chart",
            title: title,
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                        width: "120",
                        height: "120",
                        viewBox: "0 0 120 120",
                        children: data.datasets[0]?.data.map((val, i)=>{
                            const startAngle = cumulative / total * 360;
                            cumulative += val;
                            const endAngle = cumulative / total * 360;
                            const startRad = (startAngle - 90) * Math.PI / 180;
                            const endRad = (endAngle - 90) * Math.PI / 180;
                            const largeArc = endAngle - startAngle > 180 ? 1 : 0;
                            const x1 = cx + r * Math.cos(startRad);
                            const y1 = cy + r * Math.sin(startRad);
                            const x2 = cx + r * Math.cos(endRad);
                            const y2 = cy + r * Math.sin(endRad);
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`,
                                fill: colors[i % colors.length],
                                opacity: 0.85
                            }, i);
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px'
                        },
                        children: data.labels.map((label, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '10px',
                                    color: '#c8cdd8'
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        style: {
                                            width: 8,
                                            height: 8,
                                            borderRadius: 2,
                                            background: colors[i % colors.length],
                                            flexShrink: 0
                                        }
                                    }),
                                    label,
                                    ": ",
                                    data.datasets[0]?.data[i]
                                ]
                            }, i))
                    })
                ]
            })
        });
    }
    // Default: line chart fallback to bar
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardShell, {
        format: "chart",
        title: title,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            style: {
                fontSize: '11px',
                color: '#8b95a8',
                padding: '8px'
            },
            children: [
                'Chart type "',
                chartType,
                '" — ',
                data.labels.length,
                " data points"
            ]
        })
    });
}
// ─── Image Block ──────────────────────────────────────────────────────
function ImageBlock({ content }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardShell, {
        format: "image",
        title: content.caption,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_image__WEBPACK_IMPORTED_MODULE_2__["default"], {
            src: content.url,
            alt: content.alt,
            width: 1200,
            height: 300,
            unoptimized: true,
            style: {
                width: '100%',
                maxHeight: '300px',
                objectFit: 'contain',
                borderRadius: '8px'
            }
        })
    });
}
// ─── File Export Block ────────────────────────────────────────────────
function FileExportBlock({ content }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardShell, {
        format: content.format,
        title: content.title,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            style: {
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    style: {
                        width: 40,
                        height: 40,
                        borderRadius: '8px',
                        background: `${_lib_agent_multimodal_types__WEBPACK_IMPORTED_MODULE_3__/* .FORMAT_COLORS */ .TW[content.format] || '#8b95a8'}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `1px solid ${_lib_agent_multimodal_types__WEBPACK_IMPORTED_MODULE_3__/* .FORMAT_COLORS */ .TW[content.format] || '#8b95a8'}30`
                    },
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                        style: {
                            width: 18,
                            height: 18,
                            color: _lib_agent_multimodal_types__WEBPACK_IMPORTED_MODULE_3__/* .FORMAT_COLORS */ .TW[content.format] || '#8b95a8'
                        }
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    style: {
                        flex: 1
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            style: {
                                fontSize: '12px',
                                fontWeight: 600,
                                color: '#e8ecf4'
                            },
                            children: content.title
                        }),
                        content.description && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            style: {
                                fontSize: '10px',
                                color: '#8b95a8',
                                marginTop: '2px'
                            },
                            children: content.description
                        })
                    ]
                }),
                content.downloadUrl && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                    href: content.downloadUrl,
                    download: true,
                    style: {
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: 'linear-gradient(135deg, #00e5a0, #00b87a)',
                        color: '#0c0e14',
                        fontSize: '10px',
                        fontWeight: 700,
                        textDecoration: 'none'
                    },
                    children: "Download"
                })
            ]
        })
    });
}
// ─── Audio Block ──────────────────────────────────────────────────────
function AudioBlock({ content }) {
    const [playing, setPlaying] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardShell, {
        format: "audio",
        title: content.text.slice(0, 60),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            style: {
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                    onClick: ()=>setPlaying(!playing),
                    style: {
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    children: playing ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
                        style: {
                            width: 14,
                            height: 14,
                            color: '#fff'
                        }
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                        style: {
                            width: 14,
                            height: 14,
                            color: '#fff',
                            marginLeft: 2
                        }
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    style: {
                        flex: 1
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            style: {
                                fontSize: '11px',
                                color: '#c8cdd8'
                            },
                            children: content.text.slice(0, 100)
                        }),
                        content.duration && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            style: {
                                fontSize: '9px',
                                color: '#5a6478',
                                marginTop: '2px'
                            },
                            children: [
                                content.duration,
                                "s"
                            ]
                        })
                    ]
                })
            ]
        })
    });
}
// ─── Video Block ──────────────────────────────────────────────────────
function VideoBlock({ content }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardShell, {
        format: "video",
        title: content.title,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            style: {
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#000',
                aspectRatio: '16/9'
            },
            children: [
                content.thumbnail ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_image__WEBPACK_IMPORTED_MODULE_2__["default"], {
                    src: content.thumbnail,
                    alt: content.title,
                    width: 1600,
                    height: 900,
                    unoptimized: true,
                    style: {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.7
                    }
                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        color: '#5a6478'
                    },
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A, {
                        style: {
                            width: 32,
                            height: 32
                        }
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    style: {
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        style: {
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            background: 'rgba(0,0,0,0.7)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
                            style: {
                                width: 20,
                                height: 20,
                                color: '#fff',
                                marginLeft: 3
                            }
                        })
                    })
                })
            ]
        })
    });
}
// ─── Map Block ────────────────────────────────────────────────────────
function MapBlock({ content }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardShell, {
        format: "map",
        title: content.title,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
            },
            children: content.locations.map((loc, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 8px',
                        background: 'rgba(79,195,247,0.05)',
                        borderRadius: '6px',
                        border: '1px solid rgba(79,195,247,0.1)'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A, {
                            style: {
                                width: 14,
                                height: 14,
                                color: '#4fc3f7',
                                flexShrink: 0
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    style: {
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        color: '#e8ecf4'
                                    },
                                    children: loc.name
                                }),
                                loc.description && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    style: {
                                        fontSize: '9px',
                                        color: '#8b95a8'
                                    },
                                    children: loc.description
                                })
                            ]
                        })
                    ]
                }, i))
        })
    });
}
// ─── Interactive Card Block ───────────────────────────────────────────
function InteractiveCardBlock({ content, onAction }) {
    const color = content.color || '#00e5a0';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardShell, {
        format: "interactive_card",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            style: {
                                width: 36,
                                height: 36,
                                borderRadius: '8px',
                                background: `${color}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: `1px solid ${color}30`,
                                flexShrink: 0
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .A, {
                                style: {
                                    width: 16,
                                    height: 16,
                                    color
                                }
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    style: {
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        color: '#e8ecf4'
                                    },
                                    children: content.title
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    style: {
                                        fontSize: '10px',
                                        color: '#8b95a8',
                                        marginTop: '2px'
                                    },
                                    children: content.description
                                })
                            ]
                        })
                    ]
                }),
                content.details && Object.keys(content.details).length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    style: {
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px'
                    },
                    children: Object.entries(content.details).slice(0, 4).map(([k, v])=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                            style: {
                                fontSize: '9px',
                                padding: '2px 6px',
                                background: 'rgba(255,255,255,0.04)',
                                borderRadius: '4px',
                                color: '#8b95a8',
                                border: '1px solid rgba(255,255,255,0.06)'
                            },
                            children: [
                                k,
                                ": ",
                                v
                            ]
                        }, k))
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    style: {
                        display: 'flex',
                        gap: '6px',
                        flexWrap: 'wrap'
                    },
                    children: content.actions.map((action)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            onClick: ()=>onAction?.({
                                    type: action.type,
                                    data: {
                                        target: action.target,
                                        ...action.data
                                    }
                                }),
                            style: {
                                padding: '5px 10px',
                                borderRadius: '6px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(255,255,255,0.04)',
                                color: '#9ca3b8',
                                cursor: 'pointer',
                                fontSize: '10px',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            },
                            children: [
                                action.label,
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                    style: {
                                        width: 10,
                                        height: 10
                                    }
                                })
                            ]
                        }, action.id))
                })
            ]
        })
    });
}
// ─── Calendar Block ───────────────────────────────────────────────────
function CalendarBlock({ content }) {
    const typeColors = {
        study: '#00e5a0',
        exam: '#ff5757',
        review: '#8b5cf6',
        break: '#4fc3f7',
        deadline: '#f59e0b'
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardShell, {
        format: "calendar",
        title: content.title,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
            },
            children: content.events.map((event)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        background: `${typeColors[event.type || 'study'] || '#00e5a0'}08`,
                        borderLeft: `3px solid ${typeColors[event.type || 'study'] || '#00e5a0'}`
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .A, {
                            style: {
                                width: 12,
                                height: 12,
                                color: typeColors[event.type || 'study'] || '#00e5a0',
                                flexShrink: 0
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            style: {
                                flex: 1
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    style: {
                                        fontSize: '10px',
                                        fontWeight: 600,
                                        color: '#e8ecf4'
                                    },
                                    children: event.title
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    style: {
                                        fontSize: '9px',
                                        color: '#5a6478'
                                    },
                                    children: event.date
                                })
                            ]
                        })
                    ]
                }, event.id))
        })
    });
}
// ─── Kanban Block ─────────────────────────────────────────────────────
function KanbanBlock({ content }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardShell, {
        format: "kanban",
        title: content.title,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            style: {
                display: 'flex',
                gap: '8px',
                overflowX: 'auto'
            },
            children: content.columns.map((col)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    style: {
                        minWidth: '140px',
                        flex: 1,
                        background: `${col.color}08`,
                        borderRadius: '8px',
                        border: `1px solid ${col.color}20`,
                        padding: '8px'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            style: {
                                fontSize: '10px',
                                fontWeight: 700,
                                color: col.color,
                                marginBottom: '6px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            },
                            children: [
                                col.title,
                                " (",
                                col.items.length,
                                ")"
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px'
                            },
                            children: col.items.map((item)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    style: {
                                        padding: '6px 8px',
                                        background: 'rgba(12,14,20,0.8)',
                                        borderRadius: '6px',
                                        border: '1px solid rgba(255,255,255,0.06)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            style: {
                                                fontSize: '10px',
                                                fontWeight: 600,
                                                color: '#e8ecf4'
                                            },
                                            children: item.title
                                        }),
                                        item.description && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            style: {
                                                fontSize: '9px',
                                                color: '#5a6478',
                                                marginTop: '2px'
                                            },
                                            children: item.description
                                        })
                                    ]
                                }, item.id))
                        })
                    ]
                }, col.id))
        })
    });
}
// ─── Timeline Block ───────────────────────────────────────────────────
function TimelineBlock({ content }) {
    const statusColors = {
        completed: '#00e5a0',
        current: '#4fc3f7',
        upcoming: '#8b95a8',
        overdue: '#ff5757'
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardShell, {
        format: "timeline",
        title: content.title,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '0'
            },
            children: content.events.map((event, i)=>{
                const color = event.color || statusColors[event.status || 'upcoming'] || '#8b95a8';
                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    style: {
                        display: 'flex',
                        gap: '12px',
                        position: 'relative'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '16px',
                                flexShrink: 0
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    style: {
                                        width: 10,
                                        height: 10,
                                        borderRadius: '50%',
                                        background: color,
                                        border: '2px solid rgba(12,14,20,1)',
                                        zIndex: 1
                                    }
                                }),
                                i < content.events.length - 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    style: {
                                        width: 2,
                                        flex: 1,
                                        background: 'rgba(255,255,255,0.08)'
                                    }
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            style: {
                                paddingBottom: '12px',
                                flex: 1
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    style: {
                                        fontSize: '9px',
                                        color: '#5a6478',
                                        marginBottom: '2px'
                                    },
                                    children: event.date
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    style: {
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        color: '#e8ecf4'
                                    },
                                    children: event.title
                                }),
                                event.description && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    style: {
                                        fontSize: '10px',
                                        color: '#8b95a8',
                                        marginTop: '2px'
                                    },
                                    children: event.description
                                })
                            ]
                        })
                    ]
                }, event.id);
            })
        })
    });
}
// ─── Approval Dialog Block ────────────────────────────────────────────
function ApprovalDialogBlock({ content, onAction }) {
    const styleMap = {
        primary: {
            bg: 'rgba(0,229,160,0.1)',
            border: '1px solid rgba(0,229,160,0.3)',
            text: '#00e5a0'
        },
        secondary: {
            bg: 'rgba(79,195,247,0.1)',
            border: '1px solid rgba(79,195,247,0.3)',
            text: '#4fc3f7'
        },
        danger: {
            bg: 'rgba(255,87,87,0.1)',
            border: '1px solid rgba(255,87,87,0.3)',
            text: '#ff5757'
        },
        success: {
            bg: 'rgba(0,229,160,0.1)',
            border: '1px solid rgba(0,229,160,0.3)',
            text: '#00e5a0'
        }
    };
    const urgencyColors = {
        low: '#8b95a8',
        medium: '#f59e0b',
        high: '#ff5757'
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardShell, {
        format: "approval_dialog",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .A, {
                            style: {
                                width: 16,
                                height: 16,
                                color: urgencyColors[content.urgency || 'medium']
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            style: {
                                fontSize: '12px',
                                fontWeight: 700,
                                color: '#e8ecf4'
                            },
                            children: content.title
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    style: {
                        fontSize: '11px',
                        color: '#c8cdd8',
                        lineHeight: 1.5
                    },
                    children: content.message
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    style: {
                        display: 'flex',
                        gap: '6px',
                        flexWrap: 'wrap'
                    },
                    children: content.options.map((opt)=>{
                        const s = styleMap[opt.style] || styleMap.secondary;
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: ()=>onAction?.({
                                    type: 'approval',
                                    data: {
                                        optionId: opt.id,
                                        action: opt.action
                                    }
                                }),
                            style: {
                                padding: '6px 14px',
                                borderRadius: '6px',
                                background: s.bg,
                                border: s.border,
                                color: s.text,
                                cursor: 'pointer',
                                fontSize: '10px',
                                fontWeight: 700
                            },
                            children: opt.label
                        }, opt.id);
                    })
                })
            ]
        })
    });
}
// ─── Workflow Graph Block ─────────────────────────────────────────────
function WorkflowGraphBlock({ content }) {
    const typeColors = {
        start: '#00e5a0',
        process: '#4fc3f7',
        decision: '#f59e0b',
        action: '#8b5cf6',
        end: '#ff5757'
    };
    const statusColors = {
        completed: '#00e5a0',
        active: '#4fc3f7',
        pending: '#5a6478',
        skipped: '#3a4055'
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardShell, {
        format: "workflow_graph",
        title: content.title,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '0'
            },
            children: content.nodes.map((node, i)=>{
                const color = typeColors[node.type] || '#8b95a8';
                const statusColor = statusColors[node.status || 'pending'] || '#5a6478';
                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '8px 10px',
                                borderRadius: '8px',
                                background: `${color}08`,
                                border: `1px solid ${color}20`
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    style: {
                                        width: 8,
                                        height: 8,
                                        borderRadius: node.type === 'decision' ? '0' : '50%',
                                        background: statusColor,
                                        transform: node.type === 'decision' ? 'rotate(45deg)' : 'none',
                                        flexShrink: 0
                                    }
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    style: {
                                        flex: 1
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            style: {
                                                fontSize: '10px',
                                                fontWeight: 600,
                                                color: '#e8ecf4'
                                            },
                                            children: node.title
                                        }),
                                        node.description && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            style: {
                                                fontSize: '9px',
                                                color: '#8b95a8',
                                                marginTop: '1px'
                                            },
                                            children: node.description
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    style: {
                                        fontSize: '8px',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        color,
                                        letterSpacing: '0.05em'
                                    },
                                    children: node.type
                                })
                            ]
                        }),
                        i < content.nodes.length - 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'center',
                                padding: '2px 0'
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A, {
                                style: {
                                    width: 12,
                                    height: 12,
                                    color: '#3a4055',
                                    transform: 'rotate(90deg)'
                                }
                            })
                        })
                    ]
                }, node.id);
            })
        })
    });
}
// ─── 3D Models Block (Sketchfab search results, inline-embeddable) ───
function Models3DBlock({ content }) {
    // Auto-open the suggested model (or the first one) in the inline iframe.
    const initialUid = content.suggestedModelUid || content.models[0]?.uid;
    const [activeUid, setActiveUid] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialUid);
    const [iframeOpen, setIframeOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(Boolean(initialUid));
    const activeModel = content.models.find((m)=>m.uid === activeUid);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardShell, {
        format: "3d_models",
        title: content.title,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            },
            children: [
                iframeOpen && activeModel && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    style: {
                        position: 'relative',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        background: '#000',
                        aspectRatio: '16/9',
                        border: '1px solid rgba(139, 92, 246, 0.3)'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("iframe", {
                            src: activeModel.embedUrl,
                            title: activeModel.name,
                            allow: "autoplay; fullscreen; xr-spatial-tracking",
                            referrerPolicy: "origin",
                            style: {
                                width: '100%',
                                height: '100%',
                                border: 'none'
                            }
                        }, activeModel.uid),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '6px 10px',
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)',
                                color: '#fff',
                                fontSize: '11px',
                                fontWeight: 600,
                                pointerEvents: 'none'
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    style: {
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        maxWidth: '70%'
                                    },
                                    children: activeModel.name
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                    href: activeModel.viewerUrl,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    style: {
                                        pointerEvents: 'auto',
                                        color: '#c8d0e0',
                                        fontSize: '10px',
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '3px',
                                        padding: '3px 6px',
                                        borderRadius: '4px',
                                        background: 'rgba(255,255,255,0.1)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .A, {
                                            style: {
                                                width: 10,
                                                height: 10
                                            }
                                        }),
                                        "Sketchfab"
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: ()=>setIframeOpen(false),
                            "aria-label": "Close 3D viewer",
                            style: {
                                position: 'absolute',
                                top: 6,
                                right: 6,
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                background: 'rgba(0,0,0,0.7)',
                                border: 'none',
                                color: '#fff',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .A, {
                                style: {
                                    width: 12,
                                    height: 12
                                }
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                        gap: '8px'
                    },
                    children: content.models.map((m)=>{
                        const isActive = m.uid === activeUid && iframeOpen;
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            onClick: ()=>{
                                setActiveUid(m.uid);
                                setIframeOpen(true);
                            },
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                                padding: 0,
                                background: isActive ? 'rgba(139, 92, 246, 0.12)' : 'rgba(255,255,255,0.02)',
                                border: isActive ? '1px solid rgba(139, 92, 246, 0.5)' : '1px solid rgba(255,255,255,0.06)',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'border-color 0.15s, background 0.15s'
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    style: {
                                        position: 'relative',
                                        aspectRatio: '4/3',
                                        background: '#0c0e14'
                                    },
                                    children: [
                                        m.thumbnailUrl ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_image__WEBPACK_IMPORTED_MODULE_2__["default"], {
                                            src: m.thumbnailUrl,
                                            alt: m.name,
                                            width: 400,
                                            height: 300,
                                            unoptimized: true,
                                            style: {
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '100%'
                                            },
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                                                style: {
                                                    width: 18,
                                                    height: 18,
                                                    color: '#3a4055'
                                                }
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            style: {
                                                position: 'absolute',
                                                inset: 0,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'rgba(139, 92, 246, 0.35)',
                                                opacity: 0,
                                                transition: 'opacity 0.15s',
                                                fontSize: '10px',
                                                fontWeight: 700,
                                                color: '#fff',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em'
                                            },
                                            className: "models-3d-hover",
                                            children: "View 3D"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    style: {
                                        padding: '4px 6px 6px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            style: {
                                                fontSize: '10px',
                                                fontWeight: 600,
                                                color: '#e8ecf4',
                                                lineHeight: 1.25,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical'
                                            },
                                            children: m.name
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            style: {
                                                fontSize: '9px',
                                                color: '#8b95a8',
                                                marginTop: '2px'
                                            },
                                            children: [
                                                "by ",
                                                m.author
                                            ]
                                        }),
                                        (m.likeCount > 0 || m.viewCount > 0) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            style: {
                                                display: 'flex',
                                                gap: '8px',
                                                marginTop: '3px',
                                                fontSize: '9px',
                                                color: '#5a6478'
                                            },
                                            children: [
                                                m.likeCount > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    style: {
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '2px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .A, {
                                                            style: {
                                                                width: 9,
                                                                height: 9
                                                            }
                                                        }),
                                                        m.likeCount
                                                    ]
                                                }),
                                                m.viewCount > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    style: {
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '2px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .A, {
                                                            style: {
                                                                width: 9,
                                                                height: 9
                                                            }
                                                        }),
                                                        m.viewCount
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }, m.uid);
                    })
                }),
                !iframeOpen && activeModel && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    onClick: ()=>setIframeOpen(true),
                    style: {
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                        border: 'none',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ArrowRight_Box_Calendar_CheckSquare_Download_ExternalLink_Eye_Heart_MapPin_Pause_Play_Sparkles_Video_X_lucide_react__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .A, {
                            style: {
                                width: 12,
                                height: 12
                            }
                        }),
                        "Reopen 3D viewer"
                    ]
                })
            ]
        })
    });
}


/***/ }),

/***/ 98891:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sq: () => (/* binding */ FORMAT_LABELS),
/* harmony export */   TW: () => (/* binding */ FORMAT_COLORS)
/* harmony export */ });
/* unused harmony exports selectBestFormat, detectDataIndicators, FORMAT_ICONS */
/**
 * Multimodal Response Types — Auto-format selection and rendering for MedQ AI Agent.
 *
 * The agent automatically selects the best presentation format based on:
 * - Content type (data, comparison, process, timeline, etc.)
 * - Data structure (tabular, hierarchical, sequential, spatial)
 * - User intent (learn, decide, act, review)
 *
 * Supported output formats:
 * - Text: Plain or rich text with markdown
 * - Table: Structured data grid
 * - Chart: Bar, line, pie, scatter, heatmap, radar
 * - Image: Generated or referenced image
 * - PDF: Document export
 * - Excel: Spreadsheet export
 * - CSV: Data export
 * - Word: Document export
 * - PowerPoint: Slide deck export
 * - Audio: TTS audio output
 * - Video: Video content reference
 * - Map: Geographic visualization
 * - InteractiveCard: Clickable card with actions
 * - Calendar: Date-based schedule view
 * - KanbanBoard: Status-based task board
 * - Timeline: Chronological sequence
 * - ApprovalDialog: Decision point with options
 * - WorkflowGraph: Process flow visualization
 */ // ─── Types ────────────────────────────────────────────────────────────
// ─── Auto-Format Selector ─────────────────────────────────────────────
/**
 * Determines the best output format based on content characteristics.
 * This is used by the API route to wrap LLM responses in appropriate format.
 */ function selectBestFormat(content, intent = 'learn', dataIndicators) {
    const indicators = dataIndicators || detectDataIndicators(content);
    // Decision matrix
    if (intent === 'decide' && indicators.hasComparisons) return 'approval_dialog';
    if (intent === 'compare' && indicators.hasComparisons) return 'table';
    if (intent === 'organize' && indicators.hasSteps) return 'kanban';
    if (intent === 'organize' && indicators.hasDates) return 'calendar';
    if (intent === 'review' && indicators.hasDates) return 'timeline';
    if (intent === 'review' && indicators.hasNumbers) return 'chart';
    if (intent === 'act' && indicators.hasSteps) return 'workflow_graph';
    if (indicators.hasTableData && (indicators.itemCount || 0) > 4) return 'table';
    if (indicators.hasNumbers && (indicators.itemCount || 0) > 2) return 'chart';
    if (indicators.hasDates) return 'timeline';
    if (indicators.hasComparisons) return 'table';
    if (indicators.hasSteps) return 'workflow_graph';
    return 'text';
}
/**
 * Detect data indicators from content text.
 */ function detectDataIndicators(text) {
    const lower = text.toLowerCase();
    // Numbers with units or percentages
    const numberPattern = /\d+[\.,]?\d*\s*(?:%|mg|ml|mmol|mmHg|bpm|kg|cm|mcg|units?|score|points?)/gi;
    const hasNumbers = (text.match(numberPattern) || []).length >= 2;
    // Table-like data (rows of consistent format)
    const pipeRows = (text.match(/\|.*\|/g) || []).length;
    const dashRows = (text.match(/^[\s-]{2,}.+/gm) || []).length;
    const hasTableData = pipeRows >= 2 || dashRows >= 3;
    // Dates
    const datePattern = /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\s+\d{1,2},?\s*\d{4}\b|\b\d{1,2}\/\d{1,2}\/\d{2,4}\b|\b\d{4}-\d{2}-\d{2}\b/gi;
    const hasDates = (text.match(datePattern) || []).length >= 1;
    // Steps/process
    const stepPattern = /(?:step|phase|stage)\s+\d|^\d+\.\s+[A-Z]/gim;
    const hasSteps = (text.match(stepPattern) || []).length >= 2;
    // Comparisons
    const comparisonPattern = /(?:vs\.?|versus|compared to|in contrast|whereas|while|on the other hand|better than|worse than|more than|less than)/gi;
    const hasComparisons = (text.match(comparisonPattern) || []).length >= 1;
    // Locations
    const locationPattern = /\b(?:hospital|clinic|department|ward|ICU|ER|OR|lab|ward)\b/gi;
    const hasLocations = (text.match(locationPattern) || []).length >= 1;
    // Item count (bullet points, numbered lists)
    const bulletPattern = /^[\s]*[-*•]\s+/gm;
    const numberedPattern = /^[\s]*\d+[.)]\s+/gm;
    const itemCount = (text.match(bulletPattern) || []).length + (text.match(numberedPattern) || []).length;
    return {
        hasNumbers,
        hasTableData,
        hasDates,
        hasSteps,
        hasComparisons,
        hasLocations,
        itemCount
    };
}
// ─── Format Label Map ─────────────────────────────────────────────────
const FORMAT_LABELS = {
    text: 'Text',
    table: 'Table',
    chart: 'Chart',
    image: 'Image',
    pdf: 'PDF Document',
    excel: 'Excel Spreadsheet',
    csv: 'CSV Data',
    word: 'Word Document',
    powerpoint: 'PowerPoint Slides',
    audio: 'Audio',
    video: 'Video',
    map: 'Map',
    interactive_card: 'Interactive Card',
    calendar: 'Calendar',
    kanban: 'Kanban Board',
    timeline: 'Timeline',
    approval_dialog: 'Decision',
    workflow_graph: 'Workflow',
    '3d_models': '3D Models'
};
const FORMAT_ICONS = {
    text: 'FileText',
    table: 'Table2',
    chart: 'BarChart3',
    image: 'Image',
    pdf: 'FileText',
    excel: 'Table2',
    csv: 'FileDown',
    word: 'FileText',
    powerpoint: 'Presentation',
    audio: 'Volume2',
    video: 'Video',
    map: 'Map',
    interactive_card: 'Sparkles',
    calendar: 'Calendar',
    kanban: 'Columns',
    timeline: 'Clock',
    approval_dialog: 'CheckSquare',
    workflow_graph: 'GitBranch',
    '3d_models': 'Box'
};
const FORMAT_COLORS = {
    text: '#e8ecf4',
    table: '#4fc3f7',
    chart: '#00e5a0',
    image: '#8b5cf6',
    pdf: '#ff5757',
    excel: '#00e5a0',
    csv: '#f59e0b',
    word: '#4fc3f7',
    powerpoint: '#ff5757',
    audio: '#8b5cf6',
    video: '#ff5757',
    map: '#4fc3f7',
    interactive_card: '#00e5a0',
    calendar: '#f59e0b',
    kanban: '#8b5cf6',
    timeline: '#4fc3f7',
    approval_dialog: '#ff5757',
    workflow_graph: '#00e5a0',
    '3d_models': '#8b5cf6'
};


/***/ })

}]);