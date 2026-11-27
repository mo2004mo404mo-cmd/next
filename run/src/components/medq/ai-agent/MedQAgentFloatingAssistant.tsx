'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Loader2, Mic, Sparkles, Volume2, X } from 'lucide-react';
import type { AgentV2State } from './useAgentV2Stream';

export type FloatingAssistantAgent = {
  isStreaming: boolean;
  state: AgentV2State;
};

/** The proactive welcome bubble, anchored to the orb's CURRENT position.
 *
 *  Position bug history: the bubble used to be a sibling with a hardcoded
 *  `bottom-24 right-6`, while the orb is DRAGGABLE (default ~120px from the
 *  bottom, right 24px). At the default position the bubble overlapped the
 *  bottom ~17px of the orb, and after dragging the orb the bubble stayed
 *  pinned in the corner, visually detached from the launcher.
 *
 *  Now the orb itself renders this bubble from its live `pos` state, so the
 *  greeting always sits next to the orb wherever the user put it:
 *    - above the orb (or below when the orb is near the top edge)
 *    - right-aligned with the orb on the right half of the screen,
 *      left-aligned on the left half
 *  Plus standard welcome-bubble UX: auto-dismiss after 12s and an explicit
 *  close button, so it never lingers forever.
 */
export function MedQAgentProactiveBubble({
  showProactive,
  greeting,
  onOpen,
  onDismiss,
  anchor,
}: {
  showProactive: boolean;
  greeting: string;
  onOpen: () => void;
  onDismiss: () => void;
  /** Orb top-left corner in viewport coords (drag-aware). */
  anchor: { x: number; y: number };
}) {
  // Auto-dismiss: a welcome nudge should invite, not camp out forever.
  useEffect(() => {
    if (!showProactive) return;
    const t = setTimeout(onDismiss, 12_000);
    return () => clearTimeout(t);
  }, [showProactive, onDismiss]);

  if (!showProactive) return null;

  const GAP = 10; // px between bubble and orb
  const BUBBLE_W = 240;
  const BUBBLE_H = 64; // approx: p-3 + two text lines

  const vw = typeof window === 'undefined' ? 1280 : window.innerWidth;
  const vh = typeof window === 'undefined' ? 800 : window.innerHeight;

  // Vertical: prefer ABOVE the orb; flip below near the top edge.
  const showBelow = anchor.y < BUBBLE_H + GAP * 2;
  const bubbleBottom = showBelow ? undefined : vh - anchor.y + GAP;
  const bubbleTop = showBelow ? anchor.y + ORB_SIZE + GAP : undefined;

  // Horizontal: right-align with the orb on the right half of the viewport,
  // left-align on the left half — clamped so it never overflows.
  const orbOnRight = anchor.x > vw / 2;
  const left = orbOnRight
    ? Math.max(8, anchor.x + ORB_SIZE - BUBBLE_W)
    : Math.min(vw - BUBBLE_W - 8, anchor.x);

  return (
    <div
      role="button"
      tabIndex={0}
      className="fixed z-40 rounded-2xl p-3 pr-8 cursor-pointer max-w-[240px]"
      style={{
        left: `${left}px`,
        ...(showBelow ? { top: `${bubbleTop}px` } : { bottom: `${bubbleBottom}px` }),
        background: 'rgba(11,14,26,0.96)',
        border: '1px solid rgba(0,229,160,0.3)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        animation: 'agentSlideUp 0.3s ease-out',
      }}
      onClick={(e) => { e.stopPropagation(); onOpen(); }}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
      aria-label={`${greeting} Open the MedQ AI assistant`}
    >
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: 'rgba(0,229,160,0.15)' }}>
          <Sparkles className="h-3.5 w-3.5 text-[#00e5a0]" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-medium text-[#e8ecf4] leading-snug">{greeting}</div>
          <div className="mt-0.5 text-[11px] text-[#8b95a8] leading-snug">Tap to open your AI study assistant</div>
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onDismiss(); }}
        className="absolute right-2 top-2 rounded-full p-0.5 text-[#8b95a8] hover:text-[#e8ecf4]"
        aria-label="Dismiss greeting"
      >
        <X className="h-3 w-3" />
      </button>
      {/* Caret pointing at the orb */}
      <div
        className="absolute h-2.5 w-2.5 rotate-45"
        style={{
          background: 'rgba(11,14,26,0.96)',
          borderRight: showBelow ? '1px solid rgba(0,229,160,0.3)' : undefined,
          borderBottom: showBelow ? undefined : '1px solid rgba(0,229,160,0.3)',
          ...(showBelow ? { top: '-5px' } : { bottom: '-5px' }),
          ...(orbOnRight ? { right: '22px' } : { left: '22px' }),
        }}
      />
    </div>
  );
}

const ORB_SIZE = 56;
const ORB_MARGIN = 8;
const STORAGE_KEY = 'medq-agent-orb-pos';

/** Default position: bottom-right, lifted above the chat composer so it
 *  never covers the send/mic buttons (composer is ~90px tall). */
function getDefaultPos() {
  if (typeof window === 'undefined') return { x: 9999, y: 9999 }; // off-screen fallback
  return {
    x: window.innerWidth - ORB_SIZE - 24,
    y: window.innerHeight - ORB_SIZE - 120,
  };
}

