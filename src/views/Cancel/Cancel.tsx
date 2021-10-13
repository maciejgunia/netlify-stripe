import { FC } from "react";
import { Message } from "../../components/Message/Message";

export const Cancel: FC = () => {
    return (
        <div className="container">
            <Message
                header="Zamówienie zostało anulowane."
                body="Płatność została przerwana, jeśli coś nie działa, prosimy o kontakt."
            ></Message>
        </div>
    );
};
