import React, { FunctionComponent, useEffect, useState } from "react";
import TakeQuizScene from "./TakeQuiz.scene";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { quizSelector, Quiz } from "../../reducers/quiz.reducer";
import { getQuizById } from "../../actions/quiz.action";
import { store } from "../../reducers";
import "../../styles/pages/_take-quiz.scss";

export interface TakeQuizProps {}

const TakeQuiz: FunctionComponent<TakeQuizProps> = () => {
        const params = useParams<{ quizId: string }>();
        const quizState = useSelector(quizSelector);
        const [currentQuestion, setCurrentQuestion] = useState(0);
        const [correctAnswer, setCorrectAnswer] = useState<number[]>([]);
        const [currentSelect, setCurrentSelect] = useState<number[]>([]);
        const [quiz, setQuiz] = useState<Quiz>(quizState.quiz);

        useEffect(() => {
                const newShuffle = {
                        ...quizState.quiz,
                        questions: [...quizState.quiz.questions]
                                .sort(() => Math.random() - 0.5)
                                .map((item) => {
                                        const tracker = item.correctAnswer.map((correctAnswer) => {
                                                return item.answers[correctAnswer];
                                        });

                                        const newAnswer = [...item.answers].sort(() => Math.random() - 0.5);
                                        const newCorrectAnswer = tracker.map((correct) => {
                                                return newAnswer.indexOf(correct);
                                        });

                                        return {
                                                ...item,
                                                answers: newAnswer,
                                                correctAnswer: newCorrectAnswer,
                                        };
                                }),
                };
                setQuiz(newShuffle);
        }, [quizState.quiz]);

        useEffect(() => {
                store.dispatch(getQuizById({ quizId: params.quizId, type: "learn" }));
        }, [params]);

        useEffect(() => {
                setCorrectAnswer(quiz.questions[currentQuestion].correctAnswer);
        }, [currentQuestion, quiz]);

        const handleOnChangeCurrentPage = (index: number) => {
                if (index >= 0 && index <= quizState.quiz.questions.length - 1) {
                        setCurrentQuestion(index);
                }
        };

        useEffect(() => {
                setCurrentSelect([]);
        }, [currentQuestion]);

        const handleOnSelectCorrect = (index: number) => {
                const newSelect = [...currentSelect, index];
                setCurrentSelect(newSelect);
        };

        return (
                <TakeQuizScene
                        quiz={quiz}
                        currentQuestion={currentQuestion}
                        correctAnswer={correctAnswer}
                        handleOnChangeQuestion={handleOnChangeCurrentPage}
                        handleSelectAnswer={handleOnSelectCorrect}
                        currentSelect={currentSelect}
                />
        );
};

export default TakeQuiz;
