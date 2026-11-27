import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import type { MedQToolContext } from '../types';
import { saveBinaryArtifact } from '../artifacts/binary';
import { createLogger } from '../../logger';

const log = createLogger('AgentOffice');

/**
 * Office document tools — Word, Excel, PowerPoint.
 *
 * Ported from the reference Deep Agent platform's create_docx / create_xlsx /
 * create_pptx tools, reimplemented with pure-JS libraries (docx / exceljs /
 * pptxgenjs) so no python runtime is needed. All outputs are durable binary
 * artifacts (public/generated + DB row) with preview and download in chat.
 */

interface ArtifactInfo {
  id: string;
  name: string;
  downloadUrl: string;
  url: string;
  mimeType: string;
  kind: string;
  sizeBytes: number;
}

function finish(artifact: ArtifactInfo, filename: string) {
  return JSON.stringify({
    created: true,
    artifact: {
      id: artifact.id,
      name: artifact.name,
      filename,
      downloadUrl: artifact.downloadUrl,
      previewUrl: artifact.url,
      // Task 6: office files get an inline PDF preview via LibreOffice
      pdfPreviewUrl: `/api/medq-agent/artifacts/${artifact.id}/pdf`,
      mimeType: artifact.mimeType,
      kind: artifact.kind,
    },
    note: 'File saved. Reference it in your final answer with the download link.',
  });
}

function fail(error: unknown) {
  return JSON.stringify({ created: false, error: error instanceof Error ? error.message : String(error) });
}

function slugBase(title: string, filename?: string): string {
  const base = (filename ?? title).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').slice(0, 60);
  return base || 'document';
}

// ─── Markdown-lite line model shared by word + pptx text ─────────────────
//
// Supported markdown extensions beyond the original h1/h2/h3/bullet/numbered/
// para set:
//
//   > ⚠️ Caution: <text>     → red callout box (clinical safety / contraindication)
//   > 💡 Pearl: <text>       → green callout box (high-yield exam pearl)
//   > 📌 Note: <text>        → blue callout box (general note / clarification)
//   > 🎯 Key Point: <text>   → purple callout box (must-remember takeaway)
//   > ⚡ Warning: <text>     → orange callout box (severe side-effect / red flag)
//   > 📚 Reference: <text>   → gray callout box (citation / source attribution)
//   ![caption](url)          → embedded image (downloaded + cached locally)
//   **bold** inline          → bold text run (preserved, not stripped)
//   *italic* inline          → italic text run (preserved, not stripped)
//
// The callout syntax is intentionally markdown-blockquote-compatible so the
// same content renders readably as plain markdown too (the callout emoji +
// prefix survives as plain text). This keeps the tool's output portable: a
// user who downloads the .docx sees colored boxes; a user who reads the raw
// markdown sees "> ⚠️ Caution: …".

type CalloutKind = 'caution' | 'pearl' | 'note' | 'key' | 'warning' | 'reference';

interface CalloutStyle {
  /** Label prefix shown in bold inside the callout, e.g. "⚠️ Caution". */
  label: string;
  /** Hex fill color (no #) for the paragraph shading. */
  fill: string;
  /** Hex color (no #) for the label text run. */
  color: string;
}

const CALLOUT_STYLES: Record<CalloutKind, CalloutStyle> = {
  caution:   { label: '⚠️ Caution',    fill: 'FEE2E2', color: 'B91C1C' }, // red
  pearl:     { label: '💡 Pearl',       fill: 'DCFCE7', color: '15803D' }, // green
  note:      { label: '📌 Note',       fill: 'DBEAFE', color: '1D4ED8' }, // blue
  key:       { label: '🎯 Key Point',  fill: 'F3E8FF', color: '7C3AED' }, // purple
  warning:   { label: '⚡ Warning',    fill: 'FFEDD5', color: 'C2410C' }, // orange
  reference: { label: '📚 Reference',  fill: 'F1F5F9', color: '475569' }, // gray
};

