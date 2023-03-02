import { formatJSONResponse } from '@libs/api-gateway';
import { getProductsMock } from "@mocks/products";

export const getProductsList = async () => {
  const products = await getProductsMock();
  
  return formatJSONResponse({
    payload: products,
  });
};
