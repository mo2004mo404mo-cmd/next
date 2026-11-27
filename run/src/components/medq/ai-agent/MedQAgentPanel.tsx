'use client';

import React from 'react';
import Image from 'next/image';
import {
  BookOpenCheck,
  Box,
  ChevronDown,
  Clock,
  Cpu,
  FileText,
  FileUp,
  Headphones,
  Loader2,
  Maximize2,
  Mic,
  Minimize2,
  Paperclip,
  Pause,
  Pin,
  PinOff,
  Play,
  Search,
  Send,
  Sparkles,
  Square,
  UploadCloud,
  Volume2,
  VolumeX,
  Wrench,
  X,
  RotateCw,
} from 'lucide-react';
import type { FileAttachment } from '@/lib/agent/file-intelligence';
import type { AgentV2State } from './useAgentV2Stream';
import { SKILL_CATALOG } from './MedQAgentConfig';
import { ComposerSlashPalette, slashPaletteOpen, type SlashPaletteHandle } from './ComposerSlashPalette';
import { ScheduledTasksPopover } from './ScheduledTasksPopover';
import { ThreadHistoryPopover } from './ThreadHistoryPopover';
import { WorkspaceFilesPopover } from './WorkspaceFilesPopover';
import { AgentIntegrationsPopover } from './AgentIntegrationsPopover';
import { ProviderAvatar } from '@/components/medq/byok/shared';
import { BYOK_PROVIDER_BY_ID } from '@/lib/ai/byok-providers';

export type MedQAgentPanelAgent = {
  isStreaming: boolean;
  state: AgentV2State;
  cancel: () => void;
};

type MedQAgentPanelProps = {
  agent: MedQAgentPanelAgent;
  isListening: boolean;
  isSpeaking: boolean;
  isMuted: boolean;
  isPinned: boolean;
  isFullscreen: boolean;
  showSkills: boolean;
  showModels: boolean;
  skillSearch: string;
  filteredSkills: typeof SKILL_CATALOG;
  fileAttachments: FileAttachment[];
  inputText: string;
  asrSupported: boolean;
  isDraggingFile: boolean;
  chatContainerRef: React.RefObject<HTMLDivElement | null>;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onToggleSkills: () => void;
  onToggleMute: () => void;
  onTogglePin: () => void;
  onToggleFullscreen: () => void;
  onClose: () => void;
  onSkillSearchChange: (value: string) => void;
  onUseSkill: (skill: (typeof SKILL_CATALOG)[number]) => void;
  onOpenModelSearch: () => void;
  onCloseModelSearch: () => void;
  onOpenUploadFile: () => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onRemoveAttachment: (id: string) => void;
  /** Stage 13 UX: pause the in-flight chunk (confirmed chunks stay server-side). */
  onPauseAttachment: (id: string) => void;
  /** Stage 13 UX: resume a paused attachment. */
  onResumeAttachment: (id: string) => void;
  /** Stage 13 UX: cancel — confirmed chunks stay; Retry resumes from them. */
  onCancelAttachment: (id: string) => void;
  /** Stage 13 UX: retry a failed/cancelled attachment — RESUMES from the
   *  server's stored chunks, not a re-upload from zero. */
  onRetryAttachment: (id: string) => void;
  onFileInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputTextChange: (value: string) => void;
  onSubmitInput: (value: string) => void;
  /** Dictation mode — starts browser speech-to-text; invoking it again stops
   *  and auto-sends. */
  onToggleVoice: () => void;
  /** True while hands-free dictation mode keeps the mic cycling. */
  handsFreeActive?: boolean;
  /** LLM model selection for the chat itself ("providerId:modelId", '' = default). */
  llmModel: string;
  /** Flattened, grouped catalog of selectable chat models (from /api/providers). */
  llmModelOptions: LlmModelOptionGroup[];
  onLlmModelChange: (value: string) => void;
  modelContent?: React.ReactNode;
  timeline: React.ReactNode;
  /** Server thread the panel is currently continuing (history switcher). */
  currentThreadId: string | null;
  /** Load a past thread's transcript and adopt it for the next turn. */
  onSelectThread: (threadId: string) => void;
  /** Clear the panel and start a fresh thread on the next send. */
  onNewChat: () => void;
  /** Bump to refresh the history list (e.g. after a thread switch). */
  historyRefreshKey: number;
};

