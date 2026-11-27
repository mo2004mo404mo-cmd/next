import type { Question } from '@/lib/medq-types';

/* ═══════════════════════════════════════════════════════════════
   HTML-TO-TEXT CONVERSION — Preserves structure, lists, paragraphs
   ═══════════════════════════════════════════════════════════════ */

/**
 * Convert HTML to clean, structured plain text.
 * - <li> → "• item" (with indentation for nested lists)
 * - <p>, <br>, <div> → paragraph breaks
 * - <h1>-<h6> → UPPERCASE heading with blank line
 * - <strong>/<b> → plain (jsPDF handles bold via font)
 * - <em>/<i> → plain
 * - Strips all other tags cleanly
 */
/**
 * Sanitize text for jsPDF rendering.
 * jsPDF's built-in Helvetica font only supports WinAnsiEncoding (essentially Latin-1).
 * Many Unicode characters (bullet, checkmark, em-dash, arrows, etc.) are NOT
 * in this encoding and will either render as blank, throw errors, or break layout.
 * This function replaces those characters with ASCII-safe alternatives.
 */
function sanitizeForPdf(text: string): string {
  if (!text) return '';
  return text
    .replace(/\u2022/g, '-')       // bullet -> dash
    .replace(/\u2713/g, 'V')       // checkmark -> V
    .replace(/\u2714/g, 'V')       // heavy checkmark -> V
    .replace(/\u2717/g, 'X')       // ballot X -> X
    .replace(/\u2718/g, 'X')       // heavy ballot X -> X
    .replace(/\u2014/g, '--')      // em dash -> double dash
    .replace(/\u2013/g, '-')       // en dash -> dash
    .replace(/\u2026/g, '...')     // ellipsis -> three dots
    .replace(/\u2192/g, '->')      // right arrow -> ->
    .replace(/\u2190/g, '<-')      // left arrow -> <-
    .replace(/\u2191/g, '^')       // up arrow -> ^
    .replace(/\u2193/g, 'v')       // down arrow -> v
    .replace(/\u00B7/g, '-')       // middle dot -> dash
    .replace(/\u2018/g, "'")       // left single quote
    .replace(/\u2019/g, "'")       // right single quote
    .replace(/\u201C/g, '"')       // left double quote
    .replace(/\u201D/g, '"')       // right double quote
    .replace(/[\u25A0-\u25FF]/g, '*')  // geometric shapes -> asterisk
    .replace(/[\u2600-\u27BF]/g, '')   // misc symbols (emoji-like) -> remove
    .replace(/[\u2300-\u23FF]/g, '-');  // misc technical -> dash
}

function stripHtml(html: string): string {
  if (!html) return '';

  let text = html;

  // Normalize line breaks & whitespace
  text = text.replace(/\r\n/g, '\n');
  text = text.replace(/\r/g, '\n');

  // Convert list items to dash-prefixed items (PDF-safe)
  text = text.replace(/<li[^>]*>/gi, '\n- ');

  // Close list items
  text = text.replace(/<\/li>/gi, '');

  // Paragraph / div / heading breaks
  text = text.replace(/<\/p>/gi, '\n\n');
  text = text.replace(/<p[^>]*>/gi, '\n');
  text = text.replace(/<\/div>/gi, '\n');
  text = text.replace(/<div[^>]*>/gi, '\n');
  text = text.replace(/<br\s*\/?>/gi, '\n');

  // Headings - make uppercase and add spacing
  text = text.replace(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi, (_match, inner: string) => {
    const cleaned = inner.replace(/<[^>]*>/g, '').trim();
    return `\n\n${cleaned.toUpperCase()}\n`;
  });

  // Remove all remaining HTML tags
  text = text.replace(/<[^>]*>/g, '');

  // Decode HTML entities - convert to ASCII-safe equivalents for PDF
  text = text
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '--')
    .replace(/&ndash;/g, '-')
    .replace(/&bull;/g, '-')
    .replace(/&hellip;/g, '...')
    .replace(/&rarr;/g, '->')
    .replace(/&larr;/g, '<-');

  // Sanitize any remaining Unicode that jsPDF can't render
  text = sanitizeForPdf(text);

  // Clean up excessive whitespace
  text = text.replace(/[ \t]+/g, ' '); // collapse horizontal whitespace
  text = text.replace(/\n[ \t]+/g, '\n'); // remove leading spaces on lines
  text = text.replace(/\n{3,}/g, '\n\n'); // max 2 consecutive newlines
  text = text.trim();

  return text;
}

/**
 * Split rich HTML content into lines suitable for PDF rendering.
 * Returns an array of { text, indent } objects for precise layout.
 */
function htmlToStructuredLines(html: string): { text: string; indent: number }[] {
  const plain = stripHtml(html);
  if (!plain) return [];

  const lines: { text: string; indent: number }[] = [];
  const rawLines = plain.split('\n');

  for (const line of rawLines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Bullet point lines get indentation
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      let bulletText = trimmed;
      if (trimmed.startsWith('* ')) bulletText = '- ' + trimmed.slice(2);
      lines.push({ text: bulletText, indent: 6 });
    }
    // Numbered list items
    else if (/^\d+[\.\)]\s/.test(trimmed)) {
      lines.push({ text: trimmed, indent: 6 });
    }
    // Regular text
    else {
      lines.push({ text: trimmed, indent: 0 });
    }
  }

  return lines;
}

/* ═══════════════════════════════════════════════════════════════
   UTILITY HELPERS
   ═══════════════════════════════════════════════════════════════ */

