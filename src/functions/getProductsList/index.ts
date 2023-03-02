import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.getProductsList`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
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
