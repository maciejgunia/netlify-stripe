import { FC } from "react";
import { Link } from "react-router-dom";
import { imagesUrl } from "../../environment";
import s from "./Header.module.css";

export const Header: FC = () => {
    return (
        <div className={s.wrapper}>
            <div className="container">
                <Link className={s.link} to="/">
                    <img className={s.logo} src={`${imagesUrl}/images/logo.png`} alt="" />
                </Link>
            </div>
        </div>
    );
};
