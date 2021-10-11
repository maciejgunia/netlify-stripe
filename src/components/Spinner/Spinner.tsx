import { FC } from "react";
import "./Spinner.scss";

export const Spinner: FC = () => {
    return (
        <div className="spinner-wrapper">
            <div className="spinner"></div>
        </div>
    );
};
