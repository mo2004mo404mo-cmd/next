export type FetchLike = (url: string, init?: RequestInit) => Promise<Response>;
export declare function fetchWithEdgeFailover(doFetch: FetchLike, url: string, init?: RequestInit): Promise<Response>;
//# sourceMappingURL=edge-failover.d.ts.map