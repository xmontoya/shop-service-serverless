
import { getProductsMock } from "@mocks/products";
import { getProductsById } from "./handler";

describe("Products Service", () => {
    describe("getProductsById", () => {
        it("should return a product with a given id", async () => {
            const [firstProduct] = await getProductsMock();

            const response = await getProductsById({
                pathParameters: { id: firstProduct.id },
            })

            expect(JSON.parse(response.body)).toEqual({ payload: firstProduct })
        })
    })
});
