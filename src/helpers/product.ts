import React from "react";

export interface ProductData {
    id: string;
    slug: string;
    name: string;
    price: string;
    priceId: string;
    nickname: string;
    images: string[];
}

export const ProductContext = React.createContext<ProductData[]>([]);
