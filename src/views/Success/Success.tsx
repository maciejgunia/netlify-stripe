import { FC, useContext, useEffect } from "react";
import { Message } from "../../components/Message/Message";
import { CartActionType, CartContext } from "../../helpers/cart";

export const Success: FC = () => {
    const { dispatch } = useContext(CartContext);

    useEffect(() => {
        dispatch({ type: CartActionType.Clear });
    }, [dispatch]);

    return (
        <div className="container">
            <Message
                header="Zamówienie złożone!"
                body="Dziękujemy za złożenie zamównienia. Twpje zamówienie zostanie wkrótce wysłane."
            ></Message>
        </div>
    );
};
