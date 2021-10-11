import { FC } from "react";
import { ProductData } from "../../data/products";
import { Product } from "../Product/Product";
import "./Grid.scss";

export const Grid: FC<{ products: ProductData[] }> = ({ products }) => {
    return (
        <div className="grid">
            {products.map((product) => (
                <Product key={product.id} data={product}></Product>
            ))}
        </div>
    );
};
