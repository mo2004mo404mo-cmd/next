#!/usr/bin/env python3
"""Stage 13 UX: wire chat-attachment pause/resume/cancel/retry through the UI.

MedQAgentV3 → MedQAgentPanel. Renders compact controls on the attachment chip
while a large file is uploading (pause / resume / cancel), and a Retry button
after failure or cancellation (Retry resumes from the server's stored chunks —
not a re-upload from zero)."""
import re, sys

def read(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()
def write(p, s):
    with open(p, 'w', encoding='utf-8') as f: f.write(s)

# ════════════ 1. MedQAgentV3.tsx ════════════
v3 = '/tmp/my-project/src/components/medq/ai-agent/MedQAgentV3.tsx'
s = read(v3)

# 1a. Add handleFileTooLarge after handleUnsupportedFile
if 'handleFileTooLarge' not in s:
    anchor = ("  const handleUnsupportedFile = useCallback((fileName: string, supportedTypes: string) => {\n"
              "    setMessages((previous) => [\n"
              "      ...previous,\n"
              "      {\n"
              "        id: `msg-${Date.now()}-error`,\n"
              "        role: 'system',\n"
              "        content: `Unsupported file type: ${fileName}. Supported: ${supportedTypes}`,\n"
              "        timestamp: Date.now(),\n"
              "      },\n"
              "    ]);\n"
              "  }, [setMessages]);\n")
    assert anchor in s, 'handleUnsupportedFile anchor not found'
    addition = anchor + (
        "\n"
        "  // Stage 13 UX: a file above the absolute 100MB cap is rejected before\n"
        "  // any upload — no attachment is created. The tier-aware cap (visitor\n"
        "  // 2MB … pro 100MB) is enforced server-side at POST /api/uploads and\n"
        "  // surfaced on the chip as a precise 413.\n"
        "  const handleFileTooLarge = useCallback((fileName: string, sizeBytes: number) => {\n"
        "    const mb = Math.round((sizeBytes / 1024 / 1024) * 10) / 10;\n"
        "    setMessages((previous) => [\n"
        "      ...previous,\n"
        "      {\n"
        "        id: `msg-${Date.now()}-error`,\n"
        "        role: 'system',\n"
        "        content: `${fileName} is ${mb}MB — above the 100MB absolute cap. The per-plan limit is checked when the upload starts.`,\n"
        "        timestamp: Date.now(),\n"
        "      },\n"
        "    ]);\n"
        "  }, [setMessages]);\n"
    )
    s = s.replace(anchor, addition, 1)
    print('[v3] handleFileTooLarge added')

# 1b. Destructure new callbacks + pass onFileTooLarge
old_destructure = ("  const {\n"
                   "    fileAttachments,\n"
                   "    isDraggingFile,\n"
                   "    handleFileUpload,\n"
                   "    handleDragOver,\n"
                   "    handleDragLeave,\n"
                   "    handleDrop,\n"
                   "    removeAttachment,\n"
                   "    clearAttachments,\n"
                   "  } = useFileAttachments({ onUnsupportedFile: handleUnsupportedFile });\n")
new_destructure = ("  const {\n"
                  "    fileAttachments,\n"
                  "    isDraggingFile,\n"
                  "    handleFileUpload,\n"
                  "    handleDragOver,\n"
                  "    handleDragLeave,\n"
                  "    handleDrop,\n"
                  "    removeAttachment,\n"
                  "    clearAttachments,\n"
                  "    // Stage 13 UX: resumable-upload controls for large chat attachments.\n"
                  "    pauseAttachment,\n"
                  "    resumeAttachment,\n"
                  "    cancelAttachment,\n"
                  "    retryAttachment,\n"
                  "  } = useFileAttachments({ onUnsupportedFile: handleUnsupportedFile, onFileTooLarge: handleFileTooLarge });\n")
if old_destructure in s:
    s = s.replace(old_destructure, new_destructure, 1)
    print('[v3] destructure updated')
elif 'pauseAttachment' in s:
    print('[v3] destructure already updated')
else:
    sys.exit('[v3] destructure anchor not found')

# 1c. Pass new props to <MedQAgentPanel> (after onRemoveAttachment={removeAttachment})
old_pass = "          onRemoveAttachment={removeAttachment}\n"
new_pass = ("          onRemoveAttachment={removeAttachment}\n"
           "          onPauseAttachment={pauseAttachment}\n"
           "          onResumeAttachment={resumeAttachment}\n"
           "          onCancelAttachment={cancelAttachment}\n"
           "          onRetryAttachment={retryAttachment}\n")
if old_pass in s and 'onPauseAttachment' not in s:
    s = s.replace(old_pass, new_pass, 1)
    print('[v3] panel props passed')
elif 'onPauseAttachment' in s:
    print('[v3] panel props already passed')
else:
    sys.exit('[v3] onRemoveAttachment pass anchor not found')

write(v3, s)

# ════════════ 2. MedQAgentPanel.tsx ════════════
panel = '/tmp/my-project/src/components/medq/ai-agent/MedQAgentPanel.tsx'
s = read(panel)

# 2a. Props interface: add 4 callbacks after onRemoveAttachment
old_pi = "  onRemoveAttachment: (id: string) => void;\n"
new_pi = ("  onRemoveAttachment: (id: string) => void;\n"
          "  /** Stage 13 UX: pause the in-flight chunk (confirmed chunks stay server-side). */\n"
          "  onPauseAttachment: (id: string) => void;\n"
          "  /** Stage 13 UX: resume a paused attachment. */\n"
          "  onResumeAttachment: (id: string) => void;\n"
          "  /** Stage 13 UX: cancel — confirmed chunks stay; Retry resumes from them. */\n"
          "  onCancelAttachment: (id: string) => void;\n"
          "  /** Stage 13 UX: retry a failed/cancelled attachment — RESUMES from the\n"
          "   *  server's stored chunks, not a re-upload from zero. */\n"
          "  onRetryAttachment: (id: string) => void;\n")
if old_pi in s and 'onPauseAttachment' not in s:
    s = s.replace(old_pi, new_pi, 1)
    print('[panel] props interface extended')

# 2b. Destructure the 4 callbacks (find the existing onRemoveAttachment destructure line)
# The destructure is:  onRemoveAttachment,
old_destr = "  onRemoveAttachment,\n"
new_destr = ("  onRemoveAttachment,\n"
            "  onPauseAttachment,\n"
            "  onResumeAttachment,\n"
            "  onCancelAttachment,\n"
            "  onRetryAttachment,\n")
if '  onRemoveAttachment,\n' in s and '  onPauseAttachment,\n' not in s:
    s = s.replace(old_destr, new_destr, 1)
    print('[panel] destructure added')

write(panel, s)
print('patch_upload_ux_panel done')
