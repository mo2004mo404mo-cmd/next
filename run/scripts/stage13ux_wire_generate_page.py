#!/usr/bin/env python3
"""
Stage 13 UX layer \u2014 wire the new resumable upload UX into the generate page.

Changes:
  1. Import the useResumableUpload hook + <ResumableUploadProgress> component.
  2. Replace the extractProgress useState with the hook (state + controls).
  3. Rewrite handleFileSelect to call upload(file) \u2014 the hook drives progress.
  4. Update clearFile to call resetUpload().
  5. Replace the inline spinner+bar JSX with <ResumableUploadProgress>.
  6. On error, don't toast \u2014 the component shows the error + Retry button.
     On cancel, don't toast \u2014 the component shows the cancelled state.
     On success, toast as before + reset the upload state (file-info card
     takes over the slot).

Backward-compatible:
  - The ExtractionProgress type import is kept (still re-exported, harmless).
  - extractFromFile is still imported (used by useFileAttachments elsewhere).
  - The 50MB guard stays (defense-in-depth; the hook enforces tier caps via
    /api/uploads, but a fast client-side reject avoids a wasted session).

Idempotent: detects whether the patch is already applied.
"""
from pathlib import Path

DEST = Path("/tmp/my-project/src/app/generate/page.tsx")
SRC = DEST.read_text(encoding="utf-8")

MARKER = "useResumableUpload"
if MARKER in SRC and "import { useResumableUpload" in SRC:
    print("[skip] generate page already wired to useResumableUpload")
    raise SystemExit(0)

# 1. Add imports after the file-extract import block (line ~16).
OLD_IMPORTS_END = """} from '@/lib/file-extract';
import { toast } from 'sonner';"""
NEW_IMPORTS_END = """} from '@/lib/file-extract';
import { useResumableUpload } from '@/lib/uploads/use-resumable-upload';
import { ResumableUploadProgress } from '@/components/medq/ResumableUploadProgress';
import { toast } from 'sonner';"""
assert OLD_IMPORTS_END in SRC, "import anchor not found"
SRC = SRC.replace(OLD_IMPORTS_END, NEW_IMPORTS_END)
print("[patch] added hook + component imports")

# 2. Replace extractProgress state with the hook.
OLD_STATE = """  // File upload state
  const [sourceMode, setSourceMode] = useState<SourceMode>('topic');
  const [extractedFile, setExtractedFile] = useState<ExtractedContent | null>(null);
  const [extractProgress, setExtractProgress] = useState<ExtractionProgress | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);"""
NEW_STATE = """  // File upload state
  const [sourceMode, setSourceMode] = useState<SourceMode>('topic');
  const [extractedFile, setExtractedFile] = useState<ExtractedContent | null>(null);
  // Stage 13 UX: resumable upload hook drives progress + pause/resume/cancel.
  const {
    state: uploadState,
    upload: startResumableUpload,
    pause: pauseUpload,
    resume: resumeUpload,
    cancel: cancelUpload,
    reset: resetUpload,
  } = useResumableUpload();
  const [isDragOver, setIsDragOver] = useState(false);"""
assert OLD_STATE in SRC, "state anchor not found"
SRC = SRC.replace(OLD_STATE, NEW_STATE)
print("[patch] replaced extractProgress state with useResumableUpload")

# 3. Rewrite handleFileSelect to use the hook.
#    Find the try block and replace it.
OLD_HANDLE = """    try {
      setExtractProgress({ stage: 'reading', progress: 5, message: 'Reading file...' });

      const content = await extractFromFile(file, (p) => {
        setExtractProgress(p);
      });

      setExtractedFile(content);
      setExtractProgress(null);

      // Auto-set topic from filename if not already set
      const autoTopic = file.name.replace(/\\.[^.]+$/, '').replace(/[-_]/g, ' ');
      if (!topic.trim() || topic === 'ACE inhibitors') {
        setTopic(autoTopic);
      }

      toast.success(`Extracted content from ${file.name}${content.imageUrls?.length ? ' (includes images for AI vision)' : ''}`);
    } catch (error) {
      setExtractProgress(null);
      toast.error(error instanceof Error ? error.message : 'Failed to extract file content');
    }
  }, [topic]);"""
