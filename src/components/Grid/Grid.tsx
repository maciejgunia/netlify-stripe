import { FC } from "react";
import { ProductData } from "../../data/products";
import { Product } from "../Product/Product";
import s from "./Grid.module.css";

export const Grid: FC<{ products: ProductData[] }> = ({ products }) => {
    return (
        <div className={s.grid}>
            {products.map((product) => (
                <Product key={product.id} data={product}></Product>
            ))}
        </div>
    );
};
