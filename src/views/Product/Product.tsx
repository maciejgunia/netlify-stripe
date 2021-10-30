import { FC, useContext } from "react";
import { Redirect, useParams } from "react-router";
import { Button } from "../../components/Button/Button";
import { ProductContext } from "../../helpers/product";
import s from "./Product.module.css";

export const Product: FC = () => {
    const products = useContext(ProductContext);
    const { slug } = useParams<{ slug: string }>();
    const product = products.find((p) => p.slug === slug);
    const offers = products.filter((p) => p.slug === slug);

    return product ? (
        <div className={`container ${s.wrapper}`}>
            <div className={s.images}>
                <img className={s.image} src={`${product?.images[0]}?w=580`} alt="" />
            </div>
            <div className={s.description}>
                <h2>{product?.name}</h2>
                {offers.map((offer) => (
                    <div key={offer.priceId}>
                        <p>
                            {offer.nickname} / {offer.price}
                        </p>
                        <Button id={offer.priceId}></Button>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <Redirect to="/404"></Redirect>
    );
};
