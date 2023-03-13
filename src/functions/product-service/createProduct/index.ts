import * as dotenv from 'dotenv';
dotenv.config();

import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.createProduct`,
  environment: {
    PRODUCTS_TABLE_NAME: process.env.PRODUCTS_TABLE_NAME,
    STOCKS_TABLE_NAME: process.env.STOCKS_TABLE_NAME,
  },
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        cors: true,
        responses: {
          201: {
              description: "Created",
              bodyType: "Product",
          },
        },
      },
    },
  ],
};
