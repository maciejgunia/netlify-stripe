import { FC, useContext } from "react";
import { ProductContext } from "../../App";
import { Product } from "../Product/Product";
import s from "./Grid.module.css";

export const Grid: FC = () => {
    const products = useContext(ProductContext);

    return (
        <div className={s.grid}>
            {products.map((product) => (
                <Product key={product.priceId} data={product}></Product>
            ))}
        </div>
    );
};
