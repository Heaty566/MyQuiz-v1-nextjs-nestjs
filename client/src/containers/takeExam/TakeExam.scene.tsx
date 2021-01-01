import React, { FunctionComponent, useState, useEffect } from "react";
import { Quiz } from "../../reducers/quiz.reducer";
import { convertTime } from "../../helpers/time.helper";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../reducers/user.reducer";

export interface TakeQuizSceneProps {
        quiz: Quiz;
        currentQuestion: number;
        handleOnChangeQuestion: Function;
        correctAnswer: number[];
        currentSelect: number[];
        handleSelectAnswer: Function;
        score: number;
        isShowScore: boolean;
        handleOnSubmitExam: Function;
}

const TakeQuizScene: FunctionComponent<TakeQuizSceneProps> = ({
        quiz,
        currentQuestion = 0,
        handleOnChangeQuestion,
        correctAnswer,
        handleSelectAnswer,
        currentSelect = [],
        isShowScore,
        score,
        handleOnSubmitExam,
}) => {
        const questionCounter = currentQuestion + 1;
        const userState = useSelector(selectUser);
        const [isStart, setStart] = useState(false);
        const [isSubmit, setSubmit] = useState(false);
        const [timer, setTimer] = useState(0);

        useEffect(() => {
                setTimer(quiz.time);
        }, [quiz.time]);
        useEffect(() => {
                if (timer <= -1) {
                        setSubmit(true);
                        handleOnSubmitExam();
                }
        }, [timer, handleOnSubmitExam]);

        useEffect(() => {
                let inter: any;

                if (isStart) {
                        inter = setInterval(() => {
                                setTimer(timer - 1);
                        }, 1000);
                }
                if (isSubmit) {
                        clearInterval(inter);
                }

                return () => {
                        clearInterval(inter);
                };
        }, [isStart, timer, isSubmit]);

        return (
                <div className="take-quiz">
                        <div className="take-quiz__header">
                                <h2 className="take-quiz__title">{quiz.name}</h2>
                                <div className="take-quiz__header-right">
                                        <p className="take-quiz__timer">{convertTime(timer)}</p>
                                        <button
                                                className="btn btn__link"
                                                onClick={() => handleOnChangeQuestion(currentQuestion - 1)}
                                        >
                                                Back
                                        </button>
                                        <button
                                                className="btn btn__link"
                                                onClick={() => handleOnChangeQuestion(currentQuestion + 1)}
                                        >
                                                Next
                                        </button>
                                </div>
                        </div>
                        <div className="take-quiz__body">
                                <div className="take-quiz__question">
                                        <p>{`${questionCounter} / ${quiz.questions.length} ---  please choose ${correctAnswer.length}`}</p>
                                        <h3>{quiz.questions[currentQuestion].question}</h3>
                                </div>
                                <div className="take-quiz__answer">
                                        {quiz.questions[currentQuestion].answers.map((item, index) => {
                                                const isSelect = currentSelect.includes(index);

                                                const className =
                                                        "take-quiz__btn" + (isSelect ? " take-quiz__btn--select" : "");

                                                return (
                                                        <button
                                                                className={className}
                                                                key={index}
                                                                onClick={() => handleSelectAnswer(index)}
                                                        >
                                                                {item}
                                                        </button>
                                                );
                                        })}
                                </div>
                                <button
                                        className="btn btn__link"
                                        onClick={() => {
                                                setSubmit(true);
                                        }}
                                >
                                        Submit Exam
                                </button>
                        </div>
                        {isSubmit && (
                                <React.Fragment>
                                        <div className="exam__modal__masking"></div>
                                        <div className="exam__modal">
                                                <div className="exam__wrapper">
                                                        <div className="card card__bg exam__modal__card">
                                                                <h3 className="card__title">Are you sure</h3>

                                                                <div className="card__body">
                                                                        <p className="card__text">
                                                                                Time remaining: {convertTime(timer)}
                                                                        </p>
                                                                </div>

                                                                <div className="card__body">
                                                                        <button
                                                                                className="btn btn__link"
                                                                                onClick={() => {
                                                                                        handleOnSubmitExam();
                                                                                }}
                                                                        >
                                                                                Yes
                                                                        </button>
                                                                        <button
                                                                                className="btn btn__link"
                                                                                onClick={() => {
                                                                                        setSubmit(false);
                                                                                }}
                                                                        >
                                                                                No
                                                                        </button>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </React.Fragment>
                        )}

                        {isSubmit && isShowScore && (
                                <React.Fragment>
                                        <div className="exam__modal__masking"></div>
                                        <div className="exam__modal">
                                                <div className="exam__wrapper">
                                                        <div className="card card__bg exam__modal__card">
                                                                <h3 className="card__title">
                                                                        Thank for {userState.fullName}
                                                                </h3>
                                                                <div className="card__body">
                                                                        <p className="card__text">
                                                                                Your score: {(score * 100).toFixed(2)}%{" "}
                                                                        </p>
                                                                </div>
                                                                <Link to="/home" className="btn btn__link">
                                                                        Go Back
                                                                </Link>
                                                        </div>
                                                </div>
                                        </div>
                                </React.Fragment>
                        )}

                        {!isStart && (
                                <React.Fragment>
                                        <div className="exam__modal__masking"></div>
                                        <div className="exam__modal">
                                                <div className="exam__wrapper">
                                                        <div className="card card__bg exam__modal__card">
                                                                <h3 className="card__title">{quiz.name}</h3>
                                                                <div className="card__body">
                                                                        <p className="card__text">
                                                                                {quiz.questions.length} Questions
                                                                        </p>
                                                                        <p className="card__text">
                                                                                {convertTime(quiz.time)}
                                                                        </p>
                                                                </div>
                                                                <button
                                                                        className="btn btn__link"
                                                                        onClick={() => {
                                                                                setStart(true);
                                                                        }}
                                                                >
                                                                        Start
                                                                </button>
                                                        </div>
                                                </div>
                                        </div>
                                </React.Fragment>
                        )}
                </div>
        );
};

export default TakeQuizScene;
