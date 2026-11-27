/**
 * GPU / NPU capability detection with tiered fallback.
 *
 * Detection order (best → worst):
 *   1. webgpu  — @mlc-ai/web-llm runs on WebGPU (Chrome 113+, Edge, Safari 17+)
 *   2. webnn   — @huggingface/transformers runs on WebNN (Chrome 138+,
 *                DirectML on Windows, CoreML on Mac, NNAPI on Android)
 *   3. cpu     — wllama + transformers.js fall back to WASM SIMD threads
 *
 * The dispatcher (dispatcher.ts) uses this to pick the right backend for
 * each engine. The user's persistent "preferred model id" in localStorage
 * implicitly encodes their backend choice — we just need to make sure
 * we don't pick a backend the hardware can't support.
 *
 * WebNN is detected via `navigator.ml` (the canonical WebNN API entry
 * point) or `navigator.ai.*` (the older Chrome Origin Trial shape).
 *
 * This module is browser-only.
 */

export type GpuCapability = 'webgpu' | 'webnn' | 'cpu-only';

export interface CapabilityProbe {
  /** Best-available tier. */
  tier: GpuCapability;
  /** Detailed flags for UI display. */
  hasWebGPU: boolean;
  hasWebNN: boolean;
  /** WebGPU adapter info if available (for diagnostics). */
  adapterInfo?: string;
}

/**
 * Synchronously returns true if `navigator.gpu` exists.
 */
export function hasWebGPUSupport(): boolean {
  if (typeof navigator === 'undefined') return false;
  return typeof (navigator as unknown as { gpu?: unknown }).gpu !== 'undefined';
}

/**
 * Synchronously returns true if a WebNN entry point is present.
 * WebNN is shipped behind `navigator.ml` (canonical) or `navigator.ai`
 * (older Origin Trial). Either is sufficient for transformers.js to use
 * the WebNN execution provider in ONNX Runtime Web.
 */
export function hasWebNNSupport(): boolean {
  if (typeof navigator === 'undefined') return false;
  const nav = navigator as unknown as {
    ml?: unknown;
    ai?: { createGenericModel?: unknown; createGpuModel?: unknown; createNpuModel?: unknown };
  };
  if (typeof nav.ml !== 'undefined') return true;
  if (nav.ai && (typeof nav.ai.createGenericModel === 'function' || typeof nav.ai.createGpuModel === 'function')) {
    return true;
  }
  return false;
}

let cachedResult: CapabilityProbe | null = null;
let probePromise: Promise<CapabilityProbe> | null = null;

/**
 * Asynchronously probe for WebGPU, then WebNN, then fall back to cpu-only.
 *
 * Caches the result for the session — capability doesn't change during a
 * page lifetime (even if a user connects an eGPU, the adapter list doesn't
 * refresh without a reload).
 */
export async function detectGpuCapability(): Promise<GpuCapability> {
  const probe = await detectCapabilityProbe();
  return probe.tier;
}

/**
 * Full probe with detail flags. Use this from the settings UI.
 */
export async function detectCapabilityProbe(): Promise<CapabilityProbe> {
  if (cachedResult) return cachedResult;
  if (probePromise) return probePromise;

  probePromise = (async () => {
    if (typeof navigator === 'undefined') {
      cachedResult = {
        tier: 'cpu-only',
        hasWebGPU: false,
        hasWebNN: false,
      };
      return cachedResult;
    }

    // ── Step 1: try WebGPU ──
    let webgpuTier = false;
    let adapterInfo: string | undefined;
    const gpu = (navigator as unknown as {
      gpu?: { requestAdapter?: (opts?: unknown) => Promise<{ info?: { description?: string }; requestAdapterInfo?: () => Promise<{ description?: string }> } | null> };
    }).gpu;
    if (gpu && typeof gpu.requestAdapter === 'function') {
      try {
        const adapter = await gpu.requestAdapter();
        if (adapter) {
          webgpuTier = true;
          // Adapter info is optional — Chrome exposes `adapter.info`,
          // Safari returns it via `requestAdapterInfo()`. Best-effort.
          try {
            const info = adapter.info ?? (adapter.requestAdapterInfo ? await adapter.requestAdapterInfo() : undefined);
            adapterInfo = info?.description;
          } catch {
            /* adapter info unavailable — not fatal */
          }
        }
      } catch {
        /* WebGPU present but adapter request failed — fall through */
      }
    }

    if (webgpuTier) {
      cachedResult = {
        tier: 'webgpu',
        hasWebGPU: true,
        // We still check WebNN even when WebGPU is available — WebNN can
        // be faster for transformers.js workloads even on machines with
        // WebGPU. The dispatcher picks which engine to use, not this module.
        hasWebNN: hasWebNNSupport(),
        adapterInfo,
      };
      return cachedResult;
    }

    // ── Step 2: try WebNN (no WebGPU) ──
    if (hasWebNNSupport()) {
      cachedResult = {
        tier: 'webnn',
        hasWebGPU: false,
        hasWebNN: true,
      };
      return cachedResult;
    }

    // ── Step 3: CPU only ──
    cachedResult = {
      tier: 'cpu-only',
      hasWebGPU: false,
      hasWebNN: false,
    };
    return cachedResult;
  })();

  return probePromise;
}

/**
 * Human-readable label for the GPU capability tier.
 */
export function gpuLabel(cap: GpuCapability): string {
  switch (cap) {
    case 'webgpu':
      return 'WebGPU (GPU)';
    case 'webnn':
      return 'WebNN (NPU/GPU native)';
    case 'cpu-only':
      return 'CPU only (WASM SIMD)';
  }
}
