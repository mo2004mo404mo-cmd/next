import type { Db } from '../db/types.js';
import type { Scheduler } from '../lib/scheduler.js';
/** Interval in ms from `CUSTOM_MODEL_SYNC_INTERVAL_MS`; 0 disables the pass,
 *  anything unset or malformed falls back to the daily default. */
export declare function customModelSyncIntervalMs(): number;
/** Comma-separated glob patterns of model ids that are known-free (#746).
 *  When set, the sync registers ONLY models matching a pattern — anything else
 *  (presumably paid) is skipped, honoring the repo's free-only policy. When
 *  unset, the sync keeps its legacy behavior of registering everything, so
 *  existing operators are unaffected. */
export declare function customModelSyncFreePatterns(): string[];
export interface CustomModelSyncResult {
    endpoints: number;
    /** Models registered for the first time. */
    added: number;
    /** Models already on this endpoint that were skipped. */
    skipped: number;
    /** Models skipped because they matched no free pattern (#746). */
    paidSkipped: number;
    /** Models skipped because the operator deleted them and they must stay deleted (#926). */
    tombstoned: number;
    /** Models skipped because they are discernibly not chat models — embedding,
     *  image, audio, transcription, video, web-search or web-reader ids (#1051,
     *  #task29). Registering those as chat models is how they used to 404/400
     *  forever. */
    nonChatSkipped: number;
    /** Already-registered models whose stored upstream capability was refreshed
     *  from the endpoint's own /models declaration (#task29). Backfills the
     *  proxy's chat gate for rows that pre-date capability capture. */
    capabilityEnriched: number;
    failures: Array<{
        baseUrl: string;
        error: string;
    }>;
}
/** Sync every configured custom endpoint once. Exported so tests (and an admin
 *  that wants a manual pass) can run it directly without waiting for the timer. */
export declare function runCustomModelSync(db: Db): Promise<CustomModelSyncResult>;
/** Register the daily pass on the server's scheduler. Returns null when the
 *  interval is configured to 0 (disabled). */
export declare function startCustomModelSync(db: Db, scheduler: Scheduler): (() => void) | null;
//# sourceMappingURL=custom-model-sync.d.ts.map