import { FC } from "react";
import { imagesUrl } from "../../environment";
import s from "./Header.module.css";

export const Header: FC = () => {
    return (
        <div className={s.wrapper}>
            <div className="container">
                <a className={s.link} href="/">
                    <img className={s.logo} src={`${imagesUrl}/images/logo.png`} alt="" />
                </a>
            </div>
        </div>
    );
};
