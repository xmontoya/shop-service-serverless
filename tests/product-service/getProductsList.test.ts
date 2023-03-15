import * as AWSMock from "aws-sdk-mock";
import * as path from 'path';
import { GetItemInput } from "aws-sdk/clients/dynamodb";

import { getProductsMock, getStocksMock } from "../mocks/products";
import { getProductsList } from "@productFunctions/getProductsList/handler";

describe("Products Service", () => {
  describe("getProductsList", () => {
    let productsMock;
    let stocksMock;

    beforeAll(async () => {
      process.env.PRODUCTS_TABLE_NAME = "dummyProductsTableName";
      process.env.STOCKS_TABLE_NAME = "dummyStocksTableName";
      process.env.AWS_REGION = "us-west-2";

      productsMock = await getProductsMock();
      stocksMock = await getStocksMock();

      AWSMock.setSDK(path.resolve('product-service/node_modules/aws-sdk'));
      AWSMock.mock("DynamoDB.DocumentClient", "scan", (params: GetItemInput, callback) => {
        console.log(`called with Table name ${params.TableName}`);
        let returnValue: any[] = productsMock;

        if(params.TableName === 'dummyStocksTableName') {
          returnValue = stocksMock;
        }

        callback(null, { Items: returnValue });
      });
    });

    afterAll(async () => {
      AWSMock.restore('DynamoDB.DocumentClient');
    });

    it("should return a list of products", async () => {
      const responseMock = productsMock.map(item => {
        const count = stocksMock.find(({ product_id }) => product_id === item.id)?.count || 0;
        return {
          ...item,
          count
        }
      });

      const response = await getProductsList();
      
      expect(JSON.parse(response.body)).toEqual(responseMock);
    })
  })
});
