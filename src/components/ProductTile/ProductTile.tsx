import { FC } from "react";
import { Link } from "react-router-dom";
import { ProductData } from "../../helpers/product";
import s from "./ProductTile.module.css";

export const ProductTile: FC<{ data: ProductData }> = ({ data }) => {
    return (
        <Link to={`/product/${data.slug}`}>
            <img className={s.image} src={`${data.images[0]}?w=459`} alt="" />
        </Link>
    );
};
