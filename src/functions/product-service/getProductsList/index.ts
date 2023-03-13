import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.getProductsList`,
  environment: {
    PRODUCTS_TABLE_NAME: 'JSCC_SHOP_PRODUCTS',
    STOCKS_TABLE_NAME: 'JSCC_SHOP_STOCKS',
  },
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true,
        responses: {
          200: {
              description: "OK",
              bodyType: "Products",
          },
        },
      },
    },
  ],
};