/** Load saved position from localStorage, clamped to current viewport. */
function loadPos(): { x: number; y: number } {
  if (typeof window === 'undefined') return getDefaultPos();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultPos();
    const p = JSON.parse(raw);
    if (typeof p.x !== 'number' || typeof p.y !== 'number') return getDefaultPos();
    // Clamp to viewport in case the window was resized smaller since last save
    return {
      x: Math.max(ORB_MARGIN, Math.min(p.x, window.innerWidth - ORB_SIZE - ORB_MARGIN)),
      y: Math.max(ORB_MARGIN, Math.min(p.y, window.innerHeight - ORB_SIZE - ORB_MARGIN)),
    };
  } catch {
    return getDefaultPos();
  }
}

export function MedQAgentOrb({
  agent,
  isListening,
  isSpeaking,
  onToggle,
  orbRef,
  showProactive = false,
  greeting = '',
  onProactiveOpen,
  onProactiveDismiss,
}: {
  agent: FloatingAssistantAgent;
  isListening: boolean;
  isSpeaking: boolean;
  onToggle: () => void;
  orbRef?: React.RefObject<HTMLButtonElement | null>;
  /** Welcome-bubble props — the bubble is rendered HERE so it can anchor to
   *  the orb's live (draggable) position instead of a hardcoded corner. */
  showProactive?: boolean;
  greeting?: string;
  onProactiveOpen?: () => void;
  onProactiveDismiss?: () => void;
}) {
  const [pos, setPos] = useState<{ x: number; y: number }>(() => loadPos());
  const dragState = useRef<{
    startX: number;
    startY: number;
    orbStartX: number;
    orbStartY: number;
    moved: boolean;
    pointerId: number;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Re-clamp position on window resize so the orb never goes off-screen.
  useEffect(() => {
    const handleResize = () => {
      setPos(prev => ({
        x: Math.max(ORB_MARGIN, Math.min(prev.x, window.innerWidth - ORB_SIZE - ORB_MARGIN)),
        y: Math.max(ORB_MARGIN, Math.min(prev.y, window.innerHeight - ORB_SIZE - ORB_MARGIN)),
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    // Only start drag on primary button (left-click or touch)
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      orbStartX: pos.x,
      orbStartY: pos.y,
      moved: false,
      pointerId: e.pointerId,
    };
    // Capture pointer so we get move/up events even outside the button
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [pos.x, pos.y]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    const ds = dragState.current;
    if (!ds || ds.pointerId !== e.pointerId) return;
    const dx = e.clientX - ds.startX;
    const dy = e.clientY - ds.startY;
    if (!ds.moved && Math.abs(dx) < 5 && Math.abs(dy) < 5) return; // dead zone for click
    ds.moved = true;
    setIsDragging(true);
    const newX = Math.max(ORB_MARGIN, Math.min(ds.orbStartX + dx, window.innerWidth - ORB_SIZE - ORB_MARGIN));
    const newY = Math.max(ORB_MARGIN, Math.min(ds.orbStartY + dy, window.innerHeight - ORB_SIZE - ORB_MARGIN));
    setPos({ x: newX, y: newY });
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    const ds = dragState.current;
    if (!ds) return;
    e.currentTarget.releasePointerCapture(ds.pointerId);
    if (ds.moved) {
      // It was a drag — save position, don't toggle
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(pos)); } catch {}
    } else {
      // It was a click — toggle the assistant
      onToggle();
    }
    dragState.current = null;
    setIsDragging(false);
  }, [pos, onToggle]);

  return (
    <>
      {/* Welcome bubble — anchored to `pos`, tracks the orb as it's dragged. */}
      {showProactive && onProactiveOpen && onProactiveDismiss && (
        <MedQAgentProactiveBubble
          showProactive={showProactive}
          greeting={greeting}
          onOpen={onProactiveOpen}
          onDismiss={onProactiveDismiss}
          anchor={pos}
        />
      )}
      <button
        ref={orbRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="fixed z-50 flex items-center justify-center touch-none select-none"
        style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: `${ORB_SIZE}px`,
        height: `${ORB_SIZE}px`,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #00e5a0, #8b5cf6)',
        boxShadow: agent.isStreaming
          ? '0 0 40px rgba(139,92,246,0.6)'
          : isListening
            ? '0 0 50px rgba(0,229,160,0.7)'
            : isSpeaking
              ? '0 0 40px rgba(139,92,246,0.6)'
              : '0 0 20px rgba(0,229,160,0.3)',
        border: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
        animation: isDragging
          ? undefined // pause pulse animation while dragging
          : agent.isStreaming
            ? 'agentOrbPulse 1s ease-in-out infinite'
            : isListening
              ? 'agentOrbListening 0.8s ease-in-out infinite'
              : isSpeaking
                ? 'agentOrbSpeaking 0.6s ease-in-out infinite'
                : undefined,
        transition: isDragging ? 'none' : 'box-shadow 0.2s ease',
      }}
      aria-label="AI Assistant — drag to move, click to toggle"
    >
      {agent.isStreaming ? (
        <Loader2 className="w-6 h-6 text-white animate-spin" />
      ) : isListening ? (
        <Mic className="w-6 h-6 text-white" />
      ) : isSpeaking ? (
        <Volume2 className="w-6 h-6 text-white" />
      ) : (
        <Sparkles className="w-6 h-6 text-white" />
      )}
      </button>
    </>
  );
}
