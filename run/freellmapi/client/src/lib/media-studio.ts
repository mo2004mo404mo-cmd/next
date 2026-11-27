// Media Studio helpers — pure functions so the vitest suite can cover the
// fiddly bits (base64 image sniffing, elapsed formatting) without mounting
// the page.

/**
 * Wrap a base64 image payload in a data URL with the right MIME type.
 * Providers return JPEG or PNG interchangeably (the Z.AI gateway returns
 * JPEG; Cloudflare SDXL returns PNG), and a wrong MIME only shows up as a
 * broken <img> in some browsers — so sniff the magic bytes instead of
 * guessing. Unknown formats fall back to JPEG, the most common case.
 */
export function b64ToDataUrl(b64: string): string {
  const head = b64.slice(0, 5);
  if (head.startsWith('/9j/')) return `data:image/jpeg;base64,${b64}`;
  if (head.startsWith('iVBOR')) return `data:image/png;base64,${b64}`;
  if (head.startsWith('R0lGO')) return `data:image/gif;base64,${b64}`;
  if (head.startsWith('UklGR')) return `data:image/webp;base64,${b64}`;
  return `data:image/jpeg;base64,${b64}`;
}

/** File extension for a sniffed data URL (drives the download filename). */
export function dataUrlExt(dataUrl: string): string {
  if (dataUrl.startsWith('data:image/png')) return 'png';
  if (dataUrl.startsWith('data:image/gif')) return 'gif';
  if (dataUrl.startsWith('data:image/webp')) return 'webp';
  return 'jpg';
}

/** 26 -> "26s", 124 -> "2m 04s": compact elapsed label for generation runs. */
export function formatElapsed(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  if (total < 60) return `${total}s`;
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}m ${String(s).padStart(2, '0')}s`;
}

/** Stable-enough filename for downloads: studio-cogview-4-1730123456.jpg */
export function downloadName(model: string, ext: string): string {
  const safe = model.replace(/[^a-z0-9._-]+/gi, '-').replace(/^-+|-+$/g, '') || 'media';
  return `studio-${safe}-${Math.floor(Date.now() / 1000)}.${ext}`;
}

// ── Recent prompts ──────────────────────────────────────────────────────────
// A generation prompt is worth more than one image: the Studio keeps the last
// few per tab (localStorage) so a refresh — or clearing the field to write
// something new — never costs the text you had already perfected.

export const RECENT_PROMPTS_MAX = 8;

/** Newest-first, de-duplicated, hard-capped list of prompts. */
export function pushRecentPrompt(list: string[], text: string, max = RECENT_PROMPTS_MAX): string[] {
  const prompt = text.trim();
  if (!prompt) return list;
  const next = [prompt, ...list.filter(p => p !== prompt)];
  return next.slice(0, max);
}

/** One-line, length-capped chip label for a stored prompt. */
export function recentPromptLabel(text: string, max = 42): string {
  const firstLine = text.split('\n')[0] ?? '';
  const squeezed = firstLine.replace(/\s+/g, ' ').trim();
  return squeezed.length > max ? `${squeezed.slice(0, max - 1)}…` : squeezed;
}

/** Read a tab's recent prompts; any storage failure (private mode, quota,
 *  JSON corruption) reads as "nothing stored yet". */
export function loadRecentPrompts(storageKey: string): string[] {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((p): p is string => typeof p === 'string' && p.trim().length > 0)
      : [];
  } catch {
    return [];
  }
}

/** Best-effort persist; failures are silently dropped (the chips are a
 *  convenience, never a source of truth). */
export function saveRecentPrompts(storageKey: string, list: string[]): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify(list));
  } catch {
    /* private mode / quota — ignore */
  }
}
