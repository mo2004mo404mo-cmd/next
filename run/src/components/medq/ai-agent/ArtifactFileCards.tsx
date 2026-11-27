'use client';

// ─────────────────────────────────────────────────────────────────────────────
// ArtifactFileCards — file cards for everything the agent produced in a turn.
//
// Every artifact-producing tool (generate_document, create_word_document,
// create_spreadsheet, create_presentation, create_artifact, generate_chart,
// media tools…) returns `{ created: true, artifact: { id, name, downloadUrl… } }`.
// This component parses those results out of the turn's tool calls and
// renders one card per file BELOW the answer bubble — independent of whether
// the model remembered to embed the download link in its text (AgentMarkdown's
// inline ArtifactLink keeps covering that case).
//
// Card: type icon · filename · size · [Preview] [Download]
//   • PDF        → iframe (native browser PDF viewer)
//   • DOCX/XLSX/PPTX → iframe through /api/medq-agent/artifacts/[id]/pdf
//                      (server-side LibreOffice conversion, cached)
//   • HTML/MD/CSV/JSON → iframe via ?inline=1 (Content-Disposition inline)
//   • images     → <img>, audio → inline player
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo, useState } from 'react';
import {
  Download,
  Eye,
  FileAudio,
  FileDown,
  FileSpreadsheet,
  FileText,
  Presentation,
  X,
} from 'lucide-react';
import type { ToolCall } from './useAgentV2Stream';

export interface ArtifactFileInfo {
  id: string;
  name: string;
  filename?: string;
  downloadUrl: string;
  previewUrl?: string;
  pdfPreviewUrl?: string;
  mimeType?: string;
  kind?: string;
  sizeBytes?: number;
}

/** Schema-based extraction: any completed tool result shaped like the
 * artifact-tools' contract counts — future artifact tools work automatically. */
export function extractArtifactsFromToolCalls(
  toolCalls?: ToolCall[] | null,
): ArtifactFileInfo[] {
  if (!toolCalls?.length) return [];
  const out: ArtifactFileInfo[] = [];
  const seen = new Set<string>();
  for (const call of toolCalls) {
    if (call.status !== 'completed' || typeof call.result !== 'string') continue;
    if (!call.result.includes('"created"')) continue; // cheap pre-filter
    try {
      const parsed = JSON.parse(call.result) as {
        created?: unknown;
        artifact?: Record<string, unknown>;
      };
      const artifact = parsed?.artifact;
      if (parsed?.created !== true || !artifact) continue;
      const id = typeof artifact.id === 'string' ? artifact.id : '';
      const downloadUrl = typeof artifact.downloadUrl === 'string' ? artifact.downloadUrl : '';
      if (!id || !downloadUrl || seen.has(id)) continue;
      seen.add(id);
      out.push({
        id,
        name: typeof artifact.name === 'string' ? artifact.name : 'file',
        filename: typeof artifact.filename === 'string' ? artifact.filename : undefined,
        downloadUrl,
        previewUrl: typeof artifact.previewUrl === 'string' ? artifact.previewUrl : undefined,
        pdfPreviewUrl: typeof artifact.pdfPreviewUrl === 'string' ? artifact.pdfPreviewUrl : undefined,
        mimeType: typeof artifact.mimeType === 'string' ? artifact.mimeType : undefined,
        kind: typeof artifact.kind === 'string' ? artifact.kind : undefined,
        sizeBytes: typeof artifact.sizeBytes === 'number' ? artifact.sizeBytes : undefined,
      });
    } catch {
      // not JSON — ignore
    }
  }
  return out;
}

