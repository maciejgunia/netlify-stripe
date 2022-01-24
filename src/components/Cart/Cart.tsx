import { faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useContext, useEffect, useState } from "react";
import { createPaymentUrl } from "../../environment";
import { CartActionType, CartContext } from "../../helpers/cart";
import { ProductContext } from "../../helpers/product";
import { Spinner } from "../Spinner/Spinner";
import s from "./Cart.module.css";

declare global {
    interface Window {
        easyPack: any;
    }
}

export const Cart: FC = () => {
    const { state, dispatch } = useContext(CartContext);
    const products = useContext(ProductContext);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const items = state
        .map((id) => products.find((product) => product.priceId === id))
        .filter((product) => product !== undefined);
    const [deliveryPoint, setDeliveryPoint] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        window.onload = function () {
            window.easyPack.init({});
            window.easyPack.dropdownWidget("easypack-widget", function (point: any) {
                setDeliveryPoint(point.name);
            });
        };
    }, []);

    const createPayment = () => {
        setIsLoading(true);
        fetch(`${createPaymentUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ items, deliveryPoint, phone })
        })
            .then(async (res) => {
                return res.json();
            })
            .then(({ error, redirect }) => {
                setIsLoading(false);

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
            <span className={s.toggle} onClick={() => setDrawerOpen(!isDrawerOpen)}>
                <FontAwesomeIcon icon={faShoppingCart} size="lg" /> {state.length > 0 && `(${state.length})`}
            </span>
            <div className={s.wrapper}>
                <h2 className={s.header}>Koszyk</h2>
                {items.length === 0 && <p>Brak produktów w koszyku</p>}
                {items.length > 0 && (
                    <ul className={s.list}>
                        {items.map(
                            (product) =>
                                product && (
                                    <li key={product.priceId} className={s.item}>
                                        <img className={s.image} src={`${product.images[0]}?w=50`} alt="" />
                                        <span>{product.name}</span>
                                        <span>{product.nickname}</span>
                                        <span>{product.price}</span>
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            size="lg"
                                            className={s.removeButton}
                                            onClick={() =>
                                                dispatch({ type: CartActionType.Remove, id: product.priceId })
                                            }
                                        />
                                    </li>
                                )
                        )}
                    </ul>
                )}
                <p>Dane do Paczkomatu InPost:</p>
                <input
                    className={s.phoneInput}
                    type="text"
                    name="phone"
                    placeholder="Podaj numer telefonu"
                    value={phone}
                    style={{ display: items.length === 0 ? "none" : "block" }}
                    onChange={(e) => {
                        if (!/[^0-9\s-]/.test(e.target.value)) {
                            setPhone(e.target.value);
                        }

                        if (e.target.value === "") {
                            setPhone("");
                        }
                    }}
                />
                <div id="easypack-widget" style={{ display: items.length === 0 ? "none" : "block" }}></div>
                <button
                    onClick={createPayment}
                    className={s.payButton}
                    style={{ display: items.length === 0 ? "none" : "block" }}
                    disabled={
                        items.length === 0 || deliveryPoint.length === 0 || phone.replace(/[\s-]/g, "").length < 9
                    }
                >
                    {!isLoading && <span className={s.text}>zapłać</span>}
                    {isLoading && <Spinner></Spinner>}
                </button>
            </div>
        </div>
    );
};
