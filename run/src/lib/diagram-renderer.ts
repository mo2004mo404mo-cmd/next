/**
 * DiagramRenderer — renders rich interactive SVG pathway diagrams from JSON specs.
 * Features: step numbers, START/END markers, animated flow dots, T-bar inhibition,
 * feedback curves with ↩ labels, pathway direction indicator, key steps summary,
 * rich tooltips, enhanced color coding, auto-layout with topological sort + barycenter.
 * Pure DOM / TypeScript, no React/JSX.
 */

const SVG_NS = 'http://www.w3.org/2000/svg';

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface DiagramNode {
  id: string;
  label: string;
  type?:
    | 'enzyme'
    | 'substrate'
    | 'product'
    | 'receptor'
    | 'effect'
    | 'outcome'
    | 'organ'
    | 'drug'
    | 'blocked'
    | 'decision'
    | 'info'
    | 'hormone'
    | 'ion'
    | 'gene'
    | string;
  x?: number;
  y?: number;
  group?: string;
  annotation?: string;
  subtitle?: string;
  icon?: string; // emoji or organ name: heart, brain, lung, kidney, liver, vessel, bone, eye, stomach, pancreas
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  type?: 'normal' | 'activation' | 'inhibition' | 'conversion' | 'feedback';
}

export interface DiagramGroup {
  id: string;
  label: string;
  color: string;
  nodes: string[];
}

export interface DiagramSpec {
  title?: string;
  layout?: 'horizontal' | 'vertical';
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  groups?: DiagramGroup[];
}

// ---------------------------------------------------------------------------
// Internal types
// ---------------------------------------------------------------------------

interface NodeStyle {
  gradientFrom: string;
  gradientTo: string;
  shape: 'rect' | 'diamond' | 'pill' | 'hexagon';
  dashArray?: string;
  glowColor?: string;
  indicator?: string; // special character shown in node
}

interface NodeLayout {
  x: number;
  y: number;
  width: number;
  height: number;
  layer: number;
  slot: number;
  stepNumber: number; // 1-based step number based on topological sort
}

interface RendererOptions {
  nodeWidth: number;
  nodeHeight: number;
  diamondWidth: number;
  diamondHeight: number;
  layerGap: number;
  nodeGap: number;
  padding: number;
  animate: boolean;
  bg: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_OPTIONS: RendererOptions = {
  nodeWidth: 180,
  nodeHeight: 74,
  diamondWidth: 150,
  diamondHeight: 84,
  layerGap: 280,
  nodeGap: 110,
  padding: 80,
  animate: true,
  bg: '#0c0f1a',
};

const NODE_STYLES: Record<DiagramNode['type'], NodeStyle> = {
  enzyme:    { gradientFrom: '#F97316', gradientTo: '#EA580C', shape: 'hexagon', glowColor: '#F9731640' },
  substrate: { gradientFrom: '#3B82F6', gradientTo: '#2563EB', shape: 'rect', glowColor: '#3B82F640' },
  product:   { gradientFrom: '#8B5CF6', gradientTo: '#7C3AED', shape: 'rect', glowColor: '#8B5CF640' },
  receptor:  { gradientFrom: '#6366F1', gradientTo: '#4338CA', shape: 'pill', glowColor: '#6366F140' },
  effect:    { gradientFrom: '#EF4444', gradientTo: '#DC2626', shape: 'rect', glowColor: '#EF444440' },
  outcome:   { gradientFrom: '#22C55E', gradientTo: '#16A34A', shape: 'rect', glowColor: '#22C55E40', indicator: '✓' },
  organ:     { gradientFrom: '#14B8A6', gradientTo: '#0D9488', shape: 'rect', glowColor: '#14B8A640' },
  drug:      { gradientFrom: '#10B981', gradientTo: '#059669', shape: 'pill', glowColor: '#10B98140', indicator: '✦' },
  blocked:   { gradientFrom: '#6B7280', gradientTo: '#4B5563', shape: 'rect', dashArray: '6 3', glowColor: '#6B728040', indicator: '⊘' },
  decision:  { gradientFrom: '#F59E0B', gradientTo: '#D97706', shape: 'diamond', glowColor: '#F59E0B40' },
  info:      { gradientFrom: '#64748B', gradientTo: '#475569', shape: 'rect', glowColor: '#64748B40' },
  hormone:   { gradientFrom: '#EC4899', gradientTo: '#DB2777', shape: 'pill', glowColor: '#EC489940' },
  ion:       { gradientFrom: '#FBBF24', gradientTo: '#F59E0B', shape: 'rect', glowColor: '#FBBF2440', indicator: '⚡' },
  gene:      { gradientFrom: '#A78BFA', gradientTo: '#7C3AED', shape: 'hexagon', glowColor: '#A78BFA40' },
};

// Organ SVG icon paths (simplified anatomical shapes)
const ORGAN_ICONS: Record<string, string> = {
  heart: `<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" opacity="0.3"/>`,
  brain: `<ellipse cx="12" cy="10" rx="8" ry="7" fill="currentColor" opacity="0.25"/><path d="M9 6c-2 1-3 3-2.5 5M15 6c2 1 3 3 2.5 5M9 10c-1.5 1-2 3-1 4.5M15 10c1.5 1 2 3 1 4.5M12 5v12" stroke="currentColor" stroke-width="1.2" fill="none" opacity="0.5"/>`,
  lung: `<path d="M6 18c0-4 1-8 4-10v-4M18 18c0-4-1-8-4-10v-4M8 14c-1 2-1 4 0 5M16 14c1 2 1 4 0 5" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4"/><path d="M6 18c0 1 2 2 4 2h0M18 18c0 1-2 2-4 2h0" stroke="currentColor" stroke-width="1.2" fill="none" opacity="0.3"/>`,
  kidney: `<path d="M12 4c-4 0-6 3-6 7s2 8 6 8 6-4 6-8-2-7-6-7z" fill="currentColor" opacity="0.25"/><path d="M9 8c0 2 1 4 3 5M12 6v10" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4"/>`,
  liver: `<path d="M4 12c0-4 4-7 10-7s8 3 8 6-3 6-8 7-10-2-10-6z" fill="currentColor" opacity="0.25"/><path d="M8 9c2 1 5 1 8 0" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/>`,
  vessel: `<path d="M4 10c2-3 6-3 8 0s6 3 8 0" stroke="currentColor" stroke-width="2.5" fill="none" opacity="0.4"/><path d="M4 14c2-3 6-3 8 0s6 3 8 0" stroke="currentColor" stroke-width="2" fill="none" opacity="0.25"/>`,
  bone: `<path d="M6 8c-2 0-3 2-2 3s2 1 3 0l5 5c-1 1-1 3 0 3s3-1 3-2l2-2c1 1 3 1 3-1s-1-3-2-2l-5-5c1-1 1-3-1-3s-3 1-2 2z" fill="currentColor" opacity="0.25"/>`,
  eye: `<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z" fill="currentColor" opacity="0.2"/><circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.4"/>`,
  stomach: `<path d="M8 4c0 0-4 2-4 8s4 10 8 10 6-4 6-8-2-8-6-10" fill="currentColor" opacity="0.25"/><path d="M10 6c2 2 4 4 4 8" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/>`,
  pancreas: `<path d="M4 10c2-2 6-1 10 0s6 2 6 4-3 3-7 2-8-2-9-6z" fill="currentColor" opacity="0.25"/>`,
  thyroid: `<path d="M8 8c-2 0-3 2-2 4s3 3 6 3 5-1 6-3 0-4-2-4h-8z" fill="currentColor" opacity="0.25"/>`,
  adrenal: `<path d="M8 6c-3 2-3 6 0 8s8 2 10-1 1-7-2-8-5-1-8 1z" fill="currentColor" opacity="0.25"/>`,
  pituitary: `<ellipse cx="12" cy="12" rx="6" ry="5" fill="currentColor" opacity="0.25"/><path d="M9 10h6M9 12h4M9 14h6" stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.3"/>`,
  ovary: `<ellipse cx="12" cy="12" rx="7" ry="5" fill="currentColor" opacity="0.25"/><circle cx="10" cy="11" r="2" fill="currentColor" opacity="0.2"/><circle cx="14" cy="13" r="1.5" fill="currentColor" opacity="0.2"/>`,
  testis: `<ellipse cx="12" cy="12" rx="5" ry="7" fill="currentColor" opacity="0.25"/><path d="M10 8c1 3 1 6 0 8M14 8c-1 3-1 6 0 8" stroke="currentColor" stroke-width="0.6" fill="none" opacity="0.3"/>`,
};

// Node type emoji icons (small, shown at left of node)
const TYPE_ICONS: Record<string, string> = {
  enzyme: '⚗️',
  substrate: '🧪',
  product: '📦',
  receptor: '📡',
  effect: '⚡',
  outcome: '🎯',
  organ: '🫀',
  drug: '💊',
  blocked: '🚫',
  decision: '❓',
  info: 'ℹ️',
  hormone: '🧬',
  ion: '⚡',
  gene: '🧬',
};

// Edge type directional indicators
const EDGE_INDICATORS: Record<string, string> = {
  normal: '→',
  activation: '→',
  inhibition: '⊣',
  conversion: '→',
  feedback: '↩',
};

const EDGE_VERBS: Record<string, string> = {
  normal: '',
  activation: 'activates',
  inhibition: 'blocks',
  conversion: 'converts',
  feedback: 'feedback',
};

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------

function svgEl(tag: string): SVGElement {
  return document.createElementNS(SVG_NS, tag);
}

function setAttrs(el: SVGElement, attrs: Record<string, string | number>): void {
  for (const [k, v] of Object.entries(attrs)) {
    el.setAttribute(k, String(v));
  }
}

function rectIntersection(
  cx: number, cy: number, w: number, h: number, tx: number, ty: number,
): { x: number; y: number } {
  const dx = tx - cx;
  const dy = ty - cy;
  if (dx === 0 && dy === 0) return { x: cx, y: cy };
  const hw = w / 2;
  const hh = h / 2;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  let scale: number;
  if (absDx * hh > absDy * hw) {
    scale = hw / absDx;
  } else {
    scale = hh / absDy;
  }
  return { x: cx + dx * scale, y: cy + dy * scale };
}

function diamondIntersection(
  cx: number, cy: number, w: number, h: number, tx: number, ty: number,
): { x: number; y: number } {
  const dx = tx - cx;
  const dy = ty - cy;
  if (dx === 0 && dy === 0) return { x: cx, y: cy };
  const hw = w / 2;
  const hh = h / 2;
  const t = 1 / (Math.abs(dx) / hw + Math.abs(dy) / hh);
  return { x: cx + dx * t, y: cy + dy * t };
}

// ---------------------------------------------------------------------------
// DiagramRenderer
// ---------------------------------------------------------------------------

export class DiagramRenderer {
  private container: HTMLElement;
  private opts: RendererOptions;
  private svg: SVGSVGElement | null = null;
  private tooltip: HTMLDivElement | null = null;
  private styleEl: HTMLStyleElement | null = null;

