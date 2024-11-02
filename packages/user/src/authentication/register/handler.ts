import { z } from "zod";
import { useBaseHandler, hashCodeWithExpiry } from "@/shared/utils";
import { useDatabase } from "@/shared/database";
import { usersTable } from "@/shared";
import { APIError, ErrCode } from "encore.dev/api";
import { randomUUID } from "crypto";

const RegisterBodySchema = z.object({
  userLogin: z.string().min(1),
  userPass: z.string().min(4),
  userEmail: z.string().email(),
});

type RegisterBodySchema = z.infer<typeof RegisterBodySchema>;

export const useRegister = (req: any) => {
  return useBaseHandler({
    schema: { body: RegisterBodySchema },
    request: { body: req },
    handler: async ({ body }: { body: RegisterBodySchema }) => {
      const { userLogin, userPass, userEmail } = body;

      // Check if user already exists
      const [data, err] = await useDatabase<typeof usersTable>((db) =>
        db.query.usersTable.findFirst({
          where: (users, { eq, or }) =>
            or(
              eq(users.userLogin, userLogin),
              eq(users.userEmail, body.userEmail)
            ),
        })
      );
      if (err) throw new APIError(ErrCode.DataLoss, "Database error", err);

      if (data?.id)
        throw new APIError(ErrCode.AlreadyExists, "User already exists");

      // Hash the password
      const { hashedCode: hashedUserPass } = await hashCodeWithExpiry(
        userPass,
        12
      );

      const activationKey = randomUUID();
      const { hashedCode: hashedActivationKey } = await hashCodeWithExpiry(
        activationKey,
        2
      );

      // Insert new user into database
      const [newUser, insertErr] = await useDatabase<any>((db) =>
        db
          .insert(usersTable)
          .values({
            userLogin,
            userPass: hashedUserPass,
            userEmail,
            userStatus: "INACTIVE",
            userActivationKey: hashedActivationKey,
          })
          .returning({
            id: usersTable.id,
            userLogin: usersTable.userLogin,
            userEmail: usersTable.userEmail,
            userStatus: usersTable.userStatus,
            createdAt: usersTable.createdAt,
            updatedAt: usersTable.updatedAt,
          })
      );
      if (insertErr) {
        throw new APIError(ErrCode.DataLoss, "Database error", insertErr);
      }

      return {
        message: "ok",
        data: newUser?.[0],
        meta: { activationKey },
        status: 200,
      };
    },
  });
};
