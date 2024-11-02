import { APIError, ErrCode } from "encore.dev/api";
import { z, ZodError, ZodType, ZodUndefined } from "zod";
import { HTTPError } from "./http-error";

type UndefinedOrZod<T> = T extends undefined ? ZodUndefined : ZodType<any, any>;

export const useBaseHandler = async <
  TBody extends ZodType<any, any> | undefined,
  TQuery extends ZodType<any, any> | undefined
>({
  schema,
  request,
  handler,
}: {
  schema?: { body?: TBody; query?: TQuery };
  request: {
    body?: z.infer<UndefinedOrZod<TBody>>;
    query?: z.infer<UndefinedOrZod<TQuery>>;
  };
  handler: ({
    body,
    query,
  }: {
    body: any;
    query: any;
  }) => Promise<{ message: string; data?: any; meta?: any; status: number }>;
}) => {
  try {
    const requestBody: any = schema?.body
      ? schema.body?.parse(request?.body)
      : null;
    const requestQuery: any = schema?.query
      ? schema.query?.parse(request?.query)
      : null;

    return await handler({
      body: requestBody ?? request.body,
      query: requestQuery ?? request.query,
    });
  } catch (error: any) {
    if (error instanceof APIError) {
      throw error;
    } else if (error instanceof ZodError) {
      throw new APIError(
        ErrCode.InvalidArgument,
        "Invalid arguments",
        error,
        error.errors?.[0]
      );
    } else {
      console.error("🚀 ~ handler ~ error: ", error);
      return new APIError(ErrCode.Unknown, "Something went wrong", error);
    }
  }
};
