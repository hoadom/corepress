import { SERVICES } from "@/shared/constants";
import { api, APIError, ErrCode } from "encore.dev/api";

export const get = api<Request, Response>(
  {
    expose: true,
    method: "POST",
    path:  "/register",
  },
  async ({ userLogin, userPass, userEmail }) => {
    if(!userLogin || !userPass || !userEmail) {
      throw new APIError(ErrCode.InvalidArgument, "Missing required fields");
    }
    const msg = `Hello ${userLogin} ${userEmail} ${userPass}!`;
    return { message: msg };
  }
);

interface Request {
  userLogin: string;
  userPass: string;
  userEmail: string;
}

interface Response {
  message: string;
}
