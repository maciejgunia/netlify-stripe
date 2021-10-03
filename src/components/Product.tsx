import { FC } from "react";
import { createPaymentUrl } from "../environment";

interface ProductData {
    id: string;
    name: string;
    price: string;
    image: string;
}

export const Product: FC<{ data: ProductData }> = ({ data }) => {
    const createPayment = () => {
        fetch(`${createPaymentUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ items: [{ price: data.price }] })
        })
            .then((res) => res.json())
            .then(({ redirect }) => (window.location = redirect))
            .catch((e) => console.error(e));
    };

    return (
        <div>
            <p>{data.id}</p>
            <p>{data.name}</p>
            <button onClick={createPayment}>buy</button>
            <img src={data.image} alt="" />
        </div>
    );
};
