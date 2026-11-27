/**
 * MolecularIllustrator — Renders rich molecular mechanism SVG scenes from JSON specs.
 * 6 templates: receptor_ligand, gprotein_cascade, ion_channel, transporter, enzyme_catalysis, dna_binding
 * Each renders 2 side-by-side scenes: "Without Drug" (active) vs "With Drug" (blocked).
 * Dark theme, large canvas (400x260), animated, interactive hover effects, labeled zones.
 * v2: Enhanced membrane, step indicators, GPCR 7-TM, ion channel gates, enzyme lock-and-key,
 *     DNA double helix, transporter conformational change, scene descriptions, visual legend,
 *     pill-shaped drugs, improved status badges.
 * v3: Added simple molecule/interaction scene format support.
 */

// ─── Simple scene format (molecules + interactions) ───

export interface MolMolecule {
  name: string;
  role: string;
  x?: number;
  y?: number;
  color?: string;
}

export interface MolInteraction {
  from: string;
  to: string;
  type: string;
  label?: string;
}

export interface SimpleMolScene {
  title: string;
  molecules: MolMolecule[];
  interactions: MolInteraction[];
}

// ─── Template-based scene format (rich, with drug blocking etc.) ───

export interface MolScene {
  template: 'receptor_ligand' | 'gprotein_cascade' | 'ion_channel' | 'transporter' | 'enzyme_catalysis' | 'dna_binding';
  label: string;
  blocked: boolean;
  resultLabel: string;
  receptor?: { label: string; color: string; stroke?: string; isGPCR?: boolean };
  ligand?: { label: string; color: string };
  gprotein?: { type: string; color: string; stroke?: string };
  effector?: { label: string; color: string; stroke?: string };
  secondMessenger?: { label: string; color: string; description?: string };
  signal?: { active: boolean; text?: string; color?: string; textColor?: string };
  channel?: { label: string; color: string; stroke?: string; voltageLabel?: string; isVoltageGated?: boolean };
  ions?: Array<{ label: string; color: string; size?: 'small' | 'medium' | 'large' }>;
  transporter?: { label: string; color: string; stroke?: string; state?: 'outward' | 'occluded' | 'inward' };
  molecule?: { label: string; color: string };
  enzyme?: { label: string; color: string; stroke?: string; activeSite?: boolean; x?: number; w?: number; h?: number };
  substrates?: Array<{ label: string; color: string; x?: number; y?: number }>;
  products?: Array<{ label: string; color: string; x?: number; y?: number }>;
  effect?: { type: 'heart' | 'brain' | 'lightning' | 'crossed' | 'constrict' | 'dilate'; x?: number; y?: number; color: string; extra?: { icon?: string; label?: string } };
  membrane?: { y?: number };
  blockBadge?: boolean;
  statusText?: { text: string; sub?: string };
  drugName?: string;
  organTarget?: string;
  // v2 optional fields
  stepDescriptions?: [string, string, string, string];
  descriptionText?: string;
  drugMechanism?: string;
  inhibitorType?: 'competitive' | 'non-competitive' | 'irreversible' | 'allosteric';
}

export interface MolSpec {
  scenes: SimpleMolScene[] | MolScene[];
}

const NS = 'http://www.w3.org/2000/svg';

const CANVAS_W = 400;
const CANVAS_H = 260;

export class MolecularIllustrator {
  private container: HTMLElement;
  private sceneElements: Array<{ el: HTMLElement; svg: SVGSVGElement | null }> = [];

  constructor(container: HTMLElement | string) {
    this.container = typeof container === 'string' ? document.querySelector(container)! : container;
  }

  /** Check if a scene is in the simple molecule/interaction format */
  private isSimpleScene(scene: SimpleMolScene | MolScene): scene is SimpleMolScene {
    return 'molecules' in scene && Array.isArray((scene as SimpleMolScene).molecules);
  }

  render(spec: MolSpec): HTMLElement {
    this.destroy();
    const wrapper = document.createElement('div');
    wrapper.className = 'mol-wrapper';

    for (const scene of spec.scenes) {
      const sceneEl = document.createElement('div');

      if (this.isSimpleScene(scene)) {
        // Simple molecule/interaction format
        sceneEl.className = 'mol-scene mol-scene-active';
        const header = document.createElement('div');
        header.className = 'mol-scene-header';
        header.innerHTML = `
          <span class="mol-scene-icon">🧬</span>
          <span class="mol-scene-title">${scene.title}</span>
        `;
        sceneEl.appendChild(header);
        const svgHtml = this.buildSimpleScene(scene);
        sceneEl.insertAdjacentHTML('beforeend', svgHtml);
      } else {
        // Template-based format
        sceneEl.className = `mol-scene ${scene.blocked ? 'mol-scene-blocked' : 'mol-scene-active'}`;
        const header = document.createElement('div');
        header.className = 'mol-scene-header';
        const badgeClass = scene.blocked ? 'badge-blocked' : 'badge-active';
        const badgeIcon = scene.blocked ? '⊘' : '✓';
        header.innerHTML = `
          <span class="mol-scene-icon">${scene.blocked ? '⊘' : '✅'}</span>
          <span class="mol-scene-title">${scene.label}</span>
          <span class="mol-scene-badge ${badgeClass} mol-badge-pulse">${badgeIcon} ${scene.resultLabel}</span>
        `;
        sceneEl.appendChild(header);
        const svgHtml = this.buildScene(scene);
        sceneEl.insertAdjacentHTML('beforeend', svgHtml);

        // Scene description text
        if (scene.descriptionText) {
          const desc = document.createElement('div');
          desc.className = 'mol-scene-desc';
          desc.textContent = scene.descriptionText;
          sceneEl.appendChild(desc);
        }
      }

      wrapper.appendChild(sceneEl);
      const svg = sceneEl.querySelector('.mol-svg') as SVGSVGElement | null;
      this.sceneElements.push({ el: sceneEl, svg });
    }

    this.container.appendChild(wrapper);
    return wrapper;
  }

