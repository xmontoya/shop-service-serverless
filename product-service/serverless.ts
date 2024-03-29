import type { AWS } from '@serverless/typescript';

import getProductsList from '@productFunctions/getProductsList';
import getProductsById from '@productFunctions/getProductsById';
import createProduct from '@productFunctions/createProduct';

const serverlessConfiguration: AWS = {
  service: 'shop-service-serverless',
  frameworkVersion: '3',
  plugins: ['serverless-auto-swagger', 'serverless-esbuild'],
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
    iam: {
      role: {
          name: "${self:service}-${self:provider.region}-${self:provider.stage}-lambdaRole-autogenerated",
          managedPolicies: [
              "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess",
          ],
      },
    },
  },
  // import the function via paths
  functions: { getProductsList, getProductsById, createProduct },
  package: { individually: true },
  custom: {
    autoswagger: {
      basePath: '/dev',
      host: 'yecrj6u86i.execute-api.us-west-1.amazonaws.com',
      schemes: ['https']
    },
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
