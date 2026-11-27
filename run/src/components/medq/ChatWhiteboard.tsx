'use client';

import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { Stage, Layer, Line, Rect, Circle, Arrow as KonvaArrow, Text as KonvaText, Group, Path, Image as KonvaImage } from 'react-konva';
import Konva from 'konva';
import {
  Pencil, Eraser, Square, Circle as CircleIcon, Minus, MoveRight, Type,
  Undo2, Redo2, Trash2, Camera, Video, VideoOff, Pause, Play,
  Send, ArrowLeft, Highlighter, StickyNote, Waypoints, LayoutTemplate, X,
  Crosshair, Monitor, Maximize2, ChevronLeft, ChevronRight, FileText, FileOutput,
  Sparkles, Group as GroupIcon, FileText as SummarizeIcon, Loader2,
  Vote, ThumbsUp, Clock, Trophy, Check, Pentagon, Triangle, Diamond,
  ToggleLeft, ToggleRight, Image as ImageIcon, Paperclip, Link2,
  Download, ExternalLink, ChevronDown, Upload, Layers
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/lib/hooks/use-theme';

/* ══════════════════════════════════════════════════════════════ */
/* ── Types ──                                                   */
/* ══════════════════════════════════════════════════════════════ */

/* ── Remote Cursor Types ── */
export interface RemoteCursor {
  userId: string;
  userName: string;
  x: number;
  y: number;
  tool: ToolType;
  color: string;
  lastSeen: number;
}

/* ── Remote Laser Types ── */
export interface LaserTrailPoint {
  x: number;
  y: number;
  timestamp: number;
}

export interface RemoteLaser {
  userId: string;
  userName: string;
  color: string;
  points: LaserTrailPoint[];
  lastSeen: number;
}

export interface ChatWhiteboardProps {
  onSave: (data: string) => void;
  onRecordingComplete?: (blob: Blob, url: string) => void;
  onBack?: () => void;
  onSend?: () => void;
  sending?: boolean;
  hasCapturedData?: boolean;
  /** Callback when the local user's cursor moves on the canvas (throttled to ~15fps) */
  onCursorMove?: (data: { x: number; y: number; tool: ToolType }) => void;
  /** Callback when the local user leaves the canvas */
  onCursorLeave?: () => void;
  /** Remote cursors from other collaborators to render on the canvas */
  remoteCursors?: RemoteCursor[];
  /** Callback when laser pointer moves (throttled to ~15fps) */
  onLaserMove?: (data: { x: number; y: number }) => void;
  /** Callback when laser pointer stops (mouse up / tool deactivated) */
  onLaserStop?: () => void;
  /** Remote laser pointers from other collaborators */
  remoteLasers?: RemoteLaser[];
  /** Callback when a vote is cast — broadcast via Socket.IO `wb:vote-cast` */
  onVoteCast?: (data: VoteCastEvent) => void;
  /** Callback when voting ends — broadcast via Socket.IO `wb:vote-end` */
  onVoteEnd?: (data: VoteEndEvent) => void;
  /** Remote vote events received from Socket.IO */
  remoteVoteEvents?: VoteCastEvent[];
}

type AnchorPosition = 'top' | 'right' | 'bottom' | 'left';

interface DrawItem {
  id: string;
  type: 'line' | 'rect' | 'circle' | 'arrow' | 'text' | 'freeform' | 'sticky' | 'connector' | 'frame' | 'diamond' | 'image' | 'file' | 'link';
  points?: number[];
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  radius?: number;
  strokeColor: string;
  fillColor: string;
  strokeWidth: number;
  opacity: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  globalCompositeOperation?: GlobalCompositeOperation;
  dash?: number[];
  stickyColor?: string;
  stickyFoldColor?: string;
  stickyTextColor?: string;
  // Connector-specific fields
  sourceId?: string;
  sourceAnchor?: AnchorPosition;
  targetId?: string;
  targetAnchor?: AnchorPosition;
  connectorStyle?: 'straight' | 'curved' | 'elbow';
  showArrowhead?: 'none' | 'end' | 'start' | 'both';
  // Frame-specific fields
  frameTitle?: string;
  frameNotes?: string;
  frameBgColor?: string;
  // AI-generated marker
  aiGenerated?: boolean;
  // Image-specific fields
  src?: string;
  rotation?: number;
  // File-specific fields
  fileName?: string;
  fileUrl?: string;
  fileType?: string;
  fileSize?: number;
  // Link-specific fields
  linkUrl?: string;
  linkTitle?: string;
  linkDescription?: string;
  linkFavicon?: string;
}

type ToolType = 'pen' | 'highlighter' | 'eraser' | 'rectangle' | 'circle' | 'line' | 'arrow' | 'text' | 'sticky' | 'connector' | 'laser' | 'frame';

type RecordingStatus = 'idle' | 'recording' | 'paused';

/* ── PDF Export Types ── */
type PdfPageSize = 'a4' | 'letter' | 'custom';
type PdfOrientation = 'landscape' | 'portrait';

interface PdfExportConfig {
  pageSize: PdfPageSize;
  orientation: PdfOrientation;
  customWidth: number;
  customHeight: number;
  includeGrid: boolean;
  framesAsPages: boolean;
  margin: number;
  quality: 'vector' | 'raster';
}

/* ── Voting Types ── */

export interface VoteConfig {
  id: string;
  title: string;
  votesPerUser: number;       // how many votes each person can cast
  timeLimitSeconds: number;   // 0 = no time limit
  candidateItemIds: string[]; // item IDs that can be voted on
  createdBy: string;
  createdAt: number;
}

export interface VoteCastEvent {
  voteId: string;
  userId: string;
  userName: string;
  itemId: string;             // which canvas item received the vote
  timestamp: number;
}

export interface VoteEndEvent {
  voteId: string;
  results: Record<string, number>; // itemId -> vote count
  timestamp: number;
}

type VotingPhase = 'idle' | 'configuring' | 'active' | 'ended';

/* ══════════════════════════════════════════════════════════════ */
/* ── Constants ──                                               */
/* ══════════════════════════════════════════════════════════════ */

const COLORS = [
  '#00e5a0', '#4fc3f7', '#ff5757', '#f59e0b', '#8b5cf6', '#ec4899',
  '#ffffff', '#5a6478', '#e74c3c', '#0984e3', '#fdcb6e', '#6c5ce7',
];

const BRUSH_SIZES = [2, 4, 8, 14];

const STICKY_COLORS = [
  { name: 'Yellow', body: '#FEF3C7', fold: '#FDE68A', text: '#92400E' },
  { name: 'Pink', body: '#FCE7F3', fold: '#F9A8D4', text: '#9D174D' },
  { name: 'Blue', body: '#DBEAFE', fold: '#93C5FD', text: '#1E40AF' },
  { name: 'Green', body: '#D1FAE5', fold: '#6EE7B7', text: '#065F46' },
  { name: 'Orange', body: '#FED7AA', fold: '#FDBA74', text: '#9A3412' },
  { name: 'Purple', body: '#EDE9FE', fold: '#C4B5FD', text: '#5B21B6' },
];

const CANVAS_BG = '#1a1d27';

const CONNECTOR_STYLES: { value: DrawItem['connectorStyle']; label: string }[] = [
  { value: 'straight', label: 'Straight' },
  { value: 'curved', label: 'Curved' },
  { value: 'elbow', label: 'Elbow' },
];
const ARROWHEAD_OPTIONS: { value: DrawItem['showArrowhead']; label: string }[] = [
  { value: 'none', label: 'No Arrow' },
  { value: 'end', label: 'End Arrow' },
  { value: 'start', label: 'Start Arrow' },
  { value: 'both', label: 'Both Arrows' },
];

const ZOOM_PRESETS = [0.5, 0.75, 1, 1.5, 2];

const TOOL_CONFIG: Record<ToolType, { label: string; icon: React.ReactNode; cursor: string }> = {
  pen: { label: 'Pen', icon: <Pencil className="w-4 h-4" />, cursor: 'crosshair' },
  highlighter: { label: 'Highlighter', icon: <Highlighter className="w-4 h-4" />, cursor: 'crosshair' },
  eraser: { label: 'Eraser', icon: <Eraser className="w-4 h-4" />, cursor: 'crosshair' },
  rectangle: { label: 'Rectangle', icon: <Square className="w-4 h-4" />, cursor: 'crosshair' },
  circle: { label: 'Circle', icon: <CircleIcon className="w-4 h-4" />, cursor: 'crosshair' },
  line: { label: 'Line', icon: <Minus className="w-4 h-4" />, cursor: 'crosshair' },
  arrow: { label: 'Arrow', icon: <MoveRight className="w-4 h-4" />, cursor: 'crosshair' },
  text: { label: 'Text', icon: <Type className="w-4 h-4" />, cursor: 'text' },
  sticky: { label: 'Sticky Note', icon: <StickyNote className="w-4 h-4" />, cursor: 'crosshair' },
  connector: { label: 'Connector', icon: <Waypoints className="w-4 h-4" />, cursor: 'crosshair' },
  laser: { label: 'Laser', icon: <Crosshair className="w-4 h-4" />, cursor: 'none' },
  frame: { label: 'Frame', icon: <Monitor className="w-4 h-4" />, cursor: 'crosshair' },
};

function generateId(): string {
  return `dw_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function formatTimer(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

/* ══════════════════════════════════════════════════════════════ */
/* ── Anchor Point Helpers ──                                    */
/* ══════════════════════════════════════════════════════════════ */

function getAnchorPoints(item: DrawItem): Record<AnchorPosition, { x: number; y: number }> {
  switch (item.type) {
    case 'sticky':
    case 'rect':
    case 'frame': {
      const x = item.x || 0, y = item.y || 0, w = item.width || 180, h = item.height || 160;
      return {
        top: { x: x + w / 2, y },
        right: { x: x + w, y: y + h / 2 },
        bottom: { x: x + w / 2, y: y + h },
        left: { x, y: y + h / 2 },
      };
    }
    case 'circle': {
      const x = item.x || 0, y = item.y || 0, r = item.radius || 50;
      return {
        top: { x, y: y - r },
        right: { x: x + r, y },
        bottom: { x, y: y + r },
        left: { x: x - r, y },
      };
    }
    case 'diamond': {
      const x = item.x || 0, y = item.y || 0, hw = (item.width || 80) / 2, hh = (item.height || 80) / 2;
      return {
        top: { x, y: y - hh },
        right: { x: x + hw, y },
        bottom: { x, y: y + hh },
        left: { x: x - hw, y },
      };
    }
    case 'image':
    case 'file':
    case 'link': {
      const x = item.x || 0, y = item.y || 0, w = item.width || 200, h = item.height || 150;
      return {
        top: { x: x + w / 2, y },
        right: { x: x + w, y: y + h / 2 },
        bottom: { x: x + w / 2, y: y + h },
        left: { x, y: y + h / 2 },
      };
    }
    case 'text': {
      const x = item.x || 0, y = item.y || 0;
      const approxW = (item.text || '').length * (item.fontSize || 18) * 0.55;
      const approxH = (item.fontSize || 18) * 1.2;
      return {
        top: { x: x + approxW / 2, y },
        right: { x: x + approxW, y: y + approxH / 2 },
        bottom: { x: x + approxW / 2, y: y + approxH },
        left: { x, y: y + approxH / 2 },
      };
    }
    default:
      return { top: { x: 0, y: 0 }, right: { x: 0, y: 0 }, bottom: { x: 0, y: 0 }, left: { x: 0, y: 0 } };
  }
}

function buildConnectorPath(
  sx: number, sy: number, sAnchor: AnchorPosition,
  tx: number, ty: number, tAnchor: AnchorPosition,
  style: 'straight' | 'curved' | 'elbow'
): number[] {
  if (style === 'straight') {
    return [sx, sy, tx, ty];
  }
  if (style === 'curved') {
    const OFFSET = 80;
    const sOffset: Record<AnchorPosition, { x: number; y: number }> = {
      top: { x: 0, y: -OFFSET }, right: { x: OFFSET, y: 0 },
      bottom: { x: 0, y: OFFSET }, left: { x: -OFFSET, y: 0 },
    };
    const tOffset: Record<AnchorPosition, { x: number; y: number }> = {
      top: { x: 0, y: -OFFSET }, right: { x: OFFSET, y: 0 },
      bottom: { x: 0, y: OFFSET }, left: { x: -OFFSET, y: 0 },
    };
    const cp1x = sx + sOffset[sAnchor].x;
    const cp1y = sy + sOffset[sAnchor].y;
    const cp2x = tx + tOffset[tAnchor].x;
    const cp2y = ty + tOffset[tAnchor].y;
    return [sx, sy, cp1x, cp1y, cp2x, cp2y, tx, ty];
  }
  // Elbow - right-angle path
  const sDir: Record<AnchorPosition, { x: number; y: number }> = {
    top: { x: 0, y: -1 }, right: { x: 1, y: 0 },
    bottom: { x: 0, y: 1 }, left: { x: -1, y: 0 },
  };
  const tDir: Record<AnchorPosition, { x: number; y: number }> = {
    top: { x: 0, y: -1 }, right: { x: 1, y: 0 },
    bottom: { x: 0, y: 1 }, left: { x: -1, y: 0 },
  };
  const midX = (sx + tx) / 2;
  const midY = (sy + ty) / 2;
  const p1x = sx + sDir[sAnchor].x * Math.abs(midX - sx);
  const p1y = sy + sDir[sAnchor].y * Math.abs(midY - sy);
  const p2x = tx + tDir[tAnchor].x * Math.abs(midX - tx);
  const p2y = ty + tDir[tAnchor].y * Math.abs(midY - ty);
  return [sx, sy, p1x, p1y, p2x, p2y, tx, ty];
}

function drawArrowhead(x: number, y: number, angle: number, size: number = 10): string {
  const x1 = x - size * Math.cos(angle - Math.PI / 6);
  const y1 = y - size * Math.sin(angle - Math.PI / 6);
  const x2 = x - size * Math.cos(angle + Math.PI / 6);
  const y2 = y - size * Math.sin(angle + Math.PI / 6);
  return `M ${x1} ${y1} L ${x} ${y} L ${x2} ${y2}`;
}

/* ══════════════════════════════════════════════════════════════ */
/* ── Template Definitions ──                                    */
/* ══════════════════════════════════════════════════════════════ */

interface TemplateDef {
  name: string;
  icon: string;
  items: DrawItem[];
}

const TEMPLATES: TemplateDef[] = [
  // 1. Mind Map
  {
    name: 'Mind Map',
    icon: '🧠',
    items: (() => {
      const cx = 400, cy = 250;
      const items: DrawItem[] = [
        { id: generateId(), type: 'circle', x: cx, y: cy, radius: 60, strokeColor: '#00e5a0', fillColor: 'rgba(0,229,160,0.08)', strokeWidth: 2, opacity: 1, text: 'Central Topic', fontSize: 14 },
        { id: generateId(), type: 'text', x: cx - 45, y: cy - 8, text: 'Central Topic', strokeColor: '#00e5a0', fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 14 },
      ];
      const branches = [
        { label: 'Branch 1', angle: -Math.PI / 2 },
        { label: 'Branch 2', angle: -Math.PI / 6 },
        { label: 'Branch 3', angle: Math.PI / 6 },
        { label: 'Branch 4', angle: Math.PI / 2 },
        { label: 'Branch 5', angle: Math.PI * 5 / 6 },
        { label: 'Branch 6', angle: -Math.PI * 5 / 6 },
      ];
      branches.forEach((b, i) => {
        const ex = cx + Math.cos(b.angle) * 200;
        const ey = cy + Math.sin(b.angle) * 150;
        const rectW = 100, rectH = 40;
        items.push({
          id: generateId(), type: 'line',
          points: [cx + Math.cos(b.angle) * 60, cy + Math.sin(b.angle) * 60, ex - Math.cos(b.angle) * (rectW / 2), ey],
          strokeColor: '#4fc3f7', fillColor: 'transparent', strokeWidth: 2, opacity: 0.7,
        });
        items.push({
          id: generateId(), type: 'rect',
          x: ex - rectW / 2, y: ey - rectH / 2, width: rectW, height: rectH,
          strokeColor: '#4fc3f7', fillColor: 'rgba(79,195,247,0.08)', strokeWidth: 1.5, opacity: 1,
        });
        items.push({
          id: generateId(), type: 'text',
          x: ex - rectW / 2 + 12, y: ey - 7, text: b.label,
          strokeColor: '#4fc3f7', fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 13,
        });
      });
      return items;
    })(),
  },
  // 2. Kanban Board
  {
    name: 'Kanban Board',
    icon: '📋',
    items: (() => {
      const items: DrawItem[] = [];
      const cols = ['To Do', 'In Progress', 'Review', 'Done'];
      const colW = 170, gap = 12, startX = 30, startY = 40;
      const colColors = ['#f59e0b', '#4fc3f7', '#8b5cf6', '#00e5a0'];
      cols.forEach((col, i) => {
        const x = startX + i * (colW + gap);
        // Column header
        items.push({
          id: generateId(), type: 'rect', x, y: startY, width: colW, height: 36,
          strokeColor: colColors[i], fillColor: 'rgba(0,0,0,0.3)', strokeWidth: 1.5, opacity: 1,
        });
        items.push({
          id: generateId(), type: 'text', x: x + 10, y: startY + 9, text: col,
          strokeColor: colColors[i], fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 14,
        });
        // Two sticky notes per column
        const stickyColors = [
          { body: '#FEF3C7', fold: '#FDE68A', text: '#92400E' },
          { body: '#DBEAFE', fold: '#93C5FD', text: '#1E40AF' },
        ];
        stickyColors.forEach((sc, j) => {
          items.push({
            id: generateId(), type: 'sticky',
            x: x + 8, y: startY + 50 + j * 120, width: colW - 16, height: 100,
            strokeColor: 'transparent', fillColor: 'transparent', strokeWidth: 1, opacity: 1,
            text: '', fontSize: 12,
            stickyColor: sc.body, stickyFoldColor: sc.fold, stickyTextColor: sc.text,
          });
        });
      });
      return items;
    })(),
  },
  // 3. SWOT Analysis
  {
    name: 'SWOT Analysis',
    icon: '📊',
    items: (() => {
      const items: DrawItem[] = [];
      const cx = 400, cy = 250, qw = 180, qh = 130, gap = 8;
      const positions = [
        { x: cx - qw - gap / 2, y: cy - qh - gap / 2, label: 'Strengths', color: '#00e5a0' },
        { x: cx + gap / 2, y: cy - qh - gap / 2, label: 'Weaknesses', color: '#ff5757' },
        { x: cx - qw - gap / 2, y: cy + gap / 2, label: 'Opportunities', color: '#4fc3f7' },
        { x: cx + gap / 2, y: cy + gap / 2, label: 'Threats', color: '#f59e0b' },
      ];
      positions.forEach((p) => {
        items.push({
          id: generateId(), type: 'rect', x: p.x, y: p.y, width: qw, height: qh,
          strokeColor: p.color, fillColor: 'rgba(0,0,0,0.2)', strokeWidth: 2, opacity: 1,
        });
        items.push({
          id: generateId(), type: 'text', x: p.x + 12, y: p.y + 10, text: p.label,
          strokeColor: p.color, fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 16,
        });
      });
      // Title
      items.push({
        id: generateId(), type: 'text', x: cx - 50, y: cy - qh - gap / 2 - 30, text: 'SWOT Analysis',
        strokeColor: '#e8ecf4', fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 18,
      });
      return items;
    })(),
  },
  // 4. Venn Diagram
  {
    name: 'Venn Diagram',
    icon: '⭕',
    items: (() => {
      const items: DrawItem[] = [];
      const cx = 400, cy = 260, r = 100, off = 70;
      const circles = [
        { x: cx - off, y: cy - 30, label: 'A', color: '#00e5a0' },
        { x: cx + off, y: cy - 30, label: 'B', color: '#4fc3f7' },
        { x: cx, y: cy + 50, label: 'C', color: '#8b5cf6' },
      ];
      circles.forEach((c) => {
        items.push({
          id: generateId(), type: 'circle', x: c.x, y: c.y, radius: r,
          strokeColor: c.color, fillColor: 'transparent', strokeWidth: 2, opacity: 0.7,
        });
        items.push({
          id: generateId(), type: 'text', x: c.x + (c.label === 'A' ? -40 : c.label === 'B' ? 30 : -5), y: c.y - 60, text: c.label,
          strokeColor: c.color, fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 18,
        });
      });
      items.push({
        id: generateId(), type: 'text', x: cx - 50, y: cy - 170, text: 'Venn Diagram',
        strokeColor: '#e8ecf4', fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 18,
      });
      return items;
    })(),
  },
  // 5. Flowchart
  {
    name: 'Flowchart',
    icon: '🔀',
    items: (() => {
      const items: DrawItem[] = [];
      const cx = 400;
      // Start
      items.push({
        id: generateId(), type: 'rect', x: cx - 60, y: 30, width: 120, height: 40,
        strokeColor: '#00e5a0', fillColor: 'rgba(0,229,160,0.1)', strokeWidth: 2, opacity: 1,
      });
      items.push({
        id: generateId(), type: 'text', x: cx - 25, y: 40, text: 'Start',
        strokeColor: '#00e5a0', fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 14,
      });
      // Arrow down
      items.push({
        id: generateId(), type: 'arrow', points: [cx, 70, cx, 100],
        strokeColor: '#8b95a8', fillColor: '#8b95a8', strokeWidth: 2, opacity: 1,
      });
      // Process
      items.push({
        id: generateId(), type: 'rect', x: cx - 80, y: 100, width: 160, height: 50,
        strokeColor: '#4fc3f7', fillColor: 'rgba(79,195,247,0.08)', strokeWidth: 1.5, opacity: 1,
      });
      items.push({
        id: generateId(), type: 'text', x: cx - 40, y: 115, text: 'Process',
        strokeColor: '#4fc3f7', fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 14,
      });
      // Arrow down
      items.push({
        id: generateId(), type: 'arrow', points: [cx, 150, cx, 180],
        strokeColor: '#8b95a8', fillColor: '#8b95a8', strokeWidth: 2, opacity: 1,
      });
      // Decision (diamond shape approximated with rotated rect - use circle for simplicity)
      items.push({
        id: generateId(), type: 'circle', x: cx, y: 220, radius: 40,
        strokeColor: '#f59e0b', fillColor: 'rgba(245,158,11,0.08)', strokeWidth: 2, opacity: 1,
      });
      items.push({
        id: generateId(), type: 'text', x: cx - 30, y: 213, text: 'Decision',
        strokeColor: '#f59e0b', fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 13,
      });
      // Yes branch
      items.push({
        id: generateId(), type: 'arrow', points: [cx - 40, 220, cx - 140, 220],
        strokeColor: '#00e5a0', fillColor: '#00e5a0', strokeWidth: 2, opacity: 1,
      });
      items.push({
        id: generateId(), type: 'text', x: cx - 110, y: 205, text: 'Yes',
        strokeColor: '#00e5a0', fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 12,
      });
      items.push({
        id: generateId(), type: 'rect', x: cx - 240, y: 200, width: 100, height: 40,
        strokeColor: '#00e5a0', fillColor: 'rgba(0,229,160,0.08)', strokeWidth: 1.5, opacity: 1,
      });
      items.push({
        id: generateId(), type: 'text', x: cx - 222, y: 211, text: 'Action A',
        strokeColor: '#00e5a0', fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 13,
      });
      // No branch
      items.push({
        id: generateId(), type: 'arrow', points: [cx + 40, 220, cx + 140, 220],
        strokeColor: '#ff5757', fillColor: '#ff5757', strokeWidth: 2, opacity: 1,
      });
      items.push({
        id: generateId(), type: 'text', x: cx + 80, y: 205, text: 'No',
        strokeColor: '#ff5757', fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 12,
      });
      items.push({
        id: generateId(), type: 'rect', x: cx + 140, y: 200, width: 100, height: 40,
        strokeColor: '#ff5757', fillColor: 'rgba(255,87,87,0.08)', strokeWidth: 1.5, opacity: 1,
      });
      items.push({
        id: generateId(), type: 'text', x: cx + 158, y: 211, text: 'Action B',
        strokeColor: '#ff5757', fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 13,
      });
      // End
      items.push({
        id: generateId(), type: 'arrow', points: [cx, 260, cx, 300],
        strokeColor: '#8b95a8', fillColor: '#8b95a8', strokeWidth: 2, opacity: 1,
      });
      items.push({
        id: generateId(), type: 'rect', x: cx - 60, y: 300, width: 120, height: 40,
        strokeColor: '#ec4899', fillColor: 'rgba(236,72,153,0.08)', strokeWidth: 2, opacity: 1,
      });
      items.push({
        id: generateId(), type: 'text', x: cx - 22, y: 311, text: 'End',
        strokeColor: '#ec4899', fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 14,
      });
      return items;
    })(),
  },
  // 6. Brainstorm
  {
    name: 'Brainstorm',
    icon: '💡',
    items: (() => {
      const items: DrawItem[] = [];
      // Central topic
      items.push({
        id: generateId(), type: 'circle', x: 400, y: 250, radius: 50,
        strokeColor: '#f59e0b', fillColor: 'rgba(245,158,11,0.1)', strokeWidth: 2, opacity: 1,
      });
      items.push({
        id: generateId(), type: 'text', x: 370, y: 243, text: 'Topic',
        strokeColor: '#f59e0b', fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 16,
      });
      // Scattered sticky notes
      const notePositions = [
        { x: 80, y: 60, text: 'Idea 1', color: STICKY_COLORS[0] },
        { x: 300, y: 50, text: 'Idea 2', color: STICKY_COLORS[1] },
        { x: 550, y: 70, text: 'Idea 3', color: STICKY_COLORS[2] },
        { x: 100, y: 300, text: 'Idea 4', color: STICKY_COLORS[3] },
        { x: 620, y: 280, text: 'Idea 5', color: STICKY_COLORS[4] },
        { x: 300, y: 380, text: 'Idea 6', color: STICKY_COLORS[5] },
      ];
      notePositions.forEach((n) => {
        items.push({
          id: generateId(), type: 'sticky',
          x: n.x, y: n.y, width: 140, height: 100,
          strokeColor: 'transparent', fillColor: 'transparent', strokeWidth: 1, opacity: 1,
          text: n.text, fontSize: 13,
          stickyColor: n.color.body, stickyFoldColor: n.color.fold, stickyTextColor: n.color.text,
        });
      });
      items.push({
        id: generateId(), type: 'text', x: 300, y: 10, text: 'Brainstorm Session',
        strokeColor: '#e8ecf4', fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 18,
      });
      return items;
    })(),
  },
  // 7. Weekly Planner
  {
    name: 'Weekly Planner',
    icon: '📅',
    items: (() => {
      const items: DrawItem[] = [];
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const colW = 100, startX = 20, startY = 50, rowH = 350;
      days.forEach((day, i) => {
        const x = startX + i * (colW + 6);
        // Header
        items.push({
          id: generateId(), type: 'rect', x, y: startY, width: colW, height: 30,
          strokeColor: '#4fc3f7', fillColor: 'rgba(79,195,247,0.1)', strokeWidth: 1.5, opacity: 1,
        });
        items.push({
          id: generateId(), type: 'text', x: x + colW / 2 - 14, y: startY + 7, text: day,
          strokeColor: '#4fc3f7', fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 13,
        });
        // Body
        items.push({
          id: generateId(), type: 'rect', x, y: startY + 30, width: colW, height: rowH - 30,
          strokeColor: 'rgba(255,255,255,0.08)', fillColor: 'rgba(0,0,0,0.15)', strokeWidth: 1, opacity: 1,
        });
      });
      items.push({
        id: generateId(), type: 'text', x: 300, y: 15, text: 'Weekly Planner',
        strokeColor: '#e8ecf4', fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 18,
      });
      return items;
    })(),
  },
  // 8. Medical Case Study
  {
    name: 'Medical Case Study',
    icon: '🏥',
    items: (() => {
      const items: DrawItem[] = [];
      const sections = [
        { x: 20, y: 50, w: 360, h: 120, label: 'Patient Information', color: '#00e5a0', subtext: 'Name, Age, Gender, DOB...' },
        { x: 400, y: 50, w: 360, h: 120, label: 'Chief Complaint', color: '#ff5757', subtext: 'Primary symptoms...' },
        { x: 20, y: 190, w: 360, h: 120, label: 'Symptoms & History', color: '#f59e0b', subtext: 'Onset, duration, severity...' },
        { x: 400, y: 190, w: 360, h: 120, label: 'Diagnosis', color: '#4fc3f7', subtext: 'Assessment findings...' },
        { x: 20, y: 330, w: 360, h: 120, label: 'Treatment Plan', color: '#8b5cf6', subtext: 'Medications, procedures...' },
        { x: 400, y: 330, w: 360, h: 120, label: 'Follow-up', color: '#ec4899', subtext: 'Next visit, monitoring...' },
      ];
      sections.forEach((s) => {
        items.push({
          id: generateId(), type: 'rect', x: s.x, y: s.y, width: s.w, height: s.h,
          strokeColor: s.color, fillColor: 'rgba(0,0,0,0.2)', strokeWidth: 2, opacity: 1,
        });
        items.push({
          id: generateId(), type: 'text', x: s.x + 12, y: s.y + 10, text: s.label,
          strokeColor: s.color, fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 15,
        });
        items.push({
          id: generateId(), type: 'text', x: s.x + 12, y: s.y + 35, text: s.subtext,
          strokeColor: '#5a6478', fillColor: 'transparent', strokeWidth: 1, opacity: 0.6, fontSize: 12,
        });
      });
      items.push({
        id: generateId(), type: 'text', x: 300, y: 15, text: 'Medical Case Study',
        strokeColor: '#e8ecf4', fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 18,
      });
      return items;
    })(),
  },
  // 9. Patient Vitals Tracker
  {
    name: 'Patient Vitals Tracker',
    icon: '❤️',
    items: (() => {
      const items: DrawItem[] = [];
      const vitals = [
        { label: 'Heart Rate', unit: 'bpm', color: '#ff5757', y: 60 },
        { label: 'Blood Pressure', unit: 'mmHg', color: '#4fc3f7', y: 140 },
        { label: 'Temperature', unit: '°F', color: '#f59e0b', y: 220 },
        { label: 'O2 Saturation', unit: '%', color: '#00e5a0', y: 300 },
        { label: 'Resp. Rate', unit: '/min', color: '#8b5cf6', y: 380 },
      ];
      vitals.forEach((v) => {
        // Label
        items.push({
          id: generateId(), type: 'rect', x: 20, y: v.y, width: 160, height: 55,
          strokeColor: v.color, fillColor: 'rgba(0,0,0,0.2)', strokeWidth: 1.5, opacity: 1,
        });
        items.push({
          id: generateId(), type: 'text', x: 30, y: v.y + 8, text: v.label,
          strokeColor: v.color, fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 14,
        });
        items.push({
          id: generateId(), type: 'text', x: 30, y: v.y + 30, text: `___ ${v.unit}`,
          strokeColor: '#5a6478', fillColor: 'transparent', strokeWidth: 1, opacity: 0.5, fontSize: 12,
        });
        // Tracking area
        items.push({
          id: generateId(), type: 'rect', x: 200, y: v.y, width: 560, height: 55,
          strokeColor: 'rgba(255,255,255,0.06)', fillColor: 'rgba(0,0,0,0.15)', strokeWidth: 1, opacity: 1,
        });
      });
      items.push({
        id: generateId(), type: 'text', x: 280, y: 15, text: 'Patient Vitals Tracker',
        strokeColor: '#e8ecf4', fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 18,
      });
      return items;
    })(),
  },
  // 10. Differential Diagnosis
  {
    name: 'Differential Diagnosis',
    icon: '🔍',
    items: (() => {
      const items: DrawItem[] = [];
      const cx = 400, cy = 260;
      // Central diagnosis
      items.push({
        id: generateId(), type: 'circle', x: cx, y: cy, radius: 65,
        strokeColor: '#ff5757', fillColor: 'rgba(255,87,87,0.08)', strokeWidth: 2.5, opacity: 1,
      });
      items.push({
        id: generateId(), type: 'text', x: cx - 55, y: cy - 18, text: 'Primary',
        strokeColor: '#ff5757', fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 14,
      });
      items.push({
        id: generateId(), type: 'text', x: cx - 55, y: cy + 2, text: 'Diagnosis',
        strokeColor: '#ff5757', fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 14,
      });
      // Branching possibilities
      const branches = [
        { label: 'DDx 1: Condition A', angle: -Math.PI / 2, color: '#f59e0b' },
        { label: 'DDx 2: Condition B', angle: -Math.PI / 5, color: '#4fc3f7' },
        { label: 'DDx 3: Condition C', angle: Math.PI / 5, color: '#00e5a0' },
        { label: 'DDx 4: Condition D', angle: Math.PI / 2, color: '#8b5cf6' },
        { label: 'DDx 5: Condition E', angle: Math.PI * 4 / 5, color: '#ec4899' },
        { label: 'DDx 6: Condition F', angle: -Math.PI * 4 / 5, color: '#fdcb6e' },
      ];
      branches.forEach((b) => {
        const ex = cx + Math.cos(b.angle) * 210;
        const ey = cy + Math.sin(b.angle) * 160;
        const rectW = 150, rectH = 40;
        // Line from center
        items.push({
          id: generateId(), type: 'line',
          points: [cx + Math.cos(b.angle) * 65, cy + Math.sin(b.angle) * 65, ex - Math.cos(b.angle) * (rectW / 2), ey],
          strokeColor: b.color, fillColor: 'transparent', strokeWidth: 1.5, opacity: 0.6, dash: [6, 4],
        });
        // Box
        items.push({
          id: generateId(), type: 'rect',
          x: ex - rectW / 2, y: ey - rectH / 2, width: rectW, height: rectH,
          strokeColor: b.color, fillColor: 'rgba(0,0,0,0.25)', strokeWidth: 1.5, opacity: 1,
        });
        items.push({
          id: generateId(), type: 'text',
          x: ex - rectW / 2 + 10, y: ey - 7, text: b.label,
          strokeColor: b.color, fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 12,
        });
      });
      items.push({
        id: generateId(), type: 'text', x: 280, y: 15, text: 'Differential Diagnosis',
        strokeColor: '#e8ecf4', fillColor: 'transparent', strokeWidth: 1, opacity: 1, fontSize: 18,
      });
      return items;
    })(),
  },
];

/* ══════════════════════════════════════════════════════════════ */
/* ── Shape Recognition Algorithm ──                             */
/* ══════════════════════════════════════════════════════════════ */

type RecognizedShape = 'circle' | 'rect' | 'triangle' | 'diamond' | 'arrow' | null;

interface ShapeRecognitionResult {
  shape: RecognizedShape;
  confidence: number; // 0..1
  drawItem: Partial<DrawItem>;
}

/**
 * Resample a points array [x1,y1,x2,y2,...] into N evenly-spaced points.
 */
function resamplePoints(pts: number[], numPoints: number = 64): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < pts.length - 1; i += 2) {
    points.push({ x: pts[i], y: pts[i + 1] });
  }
  if (points.length < 2) return points;

  // Calculate total path length
  let totalLen = 0;
  for (let i = 1; i < points.length; i++) {
    totalLen += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  }

  const interval = totalLen / (numPoints - 1);
  const resampled: { x: number; y: number }[] = [{ ...points[0] }];
  let accum = 0;

  for (let i = 1; i < points.length; i++) {
    const d = Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
    if (accum + d >= interval) {
      const ratio = (interval - accum) / d;
      const nx = points[i - 1].x + ratio * (points[i].x - points[i - 1].x);
      const ny = points[i - 1].y + ratio * (points[i].y - points[i - 1].y);
      resampled.push({ x: nx, y: ny });
      // Insert and re-process from this new point
      points.splice(i, 0, { x: nx, y: ny });
      accum = 0;
    } else {
      accum += d;
    }
    if (resampled.length >= numPoints) break;
  }

  // Pad if needed
  while (resampled.length < numPoints) {
    resampled.push({ ...resampled[resampled.length - 1] });
  }

  return resampled.slice(0, numPoints);
}

/**
 * Compute bounding box of points.
 */
function boundingBox(points: { x: number; y: number }[]): { minX: number; minY: number; maxX: number; maxY: number; cx: number; cy: number; w: number; h: number } {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  return { minX, minY, maxX, maxY, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2, w: maxX - minX, h: maxY - minY };
}

/**
 * Calculate path perimeter.
 */
function pathLength(points: { x: number; y: number }[]): number {
  let len = 0;
  for (let i = 1; i < points.length; i++) {
    len += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  }
  return len;
}

/**
 * Check how "closed" a path is: distance from last point to first point relative to bounding box diagonal.
 */
function closureRatio(points: { x: number; y: number }[]): number {
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
 */
function detectCorners(points: { x: number; y: number }[], angleThreshold: number = Math.PI / 3.5): number[] {
  if (points.length < 3) return [];
  const corners: number[] = [];

  // Calculate angles between consecutive segments
  const angles: number[] = [];
  for (let i = 1; i < points.length - 1; i++) {
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
  for (let i = 0; i < angles.length; i++) {
    if (angles[i] < angleThreshold) continue;
    let isPeak = true;
    for (let j = Math.max(0, i - minDist); j <= Math.min(angles.length - 1, i + minDist); j++) {
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
  const merged: number[] = [corners[0]];
  for (let i = 1; i < corners.length; i++) {
    if (corners[i] - merged[merged.length - 1] >= minDist) {
      merged.push(corners[i]);
    } else {
      // Keep the one with higher angle
      merged[merged.length - 1] = angles[corners[i] - 1] > angles[merged[merged.length - 1] - 1]
        ? corners[i]
        : merged[merged.length - 1];
    }
  }
  return merged;
}

/**
 * Check how circular a set of points is.
 * Returns a score 0..1 where 1 is a perfect circle.
 */
function circularityScore(points: { x: number; y: number }[]): number {
  if (points.length < 5) return 0;
  const bb = boundingBox(points);

  // Aspect ratio should be close to 1
  const aspectRatio = bb.w > 0 && bb.h > 0 ? Math.min(bb.w, bb.h) / Math.max(bb.w, bb.h) : 0;
  if (aspectRatio < 0.5) return 0;

  // Check distance from center — all points should be roughly same distance
  const distances = points.map(p => Math.hypot(p.x - bb.cx, p.y - bb.cy));
  const avgDist = distances.reduce((a, b) => a + b, 0) / distances.length;
  if (avgDist === 0) return 0;

  const variance = distances.reduce((a, d) => a + (d - avgDist) ** 2, 0) / distances.length;
  const stdDev = Math.sqrt(variance);
  const coefficientOfVariation = stdDev / avgDist;

  // A perfect circle would have CV = 0; we allow up to ~0.3
  const circScore = Math.max(0, 1 - coefficientOfVariation / 0.3);

  return circScore * aspectRatio;
}

/**
 * Check how rectangular a set of points is (4 corners, ~90 degree angles).
 */
function rectangularityScore(points: { x: number; y: number }[], corners: number[]): number {
  if (corners.length !== 4) return 0;
  if (points.length < 8) return 0;

  const bb = boundingBox(points);

  // Check that corners are roughly at the bounding box corners
  const bbCorners = [
    { x: bb.minX, y: bb.minY },
    { x: bb.maxX, y: bb.minY },
    { x: bb.maxX, y: bb.maxY },
    { x: bb.minX, y: bb.maxY },
  ];

  // Match each detected corner to nearest bbox corner
  let totalDist = 0;
  const usedBb = new Set<number>();
  for (const ci of corners) {
    const p = points[ci];
    let minD = Infinity;
    let minIdx = 0;
    for (let j = 0; j < 4; j++) {
      if (usedBb.has(j)) continue;
      const d = Math.hypot(p.x - bbCorners[j].x, p.y - bbCorners[j].y);
      if (d < minD) { minD = d; minIdx = j; }
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
 */
function triangularityScore(points: { x: number; y: number }[], corners: number[]): number {
  if (corners.length !== 3) return 0;
  if (points.length < 6) return 0;

  // Check that the area of the triangle formed by the 3 corners
  // is a significant fraction of the bounding box area
  const c0 = points[corners[0]];
  const c1 = points[corners[1]];
  const c2 = points[corners[2]];

  const triArea = Math.abs(
    (c0.x * (c1.y - c2.y) + c1.x * (c2.y - c0.y) + c2.x * (c0.y - c1.y)) / 2
  );
  const bbArea = Math.max(1, (boundingBox(points).w * boundingBox(points).h));

  const areaRatio = triArea / bbArea;
  // A perfect inscribed triangle covers ~0.5 of bbox area
  // Acceptable range: 0.25..0.7
  if (areaRatio < 0.2) return 0;
  return Math.min(1, areaRatio / 0.4);
}

/**
 * Check how diamond-like a set of points is (4 corners but rotated 45°).
 */
function diamondnessScore(points: { x: number; y: number }[], corners: number[]): number {
  if (corners.length !== 4) return 0;
  if (points.length < 8) return 0;

  const bb = boundingBox(points);

  // For a diamond, corners should be at midpoints of bbox sides
  const diamondCorners = [
    { x: bb.cx, y: bb.minY },   // top
    { x: bb.maxX, y: bb.cy },   // right
    { x: bb.cx, y: bb.maxY },   // bottom
    { x: bb.minX, y: bb.cy },   // left
  ];

  let totalDist = 0;
  const usedDc = new Set<number>();
  for (const ci of corners) {
    const p = points[ci];
    let minD = Infinity;
    let minIdx = 0;
    for (let j = 0; j < 4; j++) {
      if (usedDc.has(j)) continue;
      const d = Math.hypot(p.x - diamondCorners[j].x, p.y - diamondCorners[j].y);
      if (d < minD) { minD = d; minIdx = j; }
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
 */
function arrownessScore(points: { x: number; y: number }[]): number {
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
  for (const p of headPoints) {
    // Project onto perpendicular of shaft direction
    const lateral = Math.abs(
      (p.x - shaftPoints[0].x) * Math.sin(shaftAngle) -
      (p.y - shaftPoints[0].y) * Math.cos(shaftAngle)
    );
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
 */
function recognizeShape(rawPoints: number[]): ShapeRecognitionResult | null {
  // Need at least ~10 points to recognize anything
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < rawPoints.length - 1; i += 2) {
    points.push({ x: rawPoints[i], y: rawPoints[i + 1] });
  }
  if (points.length < 8) return null;

  const bb = boundingBox(points);

  // Too small to recognize
  if (bb.w < 20 && bb.h < 20) return null;

  const isClosed = closureRatio(points) > 0.65;
  const resampled = resamplePoints(rawPoints, 64);
  const corners = detectCorners(resampled);

  // Score each shape
  const scores: { shape: RecognizedShape; score: number; drawItem: Partial<DrawItem> }[] = [];

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
          fillColor: 'transparent',
        },
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
          fillColor: 'transparent',
        },
      });
    }
  }

  // Triangle: closed, 3 corners
  if (isClosed && corners.length >= 2) {
    const triScore = triangularityScore(resampled, corners.length === 3 ? corners : corners.slice(0, 3));
    if (triScore > 0.4) {
      // Build triangle as a line with 3 points forming a closed triangle
      const triCorners = (corners.length === 3 ? corners : corners.slice(0, 3)).map(i => resampled[i]);
      // Use the centroid of detected corners
      const triCx = triCorners.reduce((a, p) => a + p.x, 0) / triCorners.length;
      const triCy = triCorners.reduce((a, p) => a + p.y, 0) / triCorners.length;
      const triRadius = Math.max(...triCorners.map(p => Math.hypot(p.x - triCx, p.y - triCy)));
      // Equilateral triangle points
      const triPoints: number[] = [];
      for (let i = 0; i < 3; i++) {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 3;
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
          fillColor: 'transparent',
        },
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
          fillColor: 'transparent',
        },
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
          points: [points[0].x, points[0].y, points[points.length - 1].x, points[points.length - 1].y],
          fillColor: undefined,
        },
      });
    }
  }

  // Return the best scoring shape if above threshold
  if (scores.length === 0) return null;
  scores.sort((a, b) => b.score - a.score);
  const best = scores[0];
  if (best.score < 0.5) return null;

  return {
    shape: best.shape,
    confidence: Math.min(best.score, 1),
    drawItem: best.drawItem,
  };
}

/* ══════════════════════════════════════════════════════════════ */
/* ── Injected Styles ──                                         */
/* ══════════════════════════════════════════════════════════════ */

const CHAT_WB_STYLE_ID = 'chat-whiteboard-styles';

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

/* ══════════════════════════════════════════════════════════════ */
/* ── DrawItem Renderer ──                                       */
/* ══════════════════════════════════════════════════════════════ */

function RenderDrawItem({ item }: { item: DrawItem }) {
  const commonProps = {
    id: item.id,
    stroke: item.strokeColor,
    strokeWidth: item.strokeWidth,
    opacity: item.opacity,
  };

  switch (item.type) {
    case 'line':
    case 'freeform':
      return (
        <Line
          {...commonProps}
          points={item.points || []}
          fill={item.fillColor !== 'transparent' ? item.fillColor : undefined}
          lineCap="round"
          lineJoin="round"
          tension={item.type === 'freeform' ? 0.5 : 0}
          globalCompositeOperation={item.globalCompositeOperation}
          dash={item.aiGenerated ? [8, 4] : item.dash}
        />
      );
    case 'rect':
      return (
        <Group>
          <Rect
            {...commonProps}
            x={item.x || 0}
            y={item.y || 0}
            width={item.width || 0}
            height={item.height || 0}
            fill={item.fillColor !== 'transparent' ? item.fillColor : undefined}
            cornerRadius={2}
          />
          {/* AI-generated dashed border overlay */}
          {item.aiGenerated && (
            <Rect
              x={item.x || 0}
              y={item.y || 0}
              width={item.width || 0}
              height={item.height || 0}
              stroke="#8b5cf6"
              strokeWidth={1.5}
              dash={[6, 4]}
              cornerRadius={2}
              opacity={0.5}
              listening={false}
            />
          )}
          {/* AI-generated badge */}
          {item.aiGenerated && (
            <Group x={(item.x || 0) + 3} y={(item.y || 0) + 3}>
              <Rect width={18} height={14} fill="rgba(139,92,246,0.85)" cornerRadius={2} />
              <KonvaText text="AI" fontSize={8} fill="white" x={2} y={2} fontStyle="bold" listening={false} />
            </Group>
          )}
        </Group>
      );
    case 'circle':
      return (
        <Group>
          <Circle
            {...commonProps}
            x={item.x || 0}
            y={item.y || 0}
            radius={item.radius || 0}
            fill={item.fillColor !== 'transparent' ? item.fillColor : undefined}
          />
          {/* AI-generated dashed border overlay */}
          {item.aiGenerated && (
            <Circle
              x={item.x || 0}
              y={item.y || 0}
              radius={item.radius || 0}
              stroke="#8b5cf6"
              strokeWidth={1.5}
              dash={[6, 4]}
              opacity={0.5}
              listening={false}
            />
          )}
          {/* AI-generated badge */}
          {item.aiGenerated && (
            <Group x={(item.x || 0) - 8} y={(item.y || 0) - (item.radius || 0) - 14}>
              <Rect width={18} height={14} fill="rgba(139,92,246,0.85)" cornerRadius={2} />
              <KonvaText text="AI" fontSize={8} fill="white" x={2} y={2} fontStyle="bold" listening={false} />
            </Group>
          )}
        </Group>
      );
    case 'arrow':
      return (
        <KonvaArrow
          {...commonProps}
          points={item.points || []}
          fill={item.strokeColor}
          pointerLength={10}
          pointerWidth={8}
          lineCap="round"
          lineJoin="round"
          dash={item.aiGenerated ? [8, 4] : undefined}
        />
      );
    case 'text':
      return (
        <Group>
          <KonvaText
            id={item.id}
            x={item.x || 0}
            y={item.y || 0}
            text={item.text || ''}
            fontSize={item.fontSize || 18}
            fontFamily={item.fontFamily || 'Arial'}
            fill={item.strokeColor}
            opacity={item.opacity}
          />
          {/* AI-generated badge for text */}
          {item.aiGenerated && (
            <Group x={(item.x || 0) - 1} y={(item.y || 0) - 12}>
              <Rect width={14} height={10} fill="rgba(139,92,246,0.85)" cornerRadius={2} />
              <KonvaText text="AI" fontSize={6} fill="white" x={1} y={1} fontStyle="bold" listening={false} />
            </Group>
          )}
        </Group>
      );
    case 'diamond': {
      const cx = item.x || 0;
      const cy = item.y || 0;
      const hw = (item.width || 0) / 2;
      const hh = (item.height || 0) / 2;
      const diamondPath = `M ${cx} ${cy - hh} L ${cx + hw} ${cy} L ${cx} ${cy + hh} L ${cx - hw} ${cy} Z`;
      return (
        <Group>
          <Path
            {...commonProps}
            data={diamondPath}
            fill={item.fillColor !== 'transparent' ? item.fillColor : undefined}
          />
          {/* AI-generated dashed border overlay */}
          {item.aiGenerated && (
            <Path
              data={diamondPath}
              stroke="#8b5cf6"
              strokeWidth={1.5}
              dash={[6, 4]}
              opacity={0.5}
              listening={false}
            />
          )}
          {/* AI-generated badge */}
          {item.aiGenerated && (
            <Group x={cx - hw + 3} y={cy - hh + 3}>
              <Rect width={18} height={14} fill="rgba(139,92,246,0.85)" cornerRadius={2} />
              <KonvaText text="AI" fontSize={8} fill="white" x={2} y={2} fontStyle="bold" listening={false} />
            </Group>
          )}
        </Group>
      );
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

/* ══════════════════════════════════════════════════════════════ */
/* ── Connector Shape (Konva) ──                                 */
/* ══════════════════════════════════════════════════════════════ */

interface ConnectorShapeProps {
  item: DrawItem;
  allItems: DrawItem[];
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

function ConnectorShape({ item, allItems, isSelected, onSelect, onDelete }: ConnectorShapeProps) {
  const sourceItem = allItems.find(i => i.id === item.sourceId);
  const targetItem = allItems.find(i => i.id === item.targetId);

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
  const endAngle = points.length >= 4
    ? Math.atan2(points[points.length - 1] - points[points.length - 3], points[points.length - 2] - points[points.length - 4])
    : 0;
  const startAngle = points.length >= 4
    ? Math.atan2(points[1] - points[3], points[0] - points[2])
    : 0;

  // Build SVG path data for arrowheads
  const endArrowData = (arrowhead === 'end' || arrowhead === 'both') ? drawArrowhead(tp.x, tp.y, endAngle) : '';
  const startArrowData = (arrowhead === 'start' || arrowhead === 'both') ? drawArrowhead(sp.x, sp.y, startAngle) : '';

  return (
    <Group
      onClick={(e) => {
        e.cancelBubble = true;
        onSelect(item.id);
      }}
      onTap={(e) => {
        e.cancelBubble = true;
        onSelect(item.id);
      }}
    >
      {/* Invisible thick line for easier clicking */}
      <Line
        points={points}
        stroke="transparent"
        strokeWidth={14}
        lineCap="round"
        lineJoin="round"
        tension={style === 'curved' ? 0.5 : 0}
      />
      {/* Visible line */}
      <Line
        id={item.id}
        name="connector-line"
        points={points}
        stroke={isSelected ? '#00e5a0' : strokeColor}
        strokeWidth={isSelected ? 3 : 2}
        lineCap="round"
        lineJoin="round"
        tension={style === 'curved' ? 0.5 : 0}
        dash={item.aiGenerated ? [8, 4] : (item.dash || undefined)}
        opacity={0.85}
      />
      {/* Arrowheads */}
      {endArrowData && (
        <Path data={endArrowData} fill={isSelected ? '#00e5a0' : strokeColor} />
      )}
      {startArrowData && (
        <Path data={startArrowData} fill={isSelected ? '#00e5a0' : strokeColor} />
      )}
      {/* AI-generated badge on midpoint */}
      {item.aiGenerated && !isSelected && (() => {
        const midIdx = Math.floor(points.length / 2);
        const midX = midIdx % 2 === 0 ? points[midIdx] : (points[midIdx - 1] + points[midIdx + 1]) / 2;
        const midY = midIdx % 2 === 1 ? points[midIdx] : (points[midIdx - 1] + points[midIdx + 1]) / 2;
        // Fallback for simpler point arrays
        const bx = points.length >= 4 ? (points[0] + points[points.length - 2]) / 2 : 0;
        const by = points.length >= 4 ? (points[1] + points[points.length - 1]) / 2 : 0;
        return (
          <Group x={bx - 8} y={by - 6}>
            <Rect width={16} height={12} fill="rgba(139,92,246,0.85)" cornerRadius={2} />
            <KonvaText text="AI" fontSize={7} fill="white" x={1} y={1} fontStyle="bold" listening={false} />
          </Group>
        );
      })()}
      {/* Selection highlight */}
      {isSelected && (
        <Circle x={sp.x} y={sp.y} radius={5} fill="#00e5a0" />
      )}
      {isSelected && (
        <Circle x={tp.x} y={tp.y} radius={5} fill="#00e5a0" />
      )}
    </Group>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* ── Image Shape (Konva) ──                                     */
/* ══════════════════════════════════════════════════════════════ */

interface ImageShapeProps {
  item: DrawItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => void;
  onResizeEnd: (id: string, w: number, h: number) => void;
  onDelete: (id: string) => void;
}

function ImageShape({ item, isSelected, onSelect, onDragEnd, onResizeEnd, onDelete }: ImageShapeProps) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<Konva.Group>(null);

  useEffect(() => {
    if (!item.src) return;
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setImage(img);
    img.onerror = () => console.warn('Failed to load image:', item.src);
    img.src = item.src;
  }, [item.src]);

  const w = item.width || 200;
  const h = item.height || 150;
  const rot = item.rotation || 0;
  const origAspect = image ? image.width / image.height : 1;

  return (
    <Group
      ref={groupRef}
      x={item.x || 0}
      y={item.y || 0}
      rotation={rot}
      offsetX={0}
      offsetY={0}
      draggable
      onClick={(e) => { e.cancelBubble = true; onSelect(item.id); }}
      onTap={(e) => { e.cancelBubble = true; onSelect(item.id); }}
      onDragEnd={(e) => {
        e.cancelBubble = true;
        onDragEnd(item.id, e.target.x(), e.target.y());
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Shadow */}
      <Rect x={3} y={3} width={w} height={h} fill="rgba(0,0,0,0.3)" cornerRadius={4} />
      {/* Image */}
      {image && (
        <KonvaImage
          image={image}
          width={w}
          height={h}
          cornerRadius={4}
        />
      )}
      {/* Border */}
      <Rect
        width={w}
        height={h}
        stroke={isSelected ? '#00e5a0' : hovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}
        strokeWidth={isSelected ? 2 : 1}
        cornerRadius={4}
        listening={false}
      />
      {/* Resize handle (bottom-right) */}
      {isSelected && (
        <Group
          x={w - 6}
          y={h - 6}
          draggable
          onDragEnd={(e) => {
            e.cancelBubble = true;
            const dx = e.target.x();
            const dy = e.target.y();
            // Maintain aspect ratio
            const newW = Math.max(40, w + dx);
            const newH = newW / origAspect;
            onResizeEnd(item.id, newW, newH);
            e.target.position({ x: w - 6, y: h - 6 });
          }}
          onDragMove={(e) => {
            e.cancelBubble = true;
          }}
        >
          <Rect width={12} height={12} fill="transparent" />
          <Rect x={1} y={1} width={10} height={10} fill="#00e5a0" cornerRadius={2} opacity={0.9} />
        </Group>
      )}
      {/* Delete button */}
      {(isSelected || hovered) && (
        <Group
          x={w - 4}
          y={-12}
          onClick={(e) => { e.cancelBubble = true; onDelete(item.id); }}
          onTap={(e) => { e.cancelBubble = true; onDelete(item.id); }}
        >
          <Rect width={16} height={16} fill="rgba(255,87,87,0.85)" cornerRadius={3} />
          <KonvaText text="×" fontSize={12} fill="white" x={3} y={0} listening={false} />
        </Group>
      )}
      {/* Image type badge */}
      <Group x={4} y={4}>
        <Rect width={20} height={14} fill="rgba(0,0,0,0.6)" cornerRadius={2} />
        <KonvaText text="IMG" fontSize={7} fill="white" x={2} y={2} fontStyle="bold" listening={false} />
      </Group>
    </Group>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* ── File Card Shape (Konva) ──                                 */
/* ══════════════════════════════════════════════════════════════ */

interface FileCardShapeProps {
  item: DrawItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => void;
  onDelete: (id: string) => void;
}

function FileCardShape({ item, isSelected, onSelect, onDragEnd, onDelete }: FileCardShapeProps) {
  const [hovered, setHovered] = useState(false);
  const w = item.width || 200;
  const h = item.height || 80;
  const fileName = item.fileName || 'Unknown file';
  const fileSize = item.fileSize || 0;
  const fileType = item.fileType || '';
  const fileUrl = item.fileUrl || '#';

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = () => {
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

  return (
    <Group
      x={item.x || 0}
      y={item.y || 0}
      draggable
      onClick={(e) => { e.cancelBubble = true; onSelect(item.id); }}
      onTap={(e) => { e.cancelBubble = true; onSelect(item.id); }}
      onDragEnd={(e) => {
        e.cancelBubble = true;
        onDragEnd(item.id, e.target.x(), e.target.y());
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Shadow */}
      <Rect x={2} y={2} width={w} height={h} fill="rgba(0,0,0,0.2)" cornerRadius={8} />
      {/* Card background */}
      <Rect
        width={w}
        height={h}
        fill="rgba(30,33,44,0.95)"
        stroke={isSelected ? '#00e5a0' : hovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'}
        strokeWidth={isSelected ? 2 : 1}
        cornerRadius={8}
      />
      {/* File icon area */}
      <Rect x={8} y={12} width={44} height={44} fill="rgba(79,195,247,0.1)" cornerRadius={6} />
      <KonvaText text={getFileIcon()} fontSize={20} x={16} y={20} listening={false} />
      {/* File name */}
      <KonvaText
        text={fileName.length > 22 ? fileName.substring(0, 20) + '…' : fileName}
        fontSize={12}
        fill="#e8ecf4"
        fontStyle="bold"
        x={60}
        y={16}
        listening={false}
      />
      {/* File size & type */}
      <KonvaText
        text={`${formatSize(fileSize)} • ${fileType.split('/').pop()?.toUpperCase() || 'FILE'}`}
        fontSize={10}
        fill="#5a6478"
        x={60}
        y={34}
        listening={false}
      />
      {/* Download hint */}
      <KonvaText
        text="Click to download"
        fontSize={9}
        fill="#4fc3f7"
        x={60}
        y={52}
        listening={false}
      />
      {/* Delete button */}
      {(isSelected || hovered) && (
        <Group
          x={w - 4}
          y={-12}
          onClick={(e) => { e.cancelBubble = true; onDelete(item.id); }}
          onTap={(e) => { e.cancelBubble = true; onDelete(item.id); }}
        >
          <Rect width={16} height={16} fill="rgba(255,87,87,0.85)" cornerRadius={3} />
          <KonvaText text="×" fontSize={12} fill="white" x={3} y={0} listening={false} />
        </Group>
      )}
      {/* Clickable download area */}
      <Rect
        width={w}
        height={h}
        fill="transparent"
        onDblClick={(e) => {
          e.cancelBubble = true;
          if (fileUrl && fileUrl !== '#') {
            window.open(fileUrl, '_blank');
          }
        }}
        onDblTap={(e) => {
          e.cancelBubble = true;
          if (fileUrl && fileUrl !== '#') {
            window.open(fileUrl, '_blank');
          }
        }}
      />
    </Group>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* ── Link Card Shape (Konva) ──                                 */
/* ══════════════════════════════════════════════════════════════ */

interface LinkCardShapeProps {
  item: DrawItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => void;
  onDelete: (id: string) => void;
}

function LinkCardShape({ item, isSelected, onSelect, onDragEnd, onDelete }: LinkCardShapeProps) {
  const [hovered, setHovered] = useState(false);
  const [faviconImg, setFaviconImg] = useState<HTMLImageElement | null>(null);
  const w = item.width || 260;
  const h = item.height || 90;
  const title = item.linkTitle || item.linkUrl || 'Link';
  const description = item.linkDescription || '';
  const favicon = item.linkFavicon || '';
  const url = item.linkUrl || '';

  useEffect(() => {
    if (!favicon) return;
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setFaviconImg(img);
    img.onerror = () => {}; // ignore favicon load errors
    img.src = favicon;
  }, [favicon]);

  return (
    <Group
      x={item.x || 0}
      y={item.y || 0}
      draggable
      onClick={(e) => { e.cancelBubble = true; onSelect(item.id); }}
      onTap={(e) => { e.cancelBubble = true; onSelect(item.id); }}
      onDragEnd={(e) => {
        e.cancelBubble = true;
        onDragEnd(item.id, e.target.x(), e.target.y());
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Shadow */}
      <Rect x={2} y={2} width={w} height={h} fill="rgba(0,0,0,0.2)" cornerRadius={8} />
      {/* Card background */}
      <Rect
        width={w}
        height={h}
        fill="rgba(30,33,44,0.95)"
        stroke={isSelected ? '#00e5a0' : hovered ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.06)'}
        strokeWidth={isSelected ? 2 : 1}
        cornerRadius={8}
      />
      {/* Accent bar */}
      <Rect width={4} height={h} fill="#8b5cf6" cornerRadius={[8, 0, 0, 8]} />
      {/* Favicon */}
      {faviconImg ? (
        <KonvaImage image={faviconImg} x={14} y={10} width={20} height={20} />
      ) : (
        <Group x={14} y={10}>
          <Rect width={20} height={20} fill="rgba(139,92,246,0.15)" cornerRadius={4} />
          <KonvaText text="🔗" fontSize={11} x={3} y={2} listening={false} />
        </Group>
      )}
      {/* Title */}
      <KonvaText
        text={title.length > 35 ? title.substring(0, 33) + '…' : title}
        fontSize={12}
        fill="#e8ecf4"
        fontStyle="bold"
        x={42}
        y={12}
        width={w - 52}
        listening={false}
      />
      {/* Description */}
      {description && (
        <KonvaText
          text={description.length > 60 ? description.substring(0, 58) + '…' : description}
          fontSize={10}
          fill="#8b95a8"
          x={42}
          y={30}
          width={w - 52}
          listening={false}
        />
      )}
      {/* URL */}
      <KonvaText
        text={url.length > 45 ? url.substring(0, 43) + '…' : url}
        fontSize={9}
        fill="#4fc3f7"
        x={42}
        y={h - 24}
        width={w - 52}
        listening={false}
      />
      {/* External link indicator */}
      <Group x={w - 22} y={h - 22}>
        <Rect width={14} height={14} fill="rgba(79,195,247,0.1)" cornerRadius={3} />
        <KonvaText text="↗" fontSize={10} fill="#4fc3f7" x={2} y={0} listening={false} />
      </Group>
      {/* Delete button */}
      {(isSelected || hovered) && (
        <Group
          x={w - 4}
          y={-12}
          onClick={(e) => { e.cancelBubble = true; onDelete(item.id); }}
          onTap={(e) => { e.cancelBubble = true; onDelete(item.id); }}
        >
          <Rect width={16} height={16} fill="rgba(255,87,87,0.85)" cornerRadius={3} />
          <KonvaText text="×" fontSize={12} fill="white" x={3} y={0} listening={false} />
        </Group>
      )}
      {/* Double-click to open link */}
      <Rect
        width={w}
        height={h}
        fill="transparent"
        onDblClick={(e) => {
          e.cancelBubble = true;
          if (url) window.open(url, '_blank');
        }}
        onDblTap={(e) => {
          e.cancelBubble = true;
          if (url) window.open(url, '_blank');
        }}
      />
    </Group>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* ── Sticky Note Shape (Konva) ──                               */
/* ══════════════════════════════════════════════════════════════ */

interface StickyNoteShapeProps {
  item: DrawItem;
  isEditing: boolean;
  isSelected: boolean;
  onDragEnd: (id: string, x: number, y: number) => void;
  onDoubleClick: (id: string) => void;
  onDelete: (id: string) => void;
  onResizeStart: (id: string) => void;
  onSelect: (id: string) => void;
  /** If voting is active and this item is a candidate */
  voteCount?: number;
  isVotingCandidate?: boolean;
  hasLocalVote?: boolean;
  votingPhase?: VotingPhase;
  onCastVote?: (itemId: string) => void;
  voteRank?: number | null;
}

function StickyNoteShape({
  item,
  isEditing,
  isSelected,
  onDragEnd,
  onDoubleClick,
  onDelete,
  onResizeStart,
  onSelect,
  voteCount = 0,
  isVotingCandidate = false,
  hasLocalVote = false,
  votingPhase = 'idle',
  onCastVote,
  voteRank = null,
}: StickyNoteShapeProps) {
  const [hovered, setHovered] = useState(false);
  const FOLD = 18;
  const w = item.width || 180;
  const h = item.height || 160;

  return (
    <Group
      id={item.id}
      name="sticky-group"
      x={item.x || 0}
      y={item.y || 0}
      draggable
      onDragEnd={(e) => {
        e.cancelBubble = true;
        onDragEnd(item.id, e.target.x(), e.target.y());
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDblClick={(e) => {
        e.cancelBubble = true;
        onDoubleClick(item.id);
      }}
      onClick={(e) => {
        e.cancelBubble = true;
        onSelect(item.id);
      }}
      onTap={(e) => {
        e.cancelBubble = true;
        onSelect(item.id);
      }}
    >
      {/* Drop shadow */}
      <Rect
        x={4}
        y={4}
        width={w}
        height={h}
        fill="rgba(0,0,0,0.18)"
        cornerRadius={3}
        listening={false}
      />
      {/* Main body */}
      <Rect
        width={w}
        height={h}
        fill={item.stickyColor || '#FEF3C7'}
        cornerRadius={3}
      />
      {/* Folded corner - triangle */}
      <Line
        points={[w - FOLD, 0, w, 0, w, FOLD]}
        fill={item.stickyFoldColor || '#FDE68A'}
        closed
        listening={false}
      />
      {/* Fold shadow line */}
      <Line
        points={[w - FOLD, 0, w - FOLD + 5, FOLD - 5, w, FOLD]}
        stroke="rgba(0,0,0,0.08)"
        strokeWidth={1}
        listening={false}
      />
      {/* Text content */}
      {!isEditing && (
        <KonvaText
          x={14}
          y={14}
          width={w - 28}
          height={h - 28}
          text={item.text || 'Double-click to edit'}
          fontSize={item.fontSize || 14}
          fontFamily={item.fontFamily || 'Arial'}
          fill={item.stickyTextColor || '#92400E'}
          lineHeight={1.4}
          wrap="word"
          fontStyle={item.text ? 'normal' : 'italic'}
          opacity={item.text ? 1 : 0.45}
          listening={false}
        />
      )}
      {/* Selection border */}
      {isSelected && (
        <Rect
          width={w}
          height={h}
          stroke="#00e5a0"
          strokeWidth={2}
          dash={[6, 3]}
          cornerRadius={3}
          listening={false}
        />
      )}
      {/* AI-generated dashed border indicator */}
      {item.aiGenerated && !isSelected && (
        <Rect
          width={w}
          height={h}
          stroke="#8b5cf6"
          strokeWidth={1.5}
          dash={[6, 4]}
          cornerRadius={3}
          listening={false}
          opacity={0.5}
        />
      )}
      {/* AI-generated badge */}
      {item.aiGenerated && (
        <Group x={4} y={h - 18}>
          <Rect width={18} height={14} fill="rgba(139,92,246,0.85)" cornerRadius={2} />
          <KonvaText text="AI" fontSize={8} fill="white" x={2} y={2} fontStyle="bold" listening={false} />
        </Group>
      )}
      {/* Vote candidate highlight border */}
      {isVotingCandidate && votingPhase === 'active' && (
        <Rect
          width={w}
          height={h}
          stroke={hasLocalVote ? '#f59e0b' : '#fbbf24'}
          strokeWidth={hasLocalVote ? 3 : 2}
          dash={hasLocalVote ? undefined : [8, 4]}
          cornerRadius={3}
          listening={false}
          opacity={hasLocalVote ? 0.9 : 0.6}
        />
      )}
      {/* Vote dot badge (top-left) — shows count */}
      {isVotingCandidate && (votingPhase === 'active' || votingPhase === 'ended') && voteCount > 0 && (
        <Group x={-6} y={-6}>
          <Circle radius={12} fill={hasLocalVote ? '#f59e0b' : 'rgba(245,158,11,0.8)'} />
          <KonvaText text={`${voteCount}`} fontSize={10} fill="white" fontStyle="bold" x={voteCount >= 10 ? -6 : -3} y={-4} listening={false} />
        </Group>
      )}
      {/* Vote ranking indicator (ended phase) */}
      {votingPhase === 'ended' && voteRank !== null && voteRank <= 3 && (
        <Group x={w - 22} y={-8}>
          <Circle radius={10} fill={voteRank === 1 ? '#f59e0b' : voteRank === 2 ? '#94a3b8' : '#cd7f32'} />
          <KonvaText text={`${voteRank}`} fontSize={10} fill="white" fontStyle="bold" x={-3} y={-4} listening={false} />
        </Group>
      )}
      {/* Click to vote overlay (active voting only) */}
      {isVotingCandidate && votingPhase === 'active' && !hasLocalVote && (
        <Rect
          width={w}
          height={h}
          fill="transparent"
          onClick={(e) => {
            e.cancelBubble = true;
            onCastVote?.(item.id);
          }}
          onTap={(e) => {
            e.cancelBubble = true;
            onCastVote?.(item.id);
          }}
        />
      )}
      {/* Close button - visible on hover */}
      {hovered && !isEditing && (
        <Group
          x={w - 24}
          y={4}
          onClick={(e) => {
            e.cancelBubble = true;
            onDelete(item.id);
          }}
          onTap={(e) => {
            e.cancelBubble = true;
            onDelete(item.id);
          }}
        >
          <Circle radius={9} fill="rgba(0,0,0,0.18)" />
          <KonvaText
            text="✕"
            fontSize={11}
            fill="rgba(0,0,0,0.55)"
            x={-4}
            y={-5}
          />
        </Group>
      )}
      {/* Resize handle - bottom right, visible on hover */}
      {hovered && !isEditing && (
        <Group
          x={w - 14}
          y={h - 14}
          onMouseDown={(e) => {
            e.cancelBubble = true;
            onResizeStart(item.id);
          }}
          onTouchStart={(e) => {
            e.cancelBubble = true;
            onResizeStart(item.id);
          }}
        >
          <Rect width={14} height={14} fill="transparent" />
          {/* Diagonal resize icon */}
          <Line
            points={[4, 10, 10, 4]}
            stroke="rgba(0,0,0,0.25)"
            strokeWidth={2}
            lineCap="round"
          />
          <Line
            points={[7, 10, 10, 7]}
            stroke="rgba(0,0,0,0.25)"
            strokeWidth={2}
            lineCap="round"
          />
        </Group>
      )}
    </Group>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* ── Frame Shape (Konva) ──                                     */
/* ══════════════════════════════════════════════════════════════ */

interface FrameShapeProps {
  item: DrawItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => void;
  onDoubleClick: (id: string) => void;
  onDelete: (id: string) => void;
  onResizeEnd: (id: string, x: number, y: number, width: number, height: number) => void;
}

function FrameShape({ item, isSelected, onSelect, onDragEnd, onDoubleClick, onDelete, onResizeEnd }: FrameShapeProps) {
  const [hovered, setHovered] = useState(false);
  const w = item.width || 800;
  const h = item.height || 600;
  const title = item.frameTitle || 'Untitled Slide';
  const bgColor = item.frameBgColor || 'rgba(26,29,39,0.5)';

  const HANDLE_SIZE = 8;

  const handleResizeDragMove = useCallback((corner: string, e: Konva.KonvaEventObject<DragEvent>) => {
    e.cancelBubble = true;
    const node = e.target;
    const dx = node.x();
    const dy = node.y();

    let newX = item.x || 0;
    let newY = item.y || 0;
    let newW = w;
    let newH = h;

    switch (corner) {
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
    if (newW < 100) { newW = 100; if (corner === 'tl' || corner === 'bl') newX = (item.x || 0) + w - 100; }
    if (newH < 80) { newH = 80; if (corner === 'tl' || corner === 'tr') newY = (item.y || 0) + h - 80; }

    node.x(0);
    node.y(0);

    onResizeEnd(item.id, newX, newY, newW, newH);
  }, [item, w, h, onResizeEnd]);

  return (
    <Group
      id={item.id}
      name="frame-group"
      x={item.x || 0}
      y={item.y || 0}
      draggable
      onDragEnd={(e) => {
        e.cancelBubble = true;
        onDragEnd(item.id, e.target.x(), e.target.y());
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => {
        e.cancelBubble = true;
        onSelect(item.id);
      }}
      onTap={(e) => {
        e.cancelBubble = true;
        onSelect(item.id);
      }}
      onDblClick={(e) => {
        e.cancelBubble = true;
        onDoubleClick(item.id);
      }}
    >
      {/* Frame background */}
      <Rect
        width={w}
        height={h}
        fill={bgColor}
        cornerRadius={4}
      />
      {/* Dashed border */}
      <Rect
        width={w}
        height={h}
        stroke={isSelected ? '#00e5a0' : 'rgba(255,255,255,0.2)'}
        strokeWidth={isSelected ? 2 : 1.5}
        dash={[8, 4]}
        cornerRadius={4}
      />
      {/* Title label at top-left */}
      <Rect
        x={8}
        y={-22}
        height={20}
        width={Math.max(title.length * 8 + 16, 60)}
        fill={isSelected ? '#00e5a0' : 'rgba(255,255,255,0.1)'}
        cornerRadius={4}
      />
      <KonvaText
        x={14}
        y={-18}
        text={title}
        fontSize={11}
        fontFamily="Arial"
        fill={isSelected ? '#000' : '#8b95a8'}
        fontStyle="bold"
        listening={false}
      />
      {/* Notes indicator */}
      {item.frameNotes && (
        <Group x={w - 28} y={-20}>
          <Circle radius={8} fill="rgba(245,158,11,0.2)" stroke="#f59e0b" strokeWidth={1} />
          <KonvaText x={-4} y={-5} text="N" fontSize={10} fill="#f59e0b" fontStyle="bold" listening={false} />
        </Group>
      )}
      {/* Close button - visible on hover */}
      {hovered && (
        <Group
          x={w - 20}
          y={4}
          onClick={(e) => {
            e.cancelBubble = true;
            onDelete(item.id);
          }}
          onTap={(e) => {
            e.cancelBubble = true;
            onDelete(item.id);
          }}
        >
          <Circle radius={9} fill="rgba(255,87,87,0.2)" />
          <KonvaText text="✕" fontSize={11} fill="rgba(255,87,87,0.8)" x={-4} y={-5} />
        </Group>
      )}
      {/* Resize handles - visible on selection */}
      {isSelected && (
        <>
          {/* Top-left */}
          <Rect x={-HANDLE_SIZE/2} y={-HANDLE_SIZE/2} width={HANDLE_SIZE} height={HANDLE_SIZE} fill="#00e5a0" stroke="#fff" strokeWidth={1} cornerRadius={2} draggable onDragMove={(e) => handleResizeDragMove('tl', e)} onDragEnd={(e) => { e.cancelBubble = true; }} onMouseEnter={(e) => { const stage = e.target.getStage(); if (stage) stage.container().style.cursor = 'nwse-resize'; }} onMouseLeave={(e) => { const stage = e.target.getStage(); if (stage) stage.container().style.cursor = 'crosshair'; }} />
          {/* Top-right */}
          <Rect x={w - HANDLE_SIZE/2} y={-HANDLE_SIZE/2} width={HANDLE_SIZE} height={HANDLE_SIZE} fill="#00e5a0" stroke="#fff" strokeWidth={1} cornerRadius={2} draggable onDragMove={(e) => handleResizeDragMove('tr', e)} onDragEnd={(e) => { e.cancelBubble = true; }} onMouseEnter={(e) => { const stage = e.target.getStage(); if (stage) stage.container().style.cursor = 'nesw-resize'; }} onMouseLeave={(e) => { const stage = e.target.getStage(); if (stage) stage.container().style.cursor = 'crosshair'; }} />
          {/* Bottom-left */}
          <Rect x={-HANDLE_SIZE/2} y={h - HANDLE_SIZE/2} width={HANDLE_SIZE} height={HANDLE_SIZE} fill="#00e5a0" stroke="#fff" strokeWidth={1} cornerRadius={2} draggable onDragMove={(e) => handleResizeDragMove('bl', e)} onDragEnd={(e) => { e.cancelBubble = true; }} onMouseEnter={(e) => { const stage = e.target.getStage(); if (stage) stage.container().style.cursor = 'nesw-resize'; }} onMouseLeave={(e) => { const stage = e.target.getStage(); if (stage) stage.container().style.cursor = 'crosshair'; }} />
          {/* Bottom-right */}
          <Rect x={w - HANDLE_SIZE/2} y={h - HANDLE_SIZE/2} width={HANDLE_SIZE} height={HANDLE_SIZE} fill="#00e5a0" stroke="#fff" strokeWidth={1} cornerRadius={2} draggable onDragMove={(e) => handleResizeDragMove('br', e)} onDragEnd={(e) => { e.cancelBubble = true; }} onMouseEnter={(e) => { const stage = e.target.getStage(); if (stage) stage.container().style.cursor = 'nwse-resize'; }} onMouseLeave={(e) => { const stage = e.target.getStage(); if (stage) stage.container().style.cursor = 'crosshair'; }} />
        </>
      )}
    </Group>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* ── Anchor Points Overlay ──                                   */
/* ══════════════════════════════════════════════════════════════ */

function AnchorPointsOverlay({
  item,
  onAnchorClick,
}: {
  item: DrawItem;
  onAnchorClick: (itemId: string, anchor: AnchorPosition) => void;
}) {
  const anchors = getAnchorPoints(item);
  const anchorPositions: AnchorPosition[] = ['top', 'right', 'bottom', 'left'];
  return (
    <>
      {anchorPositions.map((pos) => {
        const pt = anchors[pos];
        if (!pt || (pt.x === 0 && pt.y === 0)) return null;
        return (
          <Circle
            key={`${item.id}-anchor-${pos}`}
            x={pt.x}
            y={pt.y}
            radius={6}
            fill="#00e5a0"
            stroke="#fff"
            strokeWidth={1.5}
            opacity={0.9}
            name={`anchor-${pos}`}
            onClick={(e) => {
              e.cancelBubble = true;
              onAnchorClick(item.id, pos);
            }}
            onTap={(e) => {
              e.cancelBubble = true;
              onAnchorClick(item.id, pos);
            }}
            onMouseEnter={(e) => {
              const stage = e.target.getStage();
              if (stage) stage.container().style.cursor = 'pointer';
            }}
            onMouseLeave={(e) => {
              const stage = e.target.getStage();
              if (stage) stage.container().style.cursor = 'crosshair';
            }}
          />
        );
      })}
    </>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* ── Template Panel ──                                          */
/* ══════════════════════════════════════════════════════════════ */

function TemplatePanel({
  open,
  onClose,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  onApply: (items: DrawItem[]) => void;
}) {
  if (!open) return null;

  return (
    <div
      className="absolute top-0 right-0 bottom-0 z-30 flex"
      style={{ pointerEvents: 'auto' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.4)' }}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className="relative ml-auto flex flex-col"
        style={{
          width: '320px',
          background: 'rgba(21,24,33,0.98)',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2">
            <LayoutTemplate className="w-4 h-4 text-[#00e5a0]" />
            <span className="text-sm font-semibold text-[#e8ecf4]">Templates</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/[0.06] transition-colors">
            <X className="w-4 h-4 text-[#8b95a8]" />
          </button>
        </div>

        {/* Grid of templates */}
        <div className="flex-1 overflow-y-auto chat-wb-scrollbar p-3">
          <div className="grid grid-cols-2 gap-3">
            {TEMPLATES.map((tpl, idx) => (
              <button
                key={idx}
                onClick={() => {
                  // Regenerate IDs for the template items
                  const newItems = tpl.items.map(item => ({ ...item, id: generateId() }));
                  onApply(newItems);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all hover:bg-white/[0.04] text-left"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {/* Mini preview */}
                <div
                  className="w-full rounded-md flex items-center justify-center"
                  style={{
                    background: CANVAS_BG,
                    height: '80px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <span style={{ fontSize: '32px', opacity: 0.7 }}>{tpl.icon}</span>
                </div>
                <span className="text-[11px] text-[#8b95a8] text-center leading-tight">{tpl.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="px-4 py-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="text-[10px] text-[#5a6478]">Clicking a template replaces the current canvas content.</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* ── Minimap Component ──                                       */
/* ══════════════════════════════════════════════════════════════ */

function Minimap({
  items,
  zoomLevel,
  stagePos,
  dimensions,
  onJumpTo,
}: {
  items: DrawItem[];
  zoomLevel: number;
  stagePos: { x: number; y: number };
  dimensions: { width: number; height: number };
  onJumpTo: (worldX: number, worldY: number) => void;
}) {
  const minimapW = 180;
  const minimapH = 120;
  const minimapRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const minimapBg = resolvedTheme === 'light' ? 'rgba(248, 250, 252, 0.95)' : 'rgba(26,29,39,0.9)';

  // Calculate content bounds
  const bounds = useMemo(() => {
    let minX = -100, minY = -100, maxX = dimensions.width + 100, maxY = dimensions.height + 100;
    items.forEach(item => {
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
        for (let i = 0; i < pts.length; i += 2) {
          minX = Math.min(minX, pts[i]);
          minY = Math.min(minY, pts[i + 1]);
          maxX = Math.max(maxX, pts[i]);
          maxY = Math.max(maxY, pts[i + 1]);
        }
      }
    });
    return { minX, minY, maxX, maxY };
  }, [items, dimensions]);

  // Scale factors
  const contentW = bounds.maxX - bounds.minX || 1;
  const contentH = bounds.maxY - bounds.minY || 1;
  const scale = Math.min(minimapW / contentW, minimapH / contentH);

  // Draw minimap
  useEffect(() => {
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

    const toMiniX = (wx: number) => (wx - bounds.minX) * scale + offsetX;
    const toMiniY = (wy: number) => (wy - bounds.minY) * scale + offsetY;

    // Draw items as simple shapes
    items.forEach(item => {
      ctx.save();
      if (item.type === 'frame') {
        // Frames drawn as dashed outlines in minimap
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 2]);
        ctx.strokeRect(toMiniX(item.x || 0), toMiniY(item.y || 0), (item.width || 0) * scale, (item.height || 0) * scale);
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(139,92,246,0.08)';
        ctx.fillRect(toMiniX(item.x || 0), toMiniY(item.y || 0), (item.width || 0) * scale, (item.height || 0) * scale);
      } else if (item.type === 'sticky' || item.type === 'rect') {
        ctx.fillStyle = item.type === 'sticky' ? (item.stickyColor || '#FEF3C7') : (item.fillColor !== 'transparent' ? item.fillColor : 'rgba(255,255,255,0.1)');
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
          for (let i = 2; i < pts.length; i += 2) {
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
  }, [items, zoomLevel, stagePos, dimensions, bounds, contentW, contentH, scale, minimapBg]);

  // Click to jump
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
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

  return (
    <canvas
      ref={minimapRef}
      width={minimapW}
      height={minimapH}
      onClick={handleClick}
      style={{
        position: 'absolute',
        bottom: 8,
        right: 8,
        width: minimapW,
        height: minimapH,
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '6px',
        cursor: 'pointer',
        zIndex: 20,
        background: 'rgba(26,29,39,0.95)',
      }}
      title="Click to jump to location"
    />
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* ── Remote Cursor Shape (Konva) ──                             */
/* ══════════════════════════════════════════════════════════════ */

const CURSOR_ARROW_PATH = 'M 0 0 L 0 18 L 5 14 L 9 22 L 12 20 L 8 12 L 14 12 Z';

/** Small tool-icon shapes for remote cursor badges */
const TOOL_BADGE_PATHS: Record<ToolType, string> = {
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
  frame: 'M 2 3 L 10 3 L 10 11 L 2 11 Z M 4 1 L 8 1',
};

function RemoteCursorShape({ cursor }: { cursor: RemoteCursor }) {
  const name = cursor.userName || 'User';
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const color = cursor.color || '#4fc3f7';

  return (
    <Group x={cursor.x} y={cursor.y}>
      {/* Cursor arrow pointer */}
      <Path
        data={CURSOR_ARROW_PATH}
        fill={color}
        stroke="rgba(0,0,0,0.4)"
        strokeWidth={0.5}
      />
      {/* Name label background */}
      <Rect
        x={14}
        y={10}
        width={Math.max(name.length * 7 + 12, 38)}
        height={18}
        fill={color}
        cornerRadius={3}
        stroke="rgba(0,0,0,0.2)"
        strokeWidth={0.5}
      />
      {/* Name text */}
      <KonvaText
        x={17}
        y={12}
        text={name}
        fontSize={10}
        fontFamily="Arial"
        fill="#000000"
        fontStyle="bold"
        listening={false}
      />
      {/* Tool badge - small icon next to cursor */}
      <Group x={1} y={18}>
        <Circle
          radius={8}
          fill={color}
          stroke="rgba(0,0,0,0.3)"
          strokeWidth={0.5}
          opacity={0.9}
        />
        <Path
          data={TOOL_BADGE_PATHS[cursor.tool] || TOOL_BADGE_PATHS.pen}
          fill="#000000"
          opacity={0.7}
          scale={{ x: 0.7, y: 0.7 }}
          x={-5}
          y={-5}
          listening={false}
        />
      </Group>
    </Group>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* ── Laser Pointer Shape (Konva) ──                             */
/* ══════════════════════════════════════════════════════════════ */

const LASER_TRAIL_LIFETIME = 1500; // ms before a trail point fully fades
const LASER_DOT_RADIUS = 6;
const LASER_GLOW_RADIUS = 18;
const LASER_TRAIL_MAX_POINTS = 60;

/** Render a single laser pointer with pulsing dot, glow, and fading trail */
function LaserPointerShape({
  points,
  color = '#ff5757',
  name,
}: {
  points: LaserTrailPoint[];
  color?: string;
  name?: string;
}) {
  const now = Date.now();
  // Filter out expired trail points
  const livePoints = points.filter(p => now - p.timestamp < LASER_TRAIL_LIFETIME);
  if (livePoints.length === 0) return null;

  const latest = livePoints[livePoints.length - 1];

  return (
    <Group>
      {/* Fading trail dots */}
      {livePoints.map((p, i) => {
        const age = now - p.timestamp;
        const progress = age / LASER_TRAIL_LIFETIME; // 0 → 1
        const opacity = Math.max(0, 1 - progress) * 0.6;
        const radius = Math.max(1, LASER_DOT_RADIUS * 0.5 * (1 - progress * 0.6));
        // Trail color shifts from the laser color toward orange/yellow as it fades
        const trailColor = i === livePoints.length - 1 ? color : blendTrailColor(color, progress);
        return (
          <Circle
            key={`trail-${i}-${p.timestamp}`}
            x={p.x}
            y={p.y}
            radius={radius}
            fill={trailColor}
            opacity={opacity}
            listening={false}
          />
        );
      })}
      {/* Outer glow ring */}
      <Circle
        x={latest.x}
        y={latest.y}
        radius={LASER_GLOW_RADIUS}
        fill={color}
        opacity={0.15}
        listening={false}
      />
      {/* Middle glow */}
      <Circle
        x={latest.x}
        y={latest.y}
        radius={LASER_DOT_RADIUS + 4}
        fill={color}
        opacity={0.3}
        listening={false}
      />
      {/* Bright center dot */}
      <Circle
        x={latest.x}
        y={latest.y}
        radius={LASER_DOT_RADIUS}
        fill={color}
        opacity={1}
        listening={false}
      />
      {/* Inner white core */}
      <Circle
        x={latest.x}
        y={latest.y}
        radius={LASER_DOT_RADIUS * 0.4}
        fill="#ffffff"
        opacity={0.85}
        listening={false}
      />
      {/* Name label (for remote users) */}
      {name && (
        <>
          <Rect
            x={latest.x + 14}
            y={latest.y - 8}
            width={Math.max(name.length * 7 + 12, 38)}
            height={16}
            fill={color}
            cornerRadius={3}
            opacity={0.85}
          />
          <KonvaText
            x={latest.x + 17}
            y={latest.y - 6}
            text={name}
            fontSize={9}
            fontFamily="Arial"
            fill="#ffffff"
            fontStyle="bold"
            listening={false}
          />
        </>
      )}
    </Group>
  );
}

/** Blend a hex color toward orange as it fades, for the trail effect */
function blendTrailColor(hexColor: string, progress: number): string {
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

/* ══════════════════════════════════════════════════════════════ */
/* ── Vote Config Modal ──                                       */
/* ══════════════════════════════════════════════════════════════ */

interface VoteConfigModalProps {
  items: DrawItem[];
  onStart: (config: VoteConfig) => void;
  onClose: () => void;
}

function VoteConfigModal({ items, onStart, onClose }: VoteConfigModalProps) {
  const [title, setTitle] = useState('Team Vote');
  const [votesPerUser, setVotesPerUser] = useState(3);
  const [timeLimit, setTimeLimit] = useState(0); // 0 = no limit
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Only show voteable items: sticky, rect, circle, text
  const voteableItems = useMemo(() =>
    items.filter(i => ['sticky', 'rect', 'circle', 'diamond', 'image', 'file', 'link', 'text'].includes(i.type)),
    [items]
  );

  const toggleItem = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelectedIds(new Set(voteableItems.map(i => i.id)));
  const deselectAll = () => setSelectedIds(new Set());

  const handleStart = () => {
    if (!title.trim()) { toast.error('Please enter a vote title.'); return; }
    if (selectedIds.size < 2) { toast.error('Select at least 2 items to vote on.'); return; }
    onStart({
      id: `vote_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      title: title.trim(),
      votesPerUser: Math.max(1, votesPerUser),
      timeLimitSeconds: Math.max(0, timeLimit),
      candidateItemIds: Array.from(selectedIds),
      createdBy: 'local',
      createdAt: Date.now(),
    });
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-40" style={{ background: 'rgba(0,0,0,0.55)' }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="rounded-xl p-5 w-[520px] max-w-[92vw] max-h-[80vh] flex flex-col" style={{ background: 'rgba(26,29,39,0.98)', border: '1px solid rgba(245,158,11,0.25)', boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(245,158,11,0.08)' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Vote className="w-5 h-5 text-[#f59e0b]" />
            <span className="text-sm font-semibold text-[#e8ecf4]">Start a Vote</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-white/[0.06] transition-colors"><X className="w-4 h-4 text-[#8b95a8]" /></button>
        </div>

        {/* Title */}
        <div className="mb-3">
          <label className="text-[11px] text-[#5a6478] mb-1 block">Vote Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-[rgba(0,0,0,0.3)] border border-white/10 rounded-lg px-3 py-2 text-sm text-[#e8ecf4] outline-none focus:border-[#f59e0b]/40" placeholder="e.g., Prioritize Ideas" />
        </div>

        {/* Votes per user */}
        <div className="flex gap-4 mb-3">
          <div className="flex-1">
            <label className="text-[11px] text-[#5a6478] mb-1 block">Votes per Person</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 5].map(n => (
                <button key={n} onClick={() => setVotesPerUser(n)} className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${votesPerUser === n ? 'ring-1 ring-[#f59e0b] text-[#f59e0b]' : 'text-[#8b95a8]'}`} style={{ background: votesPerUser === n ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.04)' }}>{n}</button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <label className="text-[11px] text-[#5a6478] mb-1 block">Time Limit (seconds)</label>
            <div className="flex items-center gap-2">
              {[0, 30, 60, 120].map(n => (
                <button key={n} onClick={() => setTimeLimit(n)} className={`px-2.5 h-9 rounded-lg text-xs font-medium transition-all ${timeLimit === n ? 'ring-1 ring-[#f59e0b] text-[#f59e0b]' : 'text-[#8b95a8]'}`} style={{ background: timeLimit === n ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.04)' }}>{n === 0 ? 'None' : `${n}s`}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Item selection */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[11px] text-[#5a6478]">Items to Vote On ({selectedIds.size} selected)</label>
            <div className="flex gap-1.5">
              <button onClick={selectAll} className="text-[10px] text-[#4fc3f7] hover:underline">All</button>
              <button onClick={deselectAll} className="text-[10px] text-[#ff5757] hover:underline">None</button>
            </div>
          </div>
          <div className="flex flex-col gap-1 max-h-[200px] overflow-y-auto chat-wb-scrollbar pr-1">
            {voteableItems.length === 0 && (
              <div className="text-[11px] text-[#5a6478] py-4 text-center">No voteable items on canvas. Add sticky notes or shapes first.</div>
            )}
            {voteableItems.map(item => {
              const isSelected = selectedIds.has(item.id);
              const label = item.type === 'sticky' ? (item.text || 'Empty note') : item.type === 'text' ? (item.text || 'Text') : item.type === 'rect' ? `Rectangle` : `Circle`;
              return (
                <button key={item.id} onClick={() => toggleItem(item.id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all ${isSelected ? 'ring-1 ring-[#f59e0b]' : ''}`} style={{ background: isSelected ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.02)' }}>
                  <div className={`w-4 h-4 rounded flex items-center justify-center ${isSelected ? 'bg-[#f59e0b]' : 'border border-white/15'}`}>
                    {isSelected && <Check className="w-3 h-3 text-black" />}
                  </div>
                  <span className="text-xs text-[#e8ecf4] truncate flex-1">{label}</span>
                  <span className="text-[9px] text-[#5a6478]">{item.type}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] text-[#5a6478]">{selectedIds.size} items selected, {votesPerUser} vote{votesPerUser > 1 ? 's' : ''} each{timeLimit > 0 ? `, ${timeLimit}s limit` : ''}</span>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#8b95a8] hover:bg-white/[0.06] transition-colors">Cancel</button>
            <button onClick={handleStart} disabled={selectedIds.size < 2 || !title.trim()} className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed" style={{ background: 'rgba(245,158,11,0.2)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }}>
              <ThumbsUp className="w-3.5 h-3.5" /> Start Vote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* ── PDF Export Dialog ──                                        */
/* ══════════════════════════════════════════════════════════════ */

const PDF_PAGE_SIZES: Record<PdfPageSize, { label: string; w: number; h: number }> = {
  a4: { label: 'A4 (210 × 297 mm)', w: 595, h: 842 },
  letter: { label: 'Letter (8.5 × 11 in)', w: 612, h: 792 },
  custom: { label: 'Custom', w: 800, h: 600 },
};

function ExportPdfDialog({
  open,
  onClose,
  onExport,
  frameCount,
  itemCount,
  exporting,
  progress,
}: {
  open: boolean;
  onClose: () => void;
  onExport: (config: PdfExportConfig) => void;
  frameCount: number;
  itemCount: number;
  exporting: boolean;
  progress: number;
}) {
  const [config, setConfig] = useState<PdfExportConfig>({
    pageSize: 'a4',
    orientation: 'landscape',
    customWidth: 800,
    customHeight: 600,
    includeGrid: false,
    framesAsPages: true,
    margin: 20,
    quality: 'vector',
  });

  if (!open) return null;

  const pageDim = config.pageSize === 'custom'
    ? { w: config.customWidth, h: config.customHeight }
    : PDF_PAGE_SIZES[config.pageSize];
  const effectiveW = config.orientation === 'landscape' ? Math.max(pageDim.w, pageDim.h) : pageDim.w;
  const effectiveH = config.orientation === 'landscape' ? Math.min(pageDim.w, pageDim.h) : pageDim.h;

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (!exporting && e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="rounded-2xl shadow-2xl w-[440px] max-h-[90vh] overflow-y-auto chat-wb-scrollbar"
        style={{
          background: 'rgba(21,24,33,0.99)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(79,195,247,0.15)' }}>
              <FileOutput className="w-4.5 h-4.5 text-[#4fc3f7]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#e8ecf4]">Export as PDF</h3>
              <p className="text-[10px] text-[#5a6478]">{itemCount} items • {frameCount} frame{frameCount !== 1 ? 's' : ''}</p>
            </div>
          </div>
          {!exporting && (
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors">
              <X className="w-4 h-4 text-[#5a6478]" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          {/* Page Size */}
          <div>
            <label className="text-[11px] font-semibold text-[#8b95a8] uppercase tracking-wider block mb-2">Page Size</label>
            <div className="flex gap-2">
              {(['a4', 'letter', 'custom'] as PdfPageSize[]).map(sz => (
                <button
                  key={sz}
                  onClick={() => setConfig(c => ({ ...c, pageSize: sz }))}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    config.pageSize === sz ? 'ring-1 ring-[#4fc3f7]' : ''
                  }`}
                  style={{
                    background: config.pageSize === sz ? 'rgba(79,195,247,0.12)' : 'rgba(255,255,255,0.03)',
                    color: config.pageSize === sz ? '#4fc3f7' : '#8b95a8',
                    border: `1px solid ${config.pageSize === sz ? 'rgba(79,195,247,0.2)' : 'rgba(255,255,255,0.06)'}`,
                  }}
                >
                  {PDF_PAGE_SIZES[sz].label.split(' (')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Custom size inputs */}
          {config.pageSize === 'custom' && (
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-[10px] text-[#5a6478] block mb-1">Width (px)</label>
                <input
                  type="number"
                  value={config.customWidth}
                  onChange={e => setConfig(c => ({ ...c, customWidth: Math.max(200, parseInt(e.target.value) || 200) }))}
                  className="w-full px-2.5 py-1.5 rounded-lg text-xs outline-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--medq-text, #e8ecf4)' }}
                />
              </div>
              <div className="flex-1">
                <label className="text-[10px] text-[#5a6478] block mb-1">Height (px)</label>
                <input
                  type="number"
                  value={config.customHeight}
                  onChange={e => setConfig(c => ({ ...c, customHeight: Math.max(200, parseInt(e.target.value) || 200) }))}
                  className="w-full px-2.5 py-1.5 rounded-lg text-xs outline-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--medq-text, #e8ecf4)' }}
                />
              </div>
            </div>
          )}

          {/* Orientation */}
          <div>
            <label className="text-[11px] font-semibold text-[#8b95a8] uppercase tracking-wider block mb-2">Orientation</label>
            <div className="flex gap-2">
              {(['portrait', 'landscape'] as PdfOrientation[]).map(o => (
                <button
                  key={o}
                  onClick={() => setConfig(c => ({ ...c, orientation: o }))}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    config.orientation === o ? 'ring-1 ring-[#4fc3f7]' : ''
                  }`}
                  style={{
                    background: config.orientation === o ? 'rgba(79,195,247,0.12)' : 'rgba(255,255,255,0.03)',
                    color: config.orientation === o ? '#4fc3f7' : '#8b95a8',
                    border: `1px solid ${config.orientation === o ? 'rgba(79,195,247,0.2)' : 'rgba(255,255,255,0.06)'}`,
                  }}
                >
                  {o === 'portrait' ? (
                    <div className="w-4 h-5 rounded-sm border-2 border-current" />
                  ) : (
                    <div className="w-5 h-4 rounded-sm border-2 border-current" />
                  )}
                  {o.charAt(0).toUpperCase() + o.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Export Quality */}
          <div>
            <label className="text-[11px] font-semibold text-[#8b95a8] uppercase tracking-wider block mb-2">Export Quality</label>
            <div className="flex gap-2">
              <button
                onClick={() => setConfig(c => ({ ...c, quality: 'vector' }))}
                className={`flex-1 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${
                  config.quality === 'vector' ? 'ring-1 ring-[#00e5a0]' : ''
                }`}
                style={{
                  background: config.quality === 'vector' ? 'rgba(0,229,160,0.08)' : 'rgba(255,255,255,0.03)',
                  color: config.quality === 'vector' ? '#00e5a0' : '#8b95a8',
                  border: `1px solid ${config.quality === 'vector' ? 'rgba(0,229,160,0.2)' : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                <div className="font-bold">Vector</div>
                <div className="text-[9px] opacity-70 mt-0.5">Crisp text & shapes at any scale</div>
              </button>
              <button
                onClick={() => setConfig(c => ({ ...c, quality: 'raster' }))}
                className={`flex-1 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${
                  config.quality === 'raster' ? 'ring-1 ring-[#f59e0b]' : ''
                }`}
                style={{
                  background: config.quality === 'raster' ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.03)',
                  color: config.quality === 'raster' ? '#f59e0b' : '#8b95a8',
                  border: `1px solid ${config.quality === 'raster' ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                <div className="font-bold">Raster</div>
                <div className="text-[9px] opacity-70 mt-0.5">Screenshot-based, faster export</div>
              </button>
            </div>
          </div>

          {/* Frames as Pages */}
          {frameCount > 0 && (
            <div className="flex items-center justify-between py-1">
              <div>
                <div className="text-xs font-medium text-[#e8ecf4]">Frames as Pages</div>
                <div className="text-[10px] text-[#5a6478]">Each frame becomes a separate page</div>
              </div>
              <button
                onClick={() => setConfig(c => ({ ...c, framesAsPages: !c.framesAsPages }))}
                className="p-0.5"
              >
                {config.framesAsPages ? (
                  <ToggleRight className="w-8 h-5 text-[#00e5a0]" />
                ) : (
                  <ToggleLeft className="w-8 h-5 text-[#5a6478]" />
                )}
              </button>
            </div>
          )}

          {/* Include Grid */}
          <div className="flex items-center justify-between py-1">
            <div>
              <div className="text-xs font-medium text-[#e8ecf4]">Include Grid</div>
              <div className="text-[10px] text-[#5a6478]">Draw dot grid on each page</div>
            </div>
            <button
              onClick={() => setConfig(c => ({ ...c, includeGrid: !c.includeGrid }))}
              className="p-0.5"
            >
              {config.includeGrid ? (
                <ToggleRight className="w-8 h-5 text-[#00e5a0]" />
              ) : (
                <ToggleLeft className="w-8 h-5 text-[#5a6478]" />
              )}
            </button>
          </div>

          {/* Margin */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-semibold text-[#8b95a8] uppercase tracking-wider">Margin</label>
              <span className="text-xs text-[#e8ecf4] font-mono">{config.margin}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={60}
              step={5}
              value={config.margin}
              onChange={e => setConfig(c => ({ ...c, margin: parseInt(e.target.value) }))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            />
            <div className="flex justify-between text-[9px] text-[#5a6478] mt-1">
              <span>0px</span>
              <span>30px</span>
              <span>60px</span>
            </div>
          </div>

          {/* Preview */}
          <div
            className="rounded-lg p-3"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
          >
            <div className="text-[10px] text-[#5a6478] mb-2">Preview</div>
            <div className="flex justify-center">
              <div
                className="rounded border-2 border-dashed relative"
                style={{
                  width: Math.min(160, effectiveW / 5),
                  height: Math.min(120, effectiveH / 5),
                  borderColor: 'rgba(79,195,247,0.3)',
                  background: 'white',
                }}
              >
                {/* Margin area */}
                <div
                  className="absolute rounded-sm"
                  style={{
                    top: config.margin / 5,
                    left: config.margin / 5,
                    right: config.margin / 5,
                    bottom: config.margin / 5,
                    border: '1px solid rgba(79,195,247,0.15)',
                  }}
                />
                {config.includeGrid && (
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.3) 1px, transparent 1px)',
                    backgroundSize: '8px 8px',
                  }} />
                )}
              </div>
            </div>
            <div className="text-[9px] text-[#5a6478] text-center mt-2">
              {effectiveW} × {effectiveH} pt • {config.orientation}
            </div>
          </div>
        </div>

        {/* Progress */}
        {exporting && (
          <div className="px-5 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Loader2 className="w-3.5 h-3.5 text-[#4fc3f7] animate-spin" />
              <span className="text-xs text-[#4fc3f7] font-medium">Exporting... {Math.round(progress)}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #4fc3f7, #00e5a0)' }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button
            onClick={onClose}
            disabled={exporting}
            className="px-4 py-2 rounded-lg text-xs font-medium text-[#8b95a8] hover:bg-white/[0.06] transition-colors disabled:opacity-40"
          >
            Cancel
          </button>
          <button
            onClick={() => onExport(config)}
            disabled={exporting}
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: 'rgba(79,195,247,0.2)',
              color: '#4fc3f7',
              border: '1px solid rgba(79,195,247,0.3)',
            }}
          >
            {exporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── PDF vector rendering helpers ── */

function getItemBounds(item: DrawItem): { x: number; y: number; w: number; h: number } | null {
  switch (item.type) {
    case 'rect': case 'sticky': case 'frame': case 'image': case 'file': case 'link':
      return { x: item.x || 0, y: item.y || 0, w: item.width || 0, h: item.height || 0 };
    case 'circle': {
      const r = item.radius || 0;
      return { x: (item.x || 0) - r, y: (item.y || 0) - r, w: r * 2, h: r * 2 };
    }
    case 'diamond': {
      const hw = (item.width || 80) / 2, hh = (item.height || 80) / 2;
      return { x: (item.x || 0) - hw, y: (item.y || 0) - hh, w: item.width || 80, h: item.height || 80 };
    }
    case 'text':
      return { x: item.x || 0, y: item.y || 0, w: (item.text || '').length * (item.fontSize || 18) * 0.55, h: (item.fontSize || 18) * 1.2 };
    case 'line': case 'freeform': case 'arrow': {
      const pts = item.points || [];
      if (pts.length < 4) return null;
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (let i = 0; i < pts.length; i += 2) {
        minX = Math.min(minX, pts[i]); minY = Math.min(minY, pts[i + 1]);
        maxX = Math.max(maxX, pts[i]); maxY = Math.max(maxY, pts[i + 1]);
      }
      return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
    }
    case 'connector':
      return null;
    default:
      return null;
  }
}

function pdfColor(color: string): string {
  if (color === 'transparent') return 'transparent';
  if (color.startsWith('rgba')) {
    const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (m) return `#${parseInt(m[1]).toString(16).padStart(2, '0')}${parseInt(m[2]).toString(16).padStart(2, '0')}${parseInt(m[3]).toString(16).padStart(2, '0')}`;
  }
  return color;
}

function renderDrawItemToPdf(
  pdf: any,
  item: DrawItem,
  allItems: DrawItem[],
  scale: number,
  offsetX: number,
  offsetY: number
) {
  const tx = (x: number) => x * scale + offsetX;
  const ty = (y: number) => y * scale + offsetY;
  const ts = (s: number) => s * scale;

  const strokeColor = pdfColor(item.strokeColor);
  const fillColor = pdfColor(item.fillColor);
  const sw = ts(item.strokeWidth);

  switch (item.type) {
    case 'line':
    case 'freeform': {
      const pts = item.points || [];
      if (pts.length < 4) return;
      pdf.setDrawColor(strokeColor);
      pdf.setLineWidth(sw);
      pdf.setLineCap('round');
      if (item.type === 'freeform' && pts.length > 4) {
        pdf.moveTo(tx(pts[0]), ty(pts[1]));
        for (let i = 2; i < pts.length - 1; i += 2) {
          pdf.lineTo(tx(pts[i]), ty(pts[i + 1]));
        }
        pdf.stroke();
      } else {
        for (let i = 0; i < pts.length - 2; i += 2) {
          pdf.line(tx(pts[i]), ty(pts[i + 1]), tx(pts[i + 2]), ty(pts[i + 3]));
        }
      }
      break;
    }
    case 'rect': {
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
    case 'circle': {
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
    case 'arrow': {
      const pts = item.points || [];
      if (pts.length < 4) return;
      pdf.setDrawColor(strokeColor);
      pdf.setFillColor(strokeColor);
      pdf.setLineWidth(sw);
      pdf.setLineCap('round');
      for (let i = 0; i < pts.length - 2; i += 2) {
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
    case 'text': {
      const x = tx(item.x || 0), y = ty(item.y || 0);
      const fs = ts(item.fontSize || 18);
      pdf.setFontSize(fs);
      pdf.setTextColor(strokeColor);
      pdf.text(item.text || '', x, y + fs * 0.85, { baseline: 'alphabetic' as const });
      break;
    }
    case 'diamond': {
      const cx = item.x || 0, cy = item.y || 0;
      const hw = (item.width || 80) / 2, hh = (item.height || 80) / 2;
      const ptx = tx(cx), pty = ty(cy);
      const shw = ts(hw), shh = ts(hh);
      if (fillColor !== 'transparent') {
        pdf.setFillColor(fillColor);
      }
      pdf.setDrawColor(strokeColor);
      pdf.setLineWidth(sw);
      const top = [ptx, pty - shh];
      const right = [ptx + shw, pty];
      const bottom = [ptx, pty + shh];
      const left = [ptx - shw, pty];
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
    case 'sticky': {
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
        lines.forEach((line, li) => {
          pdf.text(line, x + ts(12), y + ts(24) + li * fs * 1.3, { baseline: 'alphabetic' as const });
        });
      }
      pdf.setDrawColor(strokeColor === 'transparent' ? '#e5e7eb' : strokeColor);
      pdf.setLineWidth(0.5);
      pdf.rect(x, y, w, h, 'S');
      break;
    }
    case 'connector': {
      const sourceItem = allItems.find(i => i.id === item.sourceId);
      const targetItem = allItems.find(i => i.id === item.targetId);
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
        for (let i = 2; i < cpts.length - 1; i += 2) {
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
        pdf.triangle(
          tx(ex), ty(ey),
          tx(ex - hl * Math.cos(endAngle - Math.PI / 6)), ty(ey - hl * Math.sin(endAngle - Math.PI / 6)),
          tx(ex - hl * Math.cos(endAngle + Math.PI / 6)), ty(ey - hl * Math.sin(endAngle + Math.PI / 6)),
          'F'
        );
      }
      if (arrowhead === 'start' || arrowhead === 'both') {
        const startAngle = cpts.length >= 4 ? Math.atan2(cpts[1] - cpts[3], cpts[0] - cpts[2]) : 0;
        const sx = sp.x, sy = sp.y;
        const hl = ts(10);
        pdf.setFillColor(strokeColor);
        pdf.triangle(
          tx(sx), ty(sy),
          tx(sx - hl * Math.cos(startAngle - Math.PI / 6)), ty(sy - hl * Math.sin(startAngle - Math.PI / 6)),
          tx(sx - hl * Math.cos(startAngle + Math.PI / 6)), ty(sy - hl * Math.sin(startAngle + Math.PI / 6)),
          'F'
        );
      }
      break;
    }
    case 'image': {
      const x = tx(item.x || 0), y = ty(item.y || 0);
      const w = ts(item.width || 200), h = ts(item.height || 150);
      pdf.setDrawColor('#888888');
      pdf.setLineWidth(0.5);
      pdf.setFillColor('#f0f0f0');
      pdf.rect(x, y, w, h, 'FD');
      pdf.setFontSize(ts(10));
      pdf.setTextColor('#888888');
      pdf.text('[Image]', x + w / 2, y + h / 2, { align: 'center' as const, baseline: 'middle' as const });
      break;
    }
    case 'file': {
      const x = tx(item.x || 0), y = ty(item.y || 0);
      const w = ts(item.width || 200), h = ts(item.height || 80);
      pdf.setFillColor('#2a2d3a');
      pdf.setDrawColor('#444');
      pdf.setLineWidth(0.5);
      pdf.roundedRect(x, y, w, h, ts(4), ts(4), 'FD');
      pdf.setFontSize(ts(11));
      pdf.setTextColor('#e8ecf4');
      pdf.text(item.fileName || 'File', x + ts(60), y + ts(28), { baseline: 'alphabetic' as const });
      pdf.setFontSize(ts(8));
      pdf.setTextColor('#8b95a8');
      const sizeStr = item.fileSize ? `${(item.fileSize / 1024).toFixed(1)} KB` : '';
      pdf.text(`${sizeStr} • ${(item.fileType || 'FILE').split('/').pop()?.toUpperCase()}`, x + ts(60), y + ts(44), { baseline: 'alphabetic' as const });
      break;
    }
    case 'link': {
      const x = tx(item.x || 0), y = ty(item.y || 0);
      const w = ts(item.width || 240), h = ts(item.height || 80);
      pdf.setFillColor('#2a2d3a');
      pdf.setDrawColor('#8b5cf6');
      pdf.setLineWidth(0.5);
      pdf.roundedRect(x, y, w, h, ts(4), ts(4), 'FD');
      pdf.setFontSize(ts(11));
      pdf.setTextColor('#e8ecf4');
      pdf.text(item.linkTitle || 'Link', x + ts(12), y + ts(24), { baseline: 'alphabetic' as const });
      pdf.setFontSize(ts(8));
      pdf.setTextColor('#8b5cf6');
      pdf.text(item.linkUrl || '', x + ts(12), y + ts(42), { baseline: 'alphabetic' as const });
      break;
    }
    case 'frame': {
      break;
    }
  }
}

/* ══════════════════════════════════════════════════════════════ */
/* ── Layers Panel ──                                            */
/* ══════════════════════════════════════════════════════════════ */

function LayersPanel({
  open,
  onClose,
  items,
  frameItems,
  selectedFrameId,
  onSelectFrame,
  onFitToFrame,
  onExportFramePng,
  onExportAllPdf,
}: {
  open: boolean;
  onClose: () => void;
  items: DrawItem[];
  frameItems: DrawItem[];
  selectedFrameId: string | null;
  onSelectFrame: (id: string) => void;
  onFitToFrame: (id: string) => void;
  onExportFramePng: (id: string) => void;
  onExportAllPdf: () => void;
}) {
  if (!open) return null;

  const isItemInFrameLocal = (item: DrawItem, frame: DrawItem): boolean => {
    if (item.id === frame.id) return false;
    if (item.type === 'connector') return false;
    const fx = frame.x || 0, fy = frame.y || 0, fw = frame.width || 0, fh = frame.height || 0;
    let ix: number, iy: number, iw: number, ih: number;
    if (item.type === 'rect' || item.type === 'sticky' || item.type === 'image' || item.type === 'file' || item.type === 'link') {
      ix = item.x || 0; iy = item.y || 0; iw = item.width || 0; ih = item.height || 0;
    } else if (item.type === 'circle') {
      const r = item.radius || 0;
      ix = (item.x || 0) - r; iy = (item.y || 0) - r; iw = r * 2; ih = r * 2;
    } else if (item.type === 'diamond') {
      const hw = (item.width || 80) / 2, hh = (item.height || 80) / 2;
      ix = (item.x || 0) - hw; iy = (item.y || 0) - hh; iw = item.width || 80; ih = item.height || 80;
    } else if (item.type === 'text') {
      ix = item.x || 0; iy = item.y || 0;
      iw = (item.text || '').length * (item.fontSize || 18) * 0.55; ih = (item.fontSize || 18) * 1.2;
    } else {
      return false;
    }
    const cx = ix + iw / 2, cy = iy + ih / 2;
    return cx >= fx && cx <= fx + fw && cy >= fy && cy <= fy + fh;
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'rect': return '▬';
      case 'circle': return '●';
      case 'sticky': return '📝';
      case 'text': return 'T';
      case 'line': return '╱';
      case 'arrow': return '→';
      case 'diamond': return '◆';
      case 'image': return '🖼';
      case 'file': return '📄';
      case 'link': return '🔗';
      case 'connector': return '⟷';
      default: return '•';
    }
  };

  const getItemLabel = (item: DrawItem) => {
    if (item.type === 'text') return item.text?.slice(0, 20) || 'Text';
    if (item.type === 'sticky') return item.text?.slice(0, 20) || 'Sticky Note';
    if (item.type === 'frame') return item.frameTitle || 'Frame';
    if (item.type === 'image') return 'Image';
    if (item.type === 'file') return item.fileName || 'File';
    if (item.type === 'link') return item.linkTitle || item.linkUrl || 'Link';
    return item.type.charAt(0).toUpperCase() + item.type.slice(1);
  };

  // Items not in any frame
  const orphanItems = items.filter(item =>
    item.type !== 'frame' && item.type !== 'connector' &&
    !frameItems.some(frame => isItemInFrameLocal(item, frame))
  );

  return (
    <div
      className="absolute top-0 right-0 bottom-0 z-30 flex"
      style={{ pointerEvents: 'auto' }}
    >
      <div
        className="w-64 h-full flex flex-col overflow-hidden"
        style={{
          background: 'rgba(21,24,33,0.98)',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#8b5cf6]" />
            <span className="text-xs font-bold text-[#e8ecf4]">Layers & Frames</span>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/[0.06] transition-colors">
            <X className="w-3.5 h-3.5 text-[#5a6478]" />
          </button>
        </div>

        {/* Export All button */}
        {frameItems.length > 0 && (
          <div className="px-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <button
              onClick={onExportAllPdf}
              className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-[#4fc3f7] hover:bg-[rgba(79,195,247,0.08)] transition-colors"
              style={{ border: '1px solid rgba(79,195,247,0.15)' }}
            >
              <Download className="w-3.5 h-3.5" />
              Export All Frames as PDF
            </button>
          </div>
        )}

        {/* Frames list */}
        <div className="flex-1 overflow-y-auto chat-wb-scrollbar">
          {frameItems.map((frame, idx) => {
            const childItems = items.filter(item => isItemInFrameLocal(item, frame));
            const isSel = selectedFrameId === frame.id;
            return (
              <div key={frame.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div
                  className={`flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors ${isSel ? 'bg-[rgba(139,92,246,0.1)]' : 'hover:bg-white/[0.03]'}`}
                  onClick={() => onSelectFrame(frame.id)}
                >
                  <Monitor className="w-3.5 h-3.5 flex-shrink-0" style={{ color: isSel ? '#8b5cf6' : '#5a6478' }} />
                  <span className={`text-[11px] font-semibold flex-1 truncate ${isSel ? 'text-[#8b5cf6]' : 'text-[#e8ecf4]'}`}>
                    {frame.frameTitle || `Slide ${idx + 1}`}
                  </span>
                  <span className="text-[9px] text-[#5a6478] flex-shrink-0">{childItems.length}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); onFitToFrame(frame.id); }}
                    className="p-1 rounded hover:bg-white/[0.06] transition-colors flex-shrink-0"
                    title="Fit to Frame"
                  >
                    <Maximize2 className="w-3 h-3 text-[#5a6478]" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onExportFramePng(frame.id); }}
                    className="p-1 rounded hover:bg-white/[0.06] transition-colors flex-shrink-0"
                    title="Export as PNG"
                  >
                    <Download className="w-3 h-3 text-[#5a6478]" />
                  </button>
                </div>
                {/* Child items */}
                {childItems.length > 0 && (
                  <div className="pb-1">
                    {childItems.map(child => (
                      <div
                        key={child.id}
                        className="flex items-center gap-2 px-3 py-1 pl-8 hover:bg-white/[0.02] transition-colors"
                      >
                        <span className="text-[10px] w-4 text-center" style={{ color: child.strokeColor !== 'transparent' ? child.strokeColor : '#5a6478' }}>
                          {getItemIcon(child.type)}
                        </span>
                        <span className="text-[10px] text-[#8b95a8] truncate">{getItemLabel(child)}</span>
                        {child.aiGenerated && (
                          <span className="text-[8px] px-1 rounded-full bg-[rgba(139,92,246,0.15)] text-[#a78bfa] ml-auto">AI</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Orphan items */}
          {orphanItems.length > 0 && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="px-3 py-1.5">
                <span className="text-[10px] font-semibold text-[#5a6478] uppercase tracking-wider">Unframed Items</span>
              </div>
              {orphanItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 px-3 py-1 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-[10px] w-4 text-center" style={{ color: item.strokeColor !== 'transparent' ? item.strokeColor : '#5a6478' }}>
                    {getItemIcon(item.type)}
                  </span>
                  <span className="text-[10px] text-[#8b95a8] truncate">{getItemLabel(item)}</span>
                  {item.aiGenerated && (
                    <span className="text-[8px] px-1 rounded-full bg-[rgba(139,92,246,0.15)] text-[#a78bfa] ml-auto">AI</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* ── Main Component ──                                          */
/* ══════════════════════════════════════════════════════════════ */

export default function ChatWhiteboard({
  onSave,
  onRecordingComplete,
  onBack,
  onSend,
  sending = false,
  hasCapturedData = false,
  onCursorMove,
  onCursorLeave,
  remoteCursors = [],
  onLaserMove,
  onLaserStop,
  remoteLasers = [],
  onVoteCast,
  onVoteEnd,
  remoteVoteEvents = [],
}: ChatWhiteboardProps) {
  /* ── State ── */
  const [tool, setTool] = useState<ToolType>('pen');
  const [color, setColor] = useState('#00e5a0');
  const [brushSize, setBrushSize] = useState(4);
  const [items, setItems] = useState<DrawItem[]>([]);
  const [tempItem, setTempItem] = useState<DrawItem | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // History for undo/redo
  const [history, setHistory] = useState<DrawItem[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Text input state
  const [textInput, setTextInput] = useState<{ visible: boolean; x: number; y: number } | null>(null);
  const [textValue, setTextValue] = useState('');

  // Sticky note state
  const [editingStickyId, setEditingStickyId] = useState<string | null>(null);
  const [editingStickyText, setEditingStickyText] = useState('');
  const [selectedStickyId, setSelectedStickyId] = useState<string | null>(null);
  const [stickyColorIdx, setStickyColorIdx] = useState(0);

  // Recording state
  const [recStatus, setRecStatus] = useState<RecordingStatus>('idle');
  const [recDuration, setRecDuration] = useState(0);

  // Connector state
  const [connectorStyle, setConnectorStyle] = useState<'straight' | 'curved' | 'elbow'>('curved');
  const [connectorArrowhead, setConnectorArrowhead] = useState<'none' | 'end' | 'start' | 'both'>('end');
  const [connectingFrom, setConnectingFrom] = useState<{ itemId: string; anchor: AnchorPosition } | null>(null);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [selectedConnectorId, setSelectedConnectorId] = useState<string | null>(null);
  const [tempConnectorEnd, setTempConnectorEnd] = useState<{ x: number; y: number } | null>(null);

  // Template panel state
  const [showTemplatePanel, setShowTemplatePanel] = useState(false);

  // Zoom/Pan state
  const [zoomLevel, setZoomLevel] = useState(1);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [spaceHeld, setSpaceHeld] = useState(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number; stageX: number; stageY: number } | null>(null);
  const [showMinimap, setShowMinimap] = useState(true);

  // Laser pointer state
  const [laserTrail, setLaserTrail] = useState<LaserTrailPoint[]>([]);
  const [laserActive, setLaserActive] = useState(false);

  // Frame / Presentation state
  const [presentingFrame, setPresentingFrame] = useState<number>(0);
  const [isPresenting, setIsPresenting] = useState(false);
  const [editingFrameId, setEditingFrameId] = useState<string | null>(null);
  const [editingFrameNotes, setEditingFrameNotes] = useState('');
  const [editingFrameTitle, setEditingFrameTitle] = useState('');
  const [showFrameNotesPanel, setShowFrameNotesPanel] = useState(false);
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>(null);
  const [showLayersPanel, setShowLayersPanel] = useState(false);

  // AI Feature state
  const [showAiPrompt, setShowAiPrompt] = useState(false);
  const [aiPromptText, setAiPromptText] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiClusterLoading, setAiClusterLoading] = useState(false);
  const [aiSummarizeLoading, setAiSummarizeLoading] = useState(false);
  const [aiPromptMode, setAiPromptMode] = useState<'generate' | 'cluster' | 'summarize'>('generate');

  // Shape Recognition state
  const [shapeRecognitionEnabled, setShapeRecognitionEnabled] = useState(true);
  const [shapeSuggestion, setShapeSuggestion] = useState<{
    shapeName: string;
    confidence: number;
    freeformId: string;
    replacementItem: DrawItem;
    position: { x: number; y: number };
  } | null>(null);

  // Insert Embed state
  const [showInsertMenu, setShowInsertMenu] = useState(false);
  const [showLinkInputDialog, setShowLinkInputDialog] = useState(false);
  const [linkInputUrl, setLinkInputUrl] = useState('');
  const [linkLoading, setLinkLoading] = useState(false);
  const [selectedEmbedId, setSelectedEmbedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Voting state
  const [votingPhase, setVotingPhase] = useState<VotingPhase>('idle');
  const [activeVoteConfig, setActiveVoteConfig] = useState<VoteConfig | null>(null);
  const [voteTallies, setVoteTallies] = useState<Record<string, number>>({});      // itemId -> count
  const [localUserVotes, setLocalUserVotes] = useState<string[]>([]);              // itemIds the local user voted for
  const [voteTimeRemaining, setVoteTimeRemaining] = useState<number>(0);           // seconds remaining
  const [voteResults, setVoteResults] = useState<Record<string, number> | null>(null); // final results when ended

  // PDF Export state
  const [showPdfExportDialog, setShowPdfExportDialog] = useState(false);
  const [pdfExporting, setPdfExporting] = useState(false);
  const [pdfExportProgress, setPdfExportProgress] = useState(0);

  /* ── Refs ── */
  const stageRef = useRef<Konva.Stage>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const drawStart = useRef<{ x: number; y: number } | null>(null);
  const currentPoints = useRef<number[]>([]);
  const itemsRef = useRef<DrawItem[]>(items);
  const connectingFromRef = useRef<{ itemId: string; anchor: AnchorPosition } | null>(null);

  // Recording refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const canvasStreamRef = useRef<MediaStream | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const compositeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const compositeCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animFrameRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recStartRef = useRef<number>(0);
  const pausedDurationRef = useRef<number>(0);
  const pauseStartRef = useRef<number>(0);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const stickyEditRef = useRef<HTMLTextAreaElement>(null);
  const resizingRef = useRef<{ stickyId: string; startX: number; startY: number; startW: number; startH: number } | null>(null);

  // Zoom/Pan refs
  const zoomLevelRef = useRef(1);
  const stagePosRef = useRef({ x: 0, y: 0 });
  const spaceHeldRef = useRef(false);
  const isPanningRef = useRef(false);
  const panStartRef = useRef<{ x: number; y: number; stageX: number; stageY: number } | null>(null);
  const lastTouchDistRef = useRef<number | null>(null);
  const lastTouchCenterRef = useRef<{ x: number; y: number } | null>(null);

  // Cursor broadcast throttle (15fps ≈ 67ms interval)
  const lastCursorBroadcastRef = useRef<number>(0);
  const CURSOR_BROADCAST_INTERVAL = 67; // ~15fps

  // Laser pointer refs
  const laserTrailRef = useRef<LaserTrailPoint[]>([]);
  const laserActiveRef = useRef(false);
  const lastLaserBroadcastRef = useRef<number>(0);
  const LASER_BROADCAST_INTERVAL = 67; // ~15fps

  // Voting refs
  const voteTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const voteTalliesRef = useRef<Record<string, number>>({});
  const localUserVotesRef = useRef<string[]>([]);
  const laserAnimFrameRef = useRef<number>(0);

  // Keep itemsRef in sync
  useEffect(() => { itemsRef.current = items; }, [items]);
  // Keep connectingFromRef in sync
  useEffect(() => { connectingFromRef.current = connectingFrom; }, [connectingFrom]);
  // Keep zoom/pan refs in sync
  useEffect(() => { zoomLevelRef.current = zoomLevel; }, [zoomLevel]);
  useEffect(() => { stagePosRef.current = stagePos; }, [stagePos]);
  useEffect(() => { spaceHeldRef.current = spaceHeld; }, [spaceHeld]);
  useEffect(() => { isPanningRef.current = isPanning; }, [isPanning]);
  useEffect(() => { panStartRef.current = panStart; }, [panStart]);
  // Keep laser refs in sync
  useEffect(() => { laserActiveRef.current = laserActive; }, [laserActive]);
  useEffect(() => { laserTrailRef.current = laserTrail; }, [laserTrail]);

  // Laser trail cleanup: re-render to fade out old points
  useEffect(() => {
    if (tool !== 'laser' && remoteLasers.length === 0) return;
    let running = true;
    const tick = () => {
      if (!running) return;
      const now = Date.now();
      setLaserTrail(prev => {
        const filtered = prev.filter(p => now - p.timestamp < LASER_TRAIL_LIFETIME);
        return filtered.length === prev.length ? prev : filtered;
      });
      laserAnimFrameRef.current = requestAnimationFrame(tick);
    };
    laserAnimFrameRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      if (laserAnimFrameRef.current) cancelAnimationFrame(laserAnimFrameRef.current);
    };
  }, [tool, remoteLasers.length]);

  // Inject styles
  useEffect(() => { injectChatWbStyles(); }, []);

  /* ── Resize Observer ── */
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const update = () => {
      const rect = c.getBoundingClientRect();
      setDimensions({ width: Math.floor(rect.width), height: Math.floor(rect.height) });
    };
    update();
    const obs = new ResizeObserver(update);
    obs.observe(c);
    return () => obs.disconnect();
  }, []);

  /* ── History helpers ── */
  const pushHistory = useCallback((newItems: DrawItem[]) => {
    setHistory(prev => {
      const next = prev.slice(0, historyIndex + 1);
      next.push([...newItems]);
      return next;
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex < 0) return;
    const prevItems = historyIndex > 0 ? history[historyIndex - 1] : [];
    setItems([...prevItems]);
    setHistoryIndex(prev => prev - 1);
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex >= history.length - 1) return;
    const nextItems = history[historyIndex + 1];
    setItems([...nextItems]);
    setHistoryIndex(prev => prev + 1);
  }, [history, historyIndex]);

  /* ── Connector delete handler ── */
  const handleConnectorDelete = useCallback((id: string) => {
    setItems(prev => {
      const next = prev.filter(item => item.id !== id);
      requestAnimationFrame(() => pushHistory(next));
      return next;
    });
    setSelectedConnectorId(null);
  }, [pushHistory]);

  /* ── Sticky note handlers (declared early for forward refs) ── */
  const commitStickyText = useCallback(() => {
    if (!editingStickyId) return;
    setItems(prev => {
      const next = prev.map(item =>
        item.id === editingStickyId ? { ...item, text: editingStickyText } : item
      );
      requestAnimationFrame(() => pushHistory(next));
      return next;
    });
    setEditingStickyId(null);
    setEditingStickyText('');
  }, [editingStickyId, editingStickyText, pushHistory]);

  const handleStickyDragEnd = useCallback((id: string, x: number, y: number) => {
    setItems(prev => {
      const next = prev.map(item =>
        item.id === id ? { ...item, x, y } : item
      );
      requestAnimationFrame(() => pushHistory(next));
      return next;
    });
  }, [pushHistory]);

  const handleStickyDelete = useCallback((id: string) => {
    setItems(prev => {
      const next = prev.filter(item => item.id !== id);
      requestAnimationFrame(() => pushHistory(next));
      return next;
    });
    if (selectedStickyId === id) setSelectedStickyId(null);
    if (editingStickyId === id) {
      setEditingStickyId(null);
      setEditingStickyText('');
    }
  }, [pushHistory, selectedStickyId, editingStickyId]);

  const handleStickyDoubleClick = useCallback((id: string) => {
    const item = itemsRef.current.find(i => i.id === id);
    if (!item) return;
    setEditingStickyId(id);
    setEditingStickyText(item.text || '');
    setTimeout(() => stickyEditRef.current?.focus(), 80);
  }, []);

  const handleStickySelect = useCallback((id: string) => {
    setSelectedStickyId(id);
  }, []);

  /* ── Frame containment helper ── */
  const isItemInFrame = useCallback((item: DrawItem, frame: DrawItem | undefined): boolean => {
    if (!frame) return false;
    const fx = frame.x || 0;
    const fy = frame.y || 0;
    const fw = frame.width || 0;
    const fh = frame.height || 0;

    let itemX: number, itemY: number, itemW: number, itemH: number;

    if (item.type === 'rect' || item.type === 'sticky' || item.type === 'frame') {
      itemX = item.x || 0; itemY = item.y || 0;
      itemW = item.width || 0; itemH = item.height || 0;
    } else if (item.type === 'circle') {
      const r = item.radius || 0;
      itemX = (item.x || 0) - r; itemY = (item.y || 0) - r;
      itemW = r * 2; itemH = r * 2;
    } else if (item.type === 'text') {
      itemX = item.x || 0; itemY = item.y || 0;
      itemW = (item.text || '').length * (item.fontSize || 18) * 0.55; itemH = (item.fontSize || 18) * 1.2;
    } else if (item.type === 'line' || item.type === 'freeform' || item.type === 'arrow') {
      const pts = item.points || [];
      for (let i = 0; i < pts.length; i += 2) {
        if (pts[i] >= fx && pts[i] <= fx + fw && pts[i+1] >= fy && pts[i+1] <= fy + fh) return true;
      }
      return false;
    } else if (item.type === 'connector') {
      return true;
    } else if (item.type === 'diamond') {
      const hw = (item.width || 80) / 2;
      const hh = (item.height || 80) / 2;
      itemX = (item.x || 0) - hw; itemY = (item.y || 0) - hh;
      itemW = item.width || 80; itemH = item.height || 80;
    } else if (item.type === 'image' || item.type === 'file' || item.type === 'link') {
      itemX = item.x || 0; itemY = item.y || 0;
      itemW = item.width || 200; itemH = item.height || 150;
    } else {
      return false;
    }

    const centerX = itemX + itemW / 2;
    const centerY = itemY + itemH / 2;
    return centerX >= fx && centerX <= fx + fw && centerY >= fy && centerY <= fy + fh;
  }, []);

  /* ── Frame event handlers ── */
  const handleFrameSelect = useCallback((id: string) => {
    setSelectedFrameId(id);
  }, []);

  const handleFrameDragEnd = useCallback((id: string, x: number, y: number) => {
    setItems(prev => {
      const frame = prev.find(i => i.id === id);
      if (!frame) return prev;
      const dx = x - (frame.x || 0);
      const dy = y - (frame.y || 0);
      const next = prev.map(item => {
        if (item.id === id) return { ...item, x, y };
        // Move child items with the frame
        if (isItemInFrame(item, frame)) {
          if (item.type === 'line' || item.type === 'freeform' || item.type === 'arrow') {
            const pts = item.points ? [...item.points] : [];
            for (let i = 0; i < pts.length; i += 2) {
              pts[i] += dx;
              pts[i + 1] += dy;
            }
            return { ...item, points: pts };
          } else if (item.type === 'connector') {
            // Connectors are handled by their source/target anchors, skip
            return item;
          } else {
            return { ...item, x: (item.x || 0) + dx, y: (item.y || 0) + dy };
          }
        }
        return item;
      });
      requestAnimationFrame(() => pushHistory(next));
      return next;
    });
  }, [pushHistory, isItemInFrame]);

  const handleFrameDoubleClick = useCallback((id: string) => {
    const item = itemsRef.current.find(i => i.id === id);
    if (!item) return;
    setEditingFrameId(id);
    setEditingFrameTitle(item.frameTitle || '');
    setEditingFrameNotes(item.frameNotes || '');
    setShowFrameNotesPanel(true);
  }, []);

  const handleFrameDelete = useCallback((id: string) => {
    setItems(prev => {
      const next = prev.filter(item => item.id !== id);
      requestAnimationFrame(() => pushHistory(next));
      return next;
    });
    if (selectedFrameId === id) setSelectedFrameId(null);
  }, [pushHistory, selectedFrameId]);

  const handleFrameResizeEnd = useCallback((id: string, x: number, y: number, width: number, height: number) => {
    setItems(prev => {
      const next = prev.map(item =>
        item.id === id ? { ...item, x, y, width, height } : item
      );
      requestAnimationFrame(() => pushHistory(next));
      return next;
    });
  }, [pushHistory]);

  /* ── Frame / Presentation helpers ── */
  const frameItems = useMemo(() => {
    return items
      .filter(item => item.type === 'frame')
      .sort((a, b) => {
        const ay = (a.y || 0);
        const by = (b.y || 0);
        if (Math.abs(ay - by) > 50) return ay - by;
        return (a.x || 0) - (b.x || 0);
      });
  }, [items]);

  const enterPresentation = useCallback(() => {
    if (frameItems.length === 0) return;
    setIsPresenting(true);
    setPresentingFrame(0);
    setTool('laser');
    setLaserTrail([]);
  }, [frameItems.length]);

  const exitPresentation = useCallback(() => {
    setIsPresenting(false);
    setTool('pen');
    setLaserTrail([]);
    setLaserActive(false);
    laserActiveRef.current = false;
    setShowFrameNotesPanel(false);
  }, []);

  const navigateSlide = useCallback((direction: 1 | -1) => {
    setPresentingFrame(prev => {
      const next = prev + direction;
      if (next < 0) return 0;
      if (next >= frameItems.length) return frameItems.length - 1;
      return next;
    });
  }, [frameItems.length]);

  const currentFrame = useMemo(() => {
    return frameItems[presentingFrame] || null;
  }, [frameItems, presentingFrame]);

  const presentationScale = useMemo(() => {
    if (!currentFrame) return 1;
    const fw = currentFrame.width || 800;
    const fh = currentFrame.height || 600;
    const scaleX = dimensions.width / fw;
    const scaleY = dimensions.height / fh;
    return Math.min(scaleX, scaleY) * 0.95;
  }, [currentFrame, dimensions]);

  const presentationOffset = useMemo(() => {
    if (!currentFrame) return { x: 0, y: 0 };
    const fw = currentFrame.width || 800;
    const fh = currentFrame.height || 600;
    const scaledW = fw * presentationScale;
    const scaledH = fh * presentationScale;
    return {
      x: (dimensions.width - scaledW) / 2 - (currentFrame.x || 0) * presentationScale,
      y: (dimensions.height - scaledH) / 2 - (currentFrame.y || 0) * presentationScale,
    };
  }, [currentFrame, presentationScale, dimensions]);

  /* ── AI Feature Handlers ── */

  /** AI Generate: calls the API to generate DrawItem[] from a prompt */
  const handleAiGenerate = useCallback(async () => {
    if (!aiPromptText.trim()) {
      toast.error('Please enter a description of what you want to generate.');
      return;
    }
    setAiLoading(true);
    try {
      const response = await fetch('/api/whiteboard/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPromptText.trim() }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate content.');
      }

      const data = await response.json();
      const generatedItems: DrawItem[] = data.items || [];

      if (generatedItems.length === 0) {
        toast.error('AI could not generate any items. Try a different prompt.');
        return;
      }

      // Offset generated items to center of current viewport
      const viewportCenterX = (dimensions.width / 2 - stagePosRef.current.x) / zoomLevelRef.current;
      const viewportCenterY = (dimensions.height / 2 - stagePosRef.current.y) / zoomLevelRef.current;

      // Calculate bounding box of generated items to center them
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      generatedItems.forEach(item => {
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
          for (let i = 0; i < pts.length; i += 2) {
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
      const offsetItems = generatedItems.map(item => {
        const offsetItem = { ...item, aiGenerated: true };
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
          offsetItem.points = (offsetItem.points || []).map((p, i) => i % 2 === 0 ? p + offsetX : p + offsetY);
        }
        return offsetItem;
      });

      // Add items to canvas with undo support
      setItems(prev => {
        const next = [...prev, ...offsetItems];
        requestAnimationFrame(() => pushHistory(next));
        return next;
      });

      toast.success(`AI generated ${offsetItems.length} items on canvas.`);
      setShowAiPrompt(false);
      setAiPromptText('');
    } catch (err: any) {
      console.error('[AI Generate] Error:', err);
      toast.error(err.message || 'Failed to generate AI content.');
    } finally {
      setAiLoading(false);
    }
  }, [aiPromptText, dimensions, pushHistory]);

  /** AI Cluster: auto-groups nearby sticky notes by topic and adds connectors */
  const handleAiCluster = useCallback(async () => {
    const stickyNotes = items.filter(i => i.type === 'sticky' && i.text && i.text.trim());
    if (stickyNotes.length < 2) {
      toast.error('Need at least 2 sticky notes with text to cluster.');
      return;
    }

    setAiClusterLoading(true);
    try {
      // Gather all sticky note texts for topic analysis
      const stickyTexts = stickyNotes.map(s => ({
        id: s.id,
        text: s.text || '',
        x: s.x || 0,
        y: s.y || 0,
        width: s.width || 180,
        height: s.height || 160,
      }));

      // Simple proximity-based clustering: group stickies within 300px of each other
      const CLUSTER_DISTANCE = 350;
      const clusters: { items: typeof stickyTexts; centerX: number; centerY: number }[] = [];
      const assigned = new Set<string>();

      for (const sticky of stickyTexts) {
        if (assigned.has(sticky.id)) continue;
        const cluster = { items: [sticky], centerX: sticky.x + sticky.width / 2, centerY: sticky.y + sticky.height / 2 };
        assigned.add(sticky.id);

        for (const other of stickyTexts) {
          if (assigned.has(other.id)) continue;
          const dx = (other.x + other.width / 2) - cluster.centerX;
          const dy = (other.y + other.height / 2) - cluster.centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CLUSTER_DISTANCE) {
            cluster.items.push(other);
            assigned.add(other.id);
            // Recalculate center
            cluster.centerX = cluster.items.reduce((s, i) => s + i.x + i.width / 2, 0) / cluster.items.length;
            cluster.centerY = cluster.items.reduce((s, i) => s + i.y + i.height / 2, 0) / cluster.items.length;
          }
        }

        clusters.push(cluster);
      }

      if (clusters.length <= 1) {
        toast.info('All sticky notes are already in one cluster. Try spreading them out.');
        setAiClusterLoading(false);
        return;
      }

      // Create connector items between cluster members
      const newConnectors: DrawItem[] = [];
      const clusterColors = ['#4fc3f7', '#00e5a0', '#f59e0b', '#8b5cf6', '#ec4899', '#ff5757'];

      clusters.forEach((cluster, clusterIdx) => {
        const color = clusterColors[clusterIdx % clusterColors.length];
        // Connect items within cluster in a chain
        for (let i = 0; i < cluster.items.length - 1; i++) {
          const source = cluster.items[i];
          const target = cluster.items[i + 1];

          // Determine best anchor positions
          const dx = (target.x + target.width / 2) - (source.x + source.width / 2);
          const dy = (target.y + target.height / 2) - (source.y + source.height / 2);
          let sourceAnchor: AnchorPosition = 'right';
          let targetAnchor: AnchorPosition = 'left';
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
            dash: [8, 4], // Dashed to show AI-generated
          });
        }
      });

      // Add connectors to canvas with undo support
      setItems(prev => {
        const next = [...prev, ...newConnectors];
        requestAnimationFrame(() => pushHistory(next));
        return next;
      });

      toast.success(`AI clustered ${stickyNotes.length} notes into ${clusters.length} groups with ${newConnectors.length} connectors.`);
    } catch (err: any) {
      console.error('[AI Cluster] Error:', err);
      toast.error(err.message || 'Failed to cluster sticky notes.');
    } finally {
      setAiClusterLoading(false);
    }
  }, [items, pushHistory]);

  /** AI Summarize: reads all text on canvas and generates a summary sticky note */
  const handleAiSummarize = useCallback(async () => {
    // Collect all text from the canvas
    const textItems = items.filter(i =>
      (i.type === 'text' && i.text && i.text.trim()) ||
      (i.type === 'sticky' && i.text && i.text.trim())
    );

    if (textItems.length === 0) {
      toast.error('No text content found on canvas to summarize.');
      return;
    }

    setAiSummarizeLoading(true);
    try {
      const texts = textItems.map(i => i.text || '').filter(t => t.trim());
      const response = await fetch('/api/whiteboard/ai-summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to summarize content.');
      }

      const data = await response.json();
      const summary: string = data.summary || '';

      if (!summary) {
        toast.error('AI could not generate a summary. Please try again.');
        return;
      }

      // Place summary sticky note in the top-right area of viewport
      const viewportTopRightX = (dimensions.width - 40 - stagePosRef.current.x) / zoomLevelRef.current;
      const viewportTopRightY = (40 - stagePosRef.current.y) / zoomLevelRef.current;

      const summarySticky: DrawItem = {
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
        stickyColor: '#EDE9FE',     // Purple sticky to distinguish summary
        stickyFoldColor: '#C4B5FD',
        stickyTextColor: '#5B21B6',
        aiGenerated: true,
      };

      setItems(prev => {
        const next = [...prev, summarySticky];
        requestAnimationFrame(() => pushHistory(next));
        return next;
      });

      toast.success('AI generated a summary note on the canvas.');
    } catch (err: any) {
      console.error('[AI Summarize] Error:', err);
      toast.error(err.message || 'Failed to summarize canvas content.');
    } finally {
      setAiSummarizeLoading(false);
    }
  }, [items, dimensions, pushHistory]);

  /* ── Voting Handlers ── */

  /** Start a new vote with the given config */
  const startVote = useCallback((config: VoteConfig) => {
    setActiveVoteConfig(config);
    setVotingPhase('active');
    setVoteTallies({});
    setLocalUserVotes([]);
    setVoteResults(null);
    voteTalliesRef.current = {};
    localUserVotesRef.current = [];

    // Initialize tallies for all candidates to 0
    const initialTallies: Record<string, number> = {};
    config.candidateItemIds.forEach(id => { initialTallies[id] = 0; });
    setVoteTallies(initialTallies);
    voteTalliesRef.current = initialTallies;

    // Start countdown timer if time-limited
    if (config.timeLimitSeconds > 0) {
      setVoteTimeRemaining(config.timeLimitSeconds);
      voteTimerRef.current = setInterval(() => {
        setVoteTimeRemaining(prev => {
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

    toast.success(`Voting started: "${config.title}"`);
  }, []);

  /** Cast a vote on a specific item */
  const castVote = useCallback((itemId: string) => {
    if (votingPhase !== 'active' || !activeVoteConfig) return;
    if (!activeVoteConfig.candidateItemIds.includes(itemId)) return;
    if (localUserVotesRef.current.includes(itemId)) {
      toast.error('You already voted on this item.');
      return;
    }
    if (localUserVotesRef.current.length >= activeVoteConfig.votesPerUser) {
      toast.error(`You've used all ${activeVoteConfig.votesPerUser} votes.`);
      return;
    }

    // Update local state
    const newVotes = [...localUserVotesRef.current, itemId];
    setLocalUserVotes(newVotes);
    localUserVotesRef.current = newVotes;

    const newTallies = { ...voteTalliesRef.current, [itemId]: (voteTalliesRef.current[itemId] || 0) + 1 };
    setVoteTallies(newTallies);
    voteTalliesRef.current = newTallies;

    // Broadcast vote via Socket.IO callback
    if (onVoteCast) {
      onVoteCast({
        voteId: activeVoteConfig.id,
        userId: 'local',
        userName: 'You',
        itemId,
        timestamp: Date.now(),
      });
    }
  }, [votingPhase, activeVoteConfig, onVoteCast]);

  /** Process a remote vote event */
  const processRemoteVote = useCallback((event: VoteCastEvent) => {
    if (!activeVoteConfig || event.voteId !== activeVoteConfig.id) return;
    if (!activeVoteConfig.candidateItemIds.includes(event.itemId)) return;

    const newTallies = { ...voteTalliesRef.current, [event.itemId]: (voteTalliesRef.current[event.itemId] || 0) + 1 };
    setVoteTallies(newTallies);
    voteTalliesRef.current = newTallies;
  }, [activeVoteConfig]);

  /** End the current vote and show results */
  const endVote = useCallback(() => {
    if (voteTimerRef.current) {
      clearInterval(voteTimerRef.current);
      voteTimerRef.current = null;
    }

    setVotingPhase('ended');
    const finalTallies = { ...voteTalliesRef.current };
    setVoteResults(finalTallies);

    // Broadcast vote end via Socket.IO callback
    if (onVoteEnd && activeVoteConfig) {
      onVoteEnd({
        voteId: activeVoteConfig.id,
        results: finalTallies,
        timestamp: Date.now(),
      });
    }

    toast.success('Voting ended! Results are shown on the canvas.');
  }, [activeVoteConfig, onVoteEnd]);

  /** Reset voting back to idle */
  const resetVoting = useCallback(() => {
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
  useEffect(() => {
    if (remoteVoteEvents.length > 0) {
      const latest = remoteVoteEvents[remoteVoteEvents.length - 1];
      processRemoteVote(latest);
    }
  }, [remoteVoteEvents, processRemoteVote]);

  // Auto-end vote when timer reaches 0
  useEffect(() => {
    if (votingPhase === 'active' && activeVoteConfig && activeVoteConfig.timeLimitSeconds > 0 && voteTimeRemaining === 0) {
      endVote();
    }
  }, [voteTimeRemaining, votingPhase, activeVoteConfig, endVote]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (voteTimerRef.current) {
        clearInterval(voteTimerRef.current);
      }
    };
  }, []);

  /** Computed: sorted results for ranking display */
  const rankedResults = useMemo(() => {
    const tallies = voteResults || voteTallies;
    if (!activeVoteConfig) return [];
    return activeVoteConfig.candidateItemIds
      .map(id => ({ itemId: id, count: tallies[id] || 0 }))
      .sort((a, b) => b.count - a.count);
  }, [voteResults, voteTallies, activeVoteConfig]);

  const handleStickyResizeStart = useCallback((id: string) => {
    const stage = stageRef.current;
    if (!stage) return;
    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return;
    // Convert screen position to world position
    const worldX = (pointerPos.x - stagePosRef.current.x) / zoomLevelRef.current;
    const worldY = (pointerPos.y - stagePosRef.current.y) / zoomLevelRef.current;
    const item = itemsRef.current.find(i => i.id === id);
    if (!item) return;
    resizingRef.current = {
      stickyId: id,
      startX: worldX,
      startY: worldY,
      startW: item.width || 180,
      startH: item.height || 160,
    };
  }, []);

  /* ── Space key tracking for pan mode ── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return;
      if (e.code === 'Space' && !spaceHeldRef.current) {
        e.preventDefault();
        setSpaceHeld(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setSpaceHeld(false);
        setIsPanning(false);
        isPanningRef.current = false;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  /* ── Wheel zoom handler ── */
  const handleWheel = useCallback((e: Konva.KonvaEventObject<WheelEvent>) => {
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
      y: (pointer.y - stagePosRef.current.y) / oldScale,
    };

    const newPos = {
      x: pointer.x - mousePointTo.x * clampedScale,
      y: pointer.y - mousePointTo.y * clampedScale,
    };

    setZoomLevel(clampedScale);
    setStagePos(newPos);
  }, []);

  /* ── Shape Recognition handlers ── */
  const acceptShapeSuggestion = useCallback(() => {
    if (!shapeSuggestion) return;
    const { freeformId, replacementItem } = shapeSuggestion;
    setItems(prev => {
      // Remove the freeform line and add the clean shape
      const next = prev.filter(i => i.id !== freeformId);
      next.push(replacementItem);
      requestAnimationFrame(() => pushHistory(next));
      return next;
    });
    setShapeSuggestion(null);
    toast.success(`Converted to ${shapeSuggestion.shapeName}`);
  }, [shapeSuggestion, pushHistory]);

  const rejectShapeSuggestion = useCallback(() => {
    setShapeSuggestion(null);
  }, []);

  /* ── Embed Handlers ── */
  const handleImageFileSelect = useCallback(async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/whiteboard/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      // Get image dimensions
      const img = new window.Image();
      img.src = data.url;
      await new Promise<void>((resolve) => { img.onload = () => resolve(); });

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
      const vpCenterX = ((dimensions.width / 2) - stagePos.x) / zoomLevel;
      const vpCenterY = ((dimensions.height / 2) - stagePos.y) / zoomLevel;

      const newItem: DrawItem = {
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
        rotation: 0,
      };
      setItems(prev => {
        const next = [...prev, newItem];
        requestAnimationFrame(() => pushHistory(next));
        return next;
      });
      toast.success('Image added to canvas');
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload image');
    }
  }, [dimensions, stagePos, zoomLevel, pushHistory]);

  const handleFileSelect = useCallback(async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/whiteboard/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      const vpCenterX = ((dimensions.width / 2) - stagePos.x) / zoomLevel;
      const vpCenterY = ((dimensions.height / 2) - stagePos.y) / zoomLevel;

      const newItem: DrawItem = {
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
        fileSize: data.size || file.size,
      };
      setItems(prev => {
        const next = [...prev, newItem];
        requestAnimationFrame(() => pushHistory(next));
        return next;
      });
      toast.success('File added to canvas');
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload file');
    }
  }, [dimensions, stagePos, zoomLevel, pushHistory]);

  const handleAddLink = useCallback(async () => {
    if (!linkInputUrl.trim()) return;
    setLinkLoading(true);
    try {
      // Fetch link metadata
      const res = await fetch('/api/whiteboard/link-meta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: linkInputUrl.trim() }),
      });
      const data = await res.json();

      const vpCenterX = ((dimensions.width / 2) - stagePos.x) / zoomLevel;
      const vpCenterY = ((dimensions.height / 2) - stagePos.y) / zoomLevel;

      const newItem: DrawItem = {
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
        linkFavicon: data.favicon || '',
      };
      setItems(prev => {
        const next = [...prev, newItem];
        requestAnimationFrame(() => pushHistory(next));
        return next;
      });
      setShowLinkInputDialog(false);
      setLinkInputUrl('');
      toast.success('Link card added to canvas');
    } catch (err: any) {
      // Even if metadata fails, add a basic link card
      const vpCenterX = ((dimensions.width / 2) - stagePos.x) / zoomLevel;
      const vpCenterY = ((dimensions.height / 2) - stagePos.y) / zoomLevel;

      const newItem: DrawItem = {
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
        linkFavicon: '',
      };
      setItems(prev => {
        const next = [...prev, newItem];
        requestAnimationFrame(() => pushHistory(next));
        return next;
      });
      setShowLinkInputDialog(false);
      setLinkInputUrl('');
      toast.success('Link card added');
    }
    setLinkLoading(false);
  }, [linkInputUrl, dimensions, stagePos, zoomLevel, pushHistory]);

  const handleEmbedDragEnd = useCallback((id: string, x: number, y: number) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, x, y } : item));
  }, []);

  const handleEmbedResizeEnd = useCallback((id: string, w: number, h: number) => {
    setItems(prev => {
      const next = prev.map(item => item.id === id ? { ...item, width: w, height: h } : item);
      requestAnimationFrame(() => pushHistory(next));
      return next;
    });
  }, [pushHistory]);

  const handleEmbedDelete = useCallback((id: string) => {
    setItems(prev => {
      const next = prev.filter(item => item.id !== id);
      requestAnimationFrame(() => pushHistory(next));
      return next;
    });
    setSelectedEmbedId(null);
  }, [pushHistory]);

  // Drag-and-drop from desktop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const handleDrop = async (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const files = e.dataTransfer?.files;
      if (!files || files.length === 0) return;
      for (let i = 0; i < files.length; i++) {
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
    return () => {
      container.removeEventListener('dragover', handleDragOver);
      container.removeEventListener('drop', handleDrop);
    };
  }, [handleImageFileSelect, handleFileSelect]);

  // Clipboard paste support
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      // Don't intercept paste when editing text fields
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return;
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
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
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleImageFileSelect]);

  /* ── Keyboard shortcuts ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
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
          setShowFrameNotesPanel(prev => !prev);
          return;
        }
        return; // In presentation mode, only handle these shortcuts
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
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
        setTool(prev => prev === 'laser' ? 'pen' : 'laser');
        setTextInput(null);
        setTextValue('');
        setSelectedStickyId(null);
        setSelectedConnectorId(null);
        setConnectingFrom(null);
        setTempConnectorEnd(null);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, redo, selectedStickyId, editingStickyId, handleStickyDelete, selectedConnectorId, handleConnectorDelete, connectingFrom, isPresenting, exitPresentation, navigateSlide, editingFrameId, shapeSuggestion, acceptShapeSuggestion]);

  /* ── Get pointer position relative to stage (world coordinates) ── */
  const getPointerPos = useCallback((): { x: number; y: number } | null => {
    const stage = stageRef.current;
    if (!stage) return null;
    const pos = stage.getPointerPosition();
    if (!pos) return null;
    // Transform screen position to world position
    const worldX = (pos.x - stagePosRef.current.x) / zoomLevelRef.current;
    const worldY = (pos.y - stagePosRef.current.y) / zoomLevelRef.current;
    return { x: worldX, y: worldY };
  }, []);

  /* ── Find nearest anchor for a position on a given item ── */
  const findNearestAnchor = useCallback((itemId: string, pos: { x: number; y: number }): AnchorPosition | null => {
    const item = itemsRef.current.find(i => i.id === itemId);
    if (!item) return null;
    const anchors = getAnchorPoints(item);
    let bestDist = Infinity;
    let bestAnchor: AnchorPosition | null = null;
    for (const [key, pt] of Object.entries(anchors)) {
      const dist = Math.hypot(pt.x - pos.x, pt.y - pos.y);
      if (dist < bestDist) {
        bestDist = dist;
        bestAnchor = key as AnchorPosition;
      }
    }
    return bestAnchor;
  }, []);

  /* ── Mouse/Touch handlers ── */
  const handleMouseDown = useCallback((e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    // Handle pinch-to-zoom touch end reset
    const touchEvt = e.evt as TouchEvent;
    if (touchEvt.touches && touchEvt.touches.length === 0) {
      lastTouchDistRef.current = null;
      lastTouchCenterRef.current = null;
    }

    // Check for pan start: Space+click or middle mouse button
    const mouseEvt = e.evt as MouseEvent;
    if ((spaceHeldRef.current || mouseEvt.button === 1) && tool !== 'connector') {
      setIsPanning(true);
      isPanningRef.current = true;
      const pos = stageRef.current?.getPointerPosition();
      if (pos) {
        setPanStart({ x: pos.x, y: pos.y, stageX: stagePosRef.current.x, stageY: stagePosRef.current.y });
        panStartRef.current = { x: pos.x, y: pos.y, stageX: stagePosRef.current.x, stageY: stagePosRef.current.y };
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
        const newPoint: LaserTrailPoint = { x: pos.x, y: pos.y, timestamp: Date.now() };
        setLaserTrail(prev => [...prev.slice(-LASER_TRAIL_MAX_POINTS), newPoint]);
        // Broadcast
        if (onLaserMove) {
          const now = Date.now();
          if (now - lastLaserBroadcastRef.current >= LASER_BROADCAST_INTERVAL) {
            lastLaserBroadcastRef.current = now;
            onLaserMove({ x: pos.x, y: pos.y });
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
      const newFrame: DrawItem = {
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
        frameTitle: `Slide ${itemsRef.current.filter(i => i.type === 'frame').length + 1}`,
        frameNotes: '',
        frameBgColor: 'rgba(26,29,39,0.5)',
      };
      setTempItem(newFrame);
      return;
    }

    // Check if clicking on an anchor point (connector tool)
    const targetName = e.target.getName();
    if (targetName?.startsWith('anchor-') && tool === 'connector') {
      const anchor = targetName.replace('anchor-', '') as AnchorPosition;
      // Find parent item
      const stage = stageRef.current;
      if (!stage) return;
      const pos = stage.getPointerPosition();
      if (!pos) return;
      // Find which item has this anchor position nearby
      const connectableItems = itemsRef.current.filter(i =>
        ['sticky', 'rect', 'circle', 'diamond', 'image', 'file', 'link', 'text'].includes(i.type)
      );
      for (const item of connectableItems) {
        const anchors = getAnchorPoints(item);
        const anchorPt = anchors[anchor];
        if (anchorPt && Math.hypot(anchorPt.x - pos.x, anchorPt.y - pos.y) < 15) {
          setConnectingFrom({ itemId: item.id, anchor });
          connectingFromRef.current = { itemId: item.id, anchor };
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
    const clickedOnSticky = e.target.findAncestor(node => node.getName() === 'sticky-group');
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
          const newConnector: DrawItem = {
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
            opacity: 0.85,
          };
          setItems(prev => {
            const next = [...prev, newConnector];
            requestAnimationFrame(() => pushHistory(next));
            return next;
          });
          setConnectingFrom(null);
          connectingFromRef.current = null;
          setTempConnectorEnd(null);
          isDrawing.current = false;
          return;
        }
        // Start connecting
        setConnectingFrom({ itemId: stickyId, anchor: nearestAnchor });
        connectingFromRef.current = { itemId: stickyId, anchor: nearestAnchor };
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
        const clickedItem = itemsRef.current.find(i => i.id === clickedId);
        if (clickedItem && ['rect', 'circle', 'diamond', 'image', 'file', 'link', 'text'].includes(clickedItem.type)) {
          const nearestAnchor = findNearestAnchor(clickedId, pos);
          if (nearestAnchor) {
            if (connectingFromRef.current && connectingFromRef.current.itemId !== clickedId) {
              const newConnector: DrawItem = {
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
                opacity: 0.85,
              };
              setItems(prev => {
                const next = [...prev, newConnector];
                requestAnimationFrame(() => pushHistory(next));
                return next;
              });
              setConnectingFrom(null);
              connectingFromRef.current = null;
              setTempConnectorEnd(null);
              isDrawing.current = false;
              return;
            }
            setConnectingFrom({ itemId: clickedId, anchor: nearestAnchor });
            connectingFromRef.current = { itemId: clickedId, anchor: nearestAnchor };
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
      setTextInput({ visible: true, x: pos.x, y: pos.y });
      setTextValue('');
      setTimeout(() => textAreaRef.current?.focus(), 50);
      return;
    }

    if (tool === 'sticky') {
      // Create a new sticky note at click position
      const sc = STICKY_COLORS[stickyColorIdx];
      const newItem: DrawItem = {
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
        stickyTextColor: sc.text,
      };
      setItems(prev => {
        const next = [...prev, newItem];
        requestAnimationFrame(() => pushHistory(next));
        return next;
      });
      // Immediately start editing the text
      setEditingStickyId(newItem.id);
      setEditingStickyText('');
      setTimeout(() => stickyEditRef.current?.focus(), 80);
      return;
    }

    isDrawing.current = true;

    if (tool === 'pen' || tool === 'highlighter' || tool === 'eraser') {
      const isHighlighter = tool === 'highlighter';
      const isEraser = tool === 'eraser';
      const newPoints = [pos.x, pos.y, pos.x, pos.y];
      currentPoints.current = newPoints;

      const newItem: DrawItem = {
        id: generateId(),
        type: 'line',
        points: [...newPoints],
        strokeColor: isEraser ? CANVAS_BG : color,
        fillColor: 'transparent',
        strokeWidth: isEraser ? brushSize * 4 : isHighlighter ? brushSize * 5 : brushSize,
        opacity: isHighlighter ? 0.35 : 1,
        globalCompositeOperation: isEraser ? 'destination-out' as GlobalCompositeOperation : undefined,
        dash: undefined,
      };
      setTempItem(newItem);
    } else {
      // Shape tools: rectangle, circle, line, arrow
      drawStart.current = pos;
    }
  }, [tool, color, brushSize, getPointerPos, textInput, editingStickyId, stickyColorIdx, pushHistory, connectorStyle, connectorArrowhead, findNearestAnchor]);

  const handleMouseMove = useCallback((e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    // Broadcast cursor position (throttled to 15fps)
    if (onCursorMove) {
      const now = Date.now();
      if (now - lastCursorBroadcastRef.current >= CURSOR_BROADCAST_INTERVAL) {
        lastCursorBroadcastRef.current = now;
        const pos = getPointerPos();
        if (pos) {
          onCursorMove({ x: pos.x, y: pos.y, tool });
        }
      }
    }

    // Handle pinch-to-zoom
    const touchEvt = e.evt as TouchEvent;
    if (touchEvt.touches && touchEvt.touches.length === 2) {
      const t1 = { x: touchEvt.touches[0].clientX, y: touchEvt.touches[0].clientY };
      const t2 = { x: touchEvt.touches[1].clientX, y: touchEvt.touches[1].clientY };
      const dist = Math.hypot(t2.x - t1.x, t2.y - t1.y);
      const center = { x: (t1.x + t2.x) / 2, y: (t1.y + t2.y) / 2 };

      if (lastTouchDistRef.current !== null) {
        const scaleRatio = dist / lastTouchDistRef.current;
        const oldScale = zoomLevelRef.current;
        const newScale = Math.max(0.1, Math.min(5, oldScale * scaleRatio));

        const containerRect = containerRef.current?.getBoundingClientRect();
        if (containerRect) {
          const pointer = { x: center.x - containerRect.left, y: center.y - containerRect.top };
          const mousePointTo = {
            x: (pointer.x - stagePosRef.current.x) / oldScale,
            y: (pointer.y - stagePosRef.current.y) / oldScale,
          };
          setStagePos({
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
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
        y: panStartRef.current.stageY + dy,
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
      const clickedOnSticky = e.target.findAncestor(node => node.getName() === 'sticky-group');
      if (clickedOnSticky) {
        setHoveredItemId(clickedOnSticky.getId());
      } else {
        const targetId = e.target.getId();
        if (targetId) {
          const item = itemsRef.current.find(i => i.id === targetId);
          if (item && ['rect', 'circle', 'diamond', 'image', 'file', 'link', 'text'].includes(item.type)) {
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
      const clickedOnSticky = e.target.findAncestor(node => node.getName() === 'sticky-group');
      if (clickedOnSticky) {
        setHoveredItemId(clickedOnSticky.getId());
      } else {
        const targetId = e.target.getId();
        if (targetId) {
          const item = itemsRef.current.find(i => i.id === targetId);
          if (item && ['rect', 'circle', 'diamond', 'image', 'file', 'link', 'text'].includes(item.type)) {
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
        const newPoint: LaserTrailPoint = { x: pos.x, y: pos.y, timestamp: Date.now() };
        setLaserTrail(prev => [...prev.slice(-LASER_TRAIL_MAX_POINTS), newPoint]);
        // Broadcast (throttled)
        if (onLaserMove) {
          const now = Date.now();
          if (now - lastLaserBroadcastRef.current >= LASER_BROADCAST_INTERVAL) {
            lastLaserBroadcastRef.current = now;
            onLaserMove({ x: pos.x, y: pos.y });
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
      setItems(prev => prev.map(item =>
        item.id === stickyId ? { ...item, width: newW, height: newH } : item
      ));
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
      setTempItem(prev => {
        if (!prev) return null;
        return { ...prev, x, y, width: w, height: h };
      });
      return;
    }

    if (tool === 'pen' || tool === 'highlighter' || tool === 'eraser') {
      // Append point to current line
      currentPoints.current = [...currentPoints.current, pos.x, pos.y];
      setTempItem(prev => {
        if (!prev) return prev;
        return { ...prev, points: [...currentPoints.current] };
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
          opacity: 1,
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
          opacity: 1,
        });
      } else if (tool === 'line') {
        setTempItem({
          id: 'temp-shape',
          type: 'line',
          points: [sx, sy, pos.x, pos.y],
          strokeColor: color,
          fillColor: 'transparent',
          strokeWidth: brushSize,
          opacity: 1,
        });
      } else if (tool === 'arrow') {
        setTempItem({
          id: 'temp-shape',
          type: 'arrow',
          points: [sx, sy, pos.x, pos.y],
          strokeColor: color,
          fillColor: color,
          strokeWidth: brushSize,
          opacity: 1,
        });
      }
    }
  }, [tool, color, brushSize, getPointerPos, onCursorMove]);

  const handleMouseUp = useCallback((e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    // Reset pinch-to-zoom state on touch end
    const touchEvt = e.evt as TouchEvent;
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
        const anchor = targetName.replace('anchor-', '') as AnchorPosition;
        const stage = stageRef.current;
        if (stage) {
          const pos = stage.getPointerPosition();
          if (pos) {
            const connectableItems = itemsRef.current.filter(i =>
              ['sticky', 'rect', 'circle', 'diamond', 'image', 'file', 'link', 'text'].includes(i.type)
            );
            for (const item of connectableItems) {
              if (item.id === connectingFromRef.current.itemId) continue;
              const anchors = getAnchorPoints(item);
              const anchorPt = anchors[anchor];
              if (anchorPt && Math.hypot(anchorPt.x - pos.x, anchorPt.y - pos.y) < 15) {
                const newConnector: DrawItem = {
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
                  opacity: 0.85,
                };
                setItems(prev => {
                  const next = [...prev, newConnector];
                  requestAnimationFrame(() => pushHistory(next));
                  return next;
                });
                break;
              }
            }
          }
        }
      } else {
        // Check if releasing on a sticky or other connectable element
        const clickedOnSticky = e.target.findAncestor(node => node.getName() === 'sticky-group');
        const targetId = clickedOnSticky ? clickedOnSticky.getId() : e.target.getId();
        if (targetId && targetId !== connectingFromRef.current.itemId) {
          const targetItem = itemsRef.current.find(i => i.id === targetId);
          if (targetItem && ['sticky', 'rect', 'circle', 'diamond', 'image', 'file', 'link', 'text'].includes(targetItem.type)) {
            const stage = stageRef.current;
            const pos = stage?.getPointerPosition();
            if (pos) {
              const nearestAnchor = findNearestAnchor(targetId, pos);
              if (nearestAnchor) {
                const newConnector: DrawItem = {
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
                  opacity: 0.85,
                };
                setItems(prev => {
                  const next = [...prev, newConnector];
                  requestAnimationFrame(() => pushHistory(next));
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
      requestAnimationFrame(() => pushHistory(nextItems));
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
        setItems(prev => {
          const next = [...prev, tempItem];
          requestAnimationFrame(() => pushHistory(next));
          return next;
        });
      }
      setTempItem(null);
      drawStart.current = null;
      return;
    }

    if (tempItem) {
      const newItem = { ...tempItem, id: generateId() };
      setItems(prev => {
        const next = [...prev, newItem];
        // Push to history after state update
        requestAnimationFrame(() => pushHistory(next));
        return next;
      });

      // Shape recognition: check if pen/highlighter stroke resembles a known shape
      if (shapeRecognitionEnabled && (tool === 'pen' || tool === 'highlighter') && newItem.points && newItem.points.length >= 16) {
        const result = recognizeShape(newItem.points);
        if (result && result.shape && result.confidence >= 0.5) {
          const shapeNames: Record<string, string> = {
            circle: 'Circle',
            rect: 'Rectangle',
            triangle: 'Triangle',
            diamond: 'Diamond',
            arrow: 'Arrow',
          };
          const shapeName = shapeNames[result.shape!] || result.shape!;

          // Build the replacement DrawItem with inherited properties
          const replacement: DrawItem = {
            id: generateId(),
            type: (result.drawItem.type as DrawItem['type']) || 'circle',
            strokeColor: newItem.strokeColor,
            fillColor: result.drawItem.fillColor || 'transparent',
            strokeWidth: newItem.strokeWidth,
            opacity: newItem.opacity,
            ...result.drawItem,
          } as DrawItem;

          // Fix: for arrow type, fillColor should match strokeColor
          if (replacement.type === 'arrow') {
            replacement.fillColor = replacement.strokeColor;
          }

          // Calculate center position for the toast
          const pts = newItem.points;
          let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
          for (let i = 0; i < pts.length - 1; i += 2) {
            if (pts[i] < minX) minX = pts[i];
            if (pts[i + 1] < minY) minY = pts[i + 1];
            if (pts[i] > maxX) maxX = pts[i];
            if (pts[i + 1] > maxY) maxY = pts[i + 1];
          }
          const toastPos = { x: (minX + maxX) / 2, y: Math.min(minY, minY - 30) };

          setShapeSuggestion({
            shapeName,
            confidence: result.confidence,
            freeformId: newItem.id,
            replacementItem: replacement,
            position: toastPos,
          });

          // Auto-dismiss after 4 seconds
          setTimeout(() => {
            setShapeSuggestion(prev => prev?.freeformId === newItem.id ? null : prev);
          }, 4000);
        }
      }

      setTempItem(null);
    }

    drawStart.current = null;
    currentPoints.current = [];
  }, [tempItem, pushHistory, tool, connectorStyle, connectorArrowhead, color, findNearestAnchor, shapeRecognitionEnabled]);

  const handleMouseLeave = useCallback(() => {
    if (isDrawing.current) {
      handleMouseUp({} as any);
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
  }, [handleMouseUp, onCursorLeave, onLaserStop]);

  /* ── Text input commit ── */
  const commitText = useCallback(() => {
    if (!textInput || !textValue.trim()) {
      setTextInput(null);
      setTextValue('');
      return;
    }
    const newItem: DrawItem = {
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
      fontFamily: 'Arial',
    };
    setItems(prev => {
      const next = [...prev, newItem];
      requestAnimationFrame(() => pushHistory(next));
      return next;
    });
    setTextInput(null);
    setTextValue('');
  }, [textInput, textValue, color, pushHistory]);

  useEffect(() => {
    if (!textInput?.visible) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        commitText();
      } else if (e.key === 'Escape') {
        setTextInput(null);
        setTextValue('');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [textInput, commitText]);

  /* ── Sticky note handlers already declared above ── */

  /* ── Clear canvas ── */
  const clearCanvas = useCallback(() => {
    setItems([]);
    setTempItem(null);
    pushHistory([]);
    onSave('');
    toast.success('Canvas cleared');
  }, [onSave, pushHistory]);

  /* ── Export to PNG ── */
  const captureCanvas = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const dataUrl = stage.toDataURL({ pixelRatio: 2 });
    onSave(dataUrl);
    toast.success('Captured! Tap Send to share.');
  }, [onSave]);

  /* ── Apply template ── */
  const applyTemplate = useCallback((templateItems: DrawItem[]) => {
    setItems(templateItems);
    setTempItem(null);
    pushHistory(templateItems);
    setShowTemplatePanel(false);
    toast.success('Template applied!');
  }, [pushHistory]);

  /* ── Anchor click handler ── */
  const handleAnchorClick = useCallback((itemId: string, anchor: AnchorPosition) => {
    if (connectingFromRef.current) {
      // Complete the connection
      if (connectingFromRef.current.itemId !== itemId) {
        const newConnector: DrawItem = {
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
          opacity: 0.85,
        };
        setItems(prev => {
          const next = [...prev, newConnector];
          requestAnimationFrame(() => pushHistory(next));
          return next;
        });
      }
      setConnectingFrom(null);
      connectingFromRef.current = null;
      setTempConnectorEnd(null);
    } else {
      // Start connecting
      setConnectingFrom({ itemId, anchor });
      connectingFromRef.current = { itemId, anchor };
      isDrawing.current = true;
    }
  }, [connectorStyle, connectorArrowhead, color, pushHistory]);

  /* ── Recording: Create composite stream ── */
  const createCompositeStream = useCallback((stage: Konva.Stage, mic: MediaStream | null): MediaStream => {
    const stageCanvas = stage.toCanvas({ pixelRatio: 1 });
    const w = stageCanvas.width;
    const h = stageCanvas.height;

    // Create offscreen composite canvas for recording
    const compositeCanvas = document.createElement('canvas');
    compositeCanvas.width = w;
    compositeCanvas.height = h;
    const ctx = compositeCanvas.getContext('2d')!;
    compositeCanvasRef.current = compositeCanvas;
    compositeCtxRef.current = ctx;

    // Canvas capture stream at target FPS
    const fps = 15;
    const canvasStream = compositeCanvas.captureStream(fps);
    canvasStreamRef.current = canvasStream;

    // Composite loop: draw current stage every frame
    let lastDrawTime = 0;
    const frameInterval = 1000 / fps;

    const drawFrame = (now: number) => {
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
        const currentCanvas = stage.toCanvas({ pixelRatio: 1 });
        ctx.drawImage(currentCanvas, 0, 0, w, h);
      } catch {
        // Stage might be unmounted
      }

      animFrameRef.current = requestAnimationFrame(drawFrame);
    };

    animFrameRef.current = requestAnimationFrame(drawFrame);

    // Combine video tracks with audio tracks
    const tracks: MediaStreamTrack[] = [...canvasStream.getVideoTracks()];
    if (mic) {
      tracks.push(...mic.getAudioTracks());
    }

    return new MediaStream(tracks);
  }, []);

  /* ── Recording: Cleanup ── */
  const cleanupRecording = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = 0;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (canvasStreamRef.current) {
      canvasStreamRef.current.getTracks().forEach(t => t.stop());
      canvasStreamRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(t => t.stop());
      micStreamRef.current = null;
    }
    compositeCanvasRef.current = null;
    compositeCtxRef.current = null;
    mediaRecorderRef.current = null;
    chunksRef.current = [];
    setRecStatus('idle');
    setRecDuration(0);
  }, []);

  /* ── Cleanup on unmount ── */
  useEffect(() => {
    return () => {
      cleanupRecording();
    };
  }, [cleanupRecording]);

  /* ── Recording: Start ── */
  const startRecording = useCallback(async () => {
    const stage = stageRef.current;
    if (!stage) {
      toast.error('Canvas not ready');
      return;
    }

    try {
      // Request microphone permission
      let mic: MediaStream | null = null;
      try {
        mic = await navigator.mediaDevices.getUserMedia({ audio: true });
        micStreamRef.current = mic;
      } catch {
        toast('Microphone unavailable — recording without audio', { icon: '🎤' });
      }

      const compositeStream = createCompositeStream(stage, mic);

      // Determine MIME type
      const mimeTypes = [
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'video/webm',
      ];
      const mimeType = mimeTypes.find(mt => {
        try { return MediaRecorder.isTypeSupported(mt); } catch { return false; }
      }) || '';

      const recorder = new MediaRecorder(compositeStream, {
        mimeType: mimeType || undefined,
        videoBitsPerSecond: 2_500_000,
        audioBitsPerSecond: 128000,
      });

      chunksRef.current = [];
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onerror = () => {
        toast.error('Recording failed');
        cleanupRecording();
      };

      recorder.start(1000);
      recStartRef.current = Date.now();
      pausedDurationRef.current = 0;

      // Timer
      timerRef.current = setInterval(() => {
        const elapsed = Date.now() - recStartRef.current - pausedDurationRef.current;
        setRecDuration(elapsed);
      }, 200);

      setRecStatus('recording');
      toast.success('Recording started');
    } catch (err: any) {
      toast.error(err.message || 'Failed to start recording');
    }
  }, [createCompositeStream, cleanupRecording]);

  /* ── Recording: Pause ── */
  const pauseRecording = useCallback(() => {
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

  /* ── Recording: Resume ── */
  const resumeRecording = useCallback(() => {
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

        const drawFrame = (now: number) => {
          if (now - lastDrawTime < frameInterval) {
            animFrameRef.current = requestAnimationFrame(drawFrame);
            return;
          }
          lastDrawTime = now;
          try {
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = CANVAS_BG;
            ctx.fillRect(0, 0, w, h);
            const currentCanvas = stage.toCanvas({ pixelRatio: 1 });
            ctx.drawImage(currentCanvas, 0, 0, w, h);
          } catch { /* ignore */ }
          animFrameRef.current = requestAnimationFrame(drawFrame);
        };
        animFrameRef.current = requestAnimationFrame(drawFrame);
      }

      setRecStatus('recording');
    }
  }, []);

  /* ── Recording: Stop ── */
  const stopRecording = useCallback(() => {
    return new Promise<void>((resolve) => {
      const recorder = mediaRecorderRef.current;
      if (!recorder || recorder.state === 'inactive') {
        cleanupRecording();
        resolve();
        return;
      }

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'video/webm' });
        const url = URL.createObjectURL(blob);

        if (onRecordingComplete) {
          onRecordingComplete(blob, url);
        }

        cleanupRecording();
        toast.success(`Recording saved (${formatTimer(recDuration)})`);
        resolve();
      };

      recorder.stop();
    });
  }, [onRecordingComplete, recDuration, cleanupRecording]);

  /* ── Cursor style for canvas ── */
  const cursorStyle = useMemo(() => {
    if (isPanning) return 'grabbing';
    if (spaceHeld) return 'grab';
    return TOOL_CONFIG[tool]?.cursor || 'default';
  }, [tool, isPanning, spaceHeld]);

  /* ── Helper: world position to screen position ── */
  const worldToScreen = useCallback((wx: number, wy: number): { x: number; y: number } => {
    return {
      x: wx * zoomLevel + stagePos.x,
      y: wy * zoomLevel + stagePos.y,
    };
  }, [zoomLevel, stagePos]);

  /* ── Zoom preset handler ── */
  const zoomToLevel = useCallback((newZoom: number) => {
    // Zoom centered on canvas center
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    const oldScale = zoomLevelRef.current;
    const mousePointTo = {
      x: (centerX - stagePosRef.current.x) / oldScale,
      y: (centerY - stagePosRef.current.y) / oldScale,
    };

    setStagePos({
      x: centerX - mousePointTo.x * newZoom,
      y: centerY - mousePointTo.y * newZoom,
    });
    setZoomLevel(newZoom);
  }, [dimensions]);

  /* ── Fit to content ── */
  const fitToContent = useCallback(() => {
    if (items.length === 0) {
      zoomToLevel(1);
      return;
    }
    // Calculate bounding box of all items
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    items.forEach(item => {
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
        for (let i = 0; i < pts.length; i += 2) {
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
      y: dimensions.height / 2 - contentCenterY * newZoom,
    });
    setZoomLevel(newZoom);
  }, [items, dimensions, zoomToLevel]);

  /* ── Fit to frame ── */
  const fitToFrame = useCallback((frameId: string) => {
    const frame = items.find(i => i.id === frameId);
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
      y: dimensions.height / 2 - (fy + fh / 2) * newZoom,
    });
    setZoomLevel(newZoom);
  }, [items, dimensions]);

  /* ── Export frame as PNG ── */
  const exportFrameAsPng = useCallback(async (frameId: string) => {
    const frame = items.find(i => i.id === frameId);
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
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = `${frame.frameTitle || 'frame'}.png`;
      link.href = dataUrl;
      link.click();
      toast.success('Frame exported as PNG');
    } catch (err) {
      console.error('Export failed:', err);
      toast.error('Failed to export frame');
    }
  }, [items]);

  /* ── Export all frames as PDF ── */
  const exportAllFramesAsPdf = useCallback(async () => {
    if (frameItems.length === 0) return;
    const stage = stageRef.current;
    if (!stage) return;

    try {
      const { jsPDF } = await import('jspdf');
      const firstFrame = frameItems[0];
      const fw = firstFrame.width || 800;
      const fh = firstFrame.height || 600;
      const orientation = fw > fh ? 'landscape' : 'portrait';
      const pdf = new jsPDF({ orientation, unit: 'px', format: [fw, fh] });

      for (let i = 0; i < frameItems.length; i++) {
        if (i > 0) {
          const f = frameItems[i];
          const fW = f.width || 800;
          const fH = f.height || 600;
          const orient = fW > fH ? 'landscape' : 'portrait';
          pdf.addPage([fW, fH], orient);
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
          pixelRatio: 2,
        });

        pdf.addImage(dataUrl, 'PNG', 0, 0, fW, fH);
      }

      pdf.save('whiteboard-frames.pdf');
      toast.success(`Exported ${frameItems.length} frames as PDF`);
    } catch (err) {
      console.error('PDF export failed:', err);
      toast.error('Failed to export PDF');
    }
  }, [frameItems]);

  /* ── Comprehensive PDF Export ── */
  const performPdfExport = useCallback(async (config: PdfExportConfig) => {
    const stage = stageRef.current;
    if (!stage) return;

    setPdfExporting(true);
    setPdfExportProgress(0);

    try {
      const { jsPDF } = await import('jspdf');

      const pageDim = config.pageSize === 'custom'
        ? { w: config.customWidth, h: config.customHeight }
        : PDF_PAGE_SIZES[config.pageSize];
      const pageW = config.orientation === 'landscape' ? Math.max(pageDim.w, pageDim.h) : pageDim.w;
      const pageH = config.orientation === 'landscape' ? Math.min(pageDim.w, pageDim.h) : pageDim.h;
      const margin = config.margin;
      const contentW = pageW - margin * 2;
      const contentH = pageH - margin * 2;

      // Determine pages to render
      type PageDef = { items: DrawItem[]; bounds: { x: number; y: number; w: number; h: number }; title: string; bgColor: string };
      const pages: PageDef[] = [];

      if (config.framesAsPages && frameItems.length > 0) {
        // Each frame is a page
        for (const frame of frameItems) {
          const fx = frame.x || 0, fy = frame.y || 0;
          const fw = frame.width || 800, fh = frame.height || 600;
          const childItems = items.filter(item => item.id !== frame.id && item.type !== 'frame' && isItemInFrame(item, frame));
          pages.push({
            items: childItems,
            bounds: { x: fx, y: fy, w: fw, h: fh },
            title: frame.frameTitle || 'Slide',
            bgColor: frame.frameBgColor || CANVAS_BG,
          });
        }
        // Also add orphan items as a page if any
        const orphanItems = items.filter(item =>
          item.type !== 'frame' && item.type !== 'connector' &&
          !frameItems.some(frame => isItemInFrame(item, frame))
        );
        if (orphanItems.length > 0) {
          let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
          for (const item of orphanItems) {
            const b = getItemBounds(item);
            if (b) { minX = Math.min(minX, b.x); minY = Math.min(minY, b.y); maxX = Math.max(maxX, b.x + b.w); maxY = Math.max(maxY, b.y + b.h); }
          }
          if (minX !== Infinity) {
            pages.push({
              items: orphanItems,
              bounds: { x: minX - 20, y: minY - 20, w: maxX - minX + 40, h: maxY - minY + 40 },
              title: 'Unframed Content',
              bgColor: CANVAS_BG,
            });
          }
        }
      } else {
        // All content on pages
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        const renderableItems = items.filter(i => i.type !== 'frame');
        for (const item of renderableItems) {
          const b = getItemBounds(item);
          if (b) { minX = Math.min(minX, b.x); minY = Math.min(minY, b.y); maxX = Math.max(maxX, b.x + b.w); maxY = Math.max(maxY, b.y + b.h); }
        }
        if (minX === Infinity) { minX = 0; minY = 0; maxX = 800; maxY = 600; }
        const padding = 40;
        pages.push({
          items: renderableItems,
          bounds: { x: minX - padding, y: minY - padding, w: maxX - minX + padding * 2, h: maxY - minY + padding * 2 },
          title: 'Whiteboard',
          bgColor: CANVAS_BG,
        });
      }

      const pdf = new jsPDF({ orientation: config.orientation, unit: 'pt', format: [pageW, pageH] });

      for (let pi = 0; pi < pages.length; pi++) {
        if (pi > 0) pdf.addPage([pageW, pageH], config.orientation);
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
          for (let gx = margin; gx < pageW - margin; gx += gridSpacing) {
            for (let gy = margin; gy < pageH - margin; gy += gridSpacing) {
              pdf.circle(gx, gy, dotR, 'F');
            }
          }
        }

        if (config.quality === 'vector') {
          // Vector rendering
          const offsetX = margin + (contentW - b.w * scale) / 2 - b.x * scale;
          const offsetY = margin + (contentH - b.h * scale) / 2 - b.y * scale;

          for (const item of page.items) {
            renderDrawItemToPdf(pdf, item, items, scale, offsetX, offsetY);
          }
        } else {
          // Raster rendering via Konva screenshot
          const dataUrl = stage.toDataURL({
            x: b.x,
            y: b.y,
            width: b.w,
            height: b.h,
            pixelRatio: 2,
          });
          const imgX = margin + (contentW - b.w * scale) / 2;
          const imgY = margin + (contentH - b.h * scale) / 2;
          pdf.addImage(dataUrl, 'PNG', imgX, imgY, b.w * scale, b.h * scale);
        }

        // Page number footer
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`${page.title} — ${pi + 1} / ${pages.length}`, pageW / 2, pageH - 8, { align: 'center' });

        setPdfExportProgress(((pi + 1) / pages.length) * 100);
        // Yield to UI
        await new Promise(r => setTimeout(r, 10));
      }

      pdf.save('whiteboard-export.pdf');
      toast.success(`PDF exported: ${pages.length} page${pages.length > 1 ? 's' : ''} (${config.quality})`);
    } catch (err) {
      console.error('PDF export failed:', err);
      toast.error('Failed to export PDF');
    } finally {
      setPdfExporting(false);
      setPdfExportProgress(0);
      setShowPdfExportDialog(false);
    }
  }, [items, frameItems, isItemInFrame, dimensions]);

  /* ── Minimap jump handler ── */
  const handleMinimapJump = useCallback((worldX: number, worldY: number) => {
    setStagePos({
      x: dimensions.width / 2 - worldX * zoomLevelRef.current,
      y: dimensions.height / 2 - worldY * zoomLevelRef.current,
    });
  }, [dimensions]);

  /* ── Render items with background ── */
  const connectorItems = useMemo(() => {
    return items.filter(i => i.type === 'connector');
  }, [items]);

  const regularItems = useMemo(() => {
    return items.filter(i => i.type !== 'sticky' && i.type !== 'connector' && i.type !== 'frame' && i.type !== 'image' && i.type !== 'file' && i.type !== 'link');
  }, [items]);

  const stickyItems = useMemo(() => {
    return items.filter(i => i.type === 'sticky');
  }, [items]);

  // Items that can have anchor points
  const connectableItems = useMemo(() => {
    return items.filter(i => ['sticky', 'rect', 'circle', 'diamond', 'image', 'file', 'link', 'text', 'frame'].includes(i.type));
  }, [items]);

  // Build temporary connector preview line
  const tempConnectorPreview = useMemo(() => {
    if (!connectingFrom || !tempConnectorEnd) return null;
    const sourceItem = items.find(i => i.id === connectingFrom.itemId);
    if (!sourceItem) return null;
    const sourceAnchors = getAnchorPoints(sourceItem);
    const sp = sourceAnchors[connectingFrom.anchor];
    if (!sp) return null;
    const points = buildConnectorPath(sp.x, sp.y, connectingFrom.anchor, tempConnectorEnd.x, tempConnectorEnd.y, 'left', connectorStyle);
    return points;
  }, [connectingFrom, tempConnectorEnd, items, connectorStyle]);

  const renderedItems = useMemo(() => {
    return (
      <>
        {/* Background rect - large for infinite canvas feel */}
        <Rect
          x={-5000}
          y={-5000}
          width={10000}
          height={10000}
          fill={CANVAS_BG}
          listening={false}
        />
        {/* Visible workspace boundary */}
        <Rect
          x={-2000}
          y={-2000}
          width={4000}
          height={4000}
          stroke="rgba(255,255,255,0.03)"
          strokeWidth={1}
          fill="transparent"
          listening={false}
        />
        {/* All committed non-sticky, non-connector items */}
        {regularItems.map(item => {
          const isVotingCandidate = !!activeVoteConfig?.candidateItemIds.includes(item.id);
          const voteCount = voteTallies[item.id] || 0;
          const voteRankIdx = rankedResults.findIndex(r => r.itemId === item.id);
          const voteRank = voteRankIdx >= 0 ? voteRankIdx + 1 : null;
          const hasLocalVote = localUserVotes.includes(item.id);
          if (!isVotingCandidate || votingPhase === 'idle') {
            return <RenderDrawItem key={item.id} item={item} />;
          }
          // For voting candidates that aren't sticky (rect, circle, text, etc.), add vote overlays
          return (
            <Group key={item.id}>
              <RenderDrawItem item={item} />
              {/* Vote candidate highlight */}
              {votingPhase === 'active' && (
                <Rect
                  x={item.type === 'rect' ? (item.x || 0) : item.type === 'circle' ? (item.x || 0) - (item.radius || 0) : (item.x || 0)}
                  y={item.type === 'rect' ? (item.y || 0) : item.type === 'circle' ? (item.y || 0) - (item.radius || 0) : (item.y || 0) - 4}
                  width={item.type === 'rect' ? (item.width || 0) : item.type === 'circle' ? (item.radius || 0) * 2 : (item.text || '').length * (item.fontSize || 18) * 0.55}
                  height={item.type === 'rect' ? (item.height || 0) : item.type === 'circle' ? (item.radius || 0) * 2 : (item.fontSize || 18) * 1.4}
                  stroke={hasLocalVote ? '#f59e0b' : '#fbbf24'}
                  strokeWidth={hasLocalVote ? 3 : 2}
                  dash={hasLocalVote ? undefined : [8, 4]}
                  cornerRadius={4}
                  listening={false}
                  opacity={hasLocalVote ? 0.9 : 0.5}
                />
              )}
              {/* Vote count badge */}
              {(votingPhase === 'active' || votingPhase === 'ended') && voteCount > 0 && (() => {
                const badgeX = item.type === 'rect' ? (item.x || 0) - 6 : item.type === 'circle' ? (item.x || 0) - (item.radius || 0) - 6 : (item.x || 0) - 6;
                const badgeY = item.type === 'rect' ? (item.y || 0) - 6 : item.type === 'circle' ? (item.y || 0) - (item.radius || 0) - 6 : (item.y || 0) - 18;
                return (
                  <Group x={badgeX} y={badgeY}>
                    <Circle radius={12} fill={hasLocalVote ? '#f59e0b' : 'rgba(245,158,11,0.8)'} />
                    <KonvaText text={`${voteCount}`} fontSize={10} fill="white" fontStyle="bold" x={voteCount >= 10 ? -6 : -3} y={-4} listening={false} />
                  </Group>
                );
              })()}
              {/* Rank badge */}
              {votingPhase === 'ended' && voteRank !== null && voteRank <= 3 && (() => {
                const rx = item.type === 'rect' ? (item.x || 0) + (item.width || 0) - 4 : item.type === 'circle' ? (item.x || 0) + (item.radius || 0) - 8 : (item.x || 0) + (item.text || '').length * (item.fontSize || 18) * 0.55 - 4;
                const ry = item.type === 'rect' ? (item.y || 0) - 8 : item.type === 'circle' ? (item.y || 0) - (item.radius || 0) - 8 : (item.y || 0) - 18;
                return (
                  <Group x={rx} y={ry}>
                    <Circle radius={10} fill={voteRank === 1 ? '#f59e0b' : voteRank === 2 ? '#94a3b8' : '#cd7f32'} />
                    <KonvaText text={`${voteRank}`} fontSize={10} fill="white" fontStyle="bold" x={-3} y={-4} listening={false} />
                  </Group>
                );
              })()}
              {/* Click to vote */}
              {votingPhase === 'active' && !hasLocalVote && (() => {
                const cx = item.type === 'rect' ? (item.x || 0) : item.type === 'circle' ? (item.x || 0) - (item.radius || 0) : (item.x || 0);
                const cy = item.type === 'rect' ? (item.y || 0) : item.type === 'circle' ? (item.y || 0) - (item.radius || 0) : (item.y || 0) - 4;
                const cw = item.type === 'rect' ? (item.width || 0) : item.type === 'circle' ? (item.radius || 0) * 2 : (item.text || '').length * (item.fontSize || 18) * 0.55;
                const ch = item.type === 'rect' ? (item.height || 0) : item.type === 'circle' ? (item.radius || 0) * 2 : (item.fontSize || 18) * 1.4;
                return (
                  <Rect
                    x={cx} y={cy} width={cw} height={ch}
                    fill="transparent"
                    onClick={(e) => { e.cancelBubble = true; castVote(item.id); }}
                    onTap={(e) => { e.cancelBubble = true; castVote(item.id); }}
                  />
                );
              })()}
            </Group>
          );
        })}
        {/* Connector items (rendered between regular items and stickies) */}
        {connectorItems.map(item => (
          <ConnectorShape
            key={item.id}
            item={item}
            allItems={items}
            isSelected={selectedConnectorId === item.id}
            onSelect={(id) => setSelectedConnectorId(id)}
            onDelete={handleConnectorDelete}
          />
        ))}
        {/* Image items */}
        {items.filter(i => i.type === 'image').map(item => (
          <ImageShape
            key={item.id}
            item={item}
            isSelected={selectedEmbedId === item.id}
            onSelect={(id) => setSelectedEmbedId(id)}
            onDragEnd={handleEmbedDragEnd}
            onResizeEnd={handleEmbedResizeEnd}
            onDelete={handleEmbedDelete}
          />
        ))}
        {/* File card items */}
        {items.filter(i => i.type === 'file').map(item => (
          <FileCardShape
            key={item.id}
            item={item}
            isSelected={selectedEmbedId === item.id}
            onSelect={(id) => setSelectedEmbedId(id)}
            onDragEnd={handleEmbedDragEnd}
            onDelete={handleEmbedDelete}
          />
        ))}
        {/* Link card items */}
        {items.filter(i => i.type === 'link').map(item => (
          <LinkCardShape
            key={item.id}
            item={item}
            isSelected={selectedEmbedId === item.id}
            onSelect={(id) => setSelectedEmbedId(id)}
            onDragEnd={handleEmbedDragEnd}
            onDelete={handleEmbedDelete}
          />
        ))}
        {/* Temporary item (being drawn) */}
        {tempItem && <RenderDrawItem item={tempItem} />}
        {/* Temporary connector preview */}
        {tempConnectorPreview && (
          <Line
            points={tempConnectorPreview}
            stroke={color}
            strokeWidth={2}
            dash={[6, 4]}
            opacity={0.6}
            lineCap="round"
            tension={connectorStyle === 'curved' ? 0.5 : 0}
          />
        )}
        {/* Anchor points overlay (connector tool only) */}
        {tool === 'connector' && connectableItems.map(item => {
          // Only show anchors for hovered item, or for all items when connecting
          const shouldShow = connectingFrom
            ? item.id !== connectingFrom.itemId
            : hoveredItemId === item.id;
          if (!shouldShow) return null;
          return (
            <AnchorPointsOverlay
              key={`anchors-${item.id}`}
              item={item}
              onAnchorClick={handleAnchorClick}
            />
          );
        })}
        {/* Sticky notes (rendered on top for interactivity) */}
        {stickyItems.map(item => (
          <StickyNoteShape
            key={item.id}
            item={item}
            isEditing={editingStickyId === item.id}
            isSelected={selectedStickyId === item.id}
            onDragEnd={handleStickyDragEnd}
            onDoubleClick={handleStickyDoubleClick}
            onDelete={handleStickyDelete}
            onResizeStart={handleStickyResizeStart}
            onSelect={handleStickySelect}
            voteCount={voteTallies[item.id] || 0}
            isVotingCandidate={!!activeVoteConfig?.candidateItemIds.includes(item.id)}
            hasLocalVote={localUserVotes.includes(item.id)}
            votingPhase={votingPhase}
            onCastVote={castVote}
            voteRank={rankedResults.findIndex(r => r.itemId === item.id) >= 0 ? rankedResults.findIndex(r => r.itemId === item.id) + 1 : null}
          />
        ))}
        {/* Anchor points for sticky notes when connector tool active */}
        {tool === 'connector' && stickyItems.map(item => {
          const shouldShow = connectingFrom
            ? item.id !== connectingFrom.itemId
            : hoveredItemId === item.id;
          if (!shouldShow) return null;
          return (
            <AnchorPointsOverlay
              key={`sticky-anchors-${item.id}`}
              item={item}
              onAnchorClick={handleAnchorClick}
            />
          );
        })}
        {/* Remote collaboration cursors */}
        {remoteCursors.map(cursor => (
          <RemoteCursorShape
            key={`remote-cursor-${cursor.userId}`}
            cursor={cursor}
          />
        ))}
        {/* Local laser pointer (when laser tool is active) */}
        {tool === 'laser' && laserTrail.length > 0 && (
          <LaserPointerShape
            points={laserTrail}
            color="#ff5757"
          />
        )}
        {/* Remote laser pointers from other collaborators */}
        {remoteLasers.map(rl => (
          <LaserPointerShape
            key={`remote-laser-${rl.userId}`}
            points={rl.points}
            color={rl.color}
            name={rl.userName}
          />
        ))}
        {/* Frame items (rendered on top, except in presentation mode they're hidden) */}
        {!isPresenting && frameItems.map(item => (
          <FrameShape
            key={item.id}
            item={item}
            isSelected={selectedFrameId === item.id}
            onSelect={handleFrameSelect}
            onDragEnd={handleFrameDragEnd}
            onDoubleClick={handleFrameDoubleClick}
            onDelete={handleFrameDelete}
            onResizeEnd={handleFrameResizeEnd}
          />
        ))}
        {/* Anchor points for frame items when connector tool active */}
        {tool === 'connector' && frameItems.map(item => {
          const shouldShow = connectingFrom
            ? item.id !== connectingFrom.itemId
            : hoveredItemId === item.id;
          if (!shouldShow) return null;
          return (
            <AnchorPointsOverlay
              key={`frame-anchors-${item.id}`}
              item={item}
              onAnchorClick={handleAnchorClick}
            />
          );
        })}
      </>
    );
  }, [regularItems, connectorItems, stickyItems, frameItems, tempItem, tempConnectorPreview, dimensions, editingStickyId, selectedStickyId, handleStickyDragEnd, handleStickyDoubleClick, handleStickyDelete, handleStickyResizeStart, handleStickySelect, selectedConnectorId, handleConnectorDelete, handleAnchorClick, tool, connectableItems, connectingFrom, hoveredItemId, items, color, connectorStyle, remoteCursors, laserTrail, remoteLasers, isPresenting, selectedFrameId, handleFrameSelect, handleFrameDragEnd, handleFrameDoubleClick, handleFrameDelete, handleFrameResizeEnd]);

  /* ═══════════════════════════════════════════════════════════ */
  /* ── Render ──                                              */
  /* ═══════════════════════════════════════════════════════════ */

  return (
    <div className="w-full h-full flex flex-col" style={{ background: 'var(--medq-bg, #0c0e14)' }}>
      {/* ═══ Top Header Bar ═══ */}
      <div
        className="flex items-center gap-2 px-3 py-2 flex-shrink-0"
        style={{
          background: 'rgba(21,24,33,0.95)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Back */}
        {onBack && (
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4 text-[#8b95a8]" />
          </button>
        )}

        {/* Title */}
        <div className="flex items-center gap-2 mr-2">
          <Pencil className="w-4 h-4 text-[#00e5a0]" />
          <span className="text-sm font-semibold text-[#e8ecf4]">Whiteboard</span>
        </div>

        {/* Templates Button */}
        <button
          onClick={() => setShowTemplatePanel(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
          style={{ background: 'rgba(0,229,160,0.1)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.15)' }}
          title="Open template library"
        >
          <LayoutTemplate className="w-3.5 h-3.5" /> Templates
        </button>

        {/* Layers Button */}
        <button
          onClick={() => setShowLayersPanel(prev => !prev)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${showLayersPanel ? 'ring-1 ring-[#8b5cf6]' : ''}`}
          style={{ background: showLayersPanel ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.06)', color: '#8b5cf6', border: `1px solid ${showLayersPanel ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.1)'}` }}
          title="Layers & Frames panel"
        >
          <Layers className="w-3.5 h-3.5" /> Layers
        </button>

        {/* Present Button */}
        {frameItems.length > 0 && (
          <button
            onClick={enterPresentation}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={{ background: 'rgba(139,92,246,0.12)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.2)' }}
            title="Enter presentation mode"
          >
            <Maximize2 className="w-3.5 h-3.5" /> Present
          </button>
        )}

        {/* AI Generate Button (Header) */}
        <button
          onClick={() => {
            setAiPromptMode('generate');
            setShowAiPrompt(true);
          }}
          disabled={aiLoading}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40"
          style={{ background: 'rgba(139,92,246,0.12)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.2)' }}
          title="AI Generate — Create canvas items from a description"
        >
          {aiLoading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5" />
          )}
          AI Generate
        </button>

        {/* Recording Timer */}
        {(recStatus === 'recording' || recStatus === 'paused') && (
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg" style={{ background: 'rgba(255,87,87,0.12)' }}>
            <div
              className={`w-2 h-2 rounded-full ${recStatus === 'recording' ? 'chat-wb-rec-pulse' : ''}`}
              style={{ background: recStatus === 'recording' ? '#ff5757' : '#f59e0b' }}
            />
            <span className="text-xs font-mono text-[#ff5757]">
              {formatTimer(recDuration)}
            </span>
            {recStatus === 'paused' && (
              <span className="text-[10px] text-[#f59e0b]">PAUSED</span>
            )}
          </div>
        )}

        <div className="flex-1" />

        {/* Undo */}
        <button
          onClick={undo}
          disabled={historyIndex < 0}
          className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="w-4 h-4 text-[#8b95a8]" />
        </button>

        {/* Redo */}
        <button
          onClick={redo}
          disabled={historyIndex >= history.length - 1}
          className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Redo (Ctrl+Y)"
        >
          <Redo2 className="w-4 h-4 text-[#8b95a8]" />
        </button>

        {/* Divider */}
        <div className="w-px h-5 mx-1" style={{ background: 'rgba(255,255,255,0.08)' }} />

        {/* Capture (PNG) */}
        <button
          onClick={captureCanvas}
          className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
          title="Capture as PNG"
        >
          <Camera className="w-4 h-4 text-[#4fc3f7]" />
        </button>

        {/* Export PDF */}
        <button
          onClick={() => setShowPdfExportDialog(true)}
          className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
          title="Export as PDF"
        >
          <FileOutput className="w-4 h-4 text-[#4fc3f7]" />
        </button>

        {/* Record button */}
        {recStatus === 'idle' && (
          <button
            onClick={startRecording}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={{ background: 'rgba(255,87,87,0.12)', color: '#ff5757', border: '1px solid rgba(255,87,87,0.2)' }}
            title="Start recording with audio"
          >
            <Video className="w-3.5 h-3.5" /> Rec
          </button>
        )}
        {recStatus === 'recording' && (
          <button
            onClick={pauseRecording}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' }}
            title="Pause recording"
          >
            <Pause className="w-3.5 h-3.5" /> Pause
          </button>
        )}
        {recStatus === 'paused' && (
          <button
            onClick={resumeRecording}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.2)' }}
            title="Resume recording"
          >
            <Play className="w-3.5 h-3.5" /> Resume
          </button>
        )}
        {(recStatus === 'recording' || recStatus === 'paused') && (
          <button
            onClick={stopRecording}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={{ background: 'rgba(255,87,87,0.15)', color: '#ff5757', border: '1px solid rgba(255,87,87,0.25)' }}
            title="Stop recording"
          >
            <VideoOff className="w-3.5 h-3.5" /> Stop
          </button>
        )}

        {/* Divider */}
        <div className="w-px h-5 mx-1" style={{ background: 'rgba(255,255,255,0.08)' }} />

        {/* Send */}
        {onSend && (
          <button
            onClick={onSend}
            disabled={sending || !hasCapturedData}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: 'rgba(0,229,160,0.15)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.2)' }}
            title="Send to chat"
          >
            {sending ? (
              <div className="w-3.5 h-3.5 border-2 border-[#00e5a0] border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            Send
          </button>
        )}
      </div>

      {/* ═══ Main Area: Left Toolbar + Canvas ═══ */}
      <div className="flex-1 flex min-h-0">
        {/* Left Toolbar */}
        <div
          className="flex flex-col items-center gap-1 p-1.5 flex-shrink-0"
          style={{
            background: 'rgba(21,24,33,0.95)',
            borderRight: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {(Object.keys(TOOL_CONFIG) as ToolType[]).map((t) => {
            const cfg = TOOL_CONFIG[t];
            const isActive = tool === t;
            return (
              <button
                key={t}
                onClick={() => {
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
                }}
                className={`p-2 rounded-lg transition-all ${
                  isActive ? (t === 'laser' ? 'ring-1 ring-[#ff5757]' : t === 'frame' ? 'ring-1 ring-[#8b5cf6]' : 'ring-1 ring-[#00e5a0]') : ''
                }`}
                style={{
                  background: isActive ? (t === 'laser' ? 'rgba(255,87,87,0.15)' : t === 'frame' ? 'rgba(139,92,246,0.12)' : 'rgba(0,229,160,0.12)') : 'transparent',
                  color: isActive ? (t === 'laser' ? '#ff5757' : t === 'frame' ? '#8b5cf6' : '#00e5a0') : '#8b95a8',
                }}
                title={cfg.label}
              >
                {cfg.icon}
              </button>
            );
          })}

          {/* Divider */}
          <div className="w-6 my-1" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />

          {/* AI Generate Button */}
          <button
            onClick={() => {
              setAiPromptMode('generate');
              setShowAiPrompt(true);
            }}
            className="p-2 rounded-lg hover:bg-[rgba(139,92,246,0.12)] transition-colors group"
            title="AI Generate — Create items from a description"
          >
            <Sparkles className="w-4 h-4 text-[#8b5cf6] group-hover:text-[#a78bfa]" />
          </button>

          {/* AI Cluster Button */}
          <button
            onClick={handleAiCluster}
            disabled={aiClusterLoading}
            className="p-2 rounded-lg hover:bg-[rgba(79,195,247,0.12)] transition-colors group disabled:opacity-40 disabled:cursor-not-allowed"
            title="AI Cluster — Auto-group nearby sticky notes"
          >
            {aiClusterLoading ? (
              <Loader2 className="w-4 h-4 text-[#4fc3f7] animate-spin" />
            ) : (
              <GroupIcon className="w-4 h-4 text-[#4fc3f7] group-hover:text-[#81d4fa]" />
            )}
          </button>

          {/* AI Summarize Button */}
          <button
            onClick={handleAiSummarize}
            disabled={aiSummarizeLoading}
            className="p-2 rounded-lg hover:bg-[rgba(245,158,11,0.12)] transition-colors group disabled:opacity-40 disabled:cursor-not-allowed"
            title="AI Summarize — Generate a summary of canvas text"
          >
            {aiSummarizeLoading ? (
              <Loader2 className="w-4 h-4 text-[#f59e0b] animate-spin" />
            ) : (
              <SummarizeIcon className="w-4 h-4 text-[#f59e0b] group-hover:text-[#fbbf24]" />
            )}
          </button>

          {/* Divider */}
          <div className="w-6 my-1" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />

          {/* Vote Button */}
          <button
            onClick={() => {
              if (votingPhase === 'idle') {
                setVotingPhase('configuring');
              }
            }}
            disabled={votingPhase !== 'idle'}
            className={`p-2 rounded-lg transition-colors group disabled:opacity-40 disabled:cursor-not-allowed ${votingPhase !== 'idle' ? 'ring-1 ring-[#f59e0b]' : ''}`}
            style={{ background: votingPhase !== 'idle' ? 'rgba(245,158,11,0.12)' : 'transparent' }}
            title="Vote — Start a collaborative vote on canvas items"
          >
            <Vote className="w-4 h-4 text-[#f59e0b] group-hover:text-[#fbbf24]" />
          </button>

          {/* Divider */}
          <div className="w-6 my-1" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />

          {/* Insert Embed Button */}
          <div className="relative">
            <button
              onClick={() => setShowInsertMenu(prev => !prev)}
              className={`p-2 rounded-lg transition-colors group ${showInsertMenu ? 'ring-1 ring-[#4fc3f7]' : ''}`}
              style={{ background: showInsertMenu ? 'rgba(79,195,247,0.12)' : 'transparent' }}
              title="Insert — Add image, file, or link to canvas"
            >
              <Paperclip className="w-4 h-4 text-[#4fc3f7] group-hover:text-[#81d4fa]" />
            </button>

            {/* Insert Dropdown Menu */}
            {showInsertMenu && (
              <div
                className="absolute left-full ml-2 top-0 rounded-xl shadow-2xl z-50 overflow-hidden"
                style={{
                  background: 'rgba(21,24,33,0.97)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)',
                  minWidth: 180,
                }}
              >
                <div className="px-3 py-2 text-[10px] font-bold text-[#5a6478] uppercase tracking-wider" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  Insert
                </div>
                {/* Image */}
                <button
                  onClick={() => {
                    setShowInsertMenu(false);
                    imageInputRef.current?.click();
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-white/[0.04] transition-colors"
                >
                  <ImageIcon className="w-4 h-4 text-[#00e5a0]" />
                  <div>
                    <div className="text-xs font-medium text-[#e8ecf4]">Image</div>
                    <div className="text-[9px] text-[#5a6478]">JPG, PNG, GIF, WebP</div>
                  </div>
                </button>
                {/* File */}
                <button
                  onClick={() => {
                    setShowInsertMenu(false);
                    fileInputRef.current?.click();
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-white/[0.04] transition-colors"
                >
                  <FileText className="w-4 h-4 text-[#4fc3f7]" />
                  <div>
                    <div className="text-xs font-medium text-[#e8ecf4]">File</div>
                    <div className="text-[9px] text-[#5a6478]">PDF, DOC, ZIP, etc.</div>
                  </div>
                </button>
                {/* Web Link */}
                <button
                  onClick={() => {
                    setShowInsertMenu(false);
                    setShowLinkInputDialog(true);
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-white/[0.04] transition-colors"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <Link2 className="w-4 h-4 text-[#8b5cf6]" />
                  <div>
                    <div className="text-xs font-medium text-[#e8ecf4]">Web Link</div>
                    <div className="text-[9px] text-[#5a6478]">Embed a URL as a card</div>
                  </div>
                </button>
                {/* Paste tip */}
                <div className="px-3 py-2 text-[9px] text-[#5a6478]" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  Tip: Ctrl+V to paste image from clipboard, or drag files onto canvas
                </div>
              </div>
            )}
          </div>

          {/* Hidden file inputs */}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageFileSelect(file);
              e.target.value = '';
            }}
          />
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
              e.target.value = '';
            }}
          />

          {/* Divider */}
          <div className="w-6 my-1" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />

          {/* Clear */}
          <button
            onClick={clearCanvas}
            className="p-2 rounded-lg hover:bg-red-500/[0.08] transition-colors"
            title="Clear canvas"
          >
            <Trash2 className="w-4 h-4 text-[#ff5757]" />
          </button>
        </div>

        {/* Canvas Area */}
        <div
          ref={containerRef}
          className="flex-1 relative overflow-hidden"
          style={{ cursor: cursorStyle }}
        >
          <Stage
            ref={stageRef as React.LegacyRef<Konva.Stage>}
            width={dimensions.width}
            height={dimensions.height}
            scaleX={zoomLevel}
            scaleY={zoomLevel}
            x={stagePos.x}
            y={stagePos.y}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
          >
            <Layer>
              {renderedItems}
            </Layer>
          </Stage>

          {/* Text Input Overlay */}
          {textInput?.visible && (() => {
            const screenPos = worldToScreen(textInput.x, textInput.y);
            return (
              <textarea
                ref={textAreaRef}
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                onBlur={commitText}
                className="absolute border-none outline-none resize-none bg-transparent"
                style={{
                  left: screenPos.x,
                  top: screenPos.y,
                  color: color,
                  fontSize: `${18 * zoomLevel}px`,
                  fontFamily: 'Arial, sans-serif',
                  minWidth: `${100 * zoomLevel}px`,
                  minHeight: `${30 * zoomLevel}px`,
                  caretColor: color,
                  transform: `scale(${1})`,
                }}
                placeholder="Type here..."
              />
            );
          })()}

          {/* Sticky Note Text Editing Overlay */}
          {editingStickyId && (() => {
            const sticky = items.find(i => i.id === editingStickyId);
            if (!sticky) return null;
            const screenPos = worldToScreen(sticky.x || 0, sticky.y || 0);
            return (
              <textarea
                ref={stickyEditRef}
                value={editingStickyText}
                onChange={(e) => setEditingStickyText(e.target.value)}
                onBlur={commitStickyText}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    e.preventDefault();
                    setEditingStickyId(null);
                    setEditingStickyText('');
                  }
                }}
                className="absolute border-none outline-none resize-none"
                style={{
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
                  boxShadow: '2px 2px 8px rgba(0,0,0,0.18)',
                }}
                placeholder="Type your note..."
              />
            );
          })()}

          {/* Frame Edit Overlay (title editing) */}
          {editingFrameId && (() => {
            const frame = items.find(i => i.id === editingFrameId);
            if (!frame) return null;
            const screenPos = worldToScreen(frame.x || 0, frame.y || 0);
            return (
              <div
                className="absolute flex flex-col gap-2 p-3 rounded-lg"
                style={{
                  left: screenPos.x,
                  top: Math.max(4, screenPos.y - 70),
                  background: 'rgba(21,24,33,0.98)',
                  border: '1px solid rgba(139,92,246,0.3)',
                  zIndex: 15,
                  minWidth: '220px',
                }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Monitor className="w-3.5 h-3.5 text-[#8b5cf6]" />
                  <span className="text-[10px] font-semibold text-[#8b5cf6]">Frame Settings</span>
                </div>
                {/* Frame Background Color */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-[#5a6478]">Background</span>
                  <button
                    onClick={() => {
                      setItems(prev => prev.map(item =>
                        item.id === editingFrameId ? { ...item, frameBgColor: 'transparent' } : item
                      ));
                    }}
                    className={`w-5 h-5 rounded border transition-all ${(!frame.frameBgColor || frame.frameBgColor === 'rgba(26,29,39,0.5)') ? 'ring-1 ring-[#8b5cf6]' : ''}`}
                    style={{ background: 'repeating-conic-gradient(rgba(255,255,255,0.1) 0% 25%, transparent 0% 50%) 0 0 / 6px 6px', borderColor: 'rgba(255,255,255,0.15)' }}
                    title="Transparent"
                  />
                  <button
                    onClick={() => {
                      setItems(prev => prev.map(item =>
                        item.id === editingFrameId ? { ...item, frameBgColor: '#ffffff' } : item
                      ));
                    }}
                    className={`w-5 h-5 rounded border transition-all ${frame.frameBgColor === '#ffffff' ? 'ring-1 ring-[#8b5cf6]' : ''}`}
                    style={{ background: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}
                    title="White"
                  />
                  <button
                    onClick={() => {
                      setItems(prev => prev.map(item =>
                        item.id === editingFrameId ? { ...item, frameBgColor: CANVAS_BG } : item
                      ));
                    }}
                    className={`w-5 h-5 rounded border transition-all ${frame.frameBgColor === CANVAS_BG ? 'ring-1 ring-[#8b5cf6]' : ''}`}
                    style={{ background: CANVAS_BG, borderColor: 'rgba(255,255,255,0.15)' }}
                    title="Dark"
                  />
                  <button
                    onClick={() => {
                      setItems(prev => prev.map(item =>
                        item.id === editingFrameId ? { ...item, frameBgColor: '#f8f9fa' } : item
                      ));
                    }}
                    className={`w-5 h-5 rounded border transition-all ${frame.frameBgColor === '#f8f9fa' ? 'ring-1 ring-[#8b5cf6]' : ''}`}
                    style={{ background: '#f8f9fa', borderColor: 'rgba(255,255,255,0.2)' }}
                    title="Light Gray"
                  />
                  <input
                    type="color"
                    value={frame.frameBgColor?.startsWith('#') ? frame.frameBgColor : '#1a1d27'}
                    onChange={(e) => {
                      setItems(prev => prev.map(item =>
                        item.id === editingFrameId ? { ...item, frameBgColor: e.target.value } : item
                      ));
                    }}
                    className="w-5 h-5 rounded cursor-pointer border border-white/10"
                    title="Custom color"
                  />
                </div>
                <input
                  value={editingFrameTitle}
                  onChange={(e) => setEditingFrameTitle(e.target.value)}
                  onBlur={() => {
                    setItems(prev => prev.map(item =>
                      item.id === editingFrameId ? { ...item, frameTitle: editingFrameTitle } : item
                    ));
                    setEditingFrameId(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      setItems(prev => prev.map(item =>
                        item.id === editingFrameId ? { ...item, frameTitle: editingFrameTitle } : item
                      ));
                      setEditingFrameId(null);
                    } else if (e.key === 'Escape') {
                      setEditingFrameId(null);
                    }
                  }}
                  className="bg-transparent border border-white/10 rounded px-2 py-1 text-xs text-[#e8ecf4] outline-none focus:border-[#8b5cf6]/30"
                  placeholder="Frame title..."
                  autoFocus
                />
                <textarea
                  value={editingFrameNotes}
                  onChange={(e) => {
                    setEditingFrameNotes(e.target.value);
                    setItems(prev => prev.map(item =>
                      item.id === editingFrameId ? { ...item, frameNotes: e.target.value } : item
                    ));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      e.preventDefault();
                      setEditingFrameId(null);
                    }
                  }}
                  className="bg-transparent border border-white/10 rounded px-2 py-1 text-[10px] text-[#8b95a8] outline-none focus:border-[#8b5cf6]/30 resize-none"
                  style={{ height: '60px' }}
                  placeholder="Speaker notes (visible in presentation mode)..."
                />
              </div>
            );
          })()}

          {/* Template Panel Overlay */}
          <TemplatePanel
            open={showTemplatePanel}
            onClose={() => setShowTemplatePanel(false)}
            onApply={applyTemplate}
          />

          {/* Layers Panel */}
          <LayersPanel
            open={showLayersPanel}
            onClose={() => setShowLayersPanel(false)}
            items={items}
            frameItems={frameItems}
            selectedFrameId={selectedFrameId}
            onSelectFrame={(id) => { setSelectedFrameId(id); fitToFrame(id); }}
            onFitToFrame={fitToFrame}
            onExportFramePng={exportFrameAsPng}
            onExportAllPdf={exportAllFramesAsPdf}
          />

          {/* PDF Export Dialog */}
          <ExportPdfDialog
            open={showPdfExportDialog}
            onClose={() => { if (!pdfExporting) setShowPdfExportDialog(false); }}
            onExport={performPdfExport}
            frameCount={frameItems.length}
            itemCount={items.length}
            exporting={pdfExporting}
            progress={pdfExportProgress}
          />

          {/* Link Input Dialog */}
          {showLinkInputDialog && (
            <div
              className="absolute inset-0 z-50 flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
              onClick={() => { setShowLinkInputDialog(false); setLinkInputUrl(''); }}
            >
              <div
                className="rounded-xl shadow-2xl p-5 w-96"
                style={{ background: 'rgba(21,24,33,0.98)', border: '1px solid rgba(139,92,246,0.2)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-[#8b5cf6]" />
                    <span className="text-sm font-semibold text-[#e8ecf4]">Add Web Link</span>
                  </div>
                  <button
                    onClick={() => { setShowLinkInputDialog(false); setLinkInputUrl(''); }}
                    className="p-1 rounded hover:bg-white/[0.06] transition-colors"
                  >
                    <X className="w-4 h-4 text-[#5a6478]" />
                  </button>
                </div>
                <input
                  type="url"
                  value={linkInputUrl}
                  onChange={(e) => setLinkInputUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddLink();
                    if (e.key === 'Escape') { setShowLinkInputDialog(false); setLinkInputUrl(''); }
                  }}
                  placeholder="https://example.com/article"
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--medq-text, #e8ecf4)',
                    caretColor: '#8b5cf6',
                  }}
                  autoFocus
                />
                <p className="text-[10px] text-[#5a6478] mt-2">
                  We'll fetch the page title, description, and favicon automatically.
                </p>
                <div className="flex items-center justify-end gap-2 mt-4">
                  <button
                    onClick={() => { setShowLinkInputDialog(false); setLinkInputUrl(''); }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#8b95a8] hover:bg-white/[0.06] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddLink}
                    disabled={linkLoading || !linkInputUrl.trim()}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background: 'rgba(139,92,246,0.2)',
                      color: '#8b5cf6',
                      border: '1px solid rgba(139,92,246,0.3)',
                    }}
                  >
                    {linkLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Link2 className="w-3.5 h-3.5" />}
                    Add Link
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* AI Prompt Input Overlay */}
          {showAiPrompt && (
            <div
              className="absolute inset-0 flex items-center justify-center z-30"
              style={{ background: 'rgba(0,0,0,0.5)' }}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setShowAiPrompt(false);
                  setAiPromptText('');
                }
              }}
            >
              <div
                className="rounded-xl p-5 w-[480px] max-w-[90vw]"
                style={{
                  background: 'rgba(26,29,39,0.98)',
                  border: '1px solid rgba(139,92,246,0.25)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(139,92,246,0.1)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#8b5cf6]" />
                    <span className="text-sm font-semibold text-[#e8ecf4]">AI Generate</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[rgba(139,92,246,0.15)] text-[#a78bfa]">Beta</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowAiPrompt(false);
                      setAiPromptText('');
                    }}
                    className="p-1 rounded-md hover:bg-white/[0.06] transition-colors"
                  >
                    <X className="w-4 h-4 text-[#8b95a8]" />
                  </button>
                </div>

                <div className="mb-3">
                  <label className="text-[11px] text-[#5a6478] mb-1.5 block">
                    Describe what you want on the canvas
                  </label>
                  <textarea
                    value={aiPromptText}
                    onChange={(e) => setAiPromptText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        handleAiGenerate();
                      }
                      if (e.key === 'Escape') {
                        setShowAiPrompt(false);
                        setAiPromptText('');
                      }
                    }}
                    className="w-full h-28 bg-[rgba(0,0,0,0.3)] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-[#e8ecf4] outline-none focus:border-[#8b5cf6]/40 resize-none placeholder:text-[#5a6478]"
                    placeholder="e.g., Create a mind map about cardiac anatomy&#10;e.g., Draw a flowchart for patient triage&#10;e.g., Make a SWOT analysis for a medical startup"
                    autoFocus
                  />
                </div>

                {/* Quick prompt suggestions */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {[
                    'Mind map about cardiac anatomy',
                    'Flowchart for patient triage',
                    'SWOT analysis for a medical device',
                    'Compare viral vs bacterial infections',
                    'Steps for CPR procedure',
                    'Brainstorm study topics',
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setAiPromptText(suggestion)}
                      className="px-2 py-1 rounded-md text-[10px] transition-all hover:bg-[rgba(139,92,246,0.15)]"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        color: 'var(--medq-text-muted, #8b95a8)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#5a6478]">
                    Ctrl+Enter to generate
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setShowAiPrompt(false);
                        setAiPromptText('');
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#8b95a8] hover:bg-white/[0.06] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAiGenerate}
                      disabled={aiLoading || !aiPromptText.trim()}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        background: 'rgba(139,92,246,0.2)',
                        color: '#a78bfa',
                        border: '1px solid rgba(139,92,246,0.3)',
                      }}
                    >
                      {aiLoading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          Generate
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vote Config Modal */}
          {votingPhase === 'configuring' && (
            <VoteConfigModal
              items={items}
              onStart={startVote}
              onClose={resetVoting}
            />
          )}

          {/* Voting Panel (floating, active or ended) */}
          {(votingPhase === 'active' || votingPhase === 'ended') && activeVoteConfig && (
            <div
              className="absolute top-3 right-3 w-[260px] rounded-xl overflow-hidden z-25"
              style={{
                background: 'rgba(21,24,33,0.96)',
                border: '1px solid rgba(245,158,11,0.2)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(245,158,11,0.06)',
              }}
            >
              {/* Panel header */}
              <div className="px-3 py-2.5 flex items-center justify-between" style={{ background: 'rgba(245,158,11,0.08)', borderBottom: '1px solid rgba(245,158,11,0.12)' }}>
                <div className="flex items-center gap-2">
                  <Vote className="w-4 h-4 text-[#f59e0b]" />
                  <span className="text-xs font-semibold text-[#f59e0b]">{activeVoteConfig.title}</span>
                </div>
                {votingPhase === 'ended' && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[rgba(245,158,11,0.15)] text-[#f59e0b]">Ended</span>
                )}
                {votingPhase === 'active' && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[rgba(0,229,160,0.15)] text-[#00e5a0]">Active</span>
                )}
              </div>

              {/* Timer / votes remaining */}
              <div className="px-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <ThumbsUp className="w-3 h-3 text-[#8b95a8]" />
                    <span className="text-[10px] text-[#8b95a8]">
                      {localUserVotes.length}/{activeVoteConfig.votesPerUser} votes used
                    </span>
                  </div>
                  {activeVoteConfig.timeLimitSeconds > 0 && votingPhase === 'active' && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#ff5757]" />
                      <span className={`text-[11px] font-mono font-bold ${voteTimeRemaining <= 10 ? 'text-[#ff5757]' : 'text-[#e8ecf4]'}`}>
                        {Math.floor(voteTimeRemaining / 60)}:{(voteTimeRemaining % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                  )}
                  {activeVoteConfig.timeLimitSeconds > 0 && votingPhase === 'ended' && (
                    <span className="text-[10px] text-[#5a6478]">Time&apos;s up</span>
                  )}
                </div>
                {/* Vote usage progress bar */}
                <div className="mt-1.5 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${(localUserVotes.length / activeVoteConfig.votesPerUser) * 100}%`, background: '#f59e0b' }} />
                </div>
              </div>

              {/* Results / Ranking */}
              <div className="px-3 py-2 max-h-[240px] overflow-y-auto chat-wb-scrollbar">
                {rankedResults.map((result, idx) => {
                  const canvasItem = items.find(i => i.id === result.itemId);
                  if (!canvasItem) return null;
                  const label = canvasItem.type === 'sticky' ? (canvasItem.text || 'Empty note') : canvasItem.type === 'text' ? (canvasItem.text || 'Text') : canvasItem.type === 'rect' ? 'Rectangle' : 'Circle';
                  const maxVotes = Math.max(...rankedResults.map(r => r.count), 1);
                  const barWidth = (result.count / maxVotes) * 100;
                  const isLocal = localUserVotes.includes(result.itemId);
                  const rankColor = idx === 0 ? '#f59e0b' : idx === 1 ? '#94a3b8' : idx === 2 ? '#cd7f32' : '#5a6478';
                  return (
                    <div key={result.itemId} className="flex items-center gap-2 mb-1.5 last:mb-0">
                      {/* Rank number */}
                      {votingPhase === 'ended' && idx < 3 ? (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: rankColor }}>
                          <span className="text-[9px] font-bold text-white">{idx + 1}</span>
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.06)' }}>
                          <span className="text-[9px] text-[#5a6478]">{idx + 1}</span>
                        </div>
                      )}
                      {/* Label + bar */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[10px] text-[#e8ecf4] truncate max-w-[130px]">{label}</span>
                          <span className={`text-[10px] font-bold ${isLocal ? 'text-[#f59e0b]' : 'text-[#8b95a8]'}`}>{result.count}</span>
                        </div>
                        <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                          <div className="h-full rounded-full transition-all" style={{ width: `${barWidth}%`, background: isLocal ? '#f59e0b' : rankColor, opacity: result.count > 0 ? 1 : 0.3 }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action buttons */}
              <div className="px-3 py-2 flex gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                {votingPhase === 'active' && (
                  <button
                    onClick={endVote}
                    className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] font-medium transition-colors"
                    style={{ background: 'rgba(255,87,87,0.12)', color: '#ff5757', border: '1px solid rgba(255,87,87,0.2)' }}
                  >
                    End Vote
                  </button>
                )}
                <button
                  onClick={resetVoting}
                  className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] font-medium transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--medq-text-muted, #8b95a8)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {votingPhase === 'ended' ? 'Close' : 'Cancel'}
                </button>
              </div>
            </div>
          )}

          {/* Minimap */}
          {showMinimap && (
            <Minimap
              items={items}
              zoomLevel={zoomLevel}
              stagePos={stagePos}
              dimensions={dimensions}
              onJumpTo={handleMinimapJump}
            />
          )}
        </div>
      </div>

      {/* ═══ Bottom Bar: Color Picker + Brush Size / Connector Options ═══ */}
      <div
        className="flex items-center gap-2 px-3 py-2 flex-shrink-0 flex-wrap"
        style={{
          background: 'rgba(21,24,33,0.95)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {tool === 'connector' ? (
          <>
            {/* Connector Style */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[#5a6478] mr-1">Style</span>
              {CONNECTOR_STYLES.map((cs) => (
                <button
                  key={cs.value}
                  onClick={() => setConnectorStyle(cs.value)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    connectorStyle === cs.value ? 'ring-1 ring-[#00e5a0]' : ''
                  }`}
                  style={{
                    background: connectorStyle === cs.value ? 'rgba(0,229,160,0.12)' : 'transparent',
                    color: connectorStyle === cs.value ? '#00e5a0' : '#8b95a8',
                  }}
                >
                  {cs.label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.08)' }} />

            {/* Arrowhead Options */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[#5a6478] mr-1">Arrow</span>
              {ARROWHEAD_OPTIONS.map((ah) => (
                <button
                  key={ah.value}
                  onClick={() => setConnectorArrowhead(ah.value)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    connectorArrowhead === ah.value ? 'ring-1 ring-[#00e5a0]' : ''
                  }`}
                  style={{
                    background: connectorArrowhead === ah.value ? 'rgba(0,229,160,0.12)' : 'transparent',
                    color: connectorArrowhead === ah.value ? '#00e5a0' : '#8b95a8',
                  }}
                >
                  {ah.label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.08)' }} />

            {/* Connector Color */}
            <div className="flex items-center gap-1">
              {COLORS.slice(0, 8).map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-5 h-5 rounded-full transition-all ${
                    color === c ? 'ring-2 ring-white/30 scale-110' : ''
                  }`}
                  style={{
                    background: c,
                    border: c === CANVAS_BG ? '1px solid rgba(255,255,255,0.15)' : c === '#ffffff' ? '1px solid rgba(255,255,255,0.2)' : 'none',
                  }}
                />
              ))}
            </div>

            <div className="flex-1" />
            <span className="text-[10px] text-[#5a6478]">
              Click anchor to start, click another to connect
              {connectingFrom && ' • ESC to cancel'}
              {selectedConnectorId && ' • Del to remove'}
            </span>
          </>
        ) : tool === 'frame' ? (
          <>
            {/* Frame Tool Info */}
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-[#8b5cf6]" />
              <span className="text-xs font-medium text-[#8b5cf6]">Frame Tool</span>
            </div>
            <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <span className="text-[10px] text-[#5a6478]">
              Click & drag to create a frame. Each frame becomes a slide.
              {frameItems.length > 0 && ` ${frameItems.length} frame${frameItems.length > 1 ? 's' : ''} created.`}
            </span>
            {frameItems.length > 0 && (
              <>
                <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <button
                  onClick={enterPresentation}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  style={{ background: 'rgba(139,92,246,0.12)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.2)' }}
                >
                  <Maximize2 className="w-3.5 h-3.5" /> Present
                </button>
              </>
            )}
            {selectedFrameId && (
              <>
                <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <button
                  onClick={() => fitToFrame(selectedFrameId)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  style={{ background: 'rgba(0,229,160,0.1)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.15)' }}
                >
                  <Maximize2 className="w-3.5 h-3.5" /> Fit to Frame
                </button>
                <button
                  onClick={() => exportFrameAsPng(selectedFrameId)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  style={{ background: 'rgba(79,195,247,0.1)', color: '#4fc3f7', border: '1px solid rgba(79,195,247,0.15)' }}
                >
                  <Download className="w-3.5 h-3.5" /> Export PNG
                </button>
              </>
            )}
            {frameItems.length > 1 && (
              <>
                <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <button
                  onClick={exportAllFramesAsPdf}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  style={{ background: 'rgba(79,195,247,0.1)', color: '#4fc3f7', border: '1px solid rgba(79,195,247,0.15)' }}
                >
                  <FileText className="w-3.5 h-3.5" /> Export PDF
                </button>
              </>
            )}
            <div className="flex-1" />
            {/* Layers panel toggle */}
            <button
              onClick={() => setShowLayersPanel(prev => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${showLayersPanel ? 'ring-1 ring-[#8b5cf6]' : ''}`}
              style={{ background: showLayersPanel ? 'rgba(139,92,246,0.12)' : 'transparent', color: showLayersPanel ? '#8b5cf6' : '#5a6478' }}
            >
              <Layers className="w-3.5 h-3.5" /> Layers
            </button>
          </>
        ) : tool === 'laser' ? (
          <>
            {/* Laser Pointer Info */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ background: '#ff5757', boxShadow: '0 0 8px rgba(255,87,87,0.5)' }} />
              <span className="text-xs font-medium text-[#ff5757]">Laser Pointer</span>
            </div>
            <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <span className="text-[10px] text-[#5a6478]">
              Click & drag to point at things. No permanent marks. Press L to toggle.
            </span>
            {remoteLasers.length > 0 && (
              <>
                <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <span className="text-[10px] text-[#4fc3f7]">
                  {remoteLasers.length} other laser{remoteLasers.length > 1 ? 's' : ''} active
                </span>
              </>
            )}
          </>
        ) : tool === 'sticky' ? (
          <>
            {/* Sticky Note Colors */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#5a6478] mr-1">Note color</span>
              {STICKY_COLORS.map((sc, idx) => (
                <button
                  key={sc.name}
                  onClick={() => {
                    setStickyColorIdx(idx);
                    // If a sticky note is selected, change its color
                    if (selectedStickyId) {
                      setItems(prev => prev.map(item =>
                        item.id === selectedStickyId
                          ? { ...item, stickyColor: sc.body, stickyFoldColor: sc.fold, stickyTextColor: sc.text }
                          : item
                      ));
                    }
                  }}
                  className={`w-7 h-7 rounded-md transition-all ${
                    stickyColorIdx === idx ? 'ring-2 ring-white/30 scale-110' : ''
                  }`}
                  style={{ background: sc.body, border: '1px solid rgba(0,0,0,0.12)' }}
                  title={sc.name}
                />
              ))}
            </div>
            <div className="flex-1" />
            <span className="text-[10px] text-[#5a6478]">
              Click canvas to add note
              {selectedStickyId && ' • Select color to change note'}
            </span>
          </>
        ) : (
          <>
            {/* Regular Drawing Colors */}
            <div className="flex items-center gap-1.5">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setColor(c);
                    if (tool === 'eraser') setTool('pen');
                  }}
                  className={`w-6 h-6 rounded-full transition-all ${
                    color === c && tool !== 'eraser' ? 'ring-2 ring-white/30 scale-110' : ''
                  }`}
                  style={{
                    background: c,
                    border: c === CANVAS_BG ? '1px solid rgba(255,255,255,0.15)' : c === '#ffffff' ? '1px solid rgba(255,255,255,0.2)' : 'none',
                  }}
                />
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.08)' }} />

            {/* Brush Sizes */}
            <div className="flex items-center gap-1">
              {BRUSH_SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setBrushSize(s)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                    brushSize === s ? 'ring-1 ring-[#00e5a0]' : ''
                  }`}
                  style={{ background: brushSize === s ? 'rgba(0,229,160,0.12)' : 'transparent' }}
                >
                  <div
                    className="rounded-full"
                    style={{
                      width: Math.min(s + 1, 12),
                      height: Math.min(s + 1, 12),
                      background: tool === 'eraser' ? '#5a6478' : color,
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.08)' }} />

            {/* Zoom Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => zoomToLevel(Math.max(0.1, zoomLevel / 1.2))}
                className="w-6 h-6 rounded flex items-center justify-center text-[#8b95a8] hover:bg-white/[0.06] transition-colors text-xs font-bold"
                title="Zoom out"
              >
                −
              </button>
              <span className="text-[10px] text-[#e8ecf4] font-mono min-w-[36px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => zoomToLevel(Math.min(5, zoomLevel * 1.2))}
                className="w-6 h-6 rounded flex items-center justify-center text-[#8b95a8] hover:bg-white/[0.06] transition-colors text-xs font-bold"
                title="Zoom in"
              >
                +
              </button>
            </div>

            {/* Zoom presets */}
            <div className="flex items-center gap-0.5">
              {ZOOM_PRESETS.map(p => (
                <button
                  key={p}
                  onClick={() => zoomToLevel(p)}
                  className={`px-1.5 py-0.5 rounded text-[9px] transition-all ${
                    Math.abs(zoomLevel - p) < 0.01 ? 'text-[#00e5a0] bg-[rgba(0,229,160,0.12)]' : 'text-[#5a6478] hover:bg-white/[0.04]'
                  }`}
                >
                  {Math.round(p * 100)}%
                </button>
              ))}
              <button
                onClick={fitToContent}
                className="px-1.5 py-0.5 rounded text-[9px] text-[#5a6478] hover:bg-white/[0.04] transition-all"
                title="Fit to content"
              >
                Fit
              </button>
            </div>

            {/* Tool indicator */}
            <div className="flex-1" />

            {/* Shape Recognition Toggle (only for pen/highlighter) */}
            {(tool === 'pen' || tool === 'highlighter') && (
              <>
                <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <button
                  onClick={() => setShapeRecognitionEnabled(prev => !prev)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium transition-all"
                  style={{
                    background: shapeRecognitionEnabled ? 'rgba(0,229,160,0.12)' : 'transparent',
                    color: shapeRecognitionEnabled ? '#00e5a0' : '#5a6478',
                    border: shapeRecognitionEnabled ? '1px solid rgba(0,229,160,0.2)' : '1px solid transparent',
                  }}
                  title={shapeRecognitionEnabled ? 'Shape recognition: ON — rough shapes auto-detected' : 'Shape recognition: OFF'}
                >
                  {shapeRecognitionEnabled ? (
                    <ToggleRight className="w-3.5 h-3.5" />
                  ) : (
                    <ToggleLeft className="w-3.5 h-3.5" />
                  )}
                  <span className="hidden sm:inline">Shape Rec</span>
                </button>
              </>
            )}

            <span className="text-[10px] text-[#5a6478]">
              {TOOL_CONFIG[tool]?.label}
              {tool === 'eraser' && ` • ${brushSize * 4}px`}
              {tool === 'laser' && ' • Click & drag to point'}
            </span>
          </>
        )}
      </div>

      {/* ═══ Shape Recognition Suggestion Toast ═══ */}
      {shapeSuggestion && !isPresenting && (
        <div
          className="absolute z-40 flex items-center gap-2 px-3 py-2 rounded-xl shadow-2xl"
          style={{
            left: `calc(${(shapeSuggestion.position.x * zoomLevel + stagePos.x)}px - 80px)`,
            top: `calc(${(shapeSuggestion.position.y * zoomLevel + stagePos.y)}px - 50px)`,
            background: 'rgba(21,24,33,0.96)',
            border: '1px solid rgba(0,229,160,0.25)',
            backdropFilter: 'blur(12px)',
            animation: 'shapeToastIn 0.2s ease-out',
            pointerEvents: 'auto',
          }}
        >
          {/* Shape icon preview */}
          <div className="flex items-center justify-center w-7 h-7 rounded-lg" style={{ background: 'rgba(0,229,160,0.1)' }}>
            {shapeSuggestion.shapeName === 'Circle' && <CircleIcon className="w-4 h-4 text-[#00e5a0]" />}
            {shapeSuggestion.shapeName === 'Rectangle' && <Square className="w-4 h-4 text-[#00e5a0]" />}
            {shapeSuggestion.shapeName === 'Triangle' && <Triangle className="w-4 h-4 text-[#00e5a0]" />}
            {shapeSuggestion.shapeName === 'Diamond' && <Diamond className="w-4 h-4 text-[#00e5a0]" />}
            {shapeSuggestion.shapeName === 'Arrow' && <MoveRight className="w-4 h-4 text-[#00e5a0]" />}
          </div>
          {/* Text */}
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-[#e8ecf4] leading-tight">
              Convert to {shapeSuggestion.shapeName}?
            </span>
            <span className="text-[9px] text-[#5a6478]">
              {Math.round(shapeSuggestion.confidence * 100)}% match
            </span>
          </div>
          {/* Buttons */}
          <button
            onClick={acceptShapeSuggestion}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all hover:scale-105"
            style={{ background: 'rgba(0,229,160,0.2)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.3)' }}
          >
            <Check className="w-3 h-3" />
            Yes
          </button>
          <button
            onClick={rejectShapeSuggestion}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all hover:bg-white/[0.06]"
            style={{ color: 'var(--medq-text-muted, #8b95a8)' }}
          >
            <X className="w-3 h-3" />
            No
          </button>
        </div>
      )}

      {/* ═══ Presentation Mode Overlay ═══ */}
      {isPresenting && currentFrame && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ background: 'var(--medq-bg, #0c0e14)' }}
        >
          {/* Canvas area - showing the current frame */}
          <div
            ref={(el) => {
              if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.width !== dimensions.width || rect.height !== dimensions.height) {
                  setDimensions({ width: Math.floor(rect.width), height: Math.floor(rect.height) });
                }
              }
            }}
            className="flex-1 relative"
            style={{ cursor: 'none' }}
          >
            <Stage
              width={dimensions.width}
              height={dimensions.height - 60}
              scaleX={presentationScale}
              scaleY={presentationScale}
              x={presentationOffset.x}
              y={presentationOffset.y}
              onMouseDown={(e) => {
                if (tool === 'laser') {
                  setLaserActive(true);
                  laserActiveRef.current = true;
                  const stage = e.target.getStage();
                  if (!stage) return;
                  const pos = stage.getPointerPosition();
                  if (!pos) return;
                  const worldX = (pos.x - presentationOffset.x) / presentationScale;
                  const worldY = (pos.y - presentationOffset.y) / presentationScale;
                  const newPoint: LaserTrailPoint = { x: worldX, y: worldY, timestamp: Date.now() };
                  setLaserTrail(prev => [...prev.slice(-LASER_TRAIL_MAX_POINTS), newPoint]);
                }
              }}
              onMouseMove={(e) => {
                if (tool === 'laser' && laserActiveRef.current) {
                  const stage = e.target.getStage();
                  if (!stage) return;
                  const pos = stage.getPointerPosition();
                  if (!pos) return;
                  const worldX = (pos.x - presentationOffset.x) / presentationScale;
                  const worldY = (pos.y - presentationOffset.y) / presentationScale;
                  const newPoint: LaserTrailPoint = { x: worldX, y: worldY, timestamp: Date.now() };
                  setLaserTrail(prev => [...prev.slice(-LASER_TRAIL_MAX_POINTS), newPoint]);
                  if (onLaserMove) {
                    const now = Date.now();
                    if (now - lastLaserBroadcastRef.current >= LASER_BROADCAST_INTERVAL) {
                      lastLaserBroadcastRef.current = now;
                      onLaserMove({ x: worldX, y: worldY });
                    }
                  }
                }
              }}
              onMouseUp={() => {
                setLaserActive(false);
                laserActiveRef.current = false;
                if (onLaserStop) onLaserStop();
              }}
              onMouseLeave={() => {
                setLaserActive(false);
                laserActiveRef.current = false;
              }}
            >
              <Layer>
                {/* White background for the frame area */}
                <Rect
                  x={currentFrame.x || 0}
                  y={currentFrame.y || 0}
                  width={currentFrame.width || 800}
                  height={currentFrame.height || 600}
                  fill={currentFrame.frameBgColor || CANVAS_BG}
                  cornerRadius={4}
                />
                {/* Render all items within the current frame */}
                {items.filter(item => item.id !== currentFrame.id && isItemInFrame(item, currentFrame)).map(item => {
                  if (item.type === 'sticky') {
                    return <StickyNoteShape key={item.id} item={item} isEditing={false} isSelected={false} onDragEnd={() => {}} onDoubleClick={() => {}} onDelete={() => {}} onResizeStart={() => {}} onSelect={() => {}} />;
                  }
                  if (item.type === 'connector') {
                    return <ConnectorShape key={item.id} item={item} allItems={items} isSelected={false} onSelect={() => {}} onDelete={() => {}} />;
                  }
                  return <RenderDrawItem key={item.id} item={item} />;
                })}
                {/* Local laser pointer */}
                {laserTrail.length > 0 && (
                  <LaserPointerShape points={laserTrail} color="#ff5757" />
                )}
                {/* Remote laser pointers */}
                {remoteLasers.map(rl => (
                  <LaserPointerShape key={`rl-${rl.userId}`} points={rl.points} color={rl.color} name={rl.userName} />
                ))}
                {/* Remote cursors */}
                {remoteCursors.map(cursor => (
                  <RemoteCursorShape key={`rc-${cursor.userId}`} cursor={cursor} />
                ))}
              </Layer>
            </Stage>

            {/* Presenter Notes Panel (floating, right side) */}
            {showFrameNotesPanel && currentFrame && (
              <div
                className="absolute top-4 right-4 w-72 rounded-lg p-4"
                style={{
                  background: 'rgba(21,24,33,0.95)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  zIndex: 40,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#f59e0b]">Speaker Notes</span>
                  <button onClick={() => setShowFrameNotesPanel(false)} className="text-[#5a6478] hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <textarea
                  value={editingFrameNotes}
                  onChange={(e) => {
                    setEditingFrameNotes(e.target.value);
                    setItems(prev => prev.map(item =>
                      item.id === currentFrame.id ? { ...item, frameNotes: e.target.value } : item
                    ));
                  }}
                  className="w-full h-40 bg-transparent border border-white/10 rounded p-2 text-xs text-[#8b95a8] resize-none outline-none focus:border-[#f59e0b]/30"
                  placeholder="Add speaker notes..."
                />
              </div>
            )}

            {/* Notes toggle button */}
            {!showFrameNotesPanel && (
              <button
                onClick={() => {
                  setShowFrameNotesPanel(true);
                  setEditingFrameNotes(currentFrame.frameNotes || '');
                }}
                className="absolute top-4 right-4 p-2 rounded-lg flex items-center"
                style={{
                  background: 'rgba(21,24,33,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#f59e0b',
                  zIndex: 39,
                }}
                title="Toggle speaker notes (N)"
              >
                <FileText className="w-4 h-4" />
              </button>
            )}

            {/* Slide title overlay */}
            <div
              className="absolute top-4 left-4 px-3 py-1.5 rounded-lg"
              style={{
                background: 'rgba(21,24,33,0.8)',
                border: '1px solid rgba(139,92,246,0.2)',
                zIndex: 38,
              }}
            >
              <span className="text-sm font-semibold text-[#8b5cf6]">
                {currentFrame.frameTitle || `Slide ${presentingFrame + 1}`}
              </span>
            </div>
          </div>

          {/* Bottom bar: Navigation + Thumbnails */}
          <div
            className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
            style={{
              background: 'rgba(21,24,33,0.98)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              height: '60px',
            }}
          >
            {/* Left arrow */}
            <button
              onClick={() => navigateSlide(-1)}
              disabled={presentingFrame === 0}
              className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5 text-[#e8ecf4]" />
            </button>

            {/* Slide counter */}
            <span className="text-sm font-mono text-[#e8ecf4] min-w-[50px] text-center">
              {presentingFrame + 1}/{frameItems.length}
            </span>

            {/* Right arrow */}
            <button
              onClick={() => navigateSlide(1)}
              disabled={presentingFrame === frameItems.length - 1}
              className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors disabled:opacity-30"
            >
              <ChevronRight className="w-5 h-5 text-[#e8ecf4]" />
            </button>

            {/* Divider */}
            <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.08)' }} />

            {/* Thumbnail strip */}
            <div className="flex items-center gap-2 flex-1 overflow-x-auto chat-wb-scrollbar px-2">
              {frameItems.map((frame, idx) => (
                <button
                  key={frame.id}
                  onClick={() => {
                    setPresentingFrame(idx);
                    setEditingFrameNotes(frame.frameNotes || '');
                  }}
                  className={`flex-shrink-0 rounded-md overflow-hidden transition-all ${
                    idx === presentingFrame ? 'ring-2 ring-[#8b5cf6]' : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{
                    width: '80px',
                    height: '50px',
                    background: CANVAS_BG,
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center p-1">
                    <span className="text-[9px] text-[#8b95a8] text-center leading-tight truncate">
                      {frame.frameTitle || `Slide ${idx + 1}`}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.08)' }} />

            {/* Laser indicator */}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: '#ff5757', boxShadow: '0 0 6px rgba(255,87,87,0.5)' }} />
              <span className="text-[10px] text-[#ff5757]">Laser</span>
            </div>

            {/* Divider */}
            <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.08)' }} />

            {/* Exit button */}
            <button
              onClick={exitPresentation}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{ background: 'rgba(255,87,87,0.12)', color: '#ff5757', border: '1px solid rgba(255,87,87,0.2)' }}
              title="Exit presentation (Esc)"
            >
              <X className="w-3.5 h-3.5" /> Exit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