  /** Build SVG for the simple molecule/interaction scene format */
  private buildSimpleScene(scene: SimpleMolScene): string {
    const W = 600;
    const H = 400;
    const PAD = 60;

    // Assign positions to molecules if not specified
    const molecules = scene.molecules.map((m, i) => ({
      ...m,
      x: m.x ?? PAD + (i % 4) * 130 + 50,
      y: m.y ?? PAD + Math.floor(i / 4) * 100 + 60,
      color: m.color ?? this.getDefaultColor(m.role),
    }));

    let svg = `<defs>
      <linearGradient id="simple-mol-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a2744" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#0c0e14" stop-opacity="0.3"/>
      </linearGradient>
    </defs>`;
    svg += `<rect x="0" y="0" width="${W}" height="${H}" fill="url(#simple-mol-bg)"/>`;

    // Draw interactions (lines/arrows between molecules)
    const molMap = new Map(molecules.map(m => [m.name, m]));
    for (const interaction of scene.interactions) {
      const from = molMap.get(interaction.from);
      const to = molMap.get(interaction.to);
      if (!from || !to) continue;

      const lineColor = this.getInteractionColor(interaction.type);
      const dashArray = interaction.type === 'inhibition' ? '6 4' : '';

      // Line
      svg += `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" 
        stroke="${lineColor}" stroke-width="2.5" opacity="0.7"
        ${dashArray ? `stroke-dasharray="${dashArray}"` : ''}/>`;

      // Arrow head
      const angle = Math.atan2(to.y - from.y, to.x - from.x);
      const arrowSize = 8;
      const ax = to.x - Math.cos(angle) * 30;
      const ay = to.y - Math.sin(angle) * 30;
      svg += `<polygon points="${ax},${ay} ${ax - arrowSize * Math.cos(angle - 0.4)},${ay - arrowSize * Math.sin(angle - 0.4)} ${ax - arrowSize * Math.cos(angle + 0.4)},${ay - arrowSize * Math.sin(angle + 0.4)}" fill="${lineColor}" opacity="0.8"/>`;

      // Label
      if (interaction.label) {
        const mx = (from.x + to.x) / 2;
        const my = (from.y + to.y) / 2;
        svg += `<rect x="${mx - interaction.label.length * 3.5 - 6}" y="${my - 10}" width="${interaction.label.length * 7 + 12}" height="18" rx="6" fill="#0c0e14" stroke="${lineColor}" stroke-width="0.8" stroke-opacity="0.4"/>`;
        svg += `<text x="${mx}" y="${my + 3}" text-anchor="middle" fill="${lineColor}" font-size="9" font-weight="600" font-family="system-ui,sans-serif">${interaction.label}</text>`;
      }
    }

    // Draw molecules (circles with labels)
    for (const mol of molecules) {
      const r = 24;
      // Glow
      svg += `<circle cx="${mol.x}" cy="${mol.y}" r="${r + 6}" fill="${mol.color}" opacity="0.12"/>`;
      // Main circle
      svg += `<circle cx="${mol.x}" cy="${mol.y}" r="${r}" fill="${mol.color}" stroke="${mol.color}" stroke-width="1.5" opacity="0.85"/>`;
      // Inner highlight
      svg += `<circle cx="${mol.x}" cy="${mol.y - r * 0.25}" r="${r * 0.6}" fill="rgba(255,255,255,0.08)"/>`;
      // Label
      const fontSize = mol.name.length > 6 ? 8 : 10;
      svg += `<text x="${mol.x}" y="${mol.y + 3}" text-anchor="middle" fill="#fff" font-size="${fontSize}" font-weight="700" font-family="system-ui,sans-serif">${mol.name}</text>`;
      // Role below
      svg += `<text x="${mol.x}" y="${mol.y + r + 14}" text-anchor="middle" fill="#5a6478" font-size="8" font-weight="600" font-family="system-ui,sans-serif">${mol.role}</text>`;
    }

    // Title bar
    svg += `<rect x="0" y="0" width="${W}" height="24" rx="0" fill="rgba(0,229,160,0.08)"/>`;
    svg += `<text x="10" y="16" fill="#00e5a0" font-size="10" font-weight="700" font-family="system-ui,sans-serif">🧬 ${scene.title}</text>`;

    return `<svg class="mol-svg" viewBox="0 0 ${W} ${H}" xmlns="${NS}">${svg}</svg>`;
  }

  private getDefaultColor(role: string): string {
    const roleColors: Record<string, string> = {
      receptor: '#8b5cf6',
      ligand: '#ef4444',
      enzyme: '#f97316',
      substrate: '#3b82f6',
      product: '#22c55e',
      drug: '#10b981',
      inhibitor: '#EF4444',
      channel: '#6366f1',
      transporter: '#0d9488',
      hormone: '#ec4899',
      ion: '#fbbf24',
      gene: '#a78bfa',
    };
    return roleColors[role.toLowerCase()] || '#64748b';
  }

  private getInteractionColor(type: string): string {
    const typeColors: Record<string, string> = {
      activation: '#22c55e',
      inhibition: '#ef4444',
      conversion: '#a78bfa',
      binding: '#3b82f6',
      catalysis: '#f97316',
      transport: '#0d9488',
      phosphorylation: '#fbbf24',
      feedback: '#f59e0b',
    };
    return typeColors[type.toLowerCase()] || '#94a3b8';
  }

  animate(): void {
    this.sceneElements.forEach((item, i) => {
      setTimeout(() => {
        if (item.svg) item.svg.classList.add('animate');
      }, i * 250);
    });
  }

  destroy(): void {
    this.sceneElements = [];
    if (this.container) this.container.innerHTML = '';
  }

  private buildScene(s: MolScene): string {
    const tpl = s.template;
    if (tpl === 'gprotein_cascade') return this.gprotein(s);
    if (tpl === 'ion_channel') return this.ionChannel(s);
    if (tpl === 'transporter') return this.transporter(s);
    if (tpl === 'enzyme_catalysis') return this.enzyme(s);
    if (tpl === 'dna_binding') return this.dna(s);
    return this.receptorLigand(s);
  }

  // Canvas: 400x260 (requirement #1)
  private svgWrap(inner: string, w = CANVAS_W, h = CANVAS_H): string {
    return `<svg class="mol-svg" viewBox="0 0 ${w} ${h}" xmlns="${NS}">${inner}</svg>`;
  }

  /* ═══ IMPROVED MEMBRANE (requirement #2) ═══ */
  private membrane(my = 95, w = 380, x = 10): string {
    let svg = '';

    // Subtle gradient from extracellular (lighter) to intracellular (darker)
    svg += `<defs>
      <linearGradient id="mol-zone-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a2744" stop-opacity="0.3"/>
        <stop offset="${(my - 20) / CANVAS_H * 100}%" stop-color="#1a2744" stop-opacity="0.15"/>
        <stop offset="${(my + 30) / CANVAS_H * 100}%" stop-color="#111827" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#0c0e14" stop-opacity="0.3"/>
      </linearGradient>
    </defs>`;
    svg += `<rect x="${x}" y="0" width="${w}" height="${CANVAS_H}" fill="url(#mol-zone-grad)"/>`;

    // Outer leaflet
    svg += `<rect x="${x}" y="${my}" width="${w}" height="9" rx="4.5" fill="#fbbf24" opacity=".12"/>`;
    for (let i = 0; i < w; i += 14) {
      svg += `<circle cx="${x + i + 7}" cy="${my + 4}" r="4" fill="#f59e0b" opacity=".4"/>`;
    }
    // Inner leaflet
    svg += `<rect x="${x}" y="${my + 14}" width="${w}" height="9" rx="4.5" fill="#fbbf24" opacity=".10"/>`;
    for (let i = 7; i < w; i += 14) {
      svg += `<circle cx="${x + i + 7}" cy="${my + 18}" r="4" fill="#d97706" opacity=".3"/>`;
    }

    // Hydrophobic core
    svg += `<rect x="${x}" y="${my + 7}" width="${w}" height="9" rx="3" fill="#f59e0b" opacity=".06"/>`;

    // Cholesterol molecules (diamond shapes) embedded in membrane
    const cholesterolPositions = [40, 120, 200, 280, 340];
    for (const cx of cholesterolPositions) {
      svg += `<g transform="translate(${x + cx},${my + 11}) rotate(45)">
        <rect x="-3" y="-3" width="6" height="6" fill="#a78bfa" opacity=".25" rx="1"/>
      </g>`;
    }

    return svg;
  }

  /* ═══ ZONE LABELS (requirement #2) ═══ */
  private zoneLabels(my = 95, w = CANVAS_W): string {
    return `<text x="16" y="20" fill="#4a5568" font-size="8" font-weight="700" font-family="system-ui,sans-serif" letter-spacing="1.2">EXTRACELLULAR</text>` +
           `<text x="16" y="${my + 36}" fill="#4a5568" font-size="8" font-weight="700" font-family="system-ui,sans-serif" letter-spacing="1.2">INTRACELLULAR</text>` +
           `<line x1="10" y1="${my - 2}" x2="${w - 10}" y2="${my - 2}" stroke="rgba(255,255,255,0.04)" stroke-width="0.5" stroke-dasharray="3,3"/>` +
           `<line x1="10" y1="${my + 26}" x2="${w - 10}" y2="${my + 26}" stroke="rgba(255,255,255,0.04)" stroke-width="0.5" stroke-dasharray="3,3"/>`;
  }

