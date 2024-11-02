import { api } from "encore.dev/api";
import { useRegister } from "./handler";

interface Request {
  userLogin: string;
  userPass: string;
  userEmail: string;
}

interface Response {
  message: string;
  status?: number;
  data?: any;
  meta?: any;
}

export const register = api<Request, Response>(
  {
    expose: true,
    method: "POST",
    path: "/register",
  },
  async (req) => useRegister(req)
);
