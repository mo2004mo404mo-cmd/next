/**
 * TEMPORARY UI-verification seed — creates a guest-owned "harvard.wav"
 * source with a structured transcript (timings from the real VAD run) +
 * retained audio, so the Transcript Studio can be browser-verified while
 * the ASR quota window recovers. Deleted again after the live E2E passes.
 *
 * Run: bunx tsx scripts/seed-demo-transcript.ts
 */
import fs from 'fs';
import path from 'path';

async function main() {
  const { db } = await import('../src/lib/db');
  const { getEmbeddings, serializeVector } = await import('../src/lib/agent/knowledge/embeddings');

  const guest = await db.user.findUnique({ where: { email: 'guest@medq.local' } });
  if (!guest) throw new Error('guest user not found');

  // VAD windows measured by the engine on the TTS fixture
  const sentences = [
    { text: 'The stale smell of old beer lingers.', start: 0.3, end: 3.5 },
    { text: 'It takes heat to bring out the odor.', start: 4.2, end: 7.1 },
    { text: 'A cold dip restores health and zest.', start: 7.8, end: 12.0 },
    { text: 'A salt pickle tastes fine with ham.', start: 12.7, end: 15.7 },
    { text: 'Tacos al pastor are my favorite.', start: 16.4, end: 19.8 },
    { text: 'A zestful food is the hot cross bun.', start: 20.5, end: 24.5 },
  ].map((s, id) => ({ id, seg: id, ...s }));

  const segments = sentences.map((s, id) => ({ id, start: s.start, end: s.end, text: s.text }));
  const paragraphs = [{ from: 0, to: 2 }, { from: 3, to: 5 }];
  const words = sentences.reduce((a, s) => a + s.text.split(/\s+/).length, 0);
  const speechSec = Math.round(sentences.reduce((a, s) => a + (s.end - s.start), 0) * 10) / 10;
  const durationSec = 25.2;

  const transcript = {
    version: 2,
    fileName: 'harvard.wav',
    durationSec,
    stats: {
      words, sentences: sentences.length, segments: segments.length,
      speechSec, silenceSec: Math.round((durationSec - speechSec) * 10) / 10,
      wpm: Math.round((words / speechSec) * 60), coverage: Math.round((speechSec / durationSec) * 100) / 100,
    },
    segments,
    sentences,
    paragraphs,
    insights: {
      title: 'Harvard phonetically balanced sentences — speech test recording',
      summary:
        'A 25-second test recording of the six classic Harvard phonetically balanced sentences, ' +
        'used to benchmark speech recognition. The speaker names food and sensory examples — beer odor, ' +
        'a cold dip, salt pickle with ham, tacos al pastor, and hot cross buns.',
      keywords: ['harvard sentences', 'speech test', 'pickle', 'tacos al pastor', 'hot cross bun', 'odor', 'zest'],
      topics: ['speech recognition benchmark'],
      entities: ['Harvard', 'tacos al pastor', 'hot cross bun'],
    },
  };

  const fmt = (t: number) => `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
  const lines: string[] = [];
  for (const p of paragraphs) {
    for (let i = p.from; i <= p.to; i++) lines.push(`[${fmt(sentences[i].start)}] ${sentences[i].text}`);
    lines.push('');
  }
  const content = `# Advanced transcript of "harvard.wav" (audio, 25s)\n\n${lines.join('\n').trim()}`;

  const source = await db.knowledgeSource.create({
    data: {
      userId: guest.id,
      name: 'harvard.wav',
      type: 'file',
      status: 'ready',
      fileKind: 'audio',
      metaJson: JSON.stringify({
        title: 'harvard.wav',
        chunks: 2,
        fileKind: 'audio',
        durationSec: 25,
        transcription: 'advanced-vad-asr',
        audioMime: 'audio/wav',
        audioBytes: fs.statSync('/home/z/my-project/upload/fixtures/harvard.wav').size,
        transcript,
        demo: 'seeded-ui-verification',
      }),
    },
  });

  const document = await db.knowledgeDocument.create({
    data: {
      sourceId: source.id,
      title: 'harvard.wav',
      mimeType: 'audio/wav',
      sizeBytes: Buffer.byteLength(content, 'utf8'),
      content,
      chunkCount: 2,
    },
  });

  const embeddings = await getEmbeddings();
  const chunkTexts = [
    content.split('\n\n').slice(0, 2).join('\n\n'),
    content.split('\n\n').slice(2).join('\n\n'),
  ];
  const vectors = await embeddings.embed(chunkTexts);
  await db.knowledgeChunk.createMany({
    data: chunkTexts.map((text, i) => ({
      documentId: document.id,
      sourceId: source.id,
      idx: i,
      content: text,
      embedding: serializeVector(vectors[i]),
      embeddingModel: embeddings.id,
      contextSummary: `From "harvard.wav" (speech test), part ${i + 1} of 2`,
      tokens: Math.ceil(text.length / 4),
      metaJson: JSON.stringify({ title: 'harvard.wav' }),
    })),
  });

  const store = path.join(process.cwd(), 'upload', 'audio-store');
  fs.mkdirSync(store, { recursive: true });
  fs.copyFileSync('/home/z/my-project/upload/fixtures/harvard.wav', path.join(store, `${source.id}.bin`));

  console.log(`seeded source ${source.id} (guest ${guest.id})`);
  console.log(`retained audio at upload/audio-store/${source.id}.bin`);
}

void main().catch((e) => { console.error(e); process.exit(1); });