/** Detect a callout line: "> ⚠️ Caution: text" → { kind: 'caution', text }. */
function matchCallout(line: string): { kind: CalloutKind; text: string } | null {
  const m = line.match(/^>\s*(⚠️|💡|📌|🎯|⚡|📚)\s*(Caution|Pearl|Note|Key\s*Point|Warning|Reference)\s*[:：]\s*(.*)$/i);
  if (!m) return null;
  const emoji = m[1];
  const kind: CalloutKind =
    emoji === '⚠️' ? 'caution' :
    emoji === '💡' ? 'pearl' :
    emoji === '📌' ? 'note' :
    emoji === '🎯' ? 'key' :
    emoji === '⚡' ? 'warning' :
    'reference';
  return { kind, text: m[3].trim() };
}

type Line =
  | { kind: 'h1' | 'h2' | 'h3'; text: string }
  | { kind: 'bullet'; text: string }
  | { kind: 'numbered'; text: string }
  | { kind: 'para'; text: string }
  | { kind: 'callout'; callout: CalloutKind; text: string }
  | { kind: 'image'; caption: string; url: string };

function parseMarkdownLines(content: string): Line[] {
  const lines: Line[] = [];
  for (const raw of content.split('\n')) {
    const line = raw.trimEnd();
    if (!line.trim()) continue;
    // Callout: "> ⚠️ Caution: text" — checked BEFORE the heading match so
    // the leading ">" isn't mistaken for anything else.
    const callout = matchCallout(line);
    if (callout) {
      lines.push({ kind: 'callout', callout: callout.kind, text: callout.text });
      continue;
    }
    // Image: ![caption](url)
    const img = line.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/);
    if (img) {
      lines.push({ kind: 'image', caption: img[1], url: img[2] });
      continue;
    }
    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      const level = (['h1', 'h2', 'h3'] as const)[h[1].length - 1];
      lines.push({ kind: level, text: h[2] });
      continue;
    }
    const bullet = line.match(/^[-*+]\s+(.*)$/);
    if (bullet) {
      lines.push({ kind: 'bullet', text: bullet[1] });
      continue;
    }
    const num = line.match(/^(\d+)[.)]\s+(.*)$/);
    if (num) {
      lines.push({ kind: 'numbered', text: num[2] });
      continue;
    }
    lines.push({ kind: 'para', text: line });
  }
  return lines;
}

/** Parse a paragraph/bullet/numbered text into styled runs (bold / italic).
 *  The markdown `**bold**` and `*italic*` syntax is preserved as actual
 *  run-level formatting instead of being stripped (the old behavior lost
 *  all emphasis and produced flat text). */
function parseInlineRuns(text: string): Array<{ text: string; bold?: boolean; italic?: boolean }> {
  // Tokenize on `**bold**` and `*italic*` markers. The regex captures the
  // delimiter so we know which style to apply to the matched segment.
  // Uses [\s\S] instead of the `s` flag (ES2018+) so this compiles under the
  // project's ES2017 target.
  const tokens: Array<{ text: string; bold?: boolean; italic?: boolean }> = [];
  let remaining = text;
  while (remaining.length > 0) {
    // **bold** (must come before *italic* so the longer marker wins)
    const boldMatch = remaining.match(/^([\s\S]*?)\*\*([^*]+)\*\*([\s\S]*)$/);
    if (boldMatch) {
      if (boldMatch[1]) tokens.push({ text: boldMatch[1] });
      tokens.push({ text: boldMatch[2], bold: true });
      remaining = boldMatch[3];
      continue;
    }
    // *italic* (single asterisks — must NOT match the ** already consumed)
    const italicMatch = remaining.match(/^([\s\S]*?)\*([^*]+)\*([\s\S]*)$/);
    if (italicMatch) {
      if (italicMatch[1]) tokens.push({ text: italicMatch[1] });
      tokens.push({ text: italicMatch[2], italic: true });
      remaining = italicMatch[3];
      continue;
    }
    tokens.push({ text: remaining });
    break;
  }
  return tokens;
}

/** Download an image URL to a Buffer for embedding in a .docx. Returns null
 *  on any failure (the doc continues without the image — a broken image
 *  link should never abort the whole document). Supports http(s) URLs and
 *  attachment:// refs (resolved through the registry). */
