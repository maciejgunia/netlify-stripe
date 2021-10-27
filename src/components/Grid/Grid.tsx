import { FC, useContext, useEffect, useState } from "react";
import { ProductContext, ProductData } from "../../App";
import { ProductTile } from "../ProductTile/ProductTile";
import s from "./Grid.module.css";

export const Grid: FC = () => {
    const allProducts = useContext(ProductContext);
    const [products, setProducts] = useState<ProductData[]>([]);

    useEffect(() => {
        setProducts(
            allProducts.reduce((acc: any[], curr: ProductData) => {
                if (acc.some((i) => i.id === curr.id)) {
                    return acc;
                }
                return [...acc, curr];
            }, [])
        );
    }, [allProducts]);

    return (
        <div className={s.grid}>
            {products.map((product) => (
                <ProductTile key={product.priceId} data={product}></ProductTile>
            ))}
        </div>
    );
};
