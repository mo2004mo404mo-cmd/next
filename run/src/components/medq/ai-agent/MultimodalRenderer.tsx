'use client';

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

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Download, Video, MapPin, Sparkles, Play, Pause, Box, Eye, Heart,
  ArrowRight, Calendar, CheckSquare, ExternalLink, X,
} from 'lucide-react';
import type {
  MultimodalContent, TextContent, TableContent, ChartContent, ImageContent,
  FileExportContent, AudioContent, VideoContent, MapContent,
  InteractiveCardContent, CalendarContent, KanbanContent, TimelineContent,
  ApprovalDialogContent, WorkflowGraphContent, Models3DContent,
} from '@/lib/agent/multimodal-types';
import { FORMAT_LABELS, FORMAT_COLORS } from '@/lib/agent/multimodal-types';

interface MultimodalRendererProps {
  content: MultimodalContent[];
  onAction?: (action: { type: string; data?: Record<string, unknown> }) => void;
}

export function MultimodalRenderer({ content, onAction }: MultimodalRendererProps) {
  if (!content || content.length === 0) return null;

  return (
    <div className="multimodal-renderer space-y-3">
      {content.map((block, idx) => (
        <ContentBlock key={idx} block={block} onAction={onAction} />
      ))}
    </div>
  );
}

// ─── Content Block Router ─────────────────────────────────────────────

function ContentBlock({ block, onAction }: { block: MultimodalContent; onAction?: (action: { type: string; data?: Record<string, unknown> }) => void }) {
  switch (block.format) {
    case 'text': return <TextBlock content={block} />;
    case 'table': return <TableBlock content={block} />;
    case 'chart': return <ChartBlock content={block} />;
    case 'image': return <ImageBlock content={block} />;
    case 'pdf':
    case 'excel':
    case 'csv':
    case 'word':
    case 'powerpoint': return <FileExportBlock content={block} />;
    case 'audio': return <AudioBlock content={block} />;
    case 'video': return <VideoBlock content={block} />;
    case 'map': return <MapBlock content={block} />;
    case 'interactive_card': return <InteractiveCardBlock content={block} onAction={onAction} />;
    case 'calendar': return <CalendarBlock content={block} />;
    case 'kanban': return <KanbanBlock content={block} />;
    case 'timeline': return <TimelineBlock content={block} />;
    case 'approval_dialog': return <ApprovalDialogBlock content={block} onAction={onAction} />;
    case 'workflow_graph': return <WorkflowGraphBlock content={block} />;
    case '3d_models': return <Models3DBlock content={block} />;
    default: return null;
  }
}

// ─── Format Badge ─────────────────────────────────────────────────────

function FormatBadge({ format }: { format: string }) {
  const color = (FORMAT_COLORS as Record<string, string>)[format] || '#8b95a8';
  const label = (FORMAT_LABELS as Record<string, string>)[format] || format;

  return (
    <span
      style={{
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
        border: `1px solid ${color}30`,
      }}
    >
      {label}
    </span>
  );
}

// ─── Card Shell ───────────────────────────────────────────────────────

function CardShell({
  format, title, children, extra,
}: {
  format: string;
  title?: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: 'rgba(20, 22, 30, 0.95)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {(title || format) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FormatBadge format={format} />
            {title && <span style={{ fontSize: '11px', fontWeight: 600, color: '#e8ecf4' }}>{title}</span>}
          </div>
          {extra}
        </div>
      )}
      <div style={{ padding: '12px' }}>{children}</div>
    </div>
  );
}

// ─── Text Block ───────────────────────────────────────────────────────

