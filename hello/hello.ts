import { api } from "encore.dev/api";
import { dbClient } from "@/shared";

export const get = api(
  { expose: true, method: "GET", path: "/hello/:name" },
  async ({ name }: { name: string }): Promise<Response> => {
    const msg = `Hello ${name}!`;
    const users = await dbClient.user.findMany();
    console.log("🚀 ~ users:", users);
    return { message: msg };
  }
);

interface Response {
  message: string;
}