  private nodeLayouts = new Map<string, NodeLayout>();
  private nodeGroups = new Map<string, SVGGElement>();
  private edgePaths: SVGElement[] = [];
  private spec: DiagramSpec | null = null;
  private selectedId: string | null = null;

  // Step number tracking: nodeId → 1-based step number
  private stepNumbers = new Map<string, number>();
  private maxLayer = 0;

  private clickHandler: ((e: MouseEvent) => void) | null = null;
  private moveHandler: ((e: MouseEvent) => void) | null = null;
  private keyHandler: ((e: KeyboardEvent) => void) | null = null;

  constructor(container: HTMLElement, options?: Partial<RendererOptions>) {
    this.container = container;
    this.opts = { ...DEFAULT_OPTIONS, ...options };
  }

  destroy(): void {
    this.removeGlobalListeners();
    if (this.tooltip) { this.tooltip.remove(); this.tooltip = null; }
    if (this.styleEl) { this.styleEl.remove(); this.styleEl = null; }
    if (this.svg) { this.svg.remove(); this.svg = null; }
    this.nodeLayouts.clear();
    this.nodeGroups.clear();
    this.edgePaths = [];
    this.spec = null;
    this.selectedId = null;
    this.stepNumbers.clear();
  }

  render(spec: DiagramSpec): void {
    this.destroy();
    this.spec = spec;

    this.computeLayout(spec);

    const svg = svgEl('svg') as SVGSVGElement;
    svg.setAttribute('xmlns', SVG_NS);
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.display = 'block';
    svg.style.minHeight = '280px';
    this.svg = svg;

    this.renderDefs(svg, spec);

    // Background with subtle grid
    const bg = svgEl('rect');
    setAttrs(bg, { x: -5000, y: -5000, width: 10000, height: 10000, fill: this.opts.bg });
    svg.appendChild(bg);

    // Subtle grid pattern
    const gridG = svgEl('g');
    gridG.setAttribute('class', 'diagram-grid');
    gridG.innerHTML = this.buildGridPattern();
    svg.appendChild(gridG);

    // Pathway direction indicator (semi-transparent arrow watermark)
    this.renderDirectionIndicator(svg, spec);

    // Title
    if (spec.title) {
      const titleY = this.getMinY() - 48;
      const titleWidth = spec.title.length * 11 + 40;
      const centerX = this.getCenterX();

      const titleBg = svgEl('rect');
      setAttrs(titleBg, {
        x: centerX - titleWidth / 2, y: titleY - 22,
        width: titleWidth, height: 32,
        rx: 8, fill: 'rgba(0,229,160,0.08)',
        stroke: 'rgba(0,229,160,0.2)', 'stroke-width': 1,
      });
      svg.appendChild(titleBg);

      const titleEl = svgEl('text');
      setAttrs(titleEl, {
        x: centerX, y: titleY,
        fill: '#00e5a0',
        'font-size': 16,
        'font-weight': 700,
        'font-family': 'system-ui, sans-serif',
        'text-anchor': 'middle',
        'dominant-baseline': 'central',
      });
      titleEl.textContent = `🧬 ${spec.title}`;
      svg.appendChild(titleEl);
    }

    // Groups
    if (spec.groups) {
      this.renderGroups(svg, spec);
    }

    // Edges
    this.renderEdges(svg, spec);

    // Nodes
    this.renderNodes(svg, spec);

    // Legend
    this.renderLegend(svg, spec);

    // Key Steps Summary Bar
    this.renderKeyStepsBar(svg, spec);

    this.applyViewBox(svg);

    if (this.opts.animate) {
      this.injectAnimationStyles();
    }

    this.container.appendChild(svg);
    this.createTooltip();
    this.setupInteractivity();
  }

  // -----------------------------------------------------------------------
  // Layout (improved: bigger nodes, larger layer gap, step numbers)
  // -----------------------------------------------------------------------

