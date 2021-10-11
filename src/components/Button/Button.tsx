import { FC, useState } from "react";
import { createPaymentUrl } from "../../environment";
import { Spinner } from "../Spinner/Spinner";
import "./Button.scss";

export const Button: FC<{ priceId: string }> = ({ priceId }) => {
    const [isLoading, setIsLoading] = useState(false);

    const createPayment = () => {
        setIsLoading(true);
        fetch(`${createPaymentUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ items: [{ price: priceId }] })
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
        <div
            className={`button${isLoading ? " button--is-loading" : ""}`}
            onClick={() => {
                isLoading || createPayment();
            }}
        >
            {!isLoading && <span className="button__text">kup teraz</span>}
            {isLoading && <Spinner></Spinner>}
        </div>
    );
};
