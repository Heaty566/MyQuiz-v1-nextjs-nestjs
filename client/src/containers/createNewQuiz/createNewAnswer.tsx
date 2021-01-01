import React, { FunctionComponent, useState, useEffect } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { NewQuiz } from ".";
import BtnFunc from "../../components/btn/BtnFunc";
import FormInputAutoSize from "../../components/form/FormInputAutoSize";

export interface CreateNewAnwserProps {
        register: Function;
        control: Control<NewQuiz>;
        nestedIndex: number;
        setValue: Function;
        getValues: Function;
}

const CreateNewAnwser: FunctionComponent<CreateNewAnwserProps> = ({
        control,
        nestedIndex = 0,
        register,
        setValue,
        getValues,
}) => {
        const { fields, append, remove } = useFieldArray({
                name: `questions[${nestedIndex}].answers`,
                control,
        });
        const [corrects, setCorrect] = useState<number[]>([]);
        const [count, setCount] = useState(0);

        const handleOnCheckCorrect = (index: number) => {
                let newCorrects = [...corrects];
                if (corrects.includes(index)) {
                        newCorrects = corrects.filter((item) => item !== index);
                } else newCorrects = [...corrects, index];
                setCorrect(newCorrects);

                setValue(`questions[${nestedIndex}].correctAnswer`, newCorrects);
        };

        useEffect(() => {
                register(`questions[${nestedIndex}].correctAnswer`);
                setValue(`questions[${nestedIndex}].correctAnswer`, []);
        }, [nestedIndex, setValue, register]);

        useEffect(() => {
                append({ value: "" });
                setCount(1);
        }, [append]);

        return (
                <React.Fragment>
                        <div className="f--b">
                                <BtnFunc
                                        label="Add answer"
                                        handleOnClick={() => {
                                                append({ value: "" });
                                                setCount(count + 1);
                                        }}
                                        iconName="plus.svg"
                                />

                                <BtnFunc
                                        handleOnClick={() => {
                                                if (count !== 0) {
                                                        remove(count);
                                                        setCount(count - 1);
                                                }
                                        }}
                                        label="Delete answer"
                                        iconName="clear.svg"
                                />
                        </div>
                        {fields.map((item, index) => {
                                const isCorrectAnswerClassName =
                                        "quiz-new__check__btn" +
                                        (corrects.includes(index) ? " quiz-new__check__btn--active" : "");

                                return (
                                        <React.Fragment key={item.id}>
                                                <FormInputAutoSize
                                                        placeHolder="Answer"
                                                        register={register}
                                                        name={`questions[${nestedIndex}].answers[${index}].value`}
                                                />
                                                <div className={isCorrectAnswerClassName}>
                                                        <BtnFunc
                                                                handleOnClick={() => handleOnCheckCorrect(index)}
                                                                label="Correct answer"
                                                                iconName="correct.svg"
                                                        />
                                                </div>
                                        </React.Fragment>
                                );
                        })}
                </React.Fragment>
        );
};

export default CreateNewAnwser;
