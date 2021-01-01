import * as React from "react";
import { Link } from "react-router-dom";

export interface BtnLinkProps {
        url: string;
        label: string;
        size?: "lg" | "sm";
}

const BtnLink: React.SFC<BtnLinkProps> = ({ label, url, size = "sm" }) => {
        const className = "btn btn__link " + (size === "lg" ? "btn--lg" : "btn--sm");
        return (
                <Link to={url} className={className}>
                        {label}
                </Link>
        );
};

export default BtnLink;