  /* ═══ STEP INDICATORS (requirement #4) ═══ */
  private stepIndicator(step: number, x: number, y: number, label: string): string {
    const colors = ['#8b5cf6', '#f59e0b', '#22c55e', '#ef4444'];
    const c = colors[(step - 1) % 4];
    return `<g class="mol-step">` +
      `<circle cx="${x}" cy="${y}" r="9" fill="${c}" opacity=".85"/>` +
      `<text x="${x}" y="${y + 3.5}" text-anchor="middle" fill="#fff" font-size="8" font-weight="800" font-family="system-ui,sans-serif">${step}</text>` +
      `</g>` +
      `<text x="${x + 13}" y="${y + 3}" fill="${c}" font-size="7" font-weight="600" font-family="system-ui,sans-serif" opacity=".8">${label}</text>`;
  }

  /* ═══ VISUAL LEGEND (requirement #11) ═══ */
  private legend(x: number, y: number): string {
    const items = [
      { color: '#8b5cf6', label: 'Receptor' },
      { color: '#ef4444', label: 'Ligand' },
      { color: '#22c55e', label: 'Product' },
      { color: '#f59e0b', label: 'Drug' },
    ];
    let svg = `<g class="mol-legend">`;
    svg += `<rect x="${x}" y="${y}" width="130" height="46" rx="6" fill="rgba(0,0,0,0.25)" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>`;
    svg += `<text x="${x + 6}" y="${y + 10}" fill="#5a6478" font-size="6" font-weight="700" font-family="system-ui,sans-serif" letter-spacing="0.8">LEGEND</text>`;
    items.forEach((item, i) => {
      const row = i < 2 ? 0 : 1;
      const col = i % 2;
      const ix = x + 8 + col * 64;
      const iy = y + 20 + row * 13;
      svg += `<circle cx="${ix}" cy="${iy}" r="4" fill="${item.color}" opacity=".7"/>`;
      svg += `<text x="${ix + 7}" y="${iy + 3}" fill="#8b95a8" font-size="7" font-weight="600" font-family="system-ui,sans-serif">${item.label}</text>`;
    });
    svg += `</g>`;
    return svg;
  }

  /* ═══ IMPROVED RECEPTOR (requirement #3) ═══ */
  private rec(x: number, y: number, w: number, h: number, label: string, color: string, stroke?: string, blocked?: boolean, isGPCR?: boolean): string {
    let svg = '';
    const d = blocked ? ' stroke-dasharray="5"' : '';
    const fs = String(label || '').length > 5 ? 8 : 10;

    // Glow when active (requirement #3)
    if (!blocked) {
      svg += `<rect x="${x - 4}" y="${y - 4}" width="${w + 8}" height="${h + 8}" rx="12" fill="${color}" opacity=".12">
        <animate attributeName="opacity" values=".08;.18;.08" dur="2.5s" repeatCount="indefinite"/>
      </rect>`;
    }

    // GPCR: show 7-transmembrane domains (requirement #3)
    if (isGPCR && !blocked) {
      const tmY = y + 4;
      const tmH = h - 8;
      for (let i = 0; i < 7; i++) {
        const tmX = x + 6 + i * (w - 12) / 6;
        svg += `<circle cx="${tmX}" cy="${y + h / 2}" r="4" fill="rgba(255,255,255,0.15)" stroke="${stroke || color}" stroke-width="1"/>`;
        // Vertical line through membrane
        svg += `<line x1="${tmX}" y1="${tmY}" x2="${tmX}" y2="${tmY + tmH}" stroke="${stroke || color}" stroke-width="1.5" opacity=".3"/>`;
      }
    }

    // Main receptor body
    svg += `<rect class="rv-receptor" x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${color}" stroke="${stroke || color}" stroke-width="1.5"${d}/>`;
    svg += `<rect x="${x + 2}" y="${y + 2}" width="${w - 4}" height="${h / 3}" rx="6" fill="rgba(255,255,255,.1)"/>`;
    svg += `<text x="${x + w / 2}" y="${y + h / 2 + 3}" text-anchor="middle" fill="#fff" font-size="${fs}" font-weight="700" font-family="system-ui,sans-serif">${label}</text>`;

    // Blocked ⊘ indicator on receptor (requirement #3)
    if (blocked) {
      svg += this.blockSymbol(x + w / 2, y + h / 2);
    }

    return svg;
  }

  // Ligand molecule
  private lig(x: number, y: number, r: number, label: string, color: string): string {
    const fs = String(label || '').length > 4 ? 7 : 9;
    return `<g class="rv-ligand">` +
      `<circle cx="${x}" cy="${y}" r="${r + 3}" fill="${color}" opacity=".2"/>` +
      `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" stroke="${color}" stroke-width="1"/>` +
      `<text x="${x}" y="${y + 3}" text-anchor="middle" fill="#fff" font-size="${fs}" font-weight="700" font-family="system-ui,sans-serif">${label}</text>` +
      `</g>`;
  }

  // Block badge with ⊘ indicator (requirement #12)
  private block(x: number, y: number): string {
    return `<g class="rv-block-badge">` +
      `<circle cx="${x}" cy="${y}" r="14" fill="#ef4444" stroke="#dc2626" stroke-width="2" opacity=".9"/>` +
      `<line x1="${x - 7}" y1="${y - 7}" x2="${x + 7}" y2="${y + 7}" stroke="#fff" stroke-width="3" stroke-linecap="round"/>` +
      `<line x1="${x + 7}" y1="${y - 7}" x2="${x - 7}" y2="${y + 7}" stroke="#fff" stroke-width="3" stroke-linecap="round"/>` +
      `</g>`;
  }

  // ⊘ symbol for blocked component (requirement #12)
  private blockSymbol(x: number, y: number): string {
    return `<g class="mol-block-symbol">` +
      `<circle cx="${x}" cy="${y}" r="16" fill="none" stroke="#ef4444" stroke-width="2.5" opacity=".7"/>` +
      `<line x1="${x - 11}" y1="${y - 11}" x2="${x + 11}" y2="${y + 11}" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" opacity=".7"/>` +
      `</g>`;
  }

  // Arrow with glow
  private arrow(path: string, color = '#f97316', w = 2.5): string {
    return `<path class="rv-signal-path" d="${path}" stroke="${color}" stroke-width="${w}" fill="none" stroke-linecap="round" opacity=".8"/>` +
           `<path d="${path}" stroke="${color}" stroke-width="${w + 4}" fill="none" stroke-linecap="round" opacity=".1"/>`;
  }

  // Status badge (requirement #13)
  private status(x: number, y: number, text: string, sub?: string, c = '#22c55e'): string {
    let s = `<g class="rv-status-text">`;
    const h = sub ? 32 : 20;
    s += `<rect x="${x - 50}" y="${y - 12}" width="100" height="${h}" rx="8" fill="${c}" opacity=".08" stroke="${c}" stroke-width="1" stroke-opacity=".2"/>`;
    // Pulsing dot
    s += `<circle cx="${x - 38}" cy="${y}" r="4" fill="${c}" opacity=".6">
      <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values=".4;.8;.4" dur="1.5s" repeatCount="indefinite"/>
    </circle>`;
    s += `<text x="${x + 2}" y="${y + 3}" text-anchor="middle" fill="${c}" font-size="10" font-weight="700" font-family="system-ui,sans-serif">${text}</text>`;
    if (sub) s += `<text x="${x + 2}" y="${y + 15}" text-anchor="middle" fill="${c}" font-size="7" font-weight="600" font-family="system-ui,sans-serif" opacity=".7">${sub}</text>`;
    return s + '</g>';
  }

