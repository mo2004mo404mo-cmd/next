/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/i18n/index.ts
 *
 * MedQ adaptation: OpenMAIC's i18n uses i18next + react-i18next +
 * i18next-resources-to-backend to lazy-load locale JSON files. MedQ uses
 * `next-intl` (already installed) for its own UI strings and does not yet wire
 * up OpenMAIC's per-locale JSON resources. To avoid the i18next dependency tree
 * (i18next, react-i18next, i18next-resources-to-backend), this module exposes
 * the same `getClientTranslation(key)` surface as OpenMAIC's i18n, but
 * implements it as an identity function — the English fallback is returned
 * unchanged. The supported-locales registry is ported verbatim so ported
 * components that read the locale list (e.g. `use-i18n.tsx` if/when ported)
 * continue to compile.
 */

export { type Locale, defaultLocale } from './types';
export { type LocaleEntry, supportedLocales } from './locales';
export type TranslationKey = string;

export function translate(_locale: string, key: string): string {
  return key;
}

export function getClientTranslation(key: string): string {
  return key;
}
