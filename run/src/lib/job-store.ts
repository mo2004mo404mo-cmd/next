/**
 * File-backed job store for async generation tasks.
 * Persists jobs to .job-store.json so they survive server restarts (HMR, crash, etc.).
 * Uses batched (debounced) writes to avoid excessive disk I/O.
 * Auto-cleans completed/failed jobs after 10 minutes.
 * On startup, marks any jobs stuck in "processing" for >10 minutes as "failed".
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface GenerationJob {
  id: string;
  status: JobStatus;
  progress: string;
  attempt: number;
  result: unknown[] | null;
  partialResult: unknown | null;  // Latest single question saved during progress
  error: string | null;
  createdAt: number;
  updatedAt: number;
}

// ---------------------------------------------------------------------------
// Persistence helpers
// ---------------------------------------------------------------------------

const STORE_PATH = join(process.cwd(), '.job-store.json');
const JOB_TTL_MS = 10 * 60 * 1000; // 10 minutes
const STALE_THRESHOLD_MS = 10 * 60 * 1000; // 10 minutes — only mark processing jobs older than this as failed

/** Strip large fields (e.g. imageBase64) from results before writing to disk. */
function sanitizeForDisk(job: GenerationJob): GenerationJob {
  if (!job.result || !Array.isArray(job.result)) return job;

  const sanitizedResult = job.result.map((item: unknown) => {
    if (item && typeof item === 'object') {
      const clone = { ...(item as Record<string, unknown>) };
      if ('imageBase64' in clone) {
        delete clone.imageBase64;
      }
      return clone;
    }
    return item;
  });

  return { ...job, result: sanitizedResult };
}

// ---------------------------------------------------------------------------
// Load from disk on module init
// ---------------------------------------------------------------------------

const jobs = new Map<string, GenerationJob>();
let jobCounter = 0;
let writeScheduled = false;

try {
  if (existsSync(STORE_PATH)) {
    const raw = readFileSync(STORE_PATH, 'utf-8');
    const data = JSON.parse(raw) as { jobs: GenerationJob[]; jobCounter: number };

    const now = Date.now();

    for (const job of data.jobs) {
      // Stale processing detection: only mark as failed if processing for >10 min
      if (job.status === 'processing' && now - job.updatedAt > STALE_THRESHOLD_MS) {
        job.status = 'failed';
        job.error = 'Job was interrupted by a server restart. Please try again.';
        job.updatedAt = now;
      }
      jobs.set(job.id, job);
    }

    // Restore jobCounter so new IDs don't collide
    if (typeof data.jobCounter === 'number') {
      jobCounter = data.jobCounter;
    }

    // Persist the cleaned-up state immediately
    flushToDisk();
  }
} catch (err) {
  // If we can't read/parse the file, start fresh — don't crash the server
  console.warn('[job-store] Failed to load persisted jobs, starting fresh:', err);
}

// ---------------------------------------------------------------------------
// Batched (debounced) writes
// ---------------------------------------------------------------------------

function flushToDisk(): void {
  try {
    const allJobs = Array.from(jobs.values()).map(sanitizeForDisk);
    writeFileSync(STORE_PATH, JSON.stringify({ jobs: allJobs, jobCounter }), 'utf-8');
  } catch (err) {
    console.error('[job-store] Failed to flush jobs to disk:', err);
  }
  writeScheduled = false;
}

function scheduleWrite(): void {
  if (writeScheduled) return; // already scheduled
  writeScheduled = true;
  // Use a microtask-style short delay (setImmediate in Node, fallback to setTimeout)
  // This batches multiple updateJob calls in the same tick / near-future
  const schedule = typeof setImmediate === 'function' ? setImmediate : (fn: () => void) => setTimeout(fn, 0);
  schedule(flushToDisk);
}

// ---------------------------------------------------------------------------
// Auto-cleanup: remove completed/failed jobs older than TTL
// ---------------------------------------------------------------------------

setInterval(() => {
  const now = Date.now();
  let changed = false;

  for (const [id, job] of jobs) {
    if ((job.status === 'completed' || job.status === 'failed') && now - job.updatedAt > JOB_TTL_MS) {
      jobs.delete(id);
      changed = true;
    }
  }

  if (changed) {
    scheduleWrite();
  }
}, 5 * 60 * 1000);

// ---------------------------------------------------------------------------
// Public API (same signatures as before)
// ---------------------------------------------------------------------------

/**
 * Create a new job and return its ID
 */
export function createJob(): string {
  jobCounter++;
  const id = `job_${Date.now()}_${jobCounter}`;
  const now = Date.now();

  jobs.set(id, {
    id,
    status: 'pending',
    progress: 'Starting...',
    attempt: 0,
    result: null,
    partialResult: null,
    error: null,
    createdAt: now,
    updatedAt: now,
  });

  scheduleWrite();
  return id;
}

/**
 * Update a job's status
 */
export function updateJob(id: string, updates: Partial<Omit<GenerationJob, 'id' | 'createdAt'>>): void {
  const job = jobs.get(id);
  if (!job) return;

  Object.assign(job, updates, { updatedAt: Date.now() });
  scheduleWrite();
}

/**
 * Get a job's data
 */
export function getJob(id: string): GenerationJob | null {
  return jobs.get(id) || null;
}

/**
 * Delete a job
 */
export function deleteJob(id: string): void {
  jobs.delete(id);
  scheduleWrite();
}