  // Label
  private lbl(x: number, y: number, text: string, color = '#5a6478', size = 8, anchor = 'middle'): string {
    return `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-size="${size}" font-weight="600" font-family="system-ui,sans-serif">${text}</text>`;
  }

  // Effect icon
  private effectIcon(type: string, x: number, y: number, color: string, extra?: { icon?: string; label?: string }): string {
    const g = (inner: string) => `<g transform="translate(${x},${y})" class="rv-effect">${inner}</g>`;
    switch (type) {
      case 'constrict':
        return g(`<ellipse cx="14" cy="8" rx="16" ry="8" fill="none" stroke="${color}" stroke-width="2" opacity=".5"/><path d="M 30,8 L 36,8" stroke="${color}" stroke-width="4" stroke-linecap="round" opacity=".5"/><path d="M -2,8 L -8,8" stroke="${color}" stroke-width="4" stroke-linecap="round" opacity=".5"/>`);
      case 'dilate':
        return g(`<ellipse cx="18" cy="6" rx="22" ry="6" fill="none" stroke="${color}" stroke-width="2" opacity=".5"/>`);
      case 'heart':
        return g(`<text x="14" y="16" text-anchor="middle" font-size="22">${extra?.icon || '❤️'}</text>${extra?.label ? `<text x="14" y="32" text-anchor="middle" fill="${color}" font-size="8" font-weight="600" font-family="system-ui,sans-serif">${extra.label}</text>` : ''}`);
      case 'brain':
        return g(`<text x="14" y="16" text-anchor="middle" font-size="22">${extra?.icon || '🧠'}</text>${extra?.label ? `<text x="14" y="32" text-anchor="middle" fill="${color}" font-size="8" font-weight="600" font-family="system-ui,sans-serif">${extra.label}</text>` : ''}`);
      case 'lightning':
        return g(`<path d="M 14,0 L 8,14 L 18,14 L 10,28" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`);
      case 'crossed':
        return g(`<text x="14" y="14" text-anchor="middle" font-size="18" opacity=".3">⚡</text><line x1="2" y1="2" x2="26" y2="26" stroke="${color}" stroke-width="3" stroke-linecap="round"/><line x1="26" y1="2" x2="2" y2="26" stroke="${color}" stroke-width="3" stroke-linecap="round"/>`);
      default: return '';
    }
  }

  /* ═══ IMPROVED DRUG PILL (requirement #12) ═══ */
  private drugPill(x: number, y: number, label: string, color = '#EF4444', mechanism?: string): string {
    const w = Math.max(label.length * 5.5 + 24, 36);
    let svg = `<g class="rv-drug">`;
    // Pill shape
    svg += `<rect x="${x - w / 2}" y="${y - 10}" width="${w}" height="20" rx="10" fill="${color}" stroke="${color}" stroke-width="1.5"/>`;
    svg += `<rect x="${x - w / 2}" y="${y - 10}" width="${w / 2}" height="20" rx="10" fill="rgba(255,255,255,.18)"/>`;
    svg += `<text x="${x}" y="${y + 3.5}" text-anchor="middle" fill="#fff" font-size="8" font-weight="700" font-family="system-ui,sans-serif">💊 ${label}</text>`;
    // Mechanism label (requirement #12)
    if (mechanism) {
      svg += `<text x="${x}" y="${y + 20}" text-anchor="middle" fill="${color}" font-size="6" font-weight="600" font-family="system-ui,sans-serif" opacity=".8">${mechanism}</text>`;
    }
    svg += `</g>`;
    return svg;
  }

  /* ═══ TEMPLATE: receptor_ligand ═══ */
  private receptorLigand(s: MolScene): string {
    const r = s.receptor || {};
    const l = s.ligand || {};
    const sig = s.signal || {};
    const e = s.effect || {};
    const my = s.membrane?.y || 95;
    const steps = s.stepDescriptions || ['Ligand approaches', 'Binding', 'Signal cascade', 'Cellular response'];

    let svg = this.membrane(my);
    svg += this.zoneLabels(my);

    // Receptor (spans membrane) — with GPCR support (requirement #3)
    const rx = 150, ry = my - 32, rw = 80, rh = 68;
    svg += this.rec(rx, ry, rw, rh, r.label || 'Receptor', s.blocked ? '#6B7280' : (r.color || '#8b5cf6'), r.stroke, s.blocked, r.isGPCR);

    // Step 1: Ligand approaches (requirement #4)
    svg += this.stepIndicator(1, 60, 36, steps[0]);

    // Ligand
    if (l.label) {
      svg += this.lig(190, 40, 16, l.label, l.color || '#ef4444');
      if (!s.blocked) {
        svg += this.arrow(`M 190,56 L 190,${ry}`, l.color || '#ef4444', 2);
        // Step 2: Binding occurs
        svg += this.stepIndicator(2, 250, 52, steps[1]);
      }
    }

    // Drug blocker (requirement #12)
    if (s.blocked && s.drugName) {
      svg += this.drugPill(190, ry - 20, s.drugName, '#EF4444', s.drugMechanism || 'competitive antagonist');
      svg += this.block(rx + rw + 6, ry + 4);
    }

    // Step 3: Signal cascade (requirement #4)
    if (sig.active && !s.blocked) {
      svg += this.arrow(`M 190,${ry + rh} L 190,${ry + rh + 22} L 110,${ry + rh + 22}`, sig.color || '#f97316');
      svg += this.lbl(76, ry + rh + 26, sig.text || 'Signal!', sig.textColor || '#f97316', 9);
      svg += this.stepIndicator(3, 50, ry + rh + 22, steps[2]);
    }

    // Step 4: Cellular response
    if (e.type && !s.blocked) {
      svg += this.effectIcon(e.type, e.x || 40, e.y || ry + rh + 48, e.color, e.extra);
      svg += this.stepIndicator(4, 20, ry + rh + 48, steps[3]);
    } else if (e.type && s.blocked) {
      svg += this.effectIcon(e.type, e.x || 40, e.y || ry + rh + 48, e.color, e.extra);
    }

    // Legend (requirement #11)
    svg += this.legend(265, 4);

    // Status badge (requirement #13)
    if (s.blocked) svg += this.status(200, ry + rh + 38, '⊘ BLOCKED', s.statusText?.sub || s.drugName, '#EF4444');
    else svg += this.status(200, ry + rh + 38, '✓ ACTIVE', s.statusText?.sub, '#22C55E');

    return this.svgWrap(svg);
  }

