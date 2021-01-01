import React, { FunctionComponent, useEffect, KeyboardEvent, useCallback } from "react";

import { useHistory } from "react-router-dom";
import { UserState } from "../../../reducers/user.reducer";
import { useForm } from "react-hook-form";
import { useDebounce } from "../../../hooks/useDebouce";
import { store } from "../../../reducers";
import { searchQuiz } from "../../../actions/quiz.action";
import { useSelector } from "react-redux";
import { quizSelector } from "../../../reducers/quiz.reducer";
import { apiSelector } from "../../../reducers/api.reducer";

import NavBtnScence from "./NavBtn.scene";

export interface NavBtnProps {
        userState: UserState;
        handleOnClick: Function;
}

const NavBtn: FunctionComponent<NavBtnProps> = ({ userState, handleOnClick }) => {
        const quizState = useSelector(quizSelector);
        const apiState = useSelector(apiSelector);
        const history = useHistory();

        const { register, watch } = useForm<{ search: string }>({ defaultValues: { search: "" } });

        const watcher = watch("search");
        const searchDebouce = useDebounce(watcher, 1000);

        const callApi = useCallback((value: string) => {
                store.dispatch(searchQuiz({ input: value.trim() }));
        }, []);

        useEffect(() => {
                if (searchDebouce) callApi(searchDebouce);
        }, [searchDebouce, callApi]);

        const handleOnEnter = ({ keyCode }: KeyboardEvent<HTMLInputElement>) => {

                if (keyCode === 13 && Boolean(watcher.length)) {
                        history.push(`/quiz/search/${apiState.type}/${watcher}/1`);
                }
        };

        return (
                <NavBtnScence
                        apiState={apiState}
                        handleOnClickMenu={handleOnClick}
                        quizState={quizState}
                        register={register}
                        handleOnEnter={handleOnEnter}
                        userState={userState}
                        watcher={watcher}
                />
        );
};

export default NavBtn;
