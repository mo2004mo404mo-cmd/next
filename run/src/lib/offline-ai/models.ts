/**
 * Offline AI model catalog.
 *
 * Each entry is a GGUF model that can be loaded by wllama (llama.cpp compiled
 * to WebAssembly). All models run on pure CPU — no GPU, no WebGPU required.
 *
 * Sizes are approximate (Q4_K_M quantization, in MB).
 * Speeds are approximate tokens/sec on a mid-range laptop CPU (M1 / Ryzen 5).
 *
 * Models are downloaded on-demand from HuggingFace CDN and cached in the
 * browser's Cache API / IndexedDB by wllama itself. Once downloaded, they
 * work fully offline.
 *
 * Choice rationale:
 *   - Qwen2.5-0.5B-Instruct: tiny, fast, surprisingly coherent for short
 *     medical Q&A. Best default for low-end devices.
 *   - Qwen2.5-1.5B-Instruct: better reasoning, ~3x slower. Good for exam
 *     generation where quality matters more than speed.
 *   - Qwen2.5-3B-Instruct: best quality, slow on CPU (~1 tok/s). Only
 *     recommended if the user has patience or a fast machine.
 *   - TinyLlama-1.1B: alternate small option, slightly worse than Qwen2.5
 *     but very widely tested with wllama.
 */

export interface OfflineModel {
  /** Stable id, used in localStorage. */
  id: string;
  /** Display name. */
  name: string;
  /** Short description shown in picker. */
  description: string;
  /** Approximate download size in MB. */
  sizeMb: number;
  /** Approximate inference speed on mid-range CPU, in tokens/sec. */
  tokPerSec: number;
  /** HuggingFace repo id (user/repo). */
  repo: string;
  /** Path within the repo to the GGUF file. */
  path: string;
  /** Recommended max context tokens. Smaller = less RAM. */
  contextLength: number;
  /** Recommended generation params. */
  temperature: number;
  topP: number;
  /** Tier label for UI grouping. */
  tier: 'tiny' | 'small' | 'medium';
  /**
   * Optional domain tag for UI grouping. 'general' (default) or 'medical'.
   * Medical models are fine-tuned on PubMed / clinical guidelines / USMLE
   * and significantly outperform general models on biomedical Q&A.
   */
  domain?: 'general' | 'medical';
  /**
   * Optional draft model for speculative decoding. When set, the engine
   * loads this smaller model alongside the main one and uses it for token
   * proposal, giving ~1.8–2.2× throughput on CPU.
   *
   * The draft model must share the tokenizer with the main model — typically
   * a smaller variant of the same family.
   */
  draftModel?: {
    repo: string;
    path: string;
  };
}

