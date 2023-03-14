import * as AWSMock from "aws-sdk-mock";
import { GetItemInput } from "aws-sdk/clients/dynamodb";
import * as AWS from "aws-sdk";

import { getProductsMock, getStocksMock } from "@mocks/products";
import { getProductsList } from "./handler";

describe("Products Service", () => {
  describe("getProductsList", () => {
    
    beforeAll(async () => {
        process.env.PRODUCTS_TABLE_NAME = "dummyProductsTableName";
        process.env.STOCKS_TABLE_NAME = "dummyStocksTableName";
        process.env.AWS_REGION = "us-west-2";
    });

    it("should return a list of products", async () => {
        const productsMock = await getProductsMock();
        const stocksMock = await getStocksMock();

        const responseMock = productsMock.map(item => {
          const count = stocksMock.find(({ product_id }) => product_id === item.id)?.count || 0;
          return {
            ...item,
            count
          }
        });

        AWSMock.setSDKInstance(AWS);
        AWSMock.mock("DynamoDB.DocumentClient", "scan", (params: GetItemInput, callback) => {
          console.log(`called with Table name ${params.TableName}`);
          let returnValue: any[] = productsMock;

          if(params.TableName === 'dummyStocksTableName') {
            returnValue = stocksMock;
          }

          callback(null, { Items: returnValue });
        });

      const response = await getProductsList();
      
      expect(JSON.parse(response.body)).toEqual(responseMock);
      AWSMock.restore('DynamoDB.DocumentClient');
    })
  })
});
