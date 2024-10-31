import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const rolesTable = pgTable("roles", {
    roleId: uuid().defaultRandom().primaryKey(),     // UUID as primary key with default random UUID generation
    roleName: varchar({ length: 50 }).notNull(),     // role_name column with a NOT NULL constraint
    roleDescription: text(),                        // role_description column (optional)
    createdAt: timestamp().defaultNow(),            // created_at column with default value of NOW()
});
