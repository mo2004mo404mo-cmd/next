import type { Db } from '../types.js';
/**
 * Upstream-declared model capability for custom endpoints (#task29).
 *
 * Some OpenAI-compatible gateways label every /models entry with a
 * `capability` field ("chat" | "vision" | "tts" | "asr" | "image-gen" |
 * "image-edit" | "web-search" | "web-reader"). Only chat/vision entries are
 * served through /v1/chat/completions — the rest are tool models that live on
 * dedicated endpoints, and registering them as chat models is how a playground
 * pick ends as "All routed providers rejected the request as invalid" after
 * burning an attempt on every key (upstream 400: Model X does not support
 * /v1/chat/completions).
 *
 * NULL = unknown / chat as far as anyone can tell (built-in catalog rows,
 * relays that ship no capability metadata) — the gate never fires on NULL, so
 * this is strictly additive evidence.
 */
export declare function up(db: Db): void;
export declare function down(db: Db): void;
//# sourceMappingURL=20261026_000001_model_upstream_capability.d.ts.map