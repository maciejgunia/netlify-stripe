import { FC } from "react";
import { Link } from "react-router-dom";
import useScrollTop from "../../hooks/useScrollTop";
import s from "./Header.module.css";
import logo from "../../assets/logo.png"

export const Header: FC = () => {
    useScrollTop();

    return (
        <div className={s.wrapper}>
            <div className="container">
                <Link className={s.link} to="/">
                    <img className={s.logo} src={logo} alt="" />
                </Link>
            </div>
        </div>
    );
};