async function fetchImageBuffer(url: string): Promise<{ buffer: Buffer; mimeType: string } | null> {
  try {
    let resolvedUrl = url;
    if (url.startsWith('attachment://')) {
      const { resolveAttachmentInput } = await import('../attachment-registry');
      try {
        resolvedUrl = resolveAttachmentInput(url, 'image');
      } catch {
        return null;
      }
    }
    if (resolvedUrl.startsWith('data:')) {
      const m = /^data:([^;,]+)(?:;base64)?,([\s\S]*)$/.exec(resolvedUrl);
      if (!m) return null;
      return { buffer: Buffer.from(m[2], 'base64'), mimeType: m[1] };
    }
    if (!/^https?:\/\//i.test(resolvedUrl)) return null;
    const r = await fetch(resolvedUrl, { signal: AbortSignal.timeout(8_000) });
    if (!r.ok) return null;
    const mimeType = (r.headers.get('content-type') || 'image/jpeg').split(';')[0];
    if (!mimeType.startsWith('image/')) return null;
    const buf = Buffer.from(await r.arrayBuffer());
    // Cap at 6 MB to keep the .docx from ballooning on huge atlases.
    if (buf.length > 6 * 1024 * 1024) return null;
    return { buffer: buf, mimeType };
  } catch {
    return null;
  }
}

// ─── Word (.docx) ─────────────────────────────────────────────────────────

export function createWordDocumentTool(ctx: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'create_word_document',
    description:
      'Create a PROFESSIONAL Word document (.docx) from rich markdown content. Supports: ## H1/H2/H3 headings, - bullets, 1. numbered items, paragraphs, **bold** and *italic* inline runs, colored callout boxes (> ⚠️ Caution: / > 💡 Pearl: / > 📌 Note: / > 🎯 Key Point: / > ⚡ Warning: / > 📚 Reference:) for clinical safety highlights and high-yield pearls, and embedded images (![caption](https://url)) from search_medical_images results, generate_medical_illustration outputs, or attachment:// refs. Use for study guides, lecture notes, SOAP note templates, and handouts the user will edit or print — the rich formatting (callouts + images + highlights) makes it suitable for distribution to peers or patients.',
    schema: z.object({
      title: z.string().min(3).max(120).describe('Document title shown as the heading'),
      content: z.string().min(20).max(100_000).describe(
        'Full document content as rich markdown. Supported:\n' +
        '  ## headings, ### sub-headings\n' +
        '  - bullet points, 1. numbered items\n' +
        '  paragraphs (with **bold** and *italic* inline)\n' +
        '  > ⚠️ Caution: <text> (red box — contraindications, severe ADRs)\n' +
        '  > 💡 Pearl: <text> (green box — high-yield exam pearl)\n' +
        '  > 📌 Note: <text> (blue box — general note)\n' +
        '  > 🎯 Key Point: <text> (purple box — must-remember takeaway)\n' +
        '  > ⚡ Warning: <text> (orange box — red-flag symptom)\n' +
        '  > 📚 Reference: <text> (gray box — citation)\n' +
        '  ![caption](https://image-url) — embedded image with caption\n' +
        'Use callouts sparingly (1–3 per page) for emphasis. Use images from search_medical_images or generate_medical_illustration results.'
      ),
      filename: z.string().max(80).optional().describe('File base name, default derived from title'),
    }),
    func: async ({ title, content, filename }) => {
      try {
        const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, ImageRun, ShadingType, BorderStyle } = await import('docx');
        const children: Array<InstanceType<typeof Paragraph>> = [
          new Paragraph({
            text: title,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: '' }),
        ];
        const lines = parseMarkdownLines(content);
        // Track images we couldn't fetch so we can note them at the end
        // (silent in the doc itself — the user sees the rest of the content
        // without interruption from broken links).
        const brokenImages: string[] = [];
        for (const line of lines) {
          switch (line.kind) {
            case 'h1':
              children.push(new Paragraph({ text: line.text, heading: HeadingLevel.HEADING_1 }));
              break;
            case 'h2':
              children.push(new Paragraph({ text: line.text, heading: HeadingLevel.HEADING_2 }));
              break;
            case 'h3':
              children.push(new Paragraph({ text: line.text, heading: HeadingLevel.HEADING_3 }));
              break;
            case 'bullet':
              children.push(new Paragraph({
                bullet: { level: 0 },
                children: parseInlineRuns(line.text).map((r) =>
                  new TextRun({ text: r.text, bold: r.bold, italics: r.italic }),
                ),
              }));
              break;
            case 'numbered':
              children.push(new Paragraph({
                numbering: undefined,
                style: 'ListParagraph',
                children: parseInlineRuns(line.text).map((r) =>
                  new TextRun({ text: r.text, bold: r.bold, italics: r.italic }),
                ),
              }));
              break;
            case 'callout': {
              // Render the callout as a single shaded paragraph with a
              // colored bold label run + the body text. The shading is the
              // visual cue (red/green/blue/purple/orange/gray); the colored
              // label text makes the callout type obvious even when printed
              // in grayscale.
              const style = CALLOUT_STYLES[line.callout];
              children.push(new Paragraph({
                shading: { type: ShadingType.SOLID, color: 'auto', fill: style.fill },
                border: {
                  left: { style: BorderStyle.SINGLE, size: 18, color: style.color, space: 8 },
                  top: { style: BorderStyle.SINGLE, size: 4, color: style.color, space: 4 },
                  bottom: { style: BorderStyle.SINGLE, size: 4, color: style.color, space: 4 },
                  right: { style: BorderStyle.SINGLE, size: 4, color: style.color, space: 4 },
                },
                spacing: { before: 120, after: 120 },
                children: [
                  new TextRun({ text: `${style.label}: `, bold: true, color: style.color, size: 22 }),
                  ...parseInlineRuns(line.text).map((r) =>
                    new TextRun({ text: r.text, bold: r.bold || false, italics: r.italic, size: 22 }),
                  ),
                ],
              }));
              break;
            }
            case 'image': {
              // Try to fetch + embed the image. On any failure, render the
              // caption as an italic gray note + record the URL for an
              // end-of-doc "images that couldn't be loaded" appendix so
              // the user knows something was supposed to be there.
              const fetched = await fetchImageBuffer(line.url);
              if (fetched) {
                try {
                  // Scale: target max width = 600px (Word's default page width
                  // minus margins leaves ~600 device-independent pixels at 96
                  // dpi). Height auto-scales to preserve aspect ratio — for
                  // PNG/JPEG we don't have easy dimension sniffing without a
                  // separate library, so we use a 4:3 default and let Word
                  // re-flow if needed.
                  const targetWidth = 540;
                  const targetHeight = 405;
                  children.push(new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 120, after: 60 },
                    children: [
                      new ImageRun({
                        data: fetched.buffer,
                        transformation: { width: targetWidth, height: targetHeight },
                        type: fetched.mimeType.includes('png') ? 'png' : 'jpg',
                      } as ConstructorParameters<typeof ImageRun>[0]),
                    ],
                  }));
                  if (line.caption) {
                    children.push(new Paragraph({
                      alignment: AlignmentType.CENTER,
                      spacing: { after: 200 },
                      children: [new TextRun({ text: line.caption, italics: true, size: 18, color: '5A6178' })],
                    }));
                  }
                } catch (imgErr) {
                  brokenImages.push(line.url);
                  children.push(new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 60, after: 60 },
                    children: [new TextRun({ text: `[Image failed to embed: ${line.caption || line.url}]`, italics: true, color: 'B91C1C', size: 18 })],
                  }));
                }
              } else {
                brokenImages.push(line.url);
                children.push(new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 60, after: 60 },
                  children: [new TextRun({ text: `[Image could not be loaded: ${line.caption || line.url}]`, italics: true, color: 'B91C1C', size: 18 })],
                }));
              }
              break;
            }
            default: // 'para'
              children.push(new Paragraph({
                children: parseInlineRuns(line.text).map((r) =>
                  new TextRun({ text: r.text, bold: r.bold, italics: r.italic }),
                ),
              }));
          }
        }
        // If any images failed to load, add a footnote-style appendix so
        // the user knows there were images that didn't make it.
        if (brokenImages.length > 0) {
          children.push(new Paragraph({ text: '' }));
          children.push(new Paragraph({
            children: [new TextRun({ text: `${brokenImages.length} image(s) could not be loaded. URLs:`, italics: true, size: 16, color: '5A6178' })],
          }));
          for (const url of brokenImages.slice(0, 10)) {
            children.push(new Paragraph({
              children: [new TextRun({ text: `  • ${url}`, italics: true, size: 16, color: '5A6178' })],
            }));
          }
        }
        const doc = new Document({
          styles: {
            default: {
              document: { run: { font: 'Calibri', size: 22 } },
            },
          },
          sections: [{ children }],
        });
        const buffer = Buffer.from(await Packer.toBuffer(doc));
        const artifact = await saveBinaryArtifact({
          userId: ctx.userId,
          name: slugBase(title, filename),
          kind: 'office',
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          buffer,
          meta: { title, format: 'docx' },
        });
        return finish(artifact, `${slugBase(title, filename)}.docx`);
      } catch (error) {
        log.warn?.('create_word_document failed:', error);
        return fail(error);
      }
    },
  });
}

