import { FC } from "react";
import { imagesUrl } from "../../environment";

export const Header: FC = () => {
    return (
        <div className="header container button">
            <img src={`${imagesUrl}/images/logo.png`} alt="" />
        </div>
    );
};
