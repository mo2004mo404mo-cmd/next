/**
 * render_lab_panel — deterministic SVG lab-report generator for medical
 * questions. Given structured rows (test, result, units, reference range,
 * abnormal flag), it renders a crisp clinical lab panel as an SVG file in
 * /public/generated and returns its URL.
 *
 * Why SVG instead of generate_medical_illustration: lab panels are textual
 * data — an LLM image model produces fuzzy, misaligned, sometimes wrong
 * numbers. A deterministic renderer guarantees exact values, perfect
 * alignment, and readable typography at any zoom.
 *
 * Abnormal flags (H/L) render red/blue with a subtle row tint, matching the
 * look of real lab printouts students see on exams.
 */
import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';
import { createLogger } from '../../logger';

const log = createLogger('LabPanelTool');

const GENERATED_DIR = path.join(process.cwd(), 'public', 'generated');

// Panel geometry (px) — mirrored into the tool result for UI sizing.
const ROW_H = 30;
const HEADER_H = 96;
const COLS_H = 34;
const COL_TEST = 300;
const COL_RESULT = 150;
const COL_FLAG = 70;
const COL_REF = 210;
const TABLE_W = COL_TEST + COL_RESULT + COL_FLAG + COL_REF;

function esc(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Estimate rendered width of a string (approximate: CJK≈11px, else 6.4px at 13px font). Kept for future caption layout. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function textWidth(s: string): number {
  let w = 0;
  for (const ch of s) w += /[\u4e00-\u9fff\u3040-\u30ff]/.test(ch) ? 11 : 6.4;
  return w;
}

interface LabRow {
  test: string;
  result: string;
  units?: string;
  reference?: string;
  flag?: string; // 'H' | 'L' | '' (normal)
}

function buildLabPanelSvg(params: {
  title: string;
  subtitle?: string;
  rows: LabRow[];
  footnote?: string;
}): string {
  const { title, subtitle, rows, footnote } = params;

  // Column geometry
  const PAD = 28;
  const FOOT_H = footnote ? 44 : 22;

  const W = TABLE_W + PAD * 2;
  const H = HEADER_H + COLS_H + rows.length * ROW_H + FOOT_H;

  const rowSvg = rows.map((r, i) => {
    const y = HEADER_H + COLS_H + i * ROW_H;
    const abnormal = r.flag === 'H' || r.flag === 'L';
    const flagColor = r.flag === 'H' ? '#c62828' : r.flag === 'L' ? '#1565c0' : '#9e9e9e';
    const rowBg = abnormal
      ? r.flag === 'H' ? 'rgba(198,40,40,0.06)' : 'rgba(21,101,192,0.06)'
      : i % 2 === 0 ? 'rgba(0,0,0,0.02)' : 'transparent';
    const resultX = PAD + COL_TEST;
    const flagX = PAD + COL_TEST + COL_RESULT;
    const refX = PAD + COL_TEST + COL_RESULT + COL_FLAG;
    const resultFont = abnormal ? '700' : '400';
    const resultColor = abnormal ? flagColor : '#1a1a1a';
    return [
      `  <rect x="${PAD - 10}" y="${y}" width="${TABLE_W + 20}" height="${ROW_H}" fill="${rowBg}"/>`,
      `  <line x1="${PAD - 10}" y1="${y + ROW_H}" x2="${PAD - 10 + TABLE_W + 20}" y2="${y + ROW_H}" stroke="#eceff1" stroke-width="1"/>`,
      `  <text x="${PAD}" y="${y + 20}" font-family="Helvetica, Arial, sans-serif" font-size="13" fill="#37474f">${esc(r.test)}</text>`,
      `  <text x="${resultX}" y="${y + 20}" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="${resultFont}" fill="${resultColor}">${esc(r.result)}${r.units ? ` ${esc(r.units)}` : ''}</text>`,
      `  <text x="${flagX}" y="${y + 20}" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="700" fill="${flagColor}">${esc(r.flag ?? '')}</text>`,
      `  <text x="${refX}" y="${y + 20}" font-family="Helvetica, Arial, sans-serif" font-size="13" fill="#78909c">${esc(r.reference ?? '')}</text>`,
    ].join('\n');
  }).join('\n');

  const subtitleLine = subtitle
    ? `  <text x="${W - PAD}" y="42" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="11" fill="#90a4ae">${esc(subtitle)}</text>`
    : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#ffffff"/>
  <rect x="0" y="0" width="${W}" height="4" fill="#0d47a1"/>
  <text x="${PAD}" y="36" font-family="Helvetica, Arial, sans-serif" font-size="17" font-weight="700" fill="#0d47a1">${esc(title)}</text>
  ${subtitleLine}
  <rect x="${PAD - 10}" y="${HEADER_H}" width="${TABLE_W + 20}" height="${COLS_H}" fill="#eceff1"/>
  <text x="${PAD}" y="${HEADER_H + 22}" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="700" fill="#455a64">TEST</text>
  <text x="${PAD + COL_TEST}" y="${HEADER_H + 22}" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="700" fill="#455a64">RESULT</text>
  <text x="${PAD + COL_TEST + COL_RESULT}" y="${HEADER_H + 22}" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="700" fill="#455a64">FLAG</text>
  <text x="${PAD + COL_TEST + COL_RESULT + COL_FLAG}" y="${HEADER_H + 22}" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="700" fill="#455a64">REFERENCE RANGE</text>
${rowSvg}
${footnote ? `  <text x="${PAD}" y="${H - 16}" font-family="Helvetica, Arial, sans-serif" font-size="10" fill="#b0bec5">${esc(footnote)}</text>` : ''}
</svg>`;
}

export function createLabPanelTool() {
  return new DynamicStructuredTool({
    name: 'render_lab_panel',
    description:
      'Render a clinical laboratory panel (CBC, BMP, ABG, LFTs, thyroid studies, lipid panel, urinalysis...) as a crisp lab-report image from structured values. Use this for ANY question whose stem depends on interpreting lab values — it guarantees exact numbers and clean formatting. Always ALSO write the key values in the question text as a compact table so the values are readable without the image.',
    schema: z.object({
      title: z.string().min(3).max(80).describe('Panel name, e.g. "Complete Blood Count"'),
      subtitle: z.string().max(80).optional().describe('Context line, e.g. "Patient: 34F · Day 3 of admission"'),
      rows: z.array(z.object({
        test: z.string().min(1).max(60).describe('Test name, e.g. "Hemoglobin"'),
        result: z.string().min(1).max(30).describe('Result value as a string, e.g. "7.8"'),
        units: z.string().max(20).optional().describe('Units, e.g. "g/dL"'),
        reference: z.string().max(40).optional().describe('Reference range, e.g. "12.0–16.0"'),
        flag: z.enum(['H', 'L', '']).optional().describe('H = above range (red), L = below range (blue), empty = normal'),
      })).min(1).max(30),
      footnote: z.string().max(120).optional().describe('Small footnote, e.g. "Reference ranges per institutional standards"'),
    }),
    func: async ({ title, subtitle, rows, footnote }) => {
      try {
        await fs.mkdir(GENERATED_DIR, { recursive: true });
        const svg = buildLabPanelSvg({ title, subtitle, rows, footnote });
        const fileName = `lab-${crypto.randomUUID().slice(0, 13)}.svg`;
        const filePath = path.join(GENERATED_DIR, fileName);
        await fs.writeFile(filePath, svg, 'utf8');
        const url = `/generated/${fileName}`;
        log.info?.(`Lab panel rendered: ${title} (${rows.length} rows) → ${url}`);
        return JSON.stringify({
          url,
          width: TABLE_W + 56,
          height: HEADER_H + COLS_H + rows.length * ROW_H + (footnote ? 44 : 22),
          rows: rows.length,
          note: 'Lab panel image saved. Use this exact URL as the question\'s imageUrl, and ALSO include the key values as a compact plain-text table in the question text.',
        });
      } catch (error) {
        // Graceful degradation: never crash the agent graph — the question
        // can still be written with the values as an in-text table.
        return JSON.stringify({
          error: `Lab panel rendering failed: ${error instanceof Error ? error.message.slice(0, 200) : 'unknown'}`,
          note: 'Proceed without the panel image: write the lab values as a compact plain-text table directly in the question text instead.',
        });
      }
    },
  });
}