function getTimestamp(): string {
  return new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-');
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ═══════════════════════════════════════════════════════════════
   JSON DOWNLOAD — kept as-is
   ═══════════════════════════════════════════════════════════════ */

export async function downloadAsJSON(questions: Question[], filename?: string): Promise<void> {
  const cleanQuestions = questions.map((q) => ({
    id: q.id,
    type: q.type,
    text: q.text,
    options: q.options,
    answer: q.answer,
    explanation: q.explanation,
    mnemonic: q.mnemonic,
    clinicalPearl: q.clinicalPearl,
    distractorAnalysis: q.distractorAnalysis,
    difficulty: q.difficulty,
    system: q.system,
    topic: q.topic,
    tags: q.tags,
    isAIGenerated: q.isAIGenerated,
  }));

  const json = JSON.stringify(
    { exportedAt: new Date().toISOString(), count: cleanQuestions.length, questions: cleanQuestions },
    null,
    2
  );
  const blob = new Blob([json], { type: 'application/json' });
  triggerDownload(blob, filename || `medq-questions-${getTimestamp()}.json`);
}

export async function downloadSingleQuestionJSON(question: Question): Promise<void> {
  await downloadAsJSON([question], `medq-${question.topic || 'question'}-${getTimestamp()}.json`);
}

/* ═══════════════════════════════════════════════════════════════
   PDF DOWNLOAD — Professional quality, client-side jsPDF
   ═══════════════════════════════════════════════════════════════ */

// --- Brand Colors ---
const BRAND = {
  green: [22, 163, 74] as const,       // Primary MedQ green
  darkGreen: [17, 120, 55] as const,   // Darker green for accents
  lightGreen: [240, 253, 244] as const, // Very light green bg
  greenBorder: [134, 239, 172] as const, // Green border
  navy: [26, 26, 46] as const,          // Dark navy text
  slate: [51, 65, 85] as const,         // Body text
  muted: [100, 116, 139] as const,      // Muted/secondary text
  lightGray: [241, 245, 249] as const,  // Light gray bg
  border: [226, 232, 240] as const,     // Border color
  white: [255, 255, 255] as const,
  amber: [146, 64, 14] as const,        // Amber for warnings/tf
  purple: [91, 33, 182] as const,       // Purple for mnemonics
  red: [153, 27, 27] as const,          // Red for hard
  blue: [37, 99, 235] as const,         // Blue for low flags
};

const LETTERS = ['A', 'B', 'C', 'D'] as const;

export async function downloadAsPDF(questions: Question[], filename?: string) {
  const pdfFilename = filename || `medq-questions-${getTimestamp()}.pdf`;
  let jsPDFConstructor: typeof import('jspdf').jsPDF;
  try {
    const jspdfModule = await import('jspdf');
    jsPDFConstructor = jspdfModule.jsPDF;
  } catch (importErr) {
    console.error('[MedQ PDF] Failed to import jsPDF:', importErr);
    throw new Error('PDF library failed to load. Please check your internet connection and try again.');
  }

  const doc = new jsPDFConstructor({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const PW = 210;   // page width
  const PH = 297;   // page height
  const ML = 15;    // margin left
  const MR = 15;    // margin right
  const MT = 15;    // margin top
  const MB = 20;    // margin bottom
  const CW = PW - ML - MR;  // content width
  const MAX_Y = PH - MB;

  let y = MT;
  let pageNum = 1;

  // ── Helper: rasterize a question image (incl. SVG ECG strips) for embedding ──
  const rasterizeImage = async (url: string): Promise<{ dataUrl: string; w: number; h: number } | null> => {
    try {
      let src = url;
      let revoke: string | null = null;
      // SVGs without intrinsic size (our ECG strips) need explicit dimensions
      if (/\.svg(\?|$)/i.test(url)) {
        const res = await fetch(url);
        const text = await res.text();
        const vb = text.match(/viewBox=["']([\d.\s]+)["']/);
        if (vb) {
          const nums = vb[1].trim().split(/\s+/).map(Number);
          const vw = nums[2] || 1000;
          const vh = nums[3] || 250;
          const withSize = text.replace(/<svg/, `<svg width="${vw}" height="${vh}"`);
          revoke = URL.createObjectURL(new Blob([withSize], { type: 'image/svg+xml' }));
          src = revoke;
        }
      }
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('image timeout')), 8000);
        img.onload = () => { clearTimeout(timer); resolve(); };
        img.onerror = () => { clearTimeout(timer); reject(new Error('image load failed')); };
        img.src = src;
      });
      const scale = Math.min(2, 1400 / Math.max(1, img.naturalWidth || 1000));
      const cw = Math.max(1, Math.round((img.naturalWidth || 1000) * scale));
      const ch = Math.max(1, Math.round((img.naturalHeight || 300) * scale));
      const canvas = document.createElement('canvas');
      canvas.width = cw;
      canvas.height = ch;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('no canvas ctx');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, 0, 0, cw, ch);
      if (revoke) URL.revokeObjectURL(revoke);
      return { dataUrl: canvas.toDataURL('image/jpeg', 0.92), w: cw, h: ch };
    } catch {
      return null;
    }
  };

  // ── Helper: embed the question image / ECG strip, fitted to content width ──
  const embedQuestionImage = async (url?: string, caption?: string) => {
    if (!url) return;
    const raster = await rasterizeImage(url);
    if (!raster) return;
    const maxW = CW - 4;
    const maxH = 90;
    const ratio = Math.min(maxW / raster.w, maxH / raster.h);
    const w = raster.w * ratio;
    const h = raster.h * ratio;
    ensureSpace(h + (caption ? 8 : 4));
    doc.setDrawColor(BRAND.border[0], BRAND.border[1], BRAND.border[2]);
    doc.setLineWidth(0.3);
    doc.addImage(raster.dataUrl, 'JPEG', ML + 2, y, w, h);
    doc.rect(ML + 2, y, w, h, 'S');
    y += h + 2;
    if (caption) {
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
      doc.text(caption, ML + 4, y);
      y += 5;
    }
    y += 2;
  };

  // ── Helper: render lab panels as a styled table ──
  const renderLabPanel = (labPanelRaw?: string) => {
    if (!labPanelRaw) return;
    let panels: Array<{ name?: string; rows?: Array<{ test?: string; value?: string; unit?: string; flag?: string }> }> = [];
    try { panels = JSON.parse(labPanelRaw); } catch { return; }
    panels = panels.filter((p) => p && Array.isArray(p.rows) && p.rows.length);
    if (!panels.length) return;

    for (const panel of panels) {
      const rows = panel.rows!.slice(0, 10);
      const colW = [CW * 0.38, CW * 0.24, CW * 0.22, CW * 0.12];
      const rowH = 6;
      ensureSpace(rows.length * rowH + 14);

      // Panel name header
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setFillColor(BRAND.navy[0], BRAND.navy[1], BRAND.navy[2]);
      const hw = doc.getTextWidth(panel.name || 'Lab panel') + 10;
      roundedRect(ML + 1, y, Math.min(hw, CW - 2), 6, 1.5, 'F');
      doc.setTextColor(BRAND.white[0], BRAND.white[1], BRAND.white[2]);
      doc.text(panel.name || 'Lab panel', ML + 6, y + 4);
      y += 9;

      // Header row
      doc.setFillColor(BRAND.lightGray[0], BRAND.lightGray[1], BRAND.lightGray[2]);
      doc.rect(ML + 1, y, CW - 2, rowH, 'F');
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
      ['Test', 'Result', 'Units', 'Flag'].forEach((h, ci) => {
        doc.text(h, ML + 5 + colW.slice(0, ci).reduce((a, b) => a + b, 0), y + 4);
      });
      y += rowH;

      // Data rows
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      rows.forEach((row, ri) => {
        ensureSpace(rowH);
        if (ri % 2 === 1) {
          doc.setFillColor(249, 250, 251);
          doc.rect(ML + 1, y, CW - 2, rowH, 'F');
        }
        doc.setTextColor(BRAND.slate[0], BRAND.slate[1], BRAND.slate[2]);
        doc.text(sanitizeForPdf(String(row.test || '')).slice(0, 34), ML + 5, y + 4);
        doc.text(sanitizeForPdf(String(row.value ?? '')), ML + 5 + colW[0] + colW[1], y + 4, { align: 'right' });
        doc.text(sanitizeForPdf(String(row.unit ?? '')), ML + 5 + colW[0] + colW[1] + colW[2], y + 4, { align: 'right' });
        const flag = String(row.flag || '');
        if (flag === 'H' || flag === 'L') {
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(flag === 'H' ? BRAND.red[0] : BRAND.blue[0], flag === 'H' ? BRAND.red[1] : BRAND.blue[1], flag === 'H' ? BRAND.red[2] : BRAND.blue[2]);
        }
        doc.text(flag, ML + 5 + colW[0] + colW[1] + colW[2] + colW[3] / 2, y + 4, { align: 'center' });
        if (flag === 'H' || flag === 'L') {
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(BRAND.slate[0], BRAND.slate[1], BRAND.slate[2]);
        }
        y += rowH;
      });
      y += 5;
    }
  };

  // ── Helper: add new page & track page number ──
  const addPage = () => {
    doc.addPage();
    pageNum++;
    y = MT;
  };

  // ── Helper: ensure enough vertical space, add page if needed ──
  const ensureSpace = (needed: number) => {
    if (y + needed > MAX_Y) {
      addPage();
    }
  };

  // ── Helper: draw a rounded rect ──
  const roundedRect = (x: number, ry: number, w: number, h: number, r: number, style: 'F' | 'S' | 'FD') => {
    if (typeof doc.roundedRect === 'function') {
      doc.roundedRect(x, ry, w, h, r, r, style);
    } else {
      // Fallback: use regular rect if roundedRect is not available
      doc.rect(x, ry, w, h, style);
    }
  };

  // ── Helper: draw a pill/badge ──
  const drawBadge = (x: number, by: number, label: string, bgColor: number[], textColor: number[]) => {
    const safeLabel = sanitizeForPdf(label || '');
    if (!safeLabel) return 0;
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    const tw = doc.getTextWidth(safeLabel) + 6;
    doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
    roundedRect(x, by, tw, 5.5, 1.5, 'F');
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text(safeLabel, x + tw / 2, by + 3.6, { align: 'center' });
    return tw;
  };

  // ── Helper: render structured lines (from HTML) with proper wrapping ──
  const renderStructuredContent = (html: string, fontSize: number, maxWidth: number): number => {
    const lines = htmlToStructuredLines(html);
    if (lines.length === 0) return 0;

    let totalHeight = 0;
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(BRAND.slate[0], BRAND.slate[1], BRAND.slate[2]);

    for (const line of lines) {
      const indent = line.indent;
      const effectiveWidth = maxWidth - indent;
      const wrappedLines = doc.splitTextToSize(line.text, effectiveWidth);
      const lineH = fontSize * 0.42; // line height in mm

      for (const wl of wrappedLines) {
        ensureSpace(lineH + 2);
        doc.text(wl, ML + 4 + indent, y + lineH + 0.5);
        y += lineH + 1.2;
        totalHeight += lineH + 1.2;
      }
      // Gap between logical lines
      y += 1.2;
      totalHeight += 1.2;
    }

    return totalHeight;
  };

  // ── Helper: render a section with colored header ──
  const renderSection = (label: string, color: number[], content: string) => {
    if (!content) return;
    const plainContent = stripHtml(content);
    if (!plainContent) return;

    // Estimate height needed for at least the header + a few lines
    ensureSpace(20);

    // Section header bar
    doc.setFillColor(color[0], color[1], color[2]);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    const lw = doc.getTextWidth(label) + 10;
    roundedRect(ML, y, lw, 6, 1.5, 'F');
    doc.setTextColor(BRAND.white[0], BRAND.white[1], BRAND.white[2]);
    doc.text(label, ML + 5, y + 4);
    y += 10;

    // Content - use slightly larger font and more width
    renderStructuredContent(content, 9.5, CW - 6);
    y += 4;
  };

  // ══════════════════════════════════════════
  // TITLE PAGE
  // ══════════════════════════════════════════

  // Full-page light green background
  doc.setFillColor(245, 251, 247);
  doc.rect(0, 0, PW, PH, 'F');

  // Green accent bar at top
  doc.setFillColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
  doc.rect(0, 0, PW, 4, 'F');

  // MedQ Logo
  y = 80;
  doc.setFontSize(48);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(BRAND.navy[0], BRAND.navy[1], BRAND.navy[2]);
  doc.text('Med', PW / 2 - 15, y, { align: 'center' });
  const medWidth = doc.getTextWidth('Med');
  doc.setTextColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
  doc.text('Q', PW / 2 - 15 + medWidth, y, { align: 'left' });

  // Tagline
  y += 12;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
  doc.text('Medical Question Bank', PW / 2, y, { align: 'center' });

  // Divider line
  y += 16;
  doc.setDrawColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
  doc.setLineWidth(0.8);
  doc.line(PW / 2 - 30, y, PW / 2 + 30, y);

  // Document info
  y += 16;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(BRAND.slate[0], BRAND.slate[1], BRAND.slate[2]);

  const infoLines = [
    `${questions.length} Question${questions.length !== 1 ? 's' : ''} Exported`,
    `Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
    `Time: ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
  ];

  // Count unique systems and topics
  const systems = new Set(questions.map(q => q.system).filter(Boolean));
  const topics = new Set(questions.map(q => q.topic).filter(Boolean));
  if (systems.size > 0) infoLines.push(`Systems: ${Array.from(systems).join(', ')}`);
  if (topics.size > 0) infoLines.push(`Topics: ${Array.from(topics).join(', ')}`);

  // Difficulty breakdown
  const easy = questions.filter(q => q.difficulty === 'Easy').length;
  const basic = questions.filter(q => q.difficulty === 'Basic').length;
  const moderate = questions.filter(q => q.difficulty === 'Moderate' || q.difficulty === 'Medium').length;
  const hard = questions.filter(q => q.difficulty === 'Hard').length;
  const expert = questions.filter(q => q.difficulty === 'Expert').length;
  if (questions.length > 1) {
    infoLines.push(`Difficulty: ${easy} Easy \u00B7 ${basic} Basic \u00B7 ${moderate} Moderate \u00B7 ${hard} Hard \u00B7 ${expert} Expert`);
  }

  // Type breakdown
  const mcq = questions.filter(q => q.type === 'mcq').length;
  const tf = questions.filter(q => q.type === 'tf').length;
  const sh = questions.filter(q => q.type === 'short').length;
  if (questions.length > 1) {
    infoLines.push(`Types: ${mcq} MCQ \u00B7 ${tf} True/False \u00B7 ${sh} Short Answer`);
  }

  infoLines.forEach((line) => {
    doc.text(line, PW / 2, y, { align: 'center' });
    y += 7;
  });

  // Footer on title page
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
  doc.text('Generated by MedQ \u2014 Medical Question Bank', PW / 2, PH - 15, { align: 'center' });

  // ══════════════════════════════════════════
  // QUESTION PAGES
  // ══════════════════════════════════════════

  for (let index = 0; index < questions.length; index++) {
    const q = questions[index];
    // Always start each question on a new page
    addPage();

    // Safe field access with fallbacks for null/undefined
    const qType = q.type || 'mcq';
    const qDifficulty = q.difficulty || 'Moderate';
    const qSystem = q.system || '';
    const qTopic = q.topic || '';
    const qAnswer = q.answer || '';
    const qExplanation = q.explanation || '';
    const qMnemonic = q.mnemonic || '';
    const qClinicalPearl = q.clinicalPearl || '';
    const qDistractorAnalysis = q.distractorAnalysis || '';
    const qTags = Array.isArray(q.tags) ? q.tags : [];
    const qOptions = Array.isArray(q.options) ? q.options : [];

    // ── Question header background bar ──
    doc.setFillColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
    doc.rect(ML - 2, y - 3, CW + 4, 9, 'F');

    // Q# in header
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(BRAND.white[0], BRAND.white[1], BRAND.white[2]);
    doc.text(`Question ${index + 1}`, ML + 3, y + 2.5);
    y += 10;

    // ── Badges row ──
    let bx = ML;

    // Type badge
    const typeLabel = qType === 'mcq' ? 'MCQ' : qType === 'tf' ? 'True/False' : 'Short Answer';
    const typeClr = qType === 'mcq' ? BRAND.green : qType === 'tf' ? BRAND.amber : BRAND.purple;
    bx += drawBadge(bx, y, typeLabel, typeClr, BRAND.white) + 2;

    // Difficulty badge
    const diffClr = qDifficulty === 'Easy' ? BRAND.green : qDifficulty === 'Basic' ? BRAND.green : (qDifficulty === 'Moderate' || qDifficulty === 'Medium') ? BRAND.amber : qDifficulty === 'Hard' ? BRAND.red : BRAND.red;
    bx += drawBadge(bx, y, qDifficulty, diffClr, BRAND.white) + 2;

    // System badge
    if (qSystem) {
      bx += drawBadge(bx, y, qSystem, BRAND.lightGray, BRAND.muted) + 2;
    }

    // Topic badge (if different from system)
    if (qTopic && qTopic !== qSystem) {
      bx += drawBadge(bx, y, qTopic, BRAND.lightGray, BRAND.muted) + 2;
    }

    // Tags
    qTags.slice(0, 4).forEach((tag) => {
      const safeTag = sanitizeForPdf(tag || '');
      if (!safeTag) return;
      const tw = doc.getTextWidth(safeTag) + 6;
      if (bx + tw > PW - MR) return;
      bx += drawBadge(bx, y, safeTag, [224, 242, 254], [3, 105, 161]) + 2;
    });

    y += 9;

    // Thin separator
    doc.setDrawColor(BRAND.border[0], BRAND.border[1], BRAND.border[2]);
    doc.setLineWidth(0.3);
    doc.line(ML, y, PW - MR, y);
    y += 5;

    // ── Question text ──
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(BRAND.navy[0], BRAND.navy[1], BRAND.navy[2]);
    const questionText = stripHtml(q.text || '');
    const qLines = doc.splitTextToSize(questionText, CW - 4);
    const qLineH = 5.5;
    const qHeight = qLines.length * qLineH;
    ensureSpace(qHeight + 4);
    doc.text(qLines, ML + 2, y);
    y += qHeight + 6;

    // ── Lab panel (agent questions with laboratory data) ──
    renderLabPanel((q as Question & { labPanel?: string }).labPanel);

    // ── Question image: ECG strip / radiology / illustration ──
    const isEcg = Boolean(q.imageUrl && q.imageUrl.startsWith('/generated/agent/ecg/'));
    if (q.imageUrl) {
      await embedQuestionImage(q.imageUrl, isEcg ? 'ECG — Lead II rhythm strip' : undefined);
    }

    // ── Offline media note (audio/3D model can't be printed) ──
    const mediaNotes: string[] = [];
    if (isEcg) mediaNotes.push('ECG rhythm strip shown above');
    if (q.audioUrl) mediaNotes.push('audio recording — play it in the app');
    if (q.modelUrl) mediaNotes.push('interactive 3D model — explore it in the app');
    if (q.videoUrl) mediaNotes.push('video — watch it in the app');
    if (mediaNotes.length) {
      ensureSpace(6);
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
      doc.text(`Media: ${mediaNotes.join(' · ')}`, ML + 2, y);
      y += 5;
    }

    // ── MCQ Options ──
    if (qType === 'mcq' && qOptions.length > 0) {
      const correctAnswer = stripHtml(qAnswer).toLowerCase().trim();

      qOptions.forEach((opt, i) => {
        const optText = stripHtml(opt || '');
        // Determine if this option is correct — compare text or letter match
        const isCorrect =
          optText.toLowerCase().trim() === correctAnswer ||
          `${LETTERS[i]}`.toLowerCase() === correctAnswer ||
          `${LETTERS[i]}. ${optText}`.toLowerCase().trim() === correctAnswer ||
          (correctAnswer.length <= 1 && LETTERS[i].toLowerCase() === correctAnswer);

        const optLabel = `${LETTERS[i]}.`;
        const fullOptText = `${optLabel} ${optText}`;
        const optLines = doc.splitTextToSize(fullOptText, CW - 14);
        const optLineH = 5;
        const optHeight = Math.max(optLines.length * optLineH + 6, 10);

        ensureSpace(optHeight + 3);

        // Background
        if (isCorrect) {
          doc.setFillColor(BRAND.lightGreen[0], BRAND.lightGreen[1], BRAND.lightGreen[2]);
          doc.setDrawColor(BRAND.greenBorder[0], BRAND.greenBorder[1], BRAND.greenBorder[2]);
        } else {
          doc.setFillColor(BRAND.lightGray[0], BRAND.lightGray[1], BRAND.lightGray[2]);
          doc.setDrawColor(BRAND.border[0], BRAND.border[1], BRAND.border[2]);
        }
        doc.setLineWidth(0.3);
        roundedRect(ML + 1, y, CW - 2, optHeight, 2, 'FD');

        // Option letter circle
        const circleR = 3.5;
        const circleX = ML + 7;
        const circleY = y + optHeight / 2;
        if (isCorrect) {
          doc.setFillColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
        } else {
          doc.setFillColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
        }
        doc.ellipse(circleX, circleY, circleR, circleR, 'F');
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(BRAND.white[0], BRAND.white[1], BRAND.white[2]);
        doc.text(LETTERS[i], circleX, circleY + 1, { align: 'center' });

        // Option text
        doc.setFontSize(10);
        doc.setFont('helvetica', isCorrect ? 'bold' : 'normal');
        doc.setTextColor(
          isCorrect ? BRAND.green[0] : BRAND.slate[0],
          isCorrect ? BRAND.green[1] : BRAND.slate[1],
          isCorrect ? BRAND.green[2] : BRAND.slate[2]
        );
        doc.text(optLines, ML + 14, y + 5.5);

        // Checkmark for correct (ASCII-safe [V] since Helvetica can't render Unicode checkmarks)
        if (isCorrect) {
          doc.setFontSize(10);
          doc.setTextColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
          doc.text('[V]', PW - MR - 10, y + optHeight / 2 + 1.5);
        }

        y += optHeight + 3;
      });
    }

    // ── True/False Options ──
    if (qType === 'tf') {
      ['True', 'False'].forEach((val) => {
        const isCorrect = val.toLowerCase() === qAnswer.toLowerCase();
        const optHeight = 10;

        ensureSpace(optHeight + 3);

        if (isCorrect) {
          doc.setFillColor(BRAND.lightGreen[0], BRAND.lightGreen[1], BRAND.lightGreen[2]);
          doc.setDrawColor(BRAND.greenBorder[0], BRAND.greenBorder[1], BRAND.greenBorder[2]);
        } else {
          doc.setFillColor(BRAND.lightGray[0], BRAND.lightGray[1], BRAND.lightGray[2]);
          doc.setDrawColor(BRAND.border[0], BRAND.border[1], BRAND.border[2]);
        }
        doc.setLineWidth(0.3);
        roundedRect(ML + 1, y, CW - 2, optHeight, 2, 'FD');

        // Letter circle
        const circleR = 3.5;
        const circleX = ML + 7;
        const circleY = y + optHeight / 2;
        if (isCorrect) {
          doc.setFillColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
        } else {
          doc.setFillColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
        }
        doc.ellipse(circleX, circleY, circleR, circleR, 'F');
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(BRAND.white[0], BRAND.white[1], BRAND.white[2]);
        doc.text(val === 'True' ? 'T' : 'F', circleX, circleY + 1, { align: 'center' });

        // Text
        doc.setFontSize(10.5);
        doc.setFont('helvetica', isCorrect ? 'bold' : 'normal');
        doc.setTextColor(
          isCorrect ? BRAND.green[0] : BRAND.slate[0],
          isCorrect ? BRAND.green[1] : BRAND.slate[1],
          isCorrect ? BRAND.green[2] : BRAND.slate[2]
        );
        doc.text(val, ML + 14, y + 6);

        // Checkmark for correct (ASCII-safe)
        if (isCorrect) {
          doc.setFontSize(10);
          doc.setTextColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
          doc.text('[V]', PW - MR - 10, y + 6);
        }

        y += optHeight + 3;
      });
    }

    // ── Short Answer ──
    if (qType === 'short') {
      const answerText = stripHtml(qAnswer);
      const answerLines = doc.splitTextToSize(answerText, CW - 10);
      const answerBoxH = Math.max(answerLines.length * 5 + 10, 14);
      ensureSpace(answerBoxH + 4);
      doc.setFillColor(BRAND.lightGreen[0], BRAND.lightGreen[1], BRAND.lightGreen[2]);
      doc.setDrawColor(BRAND.greenBorder[0], BRAND.greenBorder[1], BRAND.greenBorder[2]);
      doc.setLineWidth(0.3);
      roundedRect(ML + 1, y, CW - 2, answerBoxH, 2, 'FD');

      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
      doc.text('Expected Answer:', ML + 5, y + 5);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
      doc.text(answerLines, ML + 5, y + 10);
      y += answerBoxH + 4;
    }

    // ── Correct Answer Banner ──
    const answerBannerText = stripHtml(qAnswer);
    const answerBannerLines = doc.splitTextToSize(answerBannerText, CW - 14);
    const bannerH = Math.max(answerBannerLines.length * 5 + 8, 12);
    ensureSpace(bannerH + 4);
    // Green banner with left accent stripe
    doc.setFillColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
    doc.rect(ML, y, 3.5, bannerH, 'F');
    doc.setFillColor(BRAND.lightGreen[0], BRAND.lightGreen[1], BRAND.lightGreen[2]);
    doc.rect(ML + 3.5, y, CW - 3.5, bannerH, 'F');

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(BRAND.darkGreen[0], BRAND.darkGreen[1], BRAND.darkGreen[2]);
    doc.text('CORRECT ANSWER', ML + 8, y + 4);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
    doc.text(answerBannerLines, ML + 8, y + 8.5);
    y += bannerH + 4;

    // ── Explanation Section ──
    renderSection('EXPLANATION', BRAND.green, qExplanation);

    // ── Mnemonic Section ──
    renderSection('MNEMONIC', BRAND.purple, qMnemonic);

    // ── Clinical Pearl Section ──
    renderSection('CLINICAL PEARL', BRAND.darkGreen, qClinicalPearl);

    // ── Distractor Analysis Section ──
    renderSection('DISTRACTOR ANALYSIS', BRAND.amber, qDistractorAnalysis);

    // ── AI-generated note ──
    if (q.isAIGenerated) {
      ensureSpace(8);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
      doc.text('AI Generated', PW - MR, y, { align: 'right' });
      y += 5;
    }
  }

  // ══════════════════════════════════════════
  // FOOTER ON EVERY PAGE
  // ══════════════════════════════════════════
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Skip fancy footer on title page (already has one)
    if (i === 1) continue;

    // Thin line above footer
    doc.setDrawColor(BRAND.border[0], BRAND.border[1], BRAND.border[2]);
    doc.setLineWidth(0.3);
    doc.line(ML, PH - 14, PW - MR, PH - 14);

    // Footer text
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
    doc.text('MedQ \u2014 Medical Question Bank', ML, PH - 10);
    doc.text(`Page ${i - 1} of ${totalPages - 1}`, PW - MR, PH - 10, { align: 'right' });
  }

  // Save
  try {
    doc.save(pdfFilename);
  } catch (saveErr) {
    console.error('[MedQ PDF] Failed to save PDF:', saveErr);
    throw new Error('Failed to save PDF file. The document may be too large or your browser may have restricted downloads.');
  }
}

