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
 */

// ─── Types ────────────────────────────────────────────────────────────

export type MultimodalFormat =
  | 'text'
  | 'table'
  | 'chart'
  | 'image'
  | 'pdf'
  | 'excel'
  | 'csv'
  | 'word'
  | 'powerpoint'
  | 'audio'
  | 'video'
  | 'map'
  | 'interactive_card'
  | 'calendar'
  | 'kanban'
  | 'timeline'
  | 'approval_dialog'
  | 'workflow_graph'
  | '3d_models';

export type ChartType = 'bar' | 'line' | 'pie' | 'scatter' | 'heatmap' | 'radar' | 'candlestick' | 'area';

export type KanbanColumn = {
  id: string;
  title: string;
  color: string;
  items: KanbanItem[];
};

export type KanbanItem = {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
};

export type TimelineEvent = {
  id: string;
  title: string;
  description?: string;
  date: string;
  icon?: string;
  color?: string;
  status?: 'completed' | 'current' | 'upcoming' | 'overdue';
};

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  duration?: number;
  type?: 'study' | 'exam' | 'review' | 'break' | 'deadline';
  color?: string;
  details?: string;
};

export type ApprovalOption = {
  id: string;
  label: string;
  description: string;
  style: 'primary' | 'secondary' | 'danger' | 'success';
  action?: string;
};

export type WorkflowNode = {
  id: string;
  title: string;
  description?: string;
  type: 'start' | 'process' | 'decision' | 'action' | 'end';
  status?: 'pending' | 'active' | 'completed' | 'skipped';
  next: string[];
  x?: number;
  y?: number;
};

// ─── Multimodal Content Blocks ────────────────────────────────────────

export interface TextContent {
  format: 'text';
  text: string;
  markdown?: boolean;
}

export interface TableContent {
  format: 'table';
  headers: string[];
  rows: string[][];
  title?: string;
  sortable?: boolean;
  exportable?: boolean;
}

export interface ChartContent {
  format: 'chart';
  chartType: ChartType;
  title: string;
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      color?: string;
    }>;
  };
  xAxis?: string;
  yAxis?: string;
}

