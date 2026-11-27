/**
 * server-file-extract.ts — Server-side file extraction (text + images).
 *
 * Mirrors src/lib/file-extract.ts (client-side) but runs entirely on the
 * server using Buffer APIs (no FileReader, no pdfjs worker, no browser
 * canvas). More reliable:
 *   - No browser OOM on large files (server has 4 GB)
 *   - No pdfjs worker version mismatch
 *   - No reload loss (file is uploaded directly to the server, parsed
 *     server-side, and immediately turned into a persisted extraction job)
 *
 * Supported: PDF, DOCX, PPTX, TXT, MD, CSV, JSON + standalone images.
 * Returns the same shape as the client's ExtractedContent so the existing
 * AI extraction route can consume it unchanged.
 */
import { Buffer } from 'node:buffer';

export interface ExtractedImage {
  /** base64 data URL — directly consumable by the VLM `image_url` block. */
  dataUrl: string;
  /** Source attribution ("Slide 3", "Page 5", "Image 2 in DOCX"). */
  caption: string;
}

export interface ExtractedContent {
  text: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  pageCount?: number;
  images?: ExtractedImage[];
}

const MAX_IMAGES = 24;
const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // skip images larger than 2 MB (VLM rejects)

function bufToDataUrl(buf: Buffer, mime: string): string {
  return `data:${mime};base64,${buf.toString('base64')}`;
}

function sniffImageMime(buf: Buffer): string | null {
  if (buf.length < 4) return null;
  // PNG: 89 50 4E 47
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'image/png';
  // JPEG: FF D8 FF
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg';
  // GIF: 47 49 46 38
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38) return 'image/gif';
  // WebP: 52 49 46 46 ... 57 45 42 50
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
      buf.length > 11 && buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) return 'image/webp';
  return null;
}

// ── PPTX ───────────────────────────────────────────────────────────────────

