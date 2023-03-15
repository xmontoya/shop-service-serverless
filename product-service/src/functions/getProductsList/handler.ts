import { DynamoDB }  from "aws-sdk";
import { formatJSONResponse } from '@productLibs/api-gateway';

const getProducts = async (dbInstance) => {
  const productsResults = await dbInstance
    .scan({
      TableName: process.env.PRODUCTS_TABLE_NAME,
    })
    .promise();

  const stocksResults = await dbInstance
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
  const dynamoDB = new DynamoDB.DocumentClient();

  const products = await getProducts(dynamoDB);

  return formatJSONResponse({
    result: products,
  });
};
