'use client';
// ─── STEP 1 — Imports ───────────────────────────────────────────────────────
import { useState, useRef, useEffect, useCallback, useMemo, useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';

// V3: UI state + action engine (shared with both predecessors)
import { useUIState } from './UIStateContext';
import { useUIActionEngine, type UIAction } from './UIActionEngine';

import type { MultimodalContent } from '@/lib/agent/multimodal-types';

// V4: file intelligence — client-side OCR / classification / summary
import type { FileAttachment } from '@/lib/agent/file-intelligence';
import { isImageFile, isAudioFile } from '@/lib/agent/file-intelligence';
import {
  useAgentV2Stream,
  type AgentV2State,
  type AgentAction,
  type MessageCard,
  type PendingClarification,
} from './useAgentV2Stream';
import {
  formatClarificationAnswers,
  normalizeClarificationPayload,
  type ClarificationAnswers,
  type ClarificationPayload,
} from '@/lib/agent/clarification';
import { getGreeting } from './MedQAgentMessageParts';
import { ANIMATION_STYLES, SKILL_CATALOG, TAB_SUGGESTIONS } from './MedQAgentConfig';
import { useFileAttachments } from './useFileAttachments';
import { useAgentVoice } from './useAgentVoice';
import { MedQAgentTimeline } from './MedQAgentTimeline';
import { MedQAgentOrb } from './MedQAgentFloatingAssistant';
import { MedQAgentPanel, type LlmModelOptionGroup } from './MedQAgentPanel';
import { agentToast, AgentToastViewport } from './agent-ui';

// ─── STEP 2 — Types ─────────────────────────────────────────────────────────
//
// The unified ChatMessage carries EVERYTHING either predecessor needed:
//   • content / role / timestamp          — basic messaging
//   • actions                             — UI actions to execute (legacy + new)
//   • cards                               — rich MessageCard[] for rendering
//   • multimodalContent                   — MultimodalContent[] (charts, etc.)
//   • fileAttachments                     — V4 file context the user attached
//   • feedback                            — thumbs state for the message
//   • agentSnapshot                       — V2's plan/tool/memory snapshot,
//                                           frozen at the moment the response
//                                           completed. This is what lets the
//                                           PlanCard / ToolCallChip /
//                                           MemoryBadge re-render correctly
//                                           for HISTORICAL messages, not just
//                                           the live streaming turn.

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  actions?: AgentAction[];
  cards?: MessageCard[];
  /** V4: Multimodal content blocks (charts, tables, timelines, etc.). */
  multimodalContent?: MultimodalContent[];
  /** V4: File attachments the user added to this message. */
  fileAttachments?: FileAttachment[];
  timestamp: number;
  feedback?: 'positive' | 'negative' | null;
  /** True when this restored assistant answer was persisted mid-generation
   *  (explicit Stop / run hard-cap) — drives the honest "may be incomplete"
   *  hint and retry affordance instead of presenting it as final. */
  interrupted?: boolean;
  /** Receipt labels for UI actions executed for this message (ActionReceipts). */
  executedActions?: string[];
  /** V2: Frozen snapshot of the agent's internal state at completion. */
  agentSnapshot?: {
    plan: AgentV2State['plan'];
    toolCalls: AgentV2State['toolCalls'];
    llmCallCount: AgentV2State['llmCallCount'];
    memory: AgentV2State['memory'];
    stepResults: AgentV2State['stepResults'];
    /** Knowledge citations ([K#]) collected during the turn — powers hover-cards. */
    citations?: AgentV2State['citations'];
    /** Web citations ([S#]) collected during the turn — powers source cards. */
    webCitations?: AgentV2State['webCitations'];
  };
}

// ─── STEP 3 — Constants ────────────────────────────────────────────────────
//
// TAB_SUGGESTIONS: per-tab "starter prompt" chips shown when the chat is
// empty. Identical in both predecessors — kept as-is.

/** Shape returned by GET /api/agent/threads/:id/messages (StoredMessage). */
interface StoredThreadMessage {
  role?: string;
  content?: string;
  createdAt?: string;
  interrupted?: boolean;
  toolCalls?: Array<{ id?: string; name: string; args?: unknown }> | null;
  toolResults?: Array<{ toolCallId?: string; toolName: string; content: string; isError?: boolean }> | null;
}

/** Rebuild a ChatMessage.agentSnapshot from a persisted thread message so a
 * restored conversation keeps its file cards (Preview / Download), execution
 * timeline and tool chips — not just the raw text.
 *
 * Without this join, switching to a past thread dropped the server-side
 * toolCalls/toolResults on the floor: the "N files created" strip vanished,
 * and whenever the model's answer text didn't ALSO embed the download link,
 * the artifact became completely unreachable (the file still exists, the
 * chat just stopped linking to it). Pairing call ↔ result by correlation id
 * (toolCallId) brings the cards back exactly as they rendered live. */
function snapshotFromStoredMessage(
  m: StoredThreadMessage,
  ts: number,
): ChatMessage['agentSnapshot'] | undefined {
  const calls = m.toolCalls ?? [];
  const results = m.toolResults ?? [];
  if (calls.length === 0 && results.length === 0) return undefined;

  const toolCalls: NonNullable<ChatMessage['agentSnapshot']>['toolCalls'] = [];
  const pairedResultIds = new Set<string>();

  calls.forEach((call, index) => {
    const id = call.id ?? `restored-call-${index}`;
    // Pair by correlation id; fall back to the first unpaired result with the
    // same tool name (providers that omit ids persist result rows without one).
    const result = results.find((r) => r.toolCallId === id)
      ?? results.find((r) => !r.toolCallId && r.toolName === call.name && !pairedResultIds.has(r.toolName));
    if (result) pairedResultIds.add(result.toolCallId ?? result.toolName);
    toolCalls.push({
      id,
      toolName: call.name,
      args: call.args,
      status: result ? (result.isError ? 'failed' : 'completed') : 'completed',
      result: result?.content ?? '',
      startedAt: ts,
    });
  });

  // Orphan results (their call row wasn't persisted — e.g. an answer saved
  // mid-run) can still carry the artifact payload; synthesize their calls so
  // file cards survive those turns too.
  results.forEach((result, index) => {
    const id = result.toolCallId ?? '';
    if (!id || pairedResultIds.has(id)) return;
    toolCalls.push({
      id,
      toolName: result.toolName,
      args: undefined,
      status: result.isError ? 'failed' : 'completed',
      result: result.content,
      startedAt: ts,
    });
  });

  if (toolCalls.length === 0) return undefined;
  return { plan: null, toolCalls, llmCallCount: 0, memory: null, stepResults: [] };
}

const AnatomyDiscover = dynamic(() => import('@/components/medq/AnatomyDiscover'), {
  ssr: false,
  loading: () => <div className="p-4 text-xs text-[#9ca3b8]">Loading model search...</div>,
});

/* ════════════════════════════════════════════════════════════════════════════
 *  MAIN COMPONENT — STEPS 6 through 22 below
 * ════════════════════════════════════════════════════════════════════════════ */

/** Subscribe to the browser's online/offline transport events (consumed by
 * useSyncExternalStore — the React-recommended pattern for this signal). */