  private computeLayout(spec: DiagramSpec): void {
    const isHorizontal = spec.layout !== 'vertical';
    const nodeMap = new Map(spec.nodes.map((n) => [n.id, n]));

    const inDeg = new Map<string, number>();
    const adj = new Map<string, string[]>();
    const radj = new Map<string, string[]>();
    for (const n of spec.nodes) {
      inDeg.set(n.id, 0);
      adj.set(n.id, []);
      radj.set(n.id, []);
    }
    for (const e of spec.edges) {
      if (e.type === 'feedback') continue;
      if (!adj.has(e.from) || !adj.has(e.to)) continue;
      adj.get(e.from)!.push(e.to);
      radj.get(e.to)!.push(e.from);
      inDeg.set(e.to, (inDeg.get(e.to) ?? 0) + 1);
    }

    const queue: string[] = [];
    for (const [id, d] of inDeg) {
      if (d === 0) queue.push(id);
    }
    const topoOrder: string[] = [];
    while (queue.length) {
      const cur = queue.shift()!;
      topoOrder.push(cur);
      for (const nxt of adj.get(cur) ?? []) {
        const nd = (inDeg.get(nxt) ?? 1) - 1;
        inDeg.set(nxt, nd);
        if (nd === 0) queue.push(nxt);
      }
    }
    for (const [id, d] of inDeg) {
      if (d > 0) topoOrder.push(id);
    }

    const layer = new Map<string, number>();
    for (const id of topoOrder) {
      let maxPrev = -1;
      for (const prev of radj.get(id) ?? []) {
        if (layer.has(prev)) maxPrev = Math.max(maxPrev, layer.get(prev)!);
      }
      layer.set(id, maxPrev + 1);
    }

    const layers = new Map<number, string[]>();
    for (const [id, l] of layer) {
      if (!layers.has(l)) layers.set(l, []);
      layers.get(l)!.push(id);
    }

    this.maxLayer = Math.max(...layer.values(), 0);

    // Assign step numbers based on layer (1-based, per layer order)
    this.stepNumbers.clear();
    let globalStep = 1;
    for (let l = 0; l <= this.maxLayer; l++) {
      const layerNodes = layers.get(l) ?? [];
      for (const id of layerNodes) {
        this.stepNumbers.set(id, globalStep++);
      }
    }

    const slot = new Map<string, number>();

    for (let l = 0; l <= this.maxLayer; l++) {
      const nodes = layers.get(l) ?? [];
      nodes.forEach((id, i) => slot.set(id, i));
    }

    // Barycenter refinement
    for (let iter = 0; iter < 5; iter++) {
      for (let l = 0; l <= this.maxLayer; l++) {
        const nodes = layers.get(l) ?? [];
        const bary = new Map<string, number>();
        for (const id of nodes) {
          const neighbours: string[] = [
            ...(adj.get(id) ?? []),
            ...(radj.get(id) ?? []),
          ];
          if (neighbours.length === 0) {
            bary.set(id, slot.get(id) ?? 0);
          } else {
            const sum = neighbours.reduce((s, n) => s + (slot.get(n) ?? 0), 0);
            bary.set(id, sum / neighbours.length);
          }
        }
        nodes.sort((a, b) => (bary.get(a) ?? 0) - (bary.get(b) ?? 0));
        nodes.forEach((id, i) => slot.set(id, i));
        layers.set(l, nodes);
      }
    }

    // Compute even spacing for nodes within each layer
    this.nodeLayouts.clear();
    for (const id of topoOrder) {
      const node = nodeMap.get(id)!;
      const l = layer.get(id) ?? 0;
      const s = slot.get(id) ?? 0;
      const isDiamond = NODE_STYLES[node.type || 'info']?.shape === 'diamond';
      const w = isDiamond ? this.opts.diamondWidth : this.opts.nodeWidth;
      const h = isDiamond ? this.opts.diamondHeight : this.opts.nodeHeight;

      let x: number, y: number;
      // Use user-specified position if provided, otherwise auto-layout
      if (node.x !== undefined && node.y !== undefined) {
        x = node.x;
        y = node.y;
      } else if (isHorizontal) {
        x = this.opts.padding + l * this.opts.layerGap;
        y = this.opts.padding + s * (h + this.opts.nodeGap);
      } else {
        x = this.opts.padding + s * (w + this.opts.nodeGap);
        y = this.opts.padding + l * this.opts.layerGap;
      }

      this.nodeLayouts.set(id, {
        x, y, width: w, height: h,
        layer: l, slot: s,
        stepNumber: this.stepNumbers.get(id) ?? 0,
      });
    }
  }

  private getMinY(): number {
    let min = Infinity;
    for (const p of this.nodeLayouts.values()) {
      min = Math.min(min, p.y - p.height / 2);
    }
    return min === Infinity ? 0 : min;
  }

  private getCenterX(): number {
    let sum = 0;
    let count = 0;
    for (const p of this.nodeLayouts.values()) {
      sum += p.x;
      count++;
    }
    return count === 0 ? 0 : sum / count;
  }

  private getCenterY(): number {
    let sum = 0;
    let count = 0;
    for (const p of this.nodeLayouts.values()) {
      sum += p.y;
      count++;
    }
    return count === 0 ? 0 : sum / count;
  }

  // -----------------------------------------------------------------------
  // Grid background
  // -----------------------------------------------------------------------

  private buildGridPattern(): string {
    let dots = '';
    for (let x = -2000; x < 4000; x += 30) {
      for (let y = -2000; y < 4000; y += 30) {
        dots += `<circle cx="${x}" cy="${y}" r="0.6" fill="rgba(255,255,255,0.04)"/>`;
      }
    }
    return dots;
  }

  // -----------------------------------------------------------------------
  // Pathway direction indicator (semi-transparent watermark arrow)
  // -----------------------------------------------------------------------

  private renderDirectionIndicator(svg: SVGSVGElement, spec: DiagramSpec): void {
    const isHorizontal = spec.layout !== 'vertical';
    const cx = this.getCenterX();
    const cy = this.getCenterY();

    const indicatorG = svgEl('g');
    indicatorG.setAttribute('class', 'diagram-direction-indicator');

    if (isHorizontal) {
      // Right-pointing arrow watermark
      const arrowPath = svgEl('path');
      setAttrs(arrowPath, {
        d: `M ${cx - 200} ${cy - 40} L ${cx + 140} ${cy - 40} L ${cx + 140} ${cy - 70} L ${cx + 220} ${cy} L ${cx + 140} ${cy + 70} L ${cx + 140} ${cy + 40} L ${cx - 200} ${cy + 40} Z`,
        fill: 'rgba(255,255,255,0.015)',
        stroke: 'rgba(255,255,255,0.03)',
        'stroke-width': 1.5,
      });
      indicatorG.appendChild(arrowPath);

      // Arrow text
      const arrowText = svgEl('text');
      setAttrs(arrowText, {
        x: cx + 10, y: cy + 4,
        fill: 'rgba(255,255,255,0.04)',
        'font-size': 28,
        'font-weight': 800,
        'font-family': 'system-ui, sans-serif',
        'text-anchor': 'middle',
        'dominant-baseline': 'central',
        'pointer-events': 'none',
      });
      arrowText.textContent = 'FLOW →';
      indicatorG.appendChild(arrowText);
    } else {
      // Downward arrow watermark
      const arrowPath = svgEl('path');
      setAttrs(arrowPath, {
        d: `M ${cx - 40} ${cy - 200} L ${cx + 40} ${cy - 200} L ${cx + 40} ${cy + 140} L ${cx + 70} ${cy + 140} L ${cx} ${cy + 220} L ${cx - 70} ${cy + 140} L ${cx - 40} ${cy + 140} Z`,
        fill: 'rgba(255,255,255,0.015)',
        stroke: 'rgba(255,255,255,0.03)',
        'stroke-width': 1.5,
      });
      indicatorG.appendChild(arrowPath);

      const arrowText = svgEl('text');
      setAttrs(arrowText, {
        x: cx, y: cy + 10,
        fill: 'rgba(255,255,255,0.04)',
        'font-size': 28,
        'font-weight': 800,
        'font-family': 'system-ui, sans-serif',
        'text-anchor': 'middle',
        'dominant-baseline': 'central',
        'pointer-events': 'none',
      });
      arrowText.textContent = '↓ FLOW';
      indicatorG.appendChild(arrowText);
    }

    svg.appendChild(indicatorG);
  }

  // -----------------------------------------------------------------------
  // SVG defs
  // -----------------------------------------------------------------------

