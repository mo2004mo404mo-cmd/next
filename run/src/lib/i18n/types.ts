/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/i18n/types.ts
 *
 * Verbatim port — pure type data, no deps.
 */

import { supportedLocales } from './locales';

export type Locale = (typeof supportedLocales)[number]['code'];

export const defaultLocale: Locale = 'zh-CN';
