import React, { FunctionComponent } from "react";
import BtnForm from "../../components/btn/BtnForm";
import FormInput from "../../components/form/FormInput";

import "../../styles/pages/_quiz-new.scss";
import { Control } from "react-hook-form";
import { NewQuiz } from ".";
import CreateNewQuestion from "./CreateNewQuestion";

export interface CreateNewQuizScenceProps {
        register: Function;
        handleOnSubmit: Function;
        errors: any;
        message: string;
        isLoading: boolean;
        control: Control<NewQuiz>;
        setValue: Function;
        isError: boolean;
        getValues: Function;
}

const CreateNewQuizScence: FunctionComponent<CreateNewQuizScenceProps> = ({
        errors,
        handleOnSubmit,
        isLoading,
        message,
        control,
        getValues,
        register,
        setValue,
        isError,
}) => {
        return (
                <form className="quiz-new" onSubmit={(event) => handleOnSubmit(event)}>
                        <h1 className="quiz-new__title">Create New Quiz</h1>
                        <div className="quiz-new--top">
                                <div className="form">
                                        {Boolean(message.length) && (
                                                <div className="form__col">
                                                        <div className={isError ? "form__error" : "form__message"}>
                                                                {message}
                                                        </div>
                                                </div>
                                        )}
                                        <div className="form__col">
                                                <label className="form__label" htmlFor="name">
                                                        Quiz's name
                                                </label>
                                                <FormInput
                                                        placeholder="Csi103 ..."
                                                        name="name"
                                                        register={register}
                                                        errorMessage={errors["name"]}
                                                />
                                        </div>
                                        <div className="form__col">
                                                <label className="form__label" htmlFor="time">
                                                        Time (second)
                                                </label>
                                                <FormInput
                                                        placeholder="3600 (1 hour)"
                                                        name="time"
                                                        register={register}
                                                        errorMessage={errors["time"]}
                                                />
                                        </div>
                                </div>
                        </div>
                        <div className="quiz-new--bottom">
                                <div className="quiz__row">
                                        <CreateNewQuestion
                                                control={control}
                                                register={register}
                                                getValues={getValues}
                                                setValue={setValue}
                                        />
                                </div>
                        </div>
                        <BtnForm label="Create Quiz" isLoading={isLoading} />
                </form>
        );
};

export default CreateNewQuizScence;
