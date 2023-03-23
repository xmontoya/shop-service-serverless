import * as AWSMock from "aws-sdk-mock";
import * as path from 'path';

import { importProductsFile } from "@importFunctions/importProductsFile/handler";

describe("Import Service", () => {
  describe("importProductsFile", () => {
    const fileName = 'product.csv';

    beforeAll(async () => {
      process.env.BUCKET_PROJECT = "dummyBucketName";
      process.env.BUCKET_UPLOADED = "dummyBucketFolderName";
      process.env.REGION = "us-west-2";

      AWSMock.setSDK(path.resolve('import-service/node_modules/aws-sdk'));
      AWSMock.mock("S3", "getSignedUrlPromise", (service, method) => {
        console.log(`Called service: ${service}`);
        console.log('Called with params:', method);
        return 'https://dummyBucketName.s3.us-west-1.amazonaws.com/dummyBucketFolderName/';
      });
    });

    afterAll(async () => {
      AWSMock.restore('S3');
    });

    it("Should return a 400 error for invalid name parameter", async () => {
      const response = await importProductsFile({ queryStringParameters: {}});

      expect(response.statusCode).toEqual(400);
      expect(JSON.parse(response.body)).toEqual({ message:'name parameter is required.' })
    });

    it("Should return a S3 signedUrl", async () => {
      const response = await importProductsFile({ queryStringParameters: { name: fileName }});

      expect(response.statusCode).toEqual(200);
    });
  });
});