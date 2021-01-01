import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiAction } from "../reducers/api.reducer";
import { http } from "../services/http";
import { SearchQuizItem, Quiz } from "../reducers/quiz.reducer";

export interface QuestionDto {
        question: string;
        correctAnswer: number[];
        answers: string[];
}

export interface CreateNewQuizDto {
        name: string;
        time: number;
        questions: QuestionDto[];
}

export const createNewQuiz = createAsyncThunk<any, { input: CreateNewQuizDto }, {}>(
        "createNewQuiz",
        async ({ input }, thunkAPI) => {
                const { dispatch, rejectWithValue } = thunkAPI;
                dispatch({ type: apiAction.newApiCall.type });

                return await http
                        .post("/quiz", input)
                        .then(({ data }) => {
                                dispatch({
                                        type: apiAction.updateReponse.type,
                                        payload: { message: "Quiz added" },
                                });

                                return data.data;
                        })
                        .catch(({ response }) => {
                                const { data } = response;

                                dispatch({
                                        type: apiAction.updateError.type,
                                        payload: {
                                                error: data,
                                                message:
                                                        "Please check your form, something goes wrong ( We will add more details about error form in the next version, sorry for inconvenience )",
                                        },
                                });
                                return rejectWithValue({});
                        })
                        .finally(() => {
                                dispatch({ type: apiAction.apiResponse.type });
                        });
        }
);

export const searchQuiz = createAsyncThunk<SearchQuizItem[], { input: string }, {}>(
        "searchQuiz",
        async ({ input }, thunkAPI) => {
                const { dispatch } = thunkAPI;
                dispatch({ type: apiAction.newApiCall.type });

                return await http
                        .get(`/quiz/search/${input}`)
                        .then(({ data }) => {
                                return data;
                        })
                        .finally(() => {
                                dispatch({ type: apiAction.apiResponse.type });
                        });
        }
);

export const getQuizById = createAsyncThunk<Quiz, { quizId: string; type: "learn" | "exam" }>(
        "getQuizById",
        async ({ quizId, type }, thunkAPI) => {
                const { dispatch } = thunkAPI;
                dispatch({ type: apiAction.newApiCall.type });

                return await http
                        .get(`/quiz/${quizId}/${type}`)
                        .then(({ data }) => {
                                return data;
                        })
                        .finally(() => {
                                dispatch({ type: apiAction.apiResponse.type });
                        });
        }
);
