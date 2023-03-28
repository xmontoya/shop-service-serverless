import type { AWS } from '@serverless/typescript';

import importProductsFile from '@importFunctions/importProductsFile';
import importFileParser from '@importFunctions/importFileParser';

const serverlessConfiguration: AWS = {
  service: 'shop-import-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    stage: 'dev',
    region: 'us-west-1',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
          Effect: "Allow",
          Action: "s3:ListBucket",
          Resource: ["arn:aws:s3:::js-cc"],
      },
      {
          Effect: "Allow",
          Action: ["s3:*"],
          Resource: ["arn:aws:s3:::js-cc/*"],
      },
  ],
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