export type LlmModelOptionGroup = {
  providerId: string;
  providerName: string;
  /** /logos/ brand mark for the provider, when one is known. */
  icon?: string | null;
  byok?: boolean;
  models: Array<{ value: string; label: string }>;
};

/** Brand tile for a picker group: the provider's /logos/ mark (registry
 *  fallback), inverted automatically for the monochrome marks. */
function groupAvatar(group: Pick<LlmModelOptionGroup, 'providerId' | 'providerName' | 'icon'>) {
  const icon = group.icon ?? BYOK_PROVIDER_BY_ID[group.providerId]?.icon;
  if (!icon) return null;
  return <ProviderAvatar provider={{ id: group.providerId, name: group.providerName, icon }} size="xs" />;
}

export function MedQAgentPanel({
  agent,
  isListening,
  isSpeaking,
  isMuted,
  isPinned,
  isFullscreen,
  showSkills,
  showModels,
  skillSearch,
  filteredSkills,
  fileAttachments,
  inputText,
  asrSupported,
  isDraggingFile,
  fileInputRef,
  onToggleSkills,
  onToggleMute,
  onTogglePin,
  onToggleFullscreen,
  onClose,
  onSkillSearchChange,
  onUseSkill,
  onOpenModelSearch,
  onCloseModelSearch,
  onOpenUploadFile,
  onDragOver,
  onDragLeave,
  onDrop,
  onRemoveAttachment,
  onPauseAttachment,
  onResumeAttachment,
  onCancelAttachment,
  onRetryAttachment,
  onFileInputChange,
  onInputTextChange,
  onSubmitInput,
  onToggleVoice,
  handsFreeActive,
  llmModel,
  llmModelOptions,
  onLlmModelChange,
  modelContent,
  timeline,
  currentThreadId,
  onSelectThread,
  onNewChat,
  historyRefreshKey,
}: MedQAgentPanelProps) {
  // LLM model picker dropdown: local UI state only (selection lives in V3).
  const [llmPickerOpen, setLlmPickerOpen] = React.useState(false);
  const [llmSearch, setLlmSearch] = React.useState('');
  const llmSearchRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (llmPickerOpen) {
      setLlmSearch('');
      // Focus the search field once the dropdown mounts.
      const t = setTimeout(() => llmSearchRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [llmPickerOpen]);

  const selectedOption = React.useMemo(() => {
    for (const group of llmModelOptions) {
      const hit = group.models.find((m) => m.value === llmModel);
      if (hit) return { group, option: hit };
    }
    return null;
  }, [llmModelOptions, llmModel]);

  const filteredGroups = React.useMemo(() => {
    const q = llmSearch.trim().toLowerCase();
    if (!q) return llmModelOptions;
    return llmModelOptions
      .map((g) => ({
        ...g,
        models: g.models.filter(
          (m) => m.label.toLowerCase().includes(q) || g.providerName.toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.models.length > 0);
  }, [llmModelOptions, llmSearch]);

  // Composer textarea — auto-grows with content up to ~5 lines, then scrolls.
  const composerTextareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  React.useEffect(() => {
    const el = composerTextareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 112)}px`;
  }, [inputText]);

  // ── Slash-command palette ("/" at the start of the composer) ──
  // The textarea owns the key events; the palette (rendered above it)
  // owns the filtered command list and exposes pickHighlighted/count via
  // an imperative handle. Esc dismisses until the composer no longer
  // starts with "/".
  const slashPaletteRef = React.useRef<SlashPaletteHandle | null>(null);
  const [slashDismissed, setSlashDismissed] = React.useState(false);
  const [slashHighlight, setSlashHighlight] = React.useState(0);
  const slashActive = slashPaletteOpen(inputText) && !slashDismissed;
  React.useEffect(() => {
    if (!inputText.startsWith('/')) setSlashDismissed(false);
  }, [inputText]);
  const pickSlashText = React.useCallback((text: string) => {
    onInputTextChange(text);
    // Focus + move the caret to the end so the learner finishes the sentence.
    requestAnimationFrame(() => {
      const el = composerTextareaRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    });
  }, [onInputTextChange]);
  const runSlashAction = React.useCallback((action: 'new-chat' | 'browse-skills') => {
    if (action === 'new-chat') {
      onInputTextChange('');
      onNewChat();
    } else if (action === 'browse-skills') {
      onInputTextChange('');
      onToggleSkills();
    }
  }, [onInputTextChange, onNewChat, onToggleSkills]);

  // Docked width clamps to the viewport so narrow screens (phones) never
  // lose the panel's left edge off-screen; fullscreen still covers all.
  const panelWidth = isFullscreen && !isPinned ? '100%' : 'min(420px, calc(100vw - 32px))';
  const panelHeight = isFullscreen && !isPinned ? '100%' : 'min(640px, calc(100vh - 120px))';
  const panelRight = isFullscreen && !isPinned ? '0' : '24px';
  const panelBottom = isFullscreen && !isPinned ? '0' : '88px';

  return (
    <div
      className="fixed z-40 flex flex-col"
      style={{
        right: panelRight,
        bottom: panelBottom,
        width: panelWidth,
        height: panelHeight,
        background: 'rgba(11,14,26,0.98)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: isFullscreen && !isPinned ? '0' : '20px',
        animation: 'agentExpandIn 0.3s ease-out',
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
      }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {isDraggingFile && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
          style={{
            background: 'rgba(0,229,160,0.08)',
            border: '2px dashed rgba(0,229,160,0.4)',
            borderRadius: isFullscreen && !isPinned ? '0' : '20px',
          }}
        >
          <div className="flex flex-col items-center gap-2 text-[#00e5a0]">
            <FileUp className="w-8 h-8" />
            <div className="text-xs font-semibold">Drop files to attach</div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between p-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #00e5a0, #8b5cf6)' }}
          >
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-xs font-semibold text-[#e8ecf4]">MedQ AI v3</div>
            <div className="text-[10px] text-[#5a6478]">
              {agent.isStreaming
                ? `Working · ${agent.state.phase}`
                : isListening
                  ? 'Listening…'
                  : isSpeaking
                    ? 'Speaking…'
                    : 'Ready'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <ThreadHistoryPopover
            currentThreadId={currentThreadId}
            onSelectThread={onSelectThread}
            onNewChat={onNewChat}
            disabled={agent.isStreaming}
            refreshKey={historyRefreshKey}
          />
          <ScheduledTasksPopover />
          <WorkspaceFilesPopover onAsk={(text) => onInputTextChange(text)} />
          <AgentIntegrationsPopover onUseSkill={(name) => onInputTextChange(`Use my "${name}" skill for this: `)} />
          <button
            onClick={onToggleSkills}
            className="p-1.5 rounded hover:bg-white/5 text-[#9ca3b8]"
            title="Browse skills"
            aria-label="Browse skills"
          >
            <Wrench className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onToggleMute}
            className="p-1.5 rounded hover:bg-white/5 text-[#9ca3b8]"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onTogglePin}
            className="p-1.5 rounded hover:bg-white/5 text-[#9ca3b8]"
            title={isPinned ? 'Unpin' : 'Pin'}
          >
            {isPinned ? <PinOff className="w-3.5 h-3.5" /> : <Pin className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onToggleFullscreen}
            className="p-1.5 rounded hover:bg-white/5 text-[#9ca3b8]"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-white/5 text-[#9ca3b8]"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {showSkills && (
        <div className="absolute inset-x-0 top-15.25 z-30 max-h-[70%] overflow-y-auto border-b border-white/10 bg-[#111525] p-3 shadow-2xl">
          <div className="mb-3 flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#5a6478]" />
            <input
              value={skillSearch}
              onChange={(event) => onSkillSearchChange(event.target.value)}
              placeholder="Search skills..."
              className="min-w-0 flex-1 bg-transparent text-xs text-[#e8ecf4] outline-none placeholder:text-[#5a6478]"
              autoFocus
            />
            <span className="text-[10px] text-[#5a6478]">{filteredSkills.length}</span>
          </div>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {filteredSkills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => onUseSkill(skill)}
                className="flex items-start gap-2 rounded-lg border border-white/5 bg-white/3 p-2 text-left hover:border-[#00e5a0]/40 hover:bg-[#00e5a0]/6"
              >
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00e5a0]" />
                <span className="min-w-0">
                  <span className="block truncate text-[11px] font-medium text-[#e8ecf4]">{skill.name}</span>
                  <span className="block text-[9px] text-[#5a6478]">{skill.category}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="mt-3 flex gap-2 border-t border-white/5 pt-3">
            <button
              onClick={onOpenModelSearch}
              className="flex items-center gap-1.5 rounded-md border border-white/10 px-2 py-1.5 text-[10px] text-[#9ca3b8] hover:text-[#e8ecf4]"
            >
              <Box className="h-3 w-3" /> 3D models
            </button>
            <button
              onClick={onOpenUploadFile}
              className="flex items-center gap-1.5 rounded-md border border-white/10 px-2 py-1.5 text-[10px] text-[#9ca3b8] hover:text-[#e8ecf4]"
            >
              <UploadCloud className="h-3 w-3" /> Upload file
            </button>
          </div>
        </div>
      )}

      {showModels && modelContent && (
        <div className="absolute inset-0 z-40 overflow-y-auto bg-[#0c0e14]">
          <div className="flex items-center justify-between border-b border-white/10 p-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#e8ecf4]">
              <Box className="h-4 w-4 text-[#00e5a0]" /> 3D anatomy models
            </div>
            <button onClick={onCloseModelSearch} className="rounded p-1 text-[#9ca3b8] hover:bg-white/10" title="Close model search">
              <X className="h-4 w-4" />
            </button>
          </div>
          {modelContent}
        </div>
      )}

      {timeline}

      {fileAttachments.length > 0 && (
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
      )}

      {/* ── Composer — the single professional input bar ──────────────────
          • One morphing Send/Stop button (industry pattern): while the agent
            runs, the SAME button in the SAME position becomes the stop
            control — the send button is never covered, replaced by a foreign
            control, or shifted around.
          • Voice dictation uses browser speech-to-text; tap, speak, and the
            field fills live and auto-sends after a natural pause (or tap again).
          • The field stays editable while the agent works, so the learner can
            compose the next question; Enter simply waits until the run ends. */}
      <div className="p-3 border-t border-white/5">
        <div
          className={`rounded-2xl border bg-white/5 transition-colors relative ${
            isListening
              ? 'border-[#ff5757]/50'
              : 'border-white/10 focus-within:border-[#00e5a0]/40'
          }`}
        >
          {slashActive && (
            <ComposerSlashPalette
              ref={slashPaletteRef}
              query={inputText}
              highlight={slashHighlight}
              onHighlightChange={setSlashHighlight}
              onPickText={pickSlashText}
              onAction={runSlashAction}
              onClose={() => setSlashDismissed(true)}
            />
          )}
          <textarea
            ref={composerTextareaRef}
            value={inputText}
            rows={1}
            onChange={(event) => onInputTextChange(event.target.value)}
            onKeyDown={(event) => {
              // Slash palette keys take precedence while it is open.
              if (slashActive && slashPaletteOpen(inputText)) {
                if (event.key === 'ArrowDown') {
                  event.preventDefault();
                  const count = slashPaletteRef.current?.count() ?? 0;
                  setSlashHighlight((h) => Math.min(h + 1, Math.max(count - 1, 0)));
                  return;
                }
                if (event.key === 'ArrowUp') {
                  event.preventDefault();
                  setSlashHighlight((h) => Math.max(h - 1, 0));
                  return;
                }
                if ((event.key === 'Enter' || event.key === 'Tab') && !event.shiftKey) {
                  event.preventDefault();
                  slashPaletteRef.current?.pickHighlighted();
                  return;
                }
                if (event.key === 'Escape') {
                  event.preventDefault();
                  setSlashDismissed(true);
                  return;
                }
              }
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                if (!agent.isStreaming) onSubmitInput(inputText);
              }
            }}
                placeholder={isListening
                  ? handsFreeActive
                    ? 'Hands-free listening… speak, pause, it sends itself'
                    : 'Listening… speak now'
                  : 'Ask me anything…  ·  type / for commands'}
            className="block w-full resize-none overflow-y-auto bg-transparent px-3.5 pb-1 pt-2.5 text-[12px] leading-5 text-[#e8ecf4] outline-none placeholder:text-[#5a6478]"
            style={{ maxHeight: '112px' }}
          />

          <div className="flex items-center gap-1.5 px-2 pb-2 pt-0.5">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="shrink-0 rounded-xl p-2 text-[#9ca3b8] hover:bg-white/5 hover:text-[#e8ecf4]"
              title="Attach file"
              aria-label="Attach file"
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={onFileInputChange}
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.txt,.csv,.xlsx,.xls,.ppt,.pptx,.svg,.webp,.mp3,.wav,.m4a,.aac,.ogg,.flac,.webm"
            />

            {/* LLM model picker — routes the chat through the selected provider
                (BYOK medq-router models go through the FreeLLM AI Router). */}
            <div className="relative min-w-0 shrink">
              <button
                type="button"
                onClick={() => setLlmPickerOpen((v) => !v)}
                className="flex items-center gap-1 rounded-xl border px-2 py-1.5 text-[10px] max-w-[150px] hover:bg-white/5 disabled:opacity-50"
                style={{
                  borderColor: selectedOption?.group.byok ? 'rgba(0,229,160,0.45)' : 'rgba(255,255,255,0.1)',
                  background: selectedOption?.group.byok ? 'rgba(0,229,160,0.08)' : 'transparent',
                  color: selectedOption?.group.byok ? '#00e5a0' : '#9ca3b8',
                }}
                disabled={agent.isStreaming}
                title={
                  selectedOption
                    ? `Chat model: ${selectedOption.group.providerName} · ${selectedOption.option.label}${selectedOption.group.byok ? ' (via FreeLLM AI Router)' : ''}`
                    : 'Chat model: server default'
                }
              >
                {selectedOption ? (
                  groupAvatar(selectedOption.group) ?? <Cpu className="w-3 h-3 shrink-0" />
                ) : (
                  <Cpu className="w-3 h-3 shrink-0" />
                )}
                <span className="truncate">
                  {selectedOption ? selectedOption.option.label : 'Auto'}
                </span>
                <ChevronDown className="w-3 h-3 shrink-0" />
              </button>

              {llmPickerOpen && (
                <div className="absolute bottom-full left-0 mb-2 z-50 w-[300px] max-h-[280px] flex flex-col rounded-xl border border-white/10 bg-[#111525] shadow-2xl">
                  <div className="flex items-center gap-2 p-2 border-b border-white/5">
                    <Search className="w-3.5 h-3.5 text-[#5a6478] shrink-0" />
                    <input
                      ref={llmSearchRef}
                      value={llmSearch}
                      onChange={(event) => setLlmSearch(event.target.value)}
                      placeholder="Search models…"
                      className="min-w-0 flex-1 bg-transparent text-xs text-[#e8ecf4] outline-none placeholder:text-[#5a6478]"
                    />
                    <button
                      onClick={() => setLlmPickerOpen(false)}
                      className="rounded p-1 text-[#9ca3b8] hover:bg-white/10"
                      title="Close"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="overflow-y-auto p-1.5">
                    <button
                      onClick={() => {
                        onLlmModelChange('');
                        setLlmPickerOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[11px] hover:bg-white/5 ${llmModel === '' ? 'text-[#00e5a0]' : 'text-[#e8ecf4]'}`}
                    >
                      <Sparkles className="w-3 h-3 shrink-0 text-[#00e5a0]" />
                      <span className="flex-1">Auto · server default</span>
                      {llmModel === '' && <span className="text-[9px] text-[#00e5a0]">active</span>}
                    </button>
                    {filteredGroups.map((group) => (
                      <div key={group.providerId} className="mt-1.5">
                        <div className="flex items-center gap-1.5 px-2 py-1 text-[9px] uppercase tracking-wide text-[#5a6478]">
                          {groupAvatar(group)}
                          {group.providerName}
                          {group.byok && (
                            <span className="normal-case rounded px-1 py-px text-[8px]" style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0' }}>
                              router
                            </span>
                          )}
                        </div>
                        {group.models.map((m) => (
                          <button
                            key={m.value}
                            onClick={() => {
                              onLlmModelChange(m.value);
                              setLlmPickerOpen(false);
                            }}
                            className={`w-full flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[11px] hover:bg-white/5 truncate ${llmModel === m.value ? 'text-[#00e5a0]' : 'text-[#e8ecf4]'}`}
                          >
                            <span className="flex-1 truncate">{m.label}</span>
                            {llmModel === m.value && <span className="text-[9px] text-[#00e5a0] shrink-0">active</span>}
                          </button>
                        ))}
                      </div>
                    ))}
                    {filteredGroups.length === 0 && (
                      <div className="px-2 py-3 text-[10px] text-[#5a6478]">No models match “{llmSearch}”.</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1" />

            <button
              onClick={onToggleVoice}
              className="shrink-0 rounded-xl border border-white/10 px-2.5 py-2 hover:bg-white/5 disabled:opacity-30"
              style={{
                color: isListening ? '#ff5757' : '#9ca3b8',
                background: isListening ? 'rgba(255,87,87,0.1)' : 'transparent',
                ...(isListening ? { animation: 'agentPulseGlowRed 1.6s ease-out infinite' } : {}),
              }}
              title={isListening ? 'Stop & send dictation' : 'Dictate a message'}
              aria-label={isListening ? 'Stop voice input and send' : 'Dictate a message'}
              disabled={agent.isStreaming || !asrSupported}
            >
              <Mic className="h-4 w-4" />
            </button>

            {/* Single morphing Send/Stop control — same position, same style,
                zero layout shift between states. */}
            <button
              onClick={agent.isStreaming ? agent.cancel : () => onSubmitInput(inputText)}
              disabled={!agent.isStreaming && !inputText.trim()}
              className="shrink-0 rounded-xl p-2 transition-all hover:brightness-110 active:scale-95 disabled:opacity-30 disabled:hover:brightness-100 disabled:active:scale-100"
              style={{ background: 'linear-gradient(135deg, #00e5a0, #8b5cf6)' }}
              title={agent.isStreaming ? 'Stop' : 'Send'}
              aria-label={agent.isStreaming ? 'Stop the agent' : 'Send message'}
            >
              {agent.isStreaming ? (
                <Square className="h-3.5 w-3.5 text-white" fill="#fff" />
              ) : (
                <Send className="h-4 w-4 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
