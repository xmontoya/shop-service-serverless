
import { getProductsMock } from "@mocks/products";
import { getProductsById } from "./handler";

describe("Products Service", () => {
    describe("getProductsById", () => {
        it("Should return a product with a given id", async () => {
            const [firstProduct] = await getProductsMock();

            const response = await getProductsById({
                pathParameters: { id: firstProduct.id },
            });

            expect(JSON.parse(response.body)).toEqual(firstProduct);
        });

        it("Should return a 404 error for product not found", async () => {
            const response = await getProductsById({
                pathParameters: { id: 404 },
            })

            expect(response.statusCode).toEqual(404);
            expect(JSON.parse(response.body).message).toEqual('Product not found.')
        });
    });
});
