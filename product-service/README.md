# AWS Practitioner for JS

## Backend-shop-serverless

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npm run deploy` to deploy this stack to AWS
- Run `npm run swagger` to only create Swagger documentation
- Run `npm run test` to execute unit tests

### Other commands

- Run `node scripts/createDBProducts.js` to fill DB tables with test examples

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas
