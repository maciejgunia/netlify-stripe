import { faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useContext, useState } from "react";
import { CartActionType, CartContext, ProductContext } from "../../App";
import { createPaymentUrl } from "../../environment";
import { Spinner } from "../Spinner/Spinner";
import s from "./Cart.module.css";

export const Cart: FC = () => {
    const { state, dispatch } = useContext(CartContext);
    const products = useContext(ProductContext);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const cartItems = state.map((id) => products.find((product) => product.priceId === id));

    const createPayment = () => {
        setIsLoading(true);
        fetch(`${createPaymentUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ items: cartItems })
        })
            .then(async (res) => {
                return res.json();
            })
            .then(({ error, redirect }) => {
                if (typeof error !== "undefined") {
                    throw error;
                }
                if (typeof redirect !== "undefined") {
                    window.location = redirect;
                }
            })
            .catch((e) => {
                console.error(e);
                setIsLoading(false);
            });
    };

    return (
        <div className={isDrawerOpen ? s.open : "closed"}>
            <div className={s.backdrop} onClick={() => setDrawerOpen(false)}></div>
            <div className={s.wrapper}>
                <span className={s.toggle} onClick={() => setDrawerOpen(!isDrawerOpen)}>
                    <FontAwesomeIcon icon={faShoppingCart} size="lg" /> {state.length > 0 && `(${state.length})`}
                </span>
                <h2 className={s.header}>Koszyk</h2>
                {cartItems.length === 0 && <p>Brak produktów w koszyku</p>}
                {cartItems.length > 0 && (
                    <ul className={s.list}>
                        {cartItems.map(
                            (product) =>
                                product && (
                                    <li key={product.priceId} className={s.item}>
                                        <img className={s.image} src={`${product.images[0]}?w=50`} alt="" />
                                        <span>{product.name}</span>
                                        <span>{product.price}</span>
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            size="lg"
                                            className={s.removeButton}
                                            onClick={() => dispatch({ type: CartActionType.Remove, id: product.id })}
                                        />
                                    </li>
                                )
                        )}
                    </ul>
                )}
                {cartItems.length > 0 && (
                    <button onClick={createPayment} className={s.payButton}>
                        {!isLoading && <span className={s.text}>zapłać</span>}
                        {isLoading && <Spinner></Spinner>}
                    </button>
                )}
            </div>
        </div>
    );
};
