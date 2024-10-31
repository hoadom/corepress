import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./src/shema";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export const pgDb = drizzle({
  client: pool,
  schema,
  logger: true,
});

export const useDatabase = async <T>(
  handler: (db: typeof pgDb) => any
): Promise<[T | null, Error | null]> => {
  try {
    const res = (await handler(pgDb)) as T;
    return [res, null];
  } catch (error: any) {
    return [null, error];
  }
};
