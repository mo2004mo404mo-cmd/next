/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/constants/agent-defaults.ts
 */

/**
 * Shared constants for agent profile generation.
 *
 * Used by both the client-side agent-profiles API route and the
 * server-side classroom-generation pipeline to keep colors / avatars in sync.
 */

/** Color palette cycled for generated agents */
export const AGENT_COLOR_PALETTE = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ec4899',
  '#06b6d4',
  '#8b5cf6',
  '#f97316',
  '#14b8a6',
  '#e11d48',
  '#6366f1',
  '#84cc16',
  '#a855f7',
] as const;

/**
 * Default avatar paths cycled for generated agents.
 *
 * Every entry MUST correspond to a file that exists under `public/avatars/`.
 */
export const AGENT_DEFAULT_AVATARS = [
  '/avatars/teacher.png',
  '/avatars/assist.png',
  '/avatars/curious.png',
  '/avatars/thinker.png',
  '/avatars/note-taker.png',
  '/avatars/teacher-2.png',
  '/avatars/assist-2.png',
  '/avatars/curious-2.png',
  '/avatars/thinker-2.png',
  '/avatars/note-taker-2.png',
] as const;

/**
 * Returns true if the given avatar string is a usable image source — i.e. an
 * HTTP URL, a root-relative path, or a data URL. Returns false for bare emoji
 * strings (e.g. "🎓", "👩‍🏫") or any other non-URL value the LLM might have
 * returned despite being told to pick from the avatar list.
 */
export function isAvatarUrl(avatar: string | undefined | null): avatar is string {
  return (
    !!avatar &&
    (avatar.startsWith('http') ||
      avatar.startsWith('/') ||
      avatar.startsWith('data:'))
  );
}

/**
 * Sanitize an agent avatar value for UI rendering.
 *
 * If `avatar` is a usable image URL/path, it is returned unchanged. Otherwise
 * (emoji, garbage, empty), a deterministic fallback from AGENT_DEFAULT_AVATARS
 * is returned. The optional `index` seeds the fallback so that multiple agents
 * in the same classroom get distinct avatars; if omitted, a hash of the input
 * string is used so the same bad value always maps to the same fallback.
 *
 * Use this anywhere an agent avatar is rendered as an <img> to guarantee a
 * real illustration is always shown — even for classrooms generated before
 * the server-side avatar validation was added.
 */
export function sanitizeAvatar(avatar: string | undefined | null, index?: number): string {
  if (isAvatarUrl(avatar)) return avatar;

  const fallbackIndex =
    typeof index === 'number' && Number.isFinite(index)
      ? index
      : // Simple deterministic hash so the same emoji always maps to the
        // same fallback avatar (stable across re-renders).
        Math.abs(
          (avatar ?? '').split('').reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) | 0, 0),
        );

  return AGENT_DEFAULT_AVATARS[fallbackIndex % AGENT_DEFAULT_AVATARS.length];
}
