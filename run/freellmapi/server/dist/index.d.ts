import './env.js';
import type { Server } from 'node:http';
export interface StartOptions {
    /** Listen port override (config/env otherwise). Pass 0 for an ephemeral port. */
    port?: number | string;
    /** Bind host override (config/env otherwise). */
    host?: string;
    /**
     * True when booted inside the MedQ host process. Skips the process-level
     * hooks the standalone binary owns: the safety net would exit(1) the whole
     * host app on a Next-side error, and the signal handlers would race the
     * host's own graceful shutdown. The host owns signals; we only close the
     * SQLite handle on process exit.
     */
    embedded?: boolean;
}
export declare function startServer(opts?: StartOptions): Promise<Server>;
//# sourceMappingURL=index.d.ts.map