/**
 * Download a single question as PDF
 */
export async function downloadSingleQuestionPDF(question: Question) {
  await downloadAsPDF([question], `medq-${question.topic || 'question'}-${getTimestamp()}.pdf`);
}

/* ═══════════════════════════════════════════════════════════════
   REFERENCE SHEET — Compact 2-column cheat sheet PDF
   ═══════════════════════════════════════════════════════════════ */

/**
 * Get the first sentence from a text string (plain or HTML).
 */
function getFirstSentence(html: string): string {
  const plain = stripHtml(html);
  if (!plain) return '';
  // Match up to first period followed by space or end of string
  const match = plain.match(/^(.+?)(?:\.\s|\.$)/);
  if (match) return match[1] + '.';
  // If no period found, truncate to 120 chars
  return plain.length > 120 ? plain.slice(0, 117) + '...' : plain;
}

export async function downloadReferenceSheet(
  questions: Question[],
  groupBy: 'system' | 'topic' = 'system',
  filename?: string
): Promise<void> {
  const pdfFilename = filename || `medq-reference-sheet-${getTimestamp()}.pdf`;

  let jsPDFConstructor2: typeof import('jspdf').jsPDF;
  try {
    const jspdfModule = await import('jspdf');
    jsPDFConstructor2 = jspdfModule.jsPDF;
  } catch (importErr) {
    console.error('[MedQ PDF] Failed to import jsPDF for reference sheet:', importErr);
    throw new Error('PDF library failed to load. Please check your internet connection and try again.');
  }

  const doc = new jsPDFConstructor2({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const PW = 210;
  const PH = 297;
  const ML = 12;
  const MR = 12;
  const MT = 12;
  const MB = 16;
  const CW = PW - ML - MR;
  const MAX_Y = PH - MB;
  const COL_GAP = 5;
  const COL_W = (CW - COL_GAP) / 2;

  let y = MT;
  let pageNum = 1;
  let currentCol = 0; // 0 = left, 1 = right

  // ── Helper: safe roundedRect ──
  const safeRoundedRect = (
    x: number, ry: number, w: number, h: number, r: number, style: 'F' | 'S' | 'FD'
  ) => {
    if (typeof doc.roundedRect === 'function') {
      doc.roundedRect(x, ry, w, h, r, r, style);
    } else {
      doc.rect(x, ry, w, h, style);
    }
  };

  // ── Helper: safe ellipse (replaces doc.circle for jsPDF v4) ──
  const safeEllipse = (cx: number, cy: number, rx: number, ry: number, style: 'F' | 'S' | 'FD') => {
    if (typeof doc.ellipse === 'function') {
      doc.ellipse(cx, cy, rx, ry, style);
    }
  };

  // ── Helper: add new page ──
  const addPage = () => {
    doc.addPage();
    pageNum++;
    y = MT;
    currentCol = 0;
  };

  // ── Helper: get current column X offset ──
  const colX = () => ML + currentCol * (COL_W + COL_GAP);

  // ── Helper: ensure enough space, switch column or add page ──
  const ensureSpace = (needed: number) => {
    if (y + needed > MAX_Y) {
      if (currentCol === 0) {
        currentCol = 1;
        y = MT;
      } else {
        addPage();
      }
    }
  };

  // ══════════════════════════════════════════
  // TITLE PAGE
  // ══════════════════════════════════════════

  // Full-page light background
  doc.setFillColor(245, 251, 247);
  doc.rect(0, 0, PW, PH, 'F');

  // Green accent bar at top
  doc.setFillColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
  doc.rect(0, 0, PW, 5, 'F');

  // MedQ Logo
  y = 70;
  doc.setFontSize(42);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(BRAND.navy[0], BRAND.navy[1], BRAND.navy[2]);
  doc.text('Med', PW / 2 - 12, y, { align: 'center' });
  const medW = doc.getTextWidth('Med');
  doc.setTextColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
  doc.text('Q', PW / 2 - 12 + medW, y, { align: 'left' });

  // Title
  y += 14;
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(BRAND.navy[0], BRAND.navy[1], BRAND.navy[2]);
  doc.text('Reference Sheet', PW / 2, y, { align: 'center' });

  // Subtitle
  y += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
  doc.text('Compact Study Guide / Cheat Sheet', PW / 2, y, { align: 'center' });

  // Divider
  y += 14;
  doc.setDrawColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
  doc.setLineWidth(0.8);
  doc.line(PW / 2 - 35, y, PW / 2 + 35, y);

  // Document info
  y += 14;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(BRAND.slate[0], BRAND.slate[1], BRAND.slate[2]);

  const infoLines = [
    `${questions.length} Question${questions.length !== 1 ? 's' : ''} \u2022 Grouped by ${groupBy}`,
    `Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
  ];

  const systems = new Set(questions.map(q => q.system || 'Uncategorized'));
  const topics = new Set(questions.map(q => q.topic || 'General'));
  if (groupBy === 'system') {
    infoLines.push(`${systems.size} System${systems.size !== 1 ? 's' : ''}: ${Array.from(systems).slice(0, 6).join(', ')}${systems.size > 6 ? '...' : ''}`);
  } else {
    infoLines.push(`${topics.size} Topic${topics.size !== 1 ? 's' : ''}: ${Array.from(topics).slice(0, 5).join(', ')}${topics.size > 5 ? '...' : ''}`);
  }

  // Difficulty breakdown
  const easy = questions.filter(q => q.difficulty === 'Easy').length;
  const basic = questions.filter(q => q.difficulty === 'Basic').length;
  const moderate = questions.filter(q => q.difficulty === 'Moderate' || q.difficulty === 'Medium').length;
  const hard = questions.filter(q => q.difficulty === 'Hard').length;
  const expert = questions.filter(q => q.difficulty === 'Expert').length;
  infoLines.push(`Difficulty: ${easy} Easy \u00B7 ${basic} Basic \u00B7 ${moderate} Moderate \u00B7 ${hard} Hard \u00B7 ${expert} Expert`);

  infoLines.forEach((line) => {
    doc.text(line, PW / 2, y, { align: 'center' });
    y += 7;
  });

  // Print tips
  y += 12;
  doc.setFontSize(8);
  doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
  doc.text('\u2139\uFE0F  Print on A4 paper \u2022 Landscape recommended for more space \u2022 Green highlights = correct answers', PW / 2, y, { align: 'center' });

  // Footer on title page
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
  doc.text('Generated by MedQ \u2014 Medical Question Bank', PW / 2, PH - 12, { align: 'center' });

  // ══════════════════════════════════════════
  // GROUP QUESTIONS
  // ══════════════════════════════════════════

  const groups: Record<string, Question[]> = {};
  for (const q of questions) {
    const key = groupBy === 'system'
      ? (q.system || 'Uncategorized')
      : (q.topic || 'General');
    if (!groups[key]) groups[key] = [];
    groups[key].push(q);
  }

  // Sort group keys alphabetically
  const sortedGroupKeys = Object.keys(groups).sort();

  // Start content pages
  addPage();

  // ── Render a compact question card within current column ──
  const renderCompactCard = (q: Question, qIndex: number, x: number, width: number): number => {
    let cardY = y;
    let cardH = 0;

    // ── Question header ──
    doc.setFillColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
    doc.rect(x, cardY, width, 5.5, 'F');
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(BRAND.white[0], BRAND.white[1], BRAND.white[2]);
    doc.text(`Q${qIndex + 1}`, x + 2, cardY + 3.8);

    // Difficulty indicator
    const diffClr = q.difficulty === 'Easy' ? [34, 197, 94] as const : q.difficulty === 'Basic' ? [74, 222, 128] as const : (q.difficulty === 'Moderate' || q.difficulty === 'Medium') ? [245, 158, 11] as const : q.difficulty === 'Hard' ? [249, 115, 22] as const : [239, 68, 68] as const;
    doc.setFillColor(diffClr[0], diffClr[1], diffClr[2]);
    const diffW = doc.getTextWidth(q.difficulty) + 4;
    doc.rect(x + width - diffW - 1, cardY, diffW + 1, 5.5, 'F');
    doc.setFontSize(5.5);
    doc.text(q.difficulty, x + width - diffW / 2 - 0.5, cardY + 3.8, { align: 'center' });

    // Type badge
    const typeLabel = q.type === 'mcq' ? 'MCQ' : q.type === 'tf' ? 'T/F' : 'SA';
    const typeClr = q.type === 'mcq' ? BRAND.green : q.type === 'tf' ? BRAND.amber : BRAND.purple;
    doc.setFillColor(typeClr[0], typeClr[1], typeClr[2]);
    const typeW = doc.getTextWidth(typeLabel) + 4;
    doc.rect(x + 12, cardY, typeW + 1, 5.5, 'F');
    doc.text(typeLabel, x + 12 + typeW / 2, cardY + 3.8, { align: 'center' });

    cardY += 7;
    cardH += 7;

    // ── Question text (truncated to ~2 lines) ──
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(BRAND.navy[0], BRAND.navy[1], BRAND.navy[2]);
    const qText = stripHtml(q.text);
    const qLines = doc.splitTextToSize(qText, width - 4);
    // Limit to 2 lines
    const displayLines = qLines.slice(0, 2);
    const lineH = 3.3;
    for (const line of displayLines) {
      doc.text(line, x + 2, cardY + lineH);
      cardY += lineH + 0.5;
      cardH += lineH + 0.5;
    }
    if (qLines.length > 2) {
      doc.setFontSize(6);
      doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
      doc.text('...', x + width - 6, cardY);
    }
    cardY += 1.5;
    cardH += 1.5;

    // ── Correct answer (highlighted in green) ──
    doc.setFillColor(BRAND.lightGreen[0], BRAND.lightGreen[1], BRAND.lightGreen[2]);
    doc.setDrawColor(BRAND.greenBorder[0], BRAND.greenBorder[1], BRAND.greenBorder[2]);
    doc.setLineWidth(0.2);
    const answerText = stripHtml(q.answer);
    const ansLines = doc.splitTextToSize(`V ${answerText}`, width - 6);
    const ansH = Math.max(ansLines.length * 3 + 3, 5);
    safeRoundedRect(x + 1, cardY, width - 2, ansH, 1, 'FD');
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
    for (const al of ansLines) {
      doc.text(al, x + 3, cardY + 3);
      cardY += 3;
    }
    cardY += 2;
    cardH += ansH + 2;

    // ── Key point from explanation (first sentence) ──
    const keyPoint = getFirstSentence(q.explanation);
    if (keyPoint) {
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(BRAND.slate[0], BRAND.slate[1], BRAND.slate[2]);
      const kpLines = doc.splitTextToSize(keyPoint, width - 5);
      // Limit to 2 lines for compactness
      const kpDisplay = kpLines.slice(0, 2);
      for (const kp of kpDisplay) {
        doc.text(kp, x + 2, cardY + 2.5);
        cardY += 2.5;
        cardH += 2.5;
      }
      if (kpLines.length > 2) {
        doc.setFontSize(5.5);
        doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
        doc.text('...', x + width - 5, cardY);
      }
      cardY += 1;
      cardH += 1;
    }

    // ── Mnemonic (in purple box) ──
    const mnemonicText = stripHtml(q.mnemonic || '');
    if (mnemonicText) {
      const mnemLines = doc.splitTextToSize(mnemonicText, width - 8);
      const mnemH = Math.max(mnemLines.length * 2.5 + 4, 6);
      doc.setFillColor(245, 243, 255); // light purple bg
      doc.setDrawColor(BRAND.purple[0], BRAND.purple[1], BRAND.purple[2]);
      doc.setLineWidth(0.2);
      safeRoundedRect(x + 1, cardY, width - 2, mnemH, 1, 'FD');
      // Left accent stripe
      doc.setFillColor(BRAND.purple[0], BRAND.purple[1], BRAND.purple[2]);
      doc.rect(x + 1, cardY, 1.5, mnemH, 'F');
      doc.setFontSize(5.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(BRAND.purple[0], BRAND.purple[1], BRAND.purple[2]);
      doc.text('MNEMONIC', x + 4, cardY + 2.5);
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(BRAND.slate[0], BRAND.slate[1], BRAND.slate[2]);
      // Limit mnemonic display
      const mnemDisplay = mnemLines.slice(0, 2);
      let mnemY = cardY + 4.5;
      for (const ml of mnemDisplay) {
        doc.text(ml, x + 4, mnemY);
        mnemY += 2.5;
      }
      cardY += mnemH + 1.5;
      cardH += mnemH + 1.5;
    }

    // ── Clinical Pearl (in amber box) ──
    const pearlText = stripHtml(q.clinicalPearl || '');
    if (pearlText) {
      const pearlLines = doc.splitTextToSize(pearlText, width - 8);
      const pearlH = Math.max(pearlLines.length * 2.5 + 4, 6);
      doc.setFillColor(255, 251, 235); // light amber bg
      doc.setDrawColor(BRAND.amber[0], BRAND.amber[1], BRAND.amber[2]);
      doc.setLineWidth(0.2);
      safeRoundedRect(x + 1, cardY, width - 2, pearlH, 1, 'FD');
      // Left accent stripe
      doc.setFillColor(BRAND.amber[0], BRAND.amber[1], BRAND.amber[2]);
      doc.rect(x + 1, cardY, 1.5, pearlH, 'F');
      doc.setFontSize(5.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(BRAND.amber[0], BRAND.amber[1], BRAND.amber[2]);
      doc.text('CLINICAL PEARL', x + 4, cardY + 2.5);
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(BRAND.slate[0], BRAND.slate[1], BRAND.slate[2]);
      const pearlDisplay = pearlLines.slice(0, 2);
      let pearlY = cardY + 4.5;
      for (const pl of pearlDisplay) {
        doc.text(pl, x + 4, pearlY);
        pearlY += 2.5;
      }
      cardY += pearlH + 1.5;
      cardH += pearlH + 1.5;
    }

    // ── Bottom border line ──
    doc.setDrawColor(BRAND.border[0], BRAND.border[1], BRAND.border[2]);
    doc.setLineWidth(0.2);
    doc.line(x, cardY, x + width, cardY);
    cardH += 0.5;

    return cardH;
  };

  // ── Render a group header ──
  const renderGroupHeader = (groupName: string, count: number): number => {
    ensureSpace(18);

    const x = colX();

    // Group header background
    doc.setFillColor(BRAND.navy[0], BRAND.navy[1], BRAND.navy[2]);
    doc.rect(x, y, COL_W, 8, 'F');

    // Group icon (a small circle/dot)
    safeEllipse(x + 4, y + 4, 2, 2, 'F');
    doc.setFillColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
    safeEllipse(x + 4, y + 4, 1.5, 1.5, 'F');

    // Group name
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(BRAND.white[0], BRAND.white[1], BRAND.white[2]);
    doc.text(groupName, x + 8, y + 5.2);

    // Count badge
    const countText = `${count} Q`;
    doc.setFontSize(6);
    const countW = doc.getTextWidth(countText) + 4;
    doc.setFillColor(BRAND.green[0], BRAND.green[1], BRAND.green[2]);
    safeRoundedRect(x + COL_W - countW - 2, y + 1.5, countW, 5, 1.5, 'F');
    doc.setTextColor(BRAND.white[0], BRAND.white[1], BRAND.white[2]);
    doc.text(countText, x + COL_W - countW / 2 - 2, y + 4.5, { align: 'center' });

    y += 10;
    return 10;
  };

  // ══════════════════════════════════════════
  // RENDER ALL GROUPS
  // ══════════════════════════════════════════

  for (const groupKey of sortedGroupKeys) {
    const groupQuestions = groups[groupKey];

    // Render group header
    renderGroupHeader(groupKey, groupQuestions.length);

    // Render each question card in the group
    groupQuestions.forEach((q, idx) => {
      // Estimate card height (conservative)
      const estimatedH = 30 + (q.mnemonic ? 12 : 0) + (q.clinicalPearl ? 12 : 0);
      ensureSpace(Math.min(estimatedH, 50));

      const x = colX();
      const cardH = renderCompactCard(q, idx, x, COL_W);

      y += cardH + 2;
    });

    // Gap between groups
    y += 3;
  }

  // ══════════════════════════════════════════
  // FOOTER ON EVERY PAGE (except title)
  // ══════════════════════════════════════════
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Skip fancy footer on title page
    if (i === 1) continue;

    // Thin line above footer
    doc.setDrawColor(BRAND.border[0], BRAND.border[1], BRAND.border[2]);
    doc.setLineWidth(0.3);
    doc.line(ML, PH - 12, PW - MR, PH - 12);

    // Footer text
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(BRAND.muted[0], BRAND.muted[1], BRAND.muted[2]);
    doc.text('MedQ Reference Sheet \u2014 Medical Question Bank', ML, PH - 8);
    doc.text(`Page ${i - 1} of ${totalPages - 1}`, PW - MR, PH - 8, { align: 'right' });

    // Column divider line (subtle)
    if (i > 1) {
      doc.setDrawColor(BRAND.border[0], BRAND.border[1], BRAND.border[2]);
      doc.setLineWidth(0.15);
      doc.setLineDashPattern([1, 2], 0);
      doc.line(ML + COL_W + COL_GAP / 2, MT, ML + COL_W + COL_GAP / 2, PH - 14);
      doc.setLineDashPattern([], 0);
    }
  }

  // Save
  doc.save(pdfFilename);
}

/* ═══════════════════════════════════════════════════════════════
   HTML EXPORT — Standalone HTML with embedded styles
   ═══════════════════════════════════════════════════════════════ */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Export a single question as a standalone HTML file.
 * - All CSS styles embedded inline
 * - Includes MedQ branding (header + footer)
 * - Embeds AI illustration image if available (as base64 data URL)
 * - Renders question text, options, answer, explanation, mnemonic, clinical pearl, distractor analysis
 */
export async function exportAsHtml(question: Question & { illustrationDescription?: string; imageUrl?: string }) {
  const LETTERS_ARR = ['A', 'B', 'C', 'D'];

  // Fetch the AI illustration as base64 if it's a server URL
  let embeddedImageSrc = '';
  if (question.imageUrl) {
    if (question.imageUrl.startsWith('data:')) {
      embeddedImageSrc = question.imageUrl;
    } else {
      try {
        const imgRes = await fetch(question.imageUrl);
        if (imgRes.ok) {
          const imgBlob = await imgRes.blob();
          const imgBase64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(imgBlob);
          });
          embeddedImageSrc = imgBase64;
        }
      } catch {
        // If we can't fetch the image, just use the URL
        embeddedImageSrc = question.imageUrl;
      }
    }
  }

  // Build options HTML
  let optionsHtml = '';
  if (question.type === 'mcq' && question.options.length > 0) {
    optionsHtml = `<div class="options-list">${question.options.map((opt, i) => {
      const isCorrect = stripHtml(opt).toLowerCase().trim() === stripHtml(question.answer).toLowerCase().trim();
      return `<div class="option-item ${isCorrect ? 'option-correct' : ''}">
        <span class="option-letter">${LETTERS_ARR[i]}</span>
        <span class="option-text">${opt}</span>
        ${isCorrect ? '<span class="option-check">&#10003;</span>' : ''}
      </div>`;
    }).join('')}</div>`;
  } else if (question.type === 'tf') {
    optionsHtml = `<div class="options-list tf-list">
      ${['True', 'False'].map(val => {
        const isCorrect = val.toLowerCase() === question.answer.toLowerCase();
        return `<div class="option-item ${isCorrect ? 'option-correct' : ''}">
          <span class="option-letter">${val[0]}</span>
          <span class="option-text">${val}</span>
          ${isCorrect ? '<span class="option-check">&#10003;</span>' : ''}
        </div>`;
      }).join('')}
    </div>`;
  }

  // Build AI illustration HTML
  let illustrationHtml = '';
  if (embeddedImageSrc) {
    illustrationHtml = `<div class="ai-illustration">
      <img src="${embeddedImageSrc}" alt="AI-generated medical illustration" />
    </div>`;
  }

  // Build section HTML helper
  const sectionHtml = (icon: string, title: string, content: string, color: string): string => {
    if (!content) return '';
    const plainCheck = stripHtml(content);
    if (!plainCheck) return '';
    return `<div class="section">
      <div class="section-header">
        <span class="section-icon" style="background:${color}">${icon}</span>
        <h3 class="section-title">${escapeHtml(title)}</h3>
      </div>
      <div class="section-content medq-html-preview">${content}</div>
    </div>`;
  };

  const typeLabel = question.type === 'mcq' ? 'MCQ' : question.type === 'tf' ? 'True/False' : 'Short Answer';
  const diffColor = question.difficulty === 'Easy' ? '#22c55e' : question.difficulty === 'Basic' ? '#4ade80' : (question.difficulty === 'Moderate' || question.difficulty === 'Medium') ? '#f59e0b' : question.difficulty === 'Hard' ? '#f97316' : '#ef4444';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MedQ - ${escapeHtml(question.topic || 'Question')}</title>
  <style>
    /* ─── Reset & Base ─── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0c0e14;
      color: #e8ecf4;
      font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      line-height: 1.7;
      min-height: 100vh;
    }

    /* ─── Layout ─── */
    .container {
      max-width: 860px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* ─── Header ─── */
    .header {
      text-align: center;
      padding: 40px 0 24px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      margin-bottom: 32px;
    }
    .header-logo {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }
    .header-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #00e5a0, #00b87a);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      box-shadow: 0 4px 16px rgba(0,229,160,0.25);
    }
    .header h1 {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .header h1 .accent { color: #00e5a0; }
    .header-subtitle {
      font-size: 13px;
      color: #5a6478;
      margin-top: 4px;
    }

    /* ─── Question Card ─── */
    .question-card {
      background: #151821;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0,0,0,0.15);
    }

    /* ─── Badges ─── */
    .badges {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px 24px 0;
      flex-wrap: wrap;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 12px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .badge-type { background: rgba(0,229,160,0.1); color: #00e5a0; }
    .badge-difficulty { background: ${diffColor}18; color: ${diffColor}; }
    .badge-system { background: rgba(255,255,255,0.04); color: #5a6478; border: 1px solid rgba(255,255,255,0.06); }
    .badge-topic { background: rgba(79,195,247,0.08); color: #4fc3f7; }
    .badge-ai { background: rgba(179,136,255,0.08); color: #b388ff; }

    /* ─── Question Text ─── */
    .question-text {
      padding: 16px 24px 12px;
      font-size: 15px;
      line-height: 1.7;
      color: #e8ecf4;
    }

    /* ─── Options ─── */
    .options-list {
      padding: 0 24px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .tf-list { flex-direction: row; gap: 10px; }
    .tf-list .option-item { flex: 1; justify-content: center; text-align: center; }
    .option-item {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 18px;
      background: #1a1e2b;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 12px;
      transition: all 0.2s;
    }
    .option-correct {
      background: rgba(0,229,160,0.06) !important;
      border-color: rgba(0,229,160,0.3) !important;
    }
    .option-letter {
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      border-radius: 9px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
      color: #5a6478;
    }
    .option-correct .option-letter {
      background: #00e5a0 !important;
      border-color: #00e5a0 !important;
      color: #0c0e14 !important;
    }
    .option-text {
      font-size: 14px;
      color: #c8d0e0;
      line-height: 1.5;
    }
    .option-correct .option-text { color: #00e5a0; font-weight: 600; }
    .option-check { color: #00e5a0; font-size: 16px; margin-left: auto; font-weight: 700; }

    /* ─── AI Illustration ─── */
    .ai-illustration {
      padding: 0 24px 16px;
    }
    .ai-illustration img {
      width: 100%;
      max-width: 100%;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.08);
      object-fit: contain;
      max-height: 400px;
    }

    /* ─── Answer Banner ─── */
    .correct-banner {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      margin: 0 24px 22px;
      border-radius: 12px;
      background: rgba(0,229,160,0.06);
      border: 1px solid rgba(0,229,160,0.2);
      font-size: 15px;
      font-weight: 600;
      color: #00e5a0;
    }
    .correct-banner svg { flex-shrink: 0; }

    /* ─── Sections ─── */
    .sections {
      padding: 24px;
      border-top: 1px solid rgba(255,255,255,0.05);
      background: linear-gradient(180deg, rgba(0,229,160,0.02), transparent 40%);
    }
    .section { margin-bottom: 24px; }
    .section:last-child { margin-bottom: 0; }
    .section-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
    }
    .section-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      flex-shrink: 0;
    }
    .section-title {
      font-size: 15px;
      font-weight: 700;
      color: #e8ecf4;
      letter-spacing: 0.3px;
    }
    .section-content {
      color: #b8c2d4;
      font-size: 14px;
      line-height: 1.75;
      word-break: break-word;
    }
    .section-content strong { color: #e8ecf4; font-weight: 700; }
    .section-content em { color: #8b95a8; font-style: italic; }
    .section-content ul, .section-content ol { padding-left: 20px; margin: 8px 0; }
    .section-content li { margin: 4px 0; }
    .section-content p { margin: 8px 0; }

    /* ─── MedQ HTML Preview Classes ─── */
    .medq-html-preview .q-hl { background: rgba(0,229,160,0.14); color: #00e5a0; padding: 2px 9px; border-radius: 6px; font-weight: 600; white-space: nowrap; border: 1px solid rgba(0,229,160,0.15); }
    .medq-html-preview .q-hl-red { background: rgba(255,87,87,0.14); color: #ff5757; padding: 2px 9px; border-radius: 6px; font-weight: 600; white-space: nowrap; border: 1px solid rgba(255,87,87,0.15); }
    .medq-html-preview .q-hl-green { background: rgba(34,197,94,0.14); color: #22c55e; padding: 2px 9px; border-radius: 6px; font-weight: 600; white-space: nowrap; border: 1px solid rgba(34,197,94,0.15); }
    .medq-html-preview .q-hl-amber { background: rgba(255,179,71,0.14); color: #ffb347; padding: 2px 9px; border-radius: 6px; font-weight: 600; white-space: nowrap; border: 1px solid rgba(255,179,71,0.15); }
    .medq-html-preview .q-hl-purple { background: rgba(179,136,255,0.14); color: #b388ff; padding: 2px 9px; border-radius: 6px; font-weight: 600; white-space: nowrap; border: 1px solid rgba(179,136,255,0.15); }

    .medq-html-preview .q-callout { padding: 16px 20px; border-radius: 0 14px 14px 0; border-left: 4px solid; margin: 14px 0; font-size: 13.5px; line-height: 1.75; color: #b8c2d4; }
    .medq-html-preview .q-callout strong { font-weight: 700; }
    .medq-html-preview .q-callout-blue { background: rgba(79,195,247,0.06); border-left-color: #4fc3f7; }
    .medq-html-preview .q-callout-blue strong { color: #4fc3f7; }
    .medq-html-preview .q-callout-green { background: rgba(34,197,94,0.06); border-left-color: #22c55e; }
    .medq-html-preview .q-callout-green strong { color: #22c55e; }
    .medq-html-preview .q-callout-red { background: rgba(255,87,87,0.06); border-left-color: #ff5757; }
    .medq-html-preview .q-callout-red strong { color: #ff5757; }
    .medq-html-preview .q-callout-amber { background: rgba(255,179,71,0.06); border-left-color: #ffb347; }
    .medq-html-preview .q-callout-amber strong { color: #ffb347; }
    .medq-html-preview .q-callout-purple { background: rgba(179,136,255,0.06); border-left-color: #b388ff; }
    .medq-html-preview .q-callout-purple strong { color: #b388ff; }

    .medq-html-preview .q-flow { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 18px; background: rgba(255,255,255,0.02); border-radius: 14px; border: 1px solid rgba(255,255,255,0.05); margin: 14px 0; }
    .medq-html-preview .q-node { display: inline-flex; align-items: center; padding: 9px 16px; border-radius: 10px; font-size: 12px; font-weight: 700; white-space: nowrap; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); color: #8b95a8; }
    .medq-html-preview .q-node-red { background: rgba(255,87,87,0.1); border-color: rgba(255,87,87,0.25); color: #ff5757; }
    .medq-html-preview .q-node-green { background: rgba(34,197,94,0.1); border-color: rgba(34,197,94,0.25); color: #22c55e; }
    .medq-html-preview .q-node-blue { background: rgba(79,195,247,0.1); border-color: rgba(79,195,247,0.25); color: #4fc3f7; }
    .medq-html-preview .q-node-purple { background: rgba(179,136,255,0.1); border-color: rgba(179,136,255,0.25); color: #b388ff; }
    .medq-html-preview .q-node-orange { background: rgba(255,179,71,0.1); border-color: rgba(255,179,71,0.25); color: #ffb347; }
    .medq-html-preview .q-node-blocked { background: rgba(255,255,255,0.03); border: 2px dashed rgba(255,87,87,0.35); color: #5a6478; text-decoration: line-through; opacity: 0.7; }
    .medq-html-preview .q-arrow { font-size: 16px; font-weight: 700; color: #3a4055; flex-shrink: 0; }

    .medq-html-preview .q-mnemo { display: flex; align-items: flex-start; gap: 12px; flex-wrap: wrap; justify-content: center; padding: 24px; background: rgba(255,255,255,0.025); border-radius: 16px; border: 1px solid rgba(255,255,255,0.06); margin: 14px 0; }
    .medq-html-preview .q-letter { width: 50px; height: 50px; border-radius: 13px; display: flex; align-items: center; justify-content: center; font-size: 21px; font-weight: 900; color: #fff; flex-shrink: 0; }
    .medq-html-preview .q-letter-text { font-size: 11px; font-weight: 600; color: #5a6478; text-align: center; max-width: 60px; line-height: 1.4; margin-top: 6px; }

    .medq-html-preview .q-card { padding: 15px 17px; border-radius: 12px; border-left: 4px solid; margin: 8px 0; font-size: 13px; line-height: 1.7; color: #b8c2d4; }
    .medq-html-preview .q-card strong { font-weight: 700; }
    .medq-html-preview .q-card-blue { background: rgba(79,195,247,0.04); border-left-color: rgba(79,195,247,0.4); }
    .medq-html-preview .q-card-blue strong { color: #4fc3f7; }
    .medq-html-preview .q-card-red { background: rgba(255,87,87,0.04); border-left-color: rgba(255,87,87,0.4); }
    .medq-html-preview .q-card-red strong { color: #ff5757; }
    .medq-html-preview .q-card-green { background: rgba(34,197,94,0.04); border-left-color: rgba(34,197,94,0.4); }
    .medq-html-preview .q-card-green strong { color: #22c55e; }
    .medq-html-preview .q-card-orange { background: rgba(255,179,71,0.04); border-left-color: rgba(255,179,71,0.4); }
    .medq-html-preview .q-card-orange strong { color: #ffb347; }
    .medq-html-preview .q-card-purple { background: rgba(179,136,255,0.04); border-left-color: rgba(179,136,255,0.4); }
    .medq-html-preview .q-card-purple strong { color: #b388ff; }
    .medq-html-preview .q-card-correct { background: rgba(0,229,160,0.06); border-left-color: #00e5a0; }
    .medq-html-preview .q-card-correct strong { color: #00e5a0; }

    .medq-html-preview .q-grid { display: grid; gap: 10px; margin: 12px 0; }
    .medq-html-preview .q-grid-2 { grid-template-columns: 1fr 1fr; }
    .medq-html-preview .q-grid-3 { grid-template-columns: 1fr 1fr 1fr; }

    .medq-html-preview .q-list { list-style: none; padding: 0; margin: 12px 0; }
    .medq-html-preview .q-list li { position: relative; padding: 8px 0 8px 24px; font-size: 13.5px; line-height: 1.65; color: #b8c2d4; border-bottom: 1px solid rgba(255,255,255,0.03); }
    .medq-html-preview .q-list li:last-child { border-bottom: none; }
    .medq-html-preview .q-list li::before { content: '\\2192'; position: absolute; left: 4px; color: #00e5a0; font-weight: 700; font-size: 12px; }

    .medq-html-preview .q-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; letter-spacing: 0.3px; white-space: nowrap; }
    .medq-html-preview .q-badge-blue { background: rgba(79,195,247,0.1); color: #4fc3f7; }
    .medq-html-preview .q-badge-red { background: rgba(255,87,87,0.1); color: #ff5757; }
    .medq-html-preview .q-badge-green { background: rgba(34,197,94,0.1); color: #22c55e; }
    .medq-html-preview .q-badge-amber { background: rgba(255,179,71,0.1); color: #ffb347; }
    .medq-html-preview .q-badge-purple { background: rgba(179,136,255,0.1); color: #b388ff; }

    .medq-html-preview .q-label { display: inline-flex; align-items: center; gap: 6px; padding: 5px 14px; border-radius: 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 16px 0 6px; }
    .medq-html-preview .q-label-blue { background: rgba(79,195,247,0.08); color: #4fc3f7; }
    .medq-html-preview .q-label-red { background: rgba(255,87,87,0.08); color: #ff5757; }
    .medq-html-preview .q-label-green { background: rgba(34,197,94,0.08); color: #22c55e; }
    .medq-html-preview .q-label-amber { background: rgba(255,179,71,0.08); color: #ffb347; }
    .medq-html-preview .q-label-purple { background: rgba(179,136,255,0.08); color: #b388ff; }

    .medq-html-preview .q-svg { margin: 14px 0; padding: 16px; background: rgba(255,255,255,0.015); border-radius: 14px; border: 1px solid rgba(255,255,255,0.04); overflow-x: auto; text-align: center; }
    .medq-html-preview .q-svg svg { max-width: 100%; height: auto; }

    .medq-html-preview .q-compare { width: 100%; border-collapse: separate; border-spacing: 0; margin: 14px 0; font-size: 13px; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06); }
    .medq-html-preview .q-compare-head { background: rgba(255,255,255,0.04); }
    .medq-html-preview .q-compare-head .q-compare-cell { padding: 10px 14px; font-weight: 700; color: #8b95a8; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .medq-html-preview .q-compare-row:hover { background: rgba(255,255,255,0.02); }
    .medq-html-preview .q-compare-cell { padding: 10px 14px; color: #b8c2d4; border-bottom: 1px solid rgba(255,255,255,0.03); vertical-align: top; }

    .medq-html-preview .q-table { width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; margin: 10px 0; font-size: 12.5px; }
    .medq-html-preview .q-table thead th { background: linear-gradient(135deg, #1e3a5f, #2c6fbb); color: #fff; padding: 11px 14px; font-weight: 700; text-align: left; font-size: 11.5px; letter-spacing: 0.5px; }
    .medq-html-preview .q-table tbody td { padding: 10px 14px; background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.04); font-weight: 500; color: #b8c2d4; }
    .medq-html-preview .q-table tbody tr:last-child td { border-bottom: none; }

    .medq-html-preview .q-timeline { position: relative; padding-left: 28px; margin: 12px 0; }
    .medq-html-preview .q-timeline::before { content: ''; position: absolute; left: 10px; top: 4px; bottom: 4px; width: 3px; background: linear-gradient(180deg, #22c55e, #ffb347, #ff5757); border-radius: 2px; }
    .medq-html-preview .q-timeline-item { position: relative; padding: 10px 14px; margin-bottom: 8px; background: rgba(255,255,255,0.02); border-radius: 10px; border: 1px solid rgba(255,255,255,0.04); font-size: 13px; font-weight: 500; color: #b8c2d4; line-height: 1.7; }
    .medq-html-preview .q-timeline-item strong { color: #e8ecf4; }

    .medq-html-preview .q-kv { display: flex; gap: 8px; padding: 6px 0; font-size: 13px; }
    .medq-html-preview .q-kv-key { color: #5a6478; font-weight: 600; min-width: 100px; }
    .medq-html-preview .q-kv-val { color: #b8c2d4; }

    /* ─── Footer ─── */
    .footer {
      text-align: center;
      padding: 24px 0 32px;
      margin-top: 40px;
      border-top: 1px solid rgba(255,255,255,0.05);
    }
    .footer-text {
      font-size: 12px;
      color: #3a4055;
    }
    .footer-meta {
      font-size: 10px;
      color: #3a4055;
      margin-top: 6px;
    }

    /* ─── Responsive ─── */
    @media (max-width: 640px) {
      .container { padding: 0 16px; }
      .header h1 { font-size: 24px; }
      .badges { padding: 12px 16px 0; }
      .question-text { padding: 12px 16px 8px; }
      .options-list { padding: 0 16px 12px; }
      .correct-banner { margin: 0 16px 16px; }
      .sections { padding: 16px; }
      .medq-html-preview .q-grid-2,
      .medq-html-preview .q-grid-3 { grid-template-columns: 1fr; }
      .medq-html-preview .q-flow { gap: 4px; padding: 12px; }
      .medq-html-preview .q-node { padding: 6px 10px; font-size: 11px; }
      .medq-html-preview .q-mnemo { padding: 16px; gap: 8px; }
      .medq-html-preview .q-letter { width: 40px; height: 40px; font-size: 17px; }
      .tf-list { flex-direction: column !important; }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <header class="header">
      <div class="header-logo">
        <div class="header-icon">&#129658;</div>
        <h1>Med<span class="accent">Q</span></h1>
      </div>
      <p class="header-subtitle">Medical Question Bank</p>
    </header>

    <!-- Question Card -->
    <article class="question-card">
      <!-- Badges -->
      <div class="badges">
        <span class="badge badge-type">${escapeHtml(typeLabel)}</span>
        <span class="badge badge-difficulty">${escapeHtml(question.difficulty)}</span>
        <span class="badge badge-system">${escapeHtml(question.system)}</span>
        ${question.topic && question.topic !== question.system ? `<span class="badge badge-topic">${escapeHtml(question.topic)}</span>` : ''}
        ${question.tags.slice(0, 3).map(t => `<span class="badge badge-topic">${escapeHtml(t)}</span>`).join('')}
        ${question.isAIGenerated ? '<span class="badge badge-ai">&#10024; AI</span>' : ''}
      </div>

      <!-- Question Text -->
      <div class="question-text medq-html-preview">${question.text}</div>

      <!-- AI Illustration -->
      ${illustrationHtml}

      <!-- Options -->
      ${optionsHtml}

      <!-- Short Answer -->
      ${question.type === 'short' ? `<div class="correct-banner">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#00e5a0" fill-opacity="0.15"/><path d="M6 10.5L8.5 13L14 7" stroke="#00e5a0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span>Expected Answer: <strong>${question.answer}</strong></span>
      </div>` : ''}

      <!-- Correct Answer Banner -->
      ${question.type !== 'short' ? `<div class="correct-banner">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#00e5a0" fill-opacity="0.15"/><path d="M6 10.5L8.5 13L14 7" stroke="#00e5a0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span>Correct Answer: <strong>${question.answer}</strong></span>
      </div>` : ''}

      <!-- Sections -->
      <div class="sections">
        ${sectionHtml('&#129504;', 'Explanation', question.explanation, 'rgba(79,195,247,0.1)')}
        ${sectionHtml('&#128161;', 'Mnemonic', question.mnemonic, 'rgba(179,136,255,0.1)')}
        ${sectionHtml('&#127919;', 'Clinical Pearl', question.clinicalPearl, 'rgba(255,179,71,0.1)')}
        ${sectionHtml('&#128269;', 'Distractor Analysis', question.distractorAnalysis, 'rgba(249,115,22,0.1)')}
      </div>
    </article>

    <!-- Footer -->
    <footer class="footer">
      <p class="footer-text">MedQ &mdash; Medical Question Bank &middot; Powered by AI</p>
      <p class="footer-meta">Exported on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
    </footer>
  </div>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  triggerDownload(blob, `medq-${question.topic || 'question'}-${getTimestamp()}.html`);
}
