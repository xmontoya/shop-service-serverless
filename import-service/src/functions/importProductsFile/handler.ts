import { formatJSONResponse } from '@importLibs/api-gateway';

export const importProductsFile = async (event) => {
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};
