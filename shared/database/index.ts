import 'dotenv/config';
import { Pool } from "pg";
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "./src/shema";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});
export const pgDb = drizzle({ client: pool, schema, logger: true, casing: 'snake_case' });

