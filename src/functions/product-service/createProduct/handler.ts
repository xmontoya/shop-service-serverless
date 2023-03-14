import { DynamoDB }  from "aws-sdk";
import { v4 } from 'uuid';
import { formatJSONResponse } from "@libs/api-gateway";
import { isNumber, isString, isEmpty } from "@libs/validation";

const dynamoDB = new DynamoDB.DocumentClient();

const validateBody = (body) => {
    const bodyErrors = [];
    const { title, description, price, count } = body;

    if (isEmpty(title) || !isString(title)) {
        bodyErrors.push({ field: 'title', message: 'Must be a string.' });
    }

    if (isEmpty(title) || !isString(description)) {
        bodyErrors.push({ field: 'description', message: 'Must be a string.' });
    }

    if (isEmpty(price) || !isNumber(price)) {
        bodyErrors.push({ field: 'price', message: 'Must be a positive number greater than 0.' });
    }

    if (isEmpty(count) || !isNumber(count)) {
        bodyErrors.push({ field: 'count', message: 'Must be a positive number greater than 0.' });
    }

    return bodyErrors;
};

const putProduct = async(body) => {
  const id = v4();
  const { title, description, price, count } = body;

  const result = await dynamoDB
    .transactWrite({
      TransactItems: [
        {
          Put: {
            TableName: process.env.PRODUCTS_TABLE_NAME,
            Item: {
              id,
              title,
              description,
              price
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

export const createProduct = async (event) => {
  try {
    const productBody = JSON.parse(event?.body);
    console.log('Request body:', productBody);
    
    const bodyErrors = validateBody(productBody);
    if (bodyErrors.length) {
      return formatJSONResponse({
        result: null,
        error: {
          message: bodyErrors,
          statusCode: 400,
        }
      });
    }

    await putProduct(productBody);

    return formatJSONResponse({
      result: { message: 'Product created.' }
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
