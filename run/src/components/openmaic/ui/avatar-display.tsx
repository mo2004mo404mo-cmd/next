/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: components/ui/avatar-display.tsx
 *
 * Adapted: emoji / non-URL values are replaced with a real avatar path via
 * sanitizeAvatar(), so a real illustration is always shown regardless of what
 * value was stored in the agent record.
 *
 * Uses next/image <Image> for automatic resizing, WebP/AVIF conversion, and
 * lazy-loading. Avatar images are typically small (≤128px) so we use `fill`
 * mode with a sized parent (consumers always wrap <AvatarDisplay> in a
 * container with explicit width/height, e.g. size-8, w-10 h-10).
 */

'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { sanitizeAvatar } from '@/lib/constants/agent-defaults';

interface AvatarDisplayProps {
  readonly src: string;
  readonly alt?: string;
  readonly className?: string;
}

export function AvatarDisplay({ src, alt, className }: AvatarDisplayProps) {
  // Always a real image path — emoji/garbage values are replaced.
  const resolved = sanitizeAvatar(src);

  // next/image with `fill` requires a positioned parent. The original <img>
  // used `w-full h-full` which deferred sizing to the consumer's container —
  // we preserve that contract by wrapping <Image> in a `relative size-full`
  // div so the consumer's container still drives the avatar size and the
  // <Image> absolutely fills it. The wrapper's `overflow-hidden` mirrors
  // the rounded-clip behavior consumers expect from avatar wrappers.
  return (
    <div className={cn('relative size-full overflow-hidden', className)}>
      <Image
        src={resolved}
        alt={alt || ''}
        fill
        // object-cover mirrors the original <img className="object-cover"> behavior.
        className="object-cover"
        // Avatars are above-the-fold UI elements (visible immediately on page load).
        loading="eager"
        // Avatars are tiny — don't generate a blurred placeholder (would just add
        // visual noise for a 32-64px image).
        placeholder="empty"
      />
    </div>
  );
}