  /* ═══ TEMPLATE: gprotein_cascade (requirement #5) ═══ */
  private gprotein(s: MolScene): string {
    const r = s.receptor || {};
    const l = s.ligand || {};
    const gp = s.gprotein || {};
    const eff = s.effector || {};
    const sm = s.secondMessenger || {};
    const e = s.effect || {};
    const my = s.membrane?.y || 95;
    const gc = s.blocked ? '#6B7280' : (gp.color || '#f59e0b');
    const gd = s.blocked ? ' stroke-dasharray="4"' : '';
    const steps = s.stepDescriptions || ['Ligand binds', 'G-protein splits', 'Effector activated', 'Second messenger'];

    let svg = this.membrane(my);
    svg += this.zoneLabels(my);

    // Receptor
    svg += this.rec(155, my - 32, 80, 58, r.label || 'Receptor', s.blocked ? '#6B7280' : (r.color || '#8b5cf6'), r.stroke, s.blocked, r.isGPCR);

    // Step 1: Ligand approaches
    svg += this.stepIndicator(1, 58, 34, steps[0]);

    // Ligand
    if (l.label) {
      svg += this.lig(195, 32, 14, l.label, l.color || '#ef4444');
      if (!s.blocked) svg += this.arrow(`M 195,46 L 195,${my - 32}`, l.color || '#ef4444', 2);
    }

    // G-Protein subunits: α, β, γ (requirement #5)
    if (!s.blocked) {
      // Step 2: G-protein splits
      svg += this.stepIndicator(2, 58, my + 20, steps[1]);

      // Gα subunit (with GDP→GTP exchange)
      svg += `<g class="rv-receptor">
        <ellipse cx="160" cy="${my + 36}" rx="22" ry="14" fill="${gc}" stroke="${gp.stroke || '#d97706'}" stroke-width="1.5"/>
        <text x="160" y="${my + 40}" text-anchor="middle" fill="#fff" font-size="9" font-weight="700" font-family="system-ui,sans-serif">Gα</text>
      </g>`;
      // GDP→GTP exchange label
      svg += `<text x="126" y="${my + 40}" text-anchor="middle" fill="#f59e0b" font-size="7" font-weight="700" font-family="system-ui,sans-serif">GDP→GTP</text>`;
      // Arrow from Gα moving away
      svg += this.arrow(`M 140,${my + 36} L 100,${my + 36}`, gc, 1.5);

      // Gβγ subunit (separated from Gα)
      svg += `<g class="rv-receptor">
        <ellipse cx="220" cy="${my + 36}" rx="20" ry="12" fill="${gc}" stroke="${gp.stroke || '#d97706'}" stroke-width="1.5" opacity=".7"/>
        <text x="220" y="${my + 40}" text-anchor="middle" fill="#fff" font-size="8" font-weight="700" font-family="system-ui,sans-serif">Gβγ</text>
      </g>`;
      // Arrow from Gβγ
      svg += this.arrow(`M 240,${my + 36} L 270,${my + 36}`, gc, 1);

      // Connection receptor to G-protein
      svg += this.arrow(`M 195,${my + 26} L 195,${my + 34}`, gc, 2);

      // Step 3: Effector activated
      svg += this.stepIndicator(3, 58, my + 62, steps[2]);

      // Effector
      if (eff.label) {
        const ec = eff.color || '#3b82f6';
        svg += `<rect class="rv-receptor" x="110" y="${my + 54}" width="80" height="28" rx="6" fill="${ec}" stroke="${eff.stroke || '#2563eb'}" stroke-width="1"/>` +
               `<text x="150" y="${my + 72}" text-anchor="middle" fill="#fff" font-size="${String(eff.label).length > 10 ? 7 : 9}" font-weight="700" font-family="system-ui,sans-serif">${eff.label}</text>`;
        svg += this.arrow(`M 120,${my + 48} L 140,${my + 54}`, ec, 2);
      }

      // Step 4: Second messenger (requirement #5)
      svg += this.stepIndicator(4, 58, my + 96, steps[3]);

      // Second messenger with arrow to effect
      if (sm.label) {
        svg += `<g class="rv-signal-path"><circle cx="150" cy="${my + 100}" r="14" fill="${sm.color || '#22c55e'}" opacity=".5"/><circle cx="150" cy="${my + 100}" r="10" fill="${sm.color || '#22c55e'}" opacity=".8"/>` +
               `<text x="150" y="${my + 103}" text-anchor="middle" fill="#fff" font-size="8" font-weight="700" font-family="system-ui,sans-serif">${sm.label}</text></g>`;
        // Arrow from second messenger to effect
        svg += this.arrow(`M 150,${my + 114} L 150,${my + 126}`, sm.color || '#16a34a', 2);
        svg += this.lbl(150, my + 136, sm.description || '', sm.color || '#16a34a', 7);
      }
    } else {
      // Blocked: G-protein stays together, grayed out
      svg += `<ellipse cx="195" cy="${my + 36}" rx="26" ry="16" fill="${gc}" stroke="${gp.stroke || '#d97706'}" stroke-width="1.5"${gd} opacity=".5"/>` +
             `<text x="195" y="${my + 40}" text-anchor="middle" fill="#9ca3af" font-size="9" font-weight="700" font-family="system-ui,sans-serif">G${gp.type || 's'} (inactive)</text>`;

      if (s.drugName) {
        svg += this.drugPill(195, my - 50, s.drugName, '#EF4444', s.drugMechanism || 'competitive antagonist');
        svg += this.block(240, my - 22);
      }
    }

    // Legend
    svg += this.legend(268, 4);

    if (s.blocked) {
      svg += this.status(200, my + 130, '⊘ BLOCKED', s.statusText?.sub || s.drugName, '#EF4444');
    } else {
      svg += this.status(200, my + 130, '✓ CASCADE', s.statusText?.sub, '#22C55E');
    }
    if (e.type) svg += this.effectIcon(e.type, e.x || 40, e.y || my + 140, e.color, e.extra);

    return this.svgWrap(svg, CANVAS_W, 280);
  }

