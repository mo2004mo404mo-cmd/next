/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: components/agent/agent-avatar.tsx
 *
 * Enhanced with animated glow ring, floating effect, and status pulse.
 */

'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { sanitizeAvatar } from '@/lib/constants/agent-defaults';
import { motion } from 'motion/react';

interface AgentAvatarProps {
  avatar: string; // Image URL or emoji — emoji is sanitized to a real path
  color: string; // Theme color (hex)
  name: string; // Agent display name
  size?: 'sm' | 'md' | 'lg';
  /** Show a pulsing online/thinking indicator ring */
  status?: 'idle' | 'active' | 'thinking';
  /** Optional role label shown below name */
  role?: string;
  /** Whether to show the floating bob animation */
  animated?: boolean;
}

const sizeConfig = {
  sm: { avatar: 'size-6', ring: 'size-7', glow: 6, text: 'text-xs', name: 'text-sm' },
  md: { avatar: 'size-9', ring: 'size-11', glow: 10, text: 'text-[10px]', name: 'text-sm' },
  lg: { avatar: 'size-12', ring: 'size-14', glow: 14, text: 'text-[11px]', name: 'text-base' },
};

export default function AgentAvatar({
  avatar,
  color,
  name,
  size = 'md',
  status = 'idle',
  role,
  animated = true,
}: AgentAvatarProps) {
  const src = sanitizeAvatar(avatar);
  const cfg = sizeConfig[size];

  return (
    <motion.div
      className="flex items-center gap-2.5"
      initial={animated ? { opacity: 0, y: 6 } : undefined}
      animate={animated ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Animated avatar wrapper with glow ring */}
      <motion.div
        className="relative flex items-center justify-center"
        style={{ width: cfg.ring, height: cfg.ring }}
        // Subtle floating bob when active/thinking
        animate={
          animated && (status === 'active' || status === 'thinking')
            ? { y: [0, -2, 0] }
            : undefined
        }
        transition={
          animated && (status === 'active' || status === 'thinking')
            ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
            : undefined
        }
      >
        {/* Outer glow ring — pulsing when active/thinking */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: cfg.ring,
            height: cfg.ring,
            background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
          }}
          animate={
            status === 'active' || status === 'thinking'
              ? { scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }
              : { scale: 1, opacity: 0.2 }
          }
          transition={
            status === 'active' || status === 'thinking'
              ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.3 }
          }
        />

        {/* Color border ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: cfg.ring,
            height: cfg.ring,
            borderWidth: 2.5,
            borderColor: color,
            boxShadow: status === 'thinking'
              ? `0 0 ${cfg.glow}px ${color}60`
              : status === 'active'
                ? `0 0 ${cfg.glow}px ${color}30`
                : 'none',
          }}
        />

        {/* Inner avatar */}
        <Avatar
          className={cfg.avatar}
          style={{ borderColor: color, borderWidth: 2 }}
        >
          <AvatarImage src={src} alt={name} className="object-cover" />
          <AvatarFallback
            style={{ backgroundColor: `${color}20`, color }}
            className="font-bold"
          >
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        {/* Status dot indicator (bottom-right) */}
        {(status === 'active' || status === 'thinking') && (
          <motion.span
            className="absolute -bottom-0.5 -right-0.5 flex size-2.5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            {status === 'thinking' ? (
              // Thinking: pulsing amber dot
              <span className="relative inline-flex size-2.5 rounded-full bg-amber-400">
                <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
              </span>
            ) : (
              // Active: solid green dot
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              </span>
            )}
          </motion.span>
        )}
      </motion.div>

      {/* Name + optional role */}
      <div className="flex flex-col min-w-0">
        <span className={cn(cfg.name, 'font-semibold truncate')} style={{ color }}>
          {name}
        </span>
        {role && (
          <span className={cn(cfg.text, 'text-gray-400 dark:text-gray-500 truncate')}>
            {role}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function cn(...inputs: (string | undefined | false)[]) {
  return inputs.filter(Boolean).join(' ');
}
