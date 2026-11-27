/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: components/chat/chat-session.tsx
 *
 * Enhanced with:
 *   - Glassmorphism bubble styling with backdrop-blur
 *   - Wave typing indicator (replaces simple pulse dots)
 *   - Smooth staggered message entrance animations
 *   - Hover micro-interactions on message rows (scale, shadow lift)
 *   - Richer active-bubble glow animation
 *   - Improved empty state with animated illustration
 */

'use client';

import { useEffect, useRef, useCallback, memo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { ChatSession, ChatMessageMetadata } from '@/lib/types/chat';
import type { UIMessage } from 'ai';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/hooks/use-i18n';
import { AvatarDisplay } from '@/components/ui/avatar-display';
import { CircleStop, Sparkles, MessageCircle } from 'lucide-react';
import { InlineActionTag } from './inline-action-tag';
import { useUserProfileStore } from '@/lib/store/user-profile';

/** Extended message part type covering standard + custom action parts */
interface MessagePart {
  type: string;
  text?: string;
  _partId?: string;
  actionName?: string;
  state?: string;
}

interface ChatSessionProps {
  readonly session: ChatSession;
  readonly isActive: boolean;
  readonly isStreaming?: boolean;
  readonly activeBubbleId?: string | null;
  readonly onEndSession?: (sessionId: string) => void;
}

const AVATARS = {
  teacher: '/avatars/teacher.png',
  user: '/avatars/user.png',
};

// ─── Wave Typing Indicator ───
function WaveTypingIndicator({ color }: { color: 'purple' | 'indigo' }) {
  const barColor =
    color === 'purple'
      ? 'bg-purple-400/80 dark:bg-purple-500/80'
      : 'bg-indigo-400/80 dark:bg-indigo-500/80';

  return (
    <div className="flex items-center gap-[3px] py-2 px-2">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className={cn('w-[3px] rounded-full', barColor)}
          animate={{
            height: [4, 14, 8, 14, 4],
            opacity: [0.5, 1, 0.7, 1, 0.5],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: i * 0.12,
            ease: 'easeInOut',
          }}
          style={{ height: 4 }}
        />
      ))}
    </div>
  );
}

