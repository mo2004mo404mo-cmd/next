#!/usr/bin/env python3
"""Fix: extraction state lost on page reload.

Two problems:
1. After reload, the Import modal is closed (importOpen=false), so the
   existing re-attach logic (which only fires when open=true) never runs.
   The user thinks their extraction is "gone" even though the server job
   is still running.

2. If the user reloads DURING client-side file extraction (before the
   server POST creates a jobId), the file content is lost because it's
   only in React state.

Fix:
A. Bank page: on mount, check if EXTRACT_JOB_KEY exists in localStorage
   and auto-open the import modal so re-attach fires immediately.
B. ImportQuestionsModal: persist the extracted text + images to
   sessionStorage during client-side extraction, and restore on mount
   if no server job exists yet (re-upload the extracted content and
   auto-start the server extraction).
"""
import sys

P = "/tmp/my-project"
ok = True


def patch(path, old, new, count=1):
    global ok
    full = f"{P}/{path}"
    text = open(full, "r", encoding="utf-8").read()
    n = text.count(old)
    if n != count:
        print(f"  !! {path}: expected {count}, found {n}")
        ok = False
        return
    open(full, "w", encoding="utf-8").write(text.replace(old, new))
    print(f"  + {path}")


# ── A. Bank page: auto-open import modal if a job is resumable ─────────────
BANK = "src/app/bank/page.tsx"

patch(
    BANK,
    "  // Import dialog state\n"
    "  const [importOpen, setImportOpen] = useState(false);",
    "  // Import dialog state — auto-opens on mount if a previous extraction\n"
    "  // job is still resumable (localStorage pointer set by ImportQuestionsModal).\n"
    "  // Without this, a page reload closes the modal and the re-attach logic\n"
    "  // inside it never fires — the user thinks their upload is \"gone\".\n"
    "  const [importOpen, setImportOpen] = useState(() => {\n"
    "    if (typeof window === 'undefined') return false;\n"
    "    try {\n"
    "      const raw = window.localStorage.getItem('medq:extract-job');\n"
    "      if (!raw) return false;\n"
    "      const entry = JSON.parse(raw);\n"
    "      // 24-hour window matches EXTRACT_JOB_MAX_AGE_MS in the modal\n"
    "      if (!entry?.at || Date.now() - entry.at > 24 * 60 * 60 * 1000) return false;\n"
    "      if (!entry?.jobId) return false;\n"
    "      return true; // auto-open so re-attach fires\n"
    "    } catch { return false; }\n"
    "  });",
)

# ── B. ImportQuestionsModal: persist extracted text+images during the gap ─
# between file upload and server POST, so a reload during client-side
# extraction doesn't lose the file. Uses sessionStorage (survives reload,
# cleared on tab close — appropriate for ephemeral upload state).
MODAL = "src/components/medq/ImportQuestionsModal.tsx"

# B1. Add the persistence key + helpers near EXTRACT_JOB_KEY
patch(
    MODAL,
    "const EXTRACT_JOB_KEY = 'medq:extract-job';",
    "const EXTRACT_JOB_KEY = 'medq:extract-job';\n"
    "/** Pending file content (text + images) persisted during the gap between\n"
    " *  file upload and the server POST that creates a jobId. If the user\n"
    " *  reloads during client-side extraction, this is restored so the upload\n"
    " *  isn't lost. Cleared once the server job is created (EXTRACT_JOB_KEY\n"
    " *  takes over as the resume pointer). */\n"
    "const PENDING_FILE_KEY = 'medq:extract-pending-file';",
)

# B2. Add save/restore helpers before the component function
# Find the reset() definition and add helpers before the component
patch(
    MODAL,
    "/* ── Inline edit form shown inside a preview card ── */",
    "/** Persist the pending file content (text + images) to sessionStorage so a\n"
    " *  reload during client-side extraction doesn't lose the upload. Cleared\n"
    " *  once the server job is created. */\n"
    "function savePendingFile(text: string, fileName: string, images?: Array<{ dataUrl: string; caption: string }>) {\n"
    "  try {\n"
    "    window.sessionStorage.setItem(PENDING_FILE_KEY, JSON.stringify({\n"
    "      text, fileName, images: images ?? [], at: Date.now(),\n"
    "    }));\n"
    "  } catch { /* quota exceeded — large file; skip persistence */ }\n"
    "}\n"
    "function clearPendingFile() {\n"
    "  try { window.sessionStorage.removeItem(PENDING_FILE_KEY); } catch { /* ignore */ }\n"
    "}\n"
    "function loadPendingFile(): { text: string; fileName: string; images: Array<{ dataUrl: string; caption: string }>; at: number } | null {\n"
    "  try {\n"
    "    const raw = window.sessionStorage.getItem(PENDING_FILE_KEY);\n"
    "    if (!raw) return null;\n"
    "    const parsed = JSON.parse(raw);\n"
    "    if (!parsed?.text || !parsed?.fileName) return null;\n"
    "    // 1-hour window for the pending state (longer than typical\n"
    "    // client-side extraction, shorter than the job resume window).\n"
    "    if (Date.now() - (parsed.at || 0) > 60 * 60 * 1000) {\n"
    "      window.sessionStorage.removeItem(PENDING_FILE_KEY);\n"
    "      return null;\n"
    "    }\n"
    "    return parsed;\n"
    "  } catch { return null; }\n"
    "}\n\n"
    "/* ── Inline edit form shown inside a preview card ── */",
)

