import React, { FunctionComponent } from "react";
import { Quiz } from "../../reducers/quiz.reducer";

export interface TakeQuizSceneProps {
        quiz: Quiz;
        currentQuestion: number;
        handleOnChangeQuestion: Function;
        correctAnswer: number[];
        currentSelect: number[];
        handleSelectAnswer: Function;
}

const TakeQuizScene: FunctionComponent<TakeQuizSceneProps> = ({
        quiz,
        currentQuestion = 0,
        handleOnChangeQuestion,
        correctAnswer,
        handleSelectAnswer,
        currentSelect,
}) => {
        const questionCounter = currentQuestion + 1;

        return (
                <div className="take-quiz">
                        <div className="take-quiz__header">
                                <h2 className="take-quiz__title">{quiz.name}</h2>
                                <div className="take-quiz__header-right">
                                        {/* <p className="take-quiz__timer">{convertTime(quiz.time)}</p> */}
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
                                                const isCorrect = correctAnswer.includes(index);
                                                const isSelect = currentSelect.includes(index);

                                                const className =
                                                        "take-quiz__btn" +
                                                        (isSelect && isCorrect
                                                                ? " take-quiz__btn--correct"
                                                                : !isCorrect && isSelect
                                                                ? " take-quiz__btn--wrong"
                                                                : "");

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
                        </div>
                        <div className="take-quiz__footer"></div>
                </div>
        );
};

export default TakeQuizScene;
