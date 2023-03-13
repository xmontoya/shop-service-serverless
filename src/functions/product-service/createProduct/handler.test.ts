import { createProduct } from "./handler";

describe("Products Service", () => {
    describe("createProduct", () => {
        it("Should return a 400 error for product invalid params", async () => {
            const response = await createProduct({
                body: { title: 'Test product' },
            })

            expect(response.statusCode).toEqual(400);
        });
    });
});