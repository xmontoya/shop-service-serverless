import { formatJSONResponse } from "@libs/api-gateway";
import { getProductsMock } from "@mocks/products";

export const getProductsById = async (event) => {
  const productId = event?.pathParameters?.id;
  const product = (await getProductsMock()).find(({ id }) => id == productId);

  return formatJSONResponse({
    payload: product,
  });
}
