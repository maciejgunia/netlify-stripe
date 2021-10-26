import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useContext } from "react";
import { CartActionType, CartContext } from "../../App";
import s from "./Button.module.css";

export const Button: FC<{ id: string }> = ({ id }) => {
    const { state, dispatch } = useContext(CartContext);
    const isInCart = state.includes(id);

    const add = () => {
        dispatch({ type: CartActionType.Add, id });
    };

    return (
        <div className={`${s.button} ${isInCart ? s.isInCart : ""}`} onClick={() => !isInCart && add()}>
            {!isInCart && <span className={s.text}>do koszyka</span>}
            {isInCart && <FontAwesomeIcon icon={faShoppingCart} size="lg" />}
        </div>
    );
};
