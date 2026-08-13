/**
 * Runs `worker` over `items` with at most `limit` in flight at once.
 * Avoids hammering external APIs with too many simultaneous requests.
 */
export async function runWithConcurrency<T, R>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let currentIndex = 0;

  const workerTask = async () => {
    while (currentIndex < items.length) {
      const i = currentIndex++;
      results[i] = await worker(items[i], i);
    }
  };

  const poolSize = Math.min(limit, items.length);
  const workers = Array.from({ length: poolSize }, workerTask);
  
  await Promise.all(workers);
  return results;
}