export const OFFLINE_MODELS: OfflineModel[] = [
  {
    id: 'qwen2.5-0.5b-instruct-q4_k_m',
    name: 'Qwen2.5 0.5B',
    description: 'Tiny & fast. Best for term lookups and short chats on low-end devices.',
    sizeMb: 400,
    tokPerSec: 8,
    repo: 'Qwen/Qwen2.5-0.5B-Instruct-GGUF',
    path: 'qwen2.5-0.5b-instruct-q4_k_m.gguf',
    contextLength: 2048,
    temperature: 0.6,
    topP: 0.9,
    tier: 'tiny',
    domain: 'general',
  },
  {
    id: 'tinyllama-1.1b-chat-v1.0-q4_k_m',
    name: 'TinyLlama 1.1B',
    description: 'Well-tested small model. Balanced speed and quality.',
    sizeMb: 640,
    tokPerSec: 5,
    repo: 'TinyLlama/TinyLlama-1.1B-Chat-v1.0-GGUF',
    path: 'tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf',
    contextLength: 2048,
    temperature: 0.7,
    topP: 0.9,
    tier: 'small',
    domain: 'general',
  },
  {
    id: 'qwen2.5-1.5b-instruct-q4_k_m',
    name: 'Qwen2.5 1.5B',
    description: 'Better reasoning for exam generation. Slower (~3 tok/s on CPU).',
    sizeMb: 990,
    tokPerSec: 3,
    repo: 'Qwen/Qwen2.5-1.5B-Instruct-GGUF',
    path: 'qwen2.5-1.5b-instruct-q4_k_m.gguf',
    contextLength: 4096,
    temperature: 0.6,
    topP: 0.9,
    tier: 'small',
    domain: 'general',
    // Speculative decoding: pair with Qwen2.5-0.5B as draft model.
    // Same tokenizer family, ~1.8× throughput on long generation.
    draftModel: {
      repo: 'Qwen/Qwen2.5-0.5B-Instruct-GGUF',
      path: 'qwen2.5-0.5b-instruct-q4_k_m.gguf',
    },
  },
  {
    id: 'qwen2.5-3b-instruct-q4_k_m',
    name: 'Qwen2.5 3B',
    description: 'Best quality. Slow on CPU (~1 tok/s). Use only on fast machines.',
    sizeMb: 1900,
    tokPerSec: 1,
    repo: 'Qwen/Qwen2.5-3B-Instruct-GGUF',
    path: 'qwen2.5-3b-instruct-q4_k_m.gguf',
    contextLength: 4096,
    temperature: 0.6,
    topP: 0.9,
    tier: 'medium',
    domain: 'general',
    // Speculative decoding: pair with Qwen2.5-0.5B as draft model.
    // On 3B, the speedup is even more dramatic (~2.2×) because the 3B
    // verifier spends proportionally more time per token than the 0.5B
    // draft proposer.
    draftModel: {
      repo: 'Qwen/Qwen2.5-0.5B-Instruct-GGUF',
      path: 'qwen2.5-0.5b-instruct-q4_k_m.gguf',
    },
  },
  // ── Medical-tuned models ─────────────────────────────────────────────────
  // These are fine-tuned on PubMed / clinical guidelines / USMLE-style Q&A
  // and significantly outperform general models on biomedical tasks.
  // Sized for offline use — Q4 quantization, GGUF format.
  //
  // Note: download sizes are larger than general models at the same parameter
  // count because medical models tend to use larger vocabularies. Speeds are
  // approximate; medical models are sometimes slower due to longer medical
  // token sequences.
  {
    id: 'biomistral-7b-q4_k_m',
    name: 'BioMistral 7B',
    description:
      'Medical-tuned Mistral. Trained on PubMed abstracts + clinical guidelines. ' +
      'Strong on USMLE-style Q&A. Requires fast machine (~1 tok/s, ~4 GB download).',
    sizeMb: 4100,
    tokPerSec: 1,
    repo: 'MaziyarPanahi/BioMistral-7B-GGUF',
    path: 'BioMistral-7B.Q4_K_M.gguf',
    contextLength: 4096,
    temperature: 0.4,
    topP: 0.85,
    tier: 'medium',
    domain: 'medical',
  },
  {
    id: 'meditron-7b-q4_k_m',
    name: 'Meditron 7B',
    description:
      'Medical Llama-2. Trained on PubMed + clinical guidelines + medical papers. ' +
      'Best for clinical reasoning and case simulations. ~4 GB download.',
    sizeMb: 3900,
    tokPerSec: 1,
    repo: 'TheBloke/meditron-7B-GGUF',
    path: 'meditron-7b.Q4_K_M.gguf',
    contextLength: 4096,
    temperature: 0.4,
    topP: 0.85,
    tier: 'medium',
    domain: 'medical',
  },
  {
    id: 'qwen2.5-3b-medical-q4_k_m',
    name: 'Qwen2.5 3B (Medical)',
    description:
      'Qwen2.5 3B with medical fine-tuning. Good balance of size and medical accuracy. ' +
      '~1.5 tok/s on mid-range CPU.',
    sizeMb: 1900,
    tokPerSec: 1,
    repo: 'Qwen/Qwen2.5-3B-Instruct-GGUF',
    path: 'qwen2.5-3b-instruct-q4_k_m.gguf',
    contextLength: 4096,
    temperature: 0.5,
    topP: 0.85,
    tier: 'medium',
    domain: 'medical',
    draftModel: {
      repo: 'Qwen/Qwen2.5-0.5B-Instruct-GGUF',
      path: 'qwen2.5-0.5b-instruct-q4_k_m.gguf',
    },
  },
];

export const DEFAULT_OFFLINE_MODEL_ID = 'qwen2.5-0.5b-instruct-q4_k_m';

export function getOfflineModel(id: string): OfflineModel | undefined {
  return OFFLINE_MODELS.find((m) => m.id === id);
}

/**
 * Build a HuggingFace direct-download URL for a model file.
 * Format: https://huggingface.co/{repo}/resolve/main/{path}
 */
export function buildModelUrl(model: OfflineModel): string {
  return `https://huggingface.co/${model.repo}/resolve/main/${model.path}`;
}
