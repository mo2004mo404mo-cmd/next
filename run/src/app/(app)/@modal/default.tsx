/**
 * @modal parallel route default.
 *
 * Rendered when no modal route is active (the common case). Must return
 * null so the slot contributes nothing to the layout tree.
 *
 * When an intercepted route IS active — e.g. the user clicked a question in
 * /bank and was soft-navigated to /bank/[id] — Next.js renders
 * (app)/@modal/(.)bank/[id]/page.tsx into this slot instead, showing the
 * question detail as a modal over the still-mounted bank list. Pressing
 * Back (or closing the modal) soft-navigates back to /bank, the slot
 * re-renders to this default, and the modal disappears — with the list's
 * state (filters, scroll, pagination) preserved because it never unmounted.
 */
export default function ModalDefault() {
  return null;
}
