import { faFacebookSquare, faInstagramSquare, faPinterestSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Link } from "react-router-dom";
import s from "./Footer.module.css";

export const Footer: FC = () => {
    return (
        <div className={s.wrapper}>
            <div>
                <a className={s.link} target="_blank" rel="noreferrer" href="https://www.facebook.com/takustudio/">
                    <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
                </a>
                <a className={s.link} target="_blank" rel="noreferrer" href="https://www.instagram.com/taku_studio">
                    <FontAwesomeIcon icon={faInstagramSquare} size="lg" />
                </a>
                <a className={s.link} target="_blank" rel="noreferrer" href="https://www.pinterest.com/takustudio">
                    <FontAwesomeIcon icon={faPinterestSquare} size="lg" />
                </a>
            </div>
            <div>
                <Link className={s.link} to="regulamin">
                    Regulamin
                </Link>
                <Link className={s.link} to="zwroty">
                    Zwroty
                </Link>
                <Link className={s.link} to="prywatnosc">
                    Ochrona danych osobowych
                </Link>
                <Link className={s.link} to="kontakt">
                    Kontakt
                </Link>
            </div>
        </div>
    );
};