  /* ═══ TEMPLATE: ion_channel (requirement #6) ═══ */
  private ionChannel(s: MolScene): string {
    const ch = s.channel || {};
    const ions = s.ions || [];
    const e = s.effect || {};
    const my = s.membrane?.y || 95;
    const cx = 150;
    const steps = s.stepDescriptions || ['Depolarization', 'Gate opens', 'Ions flow', 'Cellular effect'];
    const isVG = ch.isVoltageGated;

    let svg = this.membrane(my);
    svg += this.zoneLabels(my);

    const cc = s.blocked ? '#6B7280' : (ch.color || '#6366f1');

    // Channel walls (proper pore shape)
    const wallW = 14;
    const poreW = s.blocked ? 6 : 28;
    const wallH = 50;
    const wy = my - 14;

    // Left wall
    svg += `<rect x="${cx}" y="${wy}" width="${wallW}" height="${wallH}" rx="4" fill="${cc}" stroke="${ch.stroke || '#4338ca'}" stroke-width="1.5"/>`;
    // Right wall
    svg += `<rect x="${cx + wallW + poreW}" y="${wy}" width="${wallW}" height="${wallH}" rx="4" fill="${cc}" stroke="${ch.stroke || '#4338ca'}" stroke-width="1.5"/>`;

    // Pore (opening/closing gate)
    if (!s.blocked) {
      svg += `<rect x="${cx + wallW}" y="${wy + 4}" width="${poreW}" height="${wallH - 8}" rx="3" fill="rgba(99,102,241,0.12)"/>`;
      // Gate indicator (open)
      svg += `<line x1="${cx + wallW}" y1="${wy + wallH / 2}" x2="${cx + wallW + 4}" y2="${wy + wallH / 2 - 6}" stroke="${cc}" stroke-width="2" opacity=".5"/>`;
      svg += `<line x1="${cx + wallW + poreW}" y1="${wy + wallH / 2}" x2="${cx + wallW + poreW - 4}" y2="${wy + wallH / 2 - 6}" stroke="${cc}" stroke-width="2" opacity=".5"/>`;
      svg += `<text x="${cx + wallW + poreW / 2}" y="${wy + wallH / 2 + 4}" text-anchor="middle" fill="${cc}" font-size="7" font-weight="700" font-family="system-ui,sans-serif" opacity=".5">OPEN</text>`;
    } else {
      // Closed pore with drug plugging (requirement #6)
      svg += `<rect x="${cx + wallW}" y="${wy + 4}" width="${poreW}" height="${wallH - 8}" rx="3" fill="rgba(107,114,128,0.08)"/>`;
      svg += `<text x="${cx + wallW + poreW / 2}" y="${wy + wallH / 2 + 4}" text-anchor="middle" fill="#6B7280" font-size="7" font-weight="700" font-family="system-ui,sans-serif" opacity=".5">CLOSED</text>`;
      // Drug physically plugging the pore
      if (s.drugName) {
        svg += `<rect x="${cx + wallW + 2}" y="${wy + wallH / 2 - 6}" width="${poreW - 4}" height="12" rx="4" fill="#EF4444" opacity=".6"/>`;
        svg += `<text x="${cx + wallW + poreW / 2}" y="${wy + wallH / 2 + 3}" text-anchor="middle" fill="#fff" font-size="6" font-weight="700" font-family="system-ui,sans-serif">${s.drugName}</text>`;
      }
    }

    // Channel label
    svg += `<text x="${cx + wallW + poreW / 2}" y="${wy - 6}" text-anchor="middle" fill="#fff" font-size="10" font-weight="700" font-family="system-ui,sans-serif">${ch.label || 'Na⁺'}</text>`;

    // Voltage sensor domain (requirement #6)
    if (isVG) {
      svg += `<rect x="${cx - 20}" y="${my + 2}" width="16" height="28" rx="3" fill="${cc}" opacity=".4" stroke="${ch.stroke || '#4338ca'}" stroke-width="1"/>`;
      svg += `<text x="${cx - 12}" y="${my + 19}" text-anchor="middle" fill="#fff" font-size="6" font-weight="700" font-family="system-ui,sans-serif" opacity=".7">V</text>`;
      // Plus charges
      svg += `<text x="${cx - 26}" y="${my + 10}" fill="#ef4444" font-size="7" font-weight="700" font-family="system-ui,sans-serif">+</text>`;
      svg += `<text x="${cx - 26}" y="${my + 22}" fill="#ef4444" font-size="7" font-weight="700" font-family="system-ui,sans-serif">+</text>`;
    }

    svg += this.lbl(385, my + 8, ch.voltageLabel || '', '#5a6478', 8, 'end');

    // Step indicators
    svg += this.stepIndicator(1, 55, 34, steps[0]);
    svg += this.stepIndicator(2, 55, 68, steps[1]);

    // Ions flowing through (with animated dots and size differences)
    if (!s.blocked) {
      svg += this.stepIndicator(3, 55, my + 30, steps[2]);
      for (let i = 0; i < ions.length; i++) {
        const ion = ions[i];
        const ix = cx + wallW + poreW / 2 + (i - ions.length / 2) * 8;
        const iy = 22 + i * 16;
        // Ion size based on type (requirement #6)
        const ionR = ion.size === 'large' ? 12 : ion.size === 'small' ? 8 : 10;
        svg += this.lig(ix, iy, ionR, ion.label || 'Na⁺', ion.color || '#ef4444');
        // Animated flow dots
        svg += `<circle class="rv-signal-path" cx="${ix}" cy="${iy}" r="${ionR - 2}" fill="${ion.color || '#ef4444'}" opacity=".3">
          <animate attributeName="cy" values="${iy};${my + 16}" dur="1.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values=".4;0" dur="1.5s" repeatCount="indefinite"/>
        </circle>`;
        // Ions exiting below
        svg += `<circle class="rv-signal-path" cx="${ix}" cy="${my + 24}" r="5" fill="${ion.color || '#ef4444'}" opacity=".5"/>`;
        svg += `<circle class="rv-signal-path" cx="${ix + 6}" cy="${my + 34}" r="4" fill="${ion.color || '#ef4444'}" opacity=".35"/>`;
      }
    } else {
      // Blocked: ions can't pass, show outside
      for (let j = 0; j < Math.min(ions.length, 2); j++) {
        const ion2 = ions[j];
        const ox = j ? 22 : -22;
        svg += this.lig(cx + wallW + poreW / 2 + ox, my - 28, 10, ion2.label || 'Na⁺', ion2.color || '#ef4444');
      }
      svg += this.block(cx + wallW + poreW + 20, my - 20);
    }

    // Legend
    svg += this.legend(268, 4);

    // Step 4
    if (e.type && !s.blocked) {
      svg += this.effectIcon(e.type, e.x || 40, e.y || my + 58, e.color, e.extra);
      svg += this.stepIndicator(4, 55, my + 58, steps[3]);
    }

    if (s.blocked) svg += this.status(200, my + 56, '⊘ BLOCKED', s.statusText?.sub || s.drugName, '#EF4444');
    else svg += this.status(200, my + 56, '✓ FLOWING', s.statusText?.sub, '#22C55E');

    return this.svgWrap(svg, CANVAS_W, 240);
  }

  /* ═══ TEMPLATE: transporter (requirement #9) ═══ */
  private transporter(s: MolScene): string {
    const tr = s.transporter || {};
    const mol = s.molecule || {};
    const e = s.effect || {};
    const my = s.membrane?.y || 95;
    const tx = 130;
    const tw = 100;
    const th = 46;
    const tc = s.blocked ? '#6B7280' : (tr.color || '#0d9488');
    const steps = s.stepDescriptions || ['Outward-facing', 'Substrate binds', 'Conformational change', 'Substrate released'];
    const state = tr.state || 'outward';

    let svg = this.membrane(my);
    svg += this.zoneLabels(my);

    // Transporter body with conformational change model (requirement #9)
    const d = s.blocked ? ' stroke-dasharray="4"' : '';
    svg += `<rect class="rv-receptor" x="${tx}" y="${my - th / 2}" width="${tw}" height="${th}" rx="10" fill="${tc}" stroke="${tr.stroke || '#0f766e'}" stroke-width="1.5"${d}/>`;
    svg += `<rect x="${tx + 2}" y="${my - th / 2 + 2}" width="${tw - 4}" height="${th / 3}" rx="8" fill="rgba(255,255,255,.08)"/>`;
    svg += `<text x="${tx + tw / 2}" y="${my + 5}" text-anchor="middle" fill="#fff" font-size="${String(tr.label || '').length > 8 ? 8 : 10}" font-weight="700" font-family="system-ui,sans-serif">${tr.label || 'SERT'}</text>`;

    // Conformational state visualization (requirement #9)
    if (!s.blocked) {
      // Show the 3 states as small diagrams
      const states = [
        { label: 'Outward', x: tx + 10, shape: 'M 0,-8 Q 0,-12 4,-12 L 16,-12 Q 20,-12 20,-8 L 20,8 Q 20,12 16,12 L 4,12 Q 0,12 0,8 Z' },
        { label: 'Occluded', x: tx + 36, shape: 'M 0,-8 L 0,8 L 20,8 L 20,-8 Z' },
        { label: 'Inward', x: tx + 62, shape: 'M 0,-8 Q 0,-12 -4,-12 L -16,-12 Q -20,-12 -20,-8 L -20,8 Q -20,12 -16,12 L -4,12 Q 0,12 0,8 Z' },
      ];
      const activeIdx = state === 'inward' ? 2 : state === 'occluded' ? 1 : 0;
      states.forEach((st, i) => {
        const isActive = i === activeIdx;
        const opacity = isActive ? '.5' : '.15';
        svg += `<path d="${st.shape}" transform="translate(${st.x},${my + th / 2 + 16}) scale(.6)" fill="${tc}" opacity="${opacity}" stroke="${tr.stroke || '#0f766e'}" stroke-width="1"/>`;
        svg += `<text x="${st.x + 6}" y="${my + th / 2 + 28}" text-anchor="middle" fill="${isActive ? tc : '#5a6478'}" font-size="6" font-weight="${isActive ? '700' : '500'}" font-family="system-ui,sans-serif">${st.label}</text>`;
      });
    }

    // Transport channel opening
    if (!s.blocked) {
      svg += `<rect x="${tx + 16}" y="${my - 5}" width="${tw - 32}" height="10" rx="4" fill="rgba(255,255,255,.08)"/>`;
    }

    // Gradient arrow (requirement #9)
    svg += `<text x="${tx + tw + 16}" y="${my - th / 2 - 6}" fill="#5a6478" font-size="6" font-weight="600" font-family="system-ui,sans-serif">High →</text>`;
    svg += `<text x="${tx + tw + 16}" y="${my + th / 2 + 12}" fill="#5a6478" font-size="6" font-weight="600" font-family="system-ui,sans-serif">→ Low</text>`;
    svg += this.arrow(`M ${tx + tw + 30},${my - th / 2} L ${tx + tw + 30},${my + th / 2}`, '#5a6478', 1);

    // Step indicators
    svg += this.stepIndicator(1, 50, 34, steps[0]);
    svg += this.stepIndicator(2, 50, 60, steps[1]);

    // Molecule
    if (mol.label) {
      const mc = mol.color || '#8b5cf6';
      svg += this.lig(tx - 30, my, 14, mol.label, mc);
      if (!s.blocked) {
        svg += this.arrow(`M ${tx - 16},${my} L ${tx},${my}`, mc, 2);
        svg += this.arrow(`M ${tx + tw},${my} L ${tx + tw + 24},${my}`, mc, 2);
        svg += `<circle class="rv-signal-path" cx="${tx + tw / 2}" cy="${my}" r="7" fill="${mc}" opacity=".4"/>`;
        svg += this.lig(tx + tw + 36, my, 10, mol.label, mc);
        svg += this.stepIndicator(3, 50, my + 30, steps[2]);
        svg += this.stepIndicator(4, 50, my + 50, steps[3]);
      }
    }

    // Blocked state
    if (s.blocked) {
      svg += this.block(tx + tw + 6, my - th / 2 - 4);
      if (s.drugName) {
        svg += this.drugPill(tx + tw / 2, my - th / 2 - 22, s.drugName, '#EF4444', s.drugMechanism || 'blocks reuptake');
      }
    }

    // Legend
    svg += this.legend(268, 4);

    if (e.type) svg += this.effectIcon(e.type, e.x || 40, e.y || my + 66, e.color, e.extra);
    if (s.blocked) svg += this.status(200, my + 60, '⊘ BLOCKED', s.statusText?.sub || s.drugName, '#EF4444');
    else svg += this.status(200, my + 60, '✓ TRANSPORTING', s.statusText?.sub, '#22C55E');

    return this.svgWrap(svg, CANVAS_W, 250);
  }

