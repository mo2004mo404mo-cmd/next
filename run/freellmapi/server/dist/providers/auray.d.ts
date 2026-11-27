import type { ChatCompletionChunk, ChatCompletionResponse, ChatMessage } from '@freellmapi/shared/types.js';
import { type CompletionOptions, type KeyValidationResult } from './base.js';
import { OpenAICompatProvider } from './openai-compat.js';
import type { QuotaObservationContext } from '../services/provider-quota.js';
export declare const AURAY_BASE_URL = "https://api.auray.ai/openai/v1";
/** Free credits renew monthly and are shared across chat and embeddings.
 * Only the signed catalog decides which models qualify; no bundled seeds.
 * https://www.auray.ai/docs/clients/openai */
export declare class AurayProvider extends OpenAICompatProvider {
    constructor();
    protected validationResult(response: Response): Promise<KeyValidationResult>;
    chatCompletion(apiKey: string, messages: ChatMessage[], modelId: string, options?: CompletionOptions, quotaContext?: QuotaObservationContext): Promise<ChatCompletionResponse>;
    streamChatCompletion(apiKey: string, messages: ChatMessage[], modelId: string, options?: CompletionOptions, quotaContext?: QuotaObservationContext): AsyncGenerator<ChatCompletionChunk>;
}
//# sourceMappingURL=auray.d.ts.map