  private renderDefs(svg: SVGSVGElement, spec: DiagramSpec): void {
    const defs = svgEl('defs');

    // Node gradients
    const seenTypes = new Set<string>();
    for (const n of spec.nodes) {
      const nType = n.type || 'info';
      if (seenTypes.has(nType)) continue;
      seenTypes.add(nType);
      const st = NODE_STYLES[nType];
      if (!st) continue;
      const grad = svgEl('linearGradient');
      setAttrs(grad, { id: `grad-${nType}`, x1: 0, y1: 0, x2: 1, y2: 1 });
      const s1 = svgEl('stop');
      setAttrs(s1, { offset: '0%', 'stop-color': st.gradientFrom });
      const s2 = svgEl('stop');
      setAttrs(s2, { offset: '100%', 'stop-color': st.gradientTo });
      grad.appendChild(s1);
      grad.appendChild(s2);
      defs.appendChild(grad);
    }

    // Arrow markers — clean, solid filled triangles with professional sizing
    const arrowColor = '#94A3B8';
    const markers: Array<{ id: string; content: string; viewBox: string; refX: number; refY: number; markerW: number; markerH: number }> = [
      {
        id: 'arrow-normal',
        content: `<path d="M0,-6 L14,0 L0,6 Z" fill="${arrowColor}"/>`,
        viewBox: '-1 -7 17 14', refX: 14, refY: 0, markerW: 14, markerH: 14,
      },
      {
        id: 'arrow-activation',
        content: `<path d="M0,-7 L16,0 L0,7 Z" fill="#22C55E"/>`,
        viewBox: '-1 -8 19 16', refX: 16, refY: 0, markerW: 16, markerH: 16,
      },
      {
        id: 'arrow-inhibition',
        content: `<line x1="5" y1="-9" x2="5" y2="9" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round"/>`,
        viewBox: '-1 -10 12 20', refX: 5, refY: 0, markerW: 10, markerH: 18,
      },
      {
        id: 'arrow-conversion',
        content: `<path d="M0,-7 L16,0 L0,7 Z" fill="#A78BFA"/>`,
        viewBox: '-1 -8 19 16', refX: 16, refY: 0, markerW: 16, markerH: 16,
      },
      {
        id: 'arrow-feedback',
        content: `<path d="M0,-6 L14,0 L0,6 Z" fill="#F59E0B"/>`,
        viewBox: '-1 -7 17 14', refX: 14, refY: 0, markerW: 14, markerH: 14,
      },
    ];
    for (const m of markers) {
      const marker = svgEl('marker');
      setAttrs(marker, {
        id: m.id,
        viewBox: m.viewBox,
        refX: m.refX,
        refY: m.refY,
        markerWidth: m.markerW,
        markerHeight: m.markerH,
        orient: 'auto',
        markerUnits: 'userSpaceOnUse',
      });
      marker.innerHTML = m.content;
      defs.appendChild(marker);
    }

    // Glow filter
    const filter = svgEl('filter');
    setAttrs(filter, { id: 'node-glow', x: '-40%', y: '-40%', width: '180%', height: '180%' });
    const blur = svgEl('feGaussianBlur');
    setAttrs(blur, { stdDeviation: 6, result: 'blur' });
    const merge = svgEl('feMerge');
    const mn1 = svgEl('feMergeNode'); mn1.setAttribute('in', 'blur');
    const mn2 = svgEl('feMergeNode'); mn2.setAttribute('in', 'SourceGraphic');
    merge.appendChild(mn1); merge.appendChild(mn2);
    filter.appendChild(blur); filter.appendChild(merge);
    defs.appendChild(filter);

    // Drop shadow
    const shadow = svgEl('filter');
    setAttrs(shadow, { id: 'node-shadow', x: '-15%', y: '-15%', width: '140%', height: '160%' });
    const feShadow = svgEl('feDropShadow');
    setAttrs(feShadow, { dx: 0, dy: 3, stdDeviation: 4, 'flood-color': '#000000', 'flood-opacity': 0.5 });
    shadow.appendChild(feShadow);
    defs.appendChild(shadow);

    // Inner glow for selected
    const innerGlow = svgEl('filter');
    setAttrs(innerGlow, { id: 'node-selected', x: '-20%', y: '-20%', width: '140%', height: '140%' });
    const igBlur = svgEl('feGaussianBlur');
    setAttrs(igBlur, { stdDeviation: 3, result: 'blur' });
    const igFlood = svgEl('feFlood');
    setAttrs(igFlood, { 'flood-color': '#00e5a0', 'flood-opacity': 0.6, result: 'color' });
    const igComposite = svgEl('feComposite');
    setAttrs(igComposite, { in: 'color', in2: 'blur', operator: 'in', result: 'glow' });
    const igMerge = svgEl('feMerge');
    const igM1 = svgEl('feMergeNode'); igM1.setAttribute('in', 'glow');
    const igM2 = svgEl('feMergeNode'); igM2.setAttribute('in', 'SourceGraphic');
    igMerge.appendChild(igM1); igMerge.appendChild(igM2);
    innerGlow.appendChild(igBlur); innerGlow.appendChild(igFlood);
    innerGlow.appendChild(igComposite); innerGlow.appendChild(igMerge);
    defs.appendChild(innerGlow);

    svg.appendChild(defs);
  }

  // -----------------------------------------------------------------------
  // Group boxes
  // -----------------------------------------------------------------------

  private renderGroups(svg: SVGSVGElement, spec: DiagramSpec): void {
    const groupsLayer = svgEl('g');
    groupsLayer.setAttribute('class', 'diagram-groups');

    for (const g of spec.groups ?? []) {
      const positions = g.nodes
        .map((nid) => this.nodeLayouts.get(nid))
        .filter(Boolean) as NodeLayout[];

      if (positions.length === 0) continue;

      const pad = 32;
      const labelH = 28;
      const minX = Math.min(...positions.map((p) => p.x - p.width / 2)) - pad;
      const minY = Math.min(...positions.map((p) => p.y - p.height / 2)) - pad - labelH;
      const maxX = Math.max(...positions.map((p) => p.x + p.width / 2)) + pad;
      const maxY = Math.max(...positions.map((p) => p.y + p.height / 2)) + pad;
      const w = maxX - minX;
      const h = maxY - minY;

      const rect = svgEl('rect');
      setAttrs(rect, {
        x: minX, y: minY, width: w, height: h,
        rx: 14, fill: g.color, 'fill-opacity': 0.06,
        stroke: g.color, 'stroke-opacity': 0.3, 'stroke-width': 1.5,
        'stroke-dasharray': '8 4',
      });
      groupsLayer.appendChild(rect);

      const label = svgEl('text');
      setAttrs(label, {
        x: minX + 14, y: minY + 18,
        fill: g.color, 'font-size': 12, 'font-weight': 700,
        'font-family': 'system-ui, sans-serif', opacity: 0.8,
      });
      label.textContent = `📦 ${g.label}`;
      groupsLayer.appendChild(label);
    }

    svg.appendChild(groupsLayer);
  }

  // -----------------------------------------------------------------------
  // Edges — improved with flow dots, better labels, T-bar for inhibition
  // -----------------------------------------------------------------------

