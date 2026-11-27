export interface NormalizedModel {
    id: string;
    name: string;
    ownedBy: string;
    available: number;
    enabled: number;
    contextWindow: number | null;
    intel: number;
    platforms: string[];
    supportsTools: boolean;
    /** False when the representative row's upstream explicitly declares a
     *  non-chat capability (#task29 — tts/asr/image/web tool models). Omitted
     *  (true) when there is no capability metadata. Clients that only do chat
     *  completions can hide or badge such entries instead of failing later. */
    chatCapable?: boolean;
    executionStatus: 'ready' | 'needsKey' | 'exhausted';
}
export interface ModelListing {
    models: NormalizedModel[];
    autoContextWindow: number | null;
}
export declare function buildModelListing(): ModelListing;
//# sourceMappingURL=model-listing.d.ts.map