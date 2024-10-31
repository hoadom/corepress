import { useHandler } from "@/shared/utils";
import { z } from "zod";
import { pgDb, useDatabase } from "@/shared/database";
import { APIError, ErrCode } from "encore.dev/api";

const RegisterBodySchema = z.object({
  userLogin: z.string().min(1),
  userPass: z.string().min(4),
  userEmail: z.string().email(),
});

type RegisterBodySchema = z.infer<typeof RegisterBodySchema>;

export const useRegister = (req: any) => {
  return useHandler({
    schema: { body: RegisterBodySchema },
    request: { body: req },
    handler: async ({ body }: { body: RegisterBodySchema }) => {
      const { userLogin } = body;
      const [data, err] = await useDatabase<any[]>((db) =>
        db.query.usersTable.findMany()
      );
      if (err) {
        throw new APIError(ErrCode.InvalidArgument, "Missing required fields");
      }
      return {
        message: "User registered" + userLogin,
        data,
        meta: { page: 1 },
        status: 200,
      };
    },
  });
};
