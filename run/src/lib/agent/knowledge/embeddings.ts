import { createHash } from 'node:crypto';
import { createLogger } from '../../logger';

const log = createLogger('AgentEmbeddings');

/**
 * Embeddings subsystem — deep-agent-platform parity (compare-and-integrate-4).
 *
 * Three providers behind one tiny interface:
 *
 *   OpenAICompatibleEmbeddings — POST {baseUrl}/embeddings against any
 *   configured OpenAI-compatible endpoint (BYOK keys, self-hosted vLLM…).
 *
 *   BgeLocalEmbeddings — TRUE neural embeddings running fully locally via
 *   @huggingface/transformers (Xenova/bge-small-en-v1.5, 384-d, ~25MB ONNX,
 *   CPU ~10ms/text). Strong general-purpose English retrieval (BEIR-class).
 *   Used when no remote embedding endpoint is configured — this is the
 *   default in sandbox/offline deployments and keeps the dense half of
 *   hybrid retrieval genuinely semantic (not lexical hashing).
 *
 *   LocalHashEmbeddings — deterministic zero-dependency LAST resort: hashed
 *   character trigrams + token bigrams into a signed 256-d vector with TF
 *   log-weighting and L2 normalization. Lexical-ish similarity rather than
 *   neural semantics — only reached when transformers.js cannot load (e.g.
 *   no network for the one-time model download AND no cached weights).
 *
 * Vectors are stored in Postgres `Bytes` columns as serialized Float32Array
 * and compared with plain cosine (they are pre-normalized, so cosine == dot).
 */

export const EMBEDDING_DIM = 256;

export interface EmbedOptions {
  /** true = these texts are QUERIES (not passages): BGE applies its
   *  s2p retrieval instruction prefix for measurably better recall. */
  query?: boolean;
}

export interface EmbeddingProvider {
  id: string;
  model: string;
  embed(texts: string[], opts?: EmbedOptions): Promise<Float32Array[]>;
}

// ─── Local hashed-trigram embedder ────────────────────────────────────────

export class LocalHashEmbeddings implements EmbeddingProvider {
  readonly id = 'local-hash';
  readonly model = 'hashed-trigrams-256d';

  embed(texts: string[]): Promise<Float32Array[]> {
    return Promise.resolve(texts.map((text) => this.embedOne(text)));
  }

  /** Signed feature hashing of weighted n-grams (see module doc). */
  private embedOne(raw: string): Float32Array {
    const vec = new Float32Array(EMBEDDING_DIM);
    const normalized = raw.toLowerCase().replace(/\s+/g, ' ').trim();
    if (!normalized) return vec;

    const tokens = normalized.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
    const counts = new Map<string, number>();
    const bump = (gram: string, weight: number) => {
      counts.set(gram, (counts.get(gram) ?? 0) + weight);
    };

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      // Full token — weight 1
      bump(token, 1);
      // Character trigrams (prefix-anchored) — morphological robustness, 0.5
      const padded = `#${token}`;
      for (let j = 0; j + 3 <= padded.length; j++) bump(padded.slice(j, j + 3), 0.5);
      // Token bigrams — phrase structure, 0.75
      if (i + 1 < tokens.length) bump(`${token}_${tokens[i + 1]}`, 0.75);
    }

    for (const [gram, count] of counts) {
      const digest = createHash('md5').update(gram).digest();
      const idx = ((digest[0] << 8) | digest[1]) % EMBEDDING_DIM;
      const sign = digest[2] % 2 === 0 ? 1 : -1;
      vec[idx] += sign * Math.log(1 + count);
    }

    // L2 normalize
    let norm = 0;
    for (let i = 0; i < EMBEDDING_DIM; i++) norm += vec[i] * vec[i];
    norm = Math.sqrt(norm);
    if (norm > 0) for (let i = 0; i < EMBEDDING_DIM; i++) vec[i] /= norm;
    return vec;
  }
}

// ─── Local neural embedder (transformers.js / bge-small-en-v1.5) ────────────

/**
 * BGE query-side instruction (from the model card — improves short-query →
 * passage retrieval). Applied ONLY to queries, never to indexed passages.
 */
const BGE_QUERY_PREFIX = 'Represent this sentence for searching relevant passages: ';

export class BgeLocalEmbeddings implements EmbeddingProvider {
  readonly id = 'bge-local';
  readonly model = 'Xenova/bge-small-en-v1.5';

  private pipelinePromise: Promise<((texts: string[], opts: { pooling: 'mean'; normalize: boolean }) => Promise<{ data: Float32Array | number[] }>)> | null = null;

  private getPipeline() {
    if (!this.pipelinePromise) {
      this.pipelinePromise = (async () => {
        const mod = (await import('@huggingface/transformers')) as unknown as {
          pipeline: (task: string, model: string, opts?: { dtype?: string }) => Promise<unknown>;
          env?: { allowLocalModels?: boolean };
        };
        if (mod.env) mod.env.allowLocalModels = false; // always resolve via the hub cache
        const extractor = await mod.pipeline('feature-extraction', this.model, { dtype: 'fp32' });
        return extractor as (texts: string[], opts: { pooling: 'mean'; normalize: boolean }) => Promise<{ data: Float32Array | number[] }>;
      })();
      // Allow a later retry if the (one-time) model download fails.
      this.pipelinePromise.catch(() => { this.pipelinePromise = null; });
    }
    return this.pipelinePromise;
  }

