import * as React from "react";

export interface FormInputProps {
        placeholder: string;
        name: string;
        register: Function;
        errorMessage: string;
}

const FormInput: React.SFC<FormInputProps> = ({ placeholder, name, register, errorMessage = "" }) => {
        return (
                <React.Fragment>
                        <div className="form__group">
                                <input
                                        ref={(ref) => register(ref)}
                                        className="form__input"
                                        placeholder={placeholder}
                                        name={name}
                                />
                        </div>
                        {Boolean(errorMessage.length) && <span className="form__error">{errorMessage}</span>}
                </React.Fragment>
        );
};

export default FormInput;
