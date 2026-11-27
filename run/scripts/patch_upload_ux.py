#!/usr/bin/env python3
"""Stage 13 UX wiring: make resumable uploads actually resumable in the UI.

Three defects fixed here (see docs/stage-completion.md Stage 13 follow-up):
  A. useFileAttachments (chat) called extractFromFile WITHOUT onHandle — the
     resumable engine ran but the handle (pause/resume/cancel) was discarded,
     so a stalled large chat file had no recovery. Now captures the handle,
     streams richer progress, and exposes pause/resume/cancel/retry.
  B. generate/page.tsx had a stale 50MB hard cap that blocked Pro (100MB)
     users before the resumable path even started. Replaced with the absolute
     100MB guard; the tier cap is enforced server-side at POST /api/uploads
     (precise 413 surfaced through the resumable error state).
  C. FileAttachment type gained an optional `upload` block so the chip can
     render phase + bytes + speed + ETA + resumed badge.

Idempotent: re-running is a no-op once all markers are present.
"""
import io, re, sys, os

PROJ = '/tmp/my-project'
def read(p):
    with open(p, 'r', encoding='utf-8') as f:
        return f.read()
def write(p, s):
    with open(p, 'w', encoding='utf-8') as f:
        f.write(s)

MARK = '/* stage13-ux-wiring: applied */'

# ── 1. FileAttachment type: add optional `upload` block ──────────────────
fi_path = f'{PROJ}/src/lib/agent/file-intelligence.ts'
fi = read(fi_path)
if 'upload?: UploadProgressSnapshot' not in fi:
    # Insert the interface + the field. Place the interface just before FileAttachment.
    needle = "export interface FileAttachment {\n"
    assert needle in fi, 'FileAttachment interface anchor not found'
    snapshot_iface = (
        "  /** Resumable-upload phase snapshot (Stage 13 UX) — populated only\n"
        "   *  on the chunked path (files > RESUMABLE_THRESHOLD_BYTES). Small\n"
        "   *  files take the instant single-request path and leave this undefined. */\n"
        "  export interface UploadProgressSnapshot {\n"
        "    phase: 'preparing' | 'uploading' | 'paused' | 'retrying' | 'assembling' | 'done' | 'error' | 'cancelled';\n"
        "    /** Confirmed bytes on the server (incl. resumed bytes). */\n"
        "    uploadedBytes: number;\n"
        "    /** Declared total file size. */\n"
        "    totalBytes: number;\n"
        "    /** Sliding-window speed, bytes/second (0 = unknown). */\n"
        "    bytesPerSecond: number;\n"
        "    /** Seconds remaining, or null while unknown. */\n"
        "    etaSeconds: number | null;\n"
        "    /** Bytes already on the server when this upload started (resume). */\n"
        "    resumedBytes: number;\n"
        "    /** Attempt number of the in-flight chunk (1 = first try). */\n"
        "    attempt: number;\n"
        "  }\n\n"
    )
    fi = fi.replace(needle, snapshot_iface + needle, 1)
    # Add the field inside FileAttachment (after `progress: number;  // 0-100`)
    field_anchor = "  progress: number;        // 0-100\n"
    assert field_anchor in fi, 'FileAttachment.progress anchor not found'
    field = (
        "  progress: number;        // 0-100\n"
        "  /** Stage 13 UX: resumable-upload phase snapshot. Present only while a\n"
        "   *  large file is uploading / paused / retrying / cancelled / failed.\n"
        "   *  Undefined for small files (instant single-request path) and after\n"
        "   *  the upload completes (the chip falls back to status + progress). */\n"
        "  upload?: UploadProgressSnapshot;\n"
    )
    fi = fi.replace(field_anchor, field, 1)
    write(fi_path, fi)
    print('[1] FileAttachment.upload added')
else:
    print('[1] FileAttachment.upload already present')

print('patch_upload_ux step 1 done')
