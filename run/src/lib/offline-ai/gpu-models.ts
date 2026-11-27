/**
 * GPU (WebGPU) model catalog for web-llm.
 *
 * web-llm uses MLC-compiled `.bin` model files (NOT GGUF). These models
 * run on the GPU via WebGPU when available — typically 10–50× faster than
 * CPU/WASM inference for the same parameter count.
 *
 * Model choice rationale:
 *   - Llama-3.2-1B: tiny, fast, multilingual. Best default for GPU.
 *   - Llama-3.2-3B: better quality, still fast on GPU (~30 tok/s).
 *   - Qwen2.5-1.5B: medical/technical strong, very fast on GPU.
 *   - Qwen2.5-3B: best quality, ~15 tok/s on mid-range GPU.
 *   - Phi-3.5-mini-3.8B: high quality for size, slower (~10 tok/s).
 *
 * Sizes are approximate (q4f16 quantization, in MB).
 * Speeds are approximate tokens/sec on an M1 / RTX 3060 / mid-range GPU.
 *
 * Models are downloaded on-demand from HuggingFace (mlc-ai organization
 * hosts pre-compiled weights) and cached by the browser.
 */

import type { OfflineModel } from './models';

// Re-export the shared OfflineModel type so callers can use a single type
// regardless of whether they're using CPU or GPU models.
export type { OfflineModel };

export const GPU_MODELS: OfflineModel[] = [
  {
    id: 'Llama-3.2-1B-Instruct-q4f16_1-MLC',
    name: 'Llama 3.2 1B (GPU)',
    description: 'Tiny & fast on GPU. Best default for WebGPU devices.',
    sizeMb: 980,
    tokPerSec: 60,
    repo: 'mlc-ai/Llama-3.2-1B-Instruct-q4f16_1-MLC',
    path: '',
    contextLength: 4096,
    temperature: 0.6,
    topP: 0.9,
    tier: 'tiny',
  },
  {
    id: 'Qwen2.5-1.5B-Instruct-q4f16_1-MLC',
    name: 'Qwen2.5 1.5B (GPU)',
    description: 'Medical/technical strong. ~50 tok/s on GPU.',
    sizeMb: 1300,
    tokPerSec: 50,
    repo: 'mlc-ai/Qwen2.5-1.5B-Instruct-q4f16_1-MLC',
    path: '',
    contextLength: 4096,
    temperature: 0.6,
    topP: 0.9,
    tier: 'small',
  },
  {
    id: 'Llama-3.2-3B-Instruct-q4f16_1-MLC',
    name: 'Llama 3.2 3B (GPU)',
    description: 'Balanced quality + speed. ~30 tok/s on GPU.',
    sizeMb: 2100,
    tokPerSec: 30,
    repo: 'mlc-ai/Llama-3.2-3B-Instruct-q4f16_1-MLC',
    path: '',
    contextLength: 4096,
    temperature: 0.6,
    topP: 0.9,
    tier: 'medium',
  },
  {
    id: 'Qwen2.5-3B-Instruct-q4f16_1-MLC',
    name: 'Qwen2.5 3B (GPU)',
    description: 'Best medical reasoning. ~25 tok/s on GPU.',
    sizeMb: 2300,
    tokPerSec: 25,
    repo: 'mlc-ai/Qwen2.5-3B-Instruct-q4f16_1-MLC',
    path: '',
    contextLength: 4096,
    temperature: 0.6,
    topP: 0.9,
    tier: 'medium',
  },
  {
    id: 'Phi-3.5-mini-instruct-q4f16_1-MLC',
    name: 'Phi 3.5 mini 3.8B (GPU)',
    description: 'Highest quality in this size class. ~15 tok/s on GPU.',
    sizeMb: 2600,
    tokPerSec: 15,
    repo: 'mlc-ai/Phi-3.5-mini-instruct-q4f16_1-MLC',
    path: '',
    contextLength: 4096,
    temperature: 0.6,
    topP: 0.9,
    tier: 'medium',
  },
];

export const DEFAULT_GPU_MODEL_ID = 'Llama-3.2-1B-Instruct-q4f16_1-MLC';

export function getGpuModel(id: string): OfflineModel | undefined {
  return GPU_MODELS.find((m) => m.id === id);
}

/**
 * Build a HuggingFace URL for a web-llm model. web-llm accepts the repo
 * id directly via `CreateMLCEngine(modelId)` — it knows the internal path
 * structure. The `path` field is unused for GPU models.
 */
export function buildGpuModelUrl(model: OfflineModel): string {
  return `https://huggingface.co/${model.repo}`;
}
