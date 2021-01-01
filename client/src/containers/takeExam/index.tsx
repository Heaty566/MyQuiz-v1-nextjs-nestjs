import React, { FunctionComponent, useEffect, useState } from "react";
import TakeQuizScene from "./TakeExam.scene";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { quizSelector, Quiz } from "../../reducers/quiz.reducer";
import { getQuizById } from "../../actions/quiz.action";
import { store } from "../../reducers";
import "../../styles/pages/_take-exam.scss";
import "../../styles/pages/_take-quiz.scss";

export interface TakeQuizProps {}

const TakeQuiz: FunctionComponent<TakeQuizProps> = () => {
        const params = useParams<{ quizId: string }>();
        const quizState = useSelector(quizSelector);
        const [currentQuestion, setCurrentQuestion] = useState(0);
        const [correctAnswer, setCorrectAnswer] = useState<number[]>([]);
        const [currentSelect, setCurrentSelect] = useState<number[]>([]);
        const [quiz, setQuiz] = useState<Quiz>(quizState.quiz);
        const [currentAnswer, setCurrentAnswer] = useState<number[][]>([]);
        const [score, setScore] = useState(0);
        const [isShowScore, setShowScore] = useState(false);

        useEffect(() => {
                let arr: number[][] = [];
                quiz.questions.forEach(() => {
                        const temp: number[] = [];
                        arr.push(temp);
                });

                setCurrentAnswer(arr);
        }, [quiz.questions]);

        const handleOnSubmitExam = () => {
                const perQuestion = currentAnswer.map((item, index) => {
                        let count = 0;
                        let wrong = 0;

                        item.forEach((answer) => {
                                if (quiz.questions[index].correctAnswer.includes(answer)) {
                                        count++;
                                } else wrong++;
                        });

                        return count - wrong < 0 ? 0 : (count - wrong) / quiz.questions[index].correctAnswer.length;
                });
                const total = perQuestion.reduce((cur = 0, next) => cur + next) / quiz.questions.length;
                setScore(total);
                setShowScore(true);
        };

        useEffect(() => {
                const newShuffle = {
                        ...quizState.quiz,
                        questions: [...quizState.quiz.questions]
                                .sort(() => Math.random() - 0.5)
                                .map((item, index) => {
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

        const handleOnChangeCurrentQuestion = (index: number) => {
                if (index >= 0 && index <= quizState.quiz.questions.length - 1) {
                        setCurrentQuestion(index);
                }
        };

        useEffect(() => {
                setCurrentSelect(currentAnswer[currentQuestion]);
        }, [currentQuestion, currentAnswer]);

        const handleOnSelectCorrect = (index: number) => {
                let newSelect = [...currentSelect];
                if (currentSelect.includes(index)) {
                        newSelect = newSelect.filter((item) => item !== index);
                } else {
                        newSelect = [...newSelect, index];
                }
                const updateAnswer = [...currentAnswer];
                updateAnswer[currentQuestion] = newSelect;
                setCurrentAnswer(updateAnswer);
                setCurrentSelect(newSelect);
        };

        return (
                <TakeQuizScene
                        quiz={quiz}
                        handleOnSubmitExam={handleOnSubmitExam}
                        currentQuestion={currentQuestion}
                        correctAnswer={correctAnswer}
                        handleOnChangeQuestion={handleOnChangeCurrentQuestion}
                        handleSelectAnswer={handleOnSelectCorrect}
                        currentSelect={currentSelect}
                        score={score}
                        isShowScore={isShowScore}
                />
        );
};

export default TakeQuiz;
