import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";

import { createProduct } from "./handler";

describe("Products Service", () => {
  describe("createProduct", () => {
    
    beforeAll(async () => {
      process.env.PRODUCTS_TABLE_NAME = "dummyProductsTableName";
      process.env.STOCKS_TABLE_NAME = "dummyStocksTableName";
      process.env.AWS_REGION = "us-west-2";

      AWSMock.setSDKInstance(AWS);
      AWSMock.mock("DynamoDB.DocumentClient", "transactWrite", (params, callback) => {
        console.log(`called with params: ${params.TransactItems}`);
          callback(null, { });
      });
    });

    afterAll(async () => {
      AWSMock.restore('DynamoDB.DocumentClient');
    });

    it("Should return a 500 error for product invalid json body", async () => {
      const response = await createProduct({
        body: '',
      })

      expect(response.statusCode).toEqual(500);
      expect(JSON.parse(response.body)).toEqual({message:'Error while trying to create a new Product.'})
    });

    it("Should return a 400 error for invalid params", async () => {
      const response = await createProduct({
        body: JSON.stringify({
          title: 'test',
          description: 'terst description',
          price: 20,
        })
      })

      expect(response.statusCode).toEqual(400);
      expect(JSON.parse(response.body)).toEqual([{field: "count", message: "Must be a positive number greater than 0."}])
    });

    it("Should return a success message for valid params.", async () => {
      const response = await createProduct({
        body: JSON.stringify({
          title: 'test',
          description: 'terst description',
          price: 20,
          count: 30
        })
      })

      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body)).toEqual({message: 'Product created.'})
    });
  });
});