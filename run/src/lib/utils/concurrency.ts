/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/utils/concurrency.ts
 *
 * Verbatim port — pure TypeScript, no deps.
 */

/** A FIFO counting semaphore: at most `size` `run()` callbacks execute at once. */
function createSemaphore(size: number) {
  const max = Math.max(1, Math.floor(size));
  let active = 0;
  const queue: Array<() => void> = [];

  const pump = () => {
    while (active < max && queue.length > 0) {
      active += 1;
      const start = queue.shift()!;
      start();
    }
  };

  return {
    run<R>(fn: () => Promise<R>): Promise<R> {
      return new Promise<R>((resolve, reject) => {
        queue.push(() => {
          fn()
            .then(resolve, reject)
            .finally(() => {
              active -= 1;
              pump();
            });
        });
        pump();
      });
    },
  };
}

/**
 * Start `fn` over every item with at most `limit` calls in flight at once, and
 * return one promise per item **immediately**, in input order — without awaiting
 * them. Each item acquires a `limit`-sized semaphore slot before `fn` runs, so
 * all the promises exist up front but only `limit` execute concurrently.
 */
export function lazyBoundedMap<T, R>(
  items: readonly T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>,
  options?: { shouldContinue?: () => boolean },
): Array<Promise<R | undefined>> {
  const shouldContinue = options?.shouldContinue ?? (() => true);
  const semaphore = createSemaphore(Math.min(Math.floor(limit), items.length || 1));
  return items.map((item, index) =>
    semaphore.run(async () => (shouldContinue() ? fn(item, index) : undefined)),
  );
}

/**
 * Run `fn` over `items` with at most `limit` calls in flight at once and await
 * them all (a barrier). Results are returned in input order; a slot is
 * `undefined` if its item was skipped because `shouldContinue` turned false.
 */
export async function mapWithConcurrency<T, R>(
  items: readonly T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>,
  options?: { shouldContinue?: () => boolean },
): Promise<Array<R | undefined>> {
  return Promise.all(lazyBoundedMap(items, limit, fn, options));
}