# B3. In handleFile, save the pending file AFTER client-side extraction
# (right before runAiExtraction for DOCX/PDF, and after readFileText for TXT)
# The simplest single insertion point: in runAiExtraction, before the POST.
patch(
    MODAL,
    "    try {\n"
    "      const res = await fetch('/api/questions/import/extract', {\n"
    "        method: 'POST',\n"
    "        headers: { 'Content-Type': 'application/json' },\n"
    "        body: JSON.stringify({ text, fileName: label, images }),\n"
    "      });\n"
    "      const start: { jobId?: string; error?: string } = await res.json().catch(() => ({}));\n"
    "      if (!res.ok || !start.jobId) throw new Error(start.error || 'Could not start extraction');\n\n"
    "      // Remember the job so a page reload / later re-open can re-attach.\n"
    "      setExtractJobId(start.jobId);",
    "    try {\n"
    "      // Persist the file content NOW so a reload during the POST/poll\n"
    "      // doesn't lose it. Cleared once the job is created below.\n"
    "      savePendingFile(text, label, images);\n"
    "      const res = await fetch('/api/questions/import/extract', {\n"
    "        method: 'POST',\n"
    "        headers: { 'Content-Type': 'application/json' },\n"
    "        body: JSON.stringify({ text, fileName: label, images }),\n"
    "      });\n"
    "      const start: { jobId?: string; error?: string } = await res.json().catch(() => ({}));\n"
    "      if (!res.ok || !start.jobId) throw new Error(start.error || 'Could not start extraction');\n\n"
    "      // Job created — clear the pending-file pointer; the job pointer\n"
    "      // (EXTRACT_JOB_KEY) takes over as the resume mechanism.\n"
    "      clearPendingFile();\n"
    "      setExtractJobId(start.jobId);",
)

# B4. Also clear the pending file when extraction completes or errors
patch(
    MODAL,
    "      const polled = await pollExtraction(start.jobId);\n"
    "      try { window.localStorage.removeItem(EXTRACT_JOB_KEY); } catch { /* ignore */ }",
    "      const polled = await pollExtraction(start.jobId);\n"
    "      try { window.localStorage.removeItem(EXTRACT_JOB_KEY); } catch { /* ignore */ }\n"
    "      clearPendingFile();",
)

# B5. In the error catch, clear pending file on definitive errors
patch(
    MODAL,
    "      if (!(err instanceof Error) || !/stalled|taking too long|Lost connection/.test(err.message)) {\n"
    "        try { window.localStorage.removeItem(EXTRACT_JOB_KEY); } catch { /* ignore */ }\n"
    "      }",
    "      if (!(err instanceof Error) || !/stalled|taking too long|Lost connection/.test(err.message)) {\n"
    "        try { window.localStorage.removeItem(EXTRACT_JOB_KEY); } catch { /* ignore */ }\n"
    "        clearPendingFile();\n"
    "      }",
)

# B6. Add a re-attach for pending files: in the resume useEffect, BEFORE
# the EXTRACT_JOB_KEY check, check for a pending file and auto-start the
# server extraction if one exists (and no server job pointer exists).
patch(
    MODAL,
    "  const resumeChecked = useRef(false);\n"
    "  useEffect(() => {\n"
    "    if (!open || resumeChecked.current) return;\n"
    "    resumeChecked.current = true;\n"
    "    let entry: SavedExtractJob | null = null;\n"
    "    try {\n"
    "      const raw = window.localStorage.getItem(EXTRACT_JOB_KEY);\n"
    "      if (raw) entry = JSON.parse(raw) as SavedExtractJob;\n"
    "    } catch { return; }",
    "  const resumeChecked = useRef(false);\n"
    "  useEffect(() => {\n"
    "    if (!open || resumeChecked.current) return;\n"
    "    resumeChecked.current = true;\n\n"
    "    // ── Pending file re-attach: the user uploaded a file but the server\n"
    "    //  POST hadn't completed when they reloaded. Restore the extracted\n"
    "    //  text + images and auto-start the server extraction. ──\n"
    "    const pending = loadPendingFile();\n"
    "    if (pending && !window.localStorage.getItem(EXTRACT_JOB_KEY)) {\n"
    "      console.log('[Import] re-attaching pending file:', pending.fileName);\n"
    "      setFileName(pending.fileName);\n"
    "      // Re-run the server extraction with the restored content. The\n"
    "      // text + images were already extracted client-side before the\n"
    "      // reload — no need to re-parse the original file.\n"
    "      void runAiExtraction(pending.text, pending.fileName, 'file-ai', pending.images);\n"
    "      return;\n"
    "    }\n"
    "    // Clear stale pending file if a server job pointer exists (the job\n"
    "    // is the authoritative resume mechanism).\n"
    "    if (pending) clearPendingFile();\n\n"
    "    let entry: SavedExtractJob | null = null;\n"
    "    try {\n"
    "      const raw = window.localStorage.getItem(EXTRACT_JOB_KEY);\n"
    "      if (raw) entry = JSON.parse(raw) as SavedExtractJob;\n"
    "    } catch { return; }",
)

print("\nPASS: both fixes applied" if ok else "\nFAIL")
sys.exit(0 if ok else 1)
