import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./src/shema";

export const pgDb = drizzle(process.env.DATABASE_URL!, {
  schema,
  logger: true,
  casing: "snake_case",
});
