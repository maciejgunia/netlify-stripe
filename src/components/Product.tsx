import { FC } from "react";

interface ProductData {
    id: string;
    name: string;
    price: string;
}

export const Product: FC<{ data: ProductData }> = ({ data }) => {
    const buy = () => {
        fetch("http://localhost:49951/buy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ items: [{ price: data.price }] })
        })
            .then(console.log)
            .catch((e) => console.error(e));
    };

    return (
        <>
            <p>{data.id}</p>
            <p>{data.name}</p>
            <button onClick={buy}>buy</button>
        </>
    );
};
