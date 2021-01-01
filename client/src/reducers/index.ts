import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userReducer from "./user.reducer";
import requestReducer from "./api.reducer";
import quizReducer from "./quiz.reducer";

const entities = combineReducers({
        quiz: quizReducer,
});

const reducer = combineReducers({
        auth: userReducer,
        api: requestReducer,
        entities,
});

export const store = configureStore({
        reducer,
});

export type RootState = ReturnType<typeof reducer>;
