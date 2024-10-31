import { pgTable, varchar, uuid, timestamp, smallint } from "drizzle-orm/pg-core";


export const UserStatusEnum = {
    INACTIVE: 0,
    ACTIVE: 1,
    SUSPENDED: 2,
    BANNED: 3,
};

export const usersTable = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(), // UUID primary key with default value
    userLogin: varchar({ length: 60 }).notNull(),            // user_login column
    userPass: varchar({ length: 255 }).notNull(),            // user_pass column
    userNicename: varchar({ length: 50 }),                   // user_nicename column
    userEmail: varchar({ length: 100 }).notNull(),           // user_email column
    userUrl: varchar({ length: 100 }),                       // user_url column
    userRegistered: timestamp().notNull(),                   // user_registered column
    userActivationKey: varchar({ length: 255 }),            // user_activation_key column
    userStatus: smallint().default(UserStatusEnum.INACTIVE), // user_status column with default value from enum
    displayName: varchar({ length: 250 }),                   // display_name column
    createdAt: timestamp().defaultNow(),                     // created_at column with default value of NOW()
    updatedAt: timestamp().defaultNow(),                     // updated_at column
});

