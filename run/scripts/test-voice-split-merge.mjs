// Unit checks for the voice route's long-text handling:
//   splitForSpeech — sentence-aligned segmentation under the 1024-char cap
//   mergeWavBuffers — WAV PCM concatenation with a fresh canonical header
// Run: bun scripts/test-voice-split-merge.mjs
// (Route module is TypeScript; these mirror the implementations exactly.)

// ── splitForSpeech (mirrors route.ts) ─────────────────────────────────────
function splitForSpeech(text, maxChars) {
  const trimmed = text.trim();
  if (trimmed.length <= maxChars) return [trimmed];
  const sentences = trimmed.match(/[^.!?\n]+[.!?]*[\n]*/g) ?? [trimmed];
  const segments = [];
  let current = '';
  for (const sentence of sentences) {
    const piece = sentence.trim();
    if (!piece) continue;
    if ((current + ' ' + piece).trim().length <= maxChars) {
      current = (current ? current + ' ' : '') + piece;
    } else {
      if (current) segments.push(current);
      if (piece.length <= maxChars) {
        current = piece;
      } else {
        let rest = piece;
        while (rest.length > maxChars) {
          let cut = rest.lastIndexOf(' ', maxChars);
          if (cut <= 0) cut = maxChars;
          segments.push(rest.slice(0, cut).trim());
          rest = rest.slice(cut).trim();
        }
        current = rest;
      }
    }
  }
  if (current.trim()) segments.push(current.trim());
  return segments.length > 0 ? segments : [trimmed.slice(0, maxChars)];
}

// ── mergeWavBuffers (mirrors route.ts) ────────────────────────────────────
function mergeWavBuffers(buffers) {
  if (buffers.length === 0) throw new Error('no audio segments');
  if (buffers.length === 1) return buffers[0];
  const parse = (buf) => {
    if (buf.length < 44 || buf.subarray(0, 4).toString('ascii') !== 'RIFF'
      || buf.subarray(8, 12).toString('ascii') !== 'WAVE') return null;
    let offset = 12;
    let fmt = null;
    let data = null;
    while (offset + 8 <= buf.length) {
      const chunkId = buf.subarray(offset, offset + 4).toString('ascii');
      const chunkSize = buf.readUInt32LE(offset + 4);
      if (chunkId === 'fmt ' && !fmt) fmt = { start: offset + 8, size: chunkSize };
      if (chunkId === 'data') {
        data = { start: offset + 8, size: Math.min(chunkSize, buf.length - offset - 8) };
        break;
      }
      offset += 8 + chunkSize + (chunkSize % 2);
    }
    if (!fmt || !data) return null;
    return {
      audioFormat: buf.readUInt16LE(fmt.start),
      channels: buf.readUInt16LE(fmt.start + 2),
      sampleRate: buf.readUInt32LE(fmt.start + 4),
      bitsPerSample: buf.readUInt16LE(fmt.start + 14),
      pcm: buf.subarray(data.start, data.start + data.size),
    };
  };
  const parts = buffers.map(parse);
  const first = parts[0];
  if (!first || parts.some(p => !p)) return buffers[0];
  const sameFormat = parts.every(p =>
    p.audioFormat === first.audioFormat
    && p.channels === first.channels
    && p.sampleRate === first.sampleRate
    && p.bitsPerSample === first.bitsPerSample,
  );
  if (!sameFormat) return buffers[0];
  let dataBytes = 0;
  for (const p of parts) dataBytes += p.pcm.length;
  const byteRate = first.sampleRate * first.channels * (first.bitsPerSample / 8);
  const blockAlign = first.channels * (first.bitsPerSample / 8);
  const merged = Buffer.alloc(44 + dataBytes);
  merged.write('RIFF', 0, 'ascii');
  merged.writeUInt32LE(36 + dataBytes, 4);
  merged.write('WAVE', 8, 'ascii');
  merged.write('fmt ', 12, 'ascii');
  merged.writeUInt32LE(16, 16);
  merged.writeUInt16LE(first.audioFormat, 20);
  merged.writeUInt16LE(first.channels, 22);
  merged.writeUInt32LE(first.sampleRate, 24);
  merged.writeUInt32LE(byteRate, 28);
  merged.writeUInt16LE(blockAlign, 32);
  merged.writeUInt16LE(first.bitsPerSample, 34);
  merged.write('data', 36, 'ascii');
  merged.writeUInt32LE(dataBytes, 40);
  let cursor = 44;
  for (const p of parts) {
    p.pcm.copy(merged, cursor);
    cursor += p.pcm.length;
  }
  return merged;
}

