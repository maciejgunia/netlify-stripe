import { FC } from "react";
import { createPaymentUrl } from "../environment";

interface ProductData {
    id: string;
    name: string;
    price: string;
}

export const Product: FC<{ data: ProductData }> = ({ data }) => {
    const buy = () => {
        fetch(`${createPaymentUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ items: [{ price: data.price }] })
        }).catch((e) => console.error(e));
    };

    return (
        <>
            <p>{data.id}</p>
            <p>{data.name}</p>
            <button onClick={buy}>buy</button>
        </>
    );
};