  /* ═══ TEMPLATE: enzyme_catalysis (requirement #7) ═══ */
  private enzyme(s: MolScene): string {
    const enz = s.enzyme || {};
    const subs = s.substrates || [];
    const prods = s.products || [];
    const e = s.effect || {};
    const my = s.membrane?.y || 95;
    const ex = enz.x || 140;
    const ey = 40;
    const ew = enz.w || 100;
    const eh = enz.h || 60;
    const ec = s.blocked ? '#6B7280' : (enz.color || '#f97316');
    const steps = s.stepDescriptions || ['Substrate approaches', 'Binding at active site', 'Catalysis', 'Product released'];
    const inhType = s.inhibitorType || 'competitive';

    let svg = this.membrane(my);
    svg += this.zoneLabels(my);

    // Enzyme body — lock and key / induced fit model (requirement #7)
    svg += `<rect class="rv-receptor" x="${ex}" y="${ey}" width="${ew}" height="${eh}" rx="14" fill="${ec}" stroke="${enz.stroke || '#ea580c'}" stroke-width="1.5"${s.blocked ? ' stroke-dasharray="4"' : ''}/>`;
    svg += `<rect x="${ex + 2}" y="${ey + 2}" width="${ew - 4}" height="${eh / 3}" rx="12" fill="rgba(255,255,255,.1)"/>`;

    // Active site notch (lock-and-key) (requirement #7)
    if (enz.activeSite !== false) {
      if (!s.blocked || inhType === 'non-competitive') {
        svg += `<path d="M ${ex + ew / 2 - 18},${ey + eh} Q ${ex + ew / 2},${ey + eh + 14} ${ex + ew / 2 + 18},${ey + eh}" fill="none" stroke="${enz.stroke || '#ea580c'}" stroke-width="2" opacity=".6"/>`;
        svg += `<rect x="${ex + ew / 2 - 16}" y="${ey + eh - 4}" width="32" height="14" rx="5" fill="#fbbf24" opacity=".2"/>`;
        svg += `<text x="${ex + ew / 2}" y="${ey + eh + 6}" text-anchor="middle" fill="#fbbf24" font-size="6" font-weight="700" font-family="system-ui,sans-serif" opacity=".7">ACTIVE SITE</text>`;
      }
    }

    svg += `<text x="${ex + ew / 2}" y="${ey + eh / 2 + 4}" text-anchor="middle" fill="#fff" font-size="${String(enz.label || '').length > 10 ? 8 : 10}" font-weight="700" font-family="system-ui,sans-serif">${enz.label || 'Enzyme'}</text>`;

    // Step indicators
    svg += this.stepIndicator(1, 20, ey + 4, steps[0]);

    // Substrates
    for (const sub of subs) {
      const sx = sub.x || (ex - 34);
      const sy = sub.y || (ey + 20);
      svg += this.lig(sx, sy, 12, sub.label, sub.color || '#3b82f6');
      if (!s.blocked) {
        svg += this.arrow(`M ${sx + 12},${sy} L ${ex},${sy}`, sub.color || '#3b82f6', 2);
        svg += this.stepIndicator(2, 20, sy + 20, steps[1]);
      }
    }

    // Products
    for (const p of prods) {
      const px = p.x || (ex + ew + 34);
      const py = p.y || (ey + 20);
      if (!s.blocked) {
        svg += this.arrow(`M ${ex + ew},${py} L ${px - 12},${py}`, p.color || '#22c55e', 2);
        svg += `<g class="rv-signal-path"><circle cx="${px}" cy="${py}" r="12" fill="${p.color || '#22c55e'}"/><circle cx="${px}" cy="${py}" r="8" fill="${p.color || '#22c55e'}" opacity=".7"/>` +
               `<text x="${px}" y="${py + 3}" text-anchor="middle" fill="#fff" font-size="${String(p.label || '').length > 4 ? 7 : 9}" font-weight="700" font-family="system-ui,sans-serif">${p.label}</text></g>`;
        svg += this.stepIndicator(4, 20, py + 20, steps[3]);
      }
    }

    // Catalysis indicator
    if (!s.blocked) {
      svg += `<text x="${ex + ew / 2}" y="${ey + eh + 22}" text-anchor="middle" fill="#f59e0b" font-size="9" font-weight="700" font-family="system-ui,sans-serif">⚡ Catalysis</text>`;
      svg += this.stepIndicator(3, 20, ey + eh + 20, steps[2]);
    }

    // Competitive inhibitor: occupies active site (requirement #7)
    if (s.blocked) {
      if (inhType === 'competitive') {
        // Show inhibitor in the active site
        svg += this.drugPill(ex + ew / 2, ey + eh + 8, s.drugName || 'Inhibitor', '#EF4444', s.drugMechanism || 'competitive inhibitor');
        svg += `<text x="${ex + ew / 2}" y="${ey + eh + 26}" text-anchor="middle" fill="#EF4444" font-size="6" font-weight="600" font-family="system-ui,sans-serif">Blocks active site</text>`;
      } else {
        // Non-competitive: binds elsewhere, allosteric change
        svg += this.drugPill(ex - 16, ey + eh / 2, s.drugName || 'Inhibitor', '#EF4444', s.drugMechanism || 'non-competitive inhibitor');
        // Show allosteric change arrow
        svg += this.arrow(`M ${ex - 6},${ey + eh / 2} L ${ex + 10},${ey + eh / 2}`, '#EF4444', 1.5);
        svg += `<text x="${ex + ew / 2}" y="${ey + eh + 16}" text-anchor="middle" fill="#EF4444" font-size="6" font-weight="600" font-family="system-ui,sans-serif">Allosteric change → No catalysis</text>`;
        // Show substrate still near active site but can't be processed
        if (subs.length > 0) {
          const sub = subs[0];
          const sx = sub.x || (ex - 34);
          const sy = sub.y || (ey + 20);
          svg += this.lig(sx, sy, 12, sub.label, sub.color || '#3b82f6');
          svg += `<line x1="${sx + 12}" y1="${sy}" x2="${ex}" y2="${sy}" stroke="#6B7280" stroke-width="1.5" stroke-dasharray="3,3" opacity=".3"/>`;
        }
      }
      svg += this.block(ex + ew + 6, ey - 4);
    }

    // Legend
    svg += this.legend(268, 4);

    if (s.blocked) {
      svg += this.status(200, ey + eh + 40, '⊘ BLOCKED', s.statusText?.sub || s.drugName, '#EF4444');
    } else {
      svg += this.status(200, ey + eh + 40, '✓ CATALYZING', s.statusText?.sub, '#22C55E');
    }
    if (e.type) svg += this.effectIcon(e.type, e.x || 40, e.y || my + 50, e.color, e.extra);

    return this.svgWrap(svg, CANVAS_W, 250);
  }

