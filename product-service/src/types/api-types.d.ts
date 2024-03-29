export type Product = {
    id: string
    price: number
    title: string
    description: string
    count: number
};

export type Products = Product[];

export type ErrorNotFound = {
    message: string 
    statusCode: number
};

export type ErrorAPI = {
    message: any
    statusCode: number
};
