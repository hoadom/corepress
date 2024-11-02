import { api, Query } from "encore.dev/api";
import { useHandler } from "./handler";

interface Request {
  activationKey: Query<string>;
  userId: Query<string>;
}

interface Response {
  message: string;
  status?: number;
  data?: any;
  meta?: any;
}

export const active = api<Request, Response>(
  {
    expose: true,
    method: "POST",
    path: "/api/user/active",
  },
  async (req) => useHandler(req)
);
