/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/edit/element-id.ts
 *
 * Verbatim port — `nanoid` is already installed.
 */

import { nanoid } from 'nanoid';

/** Stable element id for editor-inserted elements. */
export function createElementId(prefix: string): string {
  return `${prefix}-${nanoid(8)}`;
}
