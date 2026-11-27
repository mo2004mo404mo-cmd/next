#!/usr/bin/env python3
"""Stage 13 UX: render resumable-upload controls on the chat attachment chip."""
def read(p):
    with open(p, 'r', encoding='utf-8') as f: return f.read()
def write(p, s):
    with open(p, 'w', encoding='utf-8') as f: f.write(s)

panel = '/tmp/my-project/src/components/medq/ai-agent/MedQAgentPanel.tsx'
s = read(panel)

# 1. Add Pause + RotateCw to the lucide imports (Play + X already present).
if '  Pause,' not in s:
    old_imp = "  Paperclip,\n  Pin,\n  PinOff,\n  Play,\n"
    new_imp = "  Paperclip,\n  Pause,\n  Pin,\n  PinOff,\n  Play,\n"
    # Insert RotateCw near the end (before Wrench, X area) — keep alphabetical-ish.
    assert old_imp in s, 'lucide Pause anchor not found'
    s = s.replace(old_imp, new_imp, 1)
    old_imp2 = "  VolumeX,\n  Wrench,\n  X,\n"
    new_imp2 = "  VolumeX,\n  Wrench,\n  X,\n  RotateCw,\n"
    assert old_imp2 in s, 'lucide RotateCw anchor not found'
    s = s.replace(old_imp2, new_imp2, 1)
    print('[panel] icons imported')
else:
    print('[panel] icons already imported')

# 2. Replace the chip render block with the enhanced version (mini progress
#    bar + pause/resume/cancel/retry/remove buttons).
old_block = """      {fileAttachments.length > 0 && (
        <div className="px-3 pt-2 flex flex-wrap gap-1.5">
          {fileAttachments.map((attachment) => (
            <div
              key={attachment.id}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px]"
              style={{
                background: attachment.status === 'error' ? 'rgba(255,87,87,0.08)' : attachment.knowledge ? 'rgba(128,222,168,0.08)' : 'rgba(79,195,247,0.08)',
                border: `1px solid ${attachment.status === 'error' ? 'rgba(255,87,87,0.25)' : attachment.knowledge ? 'rgba(128,222,168,0.3)' : 'rgba(79,195,247,0.25)'}`,
                color: attachment.status === 'error' ? '#ff5757' : attachment.knowledge ? '#80dea8' : '#4fc3f7',
              }}
              title={attachment.knowledge ? `Saved to your knowledge library (${attachment.knowledge.chunks} chunks) — the agent can retrieve and cite it` : attachment.name}
            >
              {attachment.status === 'extracting' || attachment.status === 'analyzing' ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : attachment.dataUrl?.startsWith('data:image/') ? (
                <Image src={attachment.dataUrl} alt={attachment.name} width={16} height={16} unoptimized className="w-4 h-4 rounded object-cover" />
              ) : attachment.dataUrl?.startsWith('data:audio/') ? (
                <Headphones className="w-3 h-3" />
              ) : attachment.knowledge ? (
                <BookOpenCheck className="w-3 h-3" />
              ) : (
                <FileText className="w-3 h-3" />
              )}
              <span className="truncate max-w-20">{attachment.name}</span>
              {attachment.knowledge && (
                <span className="text-[9px] opacity-75 whitespace-nowrap">{attachment.knowledge.chunks} chunks</span>
              )}
              {attachment.status === 'complete' && (
                <button
                  onClick={() => onRemoveAttachment(attachment.id)}
                  className="text-[#5a6478] hover:text-[#ff5757]"
                  title="Remove"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}"""

