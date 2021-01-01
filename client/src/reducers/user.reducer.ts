import { createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { getUser, updateUser } from "../actions/user.action";
import { UserInfo } from "../actions/user.action";
import { RootState } from ".";

export interface UserState extends UserInfo {
        isLogin: boolean;
}

const initialState: UserState = {
        isLogin: false,
        fullName: "",
        isTeacher: false,
        avatarUrl: "",
};

const userReducer = createSlice({
        name: "User",
        initialState,
        reducers: {
                logoutUser(state, { type }) {
                        state.fullName = "";
                        state.isLogin = false;
                        Cookies.remove("token");
                },
        },
        extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
                builder.addCase(getUser.fulfilled, (state, { payload }) => {
                        const { fullName, isTeacher, avatarUrl } = payload;
                        state.fullName = fullName;
                        state.isTeacher = isTeacher;
                        state.isLogin = true;
                        state.avatarUrl = avatarUrl;
                });
                builder.addCase(updateUser.fulfilled, (state, { payload }) => {
                        const { fullName, isTeacher } = payload;
                        state.fullName = fullName;
                        state.isTeacher = isTeacher;
                });
        },
});

const { logoutUser } = userReducer.actions;

export const userAction = { logoutUser };
export default userReducer.reducer;

export const selectUser = (state: RootState) => state.auth;
