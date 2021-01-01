import React, { FunctionComponent } from "react";
import SpinnerIcon from "../common/Spinner";

export interface BtnFormProps {
        label: string;
        isLoading: boolean;
}

const BtnForm: FunctionComponent<BtnFormProps> = ({ label, isLoading }) => {
        if (isLoading)
                return (
                        <div className="wave fade-in">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                        </div>
                );

        return (
                <button className="btn btn__link btn__form" type="submit">
                        {isLoading ? <SpinnerIcon height="16" width="18" /> : label}
                </button>
        );
};

export default BtnForm;