  async embed(texts: string[], opts?: EmbedOptions): Promise<Float32Array[]> {
    if (texts.length === 0) return [];
    const extractor = await this.getPipeline();
    const inputs = texts.map((t) => (opts?.query ? BGE_QUERY_PREFIX + t : t).slice(0, 8000));
    const BATCH = 32;
    const out: Float32Array[] = [];
    for (let i = 0; i < inputs.length; i += BATCH) {
      const res = await extractor(inputs.slice(i, i + BATCH), { pooling: 'mean', normalize: true });
      const flat = res.data instanceof Float32Array ? res.data : new Float32Array(res.data as number[]);
      const dim = 384; // bge-small output dimension
      const count = Math.floor(flat.length / dim);
      for (let j = 0; j < count; j++) out.push(flat.slice(j * dim, (j + 1) * dim));
    }
    if (out.length !== texts.length) throw new Error(`bge-local shape mismatch: ${out.length} != ${texts.length}`);
    return out;
  }
}

// ─── Remote OpenAI-compatible embedder ────────────────────────────────────

export class OpenAICompatibleEmbeddings implements EmbeddingProvider {
  readonly model = 'text-embedding-3-small';

  constructor(
    readonly id: string,
    private readonly baseUrl: string,
    private readonly apiKey: string,
  ) {}

  async embed(texts: string[]): Promise<Float32Array[]> {
    const res = await fetch(`${this.baseUrl.replace(/\/$/, '')}/embeddings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.apiKey}` },
      body: JSON.stringify({ model: this.model, input: texts }),
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) throw new Error(`embeddings endpoint ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const json = (await res.json()) as { data?: Array<{ embedding?: number[] }> };
    const vectors = json.data?.map((d) => Float32Array.from(d.embedding ?? []));
    if (!vectors || vectors.length !== texts.length) throw new Error('embeddings response shape mismatch');
    return vectors;
  }

  // (no query-mode prefix — the remote API embeds raw text on both sides)
}

// ─── Provider resolution (cached per process) ─────────────────────────────

const runtime = globalThis as typeof globalThis & { __medqEmbeddings?: EmbeddingProvider };

/**
 * Resolve the process embedder, best-accuracy first:
 *   1. any usable OpenAI-compatible key from the platform's model-config
 *      chain (env / BYOK) — remote neural embeddings;
 *   2. LOCAL neural bge-small-en-v1.5 via transformers.js (no API keys
 *      needed, one-time ~25MB model download, then fully offline);
 *   3. local hashed-trigram (absolute last resort).
 *
 * Cached on globalThis — resolution touches the DB and the model download.
 */
export async function getEmbeddings(): Promise<EmbeddingProvider> {
  if (runtime.__medqEmbeddings) return runtime.__medqEmbeddings;

  let resolved: EmbeddingProvider | null = null;
  try {
    const { resolveModel } = await import('../../server/resolve-model');
    for (const candidate of ['openai:text-embedding-3-small', 'deepseek:embedding']) {
      try {
        const config = await resolveModel({ modelString: candidate });
        if (config.apiKey && config.baseUrl) {
          const provider = new OpenAICompatibleEmbeddings(
            `openai-compatible:${config.baseUrl}`,
            config.baseUrl,
            config.apiKey,
          );
          // Health-check before committing (deep-agent pattern: first success wins).
          await provider.embed(['healthcheck']);
          resolved = provider;
          break;
        }
      } catch {
        // Candidate unavailable — try the next.
      }
    }
  } catch {
    // Resolver unavailable — local fallback.
  }

  if (!resolved) {
    // Local neural — verified working in this environment (probe: batch32 in
    // ~280ms, sim(as,mr)=0.69 vs sim(as,cookies)=0.25). Failure → hash.
    try {
      const bge = new BgeLocalEmbeddings();
      await bge.embed(['healthcheck'], { query: true });
      resolved = bge;
    } catch (e) {
      log.warn?.(`bge-local unavailable (${e instanceof Error ? e.message : e}) — falling back to hashed trigrams`);
    }
  }

  runtime.__medqEmbeddings = resolved ?? new LocalHashEmbeddings();
  log.info?.(`Embeddings provider: ${runtime.__medqEmbeddings.id}`);
  return runtime.__medqEmbeddings;
}

// ─── Vector helpers ────────────────────────────────────────────────────────

/** Cosine similarity for L2-normalized vectors (== dot product). */
export function cosineSimilarity(a: Float32Array, b: Float32Array): number {
  const len = Math.min(a.length, b.length);
  let dot = 0;
  for (let i = 0; i < len; i++) dot += a[i] * b[i];
  return dot;
}

/** Float32Array → Uint8Array (Prisma `Bytes` column). */
export function serializeVector(vector: Float32Array): Uint8Array<ArrayBuffer> {
  return new Uint8Array(vector.buffer.slice(0) as ArrayBuffer);
}

/** Prisma `Bytes` → Float32Array (tolerates Buffer). */
export function deserializeVector(bytes: Uint8Array): Float32Array | null {
  if (!bytes || bytes.length === 0 || bytes.length % 4 !== 0) return null;
  return new Float32Array(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
}
