import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.getProductsById`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{id}',
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
