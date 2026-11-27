#!/usr/bin/env python3
"""Update ImportQuestionsModal to upload files directly to the server
(POST /api/questions/import/extract with multipart/form-data) instead of
parsing them client-side with FileReader + pdfjs + mammoth.

The client now:
  1. Reads the file into an ArrayBuffer (just to get the size for validation)
  2. POSTs the raw File as multipart/form-data to the extract route
  3. The server parses it (extractFromFileServer) and starts the AI job
  4. The client polls the job as before

Benefits:
  - No browser OOM on large files
  - No pdfjs worker version mismatch
  - No client-side mammoth/jszip loading
  - File content is never lost on reload (server creates the job immediately)
"""
import sys

P = "/tmp/my-project/src/components/medq/ImportQuestionsModal.tsx"
ok = True


def patch(old, new, count=1):
    global ok
    text = open(P, "r", encoding="utf-8").read()
    n = text.count(old)
    if n != count:
        print(f"  !! expected {count}, found {n}: {old[:70]}...")
        ok = False
        return
    open(P, "w", encoding="utf-8").write(text.replace(old, new))
    print(f"  + patched: {old[:70]}...")


# 1. For DOCX/PDF/PPTX (binary Office formats), upload the raw file to the
#    server instead of calling extractFromFile() client-side.
#    The server now handles all parsing (extractFromFileServer in
#    src/lib/server-file-extract.ts).
patch(
    "      // DOCX / PDF (and images fallback) — client-side extraction then AI\n"
    "      setSourceKind('file-ai');\n"
    "      const extracted = await extractFromFile(file, (p) => {\n"
    "        setStatusMsg(`${p.message}`);\n"
    "      });\n"
    "      if (!extracted.text.trim() || extracted.text.trim().length < 20) {\n"
    "        // Allow images-only imports (e.g. a screenshot of a question sheet\n"
    "        // with no extractable text layer) — the VLM pass can still recover\n"
    "        // questions from the pixels. Skip the empty-text check if we have\n"
    "        // at least one image.\n"
    "        if (!extracted.images || extracted.images.length === 0) {\n"
    "          throw new Error('Could not extract readable text from this file');\n"
    "        }\n"
    "        // Replace the empty-text placeholder so the server doesn't reject it.\n"
    "        extracted.text = `[This file contributed ${extracted.images.length} image${extracted.images.length > 1 ? 's' : ''} and no extractable text. The AI will analyze the images directly.]`;\n"
    "      }\n"
    "      await runAiExtraction(extracted.text, file.name, 'file-ai', extracted.images);",
    "      // DOCX / PDF / PPTX / images — SERVER-SIDE extraction (more reliable:\n"
    "      // no browser OOM, no pdfjs worker mismatch, no reload loss).\n"
    "      // Upload the raw file as multipart/form-data; the server parses it\n"
    "      // with extractFromFileServer() and starts the AI job in one step.\n"
    "      setSourceKind('file-ai');\n"
    "      setStatusMsg(`Uploading ${file.name} for server-side extraction…`);\n"
    "      await runAiExtractionFromFile(file);",
)

# 2. Add the runAiExtractionFromFile function — uploads the raw file as
#    multipart/form-data, gets back a jobId, then polls like runAiExtraction.
#    Insert it right before the runAiExtraction callback definition.
patch(
    "  /* ── Paste intake ── */",
    "  /* ── File upload → server-side extraction ──\n"
    "   * Uploads the raw File as multipart/form-data to the extract route.\n"
    "   * The server parses it (extractFromFileServer) and starts the AI job\n"
    "   * in one step — no client-side FileReader/pdfjs/mammoth. More reliable:\n"
    "   * no browser OOM, no worker mismatch, no reload loss (the server creates\n"
    "   * the job immediately, before any polling starts). */\n"
    "  const runAiExtractionFromFile = useCallback(async (file: File) => {\n"
    "    if (busy) return;\n"
    "    setPhase('extracting');\n"
    "    setExtractStartedAt(Date.now());\n"
    "    setLivePoll(null);\n"
    "    setCancelling(false);\n"
    "    setStatusMsg(`Uploading ${file.name}…`);\n"
    "    try {\n"
    "      const formData = new FormData();\n"
    "      formData.append('file', file);\n"
    "      // Persist a pointer so reload re-attaches (the job pointer takes\n"
    "      // over once the server returns a jobId below).\n"
    "      savePendingFile('', file.name);\n"
    "      const res = await fetch('/api/questions/import/extract', {\n"
    "        method: 'POST',\n"
    "        body: formData,\n"
    "        // Note: do NOT set Content-Type — the browser sets it with the\n"
    "        // multipart boundary automatically.\n"
    "      });\n"
    "      const start: { jobId?: string; error?: string } = await res.json().catch(() => ({}));\n"
    "      if (!res.ok || !start.jobId) throw new Error(start.error || 'Could not start extraction');\n\n"
    "      // Job created — clear the pending pointer; the job pointer takes over.\n"
    "      clearPendingFile();\n"
    "      setExtractJobId(start.jobId);\n"
    "      setFileName(file.name);\n"
    "      try {\n"
    "        window.localStorage.setItem(EXTRACT_JOB_KEY, JSON.stringify({ jobId: start.jobId, fileName: file.name, kind: 'file-ai', at: Date.now() }));\n"
    "      } catch { /* private mode etc. */ }\n\n"
    "      setStatusMsg('AI is reading your content and extracting questions…');\n"
    "      const polled = await pollExtraction(start.jobId);\n"
    "      try { window.localStorage.removeItem(EXTRACT_JOB_KEY); } catch { /* ignore */ }\n"
    "      clearPendingFile();\n"
    "      if (!polled) {\n"
    "        setPhase('idle');\n"
    "        setStatusMsg('');\n"
    "        setLivePoll(null);\n"
    "        setExtractStartedAt(null);\n"
    "        setCancelling(false);\n"
    "        toast.error('No questions found', {\n"
    "          description: 'The AI could not find any complete questions (with answers) in this content.',\n"
    "        });\n"
    "        return;\n"
    "      }\n"
    "      setQuestions(polled.questions);\n"
    "      setDetectedCount(polled.estimatedCount);\n"
    "      setPhase('preview');\n"
    "      setLivePoll(null);\n"
    "      setExtractStartedAt(null);\n"
    "      setCancelling(false);\n"
    "    } catch (err) {\n"
    "      clearPendingFile();\n"
    "      if (err instanceof Error && err.message === '__CANCELLED__') {\n"
    "        setPhase('idle'); setStatusMsg(''); setLivePoll(null);\n"
    "        setExtractStartedAt(null); setExtractJobId(null); setCancelling(false);\n"
    "        try { window.localStorage.removeItem(EXTRACT_JOB_KEY); } catch { /* ignore */ }\n"
    "        toast.info('Extraction cancelled', { description: 'You can start a new extraction any time.' });\n"
    "        return;\n"
    "      }\n"
    "      setPhase('idle'); setStatusMsg(''); setLivePoll(null);\n"
    "      setExtractStartedAt(null); setCancelling(false);\n"
    "      toast.error(err instanceof Error ? err.message : 'AI extraction failed');\n"
    "    }\n"
    "  }, [busy, pollExtraction]);\n\n"
    "  /* ── Paste intake ── */",
)

print("\nPASS: modal updated to upload files server-side" if ok else "\nFAIL")
sys.exit(0 if ok else 1)
