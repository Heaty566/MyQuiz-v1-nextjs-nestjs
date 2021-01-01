import React, { FunctionComponent, useEffect, ChangeEvent, useRef, useCallback } from "react";

export interface FormInputAutoSizeProps {
        placeHolder: string;
        register: Function;
        name: string;
}

const FormInputAutoSize: FunctionComponent<FormInputAutoSizeProps> = ({ placeHolder = "", register, name }) => {
        const textRef = useRef<HTMLTextAreaElement | null>(null);

        const handleOnWindowChangeSize = useCallback(() => {
                if (textRef.current) {
                        textRef.current.style.height = "0";
                        textRef.current.style.height = textRef.current.scrollHeight + "px";
                }
        }, []);
        const handleTextareRezie = useCallback(({ currentTarget }: ChangeEvent<HTMLTextAreaElement>) => {
                currentTarget.style.height = "0";
                currentTarget.style.height = currentTarget.scrollHeight + "px";
        }, []);

        useEffect(() => {
                window.addEventListener("resize", handleOnWindowChangeSize);

                return () => {
                        window.removeEventListener("resize", handleOnWindowChangeSize);
                };
        }, [handleOnWindowChangeSize]);

        return (
                <div className="form__group fade-in">
                        <textarea
                                name={name}
                                className="form__textarea"
                                onChange={handleTextareRezie}
                                ref={(ref) => {
                                        textRef.current = ref;
                                        register(ref);
                                }}
                                placeholder={placeHolder}
                        />
                </div>
        );
};

export default FormInputAutoSize;
