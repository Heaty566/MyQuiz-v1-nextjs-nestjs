import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface ServerSponse {
        message: string;
        statusCode: number;
        error: any;
}
export interface JoiError {
        [path: string]: string;
}

export interface RequestState {
        isError: boolean;
        isLoading: boolean;
        message: string;
        errors?: JoiError;
        type: string;
}

const initialState: RequestState = {
        isLoading: false,
        isError: false,
        message: "",
        errors: {},
        type: "learn",
};

const requestReducer = createSlice({
        name: "RequestState",
        initialState,
        reducers: {
                refreshApi(state, _) {
                        state.isError = false;
                        state.isLoading = false;
                        state.message = "";
                        state.errors = {};
                },

                newApiCall(state, _) {
                        state.isLoading = true;
                        state.isError = false;
                        state.message = "";
                        state.errors = {};
                },

                changeType(state, { type, payload }) {
                        state.type = payload.type;
                },

                updateReponse(state, { type, payload }) {
                        state.message = payload.message;
                },

                updateError(state, { type, payload }: { type: string; payload: ServerSponse }) {
                        const { error, message }: ServerSponse = payload;

                        state.isError = true;
                        state.message = message;
                        state.errors = error;
                },

                apiResponse(state, _) {
                        state.isLoading = false;
                },
        },
});
const { apiResponse, newApiCall, updateError, updateReponse, refreshApi, changeType } = requestReducer.actions;

export const apiAction = { apiResponse, newApiCall, updateError, updateReponse, refreshApi, changeType };
export default requestReducer.reducer;
export const apiSelector = (state: RootState) => state.api;
