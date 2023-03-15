import { formatJSONResponse } from "@libs/api-gateway";
import { getProductsMock } from "@mocks/products";

export const getProductsById = async (event) => {
  const productId = event?.pathParameters?.id;
  const product = (await getProductsMock()).find(({ id }) => id == productId) || null;

  if (!product) {
    return formatJSONResponse({
      result: null,
      error: {
        message: 'Product not found.',
        statusCode: 404,
      }
    });
  }

  return formatJSONResponse({
    result: product,
  });
}
