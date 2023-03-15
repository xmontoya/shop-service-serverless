import { handlerPath } from '@importLibs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.importProductsFile`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
      },
    },
  ],
};
