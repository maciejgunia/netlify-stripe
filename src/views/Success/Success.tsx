import { FC } from "react";
import { Message } from "../../components/Message/Message";

export const Success: FC = () => {
    return (
        <div className="container">
            <Message
                header="Zamówienie złożone!"
                body="Dziekujemy za złożenie zamównienia. Wkrótce otrzymasz informację odnośnie terminu dostawy."
            ></Message>
        </div>
    );
};
