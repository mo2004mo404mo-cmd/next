import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import type { MedQToolContext } from '../types';
import { createArtifact } from '../artifacts/service';

/**
 * generate_document — publication-quality deliverables as artifacts.
 *
 * Ported from the reference deep-agent-platform `tools/documents/document-tool.ts`
 * (markdown → styled standalone HTML + downloadable file). This port targets
 * the packages MedQ already ships: HTML documents are self-contained styled
 * pages, and PDF study sheets are produced with jspdf (already a dependency).
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Minimal markdown-subset → standalone styled HTML (port of P2's renderer). */
export function markdownToHtml(title: string, markdown: string): string {
  const bodyLines = markdown.split('\n');
  const html: string[] = [];
  let inList = false;
  let inCode = false;
  const closeList = () => {
    if (inList) {
      html.push('</ul>');
      inList = false;
    }
  };
  for (const rawLine of bodyLines) {
    const line = rawLine.trimEnd();
    if (line.startsWith('```')) {
      closeList();
      html.push(inCode ? '</code></pre>' : '<pre><code>');
      inCode = !inCode;
      continue;
    }
    if (inCode) {
      html.push(escapeHtml(rawLine));
      continue;
    }
    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      closeList();
      const level = Math.min(heading[1].length + 1, 5);
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      continue;
    }
    const bullet = line.match(/^[-*+]\s+(.*)$/);
    if (bullet) {
      if (!inList) {
        html.push('<ul>');
        inList = true;
      }
      html.push(`<li>${renderInline(bullet[1])}</li>`);
      continue;
    }
    const tableRow = line.match(/^\|(.+)\|$/);
    if (tableRow) {
      closeList();
      if (/^[\s|:-]+$/.test(line)) continue; // separator row
      const cells = tableRow[1].split('|').map((cell) => `<td>${renderInline(cell.trim())}</td>`);
      html.push(`<tr>${cells.join('')}</tr>`);
      continue;
    }
    if (!line.trim()) {
      closeList();
      continue;
    }
    closeList();
    html.push(`<p>${renderInline(line)}</p>`);
  }
  closeList();
  if (inCode) html.push('</code></pre>');

  return [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    `<title>${escapeHtml(title)}</title>`,
    '<style>',
    'body{font-family:Georgia,"Times New Roman",serif;max-width:820px;margin:40px auto;padding:0 24px;line-height:1.65;color:#1a2332;}',
    'h1{font-size:1.9em;border-bottom:2px solid #0e7c66;padding-bottom:8px;color:#0e5c4a;}',
    'h2{font-size:1.45em;color:#0e5c4a;margin-top:1.6em;}h3{font-size:1.2em;margin-top:1.4em;}',
    'ul{padding-left:22px;}li{margin:4px 0;}',
    'table{border-collapse:collapse;width:100%;margin:1em 0;}td{border:1px solid #cfd8dc;padding:6px 10px;}tr:first-child td{background:#e8f5f1;font-weight:bold;}',
    'pre{background:#0d1117;color:#e6edf3;padding:14px;border-radius:8px;overflow-x:auto;}code{font-family:ui-monospace,monospace;}',
    'strong{color:#0b4f43;}blockquote{border-left:4px solid #0e7c66;margin:1em 0;padding:4px 18px;background:#f2faf8;color:#33534b;}',
    '</style>',
    '</head>',
    '<body>',
    `<h1>${escapeHtml(title)}</h1>`,
    ...html,
    '</body>',
    '</html>',
  ].join('\n');
}

function renderInline(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2">$1</a>');
}

