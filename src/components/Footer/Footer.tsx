import { faFacebookSquare, faInstagramSquare, faPinterestSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import "./Footer.scss";

export const Footer: FC = () => {
    return (
        <>
            <div className="footer-socials">
                <a
                    className="footer-social-link"
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.facebook.com/takustudio/"
                >
                    <FontAwesomeIcon icon={faFacebookSquare} />
                </a>
                <a
                    className="footer-social-link"
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.instagram.com/taku_studio"
                >
                    <FontAwesomeIcon icon={faInstagramSquare} />
                </a>
                <a
                    className="footer-social-link"
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.pinterest.com/takustudio"
                >
                    <FontAwesomeIcon icon={faPinterestSquare} />
                </a>
            </div>
        </>
    );
};
