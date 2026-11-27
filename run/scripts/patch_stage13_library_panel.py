#!/usr/bin/env python3
"""
Stage 13 — KnowledgeLibraryPanel UI upgrade (idempotent string patches).

- Files > 8MB upload through the resumable chunked path (pause / resume /
  cancel, per-chunk auto-retry, resume-after-refresh)
- Transfer cards show speed + ETA + pause state + retry hints
- Cancelled chunked uploads can be resumed by picking the same file again
"""
import os

ROOT = "/tmp/my-project"
REL = "src/components/medq/KnowledgeLibraryPanel.tsx"

EDITS = [
    # 1. lucide icons: Pause / Play
    (
"""  Wand2,
} from 'lucide-react';""",
"""  Wand2,
  Pause,
  Play,
} from 'lucide-react';""",
    ),
    # 2. import the resumable upload engine
    (
"""import DrivePickerModal from './DrivePickerModal';""",
"""import DrivePickerModal from './DrivePickerModal';
import {
  uploadFileResumable,
  recallResumableUpload,
  UploadCancelledError,
  RESUMABLE_THRESHOLD_BYTES,
  formatSpeed,
  formatEta,
  type ResumableUploadHandle,
} from '@/lib/uploads/chunked-upload-client';""",
    ),
    # 3. extend the Transfer card model
    (
"""/** One in-flight upload / ingestion, rendered as a live progress card. */
interface Transfer {
  key: string;
  name: string;
  size: number;
  /** Bytes sent so far (HTTP upload phase). */
  sent: number;
  phase: 'uploading' | 'server';
  sourceId?: string;
  startedAt: number;
  error?: string;
}""",
"""/** One in-flight upload / ingestion, rendered as a live progress card. */
interface Transfer {
  key: string;
  name: string;
  size: number;
  /** Bytes sent so far (HTTP upload phase). */
  sent: number;
  phase: 'uploading' | 'server';
  sourceId?: string;
  startedAt: number;
  error?: string;
  /** True while the upload runs through the resumable chunked path —
   *  pause / resume is available for these (Stage 13). */
  chunked?: boolean;
  /** Upload paused by the user — confirmed chunks stay on the server. */
  paused?: boolean;
  /** Live transfer speed in bytes/second (chunked path). */
  speed?: number;
  /** Estimated seconds remaining (chunked path). */
  etaSec?: number | null;
  /** Bytes already on the server when this transfer resumed a previous one. */
  resumedFrom?: number;
}""",
    ),
    # 4. resumable transfer helpers after xhrUpload
    (
"""    xhr.send(form);
  });
}
""",
"""    xhr.send(form);
  });
}

/**
 * Stage 13 — resumable transfers. Files above RESUMABLE_THRESHOLD_BYTES are
 * uploaded as idempotent 8MB chunks (PUT /api/uploads/:id/chunks/:n):
 *   • a stall, timeout, or page refresh costs ONE chunk, not the whole upload
 *   • pause / resume / cancel mid-flight — confirmed chunks stay on the server
 *   • re-picking the same file resumes where it left off (localStorage keeps
 *     the session id; the server reports which chunks it already has)
 * Once complete, the file is ingested BY REFERENCE (uploadId) — the bytes
 * are never sent twice.
 */
type TransferResult = { ok: boolean; status: number; json: { sourceId?: string; error?: string } | null };

async function startResumableTransfer(
  file: File,
  key: string,
  registry: Map<string, ResumableUploadHandle>,
  onUpdate: (patch: Partial<Transfer>) => void,
): Promise<TransferResult> {
  const resumeUploadId = recallResumableUpload(file) ?? undefined;
  const handle = uploadFileResumable(file, {
    resumeUploadId,
    onResumed: (bytes) => {
      onUpdate({ resumedFrom: bytes });
      toast.info(`Resuming "${file.name}" — ${formatBytes2(bytes)} already uploaded`);
    },
    onProgress: (p) =>
      onUpdate({ sent: p.uploadedBytes, speed: p.bytesPerSecond, etaSec: p.etaSeconds, error: undefined }),
    onRetrying: ({ attempt }) =>
      onUpdate({ error: `Retry ${attempt + 1}: connection hiccup — continuing from the last confirmed chunk…` }),
  });
  registry.set(key, handle);
  try {
    const { uploadId } = await handle.promise;
    onUpdate({ speed: 0, etaSec: null, error: undefined });
    // Ingest the ALREADY-UPLOADED bytes by reference — no second transfer.
    const form = new FormData();
    form.append('uploadId', uploadId);
    form.append('origin', 'library');
    const res = await fetch('/api/knowledge/upload', { method: 'POST', body: form });
    const json = (await res.json().catch(() => null)) as { sourceId?: string; error?: string } | null;
    return { ok: res.ok && !!json?.sourceId, status: res.status, json };
  } catch (error) {
    if (error instanceof UploadCancelledError) return { ok: false, status: -1, json: null };
    return { ok: false, status: 0, json: { error: error instanceof Error ? error.message : 'Upload failed' } };
  } finally {
    registry.delete(key);
  }
}

/** Upload one file: small files take the single-request XHR fast path; large
 *  files take the resumable chunked path. Same TransferResult contract. */
async function startTransfer(
  file: File,
  key: string,
  xhrRegistry: Map<string, XMLHttpRequest>,
  controllerRegistry: Map<string, ResumableUploadHandle>,
  onUpdate: (patch: Partial<Transfer>) => void,
): Promise<TransferResult> {
  if (file.size > RESUMABLE_THRESHOLD_BYTES) {
    return startResumableTransfer(file, key, controllerRegistry, onUpdate);
  }
  return xhrUpload(file, xhrRegistry, key, (sent) => onUpdate({ sent }));
}
""",
    ),
    # 5. controller registry next to the XHR registry
    (
"""  /** Running upload XHRs, so the ✕ button can cancel mid-flight. */
  const xhrRegistry = useRef<Map<string, XMLHttpRequest>>(new Map());""",
"""  /** Running upload XHRs, so the ✕ button can cancel mid-flight. */
  const xhrRegistry = useRef<Map<string, XMLHttpRequest>>(new Map());
  /** Running resumable-upload controllers — pause / resume / cancel (Stage 13). */
  const uploadControllers = useRef<Map<string, ResumableUploadHandle>>(new Map());""",
    ),
    # 6a. transfer card creation marks chunked transfers
    (
"""      setTransfers((ts) => [...ts.filter((t) => t.key !== key), {
        key, name: file.name, size: file.size, sent: 0, phase: 'uploading', startedAt,
      }]);""",
"""      setTransfers((ts) => [...ts.filter((t) => t.key !== key), {
        key, name: file.name, size: file.size, sent: 0, phase: 'uploading', startedAt,
        chunked: file.size > RESUMABLE_THRESHOLD_BYTES,
      }]);""",
    ),
    # 6b. run through startTransfer (routes by size)
    (
"""      const { ok, status, json } = await xhrUpload(file, xhrRegistry.current, key, (sent) => {
        setTransfers((ts) => ts.map((t) => (t.key === key ? { ...t, sent } : t)));
      });""",
"""      const { ok, status, json } = await startTransfer(
        file,
        key,
        xhrRegistry.current,
        uploadControllers.current,
        (patch) => {
          setTransfers((ts) => ts.map((t) => (t.key === key ? { ...t, ...patch } : t)));
        },
      );""",
    ),
    # 6c. cancelled toast: chunked uploads can resume by re-picking the file
    (
"""        if (status === -1) toast.info(`Cancelled "${file.name}"`);""",
"""        if (status === -1) {
          toast.info(
            `Cancelled "${file.name}"${file.size > RESUMABLE_THRESHOLD_BYTES ? ' — pick the file again to resume where it left off' : ''}`,
          );
        }""",
    ),
    # 7. dismissTransfer honors controllers; add pause/resume toggle
    (
"""  /** Cancel an in-flight upload / dismiss a finished card. */
  const dismissTransfer = useCallback((key: string) => {
    const xhr = xhrRegistry.current.get(key);
    if (xhr) xhr.abort(); // resolves the promise → card removed in uploadFiles
    else setTransfers((ts) => ts.filter((t) => t.key !== key));
  }, []);""",
"""  /** Cancel an in-flight upload / dismiss a finished card. */
  const dismissTransfer = useCallback((key: string) => {
    const controller = uploadControllers.current.get(key);
    if (controller) controller.cancel(); // rejects the promise → card removed in uploadFiles
    else {
      const xhr = xhrRegistry.current.get(key);
      if (xhr) xhr.abort(); // resolves the promise → card removed in uploadFiles
      else setTransfers((ts) => ts.filter((t) => t.key !== key));
    }
  }, []);

  /** Pause / resume a chunked upload — confirmed chunks stay on the server,
   *  so resuming continues from the last one that landed (Stage 13). */
  const togglePauseTransfer = useCallback((key: string) => {
    const controller = uploadControllers.current.get(key);
    if (!controller) return;
    setTransfers((ts) =>
      ts.map((t) => {
        if (t.key !== key || !t.chunked) return t;
        if (t.paused) controller.resume();
        else controller.pause();
        return { ...t, paused: !t.paused, speed: t.paused ? t.speed : 0 };
      }),
    );
  }, []);""",
    ),
    # 8a. progress bar: paused state turns amber
    (
"""                      {uploading ? (
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#4fc3f7] to-[#00e5a0] transition-[width] duration-150"
                          style={{ width: `${uploadPct}%` }}
                        />""",
"""                      {uploading ? (
                        <div
                          className={`h-full rounded-full transition-[width] duration-150 ${
                            t.paused ? 'bg-[#f59e0b]' : 'bg-gradient-to-r from-[#4fc3f7] to-[#00e5a0]'
                          }`}
                          style={{ width: `${uploadPct}%` }}
                        />""",
    ),
    # 8b. pause / resume button next to the cancel ✕
    (
"""                      <button
                        type="button"
                        onClick={() => dismissTransfer(t.key)}
                        className="text-[#5a6478] hover:text-red-400 transition-colors shrink-0 p-0.5"
                        title={uploading ? 'Cancel this upload' : 'Hide this card'}
                        aria-label={uploading ? 'Cancel this upload' : 'Hide this card'}
                      >
                        <X className="w-3 h-3" />
                      </button>""",
"""                      {uploading && t.chunked && (
                        <button
                          type="button"
                          onClick={() => togglePauseTransfer(t.key)}
                          className="text-[#5a6478] hover:text-[#4fc3f7] transition-colors shrink-0 p-0.5"
                          title={t.paused ? 'Resume upload' : 'Pause upload — confirmed chunks are kept on the server'}
                          aria-label={t.paused ? 'Resume upload' : 'Pause upload'}
                        >
                          {t.paused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => dismissTransfer(t.key)}
                        className="text-[#5a6478] hover:text-red-400 transition-colors shrink-0 p-0.5"
                        title={uploading ? 'Cancel this upload' : 'Hide this card'}
                        aria-label={uploading ? 'Cancel this upload' : 'Hide this card'}
                      >
                        <X className="w-3 h-3" />
                      </button>""",
    ),
    # 8c. status line: speed, ETA, paused state, resume marker + retry hint
    (
"""                    <div className="flex items-center justify-between gap-2 mt-1">
                      <p className="text-[9.5px] text-[#8b95a8] truncate">
                        {uploading
                          ? `Uploading — ${formatBytes2(t.sent)} / ${formatBytes2(t.size)}`
                          : stageLabel(progress)}
                      </p>
                      <p className="text-[9.5px] text-[#5a6478] shrink-0 tabular-nums font-semibold">
                        {uploading ? `${uploadPct}%` : serverPct !== null ? `${serverPct}%` : ''}
                      </p>
                    </div>""",
"""                    <div className="flex items-center justify-between gap-2 mt-1">
                      <p className="text-[9.5px] text-[#8b95a8] truncate">
                        {uploading
                          ? t.paused
                            ? `Paused at ${formatBytes2(t.sent)} / ${formatBytes2(t.size)} — resume anytime`
                            : `${t.resumedFrom ? 'Resuming — ' : 'Uploading — '}${formatBytes2(t.sent)} / ${formatBytes2(t.size)}${t.speed ? ` · ${formatSpeed(t.speed)}` : ''}${t.etaSec != null ? ` · ${formatEta(t.etaSec)} left` : ''}`
                          : stageLabel(progress)}
                      </p>
                      <p className="text-[9.5px] text-[#5a6478] shrink-0 tabular-nums font-semibold">
                        {uploading ? `${uploadPct}%` : serverPct !== null ? `${serverPct}%` : ''}
                      </p>
                    </div>
                    {uploading && t.error && (
                      <p className="text-[9px] text-[#f59e0b]/90 truncate mt-0.5">{t.error}</p>
                    )}""",
    ),
    # 9. upload-zone hint mentions resumability
    (
"""            <p className="text-[10px] text-[#5a6478] mt-1">
              PDF · DOCX · PPTX (slides + slide images) · XLSX · EPUB · TXT/MD · audio · video (audio + frames) · images — up to 8 at once
            </p>""",
"""            <p className="text-[10px] text-[#5a6478] mt-1">
              PDF · DOCX · PPTX (slides + slide images) · XLSX · EPUB · TXT/MD · audio · video (audio + frames) · images — up to 8 at once · large files upload in resumable chunks (pause / resume, auto-retry, resume-after-refresh)
            </p>""",
    ),
]


def main() -> None:
    path = os.path.join(ROOT, REL)
    with open(path, "r", encoding="utf-8") as f:
        src = f.read()
    changed = 0
    for i, (old, new) in enumerate(EDITS, 1):
        if new in src and old not in src:
            print(f"[skip] edit #{i} already applied")
            continue
        if old not in src:
            raise SystemExit(f"[FAIL] anchor #{i} not found in {REL}:\n{old[:120]!r}")
        src = src.replace(old, new, 1)
        changed += 1
        print(f"[patch] edit #{i} applied")
    with open(path, "w", encoding="utf-8") as f:
        f.write(src)
    print(f"done: {changed}/{len(EDITS)} edits applied to {REL}")


if __name__ == "__main__":
    main()
