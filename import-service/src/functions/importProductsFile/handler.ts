import { S3 } from "aws-sdk";
import { formatJSONResponse } from '@importLibs/api-gateway';

export const importProductsFile = async (event) => {
  try {
    const fileName = event?.queryStringParameters?.name;
    const s3 = new S3({ region: process.env.REGION });
    
    if (!fileName) {
      return formatJSONResponse({
        result: null,
        error: {
          message: { message: 'name parameter is required.' },
          statusCode: 400,
        }
      });
    }

    const params = {
        Bucket: process.env.BUCKET_PROJECT,
        Key: `${process.env.BUCKET_UPLOADED}/${fileName}`,
        Expires: 60,
        ContentType: "text/csv",
    }
    const signedURL = await s3.getSignedUrlPromise("putObject", params);

    console.log(`signedURL: ${signedURL}` );
    return formatJSONResponse({ result: signedURL });
  } catch(error) {
    console.log(error);
    return formatJSONResponse({
      result: null,
      error: {
        message: { message: 'Error while trying to get Signed URL.'},
        statusCode: 500,
      }
    });
  }
};
