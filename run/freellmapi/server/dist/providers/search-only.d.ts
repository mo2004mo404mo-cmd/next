import type { ChatCompletionChunk, ChatCompletionResponse, ChatMessage } from '@freellmapi/shared/types.js';
import { BaseProvider, type CompletionOptions, type KeyValidationResult } from './base.js';
export declare abstract class SearchOnlyProvider extends BaseProvider {
    private chatRefusal;
    chatCompletion(_apiKey: string, _messages: ChatMessage[], _modelId: string, _options?: CompletionOptions): Promise<ChatCompletionResponse>;
    streamChatCompletion(_apiKey: string, _messages: ChatMessage[], _modelId: string, _options?: CompletionOptions): AsyncGenerator<ChatCompletionChunk>;
    /** Shared verdict for a validation probe: 401/403 is a bad key, any other
     *  4xx (usage cap, out of credits, malformed probe) still proves the key
     *  authenticated, and 5xx/transport failures are inconclusive. */
    protected probe(url: string, init: RequestInit): Promise<KeyValidationResult>;
}
//# sourceMappingURL=search-only.d.ts.map