  private renderEdges(svg: SVGSVGElement, spec: DiagramSpec): void {
    const edgesLayer = svgEl('g');
    edgesLayer.setAttribute('class', 'diagram-edges');
    this.edgePaths = [];

    let edgeIdx = 0;
    for (const e of spec.edges) {
      const fromL = this.nodeLayouts.get(e.from);
      const toL = this.nodeLayouts.get(e.to);
      if (!fromL || !toL) continue;

      const eType = e.type ?? 'normal';
      const fromNode = spec.nodes.find((n) => n.id === e.from);
      const toNode = spec.nodes.find((n) => n.id === e.to);

      const path = this.buildEdgePath(fromL, toL, eType, fromNode, toNode);

      const pathEl = svgEl('path');
      const strokeColor = eType === 'feedback' ? '#F59E0B' :
        eType === 'activation' ? '#22C55E' :
        eType === 'inhibition' ? '#EF4444' :
        eType === 'conversion' ? '#A78BFA' : '#94A3B8';
      const strokeWidth = eType === 'feedback' ? 2.0 :
        eType === 'inhibition' ? 2.8 : 2.5;

      setAttrs(pathEl, {
        d: path, fill: 'none',
        stroke: strokeColor,
        'stroke-width': strokeWidth,
        'stroke-opacity': 0.7,
        'marker-end': `url(#arrow-${eType})`,
        class: 'diagram-edge',
        'data-from': e.from,
        'data-to': e.to,
        'data-type': eType,
      });
      if (eType === 'feedback') {
        pathEl.setAttribute('stroke-dasharray', '8 4');
      }

      if (this.opts.animate) {
        pathEl.style.animationDelay = `${0.3 + edgeIdx * 0.05}s`;
      }
      edgesLayer.appendChild(pathEl);
      this.edgePaths.push(pathEl);

      // Animated flow dots for activation/conversion edges
      if ((eType === 'activation' || eType === 'conversion') && this.opts.animate) {
        const flowDot = svgEl('circle');
        setAttrs(flowDot, {
          r: 3.5,
          fill: strokeColor,
          opacity: 0.9,
          class: 'diagram-flow-dot',
        });
        const animMotion = svgEl('animateMotion');
        setAttrs(animMotion, {
          dur: `${2 + edgeIdx * 0.3}s`,
          repeatCount: 'indefinite',
          path: path,
        });
        flowDot.appendChild(animMotion);
        edgesLayer.appendChild(flowDot);
      }

      // Edge label with improved background pill and directional indicator
      if (e.label) {
        const mid = this.edgeMidpoint(fromL, toL, eType);
        const indicator = EDGE_INDICATORS[eType] || '→';
        const verb = EDGE_VERBS[eType] || '';
        const fullLabel = verb ? `${indicator} ${e.label}` : `${indicator} ${e.label}`;

        const labelWidth = fullLabel.length * 6.5 + 20;
        const labelHeight = 20;
        const labelBg = svgEl('rect');
        setAttrs(labelBg, {
          x: mid.x - labelWidth / 2, y: mid.y - labelHeight / 2 - 2,
          width: labelWidth, height: labelHeight,
          rx: 8, fill: this.opts.bg,
          stroke: strokeColor, 'stroke-opacity': 0.4, 'stroke-width': 1,
        });
        edgesLayer.appendChild(labelBg);

        const textEl = svgEl('text');
        setAttrs(textEl, {
          x: mid.x, y: mid.y + 1,
          fill: strokeColor,
          'font-size': 10,
          'font-weight': 700,
          'font-family': 'system-ui, sans-serif',
          'text-anchor': 'middle',
          'dominant-baseline': 'central',
          'pointer-events': 'none',
        });
        textEl.textContent = fullLabel;
        edgesLayer.appendChild(textEl);
      } else {
        // Even without a label, show a small directional indicator for typed edges
        if (eType !== 'normal') {
          const mid = this.edgeMidpoint(fromL, toL, eType);
          const indicator = EDGE_INDICATORS[eType] || '';
          if (indicator) {
            const indBg = svgEl('rect');
            const indW = indicator.length * 8 + 12;
            setAttrs(indBg, {
              x: mid.x - indW / 2, y: mid.y - 12,
              width: indW, height: 18,
              rx: 6, fill: this.opts.bg,
              stroke: strokeColor, 'stroke-opacity': 0.3, 'stroke-width': 0.8,
            });
            edgesLayer.appendChild(indBg);

            const indText = svgEl('text');
            setAttrs(indText, {
              x: mid.x, y: mid.y - 1,
              fill: strokeColor,
              'font-size': 10,
              'font-weight': 700,
              'font-family': 'system-ui, sans-serif',
              'text-anchor': 'middle',
              'dominant-baseline': 'central',
              'pointer-events': 'none',
            });
            const verb = EDGE_VERBS[eType] || '';
            indText.textContent = `${indicator} ${verb}`;
            edgesLayer.appendChild(indText);
          }
        }
      }

      edgeIdx++;
    }

    svg.appendChild(edgesLayer);
  }

  private buildEdgePath(
    fromL: NodeLayout, toL: NodeLayout, eType: string,
    fromNode?: DiagramNode, toNode?: DiagramNode,
  ): string {
    const fromShape = fromNode ? NODE_STYLES[fromNode.type]?.shape ?? 'rect' : 'rect';
    const toShape = toNode ? NODE_STYLES[toNode.type]?.shape ?? 'rect' : 'rect';

    const cx1 = fromL.x; const cy1 = fromL.y;
    const cx2 = toL.x; const cy2 = toL.y;

    let start: { x: number; y: number };
    let end: { x: number; y: number };

    if (fromShape === 'diamond') {
      start = diamondIntersection(cx1, cy1, fromL.width, fromL.height, cx2, cy2);
    } else {
      start = rectIntersection(cx1, cy1, fromL.width, fromL.height, cx2, cy2);
    }

    if (toShape === 'diamond') {
      end = diamondIntersection(cx2, cy2, toL.width, toL.height, cx1, cy1);
    } else {
      end = rectIntersection(cx2, cy2, toL.width, toL.height, cx1, cy1);
    }

    // Pull back the endpoint so the arrowhead doesn't overlap the target node.
    // Arrow marker lengths: normal=14, activation=16, inhibition=10, conversion=16, feedback=14
    const arrowPullback = eType === 'inhibition' ? 6 :
      eType === 'activation' || eType === 'conversion' ? 8 : 7;
    const edx = end.x - start.x;
    const edy = end.y - start.y;
    const elen = Math.sqrt(edx * edx + edy * edy) || 1;
    end = {
      x: end.x - (edx / elen) * arrowPullback,
      y: end.y - (edy / elen) * arrowPullback,
    };

    if (eType === 'feedback') {
      // More pronounced curve for feedback
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const off = Math.max(90, len * 0.5);
      const nx = -dy / len;
      const ny = dx / len;
      const cpx = (start.x + end.x) / 2 + nx * off;
      const cpy = (start.y + end.y) / 2 + ny * off;
      return `M ${start.x} ${start.y} Q ${cpx} ${cpy} ${end.x} ${end.y}`;
    }

    // Curved edges for nicer look
    const mx = (start.x + end.x) / 2;
    const my = (start.y + end.y) / 2;
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const bend = Math.min(18, Math.sqrt(dx * dx + dy * dy) * 0.06);

    return `M ${start.x} ${start.y} Q ${mx} ${my - bend} ${end.x} ${end.y}`;
  }

  private edgeMidpoint(
    fromL: NodeLayout, toL: NodeLayout, eType: string,
  ): { x: number; y: number } {
    if (eType === 'feedback') {
      const dx = toL.x - fromL.x;
      const dy = toL.y - fromL.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const off = Math.max(90, len * 0.5);
      const nx = -dy / len;
      const ny = dx / len;
      return {
        x: (fromL.x + toL.x) / 2 + nx * off * 0.5,
        y: (fromL.y + toL.y) / 2 + ny * off * 0.5,
      };
    }
    return { x: (fromL.x + toL.x) / 2, y: (fromL.y + toL.y) / 2 };
  }

  // -----------------------------------------------------------------------
  // Nodes — enhanced with step numbers, START/END badges, indicators
  // -----------------------------------------------------------------------

  private renderNodes(svg: SVGSVGElement, spec: DiagramSpec): void {
    const nodesLayer = svgEl('g');
    nodesLayer.setAttribute('class', 'diagram-nodes');
    this.nodeGroups.clear();

    let idx = 0;
    for (const node of spec.nodes) {
      const layout = this.nodeLayouts.get(node.id);
      if (!layout) continue;

      const g = svgEl('g') as SVGGElement;
      g.setAttribute('class', 'diagram-node');
      g.setAttribute('data-id', node.id);
      g.style.cursor = 'pointer';

      if (this.opts.animate) {
        g.style.opacity = '0';
        g.style.animationDelay = `${0.08 + idx * 0.06}s`;
      }

      const st = NODE_STYLES[node.type || 'info'] || NODE_STYLES.info;
      const { x, y, width: w, height: h } = layout;

      // Render shape
      if (st.shape === 'diamond') {
        this.renderDiamond(g, node, x, y, w, h, st);
      } else if (st.shape === 'pill') {
        this.renderPill(g, node, x, y, w, h, st);
      } else if (st.shape === 'hexagon') {
        this.renderHexagon(g, node, x, y, w, h, st);
      } else {
        this.renderRect(g, node, x, y, w, h, st);
      }

      nodesLayer.appendChild(g);
      this.nodeGroups.set(node.id, g);
      idx++;
    }

    svg.appendChild(nodesLayer);
  }

  private renderRect(
    g: SVGGElement, node: DiagramNode, cx: number, cy: number,
    w: number, h: number, st: NodeStyle,
  ): void {
    if (st.glowColor) {
      const glowRect = svgEl('rect');
      setAttrs(glowRect, {
        x: cx - w / 2 - 4, y: cy - h / 2 - 4,
        width: w + 8, height: h + 8,
        rx: 14, fill: st.glowColor, opacity: 0.3,
        filter: 'url(#node-glow)',
      });
      g.appendChild(glowRect);
    }

    const rect = svgEl('rect');
    setAttrs(rect, {
      x: cx - w / 2, y: cy - h / 2,
      width: w, height: h,
      rx: 12,
            fill: `url(#grad-${node.type || 'info'})`,
      filter: 'url(#node-shadow)',
    });
    if (st.dashArray) {
      rect.setAttribute('stroke', '#9CA3AF');
      rect.setAttribute('stroke-width', '2');
      rect.setAttribute('stroke-dasharray', st.dashArray);
    }
    g.appendChild(rect);

    // Subtle inner highlight
    const highlight = svgEl('rect');
    setAttrs(highlight, {
      x: cx - w / 2 + 2, y: cy - h / 2 + 2,
      width: w - 4, height: h / 3,
      rx: 10,
      fill: 'rgba(255,255,255,0.08)',
    });
    g.appendChild(highlight);

    this.renderNodeContent(g, node, cx, cy, w, h, st);
  }

