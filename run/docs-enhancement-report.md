# MedQ Enhancement Report — Video Call, OSCE, Voice, Hands-Free

**Date:** 2026-11-15 · **All changes tested on localhost (TCP-only, no UDP required).**

## Root causes found

1. **Video calls "not real"** — the app's `START.sh` only started 3 of the 7 required services.
   Call signaling (chat-service :3004), both voice agents, and the study-call worker were
   never started, so call buttons rang nobody and voice features silently failed.
2. Several in-call features were cosmetic stubs (see fixes below).
3. **OSCE slowness/no voice** — text mode used one-shot push-to-talk (press per utterance)
   and browser-only TTS that fails silently on some browsers; the real LiveKit voice
   pipeline was never running.
4. **Hands-free broken** — `useAgentVoice` closed the mic after the first auto-send and
   never re-opened it after the reply finished speaking.
5. **UDP** — LiveKit serves ICE-TCP on :7881, so everything works TCP-only; but the client
   forced Google STUN (UDP-only), wasting seconds per connection.

## Fixes delivered

### 1. Video call (`LiveKitCall.tsx` + infra)
- **Services now running:** LiveKit SFU :7880 (TCP media :7881), chat-service :3004,
  medq-patient + medq-assistant voice agents (:9681/:9682), study-call agent worker.
- `START.sh` rewritten to start **all 7 services** on any sandbox restart.
- **Real E2EE:** fetches the per-room key from `/api/livekit/e2ee`, constructs a real
  `ExternalE2EEKeyProvider`, and passes `encryption` options with the SDK's e2ee worker
  (`/livekit-client.e2ee.worker.js`, auto-copied by a new webpack hook). Falls back
  honestly (toast) if the browser lacks support.
- **Real soft-focus (background blur):** re-publishes the camera through a canvas that
  blurs the background with a sharp center ellipse — remote participants see the blurred
  feed (not just a local preview filter).
- **Waiting room:** menu item now shows the true on/off state, reflected from room
  metadata, updates live via `RoomMetadataChanged`.
- **Chapters:** marked chapters persist into the in-call chat transcript for both sides.
- **Transcription:** the dock "Transcribe" button now starts/stops the real captions
  engine (Web Speech → room data channel) shared with the captions panel.
- **TCP-only ICE:** removed Google STUN servers from `rtcConfig` (they're UDP-only);
  host/TCP candidates connect instantly on localhost.

### 2. OSCE tab (`src/app/(app)/osce/page.tsx`) — full rewrite
- **Hands-free conversation (default when supported):** continuous ASR — speak naturally,
  each pause sends; mic auto-re-arms after the patient's reply; ASR is suppressed while
  the patient speaks so it never transcribes your own speakers.
- **UI/UX overhaul:** patient card header with live status dot, encounter timer and
  question counter; two-column layout with a history-taking scaffold (OPQRST hints) rail;
  difficulty-toned badges; catalog cards with Talk / Live voice actions; debrief with
  score-tone coloring, SOAP note grid, and voice-encounter transcript import.
- TTS mute toggle + repeat-last-line; interim transcript bubble while you speak.
- Voice-encounter end now pulls the persisted transcript into the debrief view.

### 3. OSCE patient voice (bidirectional)
- Text mode: browser TTS hardened (default voice fallback, Chrome stall-kick, 3s
  failsafe so the mic never waits on dead synthesis).
- Live voice mode: `OsceVoiceCall` rewritten — interim + final captions, 25s media
  watchdog with one-click reconnect, auto-rejoin (3 attempts) on drops, call timer,
  TCP-only ICE, agent-join detection.

### 4. Hands-free with the MedQ assistant (`useAgentVoice.ts` rewrite)
- The mic **re-opens automatically** when the assistant finishes speaking (both browser
  TTS and server-TTS paths) — the loop: listen → send → reply speaks → listen.
- Chrome `onend` no longer loses accumulated finals (flushed before restart).
- Auto-restart on Chrome's self-termination with backoff on "already started".
- Double-send guard between silence-timer auto-send and manual stop.
- Permission denial exits hands-free mode with a clear message.
- Panel: hands-free status placeholder, mode kept on manual send.

### 5. AssistantVoiceCall
Same hardening as OsceVoiceCall: media watchdog + reconnect banner, auto-rejoin,
interim captions, call timer, TCP-only ICE.

## Verified on localhost (all green)

| Check | Result |
|---|---|
| App / , /osce, /messages | HTTP 200 |
| `_next` static chunks | 200 |
| E2EE worker asset | 200 |
| chat-service socket.io handshake | OK |
| LiveKit server | OK, room create + dispatch OK |
| Token route (real JWT) | OK |
| OSCE scenarios/turn/debrief APIs | OK (score, coverage, empathy, red flags) |
| OSCE voice dispatch → agent joins → speaks opening (TTS frames) | OK |
| Assistant voice dispatch (room + token + engine) | OK |
| Both voice-agent workers registered | OK |
| Type-check | 0 new errors (19 pre-existing, untouched files) |

## How to run after a sandbox restart

```bash
cd /home/z/my-project/extracted-app
bash START.sh          # starts ALL services: PG, LiveKit, chat, voice agents, app
```

## Known limitations
- E2EE is session-key encryption (the app server mints the key) — same trust model as
  the token route, honestly labeled in the API. True out-of-band e2ee needs a side
  channel no in-app UI can bootstrap.
- Soft-focus is a blur with a center ellipse, not ML person-segmentation.
- Browser ASR/TTS (text-mode OSCE, dictation) needs Chrome/Edge/Safari; the Live-voice
  paths don't depend on it.
- The cascade voice engine uses z-ai ASR/TTS via the worker; realtime voice-to-voice
  needs an OpenAI/Gemini key (BYOK panel in the voice call overlay).
# Historical report: this predates the MiroTalk migration and describes retired LiveKit features.

