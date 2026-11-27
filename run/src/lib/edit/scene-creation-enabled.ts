/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/edit/scene-creation-enabled.ts
 *
 * Verbatim port — pure constant.
 */

/**
 * Gates the editor's two scene-creation entry points — the inter-thumb "+"
 * insertion zones and the per-slide Duplicate menu item.
 *
 * Enabled now that the editor can author a scene's playback `actions`:
 * duplicated slides carry the source's actions (playable as-is), and a blank
 * inserted slide is seeded with one empty speech clip (createBlankSlideScene)
 * so it stays playable — the user fills in the narration via the script
 * timeline / MAIC Agent. Reorder / delete / rename were always playback-safe.
 */
export const SCENE_CREATION_ENABLED = true;