  private renderPill(
    g: SVGGElement, node: DiagramNode, cx: number, cy: number,
    w: number, h: number, st: NodeStyle,
  ): void {
    if (st.glowColor) {
      const glowRect = svgEl('rect');
      setAttrs(glowRect, {
        x: cx - w / 2 - 4, y: cy - h / 2 - 4,
        width: w + 8, height: h + 8,
        rx: h / 2 + 4, fill: st.glowColor, opacity: 0.3,
      });
      g.appendChild(glowRect);
    }

    const rect = svgEl('rect');
    setAttrs(rect, {
      x: cx - w / 2, y: cy - h / 2,
      width: w, height: h,
      rx: h / 2,
            fill: `url(#grad-${node.type || 'info'})`,
      filter: 'url(#node-shadow)',
    });
    if (st.dashArray) {
      rect.setAttribute('stroke', '#9CA3AF');
      rect.setAttribute('stroke-width', '2');
      rect.setAttribute('stroke-dasharray', st.dashArray);
    }
    g.appendChild(rect);

    this.renderNodeContent(g, node, cx, cy, w, h, st);
  }

  private renderHexagon(
    g: SVGGElement, node: DiagramNode, cx: number, cy: number,
    w: number, h: number, st: NodeStyle,
  ): void {
    const indent = 20;
    const points = [
      `${cx - w / 2 + indent},${cy - h / 2}`,
      `${cx + w / 2 - indent},${cy - h / 2}`,
      `${cx + w / 2},${cy}`,
      `${cx + w / 2 - indent},${cy + h / 2}`,
      `${cx - w / 2 + indent},${cy + h / 2}`,
      `${cx - w / 2},${cy}`,
    ].join(' ');

    const poly = svgEl('polygon');
    setAttrs(poly, {
      points,
            fill: `url(#grad-${node.type || 'info'})`,
      filter: 'url(#node-shadow)',
    });
    g.appendChild(poly);

    this.renderNodeContent(g, node, cx, cy, w, h, st);
  }

  private renderDiamond(
    g: SVGGElement, node: DiagramNode, cx: number, cy: number,
    w: number, h: number, st: NodeStyle,
  ): void {
    const points = `${cx},${cy - h / 2} ${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx - w / 2},${cy}`;
    const poly = svgEl('polygon');
    setAttrs(poly, {
      points,
            fill: `url(#grad-${node.type || 'info'})`,
      filter: 'url(#node-shadow)',
    });
    g.appendChild(poly);

    this.renderNodeContent(g, node, cx, cy, w, h, st);
  }

  private renderNodeContent(
    g: SVGGElement, node: DiagramNode, cx: number, cy: number,
    w: number, h: number, st: NodeStyle,
  ): void {
    const layout = this.nodeLayouts.get(node.id);
    const stepNum = layout?.stepNumber ?? 0;
    const nodeLayer = layout?.layer ?? 0;
    const hasSub = !!node.subtitle;
    const labelOffset = hasSub ? -9 : 0;
    const subOffset = hasSub ? 11 : 0;

    // ── Step number badge (top-left, circular) ──
    if (stepNum > 0) {
      const badgeR = 11;
      const badgeCx = cx - w / 2 + badgeR + 2;
      const badgeCy = cy - h / 2 + badgeR + 2;

      const stepCircle = svgEl('circle');
      setAttrs(stepCircle, {
        cx: badgeCx, cy: badgeCy, r: badgeR,
        fill: 'rgba(0,0,0,0.6)',
        stroke: st.gradientFrom, 'stroke-width': 1.5,
      });
      g.appendChild(stepCircle);

      const stepText = svgEl('text');
      setAttrs(stepText, {
        x: badgeCx, y: badgeCy,
        fill: '#FFFFFF',
        'font-size': 10,
        'font-weight': 800,
        'font-family': 'system-ui, sans-serif',
        'text-anchor': 'middle',
        'dominant-baseline': 'central',
        'pointer-events': 'none',
      });
      stepText.textContent = String(stepNum);
      g.appendChild(stepText);
    }

    // ── START badge ──
    if (nodeLayer === 0) {
      const startW = 36;
      const startH = 14;
      const startCx = cx + w / 2 - startW / 2 - 2;
      const startCy = cy - h / 2 + startH / 2 + 2;

      const startBg = svgEl('rect');
      setAttrs(startBg, {
        x: startCx - startW / 2, y: startCy - startH / 2,
        width: startW, height: startH,
        rx: 4,
        fill: 'rgba(34,197,94,0.7)',
      });
      g.appendChild(startBg);

      const startText = svgEl('text');
      setAttrs(startText, {
        x: startCx, y: startCy,
        fill: '#FFFFFF',
        'font-size': 7,
        'font-weight': 800,
        'font-family': 'system-ui, sans-serif',
        'text-anchor': 'middle',
        'dominant-baseline': 'central',
        'pointer-events': 'none',
        'letter-spacing': '0.5px',
      });
      startText.textContent = 'START';
      g.appendChild(startText);
    }

    // ── END badge ──
    if (nodeLayer === this.maxLayer) {
      const endW = 28;
      const endH = 14;
      const endCx = cx + w / 2 - endW / 2 - 2;
      const endCy = cy - h / 2 + endH / 2 + 2;

      // If this node also has START badge (single-layer diagram), shift END badge left
      const shiftX = nodeLayer === 0 ? -42 : 0;

      const endBg = svgEl('rect');
      setAttrs(endBg, {
        x: endCx - endW / 2 + shiftX, y: endCy - endH / 2,
        width: endW, height: endH,
        rx: 4,
        fill: 'rgba(239,68,68,0.7)',
      });
      g.appendChild(endBg);

      const endText = svgEl('text');
      setAttrs(endText, {
        x: endCx + shiftX, y: endCy,
        fill: '#FFFFFF',
        'font-size': 7,
        'font-weight': 800,
        'font-family': 'system-ui, sans-serif',
        'text-anchor': 'middle',
        'dominant-baseline': 'central',
        'pointer-events': 'none',
        'letter-spacing': '0.5px',
      });
      endText.textContent = 'END';
      g.appendChild(endText);
    }

    // ── Icon (emoji or organ) ──
    const iconStr = node.icon || TYPE_ICONS[node.type || 'info'] || '';
    if (iconStr) {
      if (ORGAN_ICONS[iconStr]) {
        const iconG = svgEl('g');
        setAttrs(iconG, {
          transform: `translate(${cx - w / 2 + 22},${cy + labelOffset - 4}) scale(0.65)`,
        });
        iconG.innerHTML = `<g style="color:rgba(255,255,255,0.5)">${ORGAN_ICONS[iconStr]}</g>`;
        g.appendChild(iconG);
      } else {
        const iconText = svgEl('text');
        setAttrs(iconText, {
          x: cx - w / 2 + 24,
          y: cy + labelOffset + 2,
          'font-size': 15,
          'text-anchor': 'middle',
          'dominant-baseline': 'central',
          'pointer-events': 'none',
        });
        iconText.textContent = iconStr;
        g.appendChild(iconText);
      }
    }

    // ── Label ──
    const label = svgEl('text');
    const textX = iconStr ? cx + 6 : cx;
    setAttrs(label, {
      x: textX,
      y: cy + labelOffset,
      fill: '#FFFFFF',
      'font-size': 13,
      'font-weight': 700,
      'font-family': 'system-ui, sans-serif',
      'text-anchor': 'middle',
      'dominant-baseline': 'central',
      'pointer-events': 'none',
    });
    label.textContent = this.truncate(node.label, 22);
    g.appendChild(label);

    // ── Subtitle ──
    if (hasSub) {
      const sub = svgEl('text');
      setAttrs(sub, {
        x: textX,
        y: cy + subOffset,
        fill: '#FFFFFF',
        'font-size': 10,
        'font-family': 'system-ui, sans-serif',
        'text-anchor': 'middle',
        'dominant-baseline': 'central',
        opacity: 0.65,
        'pointer-events': 'none',
      });
      sub.textContent = this.truncate(node.subtitle!, 26);
      g.appendChild(sub);
    }

    // ── Type indicator badge (bottom-right) ──
    const indicator = st.indicator || '';
    const typeLabel = indicator ? `${indicator} ${node.type || 'info'}` : (node.type || 'info');
    const badgeW = typeLabel.length * 5.5 + 10;
    const badgeBg = svgEl('rect');
    setAttrs(badgeBg, {
      x: cx + w / 2 - badgeW - 4,
      y: cy + h / 2 - 15,
      width: badgeW, height: 13,
      rx: 3,
      fill: 'rgba(0,0,0,0.45)',
    });
    g.appendChild(badgeBg);

    const badgeText = svgEl('text');
    setAttrs(badgeText, {
      x: cx + w / 2 - badgeW / 2 - 4,
      y: cy + h / 2 - 8,
      fill: 'rgba(255,255,255,0.6)',
      'font-size': 7,
      'font-weight': 600,
      'font-family': 'system-ui, sans-serif',
      'text-anchor': 'middle',
      'dominant-baseline': 'central',
      'pointer-events': 'none',
    });
    badgeText.textContent = typeLabel;
    g.appendChild(badgeText);
  }

