import { PoolClient } from "pg";

interface QueryResult {
  query: string;
  success: boolean;
  error?: any;
  result?: any;
}

interface ExecuteRawSqlOptions {
  batchSize?: number;
}

/**
 * Executes raw SQL queries in batches and returns results/errors for each query.
 * @param client pg client instance
 * @param queries array of raw SQL query strings
 * @param options batchSize controls concurrency, default 50
 */
export async function executeRawSqlQueries(
  client: PoolClient,
  queries: string[],
  options: ExecuteRawSqlOptions = {}
): Promise<QueryResult[]> {
  const batchSize = options.batchSize ?? 50;
  const results: QueryResult[] = [];

  for (let i = 0; i < queries.length; i += batchSize) {
    const batch = queries.slice(i, i + batchSize);

    // Run all queries in the batch concurrently and wait for all to settle
    const settled = await Promise.allSettled(
      batch.map((query) => client.query(query))
    );

    settled.forEach((res, idx) => {
      if (res.status === "fulfilled") {
        results.push({
          query: batch[idx],
          success: true,
          result: res.value,
        });
      } else {
        results.push({
          query: batch[idx],
          success: false,
          error: res.reason,
        });
      }
    });
  }

  return results;
}
