import { DynamoDB }  from "aws-sdk";
import { formatJSONResponse } from '@libs/api-gateway';

const dynamoDB = new DynamoDB.DocumentClient();

const getProducts = async () => {
  const productsResults = await dynamoDB
    .scan({
      TableName: process.env.PRODUCTS_TABLE_NAME,
    })
    .promise();

  const stocksResults = await dynamoDB
    .scan({
      TableName: process.env.STOCKS_TABLE_NAME,
    })
    .promise();

  const products = productsResults.Items;
  const productStocks = stocksResults.Items;

  const productsWithStock = products.map(item => {
    const count = productStocks.find(({ product_id }) => product_id === item.id)?.count || 0;
    return {
      ...item,
      count
    }
  });

  return productsWithStock;
};

export const getProductsList = async () => {
  const products = await getProducts();

  return formatJSONResponse({
    result: products,
  });
};
