import { z } from "zod";
import { useBaseHandler, verifyCodeWithExpiry } from "@/shared/utils";
import { useDatabase } from "@/shared/database";
import { usersTable } from "@/shared";
import { APIError, ErrCode } from "encore.dev/api";
import { eq } from "drizzle-orm";

const BodySchema = z.object({
  activationKey: z.string().min(1),
  userId: z.string().min(1),
});

type BodySchema = z.infer<typeof BodySchema>;

export const useHandler = (req: any) => {
  return useBaseHandler({
    schema: { body: BodySchema },
    request: { body: req },
    handler: async ({ body }: { body: BodySchema }) => {
      const { activationKey, userId } = body;

      const [user, err] = await useDatabase<typeof usersTable>(
        async (db) =>
          await db.query.usersTable.findFirst({
            where: (user, { eq }) => eq(user.id, userId),
          })
      );

      if (err) throw new APIError(ErrCode.DataLoss, "Database error", err);
      if (!user) throw new APIError(ErrCode.NotFound, "Invalid activation key");

      if (user.userRegistered) {
        throw new APIError(ErrCode.AlreadyExists, "User already activated");
      }

      const [isValid, errorValid] = await verifyCodeWithExpiry(
        activationKey,
        user.userActivationKey?.toString()
      );

      if (errorValid || !isValid)
        throw new APIError(
          ErrCode.NotFound,
          "Invalid activation key",
          errorValid ?? new Error("Invalid activation key")
        );

      const [updatedUser, updateErr] = await useDatabase<any>(
        async (db) =>
          await db
            .update(usersTable)
            .set({
              userStatus: "ACTIVE",
              userActivationKey: null,
              userRegistered: new Date(),
              updatedAt: new Date(),
            })
            .where(eq(usersTable.id, userId))
            .returning({
              id: usersTable.id,
              userLogin: usersTable.userLogin,
              userEmail: usersTable.userEmail,
              userStatus: usersTable.userStatus,
              createdAt: usersTable.createdAt,
              updatedAt: usersTable.updatedAt,
            })
      );
      if (updateErr)
        throw new APIError(
          ErrCode.DataLoss,
          "Failed to activate user",
          updateErr
        );

      return {
        message: "ok",
        data: updatedUser?.[0],
        status: 200,
      };
    },
  });
};