function subscribeOnline(callback: () => void): () => void {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

/** Human label for an executed UI action — becomes an ActionReceipt. */
function receiptLabelFor(action: AgentAction): string {
  const ui = action.uiAction as { type?: string; target?: string; tabId?: string; module?: string } | undefined;
  if (ui?.type === 'navigate' && ui.target) return `Navigated to ${ui.target}`;
  if (ui?.type === 'switch_tab' && ui.tabId) return `Switched to ${ui.tabId}`;
  if (ui?.type === 'navigate_module' && ui.module) return `Opened ${ui.module}`;
  if (ui?.type === 'open_dialog' && (ui as { dialogId?: string }).dialogId) return 'Opened dialog';
  const description = action.description?.trim();
  if (description) return description.charAt(0).toUpperCase() + description.slice(1);
  return action.type.replace(/_/g, ' ');
}

// ─── STEP 6 — Main component shell ─────────────────────────────────────────
//
// Props:
//   • onAction    — legacy escape hatch. Called for actions that don't have
//                   a structured uiAction (e.g. custom server-side actions).
//   • currentTab  — optional explicit tab key. If absent, we fall back to
//                   uiState.currentPage (V3 reads BOTH, V2 only read the prop).
//
// We pull three context/hook values:
//   • uiState / getContextSummary  — V3: full UI context (active forms,
//                                     dialogs, selected entities, filters,
//                                     focused control). Forwarded to the
//                                     agent so the planner can reason about
//                                     what the user is currently doing.
//   • executeAction                — V3: UIActionEngine. Runs structured
//                                     UIActions (navigate, fill form, etc.)
//                                     directly on the frontend without a
//                                     round-trip.
//   • agent                        — V2: the SSE planner-executor hook.
//                                     Owns streaming state, plan, tool calls,
//                                     memory, cancel. We feed it an
//                                     onComplete callback that triggers TTS.

/** Messaging bridge: when a turn used the messaging tools (sends, DMs,
 * groups), tell the Messages tab to refresh — and open the room when a NEW
 * room was created. The messages page listens for these window events
 * (same plumbing the old v6 chat actions used). */
function dispatchChatBridgeEvents(toolCalls: Array<{ toolName: string; status: string; result?: string }> | undefined) {
  if (typeof window === 'undefined' || !toolCalls?.length) return;
  let refresh = false;
  let openRoomId: string | null = null;
  let openedNewRoom = false;
  for (const call of toolCalls) {
    if (call.status !== 'completed' || typeof call.result !== 'string') continue;
    if (!['send_chat_message', 'start_direct_message', 'create_chat_group'].includes(call.toolName)) continue;
    try {
      const parsed = JSON.parse(call.result) as { sent?: boolean; started?: boolean; created?: boolean; roomId?: string };
      if (parsed?.sent || parsed?.started || parsed?.created) {
        refresh = true;
        if (typeof parsed.roomId === 'string' && parsed.roomId) openRoomId = parsed.roomId;
        if (parsed?.started || parsed?.created) openedNewRoom = true;
      }
    } catch { /* not JSON — ignore */ }
  }
  if (!refresh) return;
  window.dispatchEvent(new CustomEvent('medq-agent-refresh-chat', { detail: openRoomId ? { roomId: openRoomId } : {} }));
  if (openRoomId && openedNewRoom) {
    // New room → give the page a beat to process the refresh first.
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('medq-agent-open-chat-room', { detail: { roomId: openRoomId } }));
    }, 350);
  }
}

