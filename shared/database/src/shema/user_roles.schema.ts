import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { usersTable } from './user.schema';
import { rolesTable } from './roles.schema';


export const userRolesTable = table("user_roles", {
    userId: t.uuid().notNull().references(() => usersTable.id),   // UUID foreign key referencing users(id)
    roleId: t.uuid().notNull().references(() => rolesTable.roleId), // UUID foreign key referencing roles(role_id)
}, (table) => {
    return {
        userIdIndex: t.index("user_id").on(table.userId),
        roleIdIndex: t.index("role_id").on(table.roleId),
    }
});