  // -----------------------------------------------------------------------
  // Legend
  // -----------------------------------------------------------------------

  private renderLegend(svg: SVGSVGElement, spec: DiagramSpec): void {
    const usedTypes = new Set(spec.nodes.map((n) => n.type || 'info'));
    if (usedTypes.size <= 1) return;

    const legendItems = Array.from(usedTypes).slice(0, 8);
    const legendG = svgEl('g');
    legendG.setAttribute('class', 'diagram-legend');

    const maxX = Math.max(...Array.from(this.nodeLayouts.values()).map((p) => p.x + p.width / 2));
    const minY = this.getMinY();
    const lx = maxX + 50;
    const ly = minY;

    // Legend background
    const bg = svgEl('rect');
    setAttrs(bg, {
      x: lx - 10, y: ly - 10,
      width: 140, height: legendItems.length * 22 + 30,
      rx: 8, fill: 'rgba(255,255,255,0.03)',
      stroke: 'rgba(255,255,255,0.06)', 'stroke-width': 1,
    });
    legendG.appendChild(bg);

    const title = svgEl('text');
    setAttrs(title, {
      x: lx, y: ly + 8,
      fill: '#64748B', 'font-size': 9,
      'font-weight': 700, 'font-family': 'system-ui, sans-serif',
      'text-transform': 'uppercase', 'letter-spacing': '1px',
    });
    title.textContent = 'LEGEND';
    legendG.appendChild(title);

    legendItems.forEach((type, i) => {
      const st = NODE_STYLES[type] || NODE_STYLES.info;
      const iy = ly + 26 + i * 22;

      const dot = svgEl('rect');
      setAttrs(dot, {
        x: lx, y: iy - 5,
        width: 14, height: 14,
        rx: 4,
        fill: st.gradientFrom,
      });
      legendG.appendChild(dot);

      const indicator = st.indicator || '';
      const label = svgEl('text');
      setAttrs(label, {
        x: lx + 20, y: iy + 5,
        fill: '#94A3B8', 'font-size': 10,
        'font-family': 'system-ui, sans-serif',
      });
      label.textContent = `${TYPE_ICONS[type] || ''} ${type}${indicator ? ' ' + indicator : ''}`;
      legendG.appendChild(label);
    });

    svg.appendChild(legendG);
  }

  // -----------------------------------------------------------------------
  // Key Steps Summary Bar
  // -----------------------------------------------------------------------

  private renderKeyStepsBar(svg: SVGSVGElement, spec: DiagramSpec): void {
    // Build ordered sequence from layers
    const layerNodes = new Map<number, DiagramNode[]>();
    for (const node of spec.nodes) {
      const layout = this.nodeLayouts.get(node.id);
      if (!layout) continue;
      if (!layerNodes.has(layout.layer)) layerNodes.set(layout.layer, []);
      layerNodes.get(layout.layer)!.push(node);
    }

    if (layerNodes.size === 0) return;

    // Pick the first node per layer (main pathway)
    const keyNodes: DiagramNode[] = [];
    for (let l = 0; l <= this.maxLayer; l++) {
      const nodes = layerNodes.get(l) ?? [];
      if (nodes.length > 0) keyNodes.push(nodes[0]);
    }

    if (keyNodes.length < 2) return;

    // Build summary text
    const circledDigits = '①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳';
    const parts = keyNodes.map((n) => {
      const step = this.stepNumbers.get(n.id) ?? 0;
      const circled = step > 0 && step <= 20 ? circledDigits[step - 1] : `${step}`;
      return `${circled} ${n.label}`;
    });

    // Also add intermediate arrows
    const summaryText = parts.join(' → ');

    // Position below the diagram
    const maxY = Math.max(...Array.from(this.nodeLayouts.values()).map((p) => p.y + p.height / 2));
    const centerX = this.getCenterX();
    const barY = maxY + 50;

    const barG = svgEl('g');
    barG.setAttribute('class', 'diagram-key-steps');

    // Background bar
    const barWidth = summaryText.length * 6 + 40;
    const barBg = svgEl('rect');
    setAttrs(barBg, {
      x: centerX - barWidth / 2, y: barY - 14,
      width: barWidth, height: 28,
      rx: 14, fill: 'rgba(0,229,160,0.06)',
      stroke: 'rgba(0,229,160,0.15)', 'stroke-width': 1,
    });
    barG.appendChild(barBg);

    // Label
    const labelEl = svgEl('text');
    setAttrs(labelEl, {
      x: centerX, y: barY + 2,
      fill: '#00e5a0',
      'font-size': 11,
      'font-weight': 700,
      'font-family': 'system-ui, sans-serif',
      'text-anchor': 'middle',
      'dominant-baseline': 'central',
      'pointer-events': 'none',
      opacity: 0.9,
    });
    labelEl.textContent = `Key Steps: ${summaryText}`;
    barG.appendChild(labelEl);

    svg.appendChild(barG);
  }

  // -----------------------------------------------------------------------
  // ViewBox
  // -----------------------------------------------------------------------

  private applyViewBox(svg: SVGSVGElement): void {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const p of this.nodeLayouts.values()) {
      minX = Math.min(minX, p.x - p.width / 2);
      minY = Math.min(minY, p.y - p.height / 2);
      maxX = Math.max(maxX, p.x + p.width / 2);
      maxY = Math.max(maxY, p.y + p.height / 2);
    }

    if (this.spec?.groups) {
      for (const g of this.spec.groups) {
        const positions = g.nodes.map((nid) => this.nodeLayouts.get(nid)).filter(Boolean) as NodeLayout[];
        if (positions.length === 0) continue;
        const pad = 32;
        const labelH = 28;
        minX = Math.min(minX, Math.min(...positions.map((p) => p.x - p.width / 2)) - pad);
        minY = Math.min(minY, Math.min(...positions.map((p) => p.y - p.height / 2)) - pad - labelH);
        maxX = Math.max(maxX, Math.max(...positions.map((p) => p.x + p.width / 2)) + pad);
        maxY = Math.max(maxY, Math.max(...positions.map((p) => p.y + p.height / 2)) + pad);
      }
    }

    if (this.spec?.title) {
      minY = Math.min(minY, this.getMinY() - 60);
    }

    // Legend
    const legendExtra = 190;
    maxX += legendExtra;

    // Key Steps bar
    maxY += 60;

    const vbPad = 50;
    minX -= vbPad;
    minY -= vbPad;
    maxX += vbPad;
    maxY += vbPad;

    if (minX === Infinity) {
      minX = 0; minY = 0; maxX = 800; maxY = 600;
    }

    svg.setAttribute('viewBox', `${minX} ${minY} ${maxX - minX} ${maxY - minY}`);
  }

  // -----------------------------------------------------------------------
  // Interactivity — enhanced tooltip
  // -----------------------------------------------------------------------

