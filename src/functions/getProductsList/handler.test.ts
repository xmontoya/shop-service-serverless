
import { getProductsMock } from "@mocks/products";
import { getProductsList } from "./handler";

describe("Products Service", () => {
    describe("getProductsById", () => {
        it("should return a product with a given id", async () => {
            const products = await getProductsMock();

            const response = await getProductsList();

            expect(JSON.parse(response.body)).toEqual({ payload: products });
        })
    })
});
