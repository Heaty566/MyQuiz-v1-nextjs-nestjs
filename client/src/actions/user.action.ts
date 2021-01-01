import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiAction } from "../reducers/api.reducer";
import { http } from "../services/http";

export interface UserInfo {
        fullName: string;
        isTeacher: boolean;
        avatarUrl: string;
}

export interface UpdateUser {
        fullName: string;
        isTeacher: boolean;
}

export const getUser = createAsyncThunk<UserInfo, {}, {}>("user", async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
                const res = await http.get("/user");
                return res.data.data;
        } catch (err) {
                // Cookies.remove("token");
                return rejectWithValue({});
        }
});

export const updateUser = createAsyncThunk<UserInfo, { input: UpdateUser }, {}>(
        "updateUser",
        async ({ input }, thunkAPI) => {
                const { dispatch, rejectWithValue } = thunkAPI;
                dispatch({ type: apiAction.newApiCall.type });

                return await http
                        .put("/user/profile", input)
                        .then(({ data }) => {
                                dispatch({
                                        type: apiAction.updateReponse.type,
                                        payload: { message: data.message },
                                });
                                return data.data;
                        })
                        .catch(({ response }) => {
                                const { data, statusText } = response;
                                dispatch({
                                        type: apiAction.updateError.type,
                                        payload: { error: data, meesage: statusText },
                                });
                                return rejectWithValue({});
                        })
                        .finally(() => {
                                dispatch({ type: apiAction.apiResponse.type });
                        });
        }
);