  /* ═══ TEMPLATE: dna_binding (requirement #8) ═══ */
  private dna(s: MolScene): string {
    const drug = s.ligand || {};
    const e = s.effect || {};
    const dx = 50;
    const dh = 140;
    const dc = '#3b82f6';
    const steps = s.stepDescriptions || ['TF approaches DNA', 'TF binds promoter', 'RNA Pol recruited', 'mRNA transcribed'];
    let svg = '';

    // DNA double helix with major and minor grooves (requirement #8)
    for (let i = 0; i < dh; i += 8) {
      const phase = (i % 32) / 32;
      const majorGroove = phase < 0.5;
      const o1 = Math.sin(i * Math.PI / 16) * 14;
      const o2 = Math.sin(i * Math.PI / 16 + Math.PI) * 14;

      // Strand 1
      svg += `<path d="M ${dx + o1},${i} Q ${dx + o1 + (majorGroove ? 6 : 3)},${i + 4} ${dx + o1},${i + 8}" fill="none" stroke="${dc}" stroke-width="2.5" opacity=".5"/>`;
      // Strand 2
      svg += `<path d="M ${dx + 24 + o2},${i} Q ${dx + 24 + o2 + (majorGroove ? 6 : 3)},${i + 4} ${dx + 24 + o2},${i + 8}" fill="none" stroke="${dc}" stroke-width="2" opacity=".35"/>`;

      // Base pairs
      if (i % 16 < 8) {
        const midX1 = dx + o1 + 4;
        const midX2 = dx + 24 + o2 - 4;
        svg += `<line x1="${midX1}" y1="${i + 4}" x2="${midX2}" y2="${i + 4}" stroke="#8B5CF6" stroke-width="1.5" opacity=".3"/>`;
      }

      // Major/minor groove labels
      if (i === 0) {
        svg += `<text x="${dx - 8}" y="${i + 8}" fill="#5a6478" font-size="5" font-weight="600" font-family="system-ui,sans-serif" transform="rotate(-90,${dx - 8},${i + 8})">MAJOR</text>`;
      }
    }
    svg += this.lbl(dx + 20, 12, '🧬 DNA', dc, 10);

    // Promoter sequence label (requirement #8)
    svg += `<rect x="${dx - 4}" y="44" width="48" height="12" rx="3" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.3)" stroke-width="0.5"/>`;
    svg += `<text x="${dx + 20}" y="53" text-anchor="middle" fill="#a78bfa" font-size="6" font-weight="700" font-family="system-ui,sans-serif">PROMOTER</text>`;

    // Step indicators
    svg += this.stepIndicator(1, 100, 20, steps[0]);

    // Transcription factor / Drug (requirement #8)
    if (drug.label) {
      const dx2 = 200;
      const dy2 = 70;
      svg += this.lig(dx2, dy2, 16, drug.label, drug.color || '#ef4444');
      if (!s.blocked) {
        svg += this.stepIndicator(2, 100, 48, steps[1]);
        svg += this.arrow(`M ${dx2 - 16},${dy2} L ${dx + 30},${dy2}`, drug.color || '#ef4444', 2);
        svg += `<circle cx="${dx + 28}" cy="${dy2}" r="8" fill="${drug.color || '#ef4444'}" opacity=".2"/>`;

        // RNA polymerase recruitment (requirement #8)
        svg += this.stepIndicator(3, 100, 100, steps[2]);
        svg += `<rect x="${dx + 40}" y="${dy2 - 8}" width="40" height="20" rx="6" fill="#8b5cf6" opacity=".5" stroke="#7c3aed" stroke-width="1"/>`;
        svg += `<text x="${dx + 60}" y="${dy2 + 5}" text-anchor="middle" fill="#fff" font-size="7" font-weight="700" font-family="system-ui,sans-serif">RNA Pol</text>`;
        svg += this.arrow(`M ${dx + 28},${dy2 + 8} L ${dx + 40},${dy2}`, '#8b5cf6', 1.5);

        // mRNA being transcribed — wavy line (requirement #8)
        svg += this.stepIndicator(4, 100, 130, steps[3]);
        svg += `<path d="M ${dx + 80},${dy2 + 12} Q ${dx + 90},${dy2 + 6} ${dx + 100},${dy2 + 12} Q ${dx + 110},${dy2 + 18} ${dx + 120},${dy2 + 12} Q ${dx + 130},${dy2 + 6} ${dx + 140},${dy2 + 12} Q ${dx + 150},${dy2 + 18} ${dx + 160},${dy2 + 12}" fill="none" stroke="#22c55e" stroke-width="2" opacity=".6"/>`;
        svg += this.lbl(dx + 120, dy2 + 28, 'mRNA → Protein', '#22c55e', 8, 'middle');
      }

      if (s.blocked) {
        // Drug intercalating or blocking binding site (requirement #8)
        if (s.drugName) {
          svg += this.drugPill(dx2, dy2 - 26, s.drugName, '#EF4444', s.drugMechanism || 'blocks transcription');
          // Show drug intercalating into DNA
          svg += `<rect x="${dx + 12}" y="${dy2 - 4}" width="16" height="8" rx="3" fill="#EF4444" opacity=".4"/>`;
          svg += `<text x="${dx + 20}" y="${dy2 + 3}" text-anchor="middle" fill="#fff" font-size="5" font-weight="700" font-family="system-ui,sans-serif">✕</text>`;
        }
        svg += this.block(dx2 + 20, dy2 - 10);
      }
    }

    // Legend
    svg += this.legend(268, 4);

    if (s.blocked) {
      svg += this.status(200, 180, '⊘ BLOCKED', s.statusText?.sub || s.drugName, '#EF4444');
    } else {
      svg += this.status(200, 180, '✓ EXPRESSED', s.statusText?.sub, '#22C55E');
    }
    if (e.type) svg += this.effectIcon(e.type, e.x || 260, e.y || 160, e.color, e.extra);

    return this.svgWrap(svg, CANVAS_W, 220);
  }
}
