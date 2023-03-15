import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

import { ErrorNotFound } from "../types/api-types";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

const CORS_HEADERS = {
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Origin": "*",
}

export const formatJSONResponse = <T>(response: {
  result?: Record<string, unknown> | Record<string, unknown>[] | T | null,
  error?: ErrorNotFound
}) => {
  const { result, error } = response;

  if (error) {
    const { statusCode, message } = error;

    return {
      statusCode,
      headers: {
        ...CORS_HEADERS,
      },
      body: message
    }
  }

  return {
    statusCode: 200,
    headers: {
      ...CORS_HEADERS,
    },
    body: JSON.stringify(result)
  }
}
