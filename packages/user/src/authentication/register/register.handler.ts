import { useHandler } from "@/shared/utils";
import { z } from "zod";
import { pgDb } from "@/shared/database";

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
      const data = await pgDb.query.usersTable.findMany();
      console.log("🚀 ~ handler: ~ data:", data);
      return {
        message: "User registered" + userLogin,
        data: [{ name: 100 }],
        meta: { page: 1 },
        status: 200,
      };
    },
  });
};
