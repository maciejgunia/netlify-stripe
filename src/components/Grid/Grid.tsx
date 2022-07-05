import { FC } from "react";
import { ProductData } from "../../helpers/product";
import { ProductTile } from "../ProductTile/ProductTile";
import s from "./Grid.module.css";

import data from "../../data/products.json";

export const Grid: FC = () => {
  const products = (data as unknown as ProductData[]).reduce(
    (acc: any[], curr: ProductData) => {
      if (acc.some((i) => i.id === curr.id)) {
        return acc;
      }
      return [...acc, curr];
    },
    []
  );

  return (
    <div className={s.grid}>
      {products.map((product) => (
        <ProductTile key={product.priceId} data={product}></ProductTile>
      ))}
    </div>
  );
};
