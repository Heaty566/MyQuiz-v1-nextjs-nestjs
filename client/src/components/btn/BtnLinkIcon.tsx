import * as React from "react";
import { Link } from "react-router-dom";
export interface LinkIconProps {
        url: string;
        label: string;
        iconName: string;
        directUrl?: string;
}

const BtnLinkIcon: React.SFC<LinkIconProps> = ({ url = "/", label, iconName, directUrl }) => {
        if (directUrl) {
                return (
                        <a href={directUrl} className="btn btn__icon f--s">
                                <span className="icon__wrapper icon--3">
                                        <img src={"/asset/icons/common/" + iconName} className="icon" alt="" />
                                </span>
                                <span>{label}</span>
                        </a>
                );
        }

        return (
                <Link className="btn btn__icon f--s" to={url}>
                        <span className="icon__wrapper icon--3">
                                <img src={"/asset/icons/common/" + iconName} className="icon" alt="" />
                        </span>
                        <span>{label}</span>
                </Link>
        );
};

export default BtnLinkIcon;
