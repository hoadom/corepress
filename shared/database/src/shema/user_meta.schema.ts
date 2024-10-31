import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from './user.schema';

export const userMetaTable = pgTable("user_meta", {
    metaId: uuid().primaryKey().defaultRandom(),                   // UUID primary key with default value
    userId: uuid().references(() => usersTable.id),            // Foreign key referencing users(id)
    metaKey: varchar({ length: 255 }),                            // meta_key column
    metaValue: text(),                                            // meta_value column
    createdAt: timestamp().defaultNow(),                          // created_at column with default value of NOW()
});