// ─── MessageBubble (Enhanced with Glassmorphism) ───
const MessageBubble = memo(function MessageBubble({
  message,
  isUser,
  isTeacher,
  isStreaming,
  isLastMessage,
  isActive,
}: {
  message: UIMessage<ChatMessageMetadata>;
  isUser: boolean;
  isTeacher: boolean;
  isStreaming: boolean;
  isLastMessage: boolean;
  isActive: boolean;
}) {
  const parts: MessagePart[] = (message.parts || []) as MessagePart[];
  const isLive = !!(isStreaming && isLastMessage);

  const hasContent = parts.some(
    (p: MessagePart) => (p.type === 'text' && p.text) || p.type?.startsWith('action-'),
  );

  // Wave typing indicator (replaces old pulsing dots)
  if (!hasContent && isActive && message.role === 'assistant') {
    return <WaveTypingIndicator color={isTeacher ? 'purple' : 'indigo'} />;
  }

  if (!hasContent) return null;

  const lastTextIdx = parts.reduce(
    (acc: number, p: MessagePart, i: number) => (p.type === 'text' && p.text ? i : acc),
    -1,
  );

  return (
    <div
      className={cn(
        'inline-block px-3 py-2 rounded-2xl text-[12px] leading-relaxed max-w-full text-left transition-all duration-300',
        // ── User: gradient purple bubble with glassmorphism ──
        isUser &&
          'bg-gradient-to-br from-purple-600/95 to-violet-700/95 dark:from-purple-500/95 dark:to-violet-600/95 text-white rounded-tr-sm shadow-md shadow-purple-500/20 dark:shadow-purple-900/40 ring-1 ring-white/10 backdrop-blur-sm',
        // ── Teacher: frosted glass card ──
        isTeacher &&
          'bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 border border-gray-200/60 dark:border-gray-600/40 rounded-tl-sm shadow-sm backdrop-blur-md',
        // ── Assistant: tinted frosted glass ──
        !isUser &&
          !isTeacher &&
          'bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-100 border border-indigo-200/50 dark:border-indigo-800/30 rounded-tl-sm backdrop-blur-md',
      )}
    >
      <span className="break-words">
        {parts.map((part: MessagePart, i: number) => {
          if (part.type === 'text' || part.type === 'step-start') {
            const text = part.type === 'text' ? part.text : '';
            if (!text) return null;

            const isLast = i === lastTextIdx;

            return (
              <span key={`${message.id}-${i}`}>
                {text}
                {isLive && isLast && (
                  <motion.span
                    className="inline-block w-1.5 h-3 rounded-full bg-current opacity-60 ml-1 align-middle"
                    animate={{ opacity: [0.3, 0.8, 0.3], height: [2, 6, 2] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                {message.metadata?.interrupted && isLast && !isLive && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 ml-1 align-middle" />
                )}
              </span>
            );
          }

          if (part.type?.startsWith('action-')) {
            return (
              <InlineActionTag
                key={`${message.id}-action-${i}`}
                actionName={part.actionName || part.type.replace('action-', '')}
                state={part.state || 'result'}
              />
            );
          }

          return null;
        })}
      </span>
    </div>
  );
});

// ─── Empty State with Animated Illustration ───
function ChatEmptyState() {
  const { t } = useI18n();

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated chat bubble illustration */}
      <motion.div
        className="relative mb-4"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
          <MessageCircle className="w-7 h-7 text-violet-500 dark:text-violet-400" />
        </div>
        {/* Floating sparkle */}
        <motion.div
          className="absolute -top-1 -right-1"
          animate={{ scale: [0.8, 1.2, 0.8], rotate: [0, 180, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          <Sparkles className="w-4 h-4 text-amber-400 dark:text-amber-300" />
        </motion.div>
      </motion.div>

      <p className="text-[11px] text-gray-400 dark:text-gray-500 text-center max-w-[180px]">
        {t('chat.noMessages')}
      </p>
    </motion.div>
  );
}

export function ChatSessionComponent({
  session,
  isActive,
  isStreaming,
  activeBubbleId,
  onEndSession,
}: ChatSessionProps) {
  const { t } = useI18n();
  const userProfileAvatar = useUserProfileStore((s) => s.avatar);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const activeBubbleRef = useRef<HTMLDivElement>(null);
  const isDiscussion = session.type === 'discussion';
  const isQA = session.type === 'qa';
  const canEnd = (isDiscussion || isQA) && session.status === 'active';
  const isEnded = session.status === 'completed' && (isDiscussion || isQA);

  // Track hovered message for micro-interaction
  const [hoveredMsgId, setHoveredMsgId] = useState<string | null>(null);

  const isAtBottomRef = useRef(true);
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    isAtBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
  }, []);

  const msgCount = session.messages.length;
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      isAtBottomRef.current = true;
    }
  }, [msgCount]);

  const scrollRaf = useRef(0);
  useEffect(() => {
    if (!isAtBottomRef.current) return;
    cancelAnimationFrame(scrollRaf.current);
    scrollRaf.current = requestAnimationFrame(() => {
      const el = scrollContainerRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, [session.messages]);

  useEffect(() => {
    if (activeBubbleId && activeBubbleRef.current) {
      activeBubbleRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
      isAtBottomRef.current = true;
    }
  }, [activeBubbleId]);

  // Empty state with animation
  if (session.messages.length === 0 && !isActive) {
    return <ChatEmptyState />;
  }

  const endButtonText = isDiscussion ? t('chat.stopDiscussion') : t('chat.endQA');

  return (
    <div className="flex flex-col">
      {/* Messages with staggered entrance */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="space-y-1.5 overflow-y-auto scrollbar-hide"
      >
        {session.messages.map((message, msgIdx) => {
          const isUser = message.metadata?.originalRole === 'user';
          const isTeacher = message.metadata?.originalRole === 'teacher';
          const avatar = isUser
            ? userProfileAvatar || AVATARS.user
            : message.metadata?.senderAvatar || AVATARS.teacher;
          const isActiveBubble = activeBubbleId === message.id;
          const isLastMessage = msgIdx === session.messages.length - 1;
          const isHovered = hoveredMsgId === message.id;

          return (
            <motion.div
              key={message.id}
              ref={isActiveBubble ? activeBubbleRef : undefined}
              // Staggered entrance: slide from side + fade
              initial={{ opacity: 0, x: isUser ? 8 : -8, scale: 0.98 }}
              animate={
                isActiveBubble
                  ? {
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      boxShadow: [
                        '0 0 0 0 rgba(124, 58, 237, 0)',
                        '0 0 24px 2px rgba(124, 58, 237, 0.18)',
                        '0 0 12px 1px rgba(124, 58, 237, 0.10)',
                      ],
                    }
                  : {
                      opacity: 1,
                      x: 0,
                      scale: isHovered ? 1.01 : 1,
                      boxShadow: isHovered
                        ? '0 2px 8px rgba(0,0,0,0.08)'
                        : '0 0 0 0 rgba(0,0,0,0)',
                    }
              }
              transition={
                isActiveBubble
                  ? {
                      boxShadow: {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                      default: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                    }
                  : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
              }
              onMouseEnter={() => setHoveredMsgId(message.id)}
              onMouseLeave={() => setHoveredMsgId(null)}
              className={cn(
                'flex gap-2.5 px-2 py-1.5 rounded-xl transition-[background-color,border-color] duration-300 cursor-default',
                isUser && 'flex-row-reverse',
                // Active bubble: violet glow + tinted background
                isActiveBubble &&
                  'border-l-[3px] border-l-violet-500 dark:border-l-violet-400 bg-violet-50/40 dark:bg-violet-900/15',
                // Hovered (non-active): subtle lift background
                !isActiveBubble && isHovered && 'bg-gray-50/40 dark:bg-gray-800/20',
              )}
            >
              {/* Mini Avatar with animated ring on active */}
              <motion.div
                className={cn(
                  'w-6 h-6 rounded-full overflow-hidden shrink-0 mt-0.5',
                  isActiveBubble
                    ? 'ring-2 ring-violet-500/50 dark:ring-violet-400/50 bg-violet-100 dark:bg-violet-900/40'
                    : 'ring-1 ring-gray-200/60 dark:ring-gray-700/40 bg-gray-100 dark:bg-gray-800',
                )}
                animate={
                  isActiveBubble
                    ? { scale: [1, 1.1, 1] }
                    : { scale: 1 }
                }
                transition={
                  isActiveBubble
                    ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: 0.2 }
                }
              >
                <AvatarDisplay src={avatar} alt="avatar" className="text-xs" />
              </motion.div>

              {/* Content */}
              <div className={cn('flex-1 min-w-0', isUser && 'text-right')}>
                <motion.span
                  className={cn(
                    'text-[9px] font-bold uppercase tracking-wider block mb-0.5',
                    isUser
                      ? 'text-purple-500 dark:text-purple-400'
                      : isTeacher
                        ? 'text-purple-400 dark:text-purple-300'
                        : 'text-indigo-400 dark:text-indigo-300',
                  )}
                  animate={
                    isActiveBubble
                      ? { opacity: [0.7, 1, 0.7] }
                      : { opacity: 1 }
                  }
                  transition={
                    isActiveBubble
                      ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 0.2 }
                  }
                >
                  {(() => {
                    const agentId = message.metadata?.agentId;
                    if (agentId) {
                      const i18nName = t(`settings.agentNames.${agentId}`);
                      if (i18nName !== `settings.agentNames.${agentId}`) return i18nName;
                    }
                    return message.metadata?.senderName || t('chat.unknown');
                  })()}
                </motion.span>

                <MessageBubble
                  message={message}
                  isUser={isUser}
                  isTeacher={isTeacher}
                  isStreaming={!!isStreaming}
                  isLastMessage={isLastMessage}
                  isActive={isActive}
                />
              </div>
            </motion.div>
          );
        })}

        {/* Session ended indicator — gradient divider */}
        <AnimatePresence>
          {isEnded && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mx-3 mt-2 mb-1 flex items-center gap-2"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
              <motion.span
                className="flex items-center gap-1.5 text-[10px] text-gray-400 dark:text-gray-500 font-medium px-2 py-1 rounded-full bg-gray-50 dark:bg-gray-800/50"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <CircleStop className="w-2.5 h-2.5" />
                {t('chat.ended')}
              </motion.span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* End Session Button — enhanced with shimmer hover */}
      <AnimatePresence>
        {canEnd && onEndSession && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            whileHover={{ scale: 1.03, boxShadow: '0 4px 16px rgba(239,68,68,0.25)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onEndSession(session.id)}
            className="mt-2 mx-3 bg-gradient-to-r from-red-50 to-red-100/80 dark:from-red-900/30 dark:to-red-800/20 backdrop-blur-md text-red-600 dark:text-red-400 border border-red-200/60 dark:border-red-700/40 px-3.5 py-2 rounded-full text-[11px] font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 dark:bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 dark:bg-red-400" />
            </span>
            {endButtonText}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