function TextBlock({ content }: { content: TextContent }) {
  const text = content.text;
  if (!text) return null;

  // Simple markdown-lite rendering
  const lines = text.split('\n');
  return (
    <CardShell format="text">
      <div style={{ fontSize: '12px', lineHeight: 1.6, color: '#c8cdd8' }}>
        {lines.map((line, i) => {
          // Bold
          const parts = line.split(/(\*\*[^*]+\*\*)/g);
          return (
            <React.Fragment key={i}>
              {parts.map((part, j) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={j} style={{ color: '#e8ecf4', fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
                }
                // Inline code
                const codeParts = part.split(/(`[^`]+`)/g);
                return codeParts.map((cp, k) => {
                  if (cp.startsWith('`') && cp.endsWith('`')) {
                    return <code key={`${j}-${k}`} style={{ background: 'rgba(0,229,160,0.1)', color: '#00e5a0', padding: '1px 4px', borderRadius: '3px', fontSize: '11px' }}>{cp.slice(1, -1)}</code>;
                  }
                  return <span key={`${j}-${k}`}>{cp}</span>;
                });
              })}
              {i < lines.length - 1 && <br />}
            </React.Fragment>
          );
        })}
      </div>
    </CardShell>
  );
}

// ─── Table Block ──────────────────────────────────────────────────────

function TableBlock({ content }: { content: TableContent }) {
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // Defensive normalization: the AI agent occasionally emits malformed table
  // rows (e.g. a plain string instead of string[], or an object). Coerce every
  // row into a string[] so `.map` on cells never throws.
  const normalizedRows = useMemo<(string)[][]>(() => {
    const raw = Array.isArray(content.rows) ? content.rows : [];
    return raw.map((row) => {
      if (Array.isArray(row)) return row.map((c) => (c == null ? '' : String(c)));
      if (row == null) return [];
      if (typeof row === 'object') {
        // Object row — use values (or keys+values) as cells.
        return Object.values(row).map((v) => (v == null ? '' : String(v)));
      }
      // Scalar row — single cell.
      return [String(row)];
    });
  }, [content.rows]);

  const sortedRows = useMemo(() => {
    if (sortCol === null) return normalizedRows;
    const sorted = [...normalizedRows].sort((a, b) => {
      const va = a[sortCol] || '';
      const vb = b[sortCol] || '';
      return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    });
    return sorted;
  }, [normalizedRows, sortCol, sortDir]);

  const handleSort = (col: number) => {
    if (!content.sortable) return;
    if (sortCol === col) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCol(col);
      setSortDir('asc');
    }
  };

  return (
    <CardShell format="table" title={content.title} extra={content.exportable ? <Download style={{ width: 14, height: 14, color: '#5a6478', cursor: 'pointer' }} /> : null}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
          <thead>
            <tr>
              {content.headers.map((h, i) => (
                <th
                  key={i}
                  onClick={() => handleSort(i)}
                  style={{
                    padding: '6px 8px',
                    textAlign: 'left',
                    fontWeight: 600,
                    color: '#8b95a8',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    cursor: content.sortable ? 'pointer' : 'default',
                    whiteSpace: 'nowrap',
                    userSelect: 'none',
                  }}
                >
                  {h} {sortCol === i && (sortDir === 'asc' ? '↑' : '↓')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '5px 8px', color: '#c8cdd8', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardShell>
  );
}

// ─── Chart Block (SVG-based mini chart) ───────────────────────────────

function ChartBlock({ content }: { content: ChartContent }) {
  const { chartType, title, data } = content;
  const maxVal = Math.max(...data.datasets.flatMap(d => d.data), 1);
  const barWidth = Math.max(Math.min(280 / data.labels.length - 4, 40), 8);
  const chartH = 120;
  const colors = ['#00e5a0', '#4fc3f7', '#8b5cf6', '#f59e0b', '#ff5757', '#00b87a'];

  // Simple bar chart
  if (chartType === 'bar' || chartType === 'area') {
    return (
      <CardShell format="chart" title={title}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <svg width="100%" viewBox={`0 0 ${data.labels.length * (barWidth + 8) + 40} ${chartH + 30}`} style={{ maxHeight: '160px' }}>
            {data.datasets.map((ds, di) =>
              ds.data.map((val, i) => {
                const h = (val / maxVal) * chartH;
                const x = 30 + i * (barWidth + 8);
                const y = chartH - h;
                return (
                  <rect key={`${di}-${i}`} x={x} y={y} width={barWidth} height={h} rx="2"
                    fill={ds.color || colors[di % colors.length]} opacity={0.85} />
                );
              })
            )}
            {data.labels.map((label, i) => (
              <text key={i} x={30 + i * (barWidth + 8) + barWidth / 2} y={chartH + 16}
                textAnchor="middle" fill="#5a6478" fontSize="9">
                {label.length > 8 ? label.slice(0, 7) + '…' : label}
              </text>
            ))}
          </svg>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '4px' }}>
            {data.datasets.map((ds, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: '#8b95a8' }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: ds.color || colors[i % colors.length] }} />
                {ds.label}
              </span>
            ))}
          </div>
        </div>
      </CardShell>
    );
  }

  // Pie chart (simplified)
  if (chartType === 'pie') {
    const total = data.datasets[0]?.data.reduce((a, b) => a + b, 0) || 1;
    let cumulative = 0;
    const cx = 60, cy = 60, r = 50;

    return (
      <CardShell format="chart" title={title}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            {data.datasets[0]?.data.map((val, i) => {
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
              return (
                <path key={i} d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={colors[i % colors.length]} opacity={0.85} />
              );
            })}
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {data.labels.map((label, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#c8cdd8' }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: colors[i % colors.length], flexShrink: 0 }} />
                {label}: {data.datasets[0]?.data[i]}
              </span>
            ))}
          </div>
        </div>
      </CardShell>
    );
  }

  // Default: line chart fallback to bar
  return (
    <CardShell format="chart" title={title}>
      <div style={{ fontSize: '11px', color: '#8b95a8', padding: '8px' }}>
        Chart type &quot;{chartType}&quot; — {data.labels.length} data points
      </div>
    </CardShell>
  );
}

// ─── Image Block ──────────────────────────────────────────────────────

function ImageBlock({ content }: { content: ImageContent }) {
  return (
    <CardShell format="image" title={content.caption}>
      <Image
        src={content.url}
        alt={content.alt}
        width={1200}
        height={300}
        unoptimized
        style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '8px' }}
      />
    </CardShell>
  );
}

// ─── File Export Block ────────────────────────────────────────────────

function FileExportBlock({ content }: { content: FileExportContent }) {
  return (
    <CardShell format={content.format} title={content.title}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: 40, height: 40, borderRadius: '8px',
          background: `${(FORMAT_COLORS as Record<string, string>)[content.format] || '#8b95a8'}15`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `1px solid ${(FORMAT_COLORS as Record<string, string>)[content.format] || '#8b95a8'}30`,
        }}>
          <Download style={{ width: 18, height: 18, color: (FORMAT_COLORS as Record<string, string>)[content.format] || '#8b95a8' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#e8ecf4' }}>{content.title}</div>
          {content.description && <div style={{ fontSize: '10px', color: '#8b95a8', marginTop: '2px' }}>{content.description}</div>}
        </div>
        {content.downloadUrl && (
          <a href={content.downloadUrl} download style={{ padding: '6px 12px', borderRadius: '6px', background: 'linear-gradient(135deg, #00e5a0, #00b87a)', color: '#0c0e14', fontSize: '10px', fontWeight: 700, textDecoration: 'none' }}>
            Download
          </a>
        )}
      </div>
    </CardShell>
  );
}

// ─── Audio Block ──────────────────────────────────────────────────────

function AudioBlock({ content }: { content: AudioContent }) {
  const [playing, setPlaying] = useState(false);

  return (
    <CardShell format="audio" title={content.text.slice(0, 60)}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={() => setPlaying(!playing)}
          style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {playing ? <Pause style={{ width: 14, height: 14, color: '#fff' }} /> : <Play style={{ width: 14, height: 14, color: '#fff', marginLeft: 2 }} />}
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '11px', color: '#c8cdd8' }}>{content.text.slice(0, 100)}</div>
          {content.duration && <div style={{ fontSize: '9px', color: '#5a6478', marginTop: '2px' }}>{content.duration}s</div>}
        </div>
      </div>
    </CardShell>
  );
}

// ─── Video Block ──────────────────────────────────────────────────────

function VideoBlock({ content }: { content: VideoContent }) {
  return (
    <CardShell format="video" title={content.title}>
      <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', background: '#000', aspectRatio: '16/9' }}>
        {content.thumbnail ? (
          <Image src={content.thumbnail} alt={content.title} width={1600} height={900} unoptimized style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#5a6478' }}>
            <Video style={{ width: 32, height: 32 }} />
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Play style={{ width: 20, height: 20, color: '#fff', marginLeft: 3 }} />
          </div>
        </div>
      </div>
    </CardShell>
  );
}

// ─── Map Block ────────────────────────────────────────────────────────

function MapBlock({ content }: { content: MapContent }) {
  return (
    <CardShell format="map" title={content.title}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {content.locations.map((loc, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', background: 'rgba(79,195,247,0.05)', borderRadius: '6px', border: '1px solid rgba(79,195,247,0.1)' }}>
            <MapPin style={{ width: 14, height: 14, color: '#4fc3f7', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#e8ecf4' }}>{loc.name}</div>
              {loc.description && <div style={{ fontSize: '9px', color: '#8b95a8' }}>{loc.description}</div>}
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

// ─── Interactive Card Block ───────────────────────────────────────────

function InteractiveCardBlock({ content, onAction }: { content: InteractiveCardContent; onAction?: (action: { type: string; data?: Record<string, unknown> }) => void }) {
  const color = content.color || '#00e5a0';

  return (
    <CardShell format="interactive_card">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '8px',
            background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1px solid ${color}30`, flexShrink: 0,
          }}>
            <Sparkles style={{ width: 16, height: 16, color }} />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#e8ecf4' }}>{content.title}</div>
            <div style={{ fontSize: '10px', color: '#8b95a8', marginTop: '2px' }}>{content.description}</div>
          </div>
        </div>
        {content.details && Object.keys(content.details).length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {Object.entries(content.details).slice(0, 4).map(([k, v]) => (
              <span key={k} style={{ fontSize: '9px', padding: '2px 6px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', color: '#8b95a8', border: '1px solid rgba(255,255,255,0.06)' }}>
                {k}: {v}
              </span>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {content.actions.map((action) => (
            <button
              key={action.id}
              onClick={() => onAction?.({ type: action.type, data: { target: action.target, ...action.data } })}
              style={{
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
                gap: '4px',
              }}
            >
              {action.label}
              <ArrowRight style={{ width: 10, height: 10 }} />
            </button>
          ))}
        </div>
      </div>
    </CardShell>
  );
}

// ─── Calendar Block ───────────────────────────────────────────────────

function CalendarBlock({ content }: { content: CalendarContent }) {
  const typeColors: Record<string, string> = {
    study: '#00e5a0', exam: '#ff5757', review: '#8b5cf6', break: '#4fc3f7', deadline: '#f59e0b',
  };

  return (
    <CardShell format="calendar" title={content.title}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {content.events.map((event) => (
          <div key={event.id} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '6px 8px', borderRadius: '6px',
            background: `${typeColors[event.type || 'study'] || '#00e5a0'}08`,
            borderLeft: `3px solid ${typeColors[event.type || 'study'] || '#00e5a0'}`,
          }}>
            <Calendar style={{ width: 12, height: 12, color: typeColors[event.type || 'study'] || '#00e5a0', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '10px', fontWeight: 600, color: '#e8ecf4' }}>{event.title}</div>
              <div style={{ fontSize: '9px', color: '#5a6478' }}>{event.date}</div>
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

// ─── Kanban Block ─────────────────────────────────────────────────────

function KanbanBlock({ content }: { content: KanbanContent }) {
  return (
    <CardShell format="kanban" title={content.title}>
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
        {content.columns.map((col) => (
          <div key={col.id} style={{
            minWidth: '140px', flex: 1,
            background: `${col.color}08`, borderRadius: '8px',
            border: `1px solid ${col.color}20`, padding: '8px',
          }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: col.color, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {col.title} ({col.items.length})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {col.items.map((item) => (
                <div key={item.id} style={{
                  padding: '6px 8px', background: 'rgba(12,14,20,0.8)',
                  borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: '#e8ecf4' }}>{item.title}</div>
                  {item.description && <div style={{ fontSize: '9px', color: '#5a6478', marginTop: '2px' }}>{item.description}</div>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

// ─── Timeline Block ───────────────────────────────────────────────────

function TimelineBlock({ content }: { content: TimelineContent }) {
  const statusColors: Record<string, string> = {
    completed: '#00e5a0', current: '#4fc3f7', upcoming: '#8b95a8', overdue: '#ff5757',
  };

  return (
    <CardShell format="timeline" title={content.title}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {content.events.map((event, i) => {
          const color = event.color || statusColors[event.status || 'upcoming'] || '#8b95a8';
          return (
            <div key={event.id} style={{ display: 'flex', gap: '12px', position: 'relative' }}>
              {/* Line + dot */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '16px', flexShrink: 0 }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%', background: color,
                  border: '2px solid rgba(12,14,20,1)', zIndex: 1,
                }} />
                {i < content.events.length - 1 && (
                  <div style={{ width: 2, flex: 1, background: 'rgba(255,255,255,0.08)' }} />
                )}
              </div>
              {/* Content */}
              <div style={{ paddingBottom: '12px', flex: 1 }}>
                <div style={{ fontSize: '9px', color: '#5a6478', marginBottom: '2px' }}>{event.date}</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#e8ecf4' }}>{event.title}</div>
                {event.description && <div style={{ fontSize: '10px', color: '#8b95a8', marginTop: '2px' }}>{event.description}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </CardShell>
  );
}

// ─── Approval Dialog Block ────────────────────────────────────────────

function ApprovalDialogBlock({ content, onAction }: { content: ApprovalDialogContent; onAction?: (action: { type: string; data?: Record<string, unknown> }) => void }) {
  const styleMap: Record<string, { bg: string; border: string; text: string }> = {
    primary: { bg: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.3)', text: '#00e5a0' },
    secondary: { bg: 'rgba(79,195,247,0.1)', border: '1px solid rgba(79,195,247,0.3)', text: '#4fc3f7' },
    danger: { bg: 'rgba(255,87,87,0.1)', border: '1px solid rgba(255,87,87,0.3)', text: '#ff5757' },
    success: { bg: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.3)', text: '#00e5a0' },
  };

  const urgencyColors = { low: '#8b95a8', medium: '#f59e0b', high: '#ff5757' };

  return (
    <CardShell format="approval_dialog">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckSquare style={{ width: 16, height: 16, color: urgencyColors[content.urgency || 'medium'] }} />
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#e8ecf4' }}>{content.title}</span>
        </div>
        <div style={{ fontSize: '11px', color: '#c8cdd8', lineHeight: 1.5 }}>{content.message}</div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {content.options.map((opt) => {
            const s = styleMap[opt.style] || styleMap.secondary;
            return (
              <button
                key={opt.id}
                onClick={() => onAction?.({ type: 'approval', data: { optionId: opt.id, action: opt.action } })}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  background: s.bg,
                  border: s.border,
                  color: s.text,
                  cursor: 'pointer',
                  fontSize: '10px',
                  fontWeight: 700,
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </CardShell>
  );
}

// ─── Workflow Graph Block ─────────────────────────────────────────────

function WorkflowGraphBlock({ content }: { content: WorkflowGraphContent }) {
  const typeColors: Record<string, string> = {
    start: '#00e5a0', process: '#4fc3f7', decision: '#f59e0b', action: '#8b5cf6', end: '#ff5757',
  };
  const statusColors: Record<string, string> = {
    completed: '#00e5a0', active: '#4fc3f7', pending: '#5a6478', skipped: '#3a4055',
  };

  return (
    <CardShell format="workflow_graph" title={content.title}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {content.nodes.map((node, i) => {
          const color = typeColors[node.type] || '#8b95a8';
          const statusColor = statusColors[node.status || 'pending'] || '#5a6478';
          return (
            <div key={node.id}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '8px 10px', borderRadius: '8px',
                background: `${color}08`, border: `1px solid ${color}20`,
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: node.type === 'decision' ? '0' : '50%',
                  background: statusColor, transform: node.type === 'decision' ? 'rotate(45deg)' : 'none',
                  flexShrink: 0,
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: '#e8ecf4' }}>{node.title}</div>
                  {node.description && <div style={{ fontSize: '9px', color: '#8b95a8', marginTop: '1px' }}>{node.description}</div>}
                </div>
                <span style={{
                  fontSize: '8px', fontWeight: 700, textTransform: 'uppercase', color, letterSpacing: '0.05em',
                }}>
                  {node.type}
                </span>
              </div>
              {i < content.nodes.length - 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '2px 0' }}>
                  <ArrowRight style={{ width: 12, height: 12, color: '#3a4055', transform: 'rotate(90deg)' }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </CardShell>
  );
}

// ─── 3D Models Block (Sketchfab search results, inline-embeddable) ───

function Models3DBlock({ content }: { content: Models3DContent }) {
  // Auto-open the suggested model (or the first one) in the inline iframe.
  const initialUid = content.suggestedModelUid || content.models[0]?.uid;
  const [activeUid, setActiveUid] = useState<string | undefined>(initialUid);
  const [iframeOpen, setIframeOpen] = useState<boolean>(Boolean(initialUid));

  const activeModel = content.models.find((m) => m.uid === activeUid);

  return (
    <CardShell format="3d_models" title={content.title}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Inline Sketchfab iframe viewer */}
        {iframeOpen && activeModel && (
          <div
            style={{
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              background: '#000',
              aspectRatio: '16/9',
              border: '1px solid rgba(139, 92, 246, 0.3)',
            }}
          >
            <iframe
              key={activeModel.uid}
              src={activeModel.embedUrl}
              title={activeModel.name}
              allow="autoplay; fullscreen; xr-spatial-tracking"
              referrerPolicy="origin"
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
            {/* Header overlay with model name + close button */}
            <div
              style={{
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
                pointerEvents: 'none',
              }}
            >
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>
                {activeModel.name}
              </span>
              <a
                href={activeModel.viewerUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  pointerEvents: 'auto',
                  color: '#c8d0e0',
                  fontSize: '10px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                  padding: '3px 6px',
                  borderRadius: '4px',
                  background: 'rgba(255,255,255,0.1)',
                }}
              >
                <ExternalLink style={{ width: 10, height: 10 }} />
                Sketchfab
              </a>
            </div>
            {/* Close button */}
            <button
              onClick={() => setIframeOpen(false)}
              aria-label="Close 3D viewer"
              style={{
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
                justifyContent: 'center',
              }}
            >
              <X style={{ width: 12, height: 12 }} />
            </button>
          </div>
        )}

        {/* Grid of model cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '8px',
          }}
        >
          {content.models.map((m) => {
            const isActive = m.uid === activeUid && iframeOpen;
            return (
              <button
                key={m.uid}
                onClick={() => {
                  setActiveUid(m.uid);
                  setIframeOpen(true);
                }}
                style={{
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
                  transition: 'border-color 0.15s, background 0.15s',
                }}
              >
                {/* Thumbnail */}
                <div style={{ position: 'relative', aspectRatio: '4/3', background: '#0c0e14' }}>
                  {m.thumbnailUrl ? (
                    <Image
                      src={m.thumbnailUrl}
                      alt={m.name}
                      width={400}
                      height={300}
                      unoptimized
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                      <Box style={{ width: 18, height: 18, color: '#3a4055' }} />
                    </div>
                  )}
                  {/* Hover hint */}
                  <div
                    style={{
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
                      letterSpacing: '0.05em',
                    }}
                    className="models-3d-hover"
                  >
                    View 3D
                  </div>
                </div>
                {/* Meta */}
                <div style={{ padding: '4px 6px 6px' }}>
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      color: '#e8ecf4',
                      lineHeight: 1.25,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {m.name}
                  </div>
                  <div style={{ fontSize: '9px', color: '#8b95a8', marginTop: '2px' }}>by {m.author}</div>
                  {(m.likeCount > 0 || m.viewCount > 0) && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '3px', fontSize: '9px', color: '#5a6478' }}>
                      {m.likeCount > 0 && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                          <Heart style={{ width: 9, height: 9 }} />
                          {m.likeCount}
                        </span>
                      )}
                      {m.viewCount > 0 && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                          <Eye style={{ width: 9, height: 9 }} />
                          {m.viewCount}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Reopen button if user closed the iframe */}
        {!iframeOpen && activeModel && (
          <button
            onClick={() => setIframeOpen(true)}
            style={{
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
              cursor: 'pointer',
            }}
          >
            <Box style={{ width: 12, height: 12 }} />
            Reopen 3D viewer
          </button>
        )}
      </div>
    </CardShell>
  );
}
