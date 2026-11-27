// MedQ self-hosted build of the AI Router dashboard.
//
// Upstream FreeLLMAPI shipped an "update available" pill here: it polled the
// server's release check (GitHub upstream) and offered a git/docker update
// path. The MedQ AI Router ships inside MedQ's own releases — an upstream
// update prompt would be misleading, so the reminder is disabled and renders
// nothing. The event constant stays because the Updates dialog still listens
// to it (harmless no-op now).

export const UPDATE_CHECK_CHANGED_EVENT = 'freellmapi:update-check-changed'

export function UpdateReminder() {
  return null
}
