import * as dotenv from 'dotenv';
import { handlerPath } from '@importLibs/handler-resolver';

dotenv.config();

export default {
  handler: `${handlerPath(__dirname)}/handler.importProductsFile`,
  environment: {
    REGION: process.env.REGION,
    BUCKET_PROJECT: process.env.BUCKET_PROJECT,
    BUCKET_UPLOADED: process.env.BUCKET_UPLOADED
  },
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        request: {
          parameters: {
            querystrings: {
              name: true
            },
          },
        },
      },
    },
  ],
};
