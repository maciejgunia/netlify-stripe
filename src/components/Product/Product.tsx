import { FC } from "react";
import { ProductData } from "../../App";
import { Button } from "../Button/Button";
import s from "./Product.module.css";

export const Product: FC<{ data: ProductData }> = ({ data }) => {
    return (
        <div>
            <img className={s.image} src={`${data.images[0]}?w=300`} alt="" />
            <div className={s.details}>
                <p>
                    {data.name} / {data.price}
                </p>
                <Button id={data.id}></Button>
            </div>
        </div>
    );
};
