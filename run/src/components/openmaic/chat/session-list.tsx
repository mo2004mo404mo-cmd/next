/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: components/chat/session-list.tsx
 *
 * Enhanced with:
 *   - Animated status indicator with breathing pulse
 *   - Hover micro-interactions on session cards (lift shadow + scale)
 *   - Smoother expand/collapse with spring animation
 *   - Enhanced badge styles with glassmorphism
 *   - Chevron rotation with motion/react
 */

'use client';

import type { ChatSession, SessionStatus } from '@/lib/types/chat';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/hooks/use-i18n';
import { ChevronDown, Circle, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatSessionComponent } from './chat-session';
import { useState } from 'react';

interface SessionListProps {
  sessions: ChatSession[];
  expandedSessionIds: Set<string>;
  isStreaming: boolean;
  activeBubbleId?: string | null;
  onToggleExpand: (sessionId: string) => void;
  onEndSession: (sessionId: string) => Promise<void>;
}

const sessionBadgeStyles = {
  qa: 'bg-blue-100/80 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/30',
  discussion: 'bg-amber-100/80 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 backdrop-blur-sm border border-amber-200/50 dark:border-amber-700/30',
  lecture: 'bg-purple-100/80 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/30',
};

function getStatusIcon(status: SessionStatus) {
  switch (status) {
    case 'active':
      return (
        <motion.span
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Circle className="size-2.5 fill-emerald-500 text-emerald-500" />
        </motion.span>
      );
    case 'interrupted':
      return <Clock className="size-2.5 text-yellow-500" />;
    case 'completed':
      return <CheckCircle className="size-2.5 text-gray-400" />;
    case 'error':
      return <AlertCircle className="size-2.5 text-red-500" />;
    case 'idle':
    default:
      return <Circle className="size-2.5 text-gray-300" />;
  }
}

export function SessionList({
  sessions,
  expandedSessionIds,
  isStreaming,
  activeBubbleId,
  onToggleExpand,
  onEndSession,
}: SessionListProps) {
  const { t } = useI18n();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {sessions.map((session) => {
        const isExpanded = expandedSessionIds.has(session.id);
        const isActive = session.status === 'active';
        const isHovered = hoveredId === session.id;
        const dotColor =
          session.type === 'lecture'
            ? 'bg-purple-500'
            : session.type === 'qa'
              ? 'bg-blue-500'
              : 'bg-amber-500';

        return (
          <motion.div
            key={session.id}
            // Staggered entrance animation
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            // Hover: subtle lift shadow
            whileHover={{
              boxShadow: isActive
                ? '0 4px 16px rgba(124,58,237,0.15)'
                : '0 2px 8px rgba(0,0,0,0.08)',
            }}
            onMouseEnter={() => setHoveredId(session.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={cn(
              'rounded-xl border transition-all duration-400 overflow-hidden cursor-pointer',
              isActive
                ? 'border-purple-200/80 dark:border-purple-700/60 bg-purple-50/30 dark:bg-purple-900/15 shadow-sm'
                : isHovered
                  ? 'border-gray-200/80 dark:border-gray-700/60 bg-white/70 dark:bg-gray-800/50'
                  : 'border-gray-100 dark:border-gray-800/50 bg-white/50 dark:bg-gray-800/40',
            )}
          >
            {/* Session Header */}
            <motion.button
              onClick={() => onToggleExpand(session.id)}
              className="w-full flex items-center gap-2 px-3.5 py-2.5 text-left transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated status dot */}
              <span className="relative flex h-3 w-3 shrink-0">
                <motion.span
                  className={cn(dotColor, 'relative inline-flex rounded-full h-3 w-3')}
                  animate={
                    isActive
                      ? { scale: [1, 1.2, 1] }
                      : { scale: 1 }
                  }
                  transition={
                    isActive
                      ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 0.2 }
                  }
                />
                {isActive && (
                  <motion.span
                    className={cn(dotColor, 'absolute inline-flex h-full w-full rounded-full')}
                    animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </span>

              {/* Type badge */}
              <span
                className={cn(
                  'text-[8px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md shrink-0',
                  sessionBadgeStyles[session.type],
                )}
              >
                {t(`chat.badge.${session.type}`)}
              </span>

              {/* Title */}
              <span className="flex-1 text-[11px] font-semibold text-gray-700 dark:text-gray-200 truncate">
                {session.title}
              </span>

              {/* Status icon */}
              <div className="flex items-center gap-1.5">
                {getStatusIcon(session.status)}
                <span className="text-[9px] text-gray-400 dark:text-gray-500 font-medium tabular-nums shrink-0 bg-gray-100/60 dark:bg-gray-700/40 px-1.5 py-0.5 rounded-md">
                  {session.messages.length}
                </span>
              </div>

              {/* Animated chevron */}
              <motion.div
                animate={{ rotate: isExpanded ? 0 : -90 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
              </motion.div>
            </motion.button>

            {/* Expanded content with spring animation */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden border-t border-gray-100/50 dark:border-gray-700/40"
                >
                  <div className="px-2 pb-2 pt-1">
                    <ChatSessionComponent
                      session={session}
                      isActive={isActive}
                      isStreaming={isStreaming && isActive}
                      activeBubbleId={activeBubbleId}
                      onEndSession={onEndSession}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
