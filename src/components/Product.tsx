import { FC } from "react";

interface ProductData {
    id: string;
    name: string;
}

export const Product: FC<{ data: ProductData }> = ({ data }) => {
    const buy = () => {
        fetch("http://localhost:51259/test")
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
