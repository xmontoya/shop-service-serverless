import * as dotenv from 'dotenv';
import { handlerPath } from '@importLibs/handler-resolver';

dotenv.config();

export default {
    handler: `${handlerPath(__dirname)}/handler.importFileParser`,
    environment: {
      REGION: process.env.REGION,
      BUCKET_PROJECT: process.env.BUCKET_PROJECT,
      BUCKET_UPLOADED: process.env.BUCKET_UPLOADED,
      BUCKET_PARSED: process.env.BUCKET_PARSED
    },
    events: [
        {
            s3: {
                bucket: process.env.BUCKET_PROJECT,
                event: "s3:ObjectCreated:*",
                existing: true,
                rules: [{ prefix: `${process.env.BUCKET_UPLOADED}/` }],
            },
        },
    ],
};