new_block = """      {fileAttachments.length > 0 && (
        <div className="px-3 pt-2 flex flex-wrap gap-1.5">
          {fileAttachments.map((attachment) => {
            // Stage 13 UX: derive the upload phase + compact controls.
            const u = attachment.upload;
            const isUploading = !!u && (u.phase === 'uploading' || u.phase === 'retrying' || u.phase === 'preparing');
            const isPaused = !!u && u.phase === 'paused';
            const isFailed = attachment.status === 'error';
            const isCancelled = !!u && u.phase === 'cancelled';
            const showRetry = isFailed || isCancelled;
            const showRemove = attachment.status === 'complete' || isFailed || isCancelled;
            const pct = u && u.totalBytes > 0
              ? Math.max(0, Math.min(100, Math.round((u.uploadedBytes / u.totalBytes) * 100)))
              : attachment.progress;
            const phaseLabel = u
              ? u.phase === 'paused' ? 'paused'
                : u.phase === 'retrying' ? 'retrying'
                : u.phase === 'cancelled' ? 'cancelled'
                : u.resumedBytes > 0 && u.uploadedBytes <= u.resumedBytes ? 'resuming'
                : ''
              : '';
            const statTip = u
              ? `${pct}%${u.bytesPerSecond > 0 ? ` · ${Math.round(u.bytesPerSecond / 1024)} KB/s` : ''}${u.etaSeconds ? ` · ${Math.ceil(u.etaSeconds)}s left` : ''}${u.resumedBytes > 0 ? ` · resumed from ${Math.round((u.resumedBytes / Math.max(1, u.totalBytes)) * 100)}%` : ''}`
              : attachment.name;
            return (
            <div
              key={attachment.id}
              className="relative flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px]"
              style={{
                background: isFailed ? 'rgba(255,87,87,0.08)' : isCancelled ? 'rgba(122,132,153,0.08)' : attachment.knowledge ? 'rgba(128,222,168,0.08)' : 'rgba(79,195,247,0.08)',
                border: `1px solid ${isFailed ? 'rgba(255,87,87,0.25)' : isCancelled ? 'rgba(122,132,153,0.25)' : attachment.knowledge ? 'rgba(128,222,168,0.3)' : 'rgba(79,195,247,0.25)'}`,
                color: isFailed ? '#ff5757' : isCancelled ? '#7a8499' : attachment.knowledge ? '#80dea8' : '#4fc3f7',
              }}
              title={attachment.knowledge ? `Saved to your knowledge library (${attachment.knowledge.chunks} chunks) — the agent can retrieve and cite it` : statTip}
            >
              {isUploading ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : attachment.dataUrl?.startsWith('data:image/') ? (
                <Image src={attachment.dataUrl} alt={attachment.name} width={16} height={16} unoptimized className="w-4 h-4 rounded object-cover" />
              ) : attachment.dataUrl?.startsWith('data:audio/') ? (
                <Headphones className="w-3 h-3" />
              ) : attachment.knowledge ? (
                <BookOpenCheck className="w-3 h-3" />
              ) : (
                <FileText className="w-3 h-3" />
              )}
              <span className="truncate max-w-20">{attachment.name}</span>
              {isUploading && (
                <span className="text-[9px] opacity-75 whitespace-nowrap tabular-nums">{pct}%</span>
              )}
              {phaseLabel && (
                <span className="text-[9px] opacity-60 whitespace-nowrap">{phaseLabel}</span>
              )}
              {attachment.knowledge && (
                <span className="text-[9px] opacity-75 whitespace-nowrap">{attachment.knowledge.chunks} chunks</span>
              )}
              {/* ── Stage 13 UX controls (icon buttons, w-3 h-3) ── */}
              {isUploading && !isPaused && (
                <button
                  type="button"
                  onClick={() => onPauseAttachment(attachment.id)}
                  className="opacity-70 hover:opacity-100"
                  title="Pause — your progress is saved on the server"
                >
                  <Pause className="w-3 h-3" />
                </button>
              )}
              {isPaused && (
                <button
                  type="button"
                  onClick={() => onResumeAttachment(attachment.id)}
                  className="opacity-90 hover:opacity-100"
                  title="Resume upload"
                >
                  <Play className="w-3 h-3" />
                </button>
              )}
              {(isUploading || isPaused) && (
                <button
                  type="button"
                  onClick={() => onCancelAttachment(attachment.id)}
                  className="opacity-60 hover:opacity-100"
                  title="Cancel — re-pick or Retry to resume from where it stopped"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
              {showRetry && (
                <button
                  type="button"
                  onClick={() => onRetryAttachment(attachment.id)}
                  className="opacity-90 hover:opacity-100"
                  title="Retry — resumes from the chunks already on the server"
                >
                  <RotateCw className="w-3 h-3" />
                </button>
              )}
              {showRemove && (
                <button
                  type="button"
                  onClick={() => onRemoveAttachment(attachment.id)}
                  className="opacity-60 hover:opacity-100"
                  title="Remove"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
              {/* ── mini progress bar (uploading / paused only) ── */}
              {u && (isUploading || isPaused) && (
                <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-black/20 rounded-b-lg overflow-hidden pointer-events-none">
                  <div
                    className="h-full bg-current transition-[width] duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              )}
            </div>
            );
          })}
        </div>
      )}"""

if old_block in s and 'onPauseAttachment(attachment.id)' not in s:
    s = s.replace(old_block, new_block, 1)
    print('[panel] chip block replaced')
elif 'onPauseAttachment(attachment.id)' in s:
    print('[panel] chip block already replaced')
else:
    raise SystemExit('[panel] chip block anchor not found — file changed?')

write(panel, s)
print('patch_upload_ux_chip done')
