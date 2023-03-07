export type Product = {
    id: string
    price: number
    title: string
    description: string
};

export type Products = Product[];

export type ErrorNotFound = {
    message: string
    statusCode: 404
};
