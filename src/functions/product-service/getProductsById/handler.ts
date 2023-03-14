import { DynamoDB }  from "aws-sdk";
import { formatJSONResponse } from "@libs/api-gateway";

const getProduct = async (productId) => {
  const dynamDB = new DynamoDB.DocumentClient();

  const resultProduct = await dynamDB
  .query({
      TableName: process.env.PRODUCTS_TABLE_NAME,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: { ":id": productId },
  })
  .promise();

  const product = resultProduct.Items?.[0];
  
  if (product?.id) {
    const resultStock = await dynamDB
    .query({
        TableName: process.env.STOCKS_TABLE_NAME,
        KeyConditionExpression: "product_id = :id",
        ExpressionAttributeValues: { ":id": productId },
    })
    .promise();

    const count = resultStock.Items?.[0]?.count || 0;

    return {
      ...product,
      count
    };
  }

  return null;
}

export const getProductsById = async (event) => {
  try {
    const productId = event?.pathParameters?.id;
    console.log(`Product Id: ${productId}`);
    const product = await getProduct(productId);

    if (!product) {
      return formatJSONResponse({
        result: null,
        error: {
          message: { message: 'Product not found.' },
          statusCode: 404,
        }
      });
    }

    return formatJSONResponse({
      result: product,
    });
  } catch (error) {
    console.log(error);
    return formatJSONResponse({
      result: null,
      error: {
        message: { message: 'Error while trying to create a new Product.'},
        statusCode: 500,
      }
    });
  }
}
