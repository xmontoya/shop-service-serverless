const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

const products = require('./products');

const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION
});

const createDBProducts = async (product) => {
  console.log(product);
  const { id, count, ...productParams } = product;

  const result = await dynamoDB
    .transactWrite({
      TransactItems: [
        {
          Put: {
            TableName: process.env.PRODUCTS_TABLE_NAME,
            Item: {
              id,
              ...productParams
            },
            ConditionExpression: "attribute_not_exists(id)",
          },
        },
        {
          Put: {
              TableName: process.env.STOCKS_TABLE_NAME,
              Item: {
                product_id: id,
                count,
              },
              ConditionExpression: "attribute_not_exists(product_id)",
          },
        },
      ],
    })
    .promise()

  return result;
};

const createProducts = async () => {
  try {
    for (let i = 0; i < products.length; i++) {
      await createDBProducts(products[i]);
    }
    console.log("Products and stock added to db tables");
  } catch (err) {
    console.error("Error", err);
  }
};

createProducts();