export function MedQAgentV3({
  onAction,
  currentTab,
}: {
  onAction: (action: AgentAction) => void;
  currentTab?: string;
}) {
  const { state: uiState, getContextSummary } = useUIState();
  const { executeAction } = useUIActionEngine();
  const mutedRef = useRef(false);
  const speakRef = useRef<(text: string) => void>(() => undefined);
  const inputTextRef = useRef('');
  const transcriptHandlerRef = useRef<(text: string, submit: boolean) => void>(() => undefined);

  // ── ask_user (structured clarification) ──
  // Component-held state (NOT turn state): the form card must outlive the
  // turn's DONE so the learner can answer at their own pace. The live SSE
  // event sets it; the restore effect below re-derives it from the last
  // assistant message's persisted ask_user tool call after a refresh or
  // thread switch. clarificationAnsweredId flips the card to its compact
  // "Answered" summary once submitted (the answers themselves travel as the
  // next user message).
  const [pendingClarification, setPendingClarification] = useState<PendingClarification | null>(null);
  const [clarificationAnsweredId, setClarificationAnsweredId] = useState<string | null>(null);
  // Chat-specific follow-up chips (LLM-generated after each answer; declared
  // here so startNewChat can reset them).
  const [chatFollowUps, setChatFollowUps] = useState<string[]>([]);
  const followUpKeyRef = useRef<string | null>(null);

  const agent = useAgentV2Stream({
    onClarification: (payload: ClarificationPayload) => {
      setPendingClarification((prev) =>
        prev?.clarificationId === payload.clarificationId ? prev : payload);
      setClarificationAnsweredId((prev) =>
        prev === payload.clarificationId ? prev : null);
    },
  });

  // ── Thread history switching ──
  // The active server thread lives in the stream hook (threadIdRef); the
  // existing `threadId` state below (declared with the other agent-ui wiring
  // state) mirrors it for React re-render (history-list highlight + the
  // restore-on-open effect). historyRefreshKey bumps whenever a switch or
  // new-chat happens so the popover reloads its list.
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);

  /** Load a past thread's transcript into the panel and adopt it so the
   * next send() continues that conversation server-side. Guards against a
  * running turn (the abort would race the reply's persistence). */
  const switchThread = useCallback(async (threadId: string) => {
    if (agent.isStreaming) {
      agentToast({
        title: 'Agent is busy',
        description: 'Wait for the current reply to finish before switching conversations.',
        variant: 'warning',
        durationMs: 4000,
      });
      return;
    }
    try {
      const res = await fetch(`/api/agent/threads/${encodeURIComponent(threadId)}/messages`, {
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json() as { messages?: StoredThreadMessage[] };
      const restored: ChatMessage[] = (data.messages ?? [])
        .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim() !== '')
        .map((m, index) => {
          const ts = m.createdAt ? (Date.parse(m.createdAt) || Date.now()) : Date.now();
          return {
            id: `restored-${threadId}-${index}-${m.createdAt ?? ''}`,
            role: m.role as 'user' | 'assistant',
            content: m.content as string,
            timestamp: ts,
            interrupted: m.interrupted === true,
            // File cards / tool chips / timeline survive the thread switch —
            // the snapshot join keeps past artifacts reachable (the whole
            // point of the "N files created" strip).
            agentSnapshot: m.role === 'assistant' ? snapshotFromStoredMessage(m, ts) : undefined,
          };
        });
      agent.reset();
      agent.setThreadId(threadId);
      setThreadId(threadId);
      setMessages(restored);
      setHistoryRefreshKey((k) => k + 1);
      agentToast({
        title: 'Conversation loaded',
        description: `${restored.length} message${restored.length === 1 ? '' : 's'} restored — the next reply continues this thread.`,
        variant: 'success',
      });
    } catch {
      agentToast({
        title: 'Could not load conversation',
        description: 'The thread may have been deleted. Try another one.',
        variant: 'error',
        durationMs: 5000,
      });
    }
  }, [agent]);

  /** Clear the panel and start a fresh thread on the next send. */
  const startNewChat = useCallback(() => {
    if (agent.isStreaming) {
      agentToast({
        title: 'Agent is busy',
        description: 'Wait for the current reply to finish first.',
        variant: 'warning',
        durationMs: 4000,
      });
      return;
    }
    agent.reset();
    agent.setThreadId(null);
    setThreadId(null);
    setMessages([]);
    setRestoredApprovals([]);
    setAwaitingServerReply(false);
    setPendingClarification(null);
    setClarificationAnsweredId(null);
    setChatFollowUps([]);
    followUpKeyRef.current = null;
    try {
      localStorage.removeItem('medq-agent-chat-v3');
      sessionStorage.removeItem('medq-agent-chat-v3');
    } catch { /* private mode */ }
    setHistoryRefreshKey((k) => k + 1);
  }, [agent]);

  // ─── STEP 7 — State & refs ──────────────────────────────────────────────
  //
  // State is a superset of V4 and V2:
  //   • isOpen / isFullscreen / isMuted                  — V2 (kept)
  //   • isListening / isSpeaking / isPinned / copiedId   — V4 (ported back)
  //   • asrSupported                                     — V4 (feature-detect)
  //   • messages / inputText / showProactive             — both
  //   • fileAttachments / isDraggingFile                 — V4 (ported back)
  //
  // Refs:
  //   • recognitionRef        — Web Speech API recognizer instance
  //   • audioRef              — <audio> element for server TTS playback
  //   • chatEndRef / chatContainerRef — scroll anchors
  //   • mediaRecorderRef      — MediaRecorder fallback for ASR
  //   • audioChunksRef        — blob chunks accumulated during recording
  //   • ttsAbortRef           — AbortController for cancelable server TTS
  //   • orbRef                — the floating button (used for drag math)
  //   • orbPosRef             — current orb drag offset
  //   • fileInputRef          — hidden <input type="file"> for the paperclip
  //   • isMutedRef            — ref mirror of isMuted so the agent's
  //                             onComplete callback (captured once) can read
  //                             the latest value without re-subscribing.

  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  // Conversation cache lives in localStorage (NOT sessionStorage): a refresh
  // in a NEW tab (or "Open in new tab" from the preview panel) must still see
  // the conversation — sessionStorage is per-tab and silently lost it. The
  // one-time migration below also adopts any legacy sessionStorage copy.
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('medq-agent-chat-v3')
        ?? sessionStorage.getItem('medq-agent-chat-v3');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? (parsed as ChatMessage[]) : [];
    } catch {
      return [];
    }
  });
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showProactive, setShowProactive] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [skillSearch, setSkillSearch] = useState('');
  const [skills, setSkills] = useState<typeof SKILL_CATALOG>(SKILL_CATALOG);
  const [showModels, setShowModels] = useState(false);

  // ── Chat model selection ("MedQ ↔ FreeLLM link") ──
  // The agent chat route (/api/agent/chat/v2) accepts body.model as
  // "providerId:modelId" and resolves it through the same BYOK-aware resolver
  // as every other MedQ generation surface. Picking a medq-router:* model here
  // routes the conversation through the FreeLLM AI Router (unified key → /v1
  // → sidecar → failover across the user's custom endpoints). '' = Auto
  // (server default). Persisted per browser so the choice survives reloads.
  const [llmModel, setLlmModel] = useState(() => {
    if (typeof window === 'undefined') return '';
    try {
      return localStorage.getItem('medq-agent-llm-model') ?? '';
    } catch {
      return '';
    }
  });
  const [llmModelOptions, setLlmModelOptions] = useState<LlmModelOptionGroup[]>([]);

  // ── agent-ui wiring state ──
  // • online           — browser transport state via useSyncExternalStore
  //                      (ConnectionStatusBanner)
  // • undoNav          — previous tab to restore when the user undoes the last
  //                      navigation ActionReceipt (the one genuinely reversible
  //                      operation in the engine today)
  // • threadId         — server thread id, persisted so a reload mid-run can
  //                      re-fetch the persisted answer (completes the network
  //                      recovery story end-to-end)
  // • restoringRef     — re-entrance guard while the thread-history fetch runs
  const online = useSyncExternalStore(
    subscribeOnline,
    () => navigator.onLine,
    () => true,
  );
  const [undoNav, setUndoNav] = useState<{ to: string } | null>(null);
  const [threadId, setThreadId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem('medq-agent-thread-id')
        ?? sessionStorage.getItem('medq-agent-thread-id');
    } catch {
      return null;
    }
  });
  const restoringRef = useRef(false);

  // ── Refresh-mid-run recovery state ──
  // awaitingServerReply: a dangling user turn exists and the server-side run
  // (which survives the page reload) has not persisted its answer yet — the
  // poller below watches the thread store and appends it when it lands.
  // restoredApprovals: HITL requests the parked run is still waiting on,
  // re-fetched after the refresh so the user can decide (and resume the run).
  const [awaitingServerReply, setAwaitingServerReply] = useState(false);
  const [restoredApprovals, setRestoredApprovals] = useState<
    Array<{ approvalId: string; threadId: string; tool: string; capability: string; args: unknown; description?: string }>
  >([]);

  const handleLlmModelChange = useCallback((value: string) => {
    setLlmModel(value);
    try {
      localStorage.setItem('medq-agent-llm-model', value);
    } catch { /* private mode */ }
  }, []);

  // Load the selectable model catalog (server providers + BYOK endpoints,
  // incl. the medq-router "MedQ AI Router (this app)" entry) once opened.
  useEffect(() => {
    if (!isOpen || llmModelOptions.length > 0) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/providers');
        if (!res.ok) return;
        const data = await res.json();
        type RawProvider = {
          id: string;
          name?: string;
          /** /logos/ brand mark, when the catalog knows one. */
          icon?: string | null;
          models?: Array<{ id: string; name?: string }>;
        };
        const groups: LlmModelOptionGroup[] = [];
        // BYOK endpoints first — the medq-router link is the marquee entry.
        for (const p of (data.byok ?? []) as RawProvider[]) {
          if (!p?.id || !Array.isArray(p.models) || p.models.length === 0) continue;
          groups.push({
            providerId: p.id,
            providerName: p.name ?? p.id,
            icon: p.icon ?? null,
            byok: true,
            models: p.models.map((m) => ({
              value: `${p.id}:${m.id}`,
              label: m.name ?? m.id,
            })),
          });
        }
        for (const p of (data.server ?? []) as RawProvider[]) {
          if (!p?.id || !Array.isArray(p.models) || p.models.length === 0) continue;
          // Skip providers already surfaced via BYOK (same ids, BYOK wins).
          if (groups.some((g) => g.providerId === p.id)) continue;
          groups.push({
            providerId: p.id,
            providerName: p.name ?? p.id,
            icon: p.icon ?? null,
            models: p.models.map((m) => ({
              value: `${p.id}:${m.id}`,
              label: m.name ?? m.id,
            })),
          });
        }
        if (!cancelled) setLlmModelOptions(groups);
      } catch {
        /* catalog unavailable — picker just shows Auto */
      }
    })();
    return () => { cancelled = true; };
  }, [isOpen, llmModelOptions.length]);

  // Refs
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── UI-action execution bookkeeping ──
  // The server's ui_action tool streams AgentAction payloads mid-turn; they
  // execute LIVE on arrival (effect below) AND finalizeTurn replays them for
  // receipts. JSON keys deduplicate so each action runs exactly once per
  // turn; the set resets on every new send / thread switch.
  const executedUiActionsRef = useRef<Set<string>>(new Set());
  // Set when a LIVE navigation already happened — finalizeTurn must not
  // overwrite the undo target it captured (the live one is pre-navigation).
  const liveNavAppliedRef = useRef(false);

  // ── Auto-scroll state (pinned-to-bottom with manual-scroll escape) ──
  const pinnedToBottomRef = useRef(true);
  const [showJumpToLatest, setShowJumpToLatest] = useState(false);
  // rAF-coalesced "follow the content" scroll — only when the user is at
  // (or near) the bottom. Instant positioning: smooth animations restart on
  // every token and never catch up in fast streams.
  const followScrollRef = useRef<() => void>(() => {});

  // Ref mirror of isMuted so the agent.onComplete closure (which captures
  // `isMuted` once when the hook mounts) can read the latest value.
  useEffect(() => {
    mutedRef.current = isMuted;
  }, [isMuted]);
  useEffect(() => {
    inputTextRef.current = inputText;
  }, [inputText]);

  const {
    asrSupported,
    isListening,
    isSpeaking,
    handsFree,
    startListening,
    stopListening,
    cancelListening,
    stopHandsFree,
    speak,
    stopSpeaking,
  } = useAgentVoice({ mutedRef, inputTextRef, transcriptHandlerRef });

  // ── Read-aloud (🔊 Listen on assistant messages) ──────────────────────────
  // Reuses useAgentVoice's TTS stack (browser speechSynthesis → server TTS
  // fallback, markdown stripped). Track WHICH message is being read so its
  // action row flips to "Stop"; a second tap (or finishing playback) clears it.
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  useEffect(() => {
    if (!isSpeaking) setSpeakingMessageId(null);
  }, [isSpeaking]);

  const handleSpeakMessage = useCallback(
    (message: { id: string; content: string }) => {
      if (speakingMessageId === message.id) {
        stopSpeaking();
        setSpeakingMessageId(null);
        return;
      }
      setSpeakingMessageId(message.id);
      void speak(message.content);
    },
    [speak, speakingMessageId, stopSpeaking],
  );

  // Voice in the composer is ONE control: a tap starts a LIVE VOICE call
  // (below), the caret's menu offers "Dictate a message" — browser
  // speech-to-text that fills the composer live and auto-sends after a
  // natural pause (or when tapped again). Spoken replies follow the mute
  // toggle in the header — no separate "voice mode" to manage.

  const handleUnsupportedFile = useCallback((fileName: string, supportedTypes: string) => {
    setMessages((previous) => [
      ...previous,
      {
        id: `msg-${Date.now()}-error`,
        role: 'system',
        content: `Unsupported file type: ${fileName}. Supported: ${supportedTypes}`,
        timestamp: Date.now(),
      },
    ]);
  }, [setMessages]);

  // Stage 13 UX: a file above the absolute 100MB cap is rejected before
  // any upload — no attachment is created. The tier-aware cap (visitor
  // 2MB … pro 100MB) is enforced server-side at POST /api/uploads and
  // surfaced on the chip as a precise 413.
  const handleFileTooLarge = useCallback((fileName: string, sizeBytes: number) => {
    const mb = Math.round((sizeBytes / 1024 / 1024) * 10) / 10;
    setMessages((previous) => [
      ...previous,
      {
        id: `msg-${Date.now()}-error`,
        role: 'system',
        content: `${fileName} is ${mb}MB — above the 100MB absolute cap. The per-plan limit is checked when the upload starts.`,
        timestamp: Date.now(),
      },
    ]);
  }, [setMessages]);

  const {
    fileAttachments,
    isDraggingFile,
    handleFileUpload,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    removeAttachment,
    clearAttachments,
    // Stage 13 UX: resumable-upload controls for large chat attachments.
    pauseAttachment,
    resumeAttachment,
    cancelAttachment,
    retryAttachment,
  } = useFileAttachments({ onUnsupportedFile: handleUnsupportedFile, onFileTooLarge: handleFileTooLarge });

  // ─── STEP 10 — Contextual suggestions ───────────────────────────────────
  //
  // V4's generator was strictly better than V2's: it merged the static
  // TAB_SUGGESTIONS with dynamic suggestions derived from the live UI state
  // (open forms, open dialogs, selected entities, focused control, active
  // filters, completed file attachments). V3 keeps V4's generator verbatim
  // and passes its output to both the empty-state chip row and the
  // proactive banner.

  const suggestions = useMemo(() => {
    const tab = currentTab || uiState.currentPage || 'default';
    const baseSuggestions = TAB_SUGGESTIONS[tab] || TAB_SUGGESTIONS['default'];

    const dynamicSuggestions: string[] = [];

    if (uiState.activeForms.length > 0) {
      dynamicSuggestions.push('Fill in the form for me');
    }
    if (uiState.openDialogs.length > 0) {
      dynamicSuggestions.push('Close this dialog');
    }
    if (uiState.selectedEntities.length > 0) {
      dynamicSuggestions.push(
        `What can I do with these ${uiState.selectedEntities[0].entityType}s?`,
      );
    }
    if (uiState.focusedControl.elementId) {
      dynamicSuggestions.push('What should I put in this field?');
    }
    if (uiState.activeFilters.length > 0) {
      dynamicSuggestions.push('Clear all filters');
    }

    if (fileAttachments.length > 0 && fileAttachments.some((a) => a.status === 'complete')) {
      dynamicSuggestions.push('Analyze this file');
      dynamicSuggestions.push('Summarize the uploaded file');
      if (fileAttachments.some((a) => isImageFile(a.type))) {
        dynamicSuggestions.push('Describe this medical image');
      }
      if (fileAttachments.some((a) => isAudioFile(a.type))) {
        dynamicSuggestions.push('Transcribe this audio and make flashcards');
      }
    }

    const merged = [...dynamicSuggestions, ...baseSuggestions];
    return [...new Set(merged)];
  }, [
    currentTab,
    uiState.currentPage,
    uiState.activeForms.length,
    uiState.openDialogs.length,
    uiState.selectedEntities,
    uiState.focusedControl.elementId,
    uiState.activeFilters.length,
    fileAttachments,
  ]);

  // ─── Bootstrap effects ──────────────────────────────────────────────────
  //
  // Three small one-shot effects:
  //   1. Feature-detect Web Speech API for the mic button's enabled state.
  //   2. Load conversation from sessionStorage (V4 had this; V2 dropped it —
  //      we restore it because losing chat on a refresh is jarring).
  //   3. Inject the ANIMATION_STYLES <style> tag once.
  //
  // V4 also had a "show proactive greeting after 3s" timer; V2 used 8s.
  // V3 uses 3s when sessionStorage is empty (matches V4 — feels more
  // inviting on first visit).

  useEffect(() => {
    if (messages.length > 0) return;
    const timer = setTimeout(() => setShowProactive(true), 3000);
    return () => clearTimeout(timer);
  }, [messages.length]);

  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem('medq-agent-chat-v3', JSON.stringify(messages.slice(-50)));
      } catch {}
    }
  }, [messages]);

  // Panel-open state survives a refresh (sessionStorage — intentionally NOT
  // localStorage: a brand-new tab should start closed, but F5 on an open
  // panel should reopen it so the refresh-mid-run recovery row is visible).
  // The write effect skips its FIRST run: this component mounts twice
  // (responsive shell variants) with isOpen=false, and a mount-time
  // remove(key) would clobber the persisted '1' before the restore effect
  // below reads it — exactly the refresh-mid-run scenario it exists for.
  const isOpenPrevRef = useRef<boolean | null>(null);
  useEffect(() => {
    if (isOpenPrevRef.current === null) {
      isOpenPrevRef.current = isOpen; // first run: adopt, never write
      return;
    }
    if (isOpenPrevRef.current === isOpen) return; // no transition
    isOpenPrevRef.current = isOpen;
    try {
      if (isOpen) sessionStorage.setItem('medq-agent-panel-open', '1');
      else sessionStorage.removeItem('medq-agent-panel-open');
    } catch { /* private mode */ }
  }, [isOpen]);
  useEffect(() => {
    try {
      if (sessionStorage.getItem('medq-agent-panel-open') === '1' && messages.length > 0) {
        setIsOpen(true);
      }
    } catch { /* private mode */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Esc closes the panel ────────────────────────────────────────────────────
  // Desktop muscle memory: Escape dismisses the focused surface. The agent run
  // keeps going server-side (detached completion + re-attach on reopen), so
  // hiding mid-turn is safe. Esc inside OTHER text fields (rename row, skill /
  // model searches) belongs to those controls and is never double-handled —
  // only the composer textarea or a non-input target closes the panel.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT') return; // rename row / searches handle their own Esc
      setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (document.getElementById('medq-agent-v3-styles')) return;
    const style = document.createElement('style');
    style.id = 'medq-agent-v3-styles';
    style.textContent = ANIMATION_STYLES;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    let active = true;
    fetch('/api/medq-agent/skills')
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!active || !Array.isArray(data?.skills)) return;
        const serverSkills = data.skills.filter((skill: unknown): skill is (typeof SKILL_CATALOG)[number] => {
          if (!skill || typeof skill !== 'object') return false;
          const item = skill as Record<string, unknown>;
          return typeof item.id === 'string' && typeof item.name === 'string' && typeof item.category === 'string';
        });
        if (serverSkills.length > 0) setSkills(serverSkills);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  // ── Auto-scroll — pinned-to-bottom, token-proof ──
  // The old effect only fired on [messages, streamingText, toolCalls.length]
  // — cards, citations, images and other late-growing blocks left the view
  // behind (the "I have to scroll manually" complaint), and smooth
  // scrollIntoView restarted per token never converged in fast streams.
  // Now: a MutationObserver on the scroll container catches EVERY content
  // growth; a passive scroll listener tracks whether the user is pinned
  // (≤120px from bottom) or deliberately scrolled up; <img> loads resize
  // content after render, so a capture-phase load listener re-follows.
  useEffect(() => {
    const el = chatContainerRef.current;
    if (!el || !isOpen) return;

    const follow = () => {
      if (!pinnedToBottomRef.current) return;
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    };
    followScrollRef.current = follow;

    const onScroll = () => {
      const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
      pinnedToBottomRef.current = distance < 120;
      setShowJumpToLatest((prev) => {
        const next = distance > 320;
        return prev === next ? prev : next;
      });
    };
    // 'load' does not bubble but DOES capture — fires for every <img> that
    // finishes loading anywhere inside the transcript.
    const onMediaLoad = () => follow();

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('load', onMediaLoad, true);
    const observer = new MutationObserver(follow);
    observer.observe(el, { childList: true, subtree: true, characterData: true });

    // Newly opened panel / thread switch: snap to the latest message.
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
      pinnedToBottomRef.current = true;
    });

    return () => {
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('load', onMediaLoad, true);
      observer.disconnect();
    };
  }, [isOpen]);

  // Content milestones (new message, streaming token, tool chips, cards,
  // plan updates) re-follow via the same rAF-gated path.
  useEffect(() => {
    followScrollRef.current();
  }, [messages, agent.state.streamingText, agent.state.toolCalls.length, agent.state.cards, agent.state.plan]);

  const jumpToLatest = useCallback(() => {
    const el = chatContainerRef.current;
    if (!el) return;
    pinnedToBottomRef.current = true;
    setShowJumpToLatest(false);
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, []);

  // ── LIVE ui_action execution ──
  // Execute streamed UI actions the moment they arrive (the agent can open
  // a tab mid-answer). finalizeTurn's replay is deduplicated through
  // executedUiActionsRef — each action runs exactly once per turn.
  useEffect(() => {
    for (const action of agent.state.actions) {
      const ui = action.uiAction as UIAction | undefined;
      if (!ui || typeof ui.type !== 'string') continue;
      const key = JSON.stringify(ui);
      if (executedUiActionsRef.current.has(key)) continue;
      executedUiActionsRef.current.add(key);
      // Capture the undo target BEFORE the first live navigation moves the
      // user away from their page.
      if (!liveNavAppliedRef.current && (ui.type === 'navigate' || ui.type === 'switch_tab' || ui.type === 'navigate_module')) {
        liveNavAppliedRef.current = true;
        setUndoNav({ to: uiState.currentPage });
      }
      try {
        executeAction(ui);
      } catch {
        // finalizeTurn retries through the same engine; ignore here.
      }
    }
  }, [agent.state.actions, executeAction, uiState.currentPage]);

  // ─── STEP 13 — sendMessage ──────────────────────────────────────────────
  //
  // V3 uses V2's agent.send() (which talks to /api/agent/chat/v2 via SSE).
  // We adapt V4's file-context building into the call:
  //   • Build a trimmed history (last 20 turns, role + content only).
  //   • Build a fileContext array (id, name, type, size, first 2KB of
  //     extracted text, and the analysis summary). This is what the
  //     planner needs to reason about uploaded files without re-running
  //     extraction server-side.
  //   • Push the user's message into local state immediately (optimistic).
  //   • Clear the input field and the file attachments (they're now part
  //     of the user message and will be rendered as thumbnails there).
  //   • Call agent.send() with the message, history, currentTab, the UI
  //     context summary, and (V3 addition) the fileContext.
  //
  // NOTE: agent.send() does NOT return the response — it kicks off the
  // SSE stream. The actual response handling happens in STEP 14's effect,
  // which watches agent.state.phase.

  /** Convert a finished agent turn (send() return value or reattach()
   * result) into local chat state: execute emitted UI actions, append the
   * assistant message with its tool/plan snapshot, and surface honest
   * cancelled / error notices. Shared by sendMessage and the post-refresh
   * live re-attach path so a resumed turn finalizes identically. */
  const finalizeTurn = useCallback(
    (result: AgentV2State) => {
      if (result.finalText) {
        // Execute the emitted UI actions FIRST, collecting receipt labels and
        // an undo target for navigation — then append the assistant message
        // with the verified outcomes attached (ActionReceipts).
        const receipts: string[] = [];
        const tabBefore = uiState.currentPage;
        let navigatedAway = false;
        for (const action of result.actions) {
          if (action.uiAction && action.uiAction.type) {
            const key = JSON.stringify(action.uiAction);
            // The live-execution effect already ran this action mid-stream —
            // skip the re-run (receipts still apply), keep it only when the
            // live pass never saw it (e.g. it landed in the final batch).
            if (!executedUiActionsRef.current.has(key)) {
              executedUiActionsRef.current.add(key);
              try {
                executeAction(action.uiAction as UIAction);
              } catch {
                onAction(action);
                receipts.push(receiptLabelFor(action));
                if ((action.uiAction as { type?: string }).type === 'navigate'
                  || (action.uiAction as { type?: string }).type === 'switch_tab'
                  || (action.uiAction as { type?: string }).type === 'navigate_module') {
                  navigatedAway = true;
                }
                continue;
              }
            }
            receipts.push(receiptLabelFor(action));
            if ((action.uiAction as { type?: string }).type === 'navigate'
              || (action.uiAction as { type?: string }).type === 'switch_tab'
              || (action.uiAction as { type?: string }).type === 'navigate_module') {
              navigatedAway = true;
            }
          } else {
            onAction(action);
          }
        }
        // A live navigation already captured the correct pre-nav page — do
        // not clobber it (tabBefore here is measured AFTER navigation).
        if (navigatedAway && tabBefore && !liveNavAppliedRef.current) setUndoNav({ to: tabBefore });
        else if (!navigatedAway) setUndoNav(null);

        const assistantMsg: ChatMessage = {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: result.finalText,
          actions: result.actions,
          cards: result.cards,
          multimodalContent: result.multimodal as unknown as MultimodalContent[] | undefined,
          timestamp: Date.now(),
          // Partial answer (user Stop / aborted run) — render the honest
          // "may be incomplete" badge instead of presenting it as final.
          interrupted: result.interrupted === true,
          executedActions: receipts.length > 0 ? receipts : undefined,
          agentSnapshot: {
            plan: result.plan,
            toolCalls: result.toolCalls,
            llmCallCount: result.llmCallCount,
            memory: result.memory,
            stepResults: result.stepResults,
            citations: result.citations,
            webCitations: result.webCitations,
          },
        };
        setMessages((prev) => [...prev, assistantMsg]);

        // Messaging bridge — the Messages tab refreshes (and opens the room
        // for new DMs/groups) as soon as the turn settles.
        dispatchChatBridgeEvents(result.toolCalls);

        speakRef.current(result.finalText);
      } else if (result.phase === 'done') {
        // Stopped before anything streamed: give the user explicit feedback
        // instead of the turn silently vanishing — EXCEPT the ask_user turn,
        // which legitimately ends with no text (the interactive form IS the
        // turn's content; a "Cancelled" notice next to a live form would
        // read as a failure and confuse the learner into re-sending).
        const askedClarification = result.toolCalls.some((tc) => tc.toolName === 'ask_user');
        if (!askedClarification) {
          setMessages((prev) => [
            ...prev,
            {
              id: `sys-${Date.now()}`,
              role: 'system',
              content: '⏹ Cancelled — the agent was stopped before this response completed.',
              timestamp: Date.now(),
            },
          ]);
        }
      }

      if (result.phase === 'error' && result.error) {
        setMessages((prev) => [
          ...prev,
          {
            id: `e-${Date.now()}`,
            role: 'system',
            content: `⚠️ ${result.error}`,
            timestamp: Date.now(),
          },
        ]);
      }
    },
    [executeAction, onAction, uiState.currentPage],
  );

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || agent.isStreaming) return;
      setShowProactive(false);
      // Fresh turn: clear the per-turn UI-action dedup set and any live-nav
      // marker so this turn's ui_action payloads execute from scratch.
      executedUiActionsRef.current.clear();
      liveNavAppliedRef.current = false;

      const now = Date.now();
      const userMsg: ChatMessage = {
        id: `u-${now}`,
        role: 'user',
        content: text,
        timestamp: now,
        fileAttachments: fileAttachments.length > 0 ? [...fileAttachments] : undefined,
      };
      setMessages((prev) => [...prev, userMsg]);
      setInputText('');
      clearAttachments();

      const history = messages.slice(-20).map((m) => ({ role: m.role, content: m.content }));

      const fileContext =
        fileAttachments.length > 0
          ? fileAttachments.map((a) => ({
              id: a.id,
              name: a.name,
              type: a.type,
              size: a.size,
              // The full text now lives in the knowledge library (auto-ingested);
              // only a compact excerpt rides along with the turn.
              extractedText: a.knowledge ? a.extractedText?.slice(0, 600) : a.extractedText?.slice(0, 2000),
              knowledge: a.knowledge,
              // Binary attachments (images / audio): the data URL rides along
              // so the SERVER can register it and hand the model a short
              // attachment:// reference for the vision / ASR tools (fixes the
              // old failure where the model only knew the file NAME and the
              // vision tool rejected it with "Invalid URL").
              ...(a.dataUrl && a.dataUrl.length <= 8 * 1024 * 1024 ? { dataUrl: a.dataUrl } : {}),
              analysis: a.analysis
                ? {
                    classification: a.analysis.classification.category,
                    summary: a.analysis.summary.brief,
                    organization: a.analysis.organization.suggestedCollection,
                  }
                : undefined,
            }))
          : undefined;

      const result = await agent.send({
        message: text,
        history,
        currentTab,
        uiContext: getContextSummary(),
        fileAttachments: fileContext,
        // Selected chat model ("providerId:modelId"); '' = server default.
        // medq-router:* values route this turn through the FreeLLM AI Router.
        ...(llmModel ? { model: llmModel } : {}),
      });

      // Persist the thread id so a reload mid-conversation can re-fetch the
      // server-side history (network-recovery story, step 3).
      const serverThreadId = agent.getThreadId?.();
      if (serverThreadId && serverThreadId !== threadId) {
        setThreadId(serverThreadId);
        try {
          localStorage.setItem('medq-agent-thread-id', serverThreadId);
          sessionStorage.setItem('medq-agent-thread-id', serverThreadId);
        } catch { /* private mode */ }
      }

      finalizeTurn(result);
    },
    [agent, messages, currentTab, getContextSummary, fileAttachments, clearAttachments, executeAction, onAction, llmModel, uiState.currentPage, threadId, finalizeTurn],
  );


  useEffect(() => {
    speakRef.current = speak;
    transcriptHandlerRef.current = (text, submit) => {
      setInputText(text);
      if (submit && text.trim()) void sendMessage(text.trim());
    };
  }, [sendMessage, speak]);

  const filteredSkills = useMemo(() => {
    const query = skillSearch.trim().toLowerCase();
    if (!query) return skills;
    return skills.filter((skill) =>
      `${skill.name} ${skill.category} ${skill.id}`.toLowerCase().includes(query),
    );
  }, [skillSearch, skills]);

  const useSkill = useCallback((skill: (typeof SKILL_CATALOG)[number]) => {
    if (skill.id === '3d-models') {
      setShowSkills(false);
      setShowModels(true);
      return;
    }
    setInputText(skill.prompt ?? `Use the ${skill.name} skill for `);
    setShowSkills(false);
    setIsOpen(true);
  }, [setInputText, setIsOpen, setShowModels, setShowSkills]);

  // ─── STEP 14 — Done / error effects ─────────────────────────────────────
  //
  // Watch agent.state.phase. When it transitions:
  //   • 'done'   → capture finalText + plan + toolCalls + memory + stepResults
  //                into a new assistant ChatMessage (with agentSnapshot so
  //                PlanCard / MemoryBadge / ToolCallChip can re-render for
  //                this historical message later). Then execute any UIActions
  //                the agent emitted (try UIActionEngine first; fall back to
  //                the legacy onAction callback for untyped actions).
  //   • 'error'  → push a system message with the error text.
  //
  // V2 had this effect; V3 keeps it intact.


  // ─── STEP 15 — Feedback ─────────────────────────────────────────────────
  //
  // Thumbs up/down. V2 routed these to /api/agent/feedback/v2 via
  // agent.submitFeedback(). V3 keeps that path and also stores the choice
  // locally on the message so the icon can be tinted.

  const giveFeedback = useCallback(
    async (msgId: string, feedback: 'positive' | 'negative') => {
      setMessages((prev) => prev.map((m) => (m.id === msgId ? { ...m, feedback } : m)));
      const idx = messages.findIndex((m) => m.id === msgId);
      const msg = messages[idx];
      if (msg) {
        const ok = await agent.submitFeedback(feedback, {
          userMessage: messages[idx - 1]?.content ?? '',
          agentResponse: msg.content,
        });
        // Honest toast: the rating is always kept on the message (icon tint),
        // but the persisted copy can fail — say so instead of fake success.
        agentToast(
          ok
            ? {
                title: 'Feedback recorded',
                description: feedback === 'positive' ? 'Thanks — this helps the agent improve.' : 'Thanks — we\u2019ll use this to improve responses.',
                variant: 'success',
              }
            : {
                title: 'Feedback saved locally',
                description: 'Could not reach the server — your rating is kept on this message only.',
                variant: 'warning',
              },
        );
      }
    },
    [agent, messages],
  );

  // ── agent-ui: retry / edit(prefill) / undo-navigation ──

  /** Re-send the most recent user turn (ErrorCard “Try again”). */
  const retryLast = useCallback(() => {
    if (agent.isStreaming) return;
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUser) return;
    agentToast({ title: 'Retrying…', description: lastUser.content.slice(0, 70), variant: 'info' });
    void sendMessage(lastUser.content);
  }, [agent.isStreaming, messages, sendMessage]);

  /** Put text into the composer (MessageActions “Edit”, FormCard answers). */
  const prefillComposer = useCallback((text: string) => {
    setInputText(text.slice(0, 4000));
    setIsOpen(true);
  }, []);

  // ── ask_user: submit + restore ──

  /** Submit (or skip) the agent's structured question form. The answers are
   * formatted into a normal user message so the whole pipeline — history,
   * thread store, recovery — treats them exactly like typed input; the card
   * flips to its compact "Answered" summary via clarificationAnsweredId. */
  const handleClarificationSubmit = useCallback(
    (payload: PendingClarification, answers: ClarificationAnswers, skipped: boolean) => {
      if (agent.isStreaming) return;
      setClarificationAnsweredId(payload.clarificationId);
      const text = formatClarificationAnswers(payload, answers, skipped);
      void sendMessage(text);
    },
    [agent.isStreaming, sendMessage],
  );

  /** Re-derive an unanswered ask_user form from the LAST assistant
   * message's persisted tool call — after a page refresh or thread switch
   * the live SSE payload is gone, but the tool call + args survive in the
   * snapshot. Keeps existing state (never replaces a live form mid-turn);
   * clears both states when a newer assistant reply lands without a
   * question (the answer's follow-up ends the form's lifecycle). */
  useEffect(() => {
    if (agent.isStreaming) return;
    const lastMeaningful = [...messages].reverse().find((m) => m.role === 'user' || m.role === 'assistant');
    if (!lastMeaningful || lastMeaningful.role === 'user') return;
    const askCall = [...(lastMeaningful.agentSnapshot?.toolCalls ?? [])]
      .reverse()
      .find((c) => c.toolName === 'ask_user' && c.args);
    const derived = askCall ? normalizeClarificationPayload(askCall.args) : null;
    if (derived) {
      // prev ?? derived: never clobber the live form's identity mid-session.
      setPendingClarification((prev) => prev ?? derived);
    } else {
      setPendingClarification((prev) => {
        if (prev) setClarificationAnsweredId(null);
        return null;
      });
    }
  }, [messages, agent.isStreaming]);

  // ── Chat-specific follow-up suggestions (recommendation chips) ──
  // The instant heuristic chips (follow-ups.ts) render the moment an answer
  // lands; this effect then asks the server (same auto model as the agent)
  // for 3-4 follow-ups anchored in the ACTUAL conversation and swaps them
  // in when they arrive. Failures keep the heuristics — never a dead end.
  useEffect(() => {
    if (agent.isStreaming) return;
    const last = [...messages].reverse().find((m) => m.role === 'assistant');
    if (!last || !last.content.trim()) return;
    const priorMessages = messages.slice(0, messages.lastIndexOf(last)).slice(-5);
    const window = [...priorMessages, last]
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => ({ role: m.role, content: m.content }));
    if (!window.some((m) => m.role === 'user')) return;
    const key = `${last.id}:${last.content.length}`;
    if (followUpKeyRef.current === key) return;
    followUpKeyRef.current = key;
    let cancelled = false;
    const timer = setTimeout(() => {
      fetch('/api/agent/followups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: window }),
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data: { suggestions?: unknown } | null) => {
          if (cancelled || !data) return;
          const suggestions = Array.isArray(data.suggestions)
            ? data.suggestions.filter((s): s is string => typeof s === 'string' && s.trim().length > 0).slice(0, 4)
            : [];
          if (suggestions.length > 0) setChatFollowUps(suggestions);
        })
        .catch(() => { /* keep heuristics */ });
    }, 600);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [messages, agent.isStreaming]);

  /** Undo the last executed navigation — the one genuinely reversible op. */
  const handleUndoNavigate = useCallback(() => {
    setUndoNav((target) => {
      if (target) {
        try {
          executeAction({ type: 'navigate', target: target.to });
          agentToast({ title: 'Navigated back', description: `Returned to ${target.to}`, variant: 'info' });
        } catch {
          agentToast({ title: 'Could not navigate back', variant: 'warning' });
        }
      }
      return null;
    });
  }, [executeAction]);

  // ── agent-ui: recovery toasts ──
  // Announce a wire break ONLY when recovery is genuinely slow. Most breaks
  // are transient gateway blips that the live re-attach heals within a
  // couple of seconds (event-buffer replay + live tail) — a warning toast
  // for each one cried wolf and made healthy runs look broken (observed
  // live: three "Connection interrupted" toasts in one session where every
  // answer was recovered automatically). The timeline's phase label already
  // shows "reconnecting — finishing your answer" inline, so the toast is
  // reserved for recoveries still pending after the delay below, and the
  // success toast only fires when the user was actually warned.
  const recoveryAnnouncedRef = useRef(false);
  const recoveringRef = useRef(false);
  const recoveryToastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const phase = agent.state.phase;
    if (phase === 'recovering') {
      if (!recoveringRef.current) {
        recoveringRef.current = true;
        if (recoveryToastTimerRef.current) clearTimeout(recoveryToastTimerRef.current);
        recoveryToastTimerRef.current = setTimeout(() => {
          recoveryAnnouncedRef.current = true;
          agentToast({
            title: 'Connection interrupted',
            description: 'The agent is still working — recovering your answer automatically.',
            variant: 'warning',
            durationMs: 6000,
          });
        }, 8_000);
      }
      return;
    }
    if (recoveringRef.current) {
      // Exited recovering — re-attached and streaming again, done, or errored.
      recoveringRef.current = false;
      if (recoveryToastTimerRef.current) {
        clearTimeout(recoveryToastTimerRef.current);
        recoveryToastTimerRef.current = null;
      }
      if (phase === 'done' && recoveryAnnouncedRef.current) {
        agentToast({ title: 'Answer recovered', description: 'The finished response was restored from the server.', variant: 'success' });
      }
      if (phase === 'done' || phase === 'error') recoveryAnnouncedRef.current = false;
    }
  }, [agent.state.phase]);
  useEffect(() => () => {
    if (recoveryToastTimerRef.current) clearTimeout(recoveryToastTimerRef.current);
  }, []);

  // ── agent-ui: thread restore + refresh-mid-run pending-reply monitor ──
  // When the panel opens with either no local history or a dangling user turn
  // (reload mid-run — exactly the network-failure scenario), fetch the
  // persisted thread messages and append what the client is missing. When the
  // answer is NOT there yet (the server-side run survives the page reload and
  // is still working), keep polling every 3s for up to 5 minutes — the answer
  // is appended the moment the run persists it, so a refresh never "loses"
  // an in-flight response. Pending HITL approvals for the parked run are
  // restored alongside so the user can decide (and resume) after a refresh.
  // A turn is "dangling" when the last USER/ASSISTANT message is a user
  // message — i.e. no reply landed yet. Trailing SYSTEM rows (an error or
  // "still working" notice from an interrupted attempt) must NOT mask the
  // dangling turn: the server-side run may still be executing and the
  // live re-attach below must still fire.
  const lastMeaningfulMessage = useMemo(
    () => [...messages].reverse().find((m) => m.role === 'user' || m.role === 'assistant'),
    [messages],
  );
  const danglingTurn = !!lastMeaningfulMessage && lastMeaningfulMessage.role === 'user';
  useEffect(() => {
    if (!isOpen || !threadId || agent.isStreaming) return;
    if (restoringRef.current) return;
    if (messages.length > 0 && !danglingTurn) return;
    restoringRef.current = true;
    let cancelled = false;
    const POLL_INTERVAL_MS = 3_000;
    const POLL_DEADLINE_MS = 5 * 60_000;
    const startedAt = Date.now();

    const fetchOnce = async () => {
      const res = await fetch(`/api/agent/threads/${encodeURIComponent(threadId)}/messages`, {
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) return null;
      return (await res.json()) as { messages?: StoredThreadMessage[] };
    };

    (async () => {
      try {
        // ── Live re-attach first (refresh persistence with live progress) ──
        // A reload mid-run leaves the turn executing server-side with a
        // replayable event buffer. If the stored requestId is still live,
        // resume the stream: the whole in-flight turn (plan, tool chips,
        // streaming text, approval cards) re-renders through the same
        // reducer instead of a blind thread-poll for the final answer.
        if (danglingTurn) {
          let storedRequest: string | null = null;
          try { storedRequest = localStorage.getItem('medq-agent-active-request'); } catch { /* private mode */ }
          const lastUserMessage = lastMeaningfulMessage?.content ?? '';
          if (storedRequest) {
            const resumed = await agent.reattach(storedRequest, lastUserMessage);
            if (resumed) {
              // Finalize the resumed turn exactly like a locally-driven one
              // (assistant message + snapshot + UI actions + notices).
              finalizeTurn(resumed);
              agentToast({
                title: 'Live run resumed',
                description: 'The in-progress response was re-attached after the reload — streaming continues.',
                variant: 'success',
              });
              return;
            }
            // 404/expired — fall through to the approvals + poll path.
          }
        }

        // Dangling turn → also restore pending HITL approvals for this thread
        // (the parked tool is still waiting server-side; deciding resumes it).
        if (danglingTurn) {
          try {
            const res = await fetch(`/api/agent/approvals?threadId=${encodeURIComponent(threadId)}`);
            if (res.ok) {
              const data = await res.json() as { approvals?: Array<typeof restoredApprovals[number]> };
              if (!cancelled && Array.isArray(data.approvals)) {
                setRestoredApprovals(data.approvals.slice(0, 3));
              }
            }
          } catch { /* best-effort */ }
        }

        // eslint-disable-next-line no-constant-condition
        while (!cancelled) {
          const data = await fetchOnce().catch(() => null);
          if (cancelled) return;
          const cutoff = danglingTurn ? (lastMeaningfulMessage?.timestamp ?? 0) - 5_000 : 0;
          const restored = (data?.messages ?? [])
            .filter((m) => typeof m.content === 'string' && m.content.trim() !== '')
            // Dangling turn → ONLY assistant replies: the user's own message
            // is already in local state (optimistic append), and the
            // server-persisted copy of it would restore as a duplicate.
            .filter((m) => danglingTurn ? m.role === 'assistant' : (m.role === 'user' || m.role === 'assistant'))
            .filter((m) => {
              const created = m.createdAt ? Date.parse(m.createdAt) : NaN;
              return !cutoff || (Number.isFinite(created) && created >= cutoff);
            })
            .map((m, index) => {
              const ts = m.createdAt ? (Date.parse(m.createdAt) || Date.now()) : Date.now();
              return {
                id: `restored-${index}-${m.createdAt ?? ''}`,
                role: m.role as 'user' | 'assistant',
                content: m.content as string,
                timestamp: ts,
                interrupted: m.interrupted === true,
                // Recovered answers keep their file cards too (same join as
                // switchThread — a network-drop must not orphan artifacts).
                agentSnapshot: m.role === 'assistant' ? snapshotFromStoredMessage(m, ts) : undefined,
              };
            });

          if (restored.length > 0) {
            // An INTERRUPTED restored answer (explicit Stop / run hard-cap)
            // must not pass itself off as final — append the honest hint so
            // the user knows to retry instead of studying a truncated answer.
            const interrupted = restored.some((m) => m.role === 'assistant' && m.interrupted);
            setMessages((prev) => [
              ...prev,
              ...restored,
              ...(interrupted
                ? [{
                    id: `sys-interrupted-${Date.now()}`,
                    role: 'system' as const,
                    content: 'The answer above was interrupted before it finished — it may be incomplete. Use ⤴ retry on your message to regenerate it.',
                    timestamp: Date.now(),
                  }]
                : []),
            ]);
            setAwaitingServerReply(false);
            setRestoredApprovals([]);
            agentToast({
              title: danglingTurn ? (interrupted ? 'Partial answer recovered' : 'Answer restored') : 'Conversation restored',
              description: danglingTurn
                ? interrupted
                  ? 'The previous run was stopped early — the recovered answer may be incomplete.'
                  : 'The finished response was recovered from the server.'
                : 'History was re-loaded from the server thread.',
              variant: interrupted ? 'warning' : 'success',
            });
            return;
          }

          // Nothing new yet. Dangling turn → the run may still be executing
          // server-side: show the honest "still working" row and poll again.
          // Empty panel → nothing to wait for, stop after the first fetch.
          if (!danglingTurn) return;
          if (Date.now() - startedAt > POLL_DEADLINE_MS) {
            setAwaitingServerReply(false);
            setMessages((prev) => [
              ...prev,
              {
                id: `sys-timeout-${Date.now()}`,
                role: 'system' as const,
                content: 'The previous message did not finish (the run ended without a reply). Use ⤴ retry on your last message to send it again.',
                timestamp: Date.now(),
              },
            ]);
            return;
          }
          setAwaitingServerReply(true);
          await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
        }
      } catch {
        // offline or endpoint unavailable — the local copy stands
      } finally {
        setAwaitingServerReply(false);
        restoringRef.current = false;
      }
    })();
    return () => {
      cancelled = true;
      restoringRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, threadId, danglingTurn, agent.isStreaming]);

  // ── HITL decision handlers ──
  /** Live turn: the user answered the approval card while the SSE stream is
   * still open. The hook flips the card + phase; the parked tool unblocks
   * server-side and the run continues in the same stream. */
  const handleApprovalDecision = useCallback(
    (approved: boolean, remember: boolean, modifiedArgs?: Record<string, unknown>) => {
      const approval = agent.state.pendingApproval;
      if (!approval) return;
      void agent.resolveApproval(
        approval.approvalId,
        approved,
        remember ? 'allow' : null,
        modifiedArgs ?? null,
      ).then((ok) => {
        if (!ok) {
          agentToast({
            title: 'Decision not delivered',
            description: 'The server did not accept the decision — try again.',
            variant: 'warning',
            durationMs: 5000,
          });
        }
      });
    },
    [agent],
  );

  /** Restored (post-refresh) approval: no live stream — POST the decision;
   * the parked run resumes server-side and the pending-reply monitor above
   * picks the finished answer up from the thread store. */
  const handleRestoredApprovalDecision = useCallback(
    (approvalId: string, approved: boolean, remember: boolean) => {
      setRestoredApprovals((prev) => prev.filter((a) => a.approvalId !== approvalId));
      void fetch(`/api/agent/approvals/${encodeURIComponent(approvalId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved, remember: remember ? 'allow' : null }),
      })
        .then((res) => {
          if (res.ok) {
            agentToast({
              title: approved ? 'Approved' : 'Rejected',
              description: approved
                ? 'The agent is resuming the action — the answer will follow shortly.'
                : 'The agent will skip the action and adjust its answer.',
              variant: 'success',
            });
          } else {
            agentToast({ title: 'Decision not delivered', variant: 'error', durationMs: 5000 });
          }
        })
        .catch(() => {
          agentToast({ title: 'Decision not delivered', variant: 'error', durationMs: 5000 });
        });
    },
    [],
  );

  // ─── STEP 16 — Copy / cancel / cleanup ──────────────────────────────────
  //
  // • copyMessage  — clipboard.writeText + 2s "copied" indicator on the
  //                  matching message ID (V4 feature).
  // • cancel       — V2's agent.cancel() (AbortController-backed).
  // • unmount      — pause audio, stop recognition, cancel speechSynthesis.

  const copyMessage = useCallback(async (text: string, msgId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(msgId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {}
  }, []);

  // ─── STEP 17 — Keyboard shortcuts ───────────────────────────────────────
  //
  // • Cmd/Ctrl+Shift+A — toggle the chat panel open/closed.
  // • Escape           — if fullscreen, exit fullscreen; otherwise close.
  //                      Also stops listening and stops speaking.

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'a') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        if (isFullscreen) setIsFullscreen(false);
        else setIsOpen(false);
        // Closing/discarding — drop any in-flight mic capture rather than
        // auto-submitting it (stopListening would send it).
        if (isListening) cancelListening();
        stopSpeaking();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, isListening, cancelListening, stopSpeaking]);

  // ─── STEP 18–22 — Render ────────────────────────────────────────────────
  //
  // Layout constants: when pinned, the panel ignores isFullscreen and
  // stays at its normal size in the corner. When fullscreen, it covers
  // the viewport.

  return (
    <>
      <style>{ANIMATION_STYLES}</style>

      <AgentToastViewport />

      {/* Launcher bubble — hidden while the panel is open. In fullscreen the
          panel covers the viewport and the orb (z-50) sat exactly on top of
          the composer's send button, stealing its clicks (toggling the panel
          closed instead of sending). Hiding it makes the overlap impossible
          in every mode; the panel's header ✕ closes it.
          The proactive welcome bubble now renders INSIDE the orb (anchored
          to its live, draggable position) instead of as a hardcoded-corner
          sibling that overlapped the orb. */}
      {!isOpen && (
        <MedQAgentOrb
          orbRef={orbRef}
          agent={agent}
          isListening={isListening}
          isSpeaking={isSpeaking}
          onToggle={() => setIsOpen(true)}
          showProactive={showProactive}
          greeting={getGreeting()}
          onProactiveOpen={() => {
            setIsOpen(true);
            setShowProactive(false);
          }}
          onProactiveDismiss={() => setShowProactive(false)}
        />
      )}

      {isOpen && (
        <MedQAgentPanel
          agent={agent}
          isListening={isListening}
          isSpeaking={isSpeaking}
          isMuted={isMuted}
          isPinned={isPinned}
          isFullscreen={isFullscreen}
          showSkills={showSkills}
          showModels={showModels}
          skillSearch={skillSearch}
          filteredSkills={filteredSkills}
          fileAttachments={fileAttachments}
          inputText={inputText}
          asrSupported={asrSupported}
          isDraggingFile={isDraggingFile}
          chatContainerRef={chatContainerRef}
          chatEndRef={chatEndRef}
          fileInputRef={fileInputRef}
          onToggleSkills={() => setShowSkills((visible) => !visible)}
          onToggleMute={() => setIsMuted((value) => !value)}
          onTogglePin={() => setIsPinned((value) => !value)}
          onToggleFullscreen={() => setIsFullscreen((value) => !value)}
          onClose={() => {
            setIsOpen(false);
            // No orphan mic / playback when the panel closes.
            if (isListening) cancelListening();
            stopSpeaking();
          }}
          onSkillSearchChange={setSkillSearch}
          onUseSkill={useSkill}
          onOpenModelSearch={() => {
            setShowSkills(false);
            setShowModels(true);
          }}
          onCloseModelSearch={() => setShowModels(false)}
          onOpenUploadFile={() => {
            setShowSkills(false);
            fileInputRef.current?.click();
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onRemoveAttachment={removeAttachment}
          onPauseAttachment={pauseAttachment}
          onResumeAttachment={resumeAttachment}
          onCancelAttachment={cancelAttachment}
          onRetryAttachment={retryAttachment}
          onFileInputChange={(event) => {
            if (event.target.files && event.target.files.length > 0) {
              handleFileUpload(event.target.files);
              event.target.value = '';
            }
          }}
          onInputTextChange={setInputText}
          onSubmitInput={(value) => {
            // Manual send while the mic is running: drop the live capture
            // first so the ASR silence timer can't double-send afterwards.
            if (isListening) cancelListening();
            void sendMessage(value);
          }}
          onToggleVoice={() => (isListening ? stopListening() : startListening())}
          handsFreeActive={handsFree}
          llmModel={llmModel}
          llmModelOptions={llmModelOptions}
          onLlmModelChange={handleLlmModelChange}
          currentThreadId={threadId}
          onSelectThread={switchThread}
          onNewChat={startNewChat}
          historyRefreshKey={historyRefreshKey}
          modelContent={showModels ? <AnatomyDiscover /> : null}
          timeline={
            <MedQAgentTimeline
              messages={messages}
              agent={agent}
              suggestions={suggestions}
              onSuggestion={sendMessage}
              onCopy={copyMessage}
              copiedId={copiedId}
              onAction={onAction}
              onFeedback={giveFeedback}
              chatContainerRef={chatContainerRef}
              chatEndRef={chatEndRef}
              onRetry={retryLast}
              onPrefill={prefillComposer}
              online={online}
              showJumpToLatest={showJumpToLatest}
              onJumpToLatest={jumpToLatest}
              onUndoNavigate={undoNav ? handleUndoNavigate : null}
              onApprovalDecision={handleApprovalDecision}
              awaitingServerReply={awaitingServerReply}
              restoredApprovals={restoredApprovals}
              onRestoredApprovalDecision={handleRestoredApprovalDecision}
              pendingClarification={pendingClarification}
              clarificationAnsweredId={clarificationAnsweredId}
              onClarificationSubmit={handleClarificationSubmit}
              chatFollowUps={chatFollowUps}
              speakingMessageId={speakingMessageId}
              onSpeakMessage={handleSpeakMessage}
            />
          }
        />
      )}
    </>
  );
}

export default MedQAgentV3;

