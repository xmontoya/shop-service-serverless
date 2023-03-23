# AWS Practitioner for JS

## Backend-shop-serverless

### Using NPM

#### Product Service
- Run `cd product-service` to move to product service directory
- Run `npm i` to install the project dependencies
- Run `npm run deploy` to deploy this stack to AWS
- Run `npm run swagger` to only create Swagger documentation

#### Import Service
- Run `cd import-service` to move to import service directory
- Run `npm i` to install the project dependencies
- Run `npm run deploy` to deploy this stack to AWS

#### Unit Test
- Run `npm run test` to execute unit tests for all services

### Other commands

- Run `node scripts/createDBProducts.js` to fill DB tables with test examples

### Project structure

Project is divided in the following main folders:

- `*-service` - containing code base and configuration for each service
- `scripts` - containing scripts to be executed independently from lambdas
- `tests` - containing unit test for all services in project
