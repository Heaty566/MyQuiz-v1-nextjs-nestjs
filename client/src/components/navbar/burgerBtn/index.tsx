import * as React from "react";

export interface BurgerBtnProps {
        handleOnClick: Function;
        isActive: boolean;
}

const BurgerBtn: React.FunctionComponent<BurgerBtnProps> = ({ handleOnClick, isActive }) => {
        const className = "burger__btn " + (isActive ? "burger__btn--active" : "");

        return (
                <div className={className} onClick={() => handleOnClick()}>
                        <span></span>
                        <span></span>
                        <span></span>
                </div>
        );
};

export default BurgerBtn;