NEW_HANDLE = """    try {
      // Stage 13 UX: the hook drives progress + pause/resume/cancel. On
      // success it sets state to 'done' and returns the content; on failure
      // or cancel it sets state to 'error'/'cancelled' \u2014 the component
      // shows the right message + Retry button, so we don't toast here.
      const content = await startResumableUpload(file);
      setExtractedFile(content);
      resetUpload(); // hide the progress UI \u2014 the file-info card takes over

      // Auto-set topic from filename if not already set
      const autoTopic = file.name.replace(/\\.[^.]+$/, '').replace(/[-_]/g, ' ');
      if (!topic.trim() || topic === 'ACE inhibitors') {
        setTopic(autoTopic);
      }

      toast.success(`Extracted content from ${file.name}${content.imageUrls?.length ? ' (includes images for AI vision)' : ''}`);
    } catch (error) {
      // Don't toast \u2014 the <ResumableUploadProgress> error state shows the
      // message + a Retry button. Cancels also land here (UploadCancelledError)
      // but the component shows the cancelled state, not an error.
      if (!/cancel/i.test(error instanceof Error ? error.message : String(error))) {
        // Only toast for unexpected errors the component can't show
        toast.error(error instanceof Error ? error.message : 'Failed to extract file content');
      }
    }
  }, [topic, startResumableUpload, resetUpload]);"""
assert OLD_HANDLE in SRC, "handleFileSelect anchor not found"
SRC = SRC.replace(OLD_HANDLE, NEW_HANDLE)
print("[patch] rewrote handleFileSelect to use the hook")

# 4. Update clearFile to reset the upload state too.
OLD_CLEAR = """  const clearFile = useCallback(() => {
    setExtractedFile(null);
    setExtractProgress(null);
    setShowContentPreview(false);
  }, []);"""
NEW_CLEAR = """  const clearFile = useCallback(() => {
    setExtractedFile(null);
    resetUpload();
    setShowContentPreview(false);
  }, [resetUpload]);"""
assert OLD_CLEAR in SRC, "clearFile anchor not found"
SRC = SRC.replace(OLD_CLEAR, NEW_CLEAR)
print("[patch] updated clearFile to reset upload state")

# 5. Replace the inline progress JSX with <ResumableUploadProgress>.
OLD_JSX = """                {extractProgress ? (
                  <div className="space-y-3">
                    <Loader2 className="w-8 h-8 text-[#4fc3f7] mx-auto animate-spin" />
                    <p className="text-sm text-[#e8ecf4] font-medium">{extractProgress.message}</p>
                    <div className="w-full max-w-xs mx-auto bg-white/[0.06] rounded-full h-2">
                      <div className="h-2 rounded-full bg-[#4fc3f7] transition-all duration-300" style={{ width: `${extractProgress.progress}%` }} />
                    </div>
                    <p className="text-[10px] text-[#5a6478]">{extractProgress.progress}%</p>
                  </div>
                ) : ("""
NEW_JSX = """                {uploadState ? (
                  <ResumableUploadProgress
                    state={uploadState}
                    onPause={pauseUpload}
                    onResume={resumeUpload}
                    onCancel={cancelUpload}
                    onRetry={() => fileInputRef.current?.click()}
                  />
                ) : ("""
assert OLD_JSX in SRC, "progress JSX anchor not found"
SRC = SRC.replace(OLD_JSX, NEW_JSX)
print("[patch] replaced inline progress JSX with <ResumableUploadProgress>")

DEST.write_text(SRC, encoding="utf-8")
print(f"WROTE {DEST} ({len(SRC)} bytes)")
