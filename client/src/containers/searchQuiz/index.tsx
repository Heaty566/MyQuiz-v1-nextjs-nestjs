import React, { FunctionComponent, useEffect, useState } from "react";
import SearchQuizScene from "./SearchQuiz";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { quizSelector } from "../../reducers/quiz.reducer";
import { searchQuiz } from "../../actions/quiz.action";
import { store } from "../../reducers";
import { SearchQuizItem } from "../../reducers/quiz.reducer";
import { useForm } from "react-hook-form";
import { useDebounce } from "../../hooks/useDebouce";
import { apiAction } from "../../reducers/api.reducer";
export interface TakeQuizProps {}

const SearchQuiz: FunctionComponent<TakeQuizProps> = () => {
        const params = useParams<{ name: string; page: string; type: string }>();
        const quizState = useSelector(quizSelector);
        const { register, watch } = useForm<{ search: string }>({ defaultValues: { search: "" } });
        const [quizzes, setQuizzes] = useState<SearchQuizItem[]>([]);
        const watcher = watch("search");
        const searchDebouce = useDebounce(watcher, 500);

        useEffect(() => {
                store.dispatch(searchQuiz({ input: params.name }));
        }, [params.name, searchDebouce]);

        useEffect(() => {
                if (params.type) {
                        store.dispatch({ type: apiAction.changeType.type, payload: { type: params.type } });
                }
        }, [params]);

        useEffect(() => {
                const page = (Number(params.page) - 1) * 12;
                const newQuizzes = quizState.searchQuizzes.slice(page, page + 12);

                setQuizzes(newQuizzes);
        }, [params, quizState.searchQuizzes]);

        return <SearchQuizScene amount={quizState.searchQuizzes.length} quizzes={quizzes} register={register} />;
};

export default SearchQuiz;
