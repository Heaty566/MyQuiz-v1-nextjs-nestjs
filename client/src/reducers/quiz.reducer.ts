import { createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { RootState } from ".";
import { searchQuiz, getQuizById } from "../actions/quiz.action";

export interface SearchQuizItem {
        name: string;
        time: number;
        _id: string;
        questions: number;
}
export interface Question {
        question: string;
        answers: string[];
        correctAnswer: number[];
}

export interface Quiz {
        name: string;
        time: number;
        userId: string;
        user: { fullName: string; avatar: string };
        questions: Question[];
}

export interface QuizState {
        searchQuizzes: SearchQuizItem[];
        quiz: Quiz;
}

const initialState: QuizState = {
        searchQuizzes: [],
        quiz: {
                name: "",
                questions: [{ question: "", answers: [], correctAnswer: [] }],
                userId: "",
                time: 0,
                user: { avatar: "", fullName: "" },
        },
};

const quizReducer = createSlice({
        name: "Quiz",
        initialState,
        reducers: {},
        extraReducers: (builder: ActionReducerMapBuilder<QuizState>) => {
                builder.addCase(getQuizById.fulfilled, (state, { payload }) => {
                        state.quiz = payload;
                });

                builder.addCase(searchQuiz.fulfilled, (state, { payload }) => {
                        state.searchQuizzes = payload;
                });
        },
});
// const {} = quizReducer.actions;

export const quizAction = {};
export default quizReducer.reducer;
export const quizSelector = (state: RootState) => state.entities.quiz;
