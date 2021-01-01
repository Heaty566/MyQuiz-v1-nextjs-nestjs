import React, { FunctionComponent } from "react";

export interface BtnFuncProps {
        handleOnClick: Function;
        iconName: string;
        label: string;
}

const BtnFunc: FunctionComponent<BtnFuncProps> = ({ handleOnClick, iconName, label }) => {
        return (
                <button className="btn btn__func f--b fade-in" onClick={() => handleOnClick()} type="button">
                        <span className="icon__wrapper icon--2">
                                <img src={`/asset/icons/common/${iconName}`} alt="" className="icon" />
                        </span>
                        <span>{label}</span>
                </button>
        );
};

export default BtnFunc;
