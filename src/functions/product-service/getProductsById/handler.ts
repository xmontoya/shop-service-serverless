import { DynamoDB }  from "aws-sdk";
import { formatJSONResponse } from "@libs/api-gateway";

const dynamDB = new DynamoDB.DocumentClient();

const getProduct = async (productId) => {
  const resultProduct = await dynamDB
  .query({
      TableName: process.env.PRODUCTS_TABLE_NAME,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: { ":id": productId },
  })
  .promise();

  const product = resultProduct.Items?.[0];

  const resultStock = await dynamDB
  .query({
      TableName: process.env.STOCKS_TABLE_NAME,
      KeyConditionExpression: "product_id = :id",
      ExpressionAttributeValues: { ":id": productId },
  })
  .promise();

  const stock = resultStock.Items?.[0]?.count || 0;

  return {
    ...product,
    stock
  };
}

export const getProductsById = async (event) => {
  const productId = event?.pathParameters?.id;
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
}