/** Markdown-subset → PDF via jspdf (MedQ's existing dependency). */
async function markdownToPdfBuffer(title: string, markdown: string): Promise<Buffer> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const writeWrapped = (text: string, fontSize: number, fontStyle: 'normal' | 'bold' | 'italic', color: [number, number, number], indent = 0) => {
    doc.setFont('helvetica', fontStyle);
    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, maxWidth - indent) as string[];
    for (const line of lines) {
      ensureSpace(fontSize * 1.45);
      doc.text(line, margin + indent, y);
      y += fontSize * 1.45;
    }
  };

  // Title
  writeWrapped(title, 20, 'bold', [14, 92, 74]);
  y += 6;
  doc.setDrawColor(14, 124, 102);
  doc.setLineWidth(2);
  doc.line(margin, y, pageWidth - margin, y);
  y += 16;

  let inCode = false;
  for (const rawLine of markdown.split('\n')) {
    const line = rawLine.trimEnd();
    if (line.startsWith('```')) {
      inCode = !inCode;
      y += 4;
      continue;
    }
    if (inCode) {
      writeWrapped(line, 9, 'normal', [80, 90, 100]);
      continue;
    }
    if (!line.trim()) {
      y += 7;
      continue;
    }
    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      y += 10;
      const size = [16, 13.5, 12, 11][Math.min(heading[1].length - 1, 3)];
      writeWrapped(heading[2].replace(/\*\*/g, ''), size, 'bold', [14, 92, 74]);
      y += 3;
      continue;
    }
    const bullet = line.match(/^[-*+]\s+(.*)$/);
    if (bullet) {
      ensureSpace(14);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.5);
      doc.setTextColor(14, 124, 102);
      doc.text('•', margin + 2, y);
      writeWrapped(bullet[1].replace(/\*\*/g, ''), 10.5, 'normal', [26, 35, 50], 16);
      continue;
    }
    const numbered = line.match(/^\d+[.)]\s+(.*)$/);
    if (numbered) {
      const num = line.match(/^(\d+)/)?.[1] ?? '1';
      writeWrapped(`${num}. ${numbered[1].replace(/\*\*/g, '')}`, 10.5, 'normal', [26, 35, 50], 14);
      continue;
    }
    const tableRow = line.match(/^\|(.+)\|$/);
    if (tableRow) {
      if (/^[\s|:-]+$/.test(line)) continue;
      const cells = tableRow[1].split('|').map((cell) => cell.trim().replace(/\*\*/g, ''));
      writeWrapped(cells.join('   |   '), 10, 'normal', [26, 35, 50]);
      continue;
    }
    writeWrapped(line.replace(/\*\*/g, '').replace(/[*`]/g, ''), 10.5, 'normal', [26, 35, 50]);
  }

  // Footer page numbers
  const pageCount = doc.getNumberOfPages();
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(130, 140, 150);
    doc.text(`MedQ Agent · ${title} · ${page}/${pageCount}`, margin, pageHeight - 20);
  }
  return Buffer.from(doc.output('arraybuffer'));
}

export function createDocumentTool(ctx: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'generate_document',
    description:
      'Generate a polished, downloadable document (study guide, cheat sheet, handout, report) from markdown content and save it as a durable artifact with preview + download. Formats: "html" (styled, opens in any browser/Word), "pdf" (formatted PDF), or "markdown" (source). Use for any substantial document deliverable; use create_artifact for raw data blocks.',
    schema: z.object({
      title: z.string().min(3).max(120).describe('Document title, e.g. "Heart Failure Cheat Sheet"'),
      content: z.string().min(30).max(100_000).describe('Full document content as markdown (headings, bullets, tables, bold)'),
      format: z.enum(['html', 'pdf', 'markdown']).optional().describe('Output format, default html'),
      filename: z.string().max(80).optional().describe('File base name, default derived from title'),
    }),
    func: async ({ title, content, format = 'html', filename }) => {
      try {
        const base = (filename ?? title).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').slice(0, 60) || 'document';
        if (format === 'markdown') {
          const artifact = await createArtifact({
            userId: ctx.userId,
            name: base,
            kind: 'markdown',
            content: `# ${title}\n\n${content}`,
            meta: { title, format },
          });
          return finish(artifact, `${base}.md`);
        }
        if (format === 'pdf') {
          const pdf = await markdownToPdfBuffer(title, content);
          // Store PDF bytes as base64 data via a public file (PDFs are binary)
          const { saveBinaryArtifact } = await import('../artifacts/binary');
          const artifact = await saveBinaryArtifact({
            userId: ctx.userId,
            name: base,
            kind: 'document',
            mimeType: 'application/pdf',
            buffer: pdf,
            meta: { title, format },
          });
          return finish(artifact, `${base}.pdf`);
        }
        const html = markdownToHtml(title, content);
        const artifact = await createArtifact({
          userId: ctx.userId,
          name: base,
          kind: 'html',
          content: html,
          meta: { title, format },
        });
        return finish(artifact, `${base}.html`);
      } catch (error) {
        return JSON.stringify({ created: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });
}

function finish(
  artifact: { id: string; name: string; kind: string; mimeType: string; sizeBytes: number; url?: string | null; downloadUrl: string },
  filename: string,
) {
  return JSON.stringify({
    created: true,
    artifact: {
      id: artifact.id,
      name: artifact.name,
      filename,
      downloadUrl: artifact.downloadUrl,
      // previewUrl: direct file URL for binaries (public/generated); inline
      // preview for text kinds appends ?inline=1 so iframes render instead
      // of download. pdfPreviewUrl: office conversions (no-op for real PDFs,
      // which preview directly).
      previewUrl: artifact.url
        ?? `${artifact.downloadUrl}?inline=1`,
      pdfPreviewUrl: `/api/medq-agent/artifacts/${artifact.id}/pdf`,
      mimeType: artifact.mimeType,
      kind: artifact.kind,
      sizeBytes: artifact.sizeBytes,
    },
    note: 'Document saved. A file card with preview + download is shown automatically — you may also reference the download link in your final answer.',
  });
}