// ── assertions ─────────────────────────────────────────────────────────────
let pass = 0, fail = 0;
const check = (name, cond) => { if (cond) { pass++; } else { fail++; console.error('FAIL:', name); } };

// splitForSpeech
const short = 'Short text.';
check('short text → single segment', JSON.stringify(splitForSpeech(short, 1000)) === JSON.stringify([short]));

const long = Array.from({ length: 40 }, (_, i) => `Sentence number ${i + 1} talks about heart failure pathophysiology and treatment options in detail.`).join(' ');
const segs = splitForSpeech(long, 1000);
check('long text → multiple segments', segs.length >= 3);
check('all segments within cap', segs.every(s => s.length <= 1000));
check('no content lost', segs.join(' ').replace(/\s+/g, ' ').length === long.replace(/\s+/g, ' ').length);

const pathological = 'word '.repeat(400).trim(); // single "sentence", no periods
const psegs = splitForSpeech(pathological, 1000);
check('pathological no-punctuation text splits', psegs.length >= 2 && psegs.every(s => s.length <= 1000));
check('pathological content preserved', psegs.join(' ').replace(/\s+/g, ' ') === pathological.replace(/\s+/g, ' '));

// mergeWavBuffers — synthesize 24kHz mono 16-bit WAVs like the router returns
function makeWav(pcmLength, sampleRate = 24000, channels = 1, bits = 16) {
  const buf = Buffer.alloc(44 + pcmLength);
  buf.write('RIFF', 0, 'ascii');
  buf.writeUInt32LE(36 + pcmLength, 4);
  buf.write('WAVE', 8, 'ascii');
  buf.write('fmt ', 12, 'ascii');
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(channels, 22);
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(sampleRate * channels * bits / 8, 28);
  buf.writeUInt16LE(channels * bits / 8, 32);
  buf.writeUInt16LE(bits, 34);
  buf.write('data', 36, 'ascii');
  buf.writeUInt32LE(pcmLength, 40);
  for (let i = 0; i < pcmLength; i += 2) buf.writeInt16LE(Math.round(8000 * Math.sin(i / 50)), 44 + i);
  return buf;
}

const w1 = makeWav(48000), w2 = makeWav(72000), w3 = makeWav(24000);
const merged = mergeWavBuffers([w1, w2, w3]);
check('merged is WAV', merged.subarray(0, 4).toString('ascii') === 'RIFF' && merged.subarray(8, 12).toString('ascii') === 'WAVE');
check('merged length = 44 + sum(pcm)', merged.length === 44 + 48000 + 72000 + 24000);
check('merged data size field', merged.readUInt32LE(40) === 48000 + 72000 + 24000);
check('merged sample rate preserved', merged.readUInt32LE(24) === 24000);
check('merged PCM[0] matches w1', merged.subarray(44, 44 + 16).equals(w1.subarray(44, 60)));
check('merged PCM at w1 end matches w2 start', merged.subarray(44 + 48000, 44 + 48000 + 16).equals(w2.subarray(44, 60)));

// format mismatch → returns first buffer unchanged
const odd = makeWav(1000, 44100);
const mismatch = mergeWavBuffers([w1, odd]);
check('format mismatch → first buffer returned', mismatch === w1);

// non-WAV input → first buffer
const mp3ish = Buffer.from([0xff, 0xfb, 0x90, 0x00, 0x01, 0x02]);
check('non-WAV → first buffer returned', mergeWavBuffers([mp3ish, mp3ish]) === mp3ish);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
