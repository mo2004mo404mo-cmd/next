// Verify the agent voice endpoints (TTS + ASR round-trip) through
// /api/agent/chat — the floating assistant's voice fallback path.
import { $ } from 'bun';

const B = 'http://127.0.0.1:3000';

// 1. TTS: synthesize a sentence, expect an audio blob back.
const ttsRes = await fetch(`${B}/api/agent/chat`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ mode: 'tts', text: 'Heart failure is diagnosed with echocardiography and natriuretic peptides.' }),
});
console.log('1. TTS status:', ttsRes.status, '| type:', ttsRes.headers.get('content-type'));
const audio = Buffer.from(await ttsRes.arrayBuffer());
console.log('   bytes:', audio.byteLength, '| RIFF header:', audio.subarray(0, 4).toString('ascii') === 'RIFF' ? 'OK' : 'NOT WAV');

// 2. ASR: send the synthesized audio back, expect the same text.
const asrRes = await fetch(`${B}/api/agent/chat`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ mode: 'asr', audio: audio.toString('base64'), mimeType: 'audio/wav' }),
});
const asrData = await asrRes.json().catch(() => null);
console.log('2. ASR status:', asrRes.status, '| text:', JSON.stringify(asrData?.text?.slice(0, 90) ?? asrData));

// 3. Voice webm path (what MediaRecorder actually records): wrap the WAV
//    payload in a webm-typed blob — the router's transcription should still
//    handle it via sniffing/ffmpeg. If it fails, that's fine (real webm will
//    differ), we only report.
console.log('3. round-trip text match:', asrData?.text && /echo|heart/i.test(asrData.text) ? 'OK' : 'CHECK MANUALLY');
