import React, { FunctionComponent, useState } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { NewQuiz, Question } from ".";
import BtnFunc from "../../components/btn/BtnFunc";
import FormInputAutoSize from "../../components/form/FormInputAutoSize";

import { questionDefaultValue } from ".";
import CreateNewAnswer from "./CreateNewAnswer";

export interface CreateNewQuestionProps {
        control: Control<NewQuiz>;
        register: Function;
        getValues: Function;
        setValue: Function;
}

const CreateNewQuestion: FunctionComponent<CreateNewQuestionProps> = ({ control, register, setValue, getValues }) => {
        const { fields, append, remove } = useFieldArray<Question>({ control, name: "questions" });
        const [counter, setCounter] = useState(0);

        return (
                <React.Fragment>
                        {fields.map((item, index) => {
                                return (
                                        <div className="quiz-new__content fade-in " key={item.id}>
                                                <div className="quiz__question">
                                                        <div className="f--b">
                                                                <div className="menu--left">
                                                                        <h3 className="quiz__menu__label">
                                                                                {`Question: ${index + 1}`}
                                                                        </h3>
                                                                </div>

                                                                <div className="menu--right">
                                                                        <BtnFunc
                                                                                iconName="clear.svg"
                                                                                handleOnClick={() => {
                                                                                        if (counter !== 0) {
                                                                                                remove(counter);
                                                                                                setCounter(counter - 1);
                                                                                        }
                                                                                }}
                                                                                label="Delete question"
                                                                        />
                                                                </div>
                                                        </div>

                                                        <FormInputAutoSize
                                                                placeHolder="Question"
                                                                name={`questions[${index}].question`}
                                                                register={register}
                                                        />
                                                </div>
                                                <div className="quiz__answer">
                                                        <CreateNewAnswer
                                                                control={control}
                                                                nestedIndex={index}
                                                                register={register}
                                                                setValue={setValue}
                                                                getValues={getValues}
                                                        />
                                                </div>
                                        </div>
                                );
                        })}
                        <div className="f--c">
                                <BtnFunc
                                        handleOnClick={() => {
                                                append(questionDefaultValue);
                                                setCounter(counter + 1);
                                        }}
                                        iconName="plus.svg"
                                        label="Add Question"
                                />
                        </div>
                </React.Fragment>
        );
};

export default CreateNewQuestion;
