import { type KeyValidationResult } from './base.js';
import { SearchOnlyProvider } from './search-only.js';
export declare const SERPSEARCH_BASE_URL = "https://api.serpsearch.com/api/v1";
export declare class SerpSearchProvider extends SearchOnlyProvider {
    readonly platform: "serpsearch";
    readonly name = "SerpSearch";
    validateKey(apiKey: string): Promise<KeyValidationResult>;
}
//# sourceMappingURL=serpsearch.d.ts.map