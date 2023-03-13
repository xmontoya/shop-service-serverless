import { formatJSONResponse } from "@libs/api-gateway";
import { isNumber, isString, isEmpty } from "@libs/validation";

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


export const createProduct = async (event) => {
  const productBody = JSON.parse(event?.body);
  
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

  return formatJSONResponse({
    result: {
        id: 2,
        title: "Mens Casual Premium Slim Fit T-Shirts ",
        price: 22.3,
        description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      },
  });
}
