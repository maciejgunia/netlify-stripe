import { FC } from "react";
import s from "./Spinner.module.css";

export const Spinner: FC = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.spinner}></div>
        </div>
    );
};
