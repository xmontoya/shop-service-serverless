import * as dotenv from 'dotenv';
import { handlerPath } from '@libs/handler-resolver';

dotenv.config();

export default {
  handler: `${handlerPath(__dirname)}/handler.getProductsById`,
  environment: {
    PRODUCTS_TABLE_NAME: process.env.PRODUCTS_TABLE_NAME,
    STOCKS_TABLE_NAME: process.env.STOCKS_TABLE_NAME,
  },
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{id}',
        cors: true, 
        responses: {
          200: {
              description: "OK",
              bodyType: "Product",
          },
        },
      },
    },
  ],
};
