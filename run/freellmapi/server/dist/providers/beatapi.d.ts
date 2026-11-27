import type { ChatCompletionChunk, ChatCompletionResponse } from '@freellmapi/shared/types.js';
import { BaseProvider, type KeyValidationResult } from './base.js';
export declare const BEATAPI_BASE_URL = "https://api.beatapi.io/v1";
/** Decision-only integration. Model availability and promotional terms live
 * in the signed catalog, not bundled seeds or the chat router. */
export declare class BeatApiProvider extends BaseProvider {
    readonly platform: "beatapi";
    readonly name = "BeatAPI";
    validateKey(apiKey: string): Promise<KeyValidationResult>;
    chatCompletion(): Promise<ChatCompletionResponse>;
    streamChatCompletion(): AsyncGenerator<ChatCompletionChunk>;
}
//# sourceMappingURL=beatapi.d.ts.map