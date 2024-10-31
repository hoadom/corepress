import { APIError, ErrCode } from "encore.dev/api";
import { z, ZodType, ZodUndefined } from "zod";

type UndefinedOrZod<T> = T extends undefined ? ZodUndefined : ZodType<any, any>;

export const useHandler = async <
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
    const requestBody = schema?.body
      ? schema.body.safeParse(request.body)
      : { success: true, data: undefined };
    const requestQuery = schema?.query
      ? schema.query.safeParse(request.query)
      : { success: true, data: undefined };

    if (requestBody.success && requestQuery.success) {
      return await handler({
        body: requestBody.data ?? request.body,
        query: requestQuery.data ?? request.query,
      });
    } else {
      throw new APIError(ErrCode.InvalidArgument, "Missing required fields");
    }
  } catch (error) {
    throw new APIError(ErrCode.InvalidArgument, "Missing required fields");
  }
};