  private setupInteractivity(): void {
    if (!this.svg) return;

    this.clickHandler = (e: MouseEvent) => {
      const target = (e.target as SVGElement).closest('.diagram-node') as SVGGElement | null;
      if (target) {
        const id = target.getAttribute('data-id');
        if (id) {
          if (this.selectedId === id) {
            this.clearHighlight();
          } else {
            this.highlightNode(id);
          }
        }
      } else {
        this.clearHighlight();
      }
    };
    this.svg.addEventListener('click', this.clickHandler);

    this.moveHandler = (e: MouseEvent) => {
      const target = (e.target as SVGElement).closest('.diagram-node') as SVGGElement | null;
      if (target) {
        const id = target.getAttribute('data-id');
        if (id && this.spec) {
          const node = this.spec.nodes.find((n) => n.id === id);
          if (node) {
            this.showRichTooltip(node, e.clientX, e.clientY);
            return;
          }
        }
      }
      this.hideTooltip();
    };
    this.svg.addEventListener('mousemove', this.moveHandler);
    this.svg.addEventListener('mouseleave', () => this.hideTooltip());

    this.keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') this.clearHighlight();
    };
    document.addEventListener('keydown', this.keyHandler);
  }

  private removeGlobalListeners(): void {
    if (this.clickHandler && this.svg) {
      this.svg.removeEventListener('click', this.clickHandler);
    }
    if (this.moveHandler && this.svg) {
      this.svg.removeEventListener('mousemove', this.moveHandler);
    }
    if (this.keyHandler) {
      document.removeEventListener('keydown', this.keyHandler);
    }
    this.clickHandler = null;
    this.moveHandler = null;
    this.keyHandler = null;
  }

  private highlightNode(nodeId: string): void {
    this.selectedId = nodeId;
    if (!this.spec) return;

    const connected = new Set<string>();
    const visited = new Set<string>();
    const queue = [nodeId];
    visited.add(nodeId);
    connected.add(nodeId);

    const adj = new Map<string, string[]>();
    const radj = new Map<string, string[]>();
    for (const n of this.spec.nodes) {
      adj.set(n.id, []);
      radj.set(n.id, []);
    }
    for (const e of this.spec.edges) {
      adj.get(e.from)?.push(e.to);
      radj.get(e.to)?.push(e.from);
    }

    while (queue.length) {
      const cur = queue.shift()!;
      for (const nxt of [...(adj.get(cur) ?? []), ...(radj.get(cur) ?? [])]) {
        connected.add(nxt);
        if (!visited.has(nxt)) {
          visited.add(nxt);
          queue.push(nxt);
        }
      }
    }

    for (const [id, g] of this.nodeGroups) {
      if (connected.has(id)) {
        g.style.opacity = '1';
        g.style.filter = id === nodeId ? 'url(#node-selected)' : '';
      } else {
        g.style.opacity = '0.15';
        g.style.filter = '';
      }
    }

    for (const pathEl of this.edgePaths) {
      const from = pathEl.getAttribute('data-from');
      const to = pathEl.getAttribute('data-to');
      if (from && to && connected.has(from) && connected.has(to)) {
        pathEl.setAttribute('stroke-opacity', '1');
        pathEl.style.opacity = '1';
      } else {
        pathEl.setAttribute('stroke-opacity', '0.08');
        pathEl.style.opacity = '0.1';
      }
    }
  }

  private clearHighlight(): void {
    this.selectedId = null;
    for (const [, g] of this.nodeGroups) {
      g.style.opacity = '';
      g.style.filter = '';
    }
    for (const pathEl of this.edgePaths) {
      pathEl.setAttribute('stroke-opacity', '0.7');
      pathEl.style.opacity = '';
    }
  }

  // -----------------------------------------------------------------------
  // Rich Tooltip
  // -----------------------------------------------------------------------

  private createTooltip(): void {
    this.tooltip = document.createElement('div');
    Object.assign(this.tooltip.style, {
      position: 'fixed', zIndex: '9999',
      pointerEvents: 'none',
      background: 'rgba(12, 15, 26, 0.96)',
      color: '#E2E8F0', padding: '10px 16px',
      borderRadius: '10px', fontSize: '12px',
      fontFamily: 'system-ui, sans-serif',
      lineHeight: '1.6', maxWidth: '320px',
      border: '1px solid rgba(0,229,160,0.25)',
      boxShadow: '0 6px 24px rgba(0,0,0,0.6)',
      opacity: '0', transition: 'opacity 0.15s ease',
    });
    document.body.appendChild(this.tooltip);
  }

  private showRichTooltip(node: DiagramNode, clientX: number, clientY: number): void {
    if (!this.tooltip || !this.spec) return;

    const layout = this.nodeLayouts.get(node.id);
    const stepNum = layout?.stepNumber ?? 0;
    const st = NODE_STYLES[node.type || 'info'] || NODE_STYLES.info;
    const iconStr = node.icon || TYPE_ICONS[node.type || 'info'] || '';

    // Find connected nodes
    const incoming: string[] = [];
    const outgoing: string[] = [];
    for (const e of this.spec.edges) {
      if (e.to === node.id) {
        const fromNode = this.spec.nodes.find((n) => n.id === e.from);
        if (fromNode) incoming.push(fromNode.label);
      }
      if (e.from === node.id) {
        const toNode = this.spec.nodes.find((n) => n.id === e.to);
        if (toNode) outgoing.push(toNode.label);
      }
    }

    let html = '';
    // Header line
    html += `<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">`;
    html += `<span style="font-size:14px">${iconStr}</span>`;
    html += `<span style="font-weight:700;color:${st.gradientFrom}">${node.label}</span>`;
    if (stepNum > 0) {
      html += `<span style="background:${st.gradientFrom};color:#fff;padding:1px 6px;border-radius:8px;font-size:9px;font-weight:700">Step ${stepNum}</span>`;
    }
    html += `</div>`;

    // Type
    html += `<div style="color:#64748B;font-size:10px;margin-bottom:4px">${node.type || 'info'}${st.indicator ? ' ' + st.indicator : ''}</div>`;

    // Annotation
    if (node.annotation) {
      html += `<div style="color:#CBD5E1;font-size:11px;margin-bottom:4px;border-top:1px solid rgba(255,255,255,0.06);padding-top:4px">${node.annotation}</div>`;
    }

    // Connected nodes
    if (incoming.length > 0) {
      html += `<div style="color:#94A3B8;font-size:10px;margin-top:2px">← ${incoming.join(', ')}</div>`;
    }
    if (outgoing.length > 0) {
      html += `<div style="color:#94A3B8;font-size:10px">→ ${outgoing.join(', ')}</div>`;
    }

    this.tooltip.innerHTML = html;
    this.tooltip.style.opacity = '1';
    const x = Math.min(clientX + 14, window.innerWidth - 340);
    const y = Math.min(clientY + 14, window.innerHeight - 120);
    this.tooltip.style.left = `${x}px`;
    this.tooltip.style.top = `${y}px`;


  }

  private hideTooltip(): void {
    if (this.tooltip) {
      this.tooltip.style.opacity = '0';
    }
  }

  // -----------------------------------------------------------------------
  // Animation styles — enhanced with flow dot animation
  // -----------------------------------------------------------------------

  private injectAnimationStyles(): void {
    if (this.styleEl) this.styleEl.remove();
    this.styleEl = document.createElement('style');
    this.styleEl.textContent = `
      @keyframes diagramNodeIn {
        from { opacity: 0; transform: translateY(12px) scale(0.95); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes diagramEdgeIn {
        from { opacity: 0; stroke-dashoffset: 400; }
        to   { opacity: 1; stroke-dashoffset: 0; }
      }
      @keyframes diagramFlowDotPulse {
        0%, 100% { opacity: 0.4; r: 2.5; }
        50%      { opacity: 1;   r: 4;   }
      }
      .diagram-node {
        animation: diagramNodeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        transition: opacity 0.3s ease, filter 0.3s ease;
      }
      .diagram-node:hover {
        filter: brightness(1.2) drop-shadow(0 0 8px rgba(0,229,160,0.3));
      }
      .diagram-edge {
        animation: diagramEdgeIn 0.6s ease forwards;
        transition: stroke-opacity 0.3s ease, opacity 0.3s ease;
      }
      .diagram-flow-dot {
        animation: diagramFlowDotPulse 2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(this.styleEl);
  }

  // -----------------------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------------------

  private truncate(str: string, max: number): string {
    return str.length > max ? str.slice(0, max - 1) + '…' : str;
  }
}
