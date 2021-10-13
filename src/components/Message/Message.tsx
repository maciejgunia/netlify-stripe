import { FC } from "react";

export const Message: FC<{ header: string; body: string }> = ({ header, body }) => {
    return (
        <div>
            <h2>{header}</h2>
            <p>{body}</p>
        </div>
    );
};
