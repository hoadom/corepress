import { pgTable, varchar, uuid, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const UserStatusEnum = pgEnum("UserStatusEnum", [
  "INACTIVE",
  "ACTIVE",
  "SUSPENDED",
  "BANNED",
]);

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  userLogin: varchar({ length: 60 }).notNull().unique(),
  userPass: varchar({ length: 255 }).notNull(),
  userNicename: varchar({ length: 50 }),
  userEmail: varchar({ length: 100 }).notNull().unique(),
  userUrl: varchar({ length: 100 }),
  userRegistered: timestamp(),
  userActivationKey: varchar({ length: 255 }),
  userStatus: UserStatusEnum("INACTIVE"),
  displayName: varchar({ length: 250 }),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});