// ─── Excel (.xlsx) ────────────────────────────────────────────────────────

export function createSpreadsheetTool(ctx: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'create_spreadsheet',
    description:
      'Create a styled Excel workbook (.xlsx) from JSON row data (e.g. lab reference ranges, drug lists, study schedules). Headers come from the first row\'s keys; alternating row shading and auto-sized columns are applied automatically.',
    schema: z.object({
      title: z.string().min(3).max(120).describe('Workbook/sheet title'),
      data: z.string().min(10).max(200_000).describe('JSON array of row objects, e.g. [{"parameter":"Na+","range":"135-145","unit":"mmol/L"}]'),
      sheetName: z.string().max(30).optional().describe('Sheet name, default derived from title'),
      filename: z.string().max(80).optional().describe('File base name, default derived from title'),
    }),
    func: async ({ title, data, sheetName, filename }) => {
      try {
        let rows: Array<Record<string, unknown>>;
        try {
          const parsed = JSON.parse(data);
          if (!Array.isArray(parsed) || parsed.length === 0 || typeof parsed[0] !== 'object') {
            throw new Error('data must be a JSON array of objects');
          }
          rows = parsed;
        } catch (parseError) {
          return fail(parseError instanceof Error ? `Invalid data: ${parseError.message}` : parseError);
        }
        const ExcelJS = await import('exceljs');
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet((sheetName ?? title).slice(0, 30).replace(/[\\/*?:[\]]/g, ' '));
        const headers = [...new Set(rows.flatMap((row) => Object.keys(row)))];
        sheet.addRow(headers);
        for (const row of rows) sheet.addRow(headers.map((header) => row[header] ?? ''));

        // Teal MedQ-style header + zebra stripes + auto column width.
        const headerRow = sheet.getRow(1);
        headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0E7C66' } };
        headerRow.alignment = { vertical: 'middle' };
        for (let i = 2; i <= rows.length + 1; i += 1) {
          const row = sheet.getRow(i);
          if (i % 2 === 0) {
            row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF8F5' } };
          }
        }
        headers.forEach((header, index) => {
          const column = sheet.getColumn(index + 1);
          const width = Math.max(
            header.length,
            ...rows.map((row) => String(row[header] ?? '').length),
          );
          column.width = Math.min(Math.max(width + 3, 10), 42);
        });
        const buffer = Buffer.from(await workbook.xlsx.writeBuffer());
        const artifact = await saveBinaryArtifact({
          userId: ctx.userId,
          name: slugBase(title, filename),
          kind: 'office',
          mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          buffer,
          meta: { title, format: 'xlsx', rows: rows.length },
        });
        return finish(artifact, `${slugBase(title, filename)}.xlsx`);
      } catch (error) {
        log.warn?.('create_spreadsheet failed:', error);
        return fail(error);
      }
    },
  });
}

// ─── PowerPoint (.pptx) ───────────────────────────────────────────────────

export function createPresentationTool(ctx: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'create_presentation',
    description:
      'Create a PowerPoint deck (.pptx) from a slides array. Each slide: {title, content, subtitle?, image?, imageCaption?}. Content supports ## heading / - bullet / plain lines. Optional `image` is a URL or /generated/... path embedded on the slide. Use for lecture decks, case presentations, and revision slides.',
    schema: z.object({
      title: z.string().min(3).max(120).describe('Deck title (shown on the first slide)'),
      slides: z.string().min(10).max(200_000).describe('JSON array of slides: [{"title":"...","content":"## heading\\n- point","subtitle":"...","image":"/generated/x.png or https://...","imageCaption":"..."}]'),
      filename: z.string().max(80).optional().describe('File base name, default derived from title'),
    }),
    func: async ({ title, slides, filename }) => {
      try {
        let parsedSlides: Array<{ title?: string; content?: string; subtitle?: string; image?: string; imageCaption?: string }>;
        try {
          const parsed = JSON.parse(slides);
          if (!Array.isArray(parsed) || parsed.length === 0) throw new Error('slides must be a non-empty JSON array');
          parsedSlides = parsed;
        } catch (parseError) {
          return fail(parseError instanceof Error ? `Invalid slides: ${parseError.message}` : parseError);
        }
        const PptxGenJS = (await import('pptxgenjs')).default;
        const pptx = new PptxGenJS();
        pptx.layout = 'LAYOUT_16x9';
        pptx.title = title;

        // MedQ dark theme
        const BG = '0D1117';
        const CARD = '161B22';
        const ACCENT = '00E5A0';
        const TEXT = 'E8ECF4';
        const MUTED = '9CA3B8';

        // Fetch image → Buffer (supports http(s) URLs and local /generated paths).
        async function fetchImage(src: string): Promise<{ data: Buffer; ext: 'png' | 'jpg' | 'gif' | 'svg' } | null> {
          try {
            if (src.startsWith('data:image/')) {
              const m = src.match(/^data:image\/(\w+);base64,(.+)$/);
              if (!m) return null;
              const ext = (m[1] === 'jpeg' ? 'jpg' : m[1]) as 'png' | 'jpg' | 'gif' | 'svg';
              return { data: Buffer.from(m[2], 'base64'), ext };
            }
            if (src.startsWith('http://') || src.startsWith('https://')) {
              const proto = src.startsWith('https') ? await import('https') : await import('http');
              const buf = await new Promise<Buffer>((resolve, reject) => {
                const req = proto.get(src, (res) => {
                  if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    req.destroy();
                    fetchImage(res.headers.location).then((r) => resolve(r ? r.data : Buffer.alloc(0))).catch(reject);
                    return;
                  }
                  const chunks: Buffer[] = [];
                  res.on('data', (c) => chunks.push(c));
                  res.on('end', () => resolve(Buffer.concat(chunks)));
                  res.on('error', reject);
                });
                req.on('error', reject);
                req.setTimeout(15000, () => { req.destroy(); reject(new Error('image fetch timeout')); });
              });
              if (!buf.length) return null;
              const ext = src.match(/\.(png|jpe?g|gif|svg)(\?|#|$)/i)?.[1].toLowerCase().replace('jpeg', 'jpg') as any;
              return { data: buf, ext: ext || 'png' };
            }
            // Local path under /public
            const fs = await import('node:fs');
            const path = await import('node:path');
            const cwd = process.cwd();
            const localPath = src.startsWith('/') ? path.join(cwd, 'public', src) : path.join(cwd, 'public', src);
            if (!fs.existsSync(localPath)) return null;
            const data = fs.readFileSync(localPath);
            const ext = path.extname(localPath).slice(1).toLowerCase().replace('jpeg', 'jpg') as any;
            return { data, ext: ext || 'png' };
          } catch {
            return null;
          }
        }

        // Title slide
        const cover = pptx.addSlide();
        cover.background = { color: BG };
        cover.addText(title, {
          x: 0.6, y: 2.2, w: 8.8, h: 1.2,
          fontSize: 34, bold: true, color: TEXT, align: 'center',
        });
        cover.addText(`MedQ Agent · ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, {
          x: 0.6, y: 3.5, w: 8.8, h: 0.5,
          fontSize: 14, color: MUTED, align: 'center',
        });
        cover.addShape(pptx.ShapeType.rect, { x: 4.4, y: 3.3, w: 1.2, h: 0.045, fill: { color: ACCENT } });

        for (const slideSpec of parsedSlides.slice(0, 30)) {
          const slide = pptx.addSlide();
          slide.background = { color: BG };
          const slideTitle = slideSpec.title ?? 'Slide';
          slide.addText(slideTitle, {
            x: 0.55, y: 0.4, w: 8.9, h: 0.75,
            fontSize: 22, bold: true, color: ACCENT,
          });
          if (slideSpec.subtitle) {
            slide.addText(slideSpec.subtitle, {
              x: 0.55, y: 1.1, w: 8.9, h: 0.4,
              fontSize: 13, italic: true, color: MUTED,
            });
          }
          const hasImage = typeof slideSpec.image === 'string' && slideSpec.image.trim();
          const textW = hasImage ? 5.4 : 8.9;
          const textX = 0.55;
          const lines = parseMarkdownLines(slideSpec.content ?? '');
          // Filter to text-bearing line kinds (the parser now also emits
          // 'callout' and 'image' lines, which PPTX slides don't render as
          // plain text — they'd need their own slide-type-specific handling.
          // For now, only the headline/bullet/numbered/para lines appear
          // on slides; callouts and images are silently dropped, matching
          // the prior behavior where they didn't exist.)
          const textBlocks = lines
            .filter((line): line is { kind: 'h1' | 'h2' | 'h3' | 'bullet' | 'numbered' | 'para'; text: string } =>
              line.kind === 'h1' || line.kind === 'h2' || line.kind === 'h3' ||
              line.kind === 'bullet' || line.kind === 'numbered' || line.kind === 'para')
            .map((line) => ({
              text: line.text,
              options: {
                bullet: line.kind === 'bullet' || line.kind === 'numbered',
                indentLevel: line.kind === 'h2' || line.kind === 'h3' ? 0 : 1,
                bold: line.kind === 'h1' || line.kind === 'h2' || line.kind === 'h3',
                color: line.kind === 'h1' || line.kind === 'h2' || line.kind === 'h3' ? TEXT : MUTED,
                breakLine: true,
              },
            }));
          if (textBlocks.length > 0) {
            slide.addText(textBlocks, {
              x: textX, y: 1.6, w: textW, h: 3.6,
              fontSize: 14, color: MUTED, valign: 'top',
            });
          }
          if (hasImage) {
            const imgResult = await fetchImage(slideSpec.image!.trim());
            if (imgResult) {
              try {
                // Image panel on the right; cover ~3.4in wide × 3in tall, aspect-preserved.
                slide.addImage({
                  data: `image/${imgResult.ext === 'jpg' ? 'jpeg' : imgResult.ext};base64,${imgResult.data.toString('base64')}`,
                  x: 6.2, y: 1.6, w: 3.2, h: 3.0,
                  sizing: { type: 'contain', w: 3.2, h: 3.0 },
                });
                if (slideSpec.imageCaption) {
                  slide.addText(slideSpec.imageCaption, {
                    x: 6.2, y: 4.65, w: 3.2, h: 0.4,
                    fontSize: 10, italic: true, color: MUTED, align: 'center',
                  });
                }
              } catch (imgErr) {
                log.warn?.('pptx image embed failed:', imgErr);
              }
            }
          }
        }

        const buffer = Buffer.from(await pptx.write({ outputType: 'nodebuffer' }) as ArrayBufferLike);
        const artifact = await saveBinaryArtifact({
          userId: ctx.userId,
          name: slugBase(title, filename),
          kind: 'office',
          mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          buffer,
          meta: { title, format: 'pptx', slides: parsedSlides.length },
        });
        return finish(artifact, `${slugBase(title, filename)}.pptx`);
      } catch (error) {
        log.warn?.('create_presentation failed:', error);
        return fail(error);
      }
    },
  });
}