function formatSize(bytes?: number): string {
  if (!bytes || bytes <= 0) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type PreviewKind = 'pdf' | 'office' | 'image' | 'audio' | 'html' | 'text' | 'unknown';

function classify(info: ArtifactFileInfo): PreviewKind {
  const mime = (info.mimeType || '').toLowerCase();
  const name = (info.filename || info.name || '').toLowerCase();
  if (mime.includes('pdf') || name.endsWith('.pdf')) return 'pdf';
  if (/wordprocessingml|msword/.test(mime) || name.endsWith('.docx') || name.endsWith('.doc')) return 'office';
  if (/spreadsheetml|ms-excel/.test(mime) || name.endsWith('.xlsx') || name.endsWith('.xls')) return 'office';
  if (/presentationml|ms-powerpoint/.test(mime) || name.endsWith('.pptx') || name.endsWith('.ppt')) return 'office';
  if (mime.startsWith('image/') || /\.(png|jpe?g|gif|webp|svg)$/.test(name)) return 'image';
  if (mime.startsWith('audio/') || /\.(wav|mp3|ogg|m4a)$/.test(name)) return 'audio';
  if (mime.includes('html') || name.endsWith('.html')) return 'html';
  if (mime.startsWith('text/') || ['markdown', 'csv', 'json', 'chart'].includes(info.kind ?? '') || /\.(md|csv|json|txt)$/.test(name)) return 'text';
  return 'unknown';
}

function FileIcon({ kind }: { kind: PreviewKind }) {
  switch (kind) {
    case 'pdf':
      return <FileText className="h-4 w-4 shrink-0 text-[#ff5757]" />;
    case 'office':
      return <FileSpreadsheet className="h-4 w-4 shrink-0 text-[#a78bfa]" />;
    case 'image':
      return <Presentation className="h-4 w-4 shrink-0 text-[#00e5a0]" />;
    case 'audio':
      return <FileAudio className="h-4 w-4 shrink-0 text-[#4fc3f7]" />;
    default:
      return <FileDown className="h-4 w-4 shrink-0 text-[#00e5a0]" />;
  }
}

/** Full-screen preview overlay (fixed → escapes every overflow container). */
function PreviewModal({ info, onClose }: { info: ArtifactFileInfo; onClose: () => void }) {
  const kind = classify(info);
  const inlineUrl = info.previewUrl ?? `${info.downloadUrl}?inline=1`;
  const officePdf = info.pdfPreviewUrl ?? `/api/medq-agent/artifacts/${info.id}/pdf`;

  return (
    <div
      className="fixed inset-0 z-[90] flex flex-col p-3 sm:p-6"
      style={{ background: 'rgba(4,6,14,0.82)', backdropFilter: 'blur(4px)' }}
      role="dialog"
      aria-modal="true"
      aria-label={`Preview ${info.filename ?? info.name}`}
      onClick={onClose}
    >
      <div
        className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl"
        style={{ background: '#0c0e14', border: '1px solid rgba(0,229,160,0.22)' }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2">
          <FileIcon kind={kind} />
          <span className="min-w-0 flex-1 truncate text-[12px] font-medium text-[#e8ecf4]">
            {info.filename ?? info.name}
          </span>
          <span className="shrink-0 text-[10px] text-[#5a6478]">{formatSize(info.sizeBytes)}</span>
          <a
            href={info.downloadUrl}
            className="flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10.5px] font-medium"
            style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0' }}
          >
            <Download className="h-3.5 w-3.5" /> Download
          </a>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-1.5 text-[#9ca3b8] hover:bg-white/5 hover:text-[#e8ecf4]"
            aria-label="Close preview"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 bg-[#10131c]">
          {kind === 'image' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={inlineUrl}
              alt={info.filename ?? info.name}
              className="h-full w-full object-contain"
            />
          ) : kind === 'audio' ? (
            <div className="flex h-full items-center justify-center p-6">
              <audio controls src={inlineUrl} className="w-full max-w-md" />
            </div>
          ) : kind === 'unknown' ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
              <FileDown className="h-8 w-8 text-[#5a6478]" />
              <p className="text-[11px] text-[#9ca3b8]">
                No inline preview for this file type.
              </p>
              <a
                href={info.downloadUrl}
                className="rounded-lg px-3 py-1.5 text-[10.5px] font-medium"
                style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0' }}
              >
                Download to view
              </a>
            </div>
          ) : (
            <iframe
              src={kind === 'office' ? officePdf : inlineUrl}
              title={`Preview ${info.filename ?? info.name}`}
              className="h-full w-full"
              style={{ border: 'none', background: '#fff' }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/** One file card. */
function FileCard({ info, onPreview }: { info: ArtifactFileInfo; onPreview: () => void }) {
  const kind = classify(info);
  const label = info.filename ?? info.name;
  const size = formatSize(info.sizeBytes);
  return (
    <div
      className="flex w-full max-w-sm items-center gap-2.5 rounded-xl px-3 py-2.5"
      style={{
        background: 'linear-gradient(180deg, rgba(0,229,160,0.07), rgba(139,92,246,0.05))',
        border: '1px solid rgba(0,229,160,0.22)',
      }}
    >
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        <FileIcon kind={kind} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[11.5px] font-medium text-[#e8ecf4]" title={label}>
          {label}
        </div>
        <div className="text-[9.5px] text-[#5a6478]">
          {kind === 'pdf' ? 'PDF document' : kind === 'office' ? 'Office document' : kind === 'image' ? 'Image' : kind === 'audio' ? 'Audio' : 'File'}
          {size ? ` · ${size}` : ''}
        </div>
      </div>
      <button
        type="button"
        onClick={onPreview}
        className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-medium"
        style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0' }}
      >
        <Eye className="h-3 w-3" /> Preview
      </button>
      <a
        href={info.downloadUrl}
        className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-medium"
        style={{ background: 'rgba(255,255,255,0.05)', color: '#c7d0e0' }}
        title="Download file"
      >
        <Download className="h-3 w-3" /> Download
      </a>
    </div>
  );
}

/** Turn-level strip: renders nothing when the turn produced no files. */
export function MessageFileCards({ toolCalls }: { toolCalls?: ToolCall[] | null }) {
  const artifacts = useMemo(() => extractArtifactsFromToolCalls(toolCalls), [toolCalls]);
  const [previewing, setPreviewing] = useState<ArtifactFileInfo | null>(null);

  if (artifacts.length === 0) return null;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5 text-[9.5px] font-medium uppercase tracking-wider text-[#5a6478]">
        <FileDown className="h-3 w-3" />
        {artifacts.length === 1 ? 'File created' : `${artifacts.length} files created`}
      </div>
      {artifacts.map((info) => (
        <FileCard key={info.id} info={info} onPreview={() => setPreviewing(info)} />
      ))}
      {previewing && <PreviewModal info={previewing} onClose={() => setPreviewing(null)} />}
    </div>
  );
}
