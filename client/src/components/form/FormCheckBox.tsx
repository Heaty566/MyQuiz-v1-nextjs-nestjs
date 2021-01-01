import * as React from "react";

export interface FormCheckBoxProps {
        name: string;
        register: Function;
        handleOnClick: Function;
        value: boolean;
}

const FormCheckBox: React.SFC<FormCheckBoxProps> = ({ name, register, handleOnClick, value = false }) => {
        const className = "form__checkbox " + (value ? " form__checkbox--active" : "");

        return (
                <React.Fragment>
                        <input name={name} type="checkbox" ref={(ref) => register(ref)} style={{ display: "none" }} />
                        <label className={className} htmlFor={name} onClick={() => handleOnClick(name)}></label>
                </React.Fragment>
        );
};

export default FormCheckBox;
