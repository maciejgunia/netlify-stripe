import { FC } from "react";
import { ProductData } from "../../data/products";
import { Button } from "../Button/Button";
import "./Product.scss";

export const Product: FC<{ data: ProductData }> = ({ data }) => {
    return (
        <div className="product">
            <img className="product__image" src={data.image} alt="" />
            <div className="product__details">
                <p>
                    {data.name} / {data.price}
                </p>
                <Button priceId={data.priceId}></Button>
            </div>
        </div>
    );
};