export interface ImageContent {
  format: 'image';
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface FileExportContent {
  format: 'pdf' | 'excel' | 'csv' | 'word' | 'powerpoint';
  title: string;
  data: Record<string, unknown>;
  downloadUrl?: string;
  description?: string;
}

export interface AudioContent {
  format: 'audio';
  text: string;
  audioUrl?: string;
  duration?: number;
  voice?: string;
}

export interface VideoContent {
  format: 'video';
  url: string;
  title: string;
  duration?: number;
  thumbnail?: string;
}

export interface MapContent {
  format: 'map';
  title: string;
  locations: Array<{
    name: string;
    lat: number;
    lng: number;
    description?: string;
    icon?: string;
  }>;
  center?: { lat: number; lng: number };
  zoom?: number;
}

export interface InteractiveCardContent {
  format: 'interactive_card';
  title: string;
  description: string;
  icon?: string;
  color?: string;
  actions: Array<{
    id: string;
    label: string;
    type: 'navigate' | 'action' | 'dialog' | 'external';
    target?: string;
    data?: Record<string, unknown>;
  }>;
  details?: Record<string, string>;
}

export interface CalendarContent {
  format: 'calendar';
  title: string;
  events: CalendarEvent[];
  view?: 'month' | 'week' | 'day';
  defaultDate?: string;
}

export interface KanbanContent {
  format: 'kanban';
  title: string;
  columns: KanbanColumn[];
}

export interface TimelineContent {
  format: 'timeline';
  title: string;
  events: TimelineEvent[];
  orientation?: 'horizontal' | 'vertical';
}

export interface ApprovalDialogContent {
  format: 'approval_dialog';
  title: string;
  message: string;
  options: ApprovalOption[];
  urgency?: 'low' | 'medium' | 'high';
  deadline?: string;
}

export interface WorkflowGraphContent {
  format: 'workflow_graph';
  title: string;
  nodes: WorkflowNode[];
  description?: string;
}

// ─── 3D Models (Sketchfab search results, inline-embeddable) ─────────

/** A single 3D model result from the Sketchfab v3 search API. */
export interface Model3DItem {
  /** Sketchfab 32-hex model UID — used to build the embed URL. */
  uid: string;
  name: string;
  author: string;
  /** Direct viewer URL on sketchfab.com (for "open in new tab" fallback). */
  viewerUrl: string;
  /** Iframe-embeddable URL — use as <iframe src>. */
  embedUrl: string;
  thumbnailUrl: string | null;
  likeCount: number;
  viewCount: number;
  isDownloadable: boolean;
}

export interface Models3DContent {
  format: '3d_models';
  title: string;
  /** The original user query (echoed back for display). */
  query: string;
  /** The backend's pick for the best model — auto-opened in the iframe. */
  suggestedModelUid?: string;
  models: Model3DItem[];
}

export type MultimodalContent =
  | TextContent
  | TableContent
  | ChartContent
  | ImageContent
  | FileExportContent
  | AudioContent
  | VideoContent
  | MapContent
  | InteractiveCardContent
  | CalendarContent
  | KanbanContent
  | TimelineContent
  | ApprovalDialogContent
  | WorkflowGraphContent
  | Models3DContent;

// ─── Response Wrapper ─────────────────────────────────────────────────

export interface MultimodalResponse {
  id: string;
  /** The LLM's text reply */
  text: string;
  /** Structured multimodal content blocks */
  content: MultimodalContent[];
  /** Legacy actions for backward compat */
  actions?: Array<{
    type: string;
    params: Record<string, unknown>;
    description: string;
    uiAction?: Record<string, unknown>;
  }>;
  /** Legacy cards for backward compat */
  cards?: Array<{
    type: string;
    title: string;
    subtitle?: string;
    details?: Record<string, string>;
    action?: { label: string; tab: string };
  }>;
  /** File attachments from the user */
  fileAttachments?: Array<{
    id: string;
    name: string;
    analysis?: Record<string, unknown>;
  }>;
  /** Suggested next actions */
  suggestions?: string[];
}

// ─── Auto-Format Selector ─────────────────────────────────────────────

/**
 * Determines the best output format based on content characteristics.
 * This is used by the API route to wrap LLM responses in appropriate format.
 */
export function selectBestFormat(
  content: string,
  intent: 'learn' | 'decide' | 'act' | 'review' | 'organize' | 'compare' = 'learn',
  dataIndicators?: {
    hasNumbers?: boolean;
    hasTableData?: boolean;
    hasDates?: boolean;
    hasSteps?: boolean;
    hasComparisons?: boolean;
    hasLocations?: boolean;
    itemCount?: number;
  },
): MultimodalFormat {
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
 */
export function detectDataIndicators(text: string): {
  hasNumbers: boolean;
  hasTableData: boolean;
  hasDates: boolean;
  hasSteps: boolean;
  hasComparisons: boolean;
  hasLocations: boolean;
  itemCount: number;
} {
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
  const itemCount = (text.match(bulletPattern) || []).length +
                    (text.match(numberedPattern) || []).length;

  return { hasNumbers, hasTableData, hasDates, hasSteps, hasComparisons, hasLocations, itemCount };
}

// ─── Format Label Map ─────────────────────────────────────────────────

export const FORMAT_LABELS: Record<MultimodalFormat, string> = {
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
  '3d_models': '3D Models',
};

export const FORMAT_ICONS: Record<MultimodalFormat, string> = {
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
  '3d_models': 'Box',
};

export const FORMAT_COLORS: Record<MultimodalFormat, string> = {
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
  '3d_models': '#8b5cf6',
};
