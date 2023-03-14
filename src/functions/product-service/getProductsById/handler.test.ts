import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";

import { getProductsMock, getStocksMock } from "@mocks/products";
import { getProductsById } from "./handler";

describe("Products Service", () => {
  describe("getProductsById", () => {
    let productsMock;
    let stocksMock;

    beforeAll(async () => {
      process.env.PRODUCTS_TABLE_NAME = "dummyProductsTableName";
      process.env.STOCKS_TABLE_NAME = "dummyStocksTableName";
      process.env.AWS_REGION = "us-west-2";

      productsMock = (await getProductsMock())[0];
      stocksMock = (await getStocksMock())[0];

      AWSMock.setSDKInstance(AWS);
      AWSMock.mock("DynamoDB.DocumentClient", "query", (params, callback) => {
        const mockId = params?.ExpressionAttributeValues?.[':id'];
        if( mockId === 404 ) {
          callback(null, { Items: [] });
        } else {
          console.log(`called with Table name ${params.TableName}`);
          let returnValue: any = productsMock;

          if(params.TableName === 'dummyStocksTableName') {
            returnValue = stocksMock;
          }

          callback(null, { Items: [returnValue] });
        }
      });
    });

    afterAll(async () => {
      AWSMock.restore('DynamoDB.DocumentClient');
    });

    it("Should return a product with a given id", async () => {
      const responseMock = {
        ...productsMock,
        count: stocksMock.count
      }

      const response = await getProductsById({
        pathParameters: { id: productsMock.id },
      });

      expect(JSON.parse(response.body)).toEqual(responseMock);
    });

    it("Should return a 404 error for product not found", async () => {
        const response = await getProductsById({
            pathParameters: { id: 404 },
        })

        expect(response.statusCode).toEqual(404);
        expect(JSON.parse(response.body).message).toEqual('Product not found.')
    });
  });
});
