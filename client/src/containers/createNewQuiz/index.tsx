import React, { FunctionComponent, useCallback } from "react";
import CreateNewQuizScene from "./CreateNewQuiz.scene";
import { useForm } from "react-hook-form";
import { apiSelector } from "../../reducers/api.reducer";
import { useSelector } from "react-redux";
import { createNewQuiz } from "../../actions/quiz.action";
import { store } from "../../reducers";
export interface FieldInput<T> {
        value: T;
}
export interface Question {
        question: string;
        answers: FieldInput<string>[];
        correctAnswer: number[];
}

export interface NewQuiz {
        name: string;
        time: number;
        questions: Question[];
}

export const questionDefaultValue: Question = {
        answers: [],
        correctAnswer: [],
        question: "",
};

const defaultValues: NewQuiz = {
        name: "",
        questions: [questionDefaultValue],
        time: 600,
};
export interface CreateNewQuizProps {}

const CreateNewQuiz: FunctionComponent<CreateNewQuizProps> = () => {
        const { register, handleSubmit, getValues, control, setValue } = useForm<NewQuiz>({ defaultValues });
        const apiState = useSelector(apiSelector);

        const handleOnCreateQuiz = useCallback((data: NewQuiz) => {
                const newAnswers = data.questions.map((item) => {
                        return { ...item, answers: item.answers.map((item2) => item2.value) };
                });

                store.dispatch(createNewQuiz({ input: { name: data.name, time: data.time, questions: newAnswers } }));
        }, []);

        return (
                <CreateNewQuizScene
                        register={register}
                        message={apiState.message}
                        isLoading={apiState.isLoading}
                        errors={apiState.errors}
                        handleOnSubmit={handleSubmit(handleOnCreateQuiz)}
                        control={control}
                        getValues={getValues}
                        setValue={setValue}
                        isError={apiState.isError}
                />
        );
};

export default CreateNewQuiz;
