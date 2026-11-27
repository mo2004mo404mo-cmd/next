/* ══════════════════════════════════════════════════════════════ */
/* ── WebRTC Helpers for Voice/Video Calling ──                  */
/* ══════════════════════════════════════════════════════════════ */

// WebRTC configuration with STUN servers (free Google STUN servers for basic NAT traversal)
export const RTC_CONFIG: RTCConfiguration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
  ],
};

// Create a peer connection
export function createPeerConnection(): RTCPeerConnection {
  return new RTCPeerConnection(RTC_CONFIG);
}

// Get user media (camera + mic for video, just mic for voice)
export async function getUserMedia(video: boolean): Promise<MediaStream> {
  const constraints: MediaStreamConstraints = {
    audio: true,
    video: video
      ? { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' }
      : false,
  };
  return navigator.mediaDevices.getUserMedia(constraints);
}