function pptxSlideText(xml: string): string {
  // Extract <a:t> text runs (same logic as client-side file-extract.ts)
  const parts: string[] = [];
  for (const m of xml.matchAll(/<a:t>([^<]*)<\/a:t>/g)) {
    if (m[1]) parts.push(m[1]);
  }
  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

async function extractPptx(buffer: Buffer): Promise<ExtractedContent> {
  const JSZip = (await import('jszip')).default;
  const zip = await JSZip.loadAsync(buffer);

  // Collect slide numbers
  const slideNums: number[] = [];
  zip.forEach((relPath) => {
    const m = relPath.match(/^ppt\/slides\/slide(\d+)\.xml$/);
    if (m) slideNums.push(Number(m[1]));
  });
  slideNums.sort((a, b) => a - b);
  if (slideNums.length === 0) throw new Error('PPTX contains no slides.');

  const parts: string[] = [];
  const images: ExtractedImage[] = [];

  for (const n of slideNums.slice(0, 200)) {
    const slideXml = (await zip.file(`ppt/slides/slide${n}.xml`)?.async('string')) || '';
    const slideText = pptxSlideText(slideXml);

    const notesXml = (await zip.file(`ppt/notesSlides/notesSlide${n}.xml`)?.async('string')) || '';
    const notes = pptxSlideText(notesXml).replace(/\n+/g, ' ').trim();

    // Embedded images for this slide via _rels
    const relsXml = (await zip.file(`ppt/slides/_rels/slide${n}.xml.rels`)?.async('string')) || '';
    let perSlide = 0;
    for (const tag of relsXml.matchAll(/<Relationship\b[^>]*>/g)) {
      const tagStr = tag[0];
      if (!/\/image"/.test(tagStr)) continue;
      const target = tagStr.match(/Target="([^"]+)"/)?.[1];
      if (!target) continue;
      const mediaPath = target.startsWith('/') ? target.slice(1) : target.replace(/^\.\.\//, 'ppt/');
      if (perSlide >= 2 || images.length >= MAX_IMAGES) break;
      const img = await zip.file(mediaPath)?.async('nodebuffer');
      if (!img || img.length < 4_000 || img.length > MAX_IMAGE_BYTES) continue;
      const mimeType = sniffImageMime(img);
      if (!mimeType) continue;
      images.push({
        dataUrl: bufToDataUrl(img, mimeType),
        caption: `Slide ${n}`,
      });
      perSlide++;
    }

    const block: string[] = [];
    if (slideText) block.push(slideText);
    if (notes) block.push(`Speaker notes: ${notes}`);
    parts.push(`── Slide ${n} ──\n${block.join('\n')}`);
  }

  const text = parts.join('\n\n');
  if (!text.trim() && images.length === 0) {
    throw new Error('PPTX contains no extractable slide text, notes, or images.');
  }
  return { text, fileName: '', fileType: 'pptx', fileSize: buffer.length, images };
}

// ── DOCX ──────────────────────────────────────────────────────────────────

async function extractDocx(buffer: Buffer): Promise<ExtractedContent> {
  const mammoth = await import('mammoth');
  const result = await mammoth.extractRawText({ buffer });
  const text = result.value || '';

  // Walk word/media/* for embedded images
  const JSZip = (await import('jszip')).default;
  const zip = await JSZip.loadAsync(buffer);
  const images: ExtractedImage[] = [];
  let imgIdx = 0;
  const mediaFiles = Object.keys(zip.files).filter((p) => /^word\/media\//.test(p));
  for (const mediaPath of mediaFiles) {
    if (images.length >= MAX_IMAGES) break;
    const img = await zip.file(mediaPath)?.async('nodebuffer');
    if (!img || img.length < 4_000 || img.length > MAX_IMAGE_BYTES) continue;
    const mimeType = sniffImageMime(img);
    if (!mimeType) continue;
    imgIdx++;
    images.push({
      dataUrl: bufToDataUrl(img, mimeType),
      caption: `Image ${imgIdx} in DOCX`,
    });
  }

  if (!text.trim() && images.length === 0) {
    throw new Error('DOCX contains no extractable text or images.');
  }
  return { text, fileName: '', fileType: 'docx', fileSize: buffer.length, images };
}

// ── PDF ───────────────────────────────────────────────────────────────────

async function extractPdf(buffer: Buffer): Promise<ExtractedContent> {
  // Use unpdf for text (same as the knowledge pipeline — server-proven)
  const { getDocumentProxy, extractText } = await import('unpdf');
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { text } = await extractText(pdf, { mergePages: true });

  // PDF page images: carve embedded JPEGs from the PDF stream (server-side,
  // no canvas needed). Reuses the knowledge pipeline's carvePdfJpegs.
  let images: ExtractedImage[] = [];
  try {
    const { carvePdfJpegs } = await import('@/lib/agent/knowledge/ingest-media');
    const jpegs = carvePdfJpegs(buffer, MAX_IMAGES);
    images = jpegs.map((buf, i) => ({
      dataUrl: bufToDataUrl(buf, 'image/jpeg'),
      caption: `Page ${i + 1}`,
    }));
  } catch {
    // carvePdfJpegs may fail on some PDFs — text-only extraction is fine
  }

  if (!text.trim() && images.length === 0) {
    throw new Error('PDF contains no extractable text or images.');
  }
  return {
    text: text || '',
    fileName: '',
    fileType: 'pdf',
    fileSize: buffer.length,
    pageCount: pdf.numPages,
    images,
  };
}

// ── Standalone image ───────────────────────────────────────────────────────

async function extractImageFile(buffer: Buffer, fileName: string): Promise<ExtractedContent> {
  const mimeType = sniffImageMime(buffer);
  if (!mimeType) throw new Error('Unrecognized image format (expected PNG, JPEG, GIF, or WebP).');
  return {
    text: `[Standalone image upload: ${fileName}. The AI will analyze this image directly.]`,
    fileName: '',
    fileType: mimeType.split('/')[1],
    fileSize: buffer.length,
    images: [{ dataUrl: bufToDataUrl(buffer, mimeType), caption: fileName }],
  };
}

// ── Master entry ───────────────────────────────────────────────────────────

export async function extractFromFileServer(
  buffer: Buffer,
  fileName: string,
): Promise<ExtractedContent> {
  const ext = (fileName.split('.').pop() ?? '').toLowerCase();
  let content: ExtractedContent;

  if (ext === 'pdf') {
    content = await extractPdf(buffer);
  } else if (ext === 'docx' || ext === 'doc') {
    content = await extractDocx(buffer);
  } else if (ext === 'pptx') {
    content = await extractPptx(buffer);
  } else if (ext === 'txt' || ext === 'md' || ext === 'markdown' || ext === 'csv' || ext === 'tsv' || ext === 'json') {
    const text = buffer.toString('utf8');
    content = { text, fileName: '', fileType: ext, fileSize: buffer.length };
  } else if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) {
    content = await extractImageFile(buffer, fileName);
  } else {
    throw new Error(
      `Unsupported file type ".${ext}". Supported: PDF, DOCX, PPTX, TXT, MD, CSV, JSON, PNG, JPG, GIF, WEBP.`,
    );
  }

  content.fileName = fileName;
  return content;
}
